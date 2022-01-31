import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'

import { ApiResponse } from '../../models/_apiResponse'
import Campaign from '../../models/campaigns'

export default (express: Application) => <Resource> {
    /**
     * @openapi
     * /campaign/{id}:
     *   get:
     *     description: Get the campaign for the specified ID
     *     responses:
     *       200:
     *         description: Returns a single campaign if exists. Null if doesn't have any with the specified ID
     */
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            if(!id) throw new Error(`'id' is missing`)

            const oneCampaign = await Campaign.findById(id)
            res.status(200).send(new ApiResponse(200, undefined, oneCampaign))
        } catch(ex: any) {
            res.status(500).send(new ApiResponse(500, 'An error occurred', undefined, ex.message))
        }
    }
}