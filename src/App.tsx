import { useState, useEffect, useMemo } from 'react'
import { ScatterPlot, DataPoint } from 'react-d3-plotter'
import { generateRandomData, generateTrendingData, generateSinusoidalData } from './DataGenUtil'

export const App = () => {
  const [maxX, setMaxX] = useState(200)
  const [maxY, setMaxY] = useState(200)
  const [numberOfPoints, setNumberOfPoints] = useState(50)
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(400)
  const [data, setData] = useState<DataPoint[]>([])

  const [generator, setGenerator] = useState<'random' | 'trending' | 'sinusoidal'>('random')

  const config = useMemo(() => {
    return {
      width: width,
      height: height,
      padding: 60,
      xAxisLabel: 'X Axis',
      yAxisLabel: 'Y Axis',
      title: 'Scatter Plot Example'
    }
  }, [width, height])

  useEffect(() => {
    let generatedData: DataPoint[] = []

    if (generator === 'random') {
      generatedData = generateRandomData(maxX, maxY, numberOfPoints)
    } else if (generator === 'trending') {
      generatedData = generateTrendingData(maxX, maxY, numberOfPoints)
    } else if (generator === 'sinusoidal') {
      generatedData = generateSinusoidalData(maxX, maxY, numberOfPoints)
    }

    setData(generatedData)
  }, [generator, maxX, maxY, numberOfPoints])

  return (
    <div className="App" style={{ padding: '20px' }}>
      <form style={{ marginBottom: '20px', display: 'grid', gap: '10px', maxWidth: '400px' }}>
        <fieldset>
          <legend>Select Data Generator</legend>
          <label>
            <input
              type="radio"
              value="random"
              checked={generator === 'random'}
              onChange={(e) => setGenerator(e.target.value as 'random')}
            />
            Random
          </label>
          <label>
            <input
              type="radio"
              value="trending"
              checked={generator === 'trending'}
              onChange={(e) => setGenerator(e.target.value as 'trending')}
            />
            Trending (Linear)
          </label>
          <label>
            <input
              type="radio"
              value="sinusoidal"
              checked={generator === 'sinusoidal'}
              onChange={(e) => setGenerator(e.target.value as 'sinusoidal')}
            />
            Sinusoidal
          </label>
        </fieldset>

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
      </form>

      <ScatterPlot data={data} config={config} />
    </div>
  )
}