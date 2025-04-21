import { useEffect, useState } from 'react'
import { ScatterPlot } from 'react-d3-plotter'
import { DataPoint } from 'react-d3-plotter' // assuming you export this type

async function getCountries() {
  const res = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=300')
  const data = await res.json()
  return data[1].map((c: any) => ({
    code: c.id,
    name: c.name
  }))
}

async function getGDPSeries(countryCode: string): Promise<DataPoint[]> {
  const res = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1000`)
  const data = await res.json()
  if (!data[1]) return []

  return data[1]
    .filter((d: any) => d.value !== null)
    .map((d: any) => ({
      x: Number(d.date), // year
      y: Number(d.value) / 1_000_000_000, // scale GDP to billions for readability
    }))
    .reverse() // oldest to newest
}

export const GDPData = () => {
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([])
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    getCountries().then(setCountries)
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      getGDPSeries(selectedCountry).then(setData)
    }
  }, [selectedCountry])

  const config = {
    width: 800,
    height: 500,
    padding: 60,
    xAxisLabel: 'Year',
    yAxisLabel: 'GDP (Billion USD)',
    title: `GDP Over Time (${selectedCountry})`,
    xDomain: undefined, // you could calculate from data if you want
    yDomain: undefined,
  }

  return (
    <div style={{ padding: 20 }}>
      <form style={{ marginBottom: 20 }}>
        <label>
          Select Country:
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ marginLeft: 10 }}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
      </form>

      <ScatterPlot data={data} config={config} />
    </div>
  )
}