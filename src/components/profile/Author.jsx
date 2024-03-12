import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import BlogCard from "./post/BlogCard";

const Author = () => {
    const { id } = useParams();
    const { api } = useApi();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`/profile/${id}`);

                if (response?.status === 200) {
                    setProfile(response?.data);
                }
            } catch (error) {
                console.log(error?.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                {/* <!-- profile info --> */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* <!-- profile image --> */}
                    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
                        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                            {profile?.avatar ? (
                                <img
                                    className="max-w-full rounded-full"
                                    src={`${
                                        import.meta.env.VITE_SERVER_BASE_URL
                                    }/uploads/avatar/${profile?.avatar}`}
                                    alt={profile?.firstName}
                                />
                            ) : (
                                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                                    <span className="">
                                        {profile?.firstName?.toUpperCase()[0]}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <!-- name , email --> */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                            {profile?.firstName} {profile?.lastName}
                        </h3>
                        <p className="leading-[231%] lg:text-lg">
                            {profile?.email}
                        </p>
                    </div>

                    {/* <!-- bio --> */}
                    <div className="mt-4 flex items-start gap-2 lg:mt-6">
                        <div className="flex-1">
                            <p className="leading-[188%] text-gray-400 lg:text-lg">
                                {profile?.bio}
                            </p>
                        </div>
                    </div>
                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
                </div>
                {/* <!-- end profile info --> */}

                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
                    Blogs of {profile?.firstName} {profile?.lastName}{" "}
                </h4>
                <div className="my-6 space-y-4">
                    {profile?.blogs?.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Author;
