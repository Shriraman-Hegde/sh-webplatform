module.exports = {
  presets: [
    ["@babel/preset-env", { modules: false, bugfixes: true }],
    ["@babel/preset-typescript", { allowDeclareFields: true }],
  ],
};
