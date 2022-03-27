# The Washtenaw ID Webapp

## About

This web application is a guide for holders of
the [Washtenaw County ID](https://www.washtenaw.org/269/County-Identification-Card-Program) to find businesses and
services where they can use the ID to prove their identity without fear of being questioned.

The Washtenaw ID is a county-wide photo identification card created with the purpose of addressing a pressing human
rights issue in our community – the lack of secure and reliable identification of approximately 26,000 residents of
Washtenaw County. Equating to approximately 7% of the general public, these U.S. Citizens, which disproportionately
represent stigmatized populations, run into a variety of consistent and significant daily barriers.

Not having an ID makes the simple daily things that we all do, impossible: You cannot prove your identity to law
enforcement, cash a check, sign a lease or even check out a book from the library.

Lack of identification is not just a problem affecting the undocumented community. Older adults, individuals with mental
illness, those who are homeless, transgender folks and those of low socioeconomic status, all have been marginalized by
state and federal identification systems that result in an accurate photo ID being inaccessible to them.

Learn more and support the ID at http://www.washtenawid.com.

## Development Setup

- Install NodeJS. Recommend using NVM. Current Versions:
    - Node: 16.13.0
    - NPM: 8.5.1
- Install ESLint plugin for your IDE or run `npm run lint` before committing
    - ESLint configuration is in `package.json`

## Available Scripts

In the project directory, you can run:

### `npm start-fake-data`

Runs the app in development mode with MSW acting as the API\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm start-dev`

Runs the app in development mode and looks for an API at [http://localhost:8000](http://localhost:8000)\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs the ESLint command on all files within the src folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.
