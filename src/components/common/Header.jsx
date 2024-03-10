import { Link } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import Logout from "../auth/Logout";

const Header = () => {
    const { auth } = useAuth();
    const profile = useProfile();
    const user = profile?.state?.user ?? auth?.user;

    return (
        <header>
            <nav className="container">
                <div>
                    <Link to="/">
                        <img className="w-32" src={Logo} alt="lws" />
                    </Link>
                </div>
                <div>
                    <ul className="flex items-center space-x-5">
                        {user && (
                            <li>
                                <Link
                                    to="/createBlog"
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Write
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/search"
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <img src={SearchIcon} alt="Search" />
                                <span>Search</span>
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Logout />
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-white/50 hover:text-white transition-all duration-200"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                        {user && (
                            <li className="flex items-center">
                                <div
                                    className={`avater-img ${
                                        !user?.avatar && "bg-orange-600"
                                    }  text-white`}
                                >
                                    {user.avatar ? (
                                        <img
                                            className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full"
                                            src={`${
                                                import.meta.env
                                                    .VITE_SERVER_BASE_URL
                                            }/uploads/avatar/${user.avatar}`}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <span className="text-xl">
                                            {user?.firstName[0]}
                                        </span>
                                    )}
                                </div>
                                <Link to="/profile">
                                    <span className="text-white ml-2">
                                        {user?.firstName}
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
