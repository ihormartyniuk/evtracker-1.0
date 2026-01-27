import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../../../shared/ui/Page'

const STEPS = [
  { message: 'Analyzing your metabolic responses...', duration: 1500 },
  { message: 'Identifying evening cortisol triggers...', duration: 2000 },
  { message: 'Calculating biological snack-window...', duration: 1800 },
  { message: 'Selecting personalized botanical blend...', duration: 1500 },
  { message: 'Finalizing your 24-hour roadmap...', duration: 1200 },
]

export default function LoadingResults() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let stepIndex = 0
    let progressTimer: NodeJS.Timeout

    const runSteps = async () => {
      for (const step of STEPS) {
        setCurrentStep(stepIndex)
        // Smooth progress bar animation
        const startProgress = (stepIndex / STEPS.length) * 100
        const endProgress = ((stepIndex + 1) / STEPS.length) * 100
        
        let current = startProgress
        const stepDuration = step.duration
        const increment = (endProgress - startProgress) / (stepDuration / 30)

        const interval = setInterval(() => {
          current += increment
          if (current >= endProgress) {
            clearInterval(interval)
            setProgress(endProgress)
          } else {
            setProgress(current)
          }
        }, 15)

        await new Promise(resolve => setTimeout(resolve, step.duration))
        stepIndex++
      }
      navigate('/result')
    }

    runSteps()
    return () => clearInterval(progressTimer)
  }, [navigate])

  return (
    <Page>
      <div className="page-container flex flex-col items-center justify-center min-h-[70vh] text-center">
        {/* Animated Brain/Lab Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-4xl text-emerald-600">🔬</span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Generating Your Profile
        </h2>
        
        <div className="h-6 mb-8">
          <p className="text-slate-500 font-medium animate-bounce text-sm">
            {STEPS[currentStep]?.message}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
          {Math.round(progress)}% Complete
        </p>

        <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 max-w-xs">
          <p className="text-[11px] text-blue-700 leading-relaxed italic">
            "Based on your answers, we've identified a <b>specific hormonal pattern</b> in your evening routine."
          </p>
        </div>
      </div>
    </Page>
  )
}