import dateFormat from "./dateFormat.js";

const dateFormatArray = (arr) => {
    return arr.map(obj => dateFormat(obj));
}
export default dateFormatArray;