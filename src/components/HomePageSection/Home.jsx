import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { usePostContext } from "../../providers/DeleteProvider";
import BlogCard from "../profile/post/BlogCard";
import Sidebar from "./Sidebar";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const { postDeleted } = usePostContext();
    const loaderRef = useRef(null);
    const blogPerPage = 10;

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/blogs?page=${page}&limit=${blogPerPage}`
                );

                if (response.status === 200) {
                    const fetchedBlogs = response.data.blogs;
                    if (fetchedBlogs.length === 0) {
                        setHasMore(false);
                    } else {
                        setBlogs((prevBlogs) => [
                            ...prevBlogs,
                            ...fetchedBlogs,
                        ]);
                        setPage((prevPage) => prevPage + 1);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const onIntersect = (items) => {
            const loaderItem = items[0];
            if (loaderItem.isIntersecting && hasMore && !loading) {
                fetchBlogs();
            }
        };

        const observer = new IntersectionObserver(onIntersect);

        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [page, postDeleted, hasMore, loading]);

    return (
        <main>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        <div className="space-y-3 md:col-span-5">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                            {hasMore ? (
                                <p ref={loaderRef} className="text-center">
                                    Loading more blogs...
                                </p>
                            ) : (
                                <p className="text-center !my-12">
                                    No more blogs available
                                </p>
                            )}
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
