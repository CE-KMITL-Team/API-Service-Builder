const fs = require("fs");
const matchWithCode = require("./matchWithCode.js");

class FlowToCode {
  constructor(name, path, data, userID, projectName) {
    this.name = name;
    this.path = path;
    this.data = data;
    this.userID = userID;
    this.projectName = projectName;
  }

  findNodeConnections() {
    const nodes = new Map();
    const edges = this.data.flowObj.edges;
    const nodeTypes = this.data.flowObj.nodes.reduce((map, node) => {
      map[node.id] = `${node.data.ref}`;
      return map;
    }, {});

    // Build a map of nodes and their outgoing edges
    edges.forEach((edge) => {
      const source = edge.source;
      const target = edge.target;

      if (!nodes.has(source)) {
        nodes.set(source, []);
      }
      nodes.get(source).push({ target, sourceHandle: edge.sourceHandle });
    });

    const visited = new Set();
    const allPaths = [];

    // Perform depth-first search to find all paths
    function dfs(instance, node, path) {
      visited.add(node);
      const nodeType = node;
      const nodeTypeCheck = nodeTypes[node] || node;

      if (nodeTypeCheck === "condition") {
        // For "condition" nodes, consider both true and false paths
        nodes.get(node).forEach((nextNode) => {
          if (!visited.has(nextNode.target)) {
            dfs(
              instance,
              nextNode.target,
              path.concat(`${nodeType}-${nextNode.sourceHandle}`)
            );
          }
        });
      } else {
        // For other nodes, proceed as usual
        path.push(node);
        const haveNode = instance.data.property.hasOwnProperty(node);

        if (!nodes.has(node)) {
          if (haveNode) {
            allPaths.push(path.join(" -> "));
          }
        } else {
          nodes.get(node).forEach((nextNode) => {
            if (!visited.has(nextNode.target)) {
              dfs(instance, nextNode.target, path.slice());
            }
          });
        }
      }
    }

    dfs(this, "node_0", []);

    return allPaths;
  }

  filteredPath(paths, sliceNode) {
    return paths
      .map((path) => {
        const nodes = path.split(" -> ");
        const startIndex = nodes.findIndex((node) =>
          node.startsWith(sliceNode)
        );
        if (startIndex === -1) {
          return null;
        }

        const filteredNodes = nodes.slice(startIndex + 1, nodes.length);

        return filteredNodes.length > 0 ? filteredNodes.join(" -> ") : null;
      })
      .filter((path) => path !== null);
  }

  convertToCode(paths, addTap = 0) {
    let codeBox = [];
    if (paths.length === 0) {
      codeBox.push("}");
    }

    let savePath = [];
    for (const path of paths) {
      savePath.push(path.split(" -> "));
    }

    let maxItems = Math.max(...savePath.map((sublist) => sublist.length));

    for (let j = 0; j < maxItems; j++) {
      let check = false;
      let startCondi = false;
      let lastSelect = 0;
      let firstCondi = false;
      for (let i = 0; i < paths.length; i++) {
        lastSelect = i;

        if (savePath[i][j]?.includes("-true") ?? false) {
          if (!startCondi) {
            codeBox.push(
              `${"    ".repeat(addTap)}if (${matchWithCode(
                this.data.property[savePath[i][j].split("-")[0]]
              )}) {`
            );
            check = true;
            startCondi = true;
            codeBox.push(
              this.convertToCode(
                this.filteredPath(paths, savePath[i][j]),
                addTap + 1
              )
            );
          }
          continue;
        } else if (savePath[i][j]?.includes("-false") ?? false) {
          if (startCondi) {
            codeBox.push(`${"    ".repeat(addTap)}} else {`);
            check = false;
            startCondi = false;
            codeBox.push(
              this.convertToCode(
                this.filteredPath(paths, savePath[i][j]),
                addTap + 1
              )
            );
            codeBox.push(`${"    ".repeat(addTap)}}`);
          }
          firstCondi = true;
          continue;
        } else {
          check = savePath[0][j] == savePath[i][j];
        }
        if (!check) {
          break;
        }
      }
      if (firstCondi) {
        break;
      }
      if (check) {
        codeBox.push(
          `${"    ".repeat(addTap)}${matchWithCode(
            this.data.property[savePath[lastSelect][j]]
          )}`
        );
      }
    }

    return codeBox.join("\n");
  }

  convertToAPI(baseCode) {
    return `//Start: ${this.name}
	app.all("${this.path}", BearerTokenAuth, async (req, res) => {
		${baseCode}
	});
//End: ${this.name}`;
  }

  generateFile(apiContent) {
    // Read the content of index.js
    fs.readFile(
      `./public_user/${this.userID}/${this.projectName}/index.js`,
      "utf8",
      (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Once the file is read, you can search for the match
        const regex = new RegExp(
          `\/\/Start: ${this.name}\\b([\\s\\S]*?)\/\/End: ${this.name}`
        );

        let content = "";

        const match = data.match(regex);
        const checkMatch = match ? match[1] : null;

        if (checkMatch === null) {
          const addFlowRegex = new RegExp(`\/\/API List`);
          content = data.replace(addFlowRegex, "//API List\n" + apiContent);
        } else {
          content = data.replace(regex, apiContent);
        }

        const checkDuplicates = data.match(regex);
        if (
          (checkDuplicates?.length ?? 0) === 0 ||
          apiContent !== checkDuplicates[0]
        ) {
          const fileName = `./public_user/${this.userID}/${this.projectName}/index.js`;
          fs.writeFile(fileName, content, (err) => {
            if (err) {
              console.error("Error writing file:", err);
            } else {
              console.log(`File '${fileName}' has been created successfully.`);
            }
          });
        }
      }
    );
  }

  compile() {
    let api = "";
    if (this.data !== "") {
      const paths = this.findNodeConnections();
      const textContent =
        "try {\n" +
        (this.convertToCode(paths) === "}" ? "" : this.convertToCode(paths)) +
        "\n    } catch (error) {\n        console.error('Error:', error);\n    }";
      api = this.convertToAPI(textContent);
    }

    this.generateFile(api);
  }
}

// Example usage
function saveCode(name, path, property, userID, projectName) {
  try {
    const flow = new FlowToCode(
      name,
      path,
      property === "" ? "" : JSON.parse(property),
      userID,
      projectName
    );
    flow.compile();
  } catch (error) {
    console.error("Error compiling code:", error);
  }
}

module.exports = saveCode;
