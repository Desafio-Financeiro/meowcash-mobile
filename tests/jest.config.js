module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "./jest.setup.js",
    "@testing-library/jest-native/extend-expect"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(firebase|@firebase|@react-native|expo|@react-native-picker/picker)/)"
  ],
};