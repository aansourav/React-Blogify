import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";

const Favourites = () => {
    const { api } = useApi();
    const [favouriteBlogs, setFavouriteBlogs] = useState([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
                );
                if (response.status === 200) {
                    setFavouriteBlogs(response?.data?.blogs);
                }
            } catch (error) {
                console.log(error?.response?.data?.message ?? error.message);
            }
        };
        fetchFavourites();
    }, []);

    if (favouriteBlogs.length === 0) {
        return (
            <p className="text-slate-500">
                You don&apos;t have any favourites!
            </p>
        );
    }

    return (
        <>
            {favouriteBlogs &&
                favouriteBlogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                {blog?.title}
                            </h3>
                            <p className="text-slate-600 text-sm">
                                {blog?.tags?.split(",").map((tag) => (
                                    <span key={tag} className="mr-2">
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </p>
                        </Link>
                    </li>
                ))}
        </>
    );
};

export default Favourites;
