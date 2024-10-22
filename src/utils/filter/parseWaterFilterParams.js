import {monthList}  from "../../constants/water.js";

export const parseMonth = (value, array) =>{
    if(typeof value !== "string") {
        return;
    }
    if(!array.includes(value)){
        return;
    }
    return value;
};

export const parseYear = (value) =>{
    if(typeof value !== "string") {
        return;
    }
    if(value.length !== 4){
        return;
    }
    if(!Number(value)){
        return;
    }
    return value;
};

const parseWaterFilterParams =({month, year}) =>{

    const parsedMonth = parseMonth(month,monthList);
    const parsedYear = parseYear(year);

    return {
        month: parsedMonth,
        year: parsedYear
    };
};

export default parseWaterFilterParams;
