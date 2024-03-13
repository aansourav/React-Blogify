import axios from "axios";
import { useEffect, useState } from "react";
import Favourites from "./Favourites";
import MostPopular from "./MostPopular";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
    const { auth } = useAuth();
    const [popularBlogs, setPopularBlogs] = useState("");
    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
                );
                setPopularBlogs(response.data.blogs);
            } catch (error) {
                console.log(error?.response?.data?.message ?? error.message);
            }
        };

        fetchPopular();
    }, []);

    return (
        <div className="md:col-span-2 h-full w-full space-y-5">
            <div className="sidebar-card">
                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Most Popular 👍️
                </h3>

                <ul className="space-y-5 my-5">
                    {popularBlogs &&
                        popularBlogs.map((blog) => (
                            <MostPopular key={blog.id} blog={blog} />
                        ))}
                </ul>
            </div>

            <div className="sidebar-card">
                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Your Favourites ❤️
                </h3>

                <ul className="space-y-5 my-5">
                    {auth?.user ? (
                        <Favourites />
                    ) : (
                        <p className="text-slate-500">
                            Login to see your favourites
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
