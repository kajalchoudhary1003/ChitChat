import { connectToDatabase } from "../../../utils/mongodb";
import User from "../../../models/User";
import { hash } from "bcrypt";

export const POST = async (req, res) => {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { username, email, password } = body;
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response(JSON.stringify(newUser), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new user", { status: 500 });
    }
}