const productStages = {
    AREA_INFO: "AREA_INFO",
    PRODUCT_INFO: "PRODUCT_INFO",
}

const parseDate = (dateStr) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[2]);
        const month = parseInt(parts[1]) - 1; // Month is zero-based in Date object
        const year = parseInt(parts[0]);
        return new Date(year, month, day);
    }
    return null; // Return null if parsing fails
}

const removeEmptyValues = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
            delete obj[key];
        }
    });
    return obj;
};


module.exports = {
    productStages,
    parseDate,
    removeEmptyValues
}