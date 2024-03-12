import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import convertTime from "../../../utils/convertTime";
import { Link } from "react-router-dom";

const SingleBlogContent = ({ blog }) => {
    const { title, content, author, createdAt, tags, thumbnail } = blog;
    const profile = useProfile();
    const { auth } = useAuth();
    const user = profile?.state?.user ?? auth?.user;
    const [likesCount, setLikesCount] = useState(blog?.likes?.length || 0);

    useEffect(() => {
        setLikesCount(blog?.likes?.length || 0);
    }, [blog.likes]);

    const avatar = user?.id === author?.id ? user?.avatar : author?.avatar;

    return (
        <section>
            <div className="container text-center py-8">
                <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>
                <div className="flex justify-center items-center my-4 gap-4">
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
                        <Link
                            to={`/profile/${author?.id}`}
                            className="text-slate-500 text-sm hover:text-slate-300 transition-all cursor-pointer"
                        >
                            {author?.firstName} {author?.lastName}
                        </Link>
                    </div>
                    <span className="text-sm text-slate-700 dot">
                        {convertTime(createdAt)}
                    </span>
                    <span className="text-sm text-slate-700 dot">
                        {likesCount > 1
                            ? likesCount + " Likes"
                            : likesCount + " Like"}
                    </span>
                </div>
                <img
                    className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${thumbnail}`}
                    alt="thumbnail"
                />
                {/* <!-- Tags --> */}
                <ul className="tags">
                    {tags &&
                        tags
                            .split(", ")
                            .map((tag) => (
                                <li key={crypto.randomUUID()}>{tag}</li>
                            ))}
                </ul>

                {/* <!-- Content --> */}
                <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                    {content}
                </div>
            </div>
        </section>
    );
};

export default SingleBlogContent;
