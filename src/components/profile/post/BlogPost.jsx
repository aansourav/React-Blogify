import { Link } from "react-router-dom";
import useProfile from "../../../hooks/useProfile";
import BlogCard from "./BlogCard";

const BlogPost = () => {
    const { state } = useProfile();
    const avatar = state?.user?.avatar;
    return (
        <>
            {state?.blogs &&
                state.blogs.map((blog) => (
                    <Link to={`/blogs/${blog.id}`} key={blog.id}>
                        <BlogCard blog={blog} avatar={avatar} />
                    </Link>
                ))}
        </>
    );
};

export default BlogPost;
