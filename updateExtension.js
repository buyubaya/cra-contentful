const envVars = require("dotenv").config().parsed;
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const chalk = require("chalk");

const {
  MANAGEMENT_TOKEN: LOCAL_MANAGEMENT_TOKEN,
  SPACE_ID: LOCAL_SPACE_ID,
  EXTENSION_ID: LOCAL_EXTENSION_ID,
  EXTENSION_NAME: LOCAL_EXTENSION_NAME,
  EXTENSION_SRC: LOCAL_EXTENSION_SRC,
} = envVars;

const MANAGEMENT_TOKEN = process.env.MANAGEMENT_TOKEN || LOCAL_MANAGEMENT_TOKEN;
const SPACE_ID = process.env.SPACE_ID || LOCAL_SPACE_ID;
const EXTENSION_ID = process.env.EXTENSION_ID || LOCAL_EXTENSION_ID;
const EXTENSION_NAME = process.env.EXTENSION_NAME || LOCAL_EXTENSION_NAME;
const EXTENSION_SRC = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : LOCAL_EXTENSION_SRC;

const updateExtension = async () => {
  console.log(chalk.cyan(`Updating extension...`));
  const { stdout } = await exec(
    `contentful extension update --management-Token ${MANAGEMENT_TOKEN} --space-id ${SPACE_ID} --id ${EXTENSION_ID} --name "${EXTENSION_NAME}" --src ${EXTENSION_SRC} --force`,
  );
  console.log(stdout);
};

updateExtension();
