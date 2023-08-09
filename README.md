## Available Scripts

In the project directory, you can run:

### `npm install`

When you first want to start up the app you must, and when pulled some changes from GitHub, you might need to install all the dependencies. \
After intalling them, you can run the below script and the application starts up. 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm deploy`

In theory this should deploy and publish the page with the help of GitHub pages. Currently, it is not working, see the Deployment section about, how to deploy the Care Plan builder tool.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



# Deployment

## How to deploy Care Plan builder tool with `npm run build` and GitHub Pages

At the moment on GitHub under Settings -> Pages the 'Build and Deployment' set up is the following: the GitHub Pages site is currently being built from the gh-pages branch as gh-pages/root is targetted. At the same place, it can turn to use GitHub Actions, which would continously integrate, build and deploy the pushed changes, but currently we agreed on manual deployment.

**Steps to deploy CarePlan builder tool:**
1. Checkout “main” branch locally in your IDE, make changes, if you are satisfied with the changes, then:
2. Run `npm run predeploy`, this will build static files under the /build folder. Basically, it is equal to if we run the following command: ``npm run build`
3. Then run `npm run deploy` which calls `gh-pages -d build` script and pushed the content of the build folder to gh-pages branch
7. Github pages will take care of the rest, it just needs a few minutes and changes should be visible on https://patientsknowbest.github.io/cpbuilder/

**Conversation and findings about GitHub Actions:**

Three ways to deploy the tool with the help of GitHub Actions:

1. Option #1
- Under Settings, set Pages/Branch setting to “gh-pages” and “root”
- In your github actions do the following:
    - Create a trigger for when a commit is pushed onto the “main” branch
    - Checkout the “main” branch
    - Build the project using npm (on the main branch)
    - Checkout “gh-pages” branch
    - Copy content of the /build folder into the root of “gh-pages” branch (this is the tricky bit)
    - Commit changes onto the “gh-pages” branch
    - Push to “gh-pages” branch, let github pages take care of the rest

2. Option #2
- Under Settings, set Pages/Branch setting to “main” and “/build”
- In your github actions:
    - Create a trigger for when a commit is pushed onto the “main” branch
    - Checkout the “main” branch
    - Build the project using npm (on the main branch)
    - Commit content of the “/build” folder
    - Push to the “main” branch
    - Somehow prevent recursive main branch triggers

3. Option #3
- Under settings, set pages/branch setting to “main” and “/build”
- In your github actions:
    - Manually run npm build locally
    - Push changes to main branch
    - Let github pages take care of the rest


**The setup of GitHub Actions at the moment is not working, in the sense it is not deploying the tool:**
1. Deploy from a branch/folder
2. Deploy using Github Actions (beta)
    - Currently there is a “Node.js CI” workflow:
        - Check out “main” on push or pr raise
        - Does an npm build
        - (this does not deploy anything atm, just runs)
    - And there is a pages-build-deployment workflow
        - This was created via the UI, using “GitHub Pages Jekyll” action (reusable), this is currently not available in the source code
        - This is also probably dummy and doesn’t deploy anything at the moment

If approach 2 is chosen we will have to take some of the steps from “GitHub Pages Jekyll” option and integrate it into our own worflow  “Node.js CI”.