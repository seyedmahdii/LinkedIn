import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const getPosts = async (req, res) => {
    try {
        const posts = JSON.parse(fs.readFileSync("./db/posts.json"));
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = JSON.parse(fs.readFileSync("./db/posts.json"));
        const thePost = posts.find((post) => post.id === id);

        if (thePost === undefined) {
            return res.status(404).json("No post with such a id");
        }

        res.status(200).json(thePost);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createPost = async (req, res) => {
    try {
        let newPost = req.body;
        let posts = JSON.parse(fs.readFileSync(`./db/posts.json`));
        newPost = {
            ...newPost,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        };
        posts = [newPost, ...posts];
        fs.writeFileSync(`./db/posts.json`, JSON.stringify(posts), (err) =>
            console.log(err)
        );
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json(error);
    }
};
