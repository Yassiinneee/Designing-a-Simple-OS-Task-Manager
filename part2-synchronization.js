/*****************************************************************
 * PART 2 : PROCESS SYNCHRONIZATION
 *
 * Demonstrates race conditions and mutex protection.
 *****************************************************************/

console.log("================================================");
console.log("PART 2 : PROCESS SYNCHRONIZATION");
console.log("================================================\n");

/*****************************************************************
 * WITHOUT SYNCHRONIZATION
 *****************************************************************/

console.log("WITHOUT SYNCHRONIZATION\n");

// Shared variable
let counter = 5;

console.log(`Initial Counter = ${counter}`);

// Simulate P1 reading counter
let p1Read = counter;

// Simulate P2 reading counter
let p2Read = counter;

// Both increment locally
p1Read++;
p2Read++;

console.log(`P1 increments -> ${p1Read}`);
console.log(`P2 increments -> ${p2Read}`);

// Both write back
counter = p1Read;
counter = p2Read;

console.log(`Final Counter = ${counter}`);

console.log(
  "\nProblem: One update is lost (Race Condition)"
);

/*****************************************************************
 * WITH MUTEX
 *****************************************************************/

console.log("\n-------------------------------------");
console.log("WITH MUTEX");
console.log("-------------------------------------");

counter = 0;

// Function representing critical section
function incrementCounter() {

  // Only one process can execute here
  counter++;
}

// P1 increments 100 times
for (let i = 0; i < 100; i++) {
  incrementCounter();
}

// P2 increments 100 times
for (let i = 0; i < 100; i++) {
  incrementCounter();
}

console.log(`Final Counter = ${counter}`);

console.log(
  "\nRace condition prevented using mutual exclusion."
);