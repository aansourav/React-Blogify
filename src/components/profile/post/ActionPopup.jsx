import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DotsIcon from "../../../assets/icons/3dots.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import useApi from "../../../hooks/useApi";
import { usePostContext } from "../../../providers/DeleteProvider";

const ActionPopup = ({ blog }) => {
    const [showActionPopup, setShowActionPopup] = useState(false);
    const popupRef = useRef(null);
    const navigate = useNavigate();
    const { api } = useApi();
    const { handlePostDeleted } = usePostContext();

    const handleActionPopup = () => {
        setShowActionPopup(!showActionPopup);
    };

    const handleEdit = async () => {
        setShowActionPopup(false);
        navigate(`/createBlog`, { state: { blogData: blog } });
    };

    const handleDelete = async () => {
        setShowActionPopup(false);

        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
            );
            if (response.status === 200) {
                handlePostDeleted();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowActionPopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={popupRef} className="relative">
            <button
                onClick={handleActionPopup}
                className="hover:transition-all duration-300 transform hover:scale-110"
            >
                <img src={DotsIcon} alt="3dots of Action" />
            </button>

            {showActionPopup && (
                <div className="action-modal-container">
                    <button
                        onClick={handleEdit}
                        className="action-menu-item hover:text-lwsGreen"
                    >
                        <img src={EditIcon} alt="Edit" />
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="action-menu-item hover:text-red-500"
                    >
                        <img src={DeleteIcon} alt="Delete" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActionPopup;
