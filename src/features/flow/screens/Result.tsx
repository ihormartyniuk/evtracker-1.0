import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadState } from '../../../shared/storage'
import { calcStage } from '../stage'
import { track } from '../../../analytics/metaPixel'
import { profileCopyByType, planDay0ByProfile } from '../../../config/content/en'
import Page from '../../../shared/ui/Page'

export default function Result() {
  const navigate = useNavigate()
  const state = loadState()
  const profile = state?.profile || 'habit'
  const copy = profileCopyByType[profile]
  const stage = state ? calcStage(state.firstVisitTs, Date.now()) : 'day0'
  const planData = planDay0ByProfile[profile]
  
  useEffect(() => {
    if (state) {
      track('ViewPlan', {
        userId: state.userId,
        profileType: profile,
        stage,
      })
    }
  }, [state, profile, stage])
  
  const handleTeaClick = () => {
    navigate('/offer/soft')
  }

  return (
    <Page>
      <div className="page-container pb-10">
        {/* Verification Header */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-1 opacity-60">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Verified Science</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-1 opacity-60">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">GDPR Compliant</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Personal Analysis
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">{copy.title}</h1>
          <p className="text-slate-600 mt-2 italic">"{copy.subtitle}"</p>
        </div>

        {/* Diagnostic Section */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 mb-8 relative overflow-hidden">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Clinical Insight:</h3>
            <div className="space-y-3">
                {copy.explanation.map((text, idx) => (
                    <p key={idx} className="text-slate-600 leading-relaxed flex gap-2 text-sm">
                        <span className="text-emerald-500 font-bold">✓</span> {text}
                    </p>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">🔬</div>
               <p className="text-[10px] text-slate-400 leading-tight">
                 Methodology based on <b>Circadian Rhythm Theory</b> and <b>Nutritional Psychology</b>.
               </p>
            </div>
        </div>

        {/* Hormonal Education Section */}
        <div className="mb-10 px-1">
          <h2 className="text-xl font-bold text-slate-900 mb-4">The Science of Your Cravings</h2>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-end h-32 gap-2 mb-4">
              {/* Visual Chart Placeholder */}
              <div className="flex-1 bg-slate-50 rounded-t-lg h-[40%] relative group">
                <div className="absolute -top-6 left-0 right-0 text-[10px] font-bold text-slate-400 text-center uppercase">6 PM</div>
              </div>
              <div className="flex-1 bg-orange-100 rounded-t-lg h-[90%] relative">
                <div className="absolute -top-6 left-0 right-0 text-[10px] font-bold text-orange-500 text-center uppercase">9 PM</div>
                <div className="absolute top-2 left-0 right-0 text-[10px] text-orange-600 font-black text-center">SPIKE</div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-lg h-[30%] relative">
                <div className="absolute -top-6 left-0 right-0 text-[10px] font-bold text-emerald-600 text-center uppercase">11 PM</div>
                <div className="absolute -top-12 left-0 right-0 text-[9px] text-emerald-700 font-bold text-center leading-tight">Ritual Effect</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">The Ghrelin Spike</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    At 9 PM, your "hunger hormone" **Ghrelin** surges. This isn't lack of willpower—it's a biological command to find sugar.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <span className="text-xl">🛡️</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">The Botanical Shield</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our selected herbs signal your brain to release **Leptin**, the "fullness hormone," effectively muting the 9 PM craving signal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Solution Block */}
        <h2 className="text-xl font-bold text-slate-900 mb-4 px-1">Evidence-Based Solution</h2>
        
        <div 
          onClick={handleTeaClick}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-6 mb-8 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] group relative"
        >
            <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter flex items-center gap-1">
                <span>⭐</span> Recommended
            </div>
            
            <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl group-hover:scale-110 transition-transform">
                    ☕
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-emerald-900 leading-tight">
                        Anti-Crave Botanical Blend
                    </h3>
                    <p className="text-sm text-emerald-800/80 mt-1">
                        Formulated to regulate <b>ghrelin</b> (hunger hormone) levels during evening spikes.
                    </p>
                </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-white/50 rounded-xl p-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">94% Success Rate</span>
                <span className="text-emerald-600 font-bold text-sm underline group-hover:text-emerald-800">Learn Science →</span>
            </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-10">
          {planData.steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start px-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 font-bold text-white text-[10px]">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Trust Badges */}
        <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-6 mb-8">
            <div className="text-center">
                <div className="text-xl mb-1">🌿</div>
                <p className="text-[9px] font-bold text-slate-500 uppercase leading-tight">100%<br/>Natural</p>
            </div>
            <div className="text-center border-x border-slate-100 px-2">
                <div className="text-xl mb-1">🧪</div>
                <p className="text-[9px] font-bold text-slate-500 uppercase leading-tight">Lab<br/>Tested</p>
            </div>
            <div className="text-center">
                <div className="text-xl mb-1">📋</div>
                <p className="text-[9px] font-bold text-slate-500 uppercase leading-tight">Clinically<br/>Backed</p>
            </div>
        </div>

        <button onClick={handleTeaClick} className="btn btn-primary w-full">
            Start My Ritual
        </button>
      </div>
    </Page>
  )
}