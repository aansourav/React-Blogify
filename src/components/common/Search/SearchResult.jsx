import { Link } from "react-router-dom";

const SearchResult = ({ blog, onClose }) => {
    const { title, content, thumbnail, id } = blog;
    return (
        // <Link to={`/blogs/${id}`} className="flex gap-6 py-2">
        //     <img
        //         className="h-28 object-contain"
        //         src={`${
        //             import.meta.env.VITE_SERVER_BASE_URL
        //         }/uploads/blog/${thumbnail}`}
        //         alt=""
        //     />
        //     <div className="mt-2">
        //         <h3 className="text-slate-300 text-xl font-bold">{title}</h3>
        //         {/* <!-- Meta Informations --> */}
        //         <p className="mb-6 text-sm text-slate-500 mt-1">
        //             {content?.length > 200
        //                 ? `${content.substring(0, 200)} ...`
        //                 : content}
        //         </p>
        //     </div>
        // </Link>

        <div onClick={() => onClose()}>
            <Link to={`/blogs/${id}`} className="flex gap-6 py-2">
                <img
                    className="h-28 object-contain"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${thumbnail}`}
                    alt=""
                />
                <div className="mt-2">
                    <h3 className="text-slate-300 text-xl font-bold">
                        {title}
                    </h3>
                    {/* <!-- Meta Informations --> */}
                    <p className="mb-6 text-sm text-slate-500 mt-1">
                        {content?.length > 200
                            ? `${content.substring(0, 200)} ...`
                            : content}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default SearchResult;
