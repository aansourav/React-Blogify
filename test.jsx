import { useForm } from "react-hook-form";

const CreateBlog = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
        } catch (error) {
            console.error("An error occurred: ", error);
            setError("root.random", {
                type: "random",
                message: error?.response?.data?.error
                    ? error.response.data.error
                    : error.message,
            });
        }
    };

    return (
        <section>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="createBlog">
                    <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                        {/* <!-- Thumbnail Upload --> */}
                        <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <p>Upload Your Image</p>
                        </div>
                        {/* <!-- Thumbnail Upload --> */}
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your blog title"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />
                    </div>
                    {errors?.title && (
                        <div className="text-red-500 text-sm text-wrap w-full  mt-0">
                            {errors?.title?.message}
                        </div>
                    )}

                    <div className="mb-6 mt-6">
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express etc."
                            {...register("tags", {
                                required: "Tags are required",
                            })}
                        />
                    </div>

                    {errors?.tags && (
                        <div className="text-red-500 text-sm text-wrap w-full  mt-0">
                            {errors?.tags?.message}
                        </div>
                    )}

                    <div className="mt-4 mb-6 bg-[#101327] rounded-lg py-4 px-6">
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Write your blog content"
                            rows="8"
                            {...register("content", {
                                required: "Content is required",
                            })}
                        ></textarea>
                    </div>

                    {errors?.content && (
                        <div className="text-red-500 text-sm text-wrap w-full  mt-0">
                            {errors?.content?.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-6 bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateBlog;
