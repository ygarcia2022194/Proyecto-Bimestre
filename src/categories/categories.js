import mongoose, { mongo } from 'mongoose';

const CategoriesSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "The category is obligatory"]
    },
    descripcion:{
        type: String,
        required: [true, "The description is obligatory"]
    },
    /*producto: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },*/
    estado:{
        type: Boolean,
        default: true
    }
})

CategoriesSchema.methods.toJSON = function(){
    const {__v, _id, ...categories} = this.toObject();
    categories.uid = _id;
    return categories;
}

export default mongoose.model('Categories', CategoriesSchema);