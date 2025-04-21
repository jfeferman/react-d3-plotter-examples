import { useState } from 'react'
import { RandomData } from './examples/RandomData'
import { GDPData } from './examples/GDPData'

export const App = () => {
  const [mode, setMode] = useState<'random' | 'gdp'>('random')

  return (
    <div>
      <select value={mode} onChange={(e) => setMode(e.target.value as 'random' | 'gdp')}>
        <option value="random">Random Data</option>
        <option value="gdp">GDP Data</option>
      </select>

      {mode === 'random' && <RandomData />}
      {mode === 'gdp' && <GDPData />}
    </div>
  )
}
