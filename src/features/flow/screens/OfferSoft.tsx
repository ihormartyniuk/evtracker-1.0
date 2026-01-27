import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadState } from '../../../shared/storage'
import { track } from '../../../analytics/metaPixel'
import { calcStage } from '../stage'
import { getVariant } from '../../../shared/ab'
import { day0SoftOfferVariants, offers } from '../../../config/content/en'
import Page from '../../../shared/ui/Page'

export default function OfferSoft() {
  const navigate = useNavigate()
  const state = loadState()
  
  // A/B test for day0 soft offer
  const variant = getVariant('day0_soft_offer', ['A', 'B'])
  const variantCopy = variant === 'B' 
    ? day0SoftOfferVariants.B 
    : day0SoftOfferVariants.A
  
  useEffect(() => {
    if (state) {
      const currentStage = calcStage(state.firstVisitTs, Date.now())
      track('ViewOffer', {
        userId: state.userId,
        profileType: state.profile,
        stage: currentStage,
        variant,
      })
    }
  }, [state, variant])
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">{variantCopy.title}</h1>
      <p className="text-base">{variantCopy.description}</p>
      <button onClick={() => navigate('/offer/main')} className="btn btn-primary w-full">
        {offers.soft.ctaLabel}
      </button>
    </Page>
  )
}
