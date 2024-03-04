
import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "The name is obligatory"]
    },
    correo:{
        type: String,
        required: [true, "The email is obligatory"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "The password is obligatory"]
    },
    role:{
        type: String,
        default: 'ADMIN_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
})

AdminSchema.methods.toJSON = function(){
    const {_v, password, id, ...admin} = this.toObjectId();
    admin.uid = _id;
    return admin;
}

export default mongoose.model('Admin', AdminSchema);