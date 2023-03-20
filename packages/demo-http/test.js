// const memoryLeakAllocations = [];

// const field = 'arrayBuffers'; // 'heapUsed';
// const allocationStep = 10000 * 1024; // 10MB

// const TIME_INTERVAL_IN_MSEC = 40;

// setInterval(() => {
//   const allocation = allocateMemory(allocationStep);

//   memoryLeakAllocations.push(allocation);

//   const mu = process.memoryUsage();
//   // # bytes / KB / MB / GB
//   const gbNow = mu[field] / 1024 / 1024 / 1024;
//   const gbRounded = Math.round(gbNow * 100) / 100;

//   console.log(`Heap allocated ${gbRounded} GB`);
// }, TIME_INTERVAL_IN_MSEC);

// function allocateMemory(size) {
//   // 模拟字节数的分配
//   // const numbers = size / 8;
//   // const arr = [];
//   // arr.length = numbers;
//   // for (let i = 0; i < numbers; i++) {
//   //   arr[i] = i;
//   // }
//   // return arr;
//   return Buffer.alloc(size);
// }
