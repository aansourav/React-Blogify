import { useEffect, useRef, useState } from "react";
import DotsIcon from "../../../assets/icons/3dots.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import EditIcon from "../../../assets/icons/edit.svg";

const ActionPopup = () => {
    const [showActionPopup, setShowActionPopup] = useState(false);
    const popupRef = useRef(null);

    const handleActionPopup = () => {
        setShowActionPopup(!showActionPopup);
    };

    const handleEdit = () => {
        console.log("Editing");
        setShowActionPopup(false);
    };

    const handleDelete = () => {
        console.log("Deleting");
        setShowActionPopup(false);
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
