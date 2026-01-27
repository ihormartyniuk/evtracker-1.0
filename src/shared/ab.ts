import { loadState } from './storage'

const AB_STORAGE_PREFIX = 'ab_'

/**
 * Get A/B test variant for a test
 * Persists chosen variant in localStorage
 * Deterministic per userId if available, otherwise random
 */
export function getVariant(testName: string, variants: string[]): string {
  const storageKey = `${AB_STORAGE_PREFIX}${testName}`
  
  // Check if variant already chosen
  const existing = localStorage.getItem(storageKey)
  if (existing && variants.includes(existing)) {
    return existing
  }
  
  // Choose variant deterministically based on userId if available
  const state = loadState()
  let seed: number
  
  if (state?.userId) {
    // Use userId as seed for deterministic assignment
    const hash = state.userId.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0)
    }, 0)
    seed = Math.abs(hash)
  } else {
    // Random assignment
    seed = Math.floor(Math.random() * 1000000)
  }
  
  // Select variant based on seed
  const variant = variants[seed % variants.length]
  
  // Persist choice
  localStorage.setItem(storageKey, variant)
  
  return variant
}

/**
 * Reset all A/B test variants (for debug)
 */
export function resetVariants(): void {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(AB_STORAGE_PREFIX)) {
      keys.push(key)
    }
  }
  keys.forEach(key => localStorage.removeItem(key))
}

