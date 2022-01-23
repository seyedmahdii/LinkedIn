import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { FILE_NAME } from "../constants/index.js";

export const register = async (req, res) => {
    try {
        let newUser = req.body;
        const users = JSON.parse(fs.readFileSync(`./db/${FILE_NAME}`));
        const existingUser = users.find(
            (userItem) => userItem?.email === newUser?.email
        );

        if (existingUser) {
            return res.status(400).json(`Another account is using this email.`);
        }

        const hashedPassword = await bcrypt.hash(newUser?.password, 12);
        newUser = { ...newUser, id: uuidv4(), password: hashedPassword };
        users.push(newUser);

        fs.writeFileSync(`./db/${FILE_NAME}`, JSON.stringify(users), (err) =>
            console.log(err)
        );
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = JSON.parse(fs.readFileSync(`./db/${FILE_NAME}`));
        const theUser = users.find((u) => u?.email === email);
        console.log();

        // No user with this email
        if (theUser === undefined) {
            return res
                .status(404)
                .json(`The email you entered doesn't belong to an account.`);
        }

        // Wrong password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            theUser?.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json(`Sorry, your password was incorrect.`);
        }

        res.status(200).json(theUser);
    } catch (error) {
        res.status(500).json(error);
    }
};
