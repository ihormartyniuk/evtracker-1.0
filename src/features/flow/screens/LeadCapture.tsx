import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ensureState, saveState } from '../../../shared/storage'
import { track } from '../../../analytics/metaPixel'
import { calcStage } from '../stage'
import Page from '../../../shared/ui/Page'

export default function LeadCapture() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const state = ensureState()
    const currentStage = calcStage(state.firstVisitTs, Date.now())
    
    // Determine lead channel
    let leadChannel: 'email' | 'whatsapp' | 'telegram' | undefined
    if (email) leadChannel = 'email'
    else if (contact.toLowerCase().includes('whatsapp') || contact.includes('+')) {
      leadChannel = 'whatsapp'
    } else if (contact.toLowerCase().includes('telegram') || contact.includes('@')) {
      leadChannel = 'telegram'
    }
    
    // Save leadDone flag and channel (we don't store raw contact info)
    state.leadDone = true
    if (leadChannel) {
      state.leadChannel = leadChannel
    }
    saveState(state)
    
    // Track lead
    track('Lead', {
      userId: state.userId,
      profileType: state.profile,
      stage: currentStage,
      country: state.country,
    })
    
    navigate('/checkin')
  }
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">Get Tomorrow's Step</h1>
      <p className="text-base">Enter your details to receive personalized tips.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">WhatsApp/Telegram (optional)</span>
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="@username or +1234567890"
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Continue
        </button>
      </form>
    </Page>
  )
}
