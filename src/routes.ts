import express from "express";
import ProductController from './controllers/ProductController';
const routes = express.Router();

// SEEDERS
routes.get('/products/seed', ProductController.seedProduct);

// DELETE
routes.delete('/products', ProductController.deleteAllProducts);


routes.get('/products', ProductController.getAllProducts);
routes.get('/products/:id', ProductController.getProduct);

routes.put('/products/:id', ProductController.modifyProductPrice);

routes.post('/products', ProductController.createProduct);

export default routes;