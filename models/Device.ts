import mongoose, { Schema, model, Model } from 'mongoose';
import { IDevice } from '@/interface';

const deviceSchema = new Schema({

    nombre: { type: String, required: true },
    chipId: { type: String, required: true, unique: true },
    isPair: { type: Boolean, required: true, default:false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receta: { type: Schema.Types.ObjectId, ref: 'Recetario' }

}, {
    timestamps: true,
})

const Device:Model<IDevice> = mongoose.models.Device || model('Device',deviceSchema);

export default Device;