import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleLogout = () => {
        setAuth({});
        navigate("/login");
    };
    return (
        <button
            onClick={handleLogout}
            className="text-white/50 hover:text-white transition-all duration-200"
        >
            Logout
        </button>
    );
};

export default Logout;
