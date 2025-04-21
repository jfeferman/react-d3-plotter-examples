import { DataPoint } from "react-d3-plotter";

function generateRandomHexColor() {
  // Force brighter colors by limiting RGB range
  const r = Math.floor(100 + Math.random() * 155)
  const g = Math.floor(100 + Math.random() * 155)
  const b = Math.floor(100 + Math.random() * 155)
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

export function generateNormalDistributionData(maxX, maxY, n) {
  const randomData = [];
  
  const meanX = maxX / 2; // Center of the distribution
  const meanY = maxY / 2;
  const stdDev = 50; // Standard deviation, controls the spread

  function gaussianRandom(mean, stdDev) {
    let u1 = 1 - Math.random(); // Uniform(0,1) random variates
    let u2 = 1 - Math.random();
    let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); // Box-Muller transform
    return z0 * stdDev + mean;
  }

  for (let i = 0; i < n; i++) {
    const x = Math.min(Math.max(gaussianRandom(meanX, stdDev), 0), maxX); // Clamping the value within bounds
    const y = Math.min(Math.max(gaussianRandom(meanY, stdDev), 0), maxY);

    const dataPoint = {
      x,
      y,
      radius: Math.random() * 10,
      fill: generateRandomHexColor(),
    };

    randomData.push(dataPoint);
  }

  return randomData;
}

export function generateTrendingData(maxX, maxY, n) {
  const randomData = [];
  const slope = 0.5; // slope of the line (adjust for steeper or flatter lines)
  const intercept = 20; // the y-intercept (this will shift the line up or down)

  for (let i = 0; i < n; i++) {
    const x = Math.random() * maxX; // Random X
    const y = slope * x + intercept + (Math.random() - 0.5) * 20; // Line equation plus some noise for variety

    const dataPoint = {
      x,
      y,
      radius: Math.random() * 10,
      fill: generateRandomHexColor(),
    };

    randomData.push(dataPoint);
  }

  return randomData;
}

export function generateRandomData(maxX: number, maxY: number, n: number): DataPoint[] {
  const randomData: DataPoint[] = []

  for (let i = 0; i < n; i++) {
    randomData.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      radius: Math.random() * 10,
      fill: generateRandomHexColor()
    })
  }

  return randomData
}

export function generateSinusoidalData(maxX, maxY, n) {
  const randomData = [];
  const amplitude = maxY / 4; // Amplitude of the wave
  const frequency = 0.1; // Frequency of the wave (more frequent waves for smaller values)

  for (let i = 0; i < n; i++) {
    const x = (Math.random() * maxX); // Random X
    const y = amplitude * Math.sin(frequency * x) + (Math.random() - 0.5) * 10; // Wave with some randomness

    const dataPoint = {
      x,
      y,
      radius: Math.random() * 10,
      fill: generateRandomHexColor(),
    };

    randomData.push(dataPoint);
  }

  return randomData;
}