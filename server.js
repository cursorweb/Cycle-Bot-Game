require("./dist/index.js");
require("http").createServer((_, res) => res.end("My prefix is '&'!")).listen(8080);