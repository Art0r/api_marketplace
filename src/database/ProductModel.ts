import connection from './connection';
import mongoose from 'mongoose';

const Model = new connection.Schema({
    name: String,
    description: String,
    price: String
});

const ProductModel = mongoose.model("products", Model);

export default ProductModel;