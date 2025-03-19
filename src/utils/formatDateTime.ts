export const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return "";

    const dateObj = new Date(dateTimeStr);

    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date string:", dateTimeStr);
        return "";
    }

    return `${dateObj.toLocaleDateString("en-US", { dateStyle: "short" })}, ${dateObj.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
};
