import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateTokens.js";


export const signup = async (req, res) => {
   try {
       const { fullname, username, email, phone_number, password, confPassword, gender } = req.body;
       //refactor

       if (password !== confPassword) {
           return res.status(400).json({ error: "Passwords do not match" });
       }

       const existingUser = await User.findOne({ username });
       if (existingUser) {
           return res.status(400).json({ error: "Username is already in use" });
       }

       const existingPhoneNumber = await User.findOne({ phone_number });
       if (existingPhoneNumber) {
           return res.status(400).json({ error: "Phone number is already in use" });
       }

       const existingEmail = await User.findOne({email});
       if (existingEmail) {
           return res.status(400).json({ error: "Email is already used" });
       }
   //Hashed password
    const salt = 10; // Number of salt rounds for hashing
    const hashedPassword= await bcryptjs.hash(password,salt);


     const maleAvatar= `https://avatar.iran.liara.run/public/boy?username=${username}`;
     const femaleAvatar =`https://avatar.iran.liara.run/public/girl?username=${username}`;

     const newUser= new User ({
        fullname,
        username,
        email,
        phone_number,
        password:hashedPassword,
        gender,
        profilePic: gender==="male"? maleAvatar:femaleAvatar
     })

     if(newUser) {
        //Generate JWT token
        generateTokenAndSetCookies(newUser._id, res); 
        await newUser.save();

     res.status(201).json({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        email:newUser.email,
        phone_number:newUser.phone_number,
        profilePic:newUser.profilePic
     })
     }
     else{
        res.status(400).json({error:"Invalid data"});
     }   

   } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({error:"internal error in signUp function"})
    
   }
}

//********************************************************************************** */

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(500).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(500).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookies(user._id, res);

    res.status(200).json({
      id: user._id,
      username: user.username,
      profilePic: user.profilePic,
      fullname: user.fullname,
    });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ error: "Internal error in Login function" });
  }
};
    

//********************************************************************************** */


export const logout = async(req,res)=> {

  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"})
  } catch (error) {
    console.log("Error in logout",error.message);
    res.status(500).json({error:"internal error in controllers.js"});
  }
}