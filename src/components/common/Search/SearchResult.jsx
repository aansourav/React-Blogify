import Thumbnail from "../../../assets/blogs/taiulwind-cn-thumb.jpg";
const SearchResult = () => {
    return (
        <div className="flex gap-6 py-2">
            <img className="h-28 object-contain" src={Thumbnail} alt="" />
            <div className="mt-2">
                <h3 className="text-slate-300 text-xl font-bold">
                    Style your components with TailwindCSS
                </h3>
                {/* <!-- Meta Informations --> */}
                <p className="mb-6 text-sm text-slate-500 mt-1">
                    Aenean eleifend ante maecenas pulvinar montes lorem et pede
                    dis dolor pretium donec dictum. Vici consequat justo enim.
                    Venenatis eget adipiscing luctus lorem.
                </p>
            </div>
        </div>
    );
};

export default SearchResult;
