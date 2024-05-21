import productModel from "../dao/models/products.model.js";
import messageModel from "../dao/models/message.model.js";

const socketManager = (socketServer) => {
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

        socket.on("getUsername", async (username) => {
            const findUser = await messageModel.findOne({user: username});

            if (!findUser) {
                console.log("El user no existe");
                const user = await messageModel.create({
                    user: username,
                    message: `Bienvenido al chat ${username}!`
                });
                
                socket.emit("dataMessage", user);
            } else {
                socket.emit("dataMessage", findUser);
            }
        });

        socket.on("message", async (data) => {
            const messages = [];
            messages.push(data);
            socketServer.emit("messageLogs", messages);
        });
    });
}

export default socketManager;