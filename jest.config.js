const path = require("path");

module.exports = {
    testEnvironment: "node",
    moduleNameMapper: {
        "^@kyasshu/core": path.resolve(__dirname, "./packages/core/src"),
        "^@kyasshu/core/(.*)": path.resolve(__dirname, "./packages/core/src/$1")
    }
};
