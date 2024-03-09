import { useAuth } from "../../../../hooks/useAuth";
import useProfile from "../../../../hooks/useProfile";
import Comment from "./Comment";

const CommentsSection = ({ blog }) => {
    const { auth } = useAuth();
    const profile = useProfile();
    const user = profile?.state?.user ?? auth?.user;
    const { comments } = blog;
    
    return (
        <section id="comments">
            <div className="mx-auto w-full md:w-10/12 container">
                <h2 className="text-3xl font-bold my-8">
                    Comments ({comments?.length})
                </h2>
                {auth?.user && (
                    <div className="flex items -center space-x-4">
                        <div className="avater-img bg-indigo-600 text-white">
                            {user?.avatar ? (
                                <img
                                    src={`${
                                        import.meta.env.VITE_SERVER_BASE_URL
                                    }/uploads/avatar/${user.avatar}`}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <span className="text-xl">
                                    {user?.firstName[0]}
                                </span>
                            )}
                        </div>
                        <div className="w-full">
                            <textarea
                                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                placeholder="Write a comment"
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </section>
    );
};

export default CommentsSection;
