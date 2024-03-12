import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import convertTime from "../../../utils/convertTime";
import ActionPopup from "./ActionPopup";

const BlogCard = ({ blog }) => {
    const profile = useProfile();
    const { auth } = useAuth();
    const user = profile?.state?.user ?? auth?.user;
    const { title, content, thumbnail, author, createdAt } = blog;
    const [likesCount, setLikesCount] = useState(blog?.likes?.length || 0);

    const location = useLocation();

    useEffect(() => {
        setLikesCount(blog?.likes?.length || 0);
    }, [blog?.likes]);

    const avatar =
        user?.id === blog?.author?.id ? user?.avatar : blog?.author?.avatar;

    return (
        <div className="blog-card relative">
            <Link
                to={`/blogs/${blog.id}`}
                className="blog-card hover:border-none transition-none hover:shadow-none shadow-none border-none"
            >
                <img
                    className="blog-thumb"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${thumbnail}`}
                    alt=""
                />
                <div className="mt-2">
                    <h3 className="text-slate-300 text-xl lg:text-2xl">
                        {title}
                    </h3>
                    <p className="mb-6 text-base text-slate-500 mt-1">
                        {content?.length > 330
                            ? `${content.substring(0, 330)} ...`
                            : content}
                    </p>

                    {/* <!-- Meta Informations --> */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center capitalize space-x-2">
                            <div className="avater-img bg-indigo-600 text-white">
                                {avatar ? (
                                    <img
                                        src={`${
                                            import.meta.env.VITE_SERVER_BASE_URL
                                        }/uploads/avatar/${avatar}`}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <span className="text-xl">
                                        {author?.firstName[0]}
                                    </span>
                                )}
                            </div>

                            <div>
                                <Link
                                    to={`/profile/${author?.id}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-slate-500 text-sm hover:text-slate-300 transition-all cursor-pointer"
                                >
                                    {author.firstName} {author.lastName}
                                </Link>
                                <div className="flex items-center text-xs text-slate-700">
                                    <span>{convertTime(createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm px-2 py-1 text-slate-700">
                            <span>
                                {likesCount > 1
                                    ? likesCount + " Likes"
                                    : likesCount + " Like"}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <div
                className="absolute right-4 top-4"
                onClick={(e) => e.stopPropagation()}
            >
                {location.pathname === "/" &&
                    auth?.user &&
                    blog?.author?.id === auth?.user?.id && (
                        <ActionPopup blog={blog} />
                    )}
            </div>
        </div>
    );
};

export default BlogCard;
