<h1 align="center">
  Spacio REST Service
</h1>


This service is a REST API that allows you to manage the data of the [Spacio Discord Bot project](https://github.com/wolfdev1/Spacio) and interact with other Spacio services in the future.


## 💻 Technologies

This project was on active development so is not finished yet and is possible that other technologies may added in the future, but it was built with

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [MongoDB](https://www.mongodb.com/) - A document-oriented NoSQL database used for high volume data storage.
- [Docker](https://www.docker.com/) - A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
- [GitHub Actions](https://github.com/features/actions) - Automate, customize, and execute your software development workflows right in your repository.

## 🤖 First steps

- You need to have [Node.js 19.x](https://nodejs.org/en/blog/release/v19.9.0) installed on your computer to start coding.
- To get all the project dependencies run at the root folder of your project `npm install`
- Configuration environment variables
  - Create a `.env` file at the root folder of your project
  - Create the following variables 
  ```
  MONGO_CONNECTION_URI=Your MongoDB connection string
  JWT_TOKEN=Default JWT token signed with HS256 (JWT_SECRET)
  JWT_SECRET=JWT Secret to sign your JWT tokens
  INVALID_JWT_TOKEN=Invalid JWT token to test the authentication
  TEST_USER_ID=Test user ID to test the authentication
  ```
  - Fill the variables with your own values
- To run the project in dev-mode run `npm run start:dev`
- To run the project in production mode run `npm run start:prod`
- To run tests run `npm run test`

It's optional but you can use [Docker](https://www.docker.com/) to run the project in a container and deploy easily in the future. The project has a preconfigured `Dockerfile` to deploy the project in a container.

The project is actually deployed in [FL{}](https://www.flo.com) servers using Docker

### 🚀 Start coding

- You can find the main file of the project in `src/main.ts`
- Actually the project has 8 modules
  - `app` - Default app module
  - `users` - Users module
  - `mod` - Guilds module
  - `channels` - Channels module
  - `auth` - Authentication module
  - `rank` - Rank module
  - `credentials` - Credentials module
  - `database` - Database module
- You can create a new module using the command `nest g module <module-name>` and nest will create a new module in the `src` folder

### 🚩 API Messages

The project works with a messages.ts file that contains all the messages that the API can return and sync with tests and other services. The file is located in `src/consts/messages.ts`

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


