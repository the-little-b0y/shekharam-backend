import mongoose from "mongoose"

export interface CollectionInterface {
    userid: mongoose.ObjectId,
    collectionof: string,
    itemName: string,
    color: string,
    year: string,
    uniqueFeature: string,
    collectionSetQrcode: string,
    country: string,
    copies: CollectionCopyInterface[],
    status: number,
    actionCount: number,
    creation: Date,
    updation: Date
}

export interface CollectionCopyInterface {
    copyqrcode: string,
    condition: string,
    purchaseprice: string,
    marketprice: string,
    remarks: string,
    collectedfrom: string,
    collectedon?: Date
}