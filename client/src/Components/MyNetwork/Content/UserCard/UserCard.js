import styles from "./UserCard.module.css";
import profile from "../../../../Assets/images/defaultProfile.png";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../../../context";
import { useEffect, useState } from "react";
import universityLogo from "../../../../Assets/images/university-logo.jpg";

function UserCard({ user }) {
    const { getLocalStorage, setLocalStorage } = useGlobalContext();
    const [loggedUser, setLoggedUser] = useState(getLocalStorage("profile"));
    const [isConnected, setIsConnected] = useState(false);

    const connectUser = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/users/${loggedUser.id}/connect/${user?.id}`,
                {
                    method: "PATCH",
                }
            );
            const data = await res.json();
            if (res.ok) {
                setLocalStorage("profile", data);
                setLoggedUser(() => data);
                checkConnected(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectHandler = async () => {
        await connectUser();
    };

    const checkConnected = (lgU = loggedUser) => {
        if (lgU?.connectionId?.find((id) => id === user?.id)) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    };

    useEffect(() => {
        checkConnected();
    }, []);

    return (
        <div className={`col-sm-6 col-lg-4 ${styles.card}`}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <a href={`/users/${user?.id}`} className={styles.profile}>
                        <img src={profile} alt={user?.name} />
                    </a>
                </header>
                <div className={styles.body}>
                    <a href={`/users/${user?.id}`} className={styles.name}>
                        {user?.name}
                    </a>
                    <span className={styles.title}>{user?.workplace}</span>

                    <span className={styles.title}>
                        <img
                            src={universityLogo}
                            alt={`${user?.universityLocation} University`}
                        />
                        {user?.universityLocation}
                    </span>

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disableElevation
                        className={styles.card__btn}
                        onClick={connectHandler}
                    >
                        {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
