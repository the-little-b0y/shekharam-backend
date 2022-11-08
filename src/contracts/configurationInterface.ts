import mongoose from "mongoose"

export interface CollectionItemType {
    itemtype: string,
    itemimage: string
}

export interface ConditionType {
    conditiontype: string
}

export interface ConfigurationInterface {
    userid: mongoose.ObjectId,
    collectionItemTypes: CollectionItemType[],
    conditionTypes: ConditionType[],
    currency?: string,
    status: number,
    actionCount: number,
    creation: Date,
    updation: Date
}
