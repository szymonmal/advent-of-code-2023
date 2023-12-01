/**
 * Sums all numbers created from leftmost and rightmost digit of every input value
 * @param {string[]} inputValues array of values
 * @returns {number} sum of all inputs
 */
export const sumValues = (inputValues) => {
  const numbersFromSideDigitsOfInputs = [];

  inputValues.forEach((line) => {
    let left = 0;
    let right = 0;

    for (let i = 0; i < line.length; i++) {
      if (!isNaN(parseInt(line[i]))) {
        left = parseInt(line[i]);
        break;
      }
    }

    for (let j = line.length - 1; j >= 0; j--) {
      if (!isNaN(parseInt(line[j]))) {
        right = parseInt(line[j]);
        break;
      }
    }

    numbersFromSideDigitsOfInputs.push(parseInt(`${left}${right}`));
  });

  const sum = numbersFromSideDigitsOfInputs.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return sum;
};
