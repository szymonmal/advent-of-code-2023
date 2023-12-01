/**
 * Converts written digits found in input lines to actual digits
 * @param {string[]} inputValues array of values
 * @returns {string[]} converted inputs, all written digits changed to digits in number form
 */
export const convertWordsToNumbers = (inputValues) => {
  const mapping = new Map([
    ["zero", 0],
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
  ]);

  const convertedData = [];

  inputValues.forEach((line) => {
    const found = new Map();

    mapping.forEach((val, key) => {
      let indexFound = 0;
      while (indexFound !== -1) {
        indexFound = line.indexOf(key, indexFound);

        if (indexFound >= 0) {
          found.set(indexFound, val);

          indexFound++;
        }
      }
    });

    let current = line;
    for (let i = 0; i < current.length - 1; i++) {
      if (found.has(i)) {
        current =
          current.substring(0, i) + found.get(i) + current.substring(i + 1);
      }
    }

    convertedData.push(current);
  });

  return convertedData;
};
