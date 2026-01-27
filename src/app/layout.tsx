import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { getFlag } from '../config/flags'
import { loadState } from '../shared/storage'
import { resetVariants } from '../shared/ab'
import { calcStage } from '../features/flow/stage'
import Header from '../shared/ui/Header'
import Footer from '../shared/ui/Footer'

/**
 * Layout component that detects standalone PWA mode and redirects "/" to "/tracker"
 * Includes debug panel if enabled
 */
export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [debugOpen, setDebugOpen] = useState(false)
  const showDebug = getFlag('ENABLE_DEBUG_PANEL')
  
  useEffect(() => {
    // Only redirect if tracker mode is enabled
    if (!getFlag('ENABLE_TRACKER_MODE')) return
    
    // Detect standalone mode
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    
    // If standalone and on root path, redirect to tracker
    if (isStandalone && location.pathname === '/') {
      navigate('/tracker', { replace: true })
    }
  }, [navigate, location.pathname])
  
  const state = loadState()
  const stage = state ? calcStage(state.firstVisitTs, Date.now()) : null
  
  // Get AB variants
  const getABVariants = () => {
    const variants: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('ab_')) {
        variants[key.replace('ab_', '')] = localStorage.getItem(key) || ''
      }
    }
    return variants
  }
  
  const handleResetState = () => {
    if (confirm('Reset all local state?')) {
      localStorage.removeItem('evening_flow_v1')
      window.location.reload()
    }
  }
  
  const handleResetAB = () => {
    if (confirm('Reset all A/B test variants?')) {
      resetVariants()
      window.location.reload()
    }
  }
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {showDebug && (
        <div className="fixed bottom-4 right-4 bg-base-100 border border-base-300 rounded-lg p-3 text-xs max-w-xs shadow-lg z-50">
          <div className="flex justify-between items-center mb-2">
            <strong>Debug Panel</strong>
            <button
              onClick={() => setDebugOpen(!debugOpen)}
              className="btn btn-sm btn-ghost"
            >
              {debugOpen ? '−' : '+'}
            </button>
          </div>
          {debugOpen && (
            <div className="space-y-2">
              <div><strong>User ID:</strong> {state?.userId || 'N/A'}</div>
              <div><strong>Stage:</strong> {stage || 'N/A'}</div>
              <div><strong>Profile:</strong> {state?.profile || 'N/A'}</div>
              <div><strong>Streak:</strong> {state?.streak || 0}</div>
              <div className="mt-2">
                <strong>AB Variants:</strong>
                <pre className="text-[10px] mt-1">
                  {JSON.stringify(getABVariants(), null, 2)}
                </pre>
              </div>
              <div className="mt-2">
                <strong>Flags:</strong>
                <div className="text-[10px] mt-1">
                  {Object.keys({
                    ENABLE_INSTALL_SCREEN: getFlag('ENABLE_INSTALL_SCREEN'),
                    ENABLE_SOFT_OFFER_DAY0: getFlag('ENABLE_SOFT_OFFER_DAY0'),
                    ENABLE_MAIN_OFFER: getFlag('ENABLE_MAIN_OFFER'),
                    ENABLE_TRACKER_MODE: getFlag('ENABLE_TRACKER_MODE'),
                    ENABLE_LEAD_CAPTURE: getFlag('ENABLE_LEAD_CAPTURE'),
                    ENABLE_ORDER_COD: getFlag('ENABLE_ORDER_COD'),
                  }).map(flag => (
                    <div key={flag}>
                      {flag}: {getFlag(flag as any) ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex gap-1">
                <button
                  onClick={handleResetState}
                  className="btn btn-xs btn-ghost"
                >
                  Reset State
                </button>
                <button
                  onClick={handleResetAB}
                  className="btn btn-xs btn-ghost"
                >
                  Reset AB
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
