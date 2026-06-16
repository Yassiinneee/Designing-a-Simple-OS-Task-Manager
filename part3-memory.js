/*****************************************************************
 * PART 3 : MEMORY MANAGEMENT
 *
 * Simulate:
 * 1. FIFO Page Replacement
 * 2. LRU Page Replacement
 *****************************************************************/

console.log("================================================");
console.log("PART 3 : MEMORY MANAGEMENT");
console.log("================================================\n");

const pages = [1, 2, 3, 2, 4, 1, 5];
const frameSize = 3;

/*****************************************************************
 * FIFO
 *****************************************************************/

console.log("FIFO PAGE REPLACEMENT\n");

let fifoFrames = [];
let fifoFaults = 0;

for (const page of pages) {

  if (!fifoFrames.includes(page)) {

    fifoFaults++;

    if (fifoFrames.length < frameSize) {

      fifoFrames.push(page);

    } else {

      // Remove oldest page
      fifoFrames.shift();

      fifoFrames.push(page);
    }

    console.log(
      `Page ${page} -> FAULT -> Frames: [${fifoFrames}]`
    );

  } else {

    console.log(
      `Page ${page} -> HIT -> Frames: [${fifoFrames}]`
    );
  }
}

console.log(`\nFIFO Faults = ${fifoFaults}`);

/*****************************************************************
 * LRU
 *****************************************************************/

console.log("\n-----------------------------------");
console.log("LRU PAGE REPLACEMENT");
console.log("-----------------------------------");

let lruFrames = [];
let lruFaults = 0;

for (let i = 0; i < pages.length; i++) {

  const page = pages[i];

  if (!lruFrames.includes(page)) {

    lruFaults++;

    if (lruFrames.length < frameSize) {

      lruFrames.push(page);

    } else {

      // Find least recently used page
      let lruPage = lruFrames[0];
      let oldestIndex = Infinity;

      for (const frame of lruFrames) {

        const lastUsed =
          pages.slice(0, i).lastIndexOf(frame);

        if (lastUsed < oldestIndex) {

          oldestIndex = lastUsed;
          lruPage = frame;
        }
      }

      lruFrames.splice(
        lruFrames.indexOf(lruPage),
        1
      );

      lruFrames.push(page);
    }

    console.log(
      `Page ${page} -> FAULT -> Frames: [${lruFrames}]`
    );

  } else {

    console.log(
      `Page ${page} -> HIT -> Frames: [${lruFrames}]`
    );
  }
}

console.log(`\nLRU Faults = ${lruFaults}`);

console.log(
  "\nConclusion: Both FIFO and LRU generate 6 faults."
);