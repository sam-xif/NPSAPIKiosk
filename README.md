# NPS API Kiosk

This project uses AngularJS. If you want to run it, make sure to install the [Angular CLI](https://cli.angular.io/).

## File Structure

### `nps-kiosk-app/src/app`
This is the root folder of the AngularJS "app." The main module, and all of the view components and services are in here.

### `nps-kiosk-app/src/nps`
This is the root folder of my backend code which encapsulates all of the behavior of talking to the NPS API. It is well-documented, so please take a look!

## Building and Running
If you want to run the website as a local development server, run these commands:
```shell
cd nps-api-kiosk
ng serve
```
The first command cd's into the root of the Angular project, the second command starts the local server.

## Known Bugs
* When the search form is fiddled with too quickly, sometimes wrong results appear. Unfortunately, I didn't have enough time to fix this before submitting to the MindSumo challenge.
