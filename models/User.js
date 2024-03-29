import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    profileImage: {
        type: String,
        default: "",
    },
    chats: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
        default: [],
    },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;