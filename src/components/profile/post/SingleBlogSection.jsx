import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";
import { useAuth } from "../../../hooks/useAuth";
import BlogPostAction from "./BlogPostAction";
import SingleBlogContent from "./SingleBlogContent";
import CommentsSection from "./comments/CommentsSection";

const SingleBlogSection = () => {
    const { auth } = useAuth();
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
                );
                setBlog(response.data);
            } catch (error) {
                if (error?.response?.data?.message === "Blog not found") {
                    navigate("/notfound", { replace: true });
                }
                console.log(error?.response?.data?.message ?? error.message);
            }
        };

        fetchBlog();
    }, [blogId]);

    return (
        <main>
            {blog && <SingleBlogContent blog={blog} />}
            {blog?.comments ? (
                <CommentsSection blog={blog} />
            ) : (
                <p className="text-yellow-500 text-xs text-center">
                    {" "}
                    This blog is not commentable!
                </p>
            )}
            {blog && <BlogPostAction blog={blog} />}
        </main>
    );
};

export default SingleBlogSection;
