module.exports = {
  rootDir: '..',
  setupFilesAfterEnv : ["<rootDir>/frontend/jest/react.js"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/tmp/"],
  transform: {
    "^.+\\.jsx?$": ["@swc/jest", {
      jsc: {
        parser: {
          jsx: true
        }
      }
    }]
  }
}
