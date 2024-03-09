const Comment = ({ comment }) => {
    const { author, content } = comment;
    return (
        <div className="flex items-start space-x-4 my-8">
            <div className="avater-img bg-orange-600 text-white">
                {author?.avatar ? (
                    <img
                        src={`${
                            import.meta.env.VITE_SERVER_BASE_URL
                        }/uploads/avatar/${author.avatar}`}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <span className="text-xl">{author?.firstName[0]}</span>
                )}
            </div>
            <div className="w-full">
                <h5 className="text-slate -500 font-bold">
                    {author?.firstName} {author?.lastName}
                </h5>
                <p className="text-slate-300">{content}</p>
            </div>
        </div>
    );
};

export default Comment;
