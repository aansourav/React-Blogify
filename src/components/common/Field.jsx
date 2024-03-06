import React from "react";

const Field = ({ label, children, htmlFor, error }) => {
    const id = htmlFor || getChildId(children);
    return (
        <div className="mb-6">
            {label && (
                <label htmlFor={id} className="block mb-2">
                    {label}
                </label>
            )}
            {children}
            {!!error && (
                <div className="text-red-500 text-sm text-wrap w-full  mt-2">
                    {error?.message}
                </div>
            )}
        </div>
    );
};

const getChildId = (children) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child.props.id;
    }
};

export default Field;
