import LikeIcon from "../../../assets/icons/like.svg";
import HeartIcon from "../../../assets/icons/heart.svg";
import HeartFilledIcon from "../../../assets/icons/heart-filled.svg";
import CommentIcon from "../../../assets/icons/comment.svg";

const BlogPostAction = () => {
    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li>
                    <img src={LikeIcon} alt="like" />
                    <span>10</span>
                </li>

                <li>
                    {/* <!-- There is heart-filled.svg in the icons folder --> */}
                    <img src={HeartIcon} alt="Favourite" />
                </li>
                <a href="#comments">
                    <li>
                        <img src={CommentIcon} alt="Comments" />
                        <span>3</span>
                    </li>
                </a>
            </ul>
        </div>
    );
};

export default BlogPostAction;
