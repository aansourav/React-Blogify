// import { useAuth } from "../../../hooks/useAuth";
// // import useAvatar from "../../../hooks/useAvatar";
// import useProfile from "../../../hooks/useProfile";
// import convertTime from "../../../utils/convertTime";

// const SingleBlogContent = ({ blog }) => {
//     const { title, content, author, createdAt, likes, tags, thumbnail } = blog;
//     // const { avatarURL } = useAvatar(blog);
//     const profile = useProfile();
//     const { auth } = useAuth();
//     const user = profile?.state?.user ?? auth?.user;
//     const avatar =
//         user?.id === blog?.author?.id ? user?.avatar : blog?.author?.avatar;
//     return (
//         <section>
//             <div className="container text-center py-8">
//                 <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>
//                 <div className="flex justify-center items-center my-4 gap-4">
//                     <div className="flex items-center capitalize space-x-2">
//                         <div className="avater-img bg-indigo-600 text-white">
//                             {avatar ? (
//                                 <img
//                                     src={`${
//                                         import.meta.env.VITE_SERVER_BASE_URL
//                                     }/uploads/avatar/${avatar}`}
//                                     alt="avatar"
//                                     className="w-8 h-8 rounded-full"
//                                 />
//                             ) : (
//                                 <span className="text-xl">
//                                     {author?.firstName[0]}
//                                 </span>
//                             )}
//                         </div>
//                         <h5 className="text-slate-500 text-sm">
//                             {author?.firstName} {author?.lastName}
//                         </h5>
//                     </div>
//                     <span className="text-sm text-slate-700 dot">
//                         {convertTime(createdAt)}
//                     </span>
//                     <span className="text-sm text-slate-700 dot">
//                         {likes && likes.length > 1
//                             ? likes.length + " Likes"
//                             : likes.length + " Like"}
//                     </span>
//                 </div>
//                 <img
//                     className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
//                     src={`${
//                         import.meta.env.VITE_SERVER_BASE_URL
//                     }/uploads/blog/${thumbnail}`}
//                     alt="thumbnail"
//                 />
//                 {/* <!-- Tags --> */}
//                 <ul className="tags">
//                     {tags &&
//                         tags
//                             .split(", ")
//                             .map((tag) => (
//                                 <li key={crypto.randomUUID()}>{tag}</li>
//                             ))}
//                 </ul>

//                 {/* <!-- Content --> */}
//                 <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
//                     {content}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SingleBlogContent;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import convertTime from "../../../utils/convertTime";

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
                        <h5 className="text-slate-500 text-sm">
                            {author?.firstName} {author?.lastName}
                        </h5>
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
