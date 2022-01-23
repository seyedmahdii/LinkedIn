import styles from "./Profile.module.css";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";

function Profile() {
    return (
        <div className={styles.profile}>
            <div className="container">
                <div className="row">
                    <Content />
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}

export default Profile;
