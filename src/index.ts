import {Express} from "express";
import express from "express";
import routes from "./routes";

const app: Express = express();
const ENVIRONMENTS : Array<string> = ["development", "production", "test"];

process.env['NODE_ENV'] = ENVIRONMENTS[0];
process.env['PORT'] =  '3306';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', routes);

app.listen(process.env['PORT'], function () {
    console.log("App rodando");
});