import findValue from "./findValue";

export default function findImageUrl(entireObj, keyToFind, valToFind) {
    let finalObj = 0
    let foundObj;

    if (window.innerWidth < 800) {
        const newObj = findValue(entireObj, 'formats')
        newObj ? finalObj = newObj.medium : finalObj = entireObj
    } else {
        finalObj = entireObj
    }

    console.log(finalObj)
    JSON.stringify(finalObj, (_, nestedValue) => {
        if (nestedValue && nestedValue[keyToFind]) {
            foundObj = nestedValue[keyToFind];
            return foundObj
        }
        return nestedValue
    });
    return process.env.API_LINK + foundObj
};