import type { ProfileType } from '../config/content/types'
import type { Stage } from '../features/flow/stage'

export type AnalyticsEvent =
  | 'ViewContent'
  | 'StartQuiz'
  | 'CompleteQuiz'
  | 'ViewPlan'
  | 'Lead'
  | 'DailyCheckin'
  | 'ViewOffer'
  | 'InitiateCheckout'
  | 'OrderSubmit'
  | 'InstallPromptShown'
  | 'TrackerCheckin'

export interface AnalyticsPayload {
  userId?: string
  profileType?: ProfileType
  stage?: Stage
  variant?: string
  value?: number
  currency?: string
  country?: string
  [key: string]: unknown
}

