import ProductManager from "../classes/ProductManager.js";

const productManager = new ProductManager("./src/data/products.json");

const socketProducts = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on("newProduct", async (data) => {
            data.price = parseInt(data.price);
            data.stock = parseInt(data.stock);

            await productManager.addProduct(data)
        });

        socket.on("deleteProduct", async (productId) => {
            productId.id = parseInt(productId.id);

            await productManager.deleteProduct(productId.id);
        });
    });
}

export default socketProducts;