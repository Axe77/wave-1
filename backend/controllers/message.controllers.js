import express from 'express';
import Conversation from '../models/conversation.model.js';
import Messages from '../models/message.model.js';
import protectRoute from '../middleware/protectRoute.js';
import { getReceiverSocketId } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message, file } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    let newMessage;

    if (file) {
      // If file is included in the request, handle file upload
      const { filename, path, mimetype, size } = req.file;

      newMessage = new Messages({
        senderId,
        receiverId,
        message,
        file: {
          filename,
          path,
          mimetype,
          size,
        },
      });
    } else {
      newMessage = new Messages({
        senderId,
        receiverId,
        message,
      });
    }

    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage Controller: ', error.message);
    res.status(500).json({ error: 'Internal error in sendMessage function message.controllers.js' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages');

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log('Error in getMessages Controller: ', error.message);
    res.status(500).json({ error: 'Internal error in getMessages function message.controllers.js' });
  }
};

export default sendMessage;















//THE OLD MESSAGE.CONTROLLER CODE BEFORE ADDING THE FILE TRANSFER FEATURE

// import express from "express";
// import Conversation from "../models/conversation.model.js";
// import Messages from "../models/message.model.js";
// import protectRoute from "../middleware/protectRoute.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Messages({
//       senderId,
//       receiverId,
//       messages: message, // Fixed variable to use 'message' instead of 'messages'
//     });

//     await newMessage.save();

//     conversation.messages.push(newMessage._id);

    
// 		if (newMessage) {
// 			conversation.messages.push(newMessage._id);
// 		}

//     await Promise.all([conversation.save(), newMessage.save()]);


//     const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			// io.to(<socket_id>).emit() used to send events to specific client
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage Controller: ", error.message);
//     res.status(500).json({ error: "Internal error in sendMessage function message.controllers.js" });
//   }
// };






// export const getMessages = async(req,res) =>{
//   try {
  
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId ] },
//     }).populate("messages");

//     res.status(200).json(conversation.message);



//   } catch (error) {
//     console.log("Error in getMessages Controller: ", error.message); 
//     res.status(500).json({ error: "Internal error in getMessages function message.controllers.js" });
//   }
// }

// export default sendMessage;