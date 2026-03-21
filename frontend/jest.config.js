module.exports = {
  rootDir: '..',
  setupFilesAfterEnv : ["<rootDir>/frontend/jest/react.js"],
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
