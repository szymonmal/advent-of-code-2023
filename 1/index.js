import { data } from "./data.js";

import { sumValues } from "./1.js";
import { convertWordsToNumbers } from "./2.js";

const convertedData = convertWordsToNumbers(data);

console.log(sumValues(convertedData));
