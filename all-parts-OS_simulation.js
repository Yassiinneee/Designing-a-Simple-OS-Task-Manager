/*****************************************************************
 * OPERATING SYSTEMS CHECKPOINT
 * Author: Your Name
 *
 * This program simulates:
 * 1. FCFS Scheduling
 * 2. Round Robin Scheduling
 * 3. Process Synchronization Concept
 * 4. FIFO Page Replacement
 * 5. LRU Page Replacement
 * 6. FCFS Disk Scheduling
 * 7. SSTF Disk Scheduling
 *****************************************************************/

console.log("\n=================================================");
console.log("PART 1 : PROCESS SCHEDULING");
console.log("=================================================\n");

/************************************************************
 * PROCESS DATA
 ************************************************************/
const processes = [
  { id: "P1", arrival: 0, burst: 5 },
  { id: "P2", arrival: 1, burst: 3 },
  { id: "P3", arrival: 2, burst: 1 }
];

/************************************************************
 * FCFS
 ************************************************************/
function fcfs(processes) {
  console.log("----- FCFS SCHEDULING -----\n");

  let currentTime = 0;
  let totalWaitingTime = 0;

  const gantt = [];

  processes.forEach(process => {
    const startTime = Math.max(currentTime, process.arrival);
    const completionTime = startTime + process.burst;
    const waitingTime = startTime - process.arrival;

    totalWaitingTime += waitingTime;

    gantt.push(process.id);

    console.log(
      `${process.id} -> Start: ${startTime}, End: ${completionTime}, Waiting: ${waitingTime}`
    );

    currentTime = completionTime;
  });

  console.log("\nGantt Chart:");
  console.log(gantt.join(" -> "));

  console.log(
    `\nAverage Waiting Time = ${(totalWaitingTime / processes.length).toFixed(2)}`
  );

  console.log("\n");
}

fcfs(processes);

/************************************************************
 * ROUND ROBIN
 ************************************************************/
function roundRobin(processes, quantum) {
  console.log("----- ROUND ROBIN (Q = 2) -----\n");

  let time = 0;
  let queue = [];
  let gantt = [];

  const remaining = {};
  const completion = {};

  processes.forEach(p => {
    remaining[p.id] = p.burst;
  });

  let arrivedIndex = 0;

  while (
    Object.values(remaining).some(value => value > 0)
  ) {

    while (
      arrivedIndex < processes.length &&
      processes[arrivedIndex].arrival <= time
    ) {
      queue.push(processes[arrivedIndex]);
      arrivedIndex++;
    }

    if (queue.length === 0) {
      time++;
      continue;
    }

    const current = queue.shift();

    const executeTime = Math.min(
      quantum,
      remaining[current.id]
    );

    gantt.push(current.id);

    console.log(
      `${current.id} executes from ${time} to ${time + executeTime}`
    );

    time += executeTime;
    remaining[current.id] -= executeTime;

    while (
      arrivedIndex < processes.length &&
      processes[arrivedIndex].arrival <= time
    ) {
      queue.push(processes[arrivedIndex]);
      arrivedIndex++;
    }

    if (remaining[current.id] > 0) {
      queue.push(current);
    } else {
      completion[current.id] = time;
    }
  }

  let totalWaiting = 0;

  console.log("\nCompletion Times:");

  processes.forEach(p => {
    const waiting =
      completion[p.id] -
      p.arrival -
      p.burst;

    totalWaiting += waiting;

    console.log(
      `${p.id} -> Completion: ${completion[p.id]}, Waiting: ${waiting}`
    );
  });

  console.log("\nGantt Chart:");
  console.log(gantt.join(" -> "));

  console.log(
    `\nAverage Waiting Time = ${(totalWaiting / processes.length).toFixed(2)}`
  );

  console.log("\n");
}

roundRobin(processes, 2);

/************************************************************
 * SYNCHRONIZATION
 ************************************************************/
console.log("=================================================");
console.log("PART 2 : PROCESS SYNCHRONIZATION");
console.log("=================================================\n");

console.log("Shared Variable Example");
console.log("-----------------------");

let counter = 0;

for (let i = 0; i < 100; i++) {
  counter++;
}

