# Full Stack React

This repository combines the code from `create-react-app` with a Node.js Express server.

## Setup

1. Fork or Use Template to make a copy of this repository.
2. Clone the repository to your computer.
3. Make sure Postgres is running.
4. Create a database named `full-stack-react`
5. Run the SQL from [database.sql](./database.sql)
6. `npm install`

## Running the Server

Open a terminal window in VS Code and type:

```
npm run server
```

Leave that terminal running and open a new terminal window and type:

```
npm run client
```

When using a Node.js Express server with React, you will need two terminal tabs open to run your app. `npm run server` starts your Node.js Express server and allows your app to communicate with the database. `npm run client` starts the React development server which is responsible for live reloading and error checking.

### Changing the server port

If you change your server port, you **must** update the `package.json` to include the new port and restart your client (`ctrl c` followed by `npm run client`). The proxy url is what allows the React app to talk to the Node.js Express server. If the ports are different you will see a `403` error in the console.



