import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Route to send a message to a specific user by id
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;





// import express from "express";
// import {sendMessage} from "../controllers/message.controllers.js";
// import protectRoute from "../middleware/protectRoute.js";

// const router = express.Router();

// router.post("/send/id", protectRoute ,sendMessage);


// export default router;