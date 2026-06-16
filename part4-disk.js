/*****************************************************************
 * PART 4 : DISK SCHEDULING
 *
 * Simulate:
 * 1. FCFS
 * 2. SSTF
 *****************************************************************/

console.log("================================================");
console.log("PART 4 : DISK SCHEDULING");
console.log("================================================\n");

const requests = [
  98,
  183,
  37,
  122,
  14,
  124,
  65,
  67
];

const startHead = 53;

/*****************************************************************
 * FCFS
 *****************************************************************/

console.log("FCFS DISK SCHEDULING\n");

let currentHead = startHead;
let fcfsMovement = 0;

for (const request of requests) {

  const distance =
    Math.abs(request - currentHead);

  fcfsMovement += distance;

  console.log(
    `${currentHead} -> ${request} = ${distance}`
  );

  currentHead = request;
}

console.log(
  `\nTotal FCFS Head Movement = ${fcfsMovement}`
);

/*****************************************************************
 * SSTF
 *****************************************************************/

console.log("\n-----------------------------------");
console.log("SSTF DISK SCHEDULING");
console.log("-----------------------------------");

let pending = [...requests];

currentHead = startHead;

let sstfMovement = 0;

while (pending.length > 0) {

  // Assume first request is closest
  let closest = pending[0];

  for (const request of pending) {

    if (
      Math.abs(request - currentHead) <
      Math.abs(closest - currentHead)
    ) {
      closest = request;
    }
  }

  const distance =
    Math.abs(closest - currentHead);

  sstfMovement += distance;

  console.log(
    `${currentHead} -> ${closest} = ${distance}`
  );

  currentHead = closest;

  pending.splice(
    pending.indexOf(closest),
    1
  );
}

console.log(
  `\nTotal SSTF Head Movement = ${sstfMovement}`
);

console.log(
  "\nConclusion: SSTF is more efficient because it minimizes head movement."
);