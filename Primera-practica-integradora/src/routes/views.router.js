import { Router } from "express";
import productModel from "../dao/models/products.model.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productModel.find();
        res.render("home", {products});
    } catch (error) {
        console.log(error);
    }
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {});
});

export default viewsRouter;