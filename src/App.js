import './App.css';
import { ScatterPlot } from 'react-d3-plotter'

function generateRandomData(maxX, maxY, n) {
  const randomData = [];

  for (let i = 0; i < n; i++) {
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    randomData.push([randomX, randomY]);
  }

  return randomData;
}
const maxX = 50
const maxY = 150
const numberOfPoints = 200
const randomData = generateRandomData(maxX, maxY, numberOfPoints)

export const App = () => {
  return (
    <div className="App">
      <div>
        <ScatterPlot data={randomData} />
      </div>
    </div>
  )
}
