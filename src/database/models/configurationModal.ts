import { Schema, model } from 'mongoose';
import { CollectionItemType, ConfigurationInterface } from '../../contracts/configurationInterface';

const CollectionItemTypesSchema = new Schema<CollectionItemType> ({
    itemtype: { type: String },
    itemimage: { type: String }
});

const ConfigurationSchema = new Schema<ConfigurationInterface>({
    userid: {type: Schema.Types.ObjectId, ref : 'user'},
    collectionItemTypes: [CollectionItemTypesSchema],
    status: {type: Number, default: 1},
    actionCount: {type:Number, default:1},
    creation: { type: Date, default: Date.now },
    updation: { type: Date, default: Date.now }
});

export const Configuration = model<ConfigurationInterface>('configuration', ConfigurationSchema);