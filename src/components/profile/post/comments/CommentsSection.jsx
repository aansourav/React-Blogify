import { useState } from "react";
import useApi from "../../../../hooks/useApi";
import { useAuth } from "../../../../hooks/useAuth";
import useProfile from "../../../../hooks/useProfile";
import Comment from "./Comment";

const CommentsSection = ({ blog }) => {
    const { auth } = useAuth();
    const { api } = useApi();
    const profile = useProfile();
    const user = profile?.state?.user ?? auth?.user;

    const [comments, setComments] = useState(blog?.comments || []);
    const [comment, setComment] = useState("");

    const addComment = async () => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                    blog.id
                }/comment`,
                { content: comment }
            );
            if (response.status === 200) {
                setComments((prevComments) => [
                    ...prevComments,
                    response.data.comments[response.data.comments.length - 1],
                ]);
                setComment("");
            }
        } catch (error) {
            console.log(
                "Error adding comment:",
                error?.response?.data?.message ?? error.message
            );
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to delete this comment?"
            );
            if (!confirmed) return;

            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                    blog?.id
                }/comment/${id}`
            );
            if (response.status === 200) {
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.id !== id)
                );
            }
        } catch (error) {
            console.error(
                "Error deleting comment:",
                error?.response?.data?.message ?? error.message
            );
        }
    };

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
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                placeholder="Write a comment"
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={addComment}
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {comments?.map((comment) => (
                    <div key={comment.id}>
                        <Comment comment={comment} />
                        {auth?.user?.id === comment?.author?.id && (
                            <button
                                className="-mt-6 border border-blue-900 hover:bg-blue-900 px-4 py-1 rounded-md"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommentsSection;
