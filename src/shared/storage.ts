import type { ProfileType } from '../config/content/types'
import { v4 as uuidv4 } from "uuid";

export interface FlowState {
  userId: string
  firstVisitTs: number
  lastSeenTs: number
  profile?: ProfileType
  quizDone?: boolean
  leadDone?: boolean
  offerViewed?: boolean
  orderSubmitted?: boolean
  streak: number
  lastCheckinDate?: string // YYYY-MM-DD
  country?: string
  leadChannel?: 'email' | 'whatsapp' | 'telegram'
}

const KEY = "evening_flow_v1"

/**
 * Load state from localStorage
 */
export function loadState(): FlowState | null {
  try {
    const stored = localStorage.getItem(KEY)
    if (!stored) return null
    return JSON.parse(stored) as FlowState
  } catch {
    return null
  }
}

/**
 * Save state to localStorage
 */
export function saveState(state: FlowState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (error) {
    console.error("Failed to save state:", error)
  }
}

/**
 * Ensure state exists, creating new one if missing, and update lastSeenTs
 */
export function ensureState(): FlowState {
  const existing = loadState()
  const now = Date.now()
  
  if (existing) {
    existing.lastSeenTs = now
    saveState(existing)
    return existing
  }
  
  // Create new state
  const newState: FlowState = {
    userId: uuidv4(),
    firstVisitTs: now,
    lastSeenTs: now,
    streak: 0,
  }
  
  saveState(newState)
  return newState
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function todayISO(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

