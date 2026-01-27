import { useNavigate } from 'react-router-dom'
import { tips } from '../../config/content/en'
import Page from '../../shared/ui/Page'

/**
 * Get deterministic tip based on date
 */
function getTipOfDay(): string {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  const tipIndex = dayOfYear % tips.length
  return tips[tipIndex]
}

export default function TrackerTip() {
  const navigate = useNavigate()
  const tip = getTipOfDay()
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">Tip of the Day</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <p className="text-base leading-relaxed">{tip}</p>
        </div>
      </div>
      <button onClick={() => navigate('/tracker')} className="btn btn-ghost w-full">
        Back to Tracker
      </button>
    </Page>
  )
}
