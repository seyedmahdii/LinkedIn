import { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../../Assets/images/Linkedin-Logo.png";
import { IconButton, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import Alert from "../../Alert/Alert";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const history = useHistory();
    const { setLocalStorage } = useGlobalContext();
    const [alertData, setAlertData] = useState({
        show: false,
        message: "",
        type: "",
    });
    const [errors, setErrors] = useState({
        email: 0,
        password: 0,
    });

    const showAlert = (show, type, message) => {
        setAlertData({ show, type, message });
    };

    const handleOnChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((oldFormData) => {
            return { ...oldFormData, [name]: value };
        });
    };

    const onBlurHandler = (e) => {
        const type = e.target.type;
        const name = e.target.name;
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        if (value) {
            setErrors((oldFormData) => {
                return { ...oldFormData, [name]: 0 };
            });
        } else {
            setErrors((oldFormData) => {
                return { ...oldFormData, [name]: 1 };
            });
        }
    };

    const loginHandler = async () => {
        setFormData({
            ...formData,
        });
        await login(formData);
    };

    const login = async (body) => {
        try {
            const res = await fetch("http://localhost:8000/users/login", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await res.json();
            if (res.ok) {
                setLocalStorage("profile", data);
                history.replace(`/users/${data?.id}`);
            } else {
                showAlert(true, "danger", data);
            }
        } catch (error) {
            console.log("Error logging in", error);
        }
    };

    return (
        <div className={styles.register}>
            {/* Alert */}
            <Alert {...alertData} removeAlert={showAlert} envoker={login} />
            <div className="container">
                <div className={styles.logo__wrapper}>
                    <img src={logo} alt="logo" className={styles.logo} />
                </div>
                <h1 className={styles.title}>You're almost there!</h1>

                <div className={styles.box__wrapper}>
                    <div className={styles.box}>
                        <form className={styles.form}>
                            <div className={styles.form__row}>
                                <label htmlFor="email" className={styles.label}>
                                    Email
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.form__input}
                                        value={formData.email || ""}
                                        onChange={handleOnChange}
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.email !== 0 &&
                                        "Please enter your email address."}
                                </span>
                            </div>

                            <div className={styles.form__row}>
                                <label
                                    htmlFor="password"
                                    className={styles.label}
                                >
                                    Password (6 or more characters)
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type={
                                            isPasswordShown
                                                ? `text`
                                                : "password"
                                        }
                                        id="password"
                                        name="password"
                                        value={formData.password || ""}
                                        onChange={handleOnChange}
                                        onBlur={onBlurHandler}
                                        className={styles.form__input}
                                    />
                                    <IconButton
                                        onClick={() =>
                                            setIsPasswordShown(!isPasswordShown)
                                        }
                                        size="small"
                                    >
                                        {isPasswordShown ? (
                                            <VisibilityOffIcon fontSize="small" />
                                        ) : (
                                            <VisibilityIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </div>
                                <span className={styles.error}>
                                    {errors.password !== 0 &&
                                        "Please enter your password."}
                                </span>
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={loginHandler}
                                fullWidth
                                disableElevation
                                className={styles.primaryBtn}
                            >
                                Login
                            </Button>
                        </form>
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            fullWidth
                            disableElevation
                        >
                            Login with Google
                        </Button>
                        <div className={styles.login}>
                            <span>New on Linkedin? </span>
                            <a href="/signup">sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
