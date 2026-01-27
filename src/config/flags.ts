/**
 * Feature flags configuration
 * Runtime overrides via querystring: ?ff_FLAG_NAME=1 (dev only)
 */

export const FLAGS = {
  ENABLE_INSTALL_SCREEN: true,
  ENABLE_SOFT_OFFER_DAY0: true,
  ENABLE_MAIN_OFFER: true,
  ENABLE_TRACKER_MODE: true,
  ENABLE_LEAD_CAPTURE: true,
  ENABLE_ORDER_COD: true,
  ENABLE_DEBUG_PANEL: false, // Set to true for development
} as const

export type FlagName = keyof typeof FLAGS

/**
 * Get flag value with runtime override support (dev only)
 */
export function getFlag(name: FlagName): boolean {
  // Check for querystring override (dev only)
  if (import.meta.env.DEV) {
    const params = new URLSearchParams(window.location.search)
    const override = params.get(`ff_${name}`)
    if (override !== null) {
      return override === '1' || override === 'true'
    }
  }
  
  return FLAGS[name]
}

