import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const DeleteProvider = ({ children }) => {
    const [postDeleted, setPostDeleted] = useState(false);

    const handlePostDeleted = () => {
        setPostDeleted(!postDeleted);
    };

    return (
        <PostContext.Provider value={{ postDeleted, handlePostDeleted }}>
            {children}
        </PostContext.Provider>
    );
};
