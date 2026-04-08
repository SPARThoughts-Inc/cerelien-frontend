interface GlucoseReading {
  timestamp: string
  value: number
}

interface GlucoseChartProps {
  readings: GlucoseReading[]
}

const TARGET_LOW = 70
const TARGET_HIGH = 180
const MAX_VALUE = 400

export function GlucoseChart({ readings }: GlucoseChartProps) {
  const last24 = readings.slice(-24)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Glucose Readings (Last 24)</h3>

      <div className="flex items-end gap-1 h-48">
        {last24.map((reading, i) => {
          const inRange = reading.value >= TARGET_LOW && reading.value <= TARGET_HIGH
          const heightPct = Math.min((reading.value / MAX_VALUE) * 100, 100)

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end h-full"
              title={`${reading.value} mg/dL at ${reading.timestamp}`}
            >
              <div
                className={`w-full rounded-t ${inRange ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
          )
        })}
        {last24.length === 0 && (
          <p className="text-gray-400 text-sm w-full text-center">No glucose data available</p>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-500 inline-block" />
          In range ({TARGET_LOW}-{TARGET_HIGH} mg/dL)
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-500 inline-block" />
          Out of range
        </div>
      </div>
    </div>
  )
}
