import { useState, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../Assets/images/linkedin-nav.png";
import { useGlobalContext } from "../../context";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultProfile from "../../Assets/images/defaultProfile.png";
import profile from "../../Assets/images/profile.jpg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import CottageIcon from "@mui/icons-material/Cottage";
import GroupIcon from "@mui/icons-material/Group";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation, useHistory } from "react-router-dom";
import { IconButton, Button } from "@mui/material";

function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const { getLocalStorage, useOutsideAlerter, removeLocalStorage } =
        useGlobalContext();
    const [loggedUser] = useState(getLocalStorage("profile"));
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [openDD, setOpenDD] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const dropdownRef = useRef(null);
    const navItems = [
        {
            name: "home",
            icon: <HomeRoundedIcon />,
            activeIcon: <CottageIcon />,
            link: "/feed",
        },
        {
            name: "my network",
            icon: <GroupIcon />,
            activeIcon: <SupervisedUserCircleIcon />,
            link: "/mynetwork",
        },
        {
            name: "jobs",
            icon: <WorkIcon />,
            activeIcon: <WorkIcon />,
            link: "/jobs",
        },
        {
            name: "messaging",
            icon: <EmailIcon />,
            activeIcon: <DraftsIcon />,
            link: "/messaging",
        },
        {
            name: "notifications",
            icon: <NotificationsRoundedIcon />,
            activeIcon: <NotificationsActiveRoundedIcon />,
            link: "/notifications",
        },
    ];

    const dropdownHandler = () => {
        setOpenDD(!openDD);
    };

    const closeDDHandler = () => {
        setOpenDD(false);
    };

    useOutsideAlerter(dropdownRef, closeDDHandler);

    const logOutHandler = () => {
        history.replace("/login");
        removeLocalStorage("profile");
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.nav}>
                    <div className={styles.nav__left}>
                        <a href="/feed">
                            <img
                                src={logo}
                                alt="Logo"
                                className={styles.nav__logo}
                            />
                        </a>

                        <div className={styles.nav__search}>
                            <div className={styles["nav__input-wrapper"]}>
                                <SearchIcon
                                    className={styles["nav__search-icon"]}
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value.trim());
                                    }}
                                    className={styles.nav__input}
                                    placeholder="Search"
                                />
                                {searchQuery && (
                                    <CancelIcon
                                        className={styles["nav__clear-input"]}
                                        onClick={() => setSearchQuery("")}
                                    />
                                )}
                            </div>
                            <div
                                className={`${styles["nav__search-result"]} ${
                                    searchQuery
                                        ? styles["nav__search-result--show"]
                                        : undefined
                                }`}
                            >
                                {isLoading ? (
                                    <h4>Loading...</h4>
                                ) : (
                                    users?.map((item) => {
                                        return (
                                            <a
                                                href={`/${item.username}`}
                                                className={
                                                    styles["nav__search-item"]
                                                }
                                                title={item.username}
                                                key={item._id}
                                            >
                                                <div
                                                    className={
                                                        styles[
                                                            "nav__search-image-box"
                                                        ]
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            item?.image
                                                                ? item?.image
                                                                : profile
                                                        }
                                                        alt="Profile"
                                                        className={
                                                            styles[
                                                                "nav__search-image"
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles[
                                                            "nav__search-info"
                                                        ]
                                                    }
                                                >
                                                    <h5>{item.username}</h5>
                                                    <span>{item.name}</span>
                                                </div>
                                            </a>
                                        );
                                    })
                                )}

                                {!isLoading && users?.length === 0 ? (
                                    <div
                                        className={
                                            styles["nav__search--no-result"]
                                        }
                                    >
                                        <span>No results found.</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className={styles.nav__right}>
                        {navItems.map((item, i) => (
                            <a
                                href={item.link}
                                className={`${styles["nav-item"]} ${
                                    location.pathname === item.link
                                        ? styles["nav-item--active"]
                                        : undefined
                                }`}
                                key={i}
                            >
                                {location.pathname === item.link
                                    ? item.activeIcon
                                    : item.icon}
                                <span>{item.name}</span>
                                <div
                                    className={`${
                                        styles["nav-item-underline"]
                                    } ${
                                        location.pathname === item.link
                                            ? styles[
                                                  "nav-item-underline--active"
                                              ]
                                            : undefined
                                    }`}
                                ></div>
                            </a>
                        ))}
                        <div
                            className={styles["nav-profile"]}
                            onClick={dropdownHandler}
                            ref={dropdownRef}
                        >
                            <img
                                src={profile}
                                alt={loggedUser?.name}
                                className={styles["profile-img"]}
                            />
                            <span className={styles["nav-profile-arrow"]}>
                                <span>Me</span>
                                <ArrowDropDownIcon
                                    className={`${styles["user-arrow"]} ${
                                        openDD
                                            ? styles["user-arrow--show"]
                                            : undefined
                                    }`}
                                />

                                {/* Dropdown */}
                                <div
                                    className={`${styles.dropdown} ${
                                        openDD
                                            ? styles["dropdown--show"]
                                            : undefined
                                    }`}
                                >
                                    <a
                                        href={`/users/${loggedUser?.id}`}
                                        className={styles["dropdown__header"]}
                                    >
                                        <div
                                            className={
                                                styles["dropdown__header-row"]
                                            }
                                        >
                                            <img src={profile} alt="profile" />
                                            <div>
                                                <h3>{loggedUser?.name}</h3>
                                                <h4>{loggedUser?.workplace}</h4>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            fullWidth
                                            disableElevation
                                            className={
                                                styles["dropdown__header-btn"]
                                            }
                                        >
                                            View Profile
                                        </Button>
                                    </a>

                                    <div className={styles["dropdown__group"]}>
                                        <span
                                            className={
                                                styles["dropdown__title"]
                                            }
                                        >
                                            Account
                                        </span>
                                        <a
                                            href="/"
                                            className={styles["dropdown__link"]}
                                        >
                                            <span>Settings & Privacy</span>
                                        </a>

                                        <a
                                            href="/"
                                            className={styles["dropdown__link"]}
                                        >
                                            Help
                                        </a>
                                        <a
                                            href="/"
                                            className={styles["dropdown__link"]}
                                        >
                                            Language
                                        </a>
                                    </div>

                                    <div className={styles["dropdown__group"]}>
                                        <span
                                            className={
                                                styles["dropdown__title"]
                                            }
                                        >
                                            Manage
                                        </span>

                                        <a
                                            href="/"
                                            className={styles["dropdown__link"]}
                                        >
                                            Posts & Activity
                                        </a>
                                        <a
                                            href="/"
                                            className={styles["dropdown__link"]}
                                        >
                                            Job Posting Account
                                        </a>
                                    </div>
                                    <div className={styles["dropdown__group"]}>
                                        <button
                                            onClick={logOutHandler}
                                            type="button"
                                            className={styles["dropdown__link"]}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
