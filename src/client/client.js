import mongoose, { model } from 'mongoose';

const ClientSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        default: 'CLIENT_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ClientSchema.methods.toJSON = function(){
    const {_v, password, _id, ...client} = this.toObject();
    client.uid = _id;
    return client;
}

export default mongoose.model('Client', ClientSchema);