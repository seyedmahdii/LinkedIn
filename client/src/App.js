import "./styles/App.css";
import "./styles/grid.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";
import { useGlobalContext } from "./context";
import Profile from "./Components/Profile/Profile";
import Layout from "./Components/Layout/Layout";
import MyNetwork from "./Components/MyNetwork/MyNetwork";
import Feed from "./Components/Feed/Feed";
import { useState } from "react";

function App() {
    const { getLocalStorage } = useGlobalContext();
    const [user] = useState(getLocalStorage("profile"));
    const location = useLocation();
    const [showHeaderAndFooter] = useState(
        location.pathname !== "/login" && location.pathname !== "/signup"
    );

    return (
        <div className="linkedin">
            <BrowserRouter>
                {showHeaderAndFooter && <Header />}
                <Switch>
                    <Route path="/" exact>
                        {user ? (
                            <Redirect to={`/users/${user?.id}`} />
                        ) : (
                            <Login />
                        )}
                    </Route>
                    <Route path="/login" exact>
                        {user ? (
                            <Redirect to={`/users/${user?.id}`} />
                        ) : (
                            <Login />
                        )}
                    </Route>
                    <Route path="/signup" exact>
                        {user ? (
                            <Redirect to={`/users/${user?.id}`} />
                        ) : (
                            <Register />
                        )}
                    </Route>
                    <Route path="/users/:id" exact>
                        {user ? (
                            <Layout>
                                <Profile />
                            </Layout>
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/mynetwork" exact>
                        {user ? (
                            <Layout>
                                <MyNetwork />
                            </Layout>
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/feed" exact>
                        {user ? (
                            <Layout>
                                <Feed />
                            </Layout>
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                </Switch>
                {showHeaderAndFooter && <Footer />}
            </BrowserRouter>
        </div>
    );
}

export default App;
