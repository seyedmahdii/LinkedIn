import styles from "./Sidebar.module.css";
import dreamJob from "../../../Assets/images/dream-job.jpg";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleIcon from "@mui/icons-material/Article";
import FeedIcon from "@mui/icons-material/Feed";
import TagIcon from "@mui/icons-material/Tag";
import { useGlobalContext } from "../../../context";

function Sidebar() {
    const { getLocalStorage } = useGlobalContext();
    const loggedUser = getLocalStorage("profile");

    function Item({ title, Icon, number, link }) {
        return (
            <a href={link} className={styles.item}>
                <div className={styles.item__left}>
                    <Icon className={styles.item__icon} />
                    <span className={styles.item__title}>{title}</span>
                </div>
                <span className={styles.item__number}>{number}</span>
            </a>
        );
    }

    return (
        <aside className="col-md-4">
            <div className={styles.sidebar}>
                <div className={styles.box}>
                    <div className={styles.sum}>
                        <p className={styles.title}>Manage my network</p>

                        {/* List */}
                        <div className={styles.list}>
                            <Item
                                link="/"
                                title="Connections"
                                Icon={PermDeviceInformationIcon}
                                number={loggedUser?.connectionId?.length || 0}
                            />
                            <Item
                                link="/"
                                title="Contacts"
                                Icon={ContactsIcon}
                                number={144}
                            />
                            <Item
                                link="/"
                                title="People | Follow"
                                Icon={AccountCircleIcon}
                                number={2}
                            />
                            <Item link="/" title="groups" Icon={GroupIcon} />
                            <Item
                                link="/"
                                title="events"
                                Icon={EventNoteIcon}
                            />
                            <Item
                                link="/"
                                title="pages"
                                Icon={ArticleIcon}
                                number={4}
                            />
                            <Item
                                link="/"
                                title="newsletters"
                                Icon={FeedIcon}
                            />
                            <Item
                                link="/"
                                title="hashtags"
                                Icon={TagIcon}
                                number={10}
                            />
                        </div>

                        <a
                            href="https://www.linkedin.com/jobs/?trk=consumer_jobs_global_fallback"
                            className={styles["dream-job-link"]}
                        >
                            <img src={dreamJob} alt="dream job" />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
