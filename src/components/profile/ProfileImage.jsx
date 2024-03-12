import { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import useApi from "../../hooks/useApi";
import useProfile from "../../hooks/useProfile";

const ProfileImage = () => {
    const { state, dispatch } = useProfile();
    const { api } = useApi();
    const avatarUploadRef = useRef();

    const handleUploadAvatar = () => {
        avatarUploadRef.current.addEventListener("change", showAvatar);
        avatarUploadRef.current.click();
    };

    const showAvatar = async () => {
        try {
            const formData = new FormData();
            for (const avatar of avatarUploadRef.current.files) {
                formData.append("avatar", avatar);
            }
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
                formData
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {state?.user?.avatar ? (
                <img
                    className="max-w-full rounded-full"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/avatar/${state?.user?.avatar}`}
                    alt={state?.user?.firstName}
                />
            ) : (
                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                    <span className="">{state?.user?.firstName[0]}</span>
                </div>
            )}

            <button
                className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                onClick={handleUploadAvatar}
            >
                <img src={EditIcon} alt="Edit" />
            </button>
            <input
                ref={avatarUploadRef}
                type="file"
                id="avatar"
                accept="image/jpeg, image/png"
                hidden
            />
        </div>
    );
};

export default ProfileImage;
