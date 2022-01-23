import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { IconButton, Button } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import profileImg from "../../../Assets/images/profile.jpg";
import { useGlobalContext } from "../../../context";
import universityLogo from "../../../Assets/images/university-logo.jpg";
import tikkaaLogo from "../../../Assets/images/tikkaa-logo.jpg";
import { useParams } from "react-router-dom";

function Content() {
    const { getLocalStorage } = useGlobalContext();
    const [loggedUser] = useState(getLocalStorage("profile"));
    const { id } = useParams();
    const [user, setUser] = useState({});

    const getUser = async () => {
        try {
            const res = await fetch(`http://localhost:8000/users/${id}`);
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log("Error getting user", error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="col-md-8">
            <div className={styles.content}>
                <div className={styles.box}>
                    {/* Header */}
                    <div className={styles.profile__header}>
                        {/* Edit Icon */}
                        {user?.id === loggedUser?.id && (
                            <div className={styles["profile__header-edit"]}>
                                <IconButton
                                    color="primary"
                                    className={styles["profile__header-icon"]}
                                    size="small"
                                >
                                    <EditRoundedIcon fontSize="small" />
                                </IconButton>
                            </div>
                        )}

                        {/* Profile Image */}
                        <div className={styles["profile__img-wrapper"]}>
                            <img
                                src={profileImg}
                                alt="proifle"
                                className={styles.profile__img}
                            />
                        </div>
                    </div>

                    {/* General Info */}
                    <div className={styles.profile__info}>
                        <div className={styles["profile__info-left"]}>
                            <h1 className={styles.name}>{user?.name}</h1>
                            <h4 className={styles.workplace}>
                                {user?.workplace}
                            </h4>
                            <div>
                                <span className={styles.location}>
                                    Rasht, Gilan, Iran
                                </span>
                                <a
                                    href="/contact-info"
                                    className={styles["contact-info"]}
                                >
                                    Contact info
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className={styles.profile__item}>
                                <img
                                    src={universityLogo}
                                    alt={`${user?.universityLocation} University`}
                                />
                                <span>
                                    University of {user?.universityLocation}
                                </span>
                            </div>
                            <div className={styles.profile__item}>
                                <img src={tikkaaLogo} alt={user?.workplace} />
                                <span>{user?.workplace}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.connections}>
                        <a href="/connections">
                            {user?.connectionId?.length} connections
                        </a>
                    </div>

                    {/* Buttons */}
                    <div className={styles["profile__btn-wrapper"]}>
                        {user?.id === loggedUser?.id ? (
                            <Button
                                variant="contained"
                                className={styles.profile__btn}
                            >
                                Open to
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                className={styles.profile__btn}
                            >
                                Connect
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
