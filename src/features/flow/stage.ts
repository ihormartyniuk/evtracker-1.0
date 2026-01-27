export type Stage = "day0" | "day1" | "day2" | "day3" | "day4plus"

/**
 * Calculate stage based on first visit timestamp
 * <18h day0, <48h day1, <72h day2, <96h day3, else day4plus
 */
export function calcStage(firstVisitTs: number, nowTs: number): Stage {
  const diffMs = nowTs - firstVisitTs
  const diffHours = diffMs / (1000 * 60 * 60)
  
  if (diffHours < 18) return "day0"
  if (diffHours < 48) return "day1"
  if (diffHours < 72) return "day2"
  if (diffHours < 96) return "day3"
  return "day4plus"
}

