import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { Button } from "@mui/material";
import User from "./UserCard/UserCard";
import { useGlobalContext } from "../../../context";

function Content() {
    const [users, setUsers] = useState([]);
    const { getLocalStorage } = useGlobalContext();
    const [loggedUser] = useState(getLocalStorage("profile"));

    const getUsers = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/users/${loggedUser?.id}/related`
            );
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="col-md-8">
            <div className={styles.content}>
                <div className={`${styles.box}`}>
                    <div className={styles.box__header}>
                        <span className={styles.box__text}>
                            No pending invitations
                        </span>
                        <Button className={styles.box__btn}>Manage</Button>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.box__header}>
                        <span className={styles.box__text}>
                            People you may know
                        </span>
                        <Button className={styles.box__btn}>See all</Button>
                    </div>

                    <div className={`row ${styles.users__list}`}>
                        {users?.map((user) => (
                            <User user={user} key={user?.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
