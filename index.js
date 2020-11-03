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
    {
      type: "input",
      name: "license",
      message: "Please enter your official name for licensing.",
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

##Description

${answers.description}

##Installation

${answers.install}

##Use

${answers.use}

##License
MIT License

Copyright (c) 2020] ${answers.license}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

##Contributing

${answers.contributing}

##Testing

${answers.testing}

`;


promptUser()
  .then((answers) => writeFileAsync('autoREADME.md', generateMd(answers)))
  .then(() => console.log('Your Readme has been generated'))
  .catch((err) => console.error(err));

