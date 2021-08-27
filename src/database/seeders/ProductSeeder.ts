import faker from 'faker';
import ProductModel from '../ProductModel';

class ProductSeeder {
    constructor(value_to_generate: Number){
        for (let i = 0; i < value_to_generate; i++){
            try {
                ProductModel.create({
                    "name": faker.commerce.productName(), 
                    "description": faker.lorem.text(),
                    "price": faker.commerce.price()
                });
            } catch (err) {
                console.log(err.message);   
            }
        }
    }
}

export default ProductSeeder;