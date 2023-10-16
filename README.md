# I. Command to start up the local server of the application

**Required dependencies:**
- Node package manager (https://docs.npmjs.com/)
- Angular cli (https://angular.io/docs)
- After installing or updating the angular cli or node package manager, close and open the terminal, otherwise it might not work
- `sudo npm install` --> download all the necessary dependencies from node modules cache
- `ng serve` --> start up the local server
- `ng version` --> check angular version
- `node -v` --> check node version

# II. Branch management
- `main` branch is basically the develop branch to which we merge the changes from `feature/` and `bugfix/` branches
- `gh-page` branch is the one that GitHub is using for deployment, so what version is on that branch that is the one that is deployed and it only consists the built version of the project
- `save_old_cpb` branch consists the first version of the care plan builder, the base project was pulled from the internet and implemented some fixes, but decided on writing the tool from scratch as it took more time to fix the bugs than starting a completely new project
- `feature` and `bugfix` branches are created when working on a JIRA ticket -> after opening a PR and after reviews it can get merged to the main branch

# III. Deployment

## How to deploy Care Plan builder tool with GitHub Pages

At the moment on GitHub under Settings -> Pages the 'Build and Deployment' set up is the following: the GitHub Pages site is currently being built from the gh-pages branch as gh-pages/root is targetted. At the same place, it can turn to use GitHub Actions, which would continously integrate, build and deploy the pushed changes, but currently we agreed on manual deployment.

Documentation of the deployment steps can be found here: https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4. **Method 1** is used to deploy the Care Plan builder tool, and the steps and commands with the adequate parameters are described in the section below.

**Steps to deploy CarePlan builder tool:**
1. Create a branch from the `main` branch, make changes, create a PR targetting the `main` branch and merge your PR to the `main` branch if a reviewer is satisfied with the changes. Then checkout the `main` branch and pull the changes you have merged, then start the deployment process. Just make sure that your changes are on the `main` branch and the branch is up to date.
2. Skip this step if angular-cli-pages tool is already installed. The angular-cli-pages tool is used as a command on the angular CLI for the purpose of deployment. To install it, let us run this command on our terminal: `npm i angular-cli-ghpages --save-dev`
3. Then run this command on your terminal to build the application: `ng build --configuration=production --base-href "https://patientsknowbest.github.io/cpbuilder/"`
4. Finally run the following command in your terminal to deploy the App: `npx angular-cli-ghpages --dir=dist/cpb`
5. Github pages will take care of the rest, it just needs a few minutes and changes should be visible on https://patientsknowbest.github.io/cpbuilder/

## Conversation and findings about GitHub Actions:

**Three ways to deploy the tool with the help of GitHub Actions:**

1. Option #1
- Under Settings, set Pages/Branch setting to `gh-pages` and `root`
- In your github actions do the following:
    - Create a trigger for when a commit is pushed onto the `main` branch
    - Checkout the `main` branch
    - Build the project using npm (on the main branch)
    - Checkout `gh-pages` branch
    - Copy content of the /build folder into the root of `gh-pages` branch (this is the tricky bit)
    - Commit changes onto the `gh-pages` branch
    - Push to `gh-pages` branch, let github pages take care of the rest

2. Option #2
- Under Settings, set Pages/Branch setting to `main` and `/build`
- In your github actions:
    - Create a trigger for when a commit is pushed onto the `main` branch
    - Checkout the `main` branch
    - Build the project using npm (on the main branch)
    - Commit content of the `/build` folder
    - Push to the `main` branch
    - Somehow prevent recursive main branch triggers

3. Option #3
- Under settings, set pages/branch setting to `main` and `/build`
- In your github actions:
    - Manually run npm build locally
    - Push changes to main branch
    - Let github pages take care of the rest


**The setup of GitHub Actions at the moment is not working, in the sense it is not deploying the tool:**
1. Deploy from a branch/folder
2. Deploy using Github Actions (beta)
    - Currently there is a `Node.js CI` workflow:
        - Check out `main` on push or pr raise
        - Does an npm build
        - (this does not deploy anything atm, just runs)
    - And there is a pages-build-deployment workflow
        - This was created via the UI, using `GitHub Pages Jekyll` action (reusable), this is currently not available in the source code
        - This is also probably dummy and doesn’t deploy anything at the moment

If approach 2 is chosen we will have to take some of the steps from `GitHub Pages Jekyll` option and integrate it into our own worflow  `Node.js CI`.
