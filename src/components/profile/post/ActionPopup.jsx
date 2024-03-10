import { useState } from "react";
import DotsIcon from "../../../assets/icons/3dots.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import EditIcon from "../../../assets/icons/edit.svg";

const ActionPopup = () => {
    const [showActionPopup, setShowActionPopup] = useState(false);

    const handleActionPopup = () => {
        setShowActionPopup(!showActionPopup);
    };

    return (
        <>
            <button onClick={handleActionPopup}>
                <img src={DotsIcon} alt="3dots of Action" />
            </button>

            {showActionPopup && (
                <div className="action-modal-container">
                    <button className="action-menu-item hover:text-lwsGreen">
                        <img src={EditIcon} alt="Edit" />
                        Edit
                    </button>
                    <button className="action-menu-item hover:text-red-500">
                        <img src={DeleteIcon} alt="Delete" />
                        Delete
                    </button>
                </div>
            )}
        </>
    );
};

export default ActionPopup;