for (let i = 0; i < 100; i++) {
  counter++;
}

console.log("Expected Counter Value = 200");
console.log("Actual Counter Value   =", counter);

console.log("\nMutex would ensure only one process");
console.log("enters the critical section at a time.\n");

/************************************************************
 * MEMORY MANAGEMENT
 ************************************************************/
console.log("=================================================");
console.log("PART 3 : MEMORY MANAGEMENT");
console.log("=================================================\n");

const referenceString = [1, 2, 3, 2, 4, 1, 5];
const framesCount = 3;

/************************************************************
 * FIFO PAGE REPLACEMENT
 ************************************************************/
function fifo(referenceString, framesCount) {

  console.log("----- FIFO PAGE REPLACEMENT -----\n");

  let frames = [];
  let faults = 0;

  referenceString.forEach(page => {

    if (!frames.includes(page)) {

      faults++;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        frames.shift();
        frames.push(page);
      }

      console.log(
        `Page ${page} -> FAULT -> Frames: [${frames}]`
      );
    } else {
      console.log(
        `Page ${page} -> HIT   -> Frames: [${frames}]`
      );
    }
  });

  console.log(`\nTotal FIFO Faults = ${faults}\n`);
}

fifo(referenceString, framesCount);

/************************************************************
 * LRU PAGE REPLACEMENT
 ************************************************************/
function lru(referenceString, framesCount) {

  console.log("----- LRU PAGE REPLACEMENT -----\n");

  let frames = [];
  let faults = 0;

  referenceString.forEach(page => {

    if (!frames.includes(page)) {

      faults++;

      if (frames.length < framesCount) {

        frames.push(page);

      } else {

        let leastUsed = frames[0];
        let leastIndex = Infinity;

        frames.forEach(frame => {

          const lastUse =
            referenceString
              .slice(
                0,
                referenceString.indexOf(page)
              )
              .lastIndexOf(frame);

          if (lastUse < leastIndex) {
            leastIndex = lastUse;
            leastUsed = frame;
          }
        });

        frames.splice(
          frames.indexOf(leastUsed),
          1
        );

        frames.push(page);
      }

      console.log(
        `Page ${page} -> FAULT -> Frames: [${frames}]`
      );
    } else {

      console.log(
        `Page ${page} -> HIT   -> Frames: [${frames}]`
      );
    }
  });

  console.log(`\nTotal LRU Faults = ${faults}\n`);
}

lru(referenceString, framesCount);

/************************************************************
 * DISK SCHEDULING
 ************************************************************/
console.log("=================================================");
console.log("PART 4 : DISK SCHEDULING");
console.log("=================================================\n");

const requests = [98, 183, 37, 122, 14, 124, 65, 67];
const headStart = 53;

/************************************************************
 * FCFS DISK
 ************************************************************/
function diskFCFS(head, requests) {

  console.log("----- FCFS DISK SCHEDULING -----\n");

  let movement = 0;
  let current = head;

  requests.forEach(track => {

    movement += Math.abs(track - current);

    console.log(
      `${current} -> ${track} = ${Math.abs(track - current)}`
    );

    current = track;
  });

  console.log(
    `\nTotal Head Movement = ${movement}\n`
  );
}

diskFCFS(headStart, requests);

/************************************************************
 * SSTF DISK
 ************************************************************/
function diskSSTF(head, requests) {

  console.log("----- SSTF DISK SCHEDULING -----\n");

  let current = head;
  let movement = 0;

  let pending = [...requests];

  while (pending.length > 0) {

    let closest = pending[0];

    pending.forEach(track => {

      if (
        Math.abs(track - current) <
        Math.abs(closest - current)
      ) {
        closest = track;
      }
    });

    const distance =
      Math.abs(closest - current);

    movement += distance;

    console.log(
      `${current} -> ${closest} = ${distance}`
    );

    current = closest;

    pending.splice(
      pending.indexOf(closest),
      1
    );
  }

  console.log(
    `\nTotal Head Movement = ${movement}\n`
  );
}

diskSSTF(headStart, requests);

console.log("=================================================");
console.log("SIMULATION FINISHED");
console.log("=================================================");