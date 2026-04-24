import { Settings } from 'lucide-react'
import { useWeather } from '../hooks/useWeather'
import { WeatherIcon } from './WeatherIcon'

export function Header({ totalCount, onManage, isLoading = false }) {
  const { data: weather, loading: weatherLoading } = useWeather()

  return (
    <header className="bg-gray-800 text-white p-6 shadow-md relative">
      <div className="absolute top-6 bottom-6 left-28 w-px bg-gray-300/10" />
      <div className="absolute top-6 bottom-6 right-28 w-px bg-gray-300/10" />
      <div className="absolute top-6 left-4 flex flex-col items-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Amanhã</p>
        {weatherLoading ? (
          <>
            <div className="h-[22px] w-[22px] rounded-full bg-gray-700 animate-pulse" />
            <div className="h-4 w-14 bg-gray-700 rounded mt-1 animate-pulse" />
          </>
        ) : weather ? (
          <>
            <span className="text-gray-400"><WeatherIcon code={weather.code} size={22} /></span>
            <span className="text-gray-200 text-sm font-medium mt-1">{weather.min}°/{weather.max}°</span>
          </>
        ) : null}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total de itens</p>
        {isLoading ? (
          <div className="h-12 w-16 bg-gray-700 rounded animate-pulse" />
        ) : (
          <p className="text-5xl font-bold">{totalCount}</p>
        )}
      </div>
      {onManage && (
        <div className="absolute top-6 right-4 flex flex-col items-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Gerenciar</p>
          <button
            onClick={onManage}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors"
            aria-label="Gerenciar"
            title="Gerenciar"
          >
            <Settings size={22} strokeWidth={2} />
          </button>
        </div>
      )}
    </header>
  )
}
