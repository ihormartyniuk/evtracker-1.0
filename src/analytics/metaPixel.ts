import { getFlag } from '../config/flags'
import type { AnalyticsEvent, AnalyticsPayload } from './events'

// Extend Window interface for fbq
declare global {
  interface Window {
    fbq?: (action: string, eventName: string, payload?: Record<string, unknown>) => void
  }
}

/**
 * Track analytics event
 * If window.fbq exists, calls it; otherwise no-op (with optional dev logging)
 */
export function track(eventName: AnalyticsEvent, payload?: AnalyticsPayload): void {
  // Log in dev if debug panel is enabled
  if (import.meta.env.DEV && getFlag('ENABLE_DEBUG_PANEL')) {
    console.log('[Analytics]', eventName, payload)
  }
  
  // Call Meta Pixel if available
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, payload || {})
  }
}

