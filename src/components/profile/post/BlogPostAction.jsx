import { useEffect, useState } from "react";
import CommentIcon from "../../../assets/icons/comment.svg";
import HeartFilledIcon from "../../../assets/icons/heart-filled.svg";
import HeartIcon from "../../../assets/icons/heart.svg";
import LikeFilledIcon from "../../../assets/icons/like-filled.svg";
import LikeIcon from "../../../assets/icons/like.svg";
import useApi from "../../../hooks/useApi";
import { useAuth } from "../../../hooks/useAuth";

const BlogPostAction = ({ blog }) => {
    const { auth } = useAuth();
    const { api } = useApi();
    const [liked, setLiked] = useState(
        blog?.likes?.some((like) => like.id === auth?.user?.id)
    );
    const [likesCount, setLikesCount] = useState(blog?.likes?.length || 0);
    const [loved, setLoved] = useState(false);

    useEffect(() => {
        const getFavorites = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
                );

                setLoved(response.data.blogs.some((b) => b.id === blog.id));
            } catch (error) {
                console.log(error);
            }
        };
        getFavorites();
        setLiked(blog?.likes?.some((like) => like.id === auth?.user?.id));
        setLikesCount(blog?.likes?.length || 0);
    }, [blog, auth, loved, api, blog?.comments]);

    const handleLike = async () => {
        if (!auth?.user) {
            alert("You need to login to like a blog");
            return;
        }
        try {
            setLiked((prevLiked) => !prevLiked);
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/like`
            );
            if (response.status === 200) {
                setLikesCount((prevCount) =>
                    liked ? prevCount - 1 : prevCount + 1
                );
            } else {
                setLiked((prevLiked) => !prevLiked);
            }
        } catch (error) {
            console.log(error);
            setLiked((prevLiked) => !prevLiked);
        }
    };

    const handleLove = async () => {
        if (!auth?.user) {
            alert("You need to login to Add to Favourites");
            return;
        }
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
                    blog.id
                }/favourite`
            );
            if (response.status === 200) {
                setLoved((prevLoved) => !prevLoved);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = () => {
        if (!auth?.user) {
            alert("You need to login to comment");
            return;
        }
    };

    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li onClick={handleLike}>
                    <img src={liked ? LikeFilledIcon : LikeIcon} alt="like" />
                    <span>{likesCount}</span>
                </li>

                <li onClick={handleLove}>
                    <img
                        src={loved ? HeartFilledIcon : HeartIcon}
                        alt="Favourite"
                    />
                </li>

                <li onClick={handleComment}>
                    <img src={CommentIcon} alt="Comments" />
                    <span>{blog?.comments?.length}</span>
                </li>
            </ul>
        </div>
    );
};

export default BlogPostAction;
