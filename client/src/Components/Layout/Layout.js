import styles from "./Layout.module.css";

function Layout({ children }) {
    return <div className={styles.layout}>{children}</div>;
}

export default Layout;
