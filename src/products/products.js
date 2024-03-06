import mongoose from "mongoose";

const ProductsSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "The name is obligatory"]
    },
    categoria:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    }],
    marca: {
        type: String,
        required: [true, "The brand is obligatory"]
    },
    precio: {
        type: Number,
        required: [true, "The price is obligatory"]
    },
    stock:{
        type: Number,
        required: true
    },
    contadorVentas:{
        type: Number,
        default: 0
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ProductsSchema.methods.toJSON = function(){
    const {_v, _id,stock, contadorVentas, ...product} = this.toObject();
    product.uid = _id;
    return product;
}

export default mongoose.model('Products', ProductsSchema);