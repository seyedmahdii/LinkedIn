import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { Button, TextField } from "@mui/material";
import { useGlobalContext } from "../../../context";
import profile from "../../../Assets/images/profile.jpg";
import moment from "moment";

function Content() {
    const [posts, setPosts] = useState([]);
    const { getLocalStorage } = useGlobalContext();
    const loggedUser = getLocalStorage("profile");
    const [description, setDescription] = useState();

    const handleChange = (event) => {
        setDescription(event.target.value);
    };

    const getPosts = async () => {
        try {
            const res = await fetch(`http://localhost:8000/posts`);
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.log("Error reading posts", error);
        }
    };

    const addPost = async () => {
        try {
            const res = await fetch(`http://localhost:8000/post`, {
                method: "POST",
                body: JSON.stringify({
                    description,
                    creator_id: loggedUser.id,
                    creator_name: loggedUser.name,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            // const data = await res.json();
        } catch (error) {
            console.log("Error adding new post", error);
        }
    };

    const addPostHandler = async () => {
        await addPost();
        setDescription();
        await getPosts();
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="col-md-6">
            <div className={styles.content}>
                <div className={`${styles.box}`}>
                    <div className={styles.form}>
                        <a
                            href={`/users/${loggedUser.id}`}
                            className={styles.profile}
                        >
                            <img src={profile} alt={loggedUser.name} />
                        </a>

                        <TextField
                            id="outlined-basic"
                            label="Share a post"
                            variant="filled"
                            multiline
                            className={styles.input}
                            value={description}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                        />
                        <Button onClick={addPostHandler}>Post</Button>
                    </div>
                </div>

                {posts?.map((post) => {
                    return (
                        <div
                            className={`${styles.box} ${styles.post}`}
                            key={post?.id}
                        >
                            <h4>{post?.creator_name}</h4>
                            <h6>{moment(post?.createdAt).fromNow()}</h6>
                            <p>{post?.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Content;
