const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');


// prompt user for profile questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        }
        else {
          console.log("Please enter your name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username'
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if(confirmAbout) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  ]);
};


// prompt user for project questions
const promptProject = portfolioData => {
  // if there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectNameInput => {
        if (projectNameInput) {
          return true;
        }
        else {
          console.log("Please enter your project name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        }
        else {
          console.log("Please enter your project description!");
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: githubLink => {
        if (githubLink) {
          return true;
        }
        else {
          console.log("Please enter your project's GitHub link!");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
    // take project data entered & push it into the portfolioData.projects array
    .then(projectData => {
      portfolioData.projects.push(projectData);
      // if user selected to add more projects, confirmAddProject would equal true.  If true, return to promptProject function, making sure to pass in portfolioData, so we don't clear/overwrite to empty array
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      }
      // if user did not want to add more projects, return the entire portfolioData
      else {
        return portfolioData;
      }
    });
};


// call function - start with promptUser(), then promptProject(), then execute an action with the returned entire portfolioData
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });



// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });


