const fs = require("fs");
const matchWithCode = require("./matchWithCode.js");

class FlowToCode {
	constructor(data) {
		this.data = data;
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

		let condition_id = 0;

		// Perform depth-first search to find all paths
		function dfs(node, path) {
			visited.add(node);
			const nodeType = node;
			const nodeTypeCheck = nodeTypes[node] || node;

			if (nodeTypeCheck === "condition") {
				// For "condition" nodes, consider both true and false paths
				nodes.get(node).forEach((nextNode) => {
					if (!visited.has(nextNode.target)) {
						dfs(
							nextNode.target,
							path.concat(`${nodeType}-${nextNode.sourceHandle}`)
						);
					}
				});
			} else {
				// For other nodes, proceed as usual
				path.push(node);

				if (!nodes.has(node)) {
					allPaths.push(path.join(" -> "));
				} else {
					nodes.get(node).forEach((nextNode) => {
						if (!visited.has(nextNode.target)) {
							dfs(nextNode.target, path.slice());
						}
					});
				}
			}
		}

		dfs("node_0", []);

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

				return filteredNodes.length > 0
					? filteredNodes.join(" -> ")
					: null;
			})
			.filter((path) => path !== null);
	}

	convertToCode(paths, addTap = 0) {
		if (paths.length === 0) {
			codeBox.push("}");
		}

		let savePath = [];
		for (const path of paths) {
			savePath.push(path.split(" -> "));
		}

		let maxItems = Math.max(...savePath.map((sublist) => sublist.length));
		let codeBox = [];

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

	generateFile(textContent) {
		const fileName = "output.js";
		fs.writeFile(fileName, textContent, (err) => {
			if (err) {
				console.error("Error writing file:", err);
			} else {
				console.log(
					`File '${fileName}' has been created with the content:\n${textContent}`
				);
			}
		});
	}

	compile() {
		const paths = this.findNodeConnections();
		const textContent = this.convertToCode(paths);
		this.generateFile(textContent);
	}
}

// Example usage
const testJson = require("./test.json");

const flow = new FlowToCode(testJson);
flow.compile();
