import mongoose from "mongoose";
const ShoppingCartSchema = mongoose.Schema({
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    productos:[{
        nombreProducto:{
            type: String,
            required: true
        },
        cantidad:{
            type: Number,
            required: true
        },
        precio: {
            type: Number
        },
        subTotal:{
            type: Number
        }
    }]
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);