import { useEffect, useState } from "react";
import CloseIcon from "../../../assets/icons/close.svg";
import useApi from "../../../hooks/useApi";
import SearchResult from "./SearchResult";

const SearchSection = ({ onClose }) => {
    const { api } = useApi();
    const [searchText, setSearchText] = useState("");
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                if (searchText.trim() === "") {
                    setBlogs([]);
                } else {
                    const response = await api.get(
                        `${
                            import.meta.env.VITE_SERVER_BASE_URL
                        }/search?q=${searchText}`
                    );
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            setBlogs(response.data);
                        } else {
                            console.log("No results found");
                            setBlogs([]);
                        }
                    }
                }
            } catch (error) {
                console.error("An error occurred:", error.message);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchText, api]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            {/* <!-- Search Container --> */}
            <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                {/* <!-- Search --> */}
                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
                        Search for Your Desired Blogs
                    </h3>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleInputChange}
                        placeholder="Start Typing to Search"
                        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                    />
                </div>

                {/* <!-- Search Result --> */}
                <div className="">
                    <h3 className="text-slate-400 font-bold mt-6">
                        {blogs.length > 0 && "Search Results"}
                    </h3>
                    <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                        {blogs.length > 0 ? (
                            blogs?.data?.map((blog) => (
                                <SearchResult
                                    key={blog.id}
                                    blog={blog}
                                    onClose={onClose}
                                />
                            ))
                        ) : (
                            <p className="text-slate-400 text-center">
                                No blog to show!
                            </p>
                        )}
                    </div>
                </div>

                <a onClick={onClose}>
                    {" "}
                    <img
                        src={CloseIcon}
                        alt="Close"
                        className="absolute right-2 top-2 cursor-pointer w-8 h-8"
                    />
                </a>
            </div>
        </section>
    );
};

export default SearchSection;
