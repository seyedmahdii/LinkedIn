import styles from "./LeftSidebar.module.css";

function LeftSidebar() {
    return (
        <aside className="col-md-3">
            <div className={styles.sidebar}>
                <div className={styles.box}>
                    <h1>left sidebar</h1>
                </div>
            </div>
        </aside>
    );
}

export default LeftSidebar;
