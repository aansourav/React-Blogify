import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { actions } from "../../actions";
import { usePostContext } from "../../providers/DeleteProvider";
import { blogReducer, initialState } from "../../reducers/BlogReducer";
import BlogCard from "../profile/post/BlogCard";
import Sidebar from "./Sidebar";

const Home = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    const [page, setPage] = useState(1);
    const { postDeleted } = usePostContext();

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
    }, [page, postDeleted]);

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
                                    <BlogCard key={blog.id} blog={blog} />
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
