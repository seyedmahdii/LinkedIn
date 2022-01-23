import styles from "./Feed.module.css";
import Content from "./Content/Content";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import RightSidebar from "./RightSidebar/RightSidebar";

function Feed() {
    return (
        <div className={styles.feed}>
            <div className="container">
                <div className="row">
                    <LeftSidebar />
                    <Content />
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}

export default Feed;
