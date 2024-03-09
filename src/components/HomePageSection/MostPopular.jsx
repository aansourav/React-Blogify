import { Link } from "react-router-dom";

const MostPopular = ({ blog }) => {
    const { title, author, likes } = blog;
    return (
        <li>
            <Link to={`/blogs/${blog.id}`}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm">
                    by{" "}
                    <a href="./profile.html">
                        {author.firstName} {author.lastName}
                    </a>
                    <span> · </span>{" "}
                    {likes && likes.length > 1
                        ? likes.length + " Likes"
                        : likes.length + " Like"}
                </p>
            </Link>
        </li>
    );
};

export default MostPopular;
