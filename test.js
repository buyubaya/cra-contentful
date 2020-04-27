const util = require("util");
const exec = util.promisify(require("child_process").exec);
const chalk = require("chalk");

console.log("AFTER BUILD", process.env.REACT_APP_TEST, process.env.REACT_APP_TEST_VAR, process.env.VERCEL_URL);

// const EXTENSION_ID = "cra-entry-extension";
// const EXTENSION_NAME = "CRA ENTRY EXTENSION";
// const EXTENSION_SRC = "http://localhost:3000";
// const SPACE_ID = "0bcdcoj46mj5";
const EXTENSION_ID = process.env.EXTENSION_ID;
const EXTENSION_NAME = process.env.EXTENSION_NAME;
const EXTENSION_SRC = process.env.VERCEL_URL;
const SPACE_ID = process.env.SPACE_ID;

const updateExtension = async () => {
  console.log(chalk.cyan(`Installing extension in development mode...`));
  const { stdout } = await exec(
    `contentful extension update --space-id ${SPACE_ID} --id ${EXTENSION_ID} --name "${EXTENSION_NAME}" --src ${EXTENSION_SRC} --force`,
  );
  console.log(stdout);
};

updateExtension();
