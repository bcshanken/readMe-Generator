const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const { title } = require("process");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?",
    },
    {
      type: "input",
      name: "description",
      message: "Please describe your project.",
    },
    {
      type: "input",
      name: "install",
      message: "How would you install your project?",
    },
    {
      type: "input",
      name: "Use",
      message: "Please describe the use of the project?",
    },
    // {
    //   type: "input",
    //   name: "license",
    //   message: "Please enter your official name for licensing.",
    // },
    {
        type: "list",
        message: "Select the preferred license for your project here.",
        name: "license",
        choices: ["MIT", "Apache 2.0", "GNU"],
      },
    {
      type: "input",
      name: "contributing",
      message: "What are your contribution guidelines?",
    },
    {
      type: "input",
      name: "testing",
      message: "What are you test instructions",
    },
    {
        type: "input",
        name: "github",
        message: "What is  your github user name",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
  ]);

const generateMd = (answers) =>
`#${answers.title}

## Table of Contents

* [Description](#Description)
* [Installation](#Installation)
* [Use](#Use)
* [License](#License)
* [Contributing](#Contributing)
* [Testing](#Testing)
* [Questions](#Questions)

## Description

${answers.description}

## Installation

${answers.install}

## Use

${answers.use}

## License

Copyright (c) 2020

Licensed under the ${answers.license} license.

## Contributing

${answers.contributing}

## Testing

${answers.testing}

## Questions

If you have questions you can reach me at my [git hub](https://github.com/${answers.github}) or you can email me at [${answers.email}](mailto:${answers.email})

`;


promptUser()
  .then((answers) => writeFileAsync('autoREADME.md', generateMd(answers)))
  .then(() => console.log('Your Readme has been generated'))
  .catch((err) => console.error(err));

