# Repo-Hooker

This is a general purpose application that accepts web hooks and does stuff with them. The intended use case is automated testing builds which go to a remote server. A project can be configured to listen for push events and then pull, rebuild and deploy itself automatically.

## Usage

To modify your application's launch parameters on the database it is necessary to call the `program.js` application from the commandline on the server machine using the following commands

### addproject
Adds a new project to the system 

`node hooker-cmd.js addproject [project name] [project path] [project secret]`

**Arguments:**
- **project label**: must contain only alphanumeric and the hyphen symbol. This is forced to lowercase. Labels are used by you to identify your project to the system and a part of the URL
that the web-hook requests, so keep it simple.

- **project path**: the path to your project, spaces have to be escaped so just don't use them. When you push, hooker goes to this directory to do a pull.

- **project secret (optional)**: A big string that you're going to give to the hook provider to validate that the hook message is legit. This is hashed before storage so make sure you keep it handy.

If you  don't provide the secret, one is generated for you and spit out in the console.

## addcommand
Adds a launch command to your project to be performed after build, these will be sequentially called from the project path provided.

`node hooker-cmd.js addcommand [project name] [command text]`

- **project name**: The label of the project you want to add the command to

- **command text**: Encapsulate this in quotes to deal with spaces, put in the terminal commands you want to be performed after the pull is complete.

## listcommands
Show the commands that a particular project calls after build time

`node hooker-cmd.js listcommands [project name]`

## listprojects

Show all projects the system is tracking

`node hooker-cmd.js listprojects`

## setpath

Change a project's path

`node hooker-cmd.js setpath [project name] [new path]`

## setsecret

Change a project's secret

`node hooker-cmd.js setsecret [project name] [new secret]`