import { useMemo, useState } from 'react'

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-slate-300 mb-1">{children}</label>
)

const Input = ({ className = '', ...props }) => (
  <input
    className={"w-full rounded-lg bg-white/5 text-white placeholder-slate-400 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition " + className}
    {...props}
  />
)

const Select = (props) => (
  <select
    className="w-full rounded-lg bg-white/5 text-white border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition"
    {...props}
  />
)

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

function Calculator() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    full_name: '',
    birth_date: '',
    gender: 'unspecified',
    is_smoker: false,
    height_cm: '',
    weight_kg: '',
    weekly_exercise_mins: 150,
    stress_level: 3,
    country: 'global',
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bmi = useMemo(() => {
    const h = parseFloat(form.height_cm)
    const w = parseFloat(form.weight_kg)
    if (!h || !w) return null
    const m = h / 100
    return (w / (m * m)).toFixed(1)
  }, [form.height_cm, form.weight_kg])

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const payload = {
        ...form,
        height_cm: form.height_cm ? Number(form.height_cm) : null,
        weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
        weekly_exercise_mins: Number(form.weekly_exercise_mins) || 0,
        stress_level: Number(form.stress_level) || 3,
      }
      const res = await fetch(`${baseUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_90%_100%,rgba(30,64,175,0.08),transparent_35%)]" />
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Enter your details</h2>
          <p className="text-slate-400 mt-1 mb-6">We use lifestyle signals to build a playful estimate.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={form.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="Optional" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Birth date</Label>
                <Input type="date" required value={form.birth_date} onChange={(e) => update('birth_date', e.target.value)} />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                  <option value="unspecified">Unspecified</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Country</Label>
                <Select value={form.country} onChange={(e) => update('country', e.target.value)}>
                  <option value="global">Global</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="india">India</option>
                  <option value="japan">Japan</option>
                  <option value="nigeria">Nigeria</option>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input id="smk" type="checkbox" checked={form.is_smoker} onChange={(e) => update('is_smoker', e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/10" />
                <label htmlFor="smk" className="text-sm text-slate-300">I smoke</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Height (cm)</Label>
                <Input type="number" min={100} max={250} value={form.height_cm} onChange={(e) => update('height_cm', e.target.value)} placeholder="e.g. 175" />
              </div>
              <div>
                <Label>Weight (kg)</Label>
                <Input type="number" min={30} max={300} value={form.weight_kg} onChange={(e) => update('weight_kg', e.target.value)} placeholder="e.g. 70" />
              </div>
              <div>
                <Label>Weekly exercise (mins)</Label>
                <Input type="number" min={0} max={2000} value={form.weekly_exercise_mins} onChange={(e) => update('weekly_exercise_mins', e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Stress level</Label>
              <input type="range" min="1" max="5" value={form.stress_level} onChange={(e) => update('stress_level', e.target.value)} className="w-full accent-cyan-400" />
              <div className="text-xs text-slate-400 flex justify-between"><span>Low</span><span>High</span></div>
            </div>

            <button disabled={loading} className="w-full rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold py-3 transition disabled:opacity-60">
              {loading ? 'Calculating…' : 'Calculate my clock'}
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur">
          <h3 className="text-xl md:text-2xl font-bold text-white">Your prediction</h3>
          {!result ? (
            <p className="text-slate-400 mt-2">Fill the form and press the button to see your countdown.</p>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg bg-black/30 border border-white/10 p-4">
                <div className="text-slate-400 text-sm">Estimated date</div>
                <div className="text-2xl md:text-3xl font-bold text-white">{formatDate(result.predicted_death_date)}</div>
                <div className="text-slate-400 text-sm mt-1">Confidence: {result.confidence}%</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-black/30 border border-white/10 p-4">
                  <div className="text-slate-400 text-sm">Age</div>
                  <div className="text-xl font-semibold text-white">{result.current_age_years} yrs</div>
                </div>
                <div className="rounded-lg bg-black/30 border border-white/10 p-4">
                  <div className="text-slate-400 text-sm">Lifespan</div>
                  <div className="text-xl font-semibold text-white">{result.predicted_lifespan_years} yrs</div>
                </div>
              </div>

              <div className="rounded-lg bg-black/30 border border-white/10 p-4">
                <div className="text-slate-400 text-sm mb-2">Factors</div>
                <ul className="space-y-1 text-sm text-slate-300">
                  {Object.entries(result.factors).map(([k, v]) => (
                    <li key={k} className="flex justify-between"><span className="capitalize">{k.replaceAll('_', ' ')}</span><span className={v >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{v >= 0 ? '+' : ''}{v} yrs</span></li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Calculator
