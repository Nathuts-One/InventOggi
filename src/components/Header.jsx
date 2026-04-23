import { Trash2, Settings } from 'lucide-react'
import { useWeather } from '../hooks/useWeather'
import { WeatherIcon } from './WeatherIcon'

export function Header({ totalCount, onClearInventory, onManage }) {
  const weather = useWeather()

  return (
    <header className="bg-gray-800 text-white p-6 shadow-md relative">
      <div className="absolute top-6 bottom-6 left-28 w-px bg-gray-300/10" />
      <div className="absolute top-6 bottom-6 right-28 w-px bg-gray-300/10" />
      {weather && (
        <div className="absolute top-6 left-4 flex flex-col items-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Amanhã</p>
          <span className="text-gray-400"><WeatherIcon code={weather.code} size={22} /></span>
          <span className="text-gray-200 text-sm font-medium mt-1">{weather.min}°/{weather.max}°</span>
        </div>
      )}
      <div className="flex flex-col items-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total de itens</p>
        <p className="text-5xl font-bold">{totalCount}</p>
      </div>
      <div className="absolute top-6 right-4 flex items-start gap-2">
        {onManage && (
          <div className="flex flex-col items-center">
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
        <div className="flex flex-col items-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Limpar</p>
          <button
            onClick={onClearInventory}
            className="p-2 bg-red-800 hover:bg-red-700 text-red-100 rounded-lg transition-colors"
            aria-label="Limpar inventário"
            title="Limpar inventário"
          >
            <Trash2 size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  )
}
