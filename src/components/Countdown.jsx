import { useEffect, useState } from 'react'

function formatDuration(seconds) {
  const s = Math.max(0, seconds)
  const years = Math.floor(s / (365.2425 * 24 * 3600))
  const daysR = s - years * 365.2425 * 24 * 3600
  const days = Math.floor(daysR / (24 * 3600))
  const hours = Math.floor((daysR % (24 * 3600)) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const secs = Math.floor(s % 60)
  return { years, days, hours, minutes, secs }
}

function Countdown({ targetDate, secondsRemaining }) {
  const [remaining, setRemaining] = useState(secondsRemaining ?? 0)

  useEffect(() => {
    setRemaining(secondsRemaining ?? 0)
  }, [secondsRemaining])

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const { years, days, hours, minutes, secs } = formatDuration(remaining)

  return (
    <div className="mt-6 grid grid-cols-5 gap-2 text-center">
      {[
        { label: 'Years', value: years },
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: secs },
      ].map((b) => (
        <div key={b.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-2xl font-bold text-white tabular-nums">{b.value.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-widest text-blue-300/80">{b.label}</div>
        </div>
      ))}

      <div className="col-span-5 text-center mt-3 text-blue-200/80 text-sm">
        Estimated final date: <span className="font-semibold text-white">{new Date(targetDate).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default Countdown
