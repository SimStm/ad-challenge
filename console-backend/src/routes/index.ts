import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'

export default (express: Application) => <Resource> {
  get: (req: Request, res: Response) => {

    res
    .status(200)
    .send({ 
        message: 'Hello, Route!' 
    })
  }
}