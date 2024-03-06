import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
    const { auth } = useAuth();
    return <>{auth.user ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default PrivateRoutes;
