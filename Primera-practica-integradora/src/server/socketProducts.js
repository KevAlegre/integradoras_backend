import productModel from "../dao/models/products.model.js";

const socketProducts = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on("newProduct", async (data) => {
            data.price = parseInt(data.price);
            data.stock = parseInt(data.stock);

            await productModel.create(data);
        });

        socket.on("deleteProduct", async (productId) => {
            await productModel.deleteOne({_id: productId});
        });
    });
}

export default socketProducts;