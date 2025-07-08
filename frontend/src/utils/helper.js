export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export const getInitials = (name) => {
    if (!name) {
        return "";
    }

    const words = name.trim().split(" ");

    return words.map(w => w[0]).join("").toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if (num === null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}