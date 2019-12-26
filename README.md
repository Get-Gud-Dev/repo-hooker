# Repo-Hooker

This is a general purpose application that accepts web hooks and does stuff with them. The intended use case is automated testing builds which go to a remote server. A project can be configured to listen for push events and then pull, rebuild and deploy itself automatically.

## Usage

To modify your application's launch parameters on the database it is necessary to call the `program.js` application from the commandline on the server machine using the following commands

### Create

`node /path/to/program.js create [project name] [project path] [project secret]`

**Arguments:**
- **project label**: must contain only alphanumeric and the hyphen symbol. This is forced to lowercase. Labels are used by you to identify your project to the system and should be simple.

- **project path**: the path to your project, spaces have to be escaped so just don't use them

- **project secret (optional)**: A big string that you're going to give to the hook provider to validate that the hook message is legit. This is hashed before storage so make sure you keep it handy.

If you  don't provide the secret, one is generated for you and spit out in the console.