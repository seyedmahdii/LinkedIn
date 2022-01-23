import { useEffect } from "react";
import styles from "./Alert.module.css";

const Alert = ({ type, message, removeAlert, envoker, time = 3500, show }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, time);
        return () => clearTimeout(timeout);
    }, [envoker]);

    if (!show) {
        return null;
    }
    return (
        <div className={styles["alert__wrapper"]}>
            <span
                className={`${styles.alert} ${styles[`alert--${type}`]} ${
                    show && styles["alert--show"]
                }`}
            >
                {message}
            </span>
        </div>
    );
};

export default Alert;
