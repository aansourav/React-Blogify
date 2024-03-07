import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
    const { auth } = useAuth();
    return (
        <>
            {auth.accessToken ? (
                <ProfileProvider>
                    <Outlet />
                </ProfileProvider>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    );
};

export default PrivateRoutes;
