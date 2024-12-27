import { wojtechImplementation, dalistImplementation } from '../src/implementations';

type BenchmarkResult = {
  name: string;
  totalTime: number;
  averageTime: number;
  operations: number;
};

const TEST_CASES = ['US', 'GB', 'FR', 'DE', 'JP', 'en-US', 'en-GB', 'de-DE'];
const ITERATIONS = 1_000_000;

const runBenchmark = (fn: (code: string) => string, name: string, iterations: number): BenchmarkResult => {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    fn(TEST_CASES[i % TEST_CASES.length]);
  }
  
  const totalTime = performance.now() - start;
  
  return {
    name,
    totalTime,
    averageTime: totalTime / iterations,
    operations: iterations
  };
};

const formatNumber = (num: number) => num.toLocaleString(undefined, {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3
});

const printResults = (results: BenchmarkResult[]) => {
  const fastest = Math.min(...results.map(r => r.averageTime));
  
  console.log('\nBenchmark Results:');
  console.log('='.repeat(50));
  console.log('Implementation'.padEnd(20), 'Total Time'.padEnd(15), 'Avg Time'.padEnd(15), 'Ratio');
  console.log('-'.repeat(50));
  
  results.forEach(({ name, totalTime, averageTime }) => {
    const ratio = averageTime / fastest;
    console.log(
      name.padEnd(20),
      `${formatNumber(totalTime)}ms`.padEnd(15),
      `${formatNumber(averageTime * 1000)}µs`.padEnd(15),
      `${ratio.toFixed(2)}x`
    );
  });
};

const implementations = [
  { name: "dalist", fn: dalistImplementation },
  { name: "wojtech", fn: wojtechImplementation }
];

const results = implementations.map(({ name, fn }) => 
  runBenchmark(fn, name, ITERATIONS)
);

printResults(results);
