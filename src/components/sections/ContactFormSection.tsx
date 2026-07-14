'use client'

import React from 'react'
import ContactForm from '@/components/ContactForm'
import type { Section } from '../PageRenderer'

interface ContactFormSectionProps {
  data: Section
}

export function ContactFormSection({ data }: ContactFormSectionProps) {
  const { contactFormContent } = data as any
  
  if (!contactFormContent) return null

  const { title, subtitle, description, fields, submitButtonText, successMessage, recipientEmail } = contactFormContent

  // Map Sanity fields to ContactForm props if needed
  const formConfig = {
    title,
    subtitle,
    description,
    submitButtonText: submitButtonText || 'Send Message',
    successMessage: successMessage || 'Thank you! Your message has been sent.',
  }

  return (
    <div className="contact-form-section" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      {(title || subtitle || description) && (
        <div className="form-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {title && <h2>{title}</h2>}
          {subtitle && <h3 style={{ fontWeight: 'normal' }}>{subtitle}</h3>}
          {description && <p style={{ color: '#666' }}>{description}</p>}
        </div>
      )}
      
      {/* Use existing ContactForm component */}
      <ContactForm />
    </div>
  )
}
