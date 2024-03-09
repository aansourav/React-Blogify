import convertTime from "../../../utils/convertTime";

const BlogCard = ({ blog, avatar }) => {
    const { title, content, thumbnail, author, likes, createdAt } = blog;

    return (
        <div className="blog-card">
            <img
                className="blog-thumb"
                src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/uploads/blog/${thumbnail}`}
                alt=""
            />
            <div className="mt-2">
                <h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>
                <p className="mb-6 text-base text-slate-500 mt-1">
                    {content.length > 330
                        ? (content.substring(0, 330), " ...")
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
                            <h5 className="text-slate-500 text-sm">
                                {author.firstName} {author.lastName}
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>{convertTime(createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>
                            {likes && likes.length > 1
                                ? likes.length + " Likes"
                                : likes.length + " Like"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
