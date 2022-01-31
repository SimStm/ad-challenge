import express from 'express'
import autoroutes from 'express-automatic-routes'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

//import swaggerUi from 'swagger-ui-express'
//import swaggerJsdoc from 'swagger-jsdoc'

// Setup dotenv
dotenv.config()

// Setup Express.js server
const app = express();

// Setup Express Json middleware
app.use(express.json())

// Setup Express Cors
app.use(cors())

// Setup Express UrlEncode middleware
app.use(express.urlencoded({ extended: false }))

// Setup auto routing
autoroutes(app, {
  dir: (process.env.ROUTES_PATH ?? '')
})

// Setup Swagger
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Console API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./src/routes/*/**/*.ts'], // files containing annotations as above
// };

// const swaggerSpec = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup mongoose
const uri = (process.env.MONGO_CONNECTION_STRING ?? '')
                        .replace('$$USERNAME', (process.env.MONGO_USERNAME ?? ''))
                        .replace('$$PASSWORD', (process.env.MONGO_PASSWORD ?? ''))
                        .replace('$$DB', (process.env.MONGO_DBNAME ?? ''))
mongoose.connect(uri, () => { console.log('⚡️[server]: Connected to MongoDB database') })

const serverPort = (process.env.SERVER_PORT ?? '3000')
app.listen(serverPort, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${serverPort}`);
});