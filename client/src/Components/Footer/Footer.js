import styles from "./Footer.module.css";
import logo from "../../Assets/images/Linkedin-Logo.png";

function Footer() {
    return (
        <div className={styles.footer}>
            <div className="container">
                <div className={styles.logo}>
                    <img src={logo} alt="Linkedin logo" />
                </div>
                <span className={styles.subfooter}>
                    LinkedIn Corporation © 2022
                </span>
            </div>
        </div>
    );
}

export default Footer;
