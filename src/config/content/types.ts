export type ProfileType = "stress" | "habit" | "tired" | "late"

export interface QuizOption {
  value: string
  label: string
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
}

export interface ProfileCopy {
  title: string
  subtitle: string
  explanation: string[]
}

export interface PlanStep {
  title: string
  body: string
}

export interface PlanData {
  title: string
  steps: PlanStep[]
}

export type PlanByProfile = Record<ProfileType, PlanData>

export type TipsList = string[]

export interface OfferCopy {
  title: string
  description: string
  features: string[]
  ctaLabel: string
}

export interface OffersCopy {
  soft: OfferCopy
  main: OfferCopy
}

export interface AppCopy {
  landing: {
    headline: string
    subheadline: string
    ctaLabel: string
  }
}

