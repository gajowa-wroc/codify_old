//import { login, signup, logout, send } from "../components/Functions";
//import { useFunctions } from "../components/Functions";
import { login } from "../functions/login";
import { signup } from "../functions/signup";
import { logout } from "../functions/logout";
import { send } from "../functions/send";

export const callFunction = (output, dispatch) => {
    const matches = output.match(/([a-zA-Z0-9_]+)\((.*?)\)/);

    if (matches) {
        const functionName = matches[1];
        const propsString = matches[2];
        const props = parsePropsString(propsString);

        // Check if the function name exists in the function map
        if (functionName in functionMap) {
            const func = functionMap[functionName];
            func(dispatch, props); // Call the corresponding function with props
        }
    }
};

const parsePropsString = (propsString) => {
    const propsArray = propsString.split(",").map(prop => {
        const trimmedProp = prop.trim();

        if (trimmedProp.startsWith('"') && trimmedProp.endsWith('"')) { // Check if it's a string value
            return trimmedProp.slice(1, -1); // Remove the surrounding quotes
        }

        if (!isNaN(trimmedProp)) {  // Check if it's a number value
            return Number(trimmedProp);
        }

        // Handle other types of values as needed
        // ...

        return trimmedProp; // If the value doesn't match any recognized type, return it as is
    });

    return propsArray;
};

const functionMap = {
    login: login,
    signup: signup,
    logout: logout,
    send: send,
};