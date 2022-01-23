import styles from "./RightSidebar.module.css";

function RightSidebar() {
    return (
        <aside className="col-md-3">
            <div className={styles.sidebar}>
                <div className={styles.box}>
                    <h1>right sidebar</h1>
                </div>
            </div>
        </aside>
    );
}

export default RightSidebar;
