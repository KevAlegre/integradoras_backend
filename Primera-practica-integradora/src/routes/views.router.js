import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const viewsRouter = Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {products});
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {});
});

export default viewsRouter;