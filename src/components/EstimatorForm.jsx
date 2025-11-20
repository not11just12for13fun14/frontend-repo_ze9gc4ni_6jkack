import { useMemo } from 'react'

function EstimatorForm({ values, setValues, onEstimate, loading }) {
  const age = useMemo(() => {
    if (!values.date_of_birth) return null
    const dob = new Date(values.date_of_birth)
    const diff = Date.now() - dob.getTime()
    const ageDt = new Date(diff)
    return Math.abs(ageDt.getUTCFullYear() - 1970)
  }, [values.date_of_birth])

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm text-blue-200 mb-1">Date of Birth</label>
          <input
            type="date"
            value={values.date_of_birth}
            onChange={(e) => setValues(v => ({ ...v, date_of_birth: e.target.value }))}
            className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Sex</label>
          <select
            value={values.sex}
            onChange={(e) => setValues(v => ({ ...v, sex: e.target.value }))}
            className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Smoker</label>
          <select
            value={values.smoker ? 'yes' : 'no'}
            onChange={(e) => setValues(v => ({ ...v, smoker: e.target.value === 'yes' }))}
            className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">BMI (optional)</label>
          <input
            type="number"
            min="1"
            step="0.1"
            placeholder="e.g. 22.5"
            value={values.bmi ?? ''}
            onChange={(e) => setValues(v => ({ ...v, bmi: e.target.value ? parseFloat(e.target.value) : null }))}
            className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Mood</label>
          <select
            value={values.mode}
            onChange={(e) => setValues(v => ({ ...v, mode: e.target.value }))}
            className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="optimistic">Optimistic</option>
            <option value="normal">Normal</option>
            <option value="pessimistic">Pessimistic</option>
            <option value="sadistic">Sadistic</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-blue-200">
        <p className="text-sm">{age !== null ? `Approx age: ${age}` : 'Select your birth date'}</p>
        <button
          onClick={onEstimate}
          disabled={loading || !values.date_of_birth}
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Estimating…' : 'Estimate'}
        </button>
      </div>
    </div>
  )
}

export default EstimatorForm
