import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ensureState, loadState } from '../../../shared/storage'
import { calcStage } from '../stage'
import { track } from '../../../analytics/metaPixel'
import { getVariant } from '../../../shared/ab'
import { landingHeadlineVariants, appCopy } from '../../../config/content/en'
import Page from '../../../shared/ui/Page'
import women1Image from '../../../assets/gen_women_tea.png'

export default function Landing() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<string>('')
  const [copy, setCopy] = useState(appCopy.landing)
  
  useEffect(() => {
    const state = ensureState()
    const currentStage = calcStage(state.firstVisitTs, Date.now())
    setStage(currentStage)
    
    const variant = getVariant('landing_headline', ['A', 'B'])
    const variantCopy = variant === 'B' 
      ? { ...landingHeadlineVariants.B, ctaLabel: appCopy.landing.ctaLabel }
      : { ...landingHeadlineVariants.A, ctaLabel: appCopy.landing.ctaLabel }
    setCopy(variantCopy)
    
    track('ViewContent', {
      userId: state.userId,
      stage: currentStage,
      variant,
    })
  }, [])
  
  const handleStart = () => {
    const state = loadState()
    track('StartQuiz', {
      userId: state?.userId,
      stage: state ? calcStage(state.firstVisitTs, Date.now()) : undefined,
    })
    navigate('/quiz')
  }
  
  return (
    <Page>
      <div className="page-container">
        {/* Top Trust Header */}
        <div className="flex justify-between items-center mb-6 opacity-60">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black uppercase tracking-tighter">Certified Method</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-orange-400 text-xs">★★★★★</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">4.9/5 Score</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="landing-headline">{copy.headline}</h1>
          <p className="landing-subheadline mt-4">{copy.subheadline}</p>
        </div>

        {/* Dynamic Science Score */}
        <div className="mt-8 bg-white border border-slate-100 rounded-3xl p-4 flex items-center justify-around shadow-sm">
          <div className="text-center">
            <p className="text-xl font-black text-emerald-600">98%</p>
            <p className="text-[9px] uppercase font-bold text-slate-400">Natural</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-100"></div>
          <div className="text-center">
            <p className="text-xl font-black text-emerald-600">24/7</p>
            <p className="text-[9px] uppercase font-bold text-slate-400">Metabolic Support</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-100"></div>
          <div className="text-center">
            <p className="text-xl font-black text-emerald-600">#1</p>
            <p className="text-[9px] uppercase font-bold text-slate-400">Evening Ritual</p>
          </div>
        </div>

        <div className="trust-badge-container mt-6">
          <div className="trust-badge-item">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
            <span>Stop 9 PM cravings instantly</span>
          </div>
          <div className="trust-badge-item">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
            <span>Scientific "Cortisol-Reset" approach</span>
          </div>
          <div className="trust-badge-item">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
            <span>Join 15,000+ success stories</span>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={handleStart} className="btn btn-primary w-full">
            {copy.ctaLabel}
          </button>
          <p className="text-center text-xs text-slate-400 mt-4 font-semibold uppercase tracking-widest flex items-center justify-center">
            <span className="status-indicator"></span>
            Analysis is free & anonymous
          </p>
        </div>

        <div className="relative mt-12">
          <img src={women1Image} alt="Ritual" className="w-full rounded-[40px] shadow-2xl" />
          <div className="testimonial-card">
            <div className="flex gap-1 mb-2">
               {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-[10px]">★</span>)}
            </div>
            <p className="text-sm text-slate-700 italic leading-snug font-medium">
              "I finally stopped the midnight kitchen raids. I feel 5kg lighter in my mind and body!"
            </p>
            <div className="mt-3 flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">SJ</div>
               <p className="text-[11px] font-black text-slate-900">— Sarah J., Verified User</p>
            </div>
          </div>
        </div>

        {/* Scientific Partner Section */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Science Backed By</p>
          <div className="flex justify-around items-center grayscale opacity-40 px-4">
            <span className="font-serif font-bold italic">NatureCare</span>
            <span className="font-sans font-black">BIO-LAB</span>
            <span className="font-mono text-xs font-bold">HealthLine</span>
          </div>
        </div>

        <button onClick={handleStart} className="btn btn-primary w-full mt-10 mb-10">
          Start My Transformation
        </button>
      </div>
    </Page>
  )
}