import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
         //if we delete the  _id: { $ne: loggedInUserId } }).select("-password") from the line above then we can send a message to ourself on the sidebar
         
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error in the getUsersForSidebar function" });
	}
};


