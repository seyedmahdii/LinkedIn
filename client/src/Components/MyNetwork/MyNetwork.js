import styles from "./MyNetwork.module.css";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";

function MyNetwork() {
    return (
        <div className={styles.network}>
            <div className="container">
                <div className="row">
                    <Sidebar />
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default MyNetwork;
