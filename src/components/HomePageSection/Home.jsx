import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { actions } from "../../actions";
import { blogReducer, initialState } from "../../reducers/BlogReducer";
import BlogCard from "../profile/post/BlogCard";
import Sidebar from "./Sidebar";

const Home = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            dispatch({ type: actions.blog.DATA_FETCHING });
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}`
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.DATA_FETCHED,
                        data: response.data,
                    });
                }
            } catch (error) {
                console.log(error);
                dispatch({
                    type: actions.blog.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchBlogs();
    }, [page]);

    if (state?.loading) {
        return <div>Loading...</div>;
    }
    if (state?.error) {
        return <div>{state.error}</div>;
    }

    return (
        <main>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        <div className="space-y-3 md:col-span-5">
                            {state?.blogs?.blogs &&
                                state.blogs.blogs.map((blog) => (
                                    <Link
                                        to={`/blogs/${blog.id}`}
                                        key={blog.id}
                                    >
                                        <BlogCard
                                            blog={blog}
                                            // avatar={blog.author.avatar}
                                        />
                                    </Link>
                                ))}
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
