import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";

const Profile = () => {
    const { api } = useApi();
    const { auth } = useAuth();

    // const [user, setUser] = useState(null);
    // const [blogs, setBlogs] = useState([]);

    const { state, dispatch } = useProfile();
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
                // setUser({
                //     id: response?.data?.id,
                //     email: response?.data?.email,
                //     firstName: response?.data?.firstName,
                //     lastName: response?.data?.lastName,
                //     bio: response?.data?.bio,
                //     avatar: response?.data?.avatar,
                // });
                // setBlogs(response?.data?.blogs);
            } catch (error) {
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    error: error.message,
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
                {/* <!-- profile info --> */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* <!-- profile image --> */}
                    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
                        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                            {/* <!-- User's first name initial --> */}
                            <span className="">S</span>
                        </div>

                        <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
                            <img src="./assets/icons/edit.svg" alt="Edit" />
                        </button>
                    </div>
                    {/* <!-- name , email --> */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                            {state?.user?.firstName} {state?.user?.lastName}
                        </h3>
                        <p className="leading-[231%] lg:text-lg">
                            {state?.user?.email}
                        </p>
                    </div>

                    {/* <!-- bio --> */}
                    <div className="mt-4 flex items-start gap-2 lg:mt-6">
                        <div className="flex-1">
                            <p className="leading-[188%] text-gray-400 lg:text-lg">
                                {state?.user?.bio}
                            </p>
                        </div>
                        {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
                        <button className="flex-center h-7 w-7 rounded-full">
                            <img src="./assets/icons/edit.svg" alt="Edit" />
                        </button>
                    </div>
                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
                </div>
                {/* <!-- end profile info --> */}

                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <div className="my-6 space-y-4">
                    {/* <!-- Blog Card Start --> */}
                    <div className="blog-card">
                        <img
                            className="blog-thumb"
                            src="./assets/blogs/Underrated Video.jpg"
                            alt=""
                        />
                        <div className="mt-2">
                            <h3 className="text-slate-300 text-xl lg:text-2xl">
                                React Fetch API
                            </h3>
                            <p className="mb-6 text-base text-slate-500 mt-1">
                                Aenean eleifend ante maecenas pulvinar montes
                                lorem et pede dis dolor pretium donec dictum.
                                Vici consequat justo enim. Venenatis eget
                                adipiscing luctus lorem.
                            </p>

                            {/* <!-- Meta Informations --> */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center capitalize space-x-2">
                                    <div className="avater-img bg-indigo-600 text-white">
                                        <span className="">S</span>
                                    </div>

                                    <div>
                                        <h5 className="text-slate-500 text-sm">
                                            Saad Hasan
                                        </h5>
                                        <div className="flex items-center text-xs text-slate-700">
                                            <span>June 28, 2018</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm px-2 py-1 text-slate-700">
                                    <span>100 Likes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Blog Card End --> */}
                </div>
            </div>
        </main>
    );
};

export default Profile;
