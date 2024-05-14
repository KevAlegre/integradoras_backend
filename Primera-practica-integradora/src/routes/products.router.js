import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const productsRouter = Router();
const productManager = new ProductManager("./src/data/products.json");

productsRouter.get("/api/products", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.limitProducts(limit);
    res.send({products});
});

productsRouter.get("/api/products/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
        res.send({product});
    } else {
        res.send({message: "El producto con el ID ingresado no existe"});
    };
});

productsRouter.post("/api/products/", async (req, res) => {
    const product = req.body;
    const {title, description, price, code, stock, category, thumbnail} = product;

    if(!title, !description, !price, !code, !stock, !category) {
        return res.status(400).send({message: "Todos los campos son requeridos"})
    }

    const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: true,
        stock: stock,
        category: category,
        thumbnail: thumbnail || []
    }
    
    productManager.addProduct(newProduct);
    res.status(200).send({message: "Producto agregado con éxito"});
});

productsRouter.put("/api/products/:pid", async (req, res ) => {
    const productId = parseInt(req.params.pid);
    const products = await productManager.getProducts();
    const product = products.find((product) => product.id === productId);
    
    if (product) {
        const {key, value} = req.body;
        console.log(key, value);
        productManager.updateProduct(productId, key, value); 
        res.send({message: "Producto modificado correctamente."});
    }

    res.send({message: "El producto no se pudo actualizar."});
});

productsRouter.delete("/api/products/:pid", async(req, res) => {
    const productId = parseInt(req.params.pid);
    await productManager.deleteProduct(productId);
    res.send({message: "El producto se eliminó correctamente"});
});

export default productsRouter;