import { useContext } from "react";
import { BlogContext } from "../context";

const usePost = () => {
    return useContext(BlogContext);
};

export default usePost;
