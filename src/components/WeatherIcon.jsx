import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react'

export function WeatherIcon({ code, size = 22 }) {
  const props = { size, strokeWidth: 2 }

  if (code === 0 || code === 1) return <Sun {...props} />
  if (code === 2) return <CloudSun {...props} />
  if (code === 3) return <Cloud {...props} />
  if (code === 45 || code === 48) return <CloudFog {...props} />
  if (code >= 51 && code <= 57) return <CloudDrizzle {...props} />
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain {...props} />
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return <CloudSnow {...props} />
  if (code >= 95) return <CloudLightning {...props} />
  return <Cloud {...props} />
}
