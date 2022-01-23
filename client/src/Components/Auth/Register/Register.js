import { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../../Assets/images/Linkedin-Logo.png";
import { Button, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import Alert from "../../Alert/Alert";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        dateOfBirth: "",
        universityLocation: "",
        field: "",
        workplace: "",
        specialties: [],
        connectionId: [],
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [errors, setErrors] = useState({
        email: 0,
        password: 0,
        name: 0,
        dateOfBirth: 0,
        universityLocation: 0,
        field: 0,
        workplace: 0,
        specialties: 0,
    });
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const history = useHistory();
    const { setLocalStorage } = useGlobalContext();
    const [alertData, setAlertData] = useState({
        show: false,
        message: "",
        type: "",
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

    const newUserHandler = async () => {
        await addNewUser({
            ...formData,
            dateOfBirth: `${selectedDate?.year}/${selectedDate?.month}/${selectedDate?.day}`,
        });
    };

    const addNewUser = async (body) => {
        try {
            const res = await fetch("http://localhost:8000/users/register", {
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
            console.log("Error adding new user", error);
        }
    };

    return (
        <div className={styles.register}>
            {/* Alert */}
            <Alert
                {...alertData}
                removeAlert={showAlert}
                envoker={addNewUser}
            />
            <div className="container">
                <div className={styles.logo__wrapper}>
                    <img src={logo} alt="logo" className={styles.logo} />
                </div>
                <h1 className={styles.title}>
                    Make the most of your professional life
                </h1>

                <div className={styles.box__wrapper}>
                    <div className={styles.box}>
                        <form className={styles.form}>
                            <div className={styles.form__row}>
                                <label htmlFor="name" className={styles.label}>
                                    Name
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={styles.form__input}
                                        value={formData.name || ""}
                                        onChange={handleOnChange}
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.name !== 0 &&
                                        "Please enter your name."}
                                </span>
                            </div>

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
                                    htmlFor="university"
                                    className={styles.label}
                                >
                                    University
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type="text"
                                        id="university"
                                        name="universityLocation"
                                        className={styles.form__input}
                                        value={
                                            formData.universityLocation || ""
                                        }
                                        onChange={handleOnChange}
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.universityLocation !== 0 &&
                                        "Please enter your university."}
                                </span>
                            </div>

                            <div className={styles.form__row}>
                                <label htmlFor="field" className={styles.label}>
                                    Field
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type="text"
                                        id="field"
                                        name="field"
                                        className={styles.form__input}
                                        value={formData.field || ""}
                                        onChange={handleOnChange}
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.field !== 0 &&
                                        "Please enter your field."}
                                </span>
                            </div>

                            <div className={styles.form__row}>
                                <label
                                    htmlFor="workplace"
                                    className={styles.label}
                                >
                                    Workplace
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type="text"
                                        id="workplace"
                                        name="workplace"
                                        className={styles.form__input}
                                        value={formData.workplace || ""}
                                        onChange={handleOnChange}
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.workplace !== 0 &&
                                        "Please enter your workplace."}
                                </span>
                            </div>

                            <div className={styles.form__row}>
                                <label
                                    htmlFor="dateOfBirth"
                                    className={styles.label}
                                >
                                    Birthdate
                                </label>
                                <div
                                    className={styles["form__input-wrapper"]}
                                    style={{ overflow: "visible" }}
                                >
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        shouldHighlightWeekends
                                        locale="fa"
                                        inputPlaceholder="Birthdate"
                                        inputClassName={
                                            styles["form__date-input"]
                                        }
                                        colorPrimary="#0a66c2"
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.dateOfBirth !== 0 &&
                                        "Please enter your birthdate"}
                                </span>
                            </div>

                            <div className={styles.form__row}>
                                <label
                                    htmlFor="specialties"
                                    className={styles.label}
                                >
                                    Specialties
                                </label>
                                <div className={styles["form__input-wrapper"]}>
                                    <input
                                        type="text"
                                        id="specialties"
                                        name="specialties"
                                        className={styles.form__input}
                                        value={formData.specialties}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                specialties:
                                                    e.target.value.split(","),
                                            })
                                        }
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                                <span className={styles.error}>
                                    {errors.workplace !== 0 &&
                                        "Please enter your workplace."}
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

                            <span className={styles.policy}>
                                By clicking Agree & Join, you agree to the
                                LinkedIn&nbsp;
                                <a href="" className={styles.policy__link}>
                                    User Agreement
                                </a>
                                ,&nbsp;
                                <a href="" className={styles.policy__link}>
                                    Privacy Policy
                                </a>
                                ,&nbsp;
                                <a href="" className={styles.policy__link}>
                                    Cookie Policy
                                </a>
                                .
                            </span>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={newUserHandler}
                                fullWidth
                                disableElevation
                                className={styles.primaryBtn}
                            >
                                Agree & Join
                            </Button>
                        </form>
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            fullWidth
                            disableElevation
                        >
                            Join with Google
                        </Button>
                        <div className={styles.login}>
                            <span>Already on LinkedIn? </span>
                            <a href="/login">Sign in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
