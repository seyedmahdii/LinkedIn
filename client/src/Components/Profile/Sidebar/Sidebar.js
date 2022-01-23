import styles from "./Sidebar.module.css";
import dreamJob from "../../../Assets/images/dream-job.jpg";
import HelpIcon from "@mui/icons-material/Help";

function Sidebar() {
    return (
        <aside className="col-md-4">
            <div className={styles.sidebar}>
                {/* Info */}
                <div className={styles.box}>
                    <div className={styles.info}>
                        <div className={styles.info__group}>
                            <a
                                href="/edit-profile"
                                className={styles["info__group-title"]}
                            >
                                Edit public profile & URL
                            </a>
                            <HelpIcon className={styles["info__group-icon"]} />
                        </div>
                        <div className={styles.info__group}>
                            <a
                                href="/edit-profile"
                                className={styles["info__group-title"]}
                            >
                                Add profile in another language
                            </a>
                            <HelpIcon className={styles["info__group-icon"]} />
                        </div>
                    </div>
                </div>

                {/* Dream Job */}
                <div className={styles.box}>
                    <a
                        href="https://www.linkedin.com/jobs/?trk=consumer_jobs_global_fallback"
                        className={styles["dream-job-link"]}
                    >
                        <img src={dreamJob} alt="dream job" />
                    </a>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
