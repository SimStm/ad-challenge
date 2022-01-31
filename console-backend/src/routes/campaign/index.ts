import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import _ from 'lodash'

import { ApiResponse } from '../../models/_apiResponse'
import Campaign from '../../models/campaigns'

export default (express: Application) => <Resource> {
    /**
     * @openapi
     * /campaign:
     *  get:
     *      description: Gets all the campaigns in the database
     *      responses:
     *          200:
     *              description: Returns an array of campaigns.
     */
    get: async (req: Request, res: Response) => {
        try {
            const campaigns = await Campaign.find()
            res.status(200).send(new ApiResponse(200, undefined, campaigns))
        } catch(ex: any) {
            res.status(500).send(new ApiResponse(500, 'An error occurred', undefined, ex.message))
        }
    },

    /**
     * @openapi
     * /campaign:
     *   post:
     *     description: Creates a new campaign in the database
     *     responses:
     *       200:
     *         description: Returns the created campaign.
     *       500:
     *         description: Returns the validation errors
     */
    post: async (req: Request, res: Response) => {
        try {
            if(!req.body) throw new Error(`Request Body is missing`)

            const newCampaignObj = new Campaign(req.body)
            const savedCampaign = await newCampaignObj.save()

            res.status(200).send(new ApiResponse(200, undefined, savedCampaign))
        } catch(ex: any) {
            res.status(500).send(new ApiResponse(500, ex._message, _.map(ex.errors, (o: any) => o.message)))
        }
    }
}