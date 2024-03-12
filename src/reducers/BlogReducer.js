import { actions } from "../actions";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.blog.DATA_FETCHED: {
            return {
                ...state,
                blogs: action.data,
                loading: false,
            };
        }
        case actions.blog.DATA_REFETCHED: {
            return {
                ...state,
                blogs: [...state.blogs, action.data],
                loading: false,
            };
        }

        case actions.blog.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.blog.BLOG_CREATED: {
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.data],
            };
        }

        case actions.blog.BLOG_DELETED: {
            return {
                ...state,
                loading: false,
                blogs: state.blogs.filter((blog) => blog.id !== action.data),
            };
        }

        case actions.blog.BLOG_EDITED: {
            return {
                ...state,
                loading: false,
                blogs: state.blogs.map((blog) =>
                    blog.id === action.data.id ? action.data : blog
                ),
            };
        }

        default: {
            return state;
        }
    }
};

export { blogReducer, initialState };
