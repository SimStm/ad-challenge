import mongoose from "mongoose"
const Schema = mongoose.Schema

import { EConversionType } from '../models/_enumerators'

const collectionName = 'campaigns'

const schema = new mongoose.Schema({
    totalClicks: { type: Number, required: true, default: 0 },
    dateLastEventReceived: { type: Date, default: Date.now },
})

export default schema