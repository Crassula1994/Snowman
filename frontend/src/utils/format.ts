// Function for Formatting Date String
function formatDateString(dateString: string | undefined) {
    if (!dateString) return "";

    const [datePart, timePart] = dateString.split(" ");
    const [month, day, year] = datePart.split("-").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    const date = new Date(year, month - 1, day, hours, minutes, seconds);

    date.setHours(date.getHours() + 9);

    const newYear = date.getFullYear();
    const newMonth = date.getMonth() + 1;
    const newDay = date.getDate();
    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");
    const newSeconds = String(date.getSeconds()).padStart(2, "0");

    console.log(year);

    return `${newYear}년 ${newMonth}월 ${newDay}일 ${newHours}:${newMinutes}:${newSeconds}`;
}

export default formatDateString;
