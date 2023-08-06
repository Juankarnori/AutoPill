import mongoose, { Schema, model, Model } from 'mongoose';
import { IRecetario } from '@/interface';

const recetarioSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    recetas: [{
        horario: { type: String, required: true},
        hora: { type: Number, required: true},
        pills: { type: [Schema.Types.ObjectId], ref: 'Pill' ,required: true},
    }],
    isLoaded: { type: Boolean, required: true, default: false },

}, {
    timestamps: true,
})

const Recetario:Model<IRecetario> = mongoose.models.Recetario || model('Recetario',recetarioSchema);

export default Recetario;