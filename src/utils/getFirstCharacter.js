const getFirstCharacter = (firstName) => {
    if (typeof firstName === "string" && firstName.length > 0) {
        return firstName[0];
    } else {
        return "";
    }
};

export default getFirstCharacter;
