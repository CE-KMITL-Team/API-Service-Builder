function rmDollarSign(text, removeAll = false) {
  if (removeAll) {
    return text.replace(/\$/g, "");
  } else if ((text?.charAt(0) ?? "") === "$") {
    return text.substring(1);
  }
  return text;
}

function dbCondition(conditions) {
  let code = "";
  if (conditions.length === 0) {
    code += '1"';
  } else {
    let text = "";
    conditions.forEach((condition, index) => {
      const condOp = condition.condition.match(/(?<=\().*(?=\))/g)[0];

      text += `$\{${rmDollarSign(condition.left)}} ${
        condOp === "==" ? "=" : condOp
      } $\{${rmDollarSign(condition.right)}}`;
      if (index !== conditions.length - 1) {
        operator = condition?.next ?? "";
        text += ` ${operator} `;
      }
    });
    code += text;
    code += "`";
  }

  return code;
}

function matchWithCode(node) {
  // if (node.type === "count") {
  //   console.log(node);
  // }

  let code = "";
  switch (node.type) {
    case "request":
      return `const ${rmDollarSign(node.property.output)} = req.body`;

    case "count":
      return `const ${rmDollarSign(node.property.output)} = ${rmDollarSign(
        node.property.count
      )}.length`;

    case "encode-base64":
      if (node.property.type === "Encode") {
        return `const ${rmDollarSign(
          node.property.outputVariable
        )} = btoa(${rmDollarSign(node.property.encodeField)})`;
      } else {
        return `const ${rmDollarSign(
          node.property.outputVariable
        )} = atob(${rmDollarSign(node.property.encodeField)})`;
      }

    case "database":
      switch (node.property.method) {
        case "Query":
          code = `\`SELECT * FROM \\\`${node.model}\\\` WHERE `;
          code += dbCondition(node?.property?.queryConditions);

          return `const [${rmDollarSign(
            node.property.output
          )}] = await db.promise().query(${code})`;

        case "Delete":
          code = `\`DELETE FROM \\\`${node.model}\\\` WHERE `;
          code += dbCondition(node?.property?.deleteConditions);
          return `const [${rmDollarSign(
            node.property.output
          )}] = await db.promise().query(${code});`;

        case "Insert":
          const insertColumns = Object.keys(node.property.insertColumns).filter(
            (key) => node.property.insertColumns[key] !== ""
          );
          const insertValues = insertColumns.map(
            (key) => node.property.insertColumns[key]
          );
          const insertSql = `INSERT INTO \\\`${
            node.model
          }\\\` (${insertColumns.join(", ")}) VALUES (${insertValues
            .map((value) => `'$\{${rmDollarSign(value)}}'`)
            .join(", ")});`;
          return `await db.promise().query(\`${insertSql}\`);`;

        case "Update":
          const updateColumns = Object.keys(node.property.updateColumns).filter(
            (key) => node.property.updateColumns[key] !== ""
          );
          const updateValues = updateColumns.map(
            (key) => `${key} = '$\{${node.property.updateColumns[key]}}'`
          );
          let updateSql = `UPDATE \\\`${node.model}\\\` SET ${updateValues.join(
            ", "
          )} WHERE `;

          updateSql += dbCondition(node?.property?.updateConditions);

          return `await db.promise().query(\`${updateSql});`;

        default:
          break;
      }
      return `//${JSON.stringify(node)}`;

    case "return-response":
      return `res.status(${
        node.property.statusCode.split(" ")[0]
      }).send(${rmDollarSign(node.property.output, true)});`;

    case "condition":
      let text = "";
      if (node.property.condition.length === 0) return "true";
      node.property.condition.forEach((condition, index) => {
        text += `${condition.left} ${
          condition.condition.match(/(?<=\().*(?=\))/g)[0]
        } ${condition.right}`;
        if (index !== node.property.condition.length - 1) {
          operator =
            condition?.next?.replace(/or/g, "||")?.replace(/and/g, "&&") ?? "";
          text += ` ${operator} `;
        }
      });

      return text;

    default:
      break;
  }
  console.log(node);
  return "//Not-Found";
}

module.exports = matchWithCode;
