# Operating Systems Checkpoint

## Project Overview

This checkpoint demonstrates several fundamental concepts of Operating Systems through practical JavaScript simulations.

The project is divided into four independent parts:

1. Process Scheduling
2. Process Synchronization
3. Memory Management
4. Disk Scheduling

Each part focuses on a different responsibility of an operating system and shows how various algorithms affect system performance and efficiency.

---

# Technologies Used

- JavaScript (ES6)
- Node.js
- Visual Studio Code

---

# Project Structure

```text
Operating-Systems-Checkpoint/
│
├── part1-scheduling.js
├── part2-synchronization.js
├── part3-memory.js
├── part4-disk.js
├── README.md
└── presentation.pptx
```

---

# Part 1: Process Scheduling

## Objective

The objective of this part is to understand how an operating system allocates CPU time to processes.

### Processes Used

| Process | Arrival Time | Burst Time |
|----------|-------------|-----------|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 1 |

### Algorithms Implemented

#### FCFS (First Come First Served)

FCFS executes processes in the order they arrive.

Execution Order:

```text
P1 → P2 → P3
```

Advantages:

- Easy to implement
- Low overhead

Disadvantages:

- Long waiting times for short processes
- Poor responsiveness

---

#### Round Robin (Quantum = 2)

Round Robin assigns a fixed time quantum to each process.

Execution Order:

```text
P1 → P2 → P3 → P1 → P2 → P1
```

Advantages:

- Fair CPU allocation
- Better responsiveness
- Suitable for multitasking systems

Disadvantages:

- More context switching

---

### Results

| Algorithm | Average Waiting Time |
|------------|---------------------|
| FCFS | 3.33 |
| Round Robin | 3.33 |

### Conclusion

Both algorithms produced the same average waiting time for this scenario.

However, Round Robin is more responsive because every process receives CPU time regularly.

---

# Part 2: Process Synchronization

## Objective

The objective of this part is to understand how operating systems protect shared resources from concurrent access.

### Scenario

Two processes increment a shared variable called:

```javascript
counter
```

Each process increments the variable 100 times.

---

## Problem: Race Condition

Without synchronization, multiple processes may access the shared variable simultaneously.

Example:

```text
Counter = 5

P1 reads 5
P2 reads 5

P1 increments to 6
P2 increments to 6

P1 writes 6
P2 writes 6
```

Expected:

```text
7
```

Actual:

```text
6
```

One update is lost.

---

## Solution: Mutex

A mutex (Mutual Exclusion Lock) ensures that only one process can enter the critical section at a time.

Pseudo Process:

```text
Lock Mutex
Update Counter
Unlock Mutex
```

### Result

```text
Final Counter = 200
```

### Conclusion

Synchronization mechanisms are necessary to prevent race conditions and maintain data consistency.

---

# Part 3: Memory Management

## Objective

The objective of this part is to simulate page replacement algorithms used by operating systems when physical memory is limited.

### Reference String

```text
1, 2, 3, 2, 4, 1, 5
```

### Available Frames

```text
3
```

---

## FIFO (First In First Out)

FIFO removes the oldest page currently stored in memory.

Advantages:

- Simple implementation
- Low complexity

Disadvantages:

- May remove frequently used pages

Result:

```text
Page Faults = 6
```

---

## LRU (Least Recently Used)

LRU removes the page that has not been used for the longest period of time.

Advantages:

- Better memory utilization
- Considers recent page usage

Disadvantages:

- More complex implementation

Result:

```text
Page Faults = 6
```

---

### Comparison

| Algorithm | Page Faults |
|------------|------------|
| FIFO | 6 |
| LRU | 6 |

### Conclusion

For the given reference string, both algorithms produced the same number of page faults.

In real-world systems, LRU usually performs better because it keeps recently used pages in memory.

---

# Part 4: Disk Scheduling

## Objective

The objective of this part is to understand how operating systems optimize disk access requests.

### Initial Head Position

```text
53
```

### Requests

```text
98, 183, 37, 122, 14, 124, 65, 67
```

---

## FCFS Disk Scheduling

FCFS serves requests in the order they arrive.

Result:

```text
Total Head Movement = 640 Tracks
```

Advantages:

- Simple
- Fair

Disadvantages:

- Large seek time
- Poor efficiency

---

## SSTF Disk Scheduling

SSTF (Shortest Seek Time First) always selects the closest request.

Result:

```text
Total Head Movement = 236 Tracks
```

Advantages:

- Reduced seek time
- Better performance

Disadvantages:

- Possible starvation of distant requests

---

### Comparison

| Algorithm | Total Head Movement |
|------------|--------------------|
| FCFS | 640 |
| SSTF | 236 |

### Conclusion

SSTF significantly reduces disk head movement and therefore improves disk performance.

---

# How to Run the Project

Open a terminal in the project folder.

Run each simulation separately:

```bash
node part1-scheduling.js

node part2-synchronization.js

node part3-memory.js

node part4-disk.js
```
node all-parts-simulation.js

---

# Learning Outcomes

After completing this checkpoint, the following concepts were understood and implemented:

- CPU Scheduling Algorithms
- Process Waiting Time Calculation
- Round Robin Scheduling
- Race Conditions
- Mutual Exclusion and Mutex Locks
- Page Replacement Algorithms
- FIFO Memory Management
- LRU Memory Management
- Disk Scheduling Algorithms
- FCFS Disk Scheduling
- SSTF Disk Scheduling

---

# Final Conclusion

This checkpoint provided practical experience with important operating system concepts.

The simulations demonstrated how operating systems:

- Manage CPU resources efficiently.
- Protect shared data from concurrent access.
- Optimize memory utilization.
- Reduce disk access time.

Understanding these concepts is essential for designing efficient and reliable computer systems.