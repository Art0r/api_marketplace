import {Response, Request} from "express"
import ProductModel from '../database/ProductModel';
import ProductSeeder from "../database/seeders/ProductSeeder";

interface Product {
    name: String,
    description: String,
    price: String
}

class ProductController {

    async seedProduct(req: Request, res: Response){
        if (process.env['NODE_ENV'] == 'development'){
            new ProductSeeder(30);
            res.send("Banco de dados povoado!");
        } else res.json({err: 'Ação restrita ao ambiente de desenvolvimento!'})
    }

    async deleteAllProducts(req: Request, res: Response) {
        if (process.env['NODE_ENV'] == 'development'){
            const arr: Array<any> = await ProductModel.find({});

            if (arr.length == 0) res.json({err: "Nenhum produto para deletar!"});

            await ProductModel.deleteMany({});
            res.send("Banco de dados esvaziado!");
        } else res.json({err: 'Ação restrita ao ambiente de desenvolvimento!'})
    }

    async getAllProducts(req: Request, res: Response) {
        try{
            const arr: Array<any> = await ProductModel.find({});
            
            if (arr.length == 0) {
                res.status(404);
                res.json({err: "Nenhum produto encontrado!"});

            } else res.send(arr); 

        } catch(err){
            res.status(400);
            res.json({err: err.message});
        }
    }

    async modifyProductPrice(req: Request, res: Response) {
        const id: String = req.params.id;
        const price: String = req.body.price;

        try{
            await ProductModel.findByIdAndUpdate(id, {
                price,
            });
            res.status(200);
            res.send('Preço do produto modificado');
        }catch(err){
            res.status(400);
            res.json({err: err.message})
        }
    }

    async getProduct(req: Request, res: Response) {
        const id: String = req.params.id;

        try{
            const product = await ProductModel.findOne({_id: id});

            if (product == undefined){
                res.status(404);
                res.json({err: "Nenhum usuário não encontrado!"});
            }

            res.status(200);
            res.json(product);
        }catch(err){
            res.status(400);
            res.json({err: err.message});
        }
    }

    async createProduct(req: Request, res: Response){
        const { name, description, price } = req.body;

        const nameVerify: boolean = name != undefined && name != "" && name != " ";
        const descriptionVerify : boolean = description != undefined && description != "" && description != " ";
        const priceVerify : boolean = price != undefined && price != "" && price != " ";

        if (nameVerify && descriptionVerify && priceVerify) {
            const product: Product = {
                name, 
                description,
                price
            }

            try {
                await new ProductModel(product).save();
                res.status(200);
                res.send("Input Completo");
            } catch (err) {
                res.status(400);
                res.json({err: err.message});
            }
                    
        } else {
            res.status(400);
            res.json({err: "Input incompleto!"});
        }
    }
}

export default new ProductController();