import { useEffect } from "react";

import { actions } from "../actions";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import ProfileInfo from "./profile/ProfileInfo";
import BlogPost from "./profile/post/BlogPost";

const Profile = () => {
    const { api } = useApi();
    const { auth } = useAuth();
    const { state, dispatch } = useProfile();
    console.log(state?.blogs);

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        const fetchProfile = async () => {
            try {
                const response = await api.get(`/profile/${auth?.user?.id}`);

                if (response?.status === 200) {
                    dispatch({
                        type: actions.profile.DATA_FETCHED,
                        data: response?.data,
                    });
                }
            } catch (error) {
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    error: error?.response?.data?.message ?? error.message,
                });
            }
        };

        fetchProfile();
    }, []);

    if (state?.loading) {
        return <div>Loading profile data...</div>;
    }
    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <ProfileInfo />
                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <div className="my-6 space-y-4">
                    {state?.blogs?.length === 0 && (
                        <div>You don&apos;t have any blogs</div>
                    )}
                    <BlogPost />
                </div>
            </div>
        </main>
    );
};

export default Profile;
