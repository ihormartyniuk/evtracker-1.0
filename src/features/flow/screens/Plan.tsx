import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadState } from '../../../shared/storage'
import { calcStage } from '../stage'
import { track } from '../../../analytics/metaPixel'
import { getFlag } from '../../../config/flags'
import { planDay0ByProfile, planDay1ByProfile } from '../../../config/content/en'
import Page from '../../../shared/ui/Page'

export default function Plan() {
  const navigate = useNavigate()
  const state = loadState()
  const profile = state?.profile || 'habit'
  
  // Calculate stage for display
  const stage = state ? calcStage(state.firstVisitTs, Date.now()) : 'day0'
  
  // Select plan based on stage
  const planData = stage === 'day0' 
    ? planDay0ByProfile[profile] 
    : planDay1ByProfile[profile]
  
  useEffect(() => {
    if (state) {
      track('ViewPlan', {
        userId: state.userId,
        profileType: profile,
        stage,
      })
    }
  }, [state, profile, stage])
  
  const handleSoftOffer = () => {
    navigate('/offer/soft')
  }
  
  const handleGetTomorrow = () => {
    if (getFlag('ENABLE_LEAD_CAPTURE')) {
      navigate('/save')
    } else {
      navigate('/checkin')
    }
  }
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">{planData.title}</h1>
      <p className="text-base">Stage: {stage}</p>
      <div className="space-y-4">
        {planData.steps.map((step, idx) => (
          <div key={idx} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="text-base">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {getFlag('ENABLE_SOFT_OFFER_DAY0') && stage === 'day0' && (
          <button onClick={handleSoftOffer} className="btn btn-ghost w-full">
            Soft offer preview
          </button>
        )}
        <button onClick={handleGetTomorrow} className="btn btn-primary w-full">
          Get tomorrow's step
        </button>
      </div>
    </Page>
  )
}
