import mongoose from "mongoose";
const ShoppingCartSchema = mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
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
            type: Number,
            required: true
        },
        subTotal:{
            type: Number
        }
    }]
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);