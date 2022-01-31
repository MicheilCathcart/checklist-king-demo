# Checklist King

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Running Firebase functions

Restart your computer (For some reason it might not work unless on a fresh restart
From a seperate console and root process-kingdom
Run `nvm use 8.16.2` this is required to run cloud functions locally
Run `npm run functions` to launch function locally 

## Running functions
Run `nvm use 8.16.2` as this is the version of node that currently works with functions emulation. 
I haven't tested future versions yet.

Run `npm run functions` to run the functions, this is a sudo command so a password is required.

Switch to the functions folder `cd functions`. Then run `./node_modules/.bin/tsc --watch` to watch
for typescript changes to the functions index.ts file.
