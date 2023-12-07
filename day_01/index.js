import fs from "node:fs/promises";
import argv from "node:process";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

/**
 * This is the simple approach as a sanity-test/baseline that
 * reads in the entire file, then splits the string.
 * @param {string} filename name of the file to read
 * @returns the map of counts
 */
export async function handleBoring(filename) {
  const fileContents = await fs.readFile(filename, { encoding: "utf-8" });
  let countMap = {};

  fileContents
    .split(/\s/)
    .filter((value) => value !== "" && value !== "\n")
    .forEach((val) => {
      increment(val);
    });

  function increment(key) {
    const currentCount = countMap[key];
    countMap[key] = currentCount === undefined ? 1 : currentCount + 1;
  }

  return countMap;
}

/**
 * This is the more "efficient" approach that uses the read stream
 * API. This limits the total memory, and also makes it run quite
 * a bit faster.
 * @param {string} filename name of the file to read
 * @param {number | undefined} chuckSize the size of chuncks the read stream works on
 * @returns the map of counts
 */
export async function processValues(filename, chuckSize) {
  const fh = await fs.open(filename);
  const readStream = fh.createReadStream({
    encoding: "utf-8",
    highWaterMark: chuckSize,
  });

  let chunckCount = 0;
  let lastChars = "";

  let countMap = {};

  for await (const chunk of readStream) {
    const splitChunks = chunk.split(" ");

    const firstElement = splitChunks.shift();
    const lastElement = splitChunks.pop();

    if (firstElement === "") {
      if (lastChars !== "") {
        increment(lastChars);
        lastChars = "";
      }
    } else {
      if (lastChars !== "") {
        const continuationVal = `${lastChars}${firstElement}`;
        increment(continuationVal);
        lastChars = "";
      } else {
        increment(firstElement ?? "");
      }
    }

    if (lastElement !== "") {
      lastChars = lastElement ?? "";
    }

    splitChunks.forEach(increment);
    chunckCount++;
  }

  function increment(key) {
    const currentCount = countMap[key];
    countMap[key] = currentCount === undefined ? 1 : currentCount + 1;
  }

  if (lastChars !== "") {
    increment(lastChars);
  }

  await fh.close();
  return countMap;
}

const options = {
  stream: {
    type: "boolean",
    default: false,
  },
  filename: {
    type: "string",
    short: "f",
  },
  chunksize: {
    type: "string",
    short: "c",
    default: "65536", // 64 KiB
  },
};

const { values } = parseArgs({ argv, options });

// determine if this is being imported or run as a script
const __filename = fileURLToPath(import.meta.url);
let entryFile = process.argv?.[1];

if (entryFile === __filename) {
  if (values.stream) {
    const counts = await processValues(
      values.filename,
      parseInt(values.chunksize)
    );
    console.info("Unique values", Object.keys(counts).length);
  } else {
    const counts = await handleBoring(values.filename);
    console.info("Unique values", Object.keys(counts).length);
  }
}
