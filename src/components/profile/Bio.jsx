import { useState } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import useApi from "../../hooks/useApi";
import useProfile from "../../hooks/useProfile";

const Bio = () => {
    const { state, dispatch } = useProfile();
    const { api } = useApi();
    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
                { bio }
            );
            if (response?.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response?.data,
                });
            }
            setEditMode(false);
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="mx-6 mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1 ">
                {editMode ? (
                    <textarea
                        className=' p-2 w-96 md:w-[800px] h-24 md:h-36 className="leading-[188%] bg-[#030317] border border-white text-gray-400 px-6 lg:text-lg rounded-md'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                ) : (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {state?.user?.bio}
                    </p>
                )}
            </div>
            {editMode ? (
                <button
                    className="flex-center border border-white px-3 py-1 hover:bg-[#0e0e2e] rounded-md"
                    onClick={handleBioEdit}
                >
                    Save
                </button>
            ) : (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={() => setEditMode(true)}
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
            )}
        </div>
    );
};

export default Bio;
