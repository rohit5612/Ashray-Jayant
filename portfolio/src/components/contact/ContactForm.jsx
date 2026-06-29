import { useState } from 'react'
import contact from '../../data/contact'
import Button from '../shared/Button'

const inputClass =
  'w-full rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 transition-colors focus:border-accent-cyan/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/15'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const { form, formspreeEndpoint } = contact

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.target)

    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-accent-cyan/25 bg-accent-cyan/5 p-8 text-center">
        <p className="font-display text-xl text-text-primary">{form.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-accent-cyan hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-xs font-medium tracking-widest text-text-muted uppercase">
            {form.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-xs font-medium tracking-widest text-text-muted uppercase">
            {form.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-2 block text-xs font-medium tracking-widest text-text-muted uppercase">
          {form.subjectLabel}
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          required
          placeholder={form.subjectPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-xs font-medium tracking-widest text-text-muted uppercase">
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={form.messagePlaceholder}
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {form.errorMessage}
        </p>
      )}

      <Button type="submit" className="w-full md:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? form.sendingLabel : form.submitLabel}
      </Button>
    </form>
  )
}
