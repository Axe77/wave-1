import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: {
        type: "string",
        required: true
    },
    file: {
        filename: String,  // File name
        path: String,      // Path to the stored file
        mimetype: String,  // MIME type of the file
        size: Number       // Size of the file
    }
}, { timestamps: true });

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;









// THE OLD CODE BEFORE TRANSFERING FILE AND IMAGES FEATURE

// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     receiverId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     messages: {
//         type: "string",
//         required: true
//     }
// }, { timestamps: true });

// const Messages = mongoose.model("Messages", messageSchema);

// export default Messages;
