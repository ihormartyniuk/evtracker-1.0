import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ensureState, saveState, loadState } from '../../../shared/storage'
import type { ProfileType } from '../../../config/content/types'
import { quizQuestions } from '../../../config/content/en'
import { track } from '../../../analytics/metaPixel'
import { calcStage } from '../stage'
import Page from '../../../shared/ui/Page'

export default function Quiz() {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const isProcessingRef = useRef(false)
  
  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  
  useEffect(() => {
    const state = loadState()
    if (state) {
      track('StartQuiz', {
        userId: state.userId,
        stage: calcStage(state.firstVisitTs, Date.now()),
      })
    }
  }, [])
  
  const calculateAndSubmit = (finalAnswers: Record<string, string>) => {
    const counts: Record<string, number> = { stress: 0, habit: 0, tired: 0, late: 0 }
    Object.values(finalAnswers).forEach((value) => {
      if (value in counts) counts[value]++
    })
    
    let profile: ProfileType = 'habit'
    let maxCount = 0
    Object.entries(counts).forEach(([key, count]) => {
      if (count > maxCount) {
        maxCount = count
        profile = key as ProfileType
      }
    })
    
    const state = ensureState()
    const currentStage = calcStage(state.firstVisitTs, Date.now())
    state.profile = profile
    state.quizDone = true
    saveState(state)
    
    track('CompleteQuiz', {
      userId: state.userId,
      profileType: profile,
      stage: currentStage,
    })
    
    navigate('/loading')
  }
  
  const handleAnswerSelect = (value: string) => {
    if (isProcessingRef.current || !currentQuestion) return
    isProcessingRef.current = true
    
    const updatedAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(updatedAnswers)
    
    setTimeout(() => {
      if (isLastQuestion) {
        calculateAndSubmit(updatedAnswers)
      } else {
        setCurrentQuestionIndex((prev) => prev + 1)
      }
      isProcessingRef.current = false
    }, 400)
  }
  
  const handleBack = () => {
    if (!isFirstQuestion && !isProcessingRef.current) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  return (
    <Page>
      <div className="page-container flex flex-col min-h-[80vh]">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className={`text-slate-400 text-sm font-bold flex items-center gap-1 transition-opacity ${
                isFirstQuestion ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              ← BACK
            </button>
            <span className="text-xs font-black tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
              Step {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <div className="w-10"></div> {/* Spacer for symmetry */}
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Question Area */}
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight mb-8">
            {currentQuestion.text}
          </h1>
          
          <div className="space-y-4">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value
              return (
                <button
                  key={opt.value}
                  disabled={isProcessingRef.current}
                  onClick={() => handleAnswerSelect(opt.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                      : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md'
                  }`}
                >
                  <span className={`text-base font-bold transition-colors ${
                    isSelected ? 'text-emerald-900' : 'text-slate-700'
                  }`}>
                    {opt.label}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-500' 
                      : 'border-slate-200 bg-white'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Confidence Badge */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-4 h-[1px] bg-slate-200"></span>
            Private & Anonymous Analysis
            <span className="w-4 h-[1px] bg-slate-200"></span>
          </p>
        </div>
      </div>
    </Page>
  )
}