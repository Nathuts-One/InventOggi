import { useState, useEffect } from 'react'

const FALLBACK = { latitude: -23.5505, longitude: -46.6333 } // São Paulo

async function fetchForecast({ latitude, longitude }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=2`
  const res = await fetch(url)
  const json = await res.json()
  return {
    max: Math.round(json.daily.temperature_2m_max[1]),
    min: Math.round(json.daily.temperature_2m_min[1]),
    code: json.daily.weather_code[1],
  }
}

export function useWeather() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false

    function loadFallback() {
      fetchForecast(FALLBACK)
        .then(d => { if (!cancelled) setData(d) })
        .catch(() => {})
    }

    if (!navigator.geolocation) {
      loadFallback()
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const d = await fetchForecast(pos.coords)
          if (!cancelled) setData(d)
        } catch {
          loadFallback()
        }
      },
      () => loadFallback(),
      { timeout: 5000 }
    )

    return () => { cancelled = true }
  }, [])

  return data
}
