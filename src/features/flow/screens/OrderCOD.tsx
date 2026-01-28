import { useState } from 'react'
import { ensureState, saveState } from '../../../shared/storage'
import { track } from '../../../analytics/metaPixel'
import { calcStage } from '../stage'
import Page from '../../../shared/ui/Page'

export default function OrderCOD() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    comment: '',
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const state = ensureState()
    const currentStage = calcStage(state.firstVisitTs, Date.now())
    
    // Save order submitted flag and country
    state.orderSubmitted = true
    if (formData.country) {
      state.country = formData.country
    }
    saveState(state)
    
    // Track order submission
    track('OrderSubmit', {
      userId: state.userId,
      profileType: state.profile,
      stage: currentStage,
      country: formData.country,
      currency: 'USD', // Default, can be made dynamic
    })
    
    setSubmitted(true)
  }
  
  if (submitted) {
    return (
      <Page>
        <h1 className="text-2xl font-semibold">Thank You!</h1>
        <p className="text-base">Your order has been received. Our partner will call you soon to confirm delivery details.</p>
      </Page>
    )
  }
  
  return (
    <Page>
      <h1 className="text-2xl font-semibold">Order with Cash on Delivery</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Comment (optional)</span>
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit Order
        </button>
      </form>
    </Page>
  )
}
