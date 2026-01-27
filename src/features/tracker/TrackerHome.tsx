import { useNavigate } from 'react-router-dom'
import { loadState, ensureState, saveState, todayISO } from '../../shared/storage'
import { track } from '../../analytics/metaPixel'
import { calcStage } from '../flow/stage'
import Page from '../../shared/ui/Page'

export default function TrackerHome() {
  const navigate = useNavigate()
  const state = loadState() || ensureState()
  const today = todayISO()
  const isDoneToday = state.lastCheckinDate === today
  
  const handleMarkDone = () => {
    const currentState = ensureState()
    const currentToday = todayISO()
    const currentStage = calcStage(currentState.firstVisitTs, Date.now())
    
    // Only update if not already done today
    if (currentState.lastCheckinDate !== currentToday) {
      currentState.streak = (currentState.streak || 0) + 1
      currentState.lastCheckinDate = currentToday
      saveState(currentState)
      
      // Track tracker checkin
      track('TrackerCheckin', {
        userId: currentState.userId,
        profileType: currentState.profile,
        stage: currentStage,
        value: 1,
      })
    }
  }
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">Evening Tracker</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <p className="text-2xl font-semibold">
            Streak: {state.streak || 0} days
          </p>
        </div>
      </div>
      <div>
        {isDoneToday ? (
          <p className="text-base">✓ Today marked as done</p>
        ) : (
          <button onClick={handleMarkDone} className="btn btn-primary w-full">
            Mark today as done
          </button>
        )}
      </div>
      <button onClick={() => navigate('/tracker/tip')} className="btn btn-ghost w-full">
        View today's tip
      </button>
    </Page>
  )
}
