import { data } from "./2/data.js";

/**
 * @typedef {Object} GameInput
 * @property {number} inputId id of the input read from data inputs
 * @property {number} redMax red cubes max value
 * @property {number} redMin red cubes min value
 * @property {number} greenMax green cubes max value
 * @property {number} greenMin green cubes min value
 * @property {number} blueMax blue cubes min value
 * @property {number} blueMin blue cubes min value
 */

/**
 * Reads input information and creates data structure for analytics
 * @param {string[]} inputValues data inputs with pulls from the bags
 * @returns {GameInput[]} input parsing result
 */
export const analysePulls = (inputValues) => {
  const parsedData = [];

  inputValues.forEach((line) => {
    const patternLine = new RegExp(/\w+ (\d*): (.*)/);
    const patternColor = new RegExp(/(\d*) (\w*)/);

    const [, id, pulls] = patternLine.exec(line);

    const groups = pulls.split(";").map((group) => group.trim());

    const gi = {
      inputId: parseInt(id),
      redMax: Number.MIN_SAFE_INTEGER,
      greenMax: Number.MIN_SAFE_INTEGER,
      blueMax: Number.MIN_SAFE_INTEGER,
    };

    groups.forEach((g) => {
      const colorGroups = g.split(",").map((c) => c.trim());

      colorGroups.forEach((c) => {
        const [, value, color] = patternColor.exec(c);

        if (color === "red") {
          const rv = parseInt(value);
          if (rv > gi.redMax) {
            gi.redMax = rv;
          }
        }

        if (color === "green") {
          const gv = parseInt(value);
          if (gv > gi.greenMax) {
            gi.greenMax = gv;
          }
        }

        if (color === "blue") {
          const bv = parseInt(value);
          if (bv > gi.blueMax) {
            gi.blueMax = bv;
          }
        }
      });
    });

    parsedData.push(gi);
  });

  return parsedData;
};

/**
 * Reads input information and creates data structure for analytics
 * @param {GameInput[]} parsedValues data inputs after parsing
 * @param {number} red min red value
 * @param {number} green min green value
 * @param {number} blue min blue value
 * @returns {number} sum of GameInput ids that fits criteria
 */
export const sumForMinColorParams = (parsedValues, red, green, blue) => {
  let sum = 0;

  parsedValues.forEach((d) => {
    if (d.redMax <= red && d.greenMax <= green && d.blueMax <= blue) {
      sum = sum + d.inputId;
    }
  });

  return sum;
};

const RED = 12;
const GREEN = 13;
const BLUE = 14;

const parsedData = analysePulls(data);
const sum = sumForMinColorParams(parsedData, RED, GREEN, BLUE);

console.log(sum);
