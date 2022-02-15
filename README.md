# Cookies Orders Automation
This project exposes AWS Lambda endpoints that Cookies sends order to. 

## Project Setup
If pulling the repository code for the first time, run `./nuke-packages.sh` to install all Node.js modules. 

## Git Flow
This is a low volume project, so the git flow is intentionally simple. 

- The `main` branch represents the latest version running in Production
- When doing any new work, cut a branch from `main`; e.g.: `release/1.10.0` 
- Deploy to the Development environment from the `release/1.10.0` branch using the `sls deploy --env development` command, and test your changes
- Deploy to the Production environment from the `release/1.10.0` branch using the `sls deploy --env production` command
- If you need to rollback to the previous release, deploy to the Production environment from the `main` branch
- When the release is verified, create a pull request from `release/1.10.0` to `main` and delete the `release/1.10.0` branch
- Create a Release in GitHub and tag it with the release number

## Versioning 

This project uses semantic versioning as described in https://semver.org/. 

## Deployment

### Development

`sls deploy --env development`

### Production

`sls deploy --env production`