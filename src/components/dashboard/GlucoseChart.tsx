interface GlucoseReading {
  reading_timestamp: string
  value: string | number
}

interface GlucoseChartProps {
  readings: GlucoseReading[]
}

const TARGET_LOW = 70
const TARGET_HIGH = 180
const MAX_VALUE = 400

function formatTime(timestamp: string): string {
  try {
    const d = new Date(timestamp)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export function GlucoseChart({ readings }: GlucoseChartProps) {
  const last24 = readings.slice(-24)
  const targetLowPct = (TARGET_LOW / MAX_VALUE) * 100
  const targetHighPct = (TARGET_HIGH / MAX_VALUE) * 100

  return (
    <div className="card-clinical card-accent-copper p-6">
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-lg font-semibold"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}
        >
          Glucose Readings (Last 24)
        </h3>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-green-500 inline-block" />
            In range ({TARGET_LOW}-{TARGET_HIGH} mg/dL)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500 inline-block" />
            Out of range
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Target range band */}
        {last24.length > 0 && (
          <div
            className="absolute left-0 right-0 rounded-sm pointer-events-none"
            style={{
              bottom: `${targetLowPct}%`,
              height: `${targetHighPct - targetLowPct}%`,
              backgroundColor: 'rgba(47, 133, 90, 0.06)',
              borderTop: '1px dashed rgba(47, 133, 90, 0.25)',
              borderBottom: '1px dashed rgba(47, 133, 90, 0.25)',
            }}
          />
        )}

        <div className="flex items-end gap-1 h-48">
          {last24.map((reading, i) => {
            const val = typeof reading.value === 'string' ? parseFloat(reading.value) : reading.value
            const inRange = val >= TARGET_LOW && val <= TARGET_HIGH
            const heightPct = Math.min((val / MAX_VALUE) * 100, 100)

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
                title={`${val} mg/dL at ${reading.reading_timestamp}`}
              >
                <div
                  className={`w-full rounded-t transition-all duration-300 ${inRange ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    height: `${heightPct}%`,
                    opacity: 0.85,
                    minWidth: '4px',
                  }}
                />
              </div>
            )
          })}
          {last24.length === 0 && (
            <p className="text-sm w-full text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>No glucose data available</p>
          )}
        </div>

        {/* Time labels */}
        {last24.length > 0 && (
          <div className="flex gap-1 mt-2">
            {last24.map((reading, i) => (
              <div key={i} className="flex-1 text-center">
                {(i === 0 || i === Math.floor(last24.length / 2) || i === last24.length - 1) && (
                  <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {formatTime(reading.reading_timestamp)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
