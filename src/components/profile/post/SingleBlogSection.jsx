import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import { useAuth } from "../../../hooks/useAuth";
import BlogPostAction from "./BlogPostAction";
import SingleBlogContent from "./SingleBlogContent";
import CommentsSection from "./comments/CommentsSection";

const SingleBlogSection = () => {
    const { auth } = useAuth();
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
                );
                setBlog(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlog();
    }, [blogId]);

    return (
        <main>
            {blog && <SingleBlogContent blog={blog} />}
            {blog?.comments && <CommentsSection blog={blog} />}
            {blog && <BlogPostAction blog={blog} />}
        </main>
    );
};

export default SingleBlogSection;
