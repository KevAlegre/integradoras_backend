import mongoose from "mongoose";

const messageCollection = "Message";

const messageSchema = new mongoose.Schema({
    user: {type: String, require: true, max: 15},
    message: {type: String, require: true}
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;