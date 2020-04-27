const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const scssToJson = require("scss-to-json");
const filePath = path.resolve(__dirname, "src/styles/antd/theme.customize.scss");
const sassVars = scssToJson(filePath);
const lessVars = Object.keys(sassVars).reduce((acc, curVar) => {
  acc[curVar.replace(/\$/gi, "@")] = sassVars[curVar];
  return acc;
}, {});

console.log(22222, process.env.REACT_APP_TEST, process.env.REACT_APP_TEST_VAR);

module.exports = {
  plugins: [
    {
      plugin: {
        ...CracoAntDesignPlugin,
      },
      options: {
        customizeTheme: lessVars,
      },
      // options: {
      //   customizeThemeLessPath: path.join(__dirname, "src/styles/antd/theme.less"),
      // },
    },
  ],
};
