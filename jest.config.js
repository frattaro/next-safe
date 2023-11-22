/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageDirectory: "coverage",
  collectCoverageFrom: ["lib/**/*.*"],
  preset: "ts-jest",
  testEnvironment: "node"
};
