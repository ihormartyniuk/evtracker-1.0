import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ensureState, saveState, loadState } from '../../../shared/storage'
import { track } from '../../../analytics/metaPixel'
import { calcStage } from '../stage'
import { getFlag } from '../../../config/flags'
import { offers } from '../../../config/content/en'
import Page from '../../../shared/ui/Page'

export default function OfferMain() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Mark offer as viewed
    const state = ensureState()
    state.offerViewed = true
    saveState(state)
    
    // Track offer view
    const currentStage = calcStage(state.firstVisitTs, Date.now())
    track('ViewOffer', {
      userId: state.userId,
      profileType: state.profile,
      stage: currentStage,
    })
  }, [])
  
  const handleOrder = () => {
    if (getFlag('ENABLE_ORDER_COD')) {
      track('InitiateCheckout', {
        userId: loadState()?.userId,
      })
      navigate('/order')
    }
  }
  
  if (!getFlag('ENABLE_MAIN_OFFER')) {
    return (
      <Page>
        <h1 className="text-2xl font-semibold">Offer disabled</h1>
        <p className="text-base">This offer is currently unavailable.</p>
        <button onClick={() => navigate('/plan')} className="btn btn-primary w-full">
          Back to Plan
        </button>
      </Page>
    )
  }
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">{offers.main.title}</h1>
      <p className="text-base">{offers.main.description}</p>
      <ul className="list-disc list-inside space-y-2">
        {offers.main.features.map((feature, idx) => (
          <li key={idx} className="text-base">{feature}</li>
        ))}
      </ul>
      {getFlag('ENABLE_ORDER_COD') ? (
        <button onClick={handleOrder} className="btn btn-primary w-full">
          {offers.main.ctaLabel}
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-base">Coming soon</p>
          <button onClick={() => navigate('/plan')} className="btn btn-ghost w-full">
            Back to Plan
          </button>
        </div>
      )}
    </Page>
  )
}
