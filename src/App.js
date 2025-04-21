import './App.css'
import { useState, useEffect } from 'react'
import { ScatterPlot } from 'react-d3-plotter'

function generateRandomHexColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
}

function generateRandomData(maxX, maxY, n) {
  const randomData = []

  for (let i = 0; i < n; i++) {
    const dataPoint = {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      radius: Math.random() * 10,
      fill: generateRandomHexColor()
    }
    randomData.push(dataPoint)
  }

  return randomData
}

export const App = () => {
  const [maxX, setMaxX] = useState(200)
  const [maxY, setMaxY] = useState(200)
  const [numberOfPoints, setNumberOfPoints] = useState(30)
  const [width, setWidth] = useState(680)
  const [height, setHeight] = useState(500)
  const [data, setData] = useState(() => generateRandomData(maxX, maxY, numberOfPoints))

  useEffect(() => {
    setData(generateRandomData(maxX, maxY, numberOfPoints))
  }, [maxX, maxY, numberOfPoints])

  return (
    <div className="App" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Max X: {maxX}
          <input
            type="range"
            min="50"
            max="500"
            value={maxX}
            onChange={(e) => setMaxX(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Max Y: {maxY}
          <input
            type="range"
            min="50"
            max="500"
            value={maxY}
            onChange={(e) => setMaxY(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Number of Points: {numberOfPoints}
          <input
            type="range"
            min="1"
            max="500"
            value={numberOfPoints}
            onChange={(e) => setNumberOfPoints(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Width: {width}
          <input
            type="range"
            min="100"
            max="1000"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Height: {height}
          <input
            type="range"
            min="100"
            max="1000"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <ScatterPlot data={data} width={width} height={height} />
      </div>
    </div>
  )
}
