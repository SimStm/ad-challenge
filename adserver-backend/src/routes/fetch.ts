import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'

import { ApiResponse } from '../models/_apiResponse'
import Campaign from '../models/campaigns'

export default (express: Application) => <Resource> {
  /**
     * @openapi
     * /fetch:
     *   get:
     *     description: Get the best campaign that matches the specified targeting
     *     responses:
     *       200:
     *         description: Returns a single campaign if exists. Null if doesn't have any that matches the targeting.
     */
  get: async (req: Request, res: Response) => {
    const { targeting } = req.query
    
    try {
      if(!targeting) throw new Error(`'Targeting' is required`)

      const bestCampaign = await Campaign.find().sort([['bidPerConversionType', -1]]).findOne({ targeting: targeting }).exec()

      res.status(200).send(new ApiResponse(200, undefined, bestCampaign))
    } catch(ex: any) {
      res.status(500).send(new ApiResponse(500, 'An error occurred', undefined, ex.message))
    }
  }
}