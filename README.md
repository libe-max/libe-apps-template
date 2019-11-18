# Libé apps template

## General purpose

This repo contains the shared codebase for every front-end [Libé Labo](https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538) app. Its purpose is to hold some transverse styles, scripts, functions, global variables, states, configurations and so on...

Every Libé Labo app is a fork of this repo.

## Technologies

This project implies the use of HTML, CSS, JavaScript, [React](https://reactjs.org/), and [Node.js](https://nodejs.org/en/). Furthermore, you'll need an up to date version of [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) (3.6) and [Node.js](https://nodejs.org/en/) (LTS). It is strongly recommended that you use [NVM](https://github.com/nvm-sh/nvm) to manage multiple versions of Node.js.

Good news is: React comes here with no Webpack configuration nightmare, since the project was initially created with [Create React App](https://github.com/facebook/create-react-app).

## Install, start, build, publish & fork

In a dev context, this app assumes the existence of a local instance of [libe-data-server](https://github.com/libe-data-server) running locally on port 3004, and [libe-static-ressources](https://github.com/libe-static-ressources), on port 3003.

In a prod context, it is assumed that the [libe-data-server](https://github.com/libe-data-server) is hosted on https://libe-labo-2.site, and [libe-static-ressources](https://github.com/libe-static-ressources) on https://www.liberation.fr/apps/static

#### Install

```bash
# Go to your favorite location
> cd /wherever/you/want/

# Create a place for your database to store data
> mkdir libe-database && mkdir libe-database/db

# Clone libe-apps-template and its friends
> git clone https://github.com/libe-max/libe-apps-template.git
> git clone https://github.com/libe-max/libe-static-ressources.git
> git clone https://github.com/libe-max/libe-data-server.git

# Install dependencies (libe-static-ressources has none)
> cd libe-data-server/ && npm i
> cd ../libe-apps-template/ && npm i

# It's all good!
```

#### Start

```bash
# Start the libe-static-ressources (simple HTTP python server on port 3003)
> cd /wherever/you/installed/libe-static-ressources/ && npm start

# Run a MongoDB instance on default port (27017)
> mongod --dbpath ../libe-database/db/

# Start the libe-data-server (Nodejs/Expressjs server on port 3004)
> cd ../libe-data-server/ && npm start

# Start libe-apps-template (React app with hot reloading on port 3000)
> cd ../libe-apps-template/ && npm start
```

#### Build

This app never really needs to be built, since its only purpose is to be forked and used as the beginning of other projects. However, the build script does some fancy stuff on top of the default build script coming with create-react-app. Details on what happens when building can be found a bit further in this document.

```bash
> cd /wherever/you/installed/libe-apps-template/

# Optional but generally a good idea to lint
> npm run standard-fix

# Build
> npm run build
```

#### Publish

When you're done writing wonderful improvments to this app :

```bash
> cd /wherever/you/installed/libe-apps-template/

# Commit and push everything
> git add *
> git commit -m "some lowercase descriptive action text"
> git push origin master

# Update "version" field in package.json, according to the [semantic versionning](https://semver.org/) method.
> nano package.json

# Install dependencies again in order to update package-lock.json
> npm i

# Commit & push version change
> git add *
> git commit -m "v{MAJOR}.{MINOR}.{PATCH}"
> git push origin master

# Publish to NPM
> npm publish
```

#### Fork

When you're ready to start working on a new project, it's time to fork this repo and add new stuff to it.

```bash
# Create an empty (no README, no .gitignore) repo (https://github.new), and clone it
> cd /wherever/you/want && git clone https://github.com/your-name/your-repo

# Add an upstream remote repo in order to pull from libe-apps-template
> git remote add upstream https://github.com/libe-max/libe-apps-template

# Pull from upstream repo
> git pull upstream master

# Push this new stuff to your origin repo
> git push origin master

# Install dependencies 
> npm i

# Now do the start steps and you're good!
```



## Contents

Here's the architecture of the repo :

```
libe-apps-template
├── package.json
├── package-lock.json
├── build.js
├── node_modules/
├── public/
    ├── index.html
    ├── custom.css
    ├── manifest.json
├── src/
    ├── config.js
    ├── index.js
    ├── App.js
    ├── serviceWorker.js
```

Path | Purpose 
-|-
`/package.json` | The ID card of the project 
`/package-lock.json` | Don't touch this 
`/build.js` | The script executed in order to make an production build 
**`/node_modules/`** | Where the dependencies of the project are 
**`/public/`** | **Home of the static files** 
`/public/index.html` | The template page where the React app (`/src/index.js`) injects stuff 
`/public/custom.css` | Specific styles for your app overwriting the generic styles of the template 
`/public/manifest.json` | ¯\\\_(ツ)\_/¯ 
**`/src/`** | **The core of the app** 
`/src/config.js` | The configuration file where are stored information like the title, the description, the path to the image for social cards, the url of the spreadsheet to fetch, etc, ...<br />This file is used by `/build.js` to hardcode inside `/build/index.html` the SEO stuff. 
`/src/index.js` | The root of the React app. This file is not supposed to be configurated when working on a new app, all the "variable" suff lies in `/src/App.js`, which is imported.<br />Also imports `/src/config.js`, some polyfill for `window.fetch`, injects tracking scripts, and makes some generic information accessible to the rest of the app, like the height of the header, and the dimensions of the window.<br />This component eventually renders the App component defined in  `/src/App.js`, and gives it all the contents of `/src/config.js` as props. 
`/src/App.js` | Where is defined the first-level React component of the app. This is where you start coding. This file is also prefilled with generic stuff, which can be edited. The main elements of this file are: the root CSS class of the app (`this.c`), the automatic request for data posting credentials to `libe-data-server` when `componentDidMount`, the automatic fetch for the spreadsheet given in `/src/config.js`, and the automatic rendered UI elements for `loading_sheet` and `error_sheet` states. 
`/src/serviceWorker.js` | ¯\\\_(ツ)\_/¯ 



## Initial Create React app README.md

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



## Auteurs

- **Maxime Fabas** - _Rédaction_ - [maximefabas.github.io](https://maximefabas.github.io)

___
![Logo Libération](https://www.liberation.fr/apps/static/assets/liberation-logo_raster_64.png)       ![Logo Libé labo](https://www.liberation.fr/apps/static/assets/libe-labo-logo_raster_64.png)