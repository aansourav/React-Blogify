import { useState } from "react";
import CommentIcon from "../../../assets/icons/comment.svg";
import HeartFilledIcon from "../../../assets/icons/heart-filled.svg";
import HeartIcon from "../../../assets/icons/heart.svg";
import LikeFilledIcon from "../../../assets/icons/like-filled.svg";
import LikeIcon from "../../../assets/icons/like.svg";

const BlogPostAction = ({ blog }) => {
    const [liked, setLiked] = useState(false);
    const [loved, setLoved] = useState(false);
    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li onClick={() => setLiked(!liked)}>
                    <img src={liked ? LikeFilledIcon : LikeIcon} alt="like" />
                    <span>{blog?.likes?.length}</span>
                </li>

                <li onClick={() => setLoved(!loved)}>
                    {/* <!-- There is heart-filled.svg in the icons folder --> */}
                    <img
                        src={loved ? HeartFilledIcon : HeartIcon}
                        alt="Favourite"
                    />
                </li>
                <span>
                    <li>
                        <img src={CommentIcon} alt="Comments" />
                        <span>{blog?.comments?.length}</span>
                    </li>
                </span>
            </ul>
        </div>
    );
};

export default BlogPostAction;
