// import { useState } from "react";
// import CloseIcon from "../../../assets/icons/close.svg";
// import SearchResult from "./SearchResult";

// const SearchSection = () => {
//     const [searchText, setSearchText] = useState("");
//     console.log(searchText);
//     return (
//         <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
//             {/* <!-- Search Container --> */}
//             <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
//                 {/* <!-- Search --> */}
//                 <div>
//                     <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
//                         Search for Your Desire Blogs
//                     </h3>
//                     <input
//                         type="text"
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                         placeholder="Start Typing to Search"
//                         className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
//                     />
//                 </div>

//                 {/* <!-- Search Result --> */}
//                 <div className="">
//                     <h3 className="text-slate-400 font-bold mt-6">
//                         Search Results
//                     </h3>
//                     <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
//                         <SearchResult />
//                     </div>
//                 </div>

//                 <a>
//                     <img
//                         src={CloseIcon}
//                         alt="Close"
//                         className="absolute right-2 top-2 cursor-pointer w-8 h-8"
//                     />
//                 </a>
//             </div>
//         </section>
//     );
// };

// export default SearchSection;



import { useState } from "react";
import CloseIcon from "../../../assets/icons/close.svg";
import SearchResult from "./SearchResult";

const SearchSection = ({ onClose }) => {
    const [searchText, setSearchText] = useState("");
    console.log(searchText);
    return (
        <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            {/* <!-- Search Container --> */}
            <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                {/* <!-- Search --> */}
                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
                        Search for Your Desire Blogs
                    </h3>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Start Typing to Search"
                        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                    />
                </div>

                {/* <!-- Search Result --> */}
                <div className="">
                    <h3 className="text-slate-400 font-bold mt-6">
                        Search Results
                    </h3>
                    <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                        <SearchResult />
                    </div>
                </div>

                <a onClick={onClose}>
                    {" "}
                    {/* Add onClick event to call onClose function */}
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
