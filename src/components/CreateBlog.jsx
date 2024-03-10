// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import useApi from "../hooks/useApi";

// const CreateBlog = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError,
//     } = useForm();

//     const { api } = useApi();
//     const navigate = useNavigate();

//     const thumbnailUploadRef = useRef(null);
//     const [thumbnailPreview, setThumbnailPreview] = useState(null);

//     const handleUploadThumbnail = () => {
//         thumbnailUploadRef.current.click();
//     };

//     const handleThumbnailUpload = () => {
//         const file = thumbnailUploadRef.current.files[0];
//         setThumbnailPreview(URL.createObjectURL(file));
//     };

//     const handleRemoveThumbnail = () => {
//         thumbnailUploadRef.current.value = null;
//         setThumbnailPreview(null);
//     };

//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData();
//             formData.append("title", data.title);
//             formData.append("content", data.content);
//             formData.append("tags", data.tags);
//             formData.append("thumbnail", thumbnailUploadRef.current.files[0]);

//             const response = await api.post(
//                 `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/`,
//                 formData
//             );

//             if (response.status === 201) {
//                 const confirmed = window.confirm(
//                     "Blog Created Successfully! Do you want to go to your profile?"
//                 );
//                 if (confirmed) {
//                     navigate(`/profile`);
//                 }
//             }
//         } catch (error) {
//             setError("root.random", {
//                 type: "random",
//                 message: error?.response?.data?.error
//                     ? error.response.data.error
//                     : "An error occurred while submitting the form",
//             });
//         }
//     };

//     const validateTags = (value) => {
//         if (!value) return true;
//         const tags = value.split(",").map((tag) => tag.trim());
//         return tags.every((tag) => !!tag);
//     };

//     return (
//         <section>
//             <div className="container">
//                 <form onSubmit={handleSubmit(onSubmit)} className="createBlog">
//                     <div className="grid place-items-center cursor-pointer bg-slate-600/20 h-[150px] rounded-md my-4 relative">
//                         {thumbnailPreview ? (
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <img
//                                     src={thumbnailPreview}
//                                     alt="Thumbnail Preview"
//                                     className="w-full h-full object-cover rounded-md"
//                                 />
//                                 <button
//                                     type="button"
//                                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                                     onClick={handleRemoveThumbnail}
//                                 >
//                                     X
//                                 </button>
//                             </div>
//                         ) : (
//                             <div
//                                 className="absolute inset-0 flex items-center justify-center"
//                                 onClick={handleUploadThumbnail}
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth="1.5"
//                                     stroke="currentColor"
//                                     className="w-6 h-6"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
//                                     />
//                                 </svg>
//                                 <p className="ml-2">Upload Your Image</p>
//                             </div>
//                         )}

//                         <input
//                             ref={thumbnailUploadRef}
//                             type="file"
//                             id="avatar"
//                             name="avatar"
//                             accept="image/jpeg, image/png"
//                             hidden
//                             onChange={handleThumbnailUpload}
//                         />
//                     </div>
//                     {errors?.avatar && (
//                         <div className="text-red-500 text-sm text-wrap w-full mb-2 mt-0">
//                             {errors?.avatar?.message}
//                         </div>
//                     )}
//                     <div className="mb-2">
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             placeholder="Enter your blog title"
//                             {...register("title", {
//                                 required: "Title is required",
//                             })}
//                             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                         />
//                         {errors?.title && (
//                             <div className="text-red-500 text-sm text-wrap w-full mt-1">
//                                 {errors?.title?.message}
//                             </div>
//                         )}
//                     </div>
//                     <div className="mb-2">
//                         <input
//                             type="text"
//                             id="tags"
//                             name="tags"
//                             placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express etc."
//                             {...register("tags", {
//                                 required: "Tags are required",
//                                 validate: validateTags,
//                             })}
//                             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                         />
//                         {errors?.tags && (
//                             <div className="text-red-500 text-sm text-wrap w-full mt-1">
//                                 {errors?.tags?.message}
//                             </div>
//                         )}
//                     </div>
//                     <div className="mb-6">
//                         <textarea
//                             id="content"
//                             name="content"
//                             placeholder="Write your blog content"
//                             rows="8"
//                             {...register("content", {
//                                 required: "Content is required",
//                             })}
//                             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                         ></textarea>
//                         {errors?.content && (
//                             <div className="text-red-500 text-sm text-wrap w-full mt-1">
//                                 {errors?.content?.message}
//                             </div>
//                         )}
//                     </div>
//                     <p className="text-md font-bold text-red-500 mt-2">
//                         {errors.root?.random && errors.root?.random?.message}
//                     </p>
//                     <button
//                         type="submit"
//                         className="mt-4 bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
//                     >
//                         Create Blog
//                     </button>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default CreateBlog;

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";

const CreateBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
    } = useForm();

    const { api } = useApi();

    const thumbnailUploadRef = useRef(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    useEffect(() => {
        if (location.state && location.state.blogData) {
            const { title, content, tags, thumbnail } = location.state.blogData;
            setValue("title", title);
            setValue("content", content);
            setValue("tags", tags);
            if (thumbnail) {
                // Check if the thumbnail is an image URL or a file
                if (typeof thumbnail === "string") {
                    setThumbnailPreview(thumbnail); // If it's an image URL
                } else {
                    setThumbnailPreview(URL.createObjectURL(thumbnail)); // If it's a file
                }
            }
        }
    }, [location.state, setValue]);

    const handleUploadThumbnail = () => {
        thumbnailUploadRef.current.click();
    };

    const handleThumbnailUpload = () => {
        const file = thumbnailUploadRef.current.files[0];
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleRemoveThumbnail = () => {
        thumbnailUploadRef.current.value = null;
        setThumbnailPreview(null);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("tags", data.tags);
            formData.append("thumbnail", thumbnailUploadRef.current.files[0]);

            let response;
            if (location.state && location.state.blogData) {
                // If updating an existing blog
                response = await api.patch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                        location.state.blogData.id
                    }`,
                    formData
                );
            } else {
                // If creating a new blog
                response = await api.post(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/`,
                    formData
                );
            }

            if (response.status === 200 || response.status === 201) {
                const confirmed = window.confirm(
                    "Blog " +
                        (location.state && location.state.blogData
                            ? "edited"
                            : "created") +
                        " Successfully! Do you want to go to your profile?"
                );
                if (confirmed) {
                    navigate(`/profile`);
                }
            }
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: error?.response?.data?.error
                    ? error.response.data.error
                    : "An error occurred while submitting the form",
            });
        }
    };

    const validateTags = (value) => {
        if (!value) return true;
        const tags = value.split(",").map((tag) => tag.trim());
        return tags.every((tag) => !!tag);
    };

    return (
        <section>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="createBlog">
                    <div className="grid place-items-center cursor-pointer bg-slate-600/20 h-[150px] rounded-md my-4 relative">
                        {thumbnailPreview ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={handleRemoveThumbnail}
                                >
                                    X
                                </button>
                            </div>
                        ) : (
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                onClick={handleUploadThumbnail}
                            >
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
                                <p className="ml-2">Upload Your Image</p>
                            </div>
                        )}

                        <input
                            ref={thumbnailUploadRef}
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/jpeg, image/png"
                            hidden
                            onChange={handleThumbnailUpload}
                        />
                    </div>
                    {errors?.avatar && (
                        <div className="text-red-500 text-sm text-wrap w-full mb-2 mt-0">
                            {errors?.avatar?.message}
                        </div>
                    )}
                    <div className="mb-2">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your blog title"
                            {...register("title", {
                                required: "Title is required",
                            })}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                        />
                        {errors?.title && (
                            <div className="text-red-500 text-sm text-wrap w-full mt-1">
                                {errors?.title?.message}
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express etc."
                            {...register("tags", {
                                required: "Tags are required",
                                validate: validateTags,
                            })}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                        />
                        {errors?.tags && (
                            <div className="text-red-500 text-sm text-wrap w-full mt-1">
                                {errors?.tags?.message}
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Write your blog content"
                            rows="8"
                            {...register("content", {
                                required: "Content is required",
                            })}
                            className="!bg-[#101327] w-full !p-4  rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                        ></textarea>
                        {errors?.content && (
                            <div className="text-red-500 text-sm text-wrap w-full mt-1">
                                {errors?.content?.message}
                            </div>
                        )}
                    </div>
                    <p className="text-md font-bold text-red-500 mt-2">
                        {errors.root?.random && errors.root?.random?.message}
                    </p>
                    <button
                        type="submit"
                        className="mt-4 bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        {location.state && location.state.blogData
                            ? "Update Blog"
                            : "Create Blog"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateBlog;
