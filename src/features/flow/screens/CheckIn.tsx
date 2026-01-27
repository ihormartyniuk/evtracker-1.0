import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ensureState, saveState, todayISO } from '../../../shared/storage'
import { track } from '../../../analytics/metaPixel'
import { calcStage } from '../stage'
import Page from '../../../shared/ui/Page'

export default function CheckIn() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<'ok' | 'slip' | null>(null)
  
  const handleSubmit = () => {
    if (!selected) return
    
    const state = ensureState()
    const today = todayISO()
    const currentStage = calcStage(state.firstVisitTs, Date.now())
    
    if (selected === 'ok') {
      // Only update streak if last checkin was not today
      if (state.lastCheckinDate !== today) {
        state.streak = (state.streak || 0) + 1
        state.lastCheckinDate = today
      }
    } else {
      // Had a slip - reset streak but still record checkin
      state.streak = 0
      state.lastCheckinDate = today
    }
    
    saveState(state)
    
    // Track checkin
    track('DailyCheckin', {
      userId: state.userId,
      profileType: state.profile,
      stage: currentStage,
      value: selected === 'ok' ? 1 : 0,
    })
    
    navigate('/offer/main')
  }
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">Check In</h1>
      <p className="text-base">How did last night go?</p>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="checkin"
            value="ok"
            checked={selected === 'ok'}
            onChange={() => setSelected('ok')}
            className="radio radio-primary"
          />
          <span className="text-base">OK</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="checkin"
            value="slip"
            checked={selected === 'slip'}
            onChange={() => setSelected('slip')}
            className="radio radio-primary"
          />
          <span className="text-base">Had a slip</span>
        </label>
      </div>
      <button onClick={handleSubmit} disabled={!selected} className="btn btn-primary w-full">
        Submit
      </button>
    </Page>
  )
}
