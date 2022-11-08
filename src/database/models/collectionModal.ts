import { Schema, model } from 'mongoose';
import { CollectionCopyInterface, CollectionInterface } from '../../contracts/collectionInterface';

const CollectionCopySchema = new Schema<CollectionCopyInterface> ({
    copyqrcode: { type: String },
    condition: { type: String },
    purchaseprice: { type: String },
    marketprice: { type: String },
    remarks: { type: String },
    collectedfrom: { type: String },
    collectedon: { type: Date }
});

const CollectionSchema = new Schema<CollectionInterface>({
    userid: {type: Schema.Types.ObjectId, ref : 'user'},
    collectionof: { type: String },
    itemName: { type: String },
    color: { type: String },
    year: { type: String },
    uniqueFeature: { type: String },
    collectionSetQrcode: { type: String },
    country: { type: String },
    copies: [CollectionCopySchema],
    status: {type: Number, default: 1},
    actionCount: {type:Number, default:1},
    creation: { type: Date, default: Date.now },
    updation: { type: Date, default: Date.now }
});

export const Collection = model<CollectionInterface>('collection', CollectionSchema);