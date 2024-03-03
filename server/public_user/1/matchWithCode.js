function matchWithCode(node) {
	console.log(node);

	switch (node.type) {
		case "request":
			return `const ${node.output} = req.body;`;
			break;
		case "count":
			return `const ${node.output} = ${node.count}.length;`;
			break;
		case "encode-base64":
			if (node.property.type === "Encode") {
				return `const ${node.property.outputVariable} = btoa(${node.property.encodeField})`;
			} else {
				return `const ${node.property.outputVariable} = atob(${node.property.encodeField})`;
			}
			break;
		case "database":
			return "$4";
			break;
		case "return-response":
			return `res.status(${node.property.statusCode.split(" ")[0]}).send(${node.property.output});`;
			break;
		case "condition":
			return "$7";
			break;
		default:
			break;
	}
	console.log(node);
	return "//Not-Found";
}

module.exports = matchWithCode;
