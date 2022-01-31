import mongoose from "mongoose"
const Schema = mongoose.Schema

import { EConversionType } from './_enumerators'
import Performance from '../schemas/performance'

const collectionName = 'campaigns'

const schema = new mongoose.Schema({
    publisherId: { type: Number, required: true },
    bidLimit: { type: Number, default: -1 },
    bidPerConversionType: { type: Number, required: true, default: 0 },
    conversionType: { type: String, enum: Object.values(EConversionType), required: true },
    targeting: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    performance: {
        totalClicks: { type: Number, required: true, default: 0 },
        dateLastEventReceived: { type: Date, default: Date.now },
    }
})

export default mongoose.model(collectionName, schema)