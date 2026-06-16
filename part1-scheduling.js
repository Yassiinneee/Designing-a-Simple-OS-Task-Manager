/*****************************************************************
 * PART 1 : PROCESS SCHEDULING
 *
 * We will simulate:
 * 1. FCFS (First Come First Served)
 * 2. Round Robin (Quantum = 2)
 *****************************************************************/

console.log("================================================");
console.log("PART 1 : PROCESS SCHEDULING");
console.log("================================================\n");

// Process information
const processes = [
  { id: "P1", arrival: 0, burst: 5 },
  { id: "P2", arrival: 1, burst: 3 },
  { id: "P3", arrival: 2, burst: 1 }
];

console.log("Processes:");
processes.forEach(process => {
  console.log(
    `${process.id} -> Arrival=${process.arrival}, Burst=${process.burst}`
  );
});

/*****************************************************************
 * FCFS SCHEDULING
 *****************************************************************/

console.log("\n------------------------------------------------");
console.log("FCFS (First Come First Served)");
console.log("------------------------------------------------");

let currentTime = 0;
let totalWaitingTime = 0;

for (const process of processes) {

  // Start time is when CPU becomes available
  const startTime = currentTime;

  // Waiting time = start time - arrival time
  const waitingTime = startTime - process.arrival;

  // Completion time
  const finishTime = startTime + process.burst;

  totalWaitingTime += waitingTime;

  console.log(
    `${process.id}: Start=${startTime}, Finish=${finishTime}, Waiting=${waitingTime}`
  );

  currentTime = finishTime;
}

const fcfsAverage =
  totalWaitingTime / processes.length;

console.log(
  `\nFCFS Average Waiting Time = ${fcfsAverage.toFixed(2)}`
);

/*****************************************************************
 * ROUND ROBIN
 *****************************************************************/

console.log("\n------------------------------------------------");
console.log("ROUND ROBIN (Quantum = 2)");
console.log("------------------------------------------------");

const quantum = 2;

// Remaining burst times
const remaining = {
  P1: 5,
  P2: 3,
  P3: 1
};

const completion = {};

let queue = ["P1"];
let time = 0;

while (queue.length > 0) {

  const process = queue.shift();

  const executeTime = Math.min(
    quantum,
    remaining[process]
  );

  console.log(
    `${process} executes from ${time} to ${time + executeTime}`
  );

  time += executeTime;

  remaining[process] -= executeTime;

  // Add newly arrived processes
  if (time >= 2 && !queue.includes("P3") &&
      remaining["P3"] > 0 &&
      !completion["P3"]) {
    queue.push("P3");
  }

  if (time >= 1 && !queue.includes("P2") &&
      remaining["P2"] > 0 &&
      !completion["P2"]) {
    queue.push("P2");
  }

  if (remaining[process] > 0) {

    // Put process back in queue
    queue.push(process);

  } else {

    // Save completion time
    completion[process] = time;
  }
}

// Waiting time calculations
const rrWaitingP1 = completion.P1 - 0 - 5;
const rrWaitingP2 = completion.P2 - 1 - 3;
const rrWaitingP3 = completion.P3 - 2 - 1;

const rrAverage =
  (rrWaitingP1 + rrWaitingP2 + rrWaitingP3) / 3;

console.log("\nWaiting Times:");
console.log(`P1 = ${rrWaitingP1}`);
console.log(`P2 = ${rrWaitingP2}`);
console.log(`P3 = ${rrWaitingP3}`);

console.log(
  `\nRound Robin Average Waiting Time = ${rrAverage.toFixed(2)}`
);

console.log(
  "\nConclusion: Round Robin is more responsive."
);