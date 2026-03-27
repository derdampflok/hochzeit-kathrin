import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Card } from './Card'
import { CardContent } from './CardContent'
import './RsvpSection.scss'
import { submitRsvp } from '../services/rsvpService'
import CardHeader from './CardHeader'

type Attendance = 'ja' | 'nein'

type FormErrors = {
  guestCount?: string
  guestNames?: Record<number, string>
}

/**
 * RsvpSection: RSVP form card
 *
 * Handles guest registration with name, guest count, dietary restrictions,
 * and optional message. Uses Card wrapper with botanical minimalist styling.
 *
 * When attendance is "ja", shows multiple name fields for each guest.
 * Form validation, submission state, and error handling managed locally.
 * German text throughout.
 */
function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [hasDietaryRestrictions, setHasDietaryRestrictions] = useState(false)
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [guestCount, setGuestCount] = useState<number | null>(null)
  const [guestNames, setGuestNames] = useState<string[]>([])

  const submitErrorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (submitError && submitErrorRef) {
      submitErrorRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [submitError])

  const clearFieldError = (field: keyof FormErrors) => {
    setFormErrors((previousErrors) => {
      if (!previousErrors[field]) {
        return previousErrors
      }

      const nextErrors = { ...previousErrors }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const clearGuestNameError = (index: number) => {
    setFormErrors((previousErrors) => {
      if (!previousErrors.guestNames?.[index]) {
        return previousErrors
      }

      const nextGuestNames = { ...previousErrors.guestNames }
      delete nextGuestNames[index]

      if (Object.keys(nextGuestNames).length === 0) {
        const { guestNames, ...otherErrors } = previousErrors
        return otherErrors
      }

      return {
        ...previousErrors,
        guestNames: nextGuestNames,
      }
    })
  }

  const handleGuestCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim()
    if (!value) {
      setGuestCount(null)
      setGuestNames([])
      return
    }

    const parsed = Number.parseInt(value, 10)
    if (!Number.isNaN(parsed) && parsed > 0) {
      setGuestCount(parsed)
      setGuestNames(Array(parsed).fill(''))
      clearFieldError('guestCount')
    }
  }

  const handleGuestNameChange = (index: number, value: string) => {
    const nextNames = [...guestNames]
    nextNames[index] = value
    setGuestNames(nextNames)
    clearGuestNameError(index)
  }

  const handleAttendanceChange = (value: Attendance) => {
    setAttendance(value)
    if (value === 'nein') {
      setHasDietaryRestrictions(false)
      setGuestCount(null)
      setGuestNames([])
      setFormErrors({})
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!attendance) return

    const formElement = event.currentTarget
    const formData = new FormData(formElement)
    const nextErrors: FormErrors = {}

    let guestCountValue: number | undefined

    if (attendance === 'ja') {
      // Validate guest count
      const guestCountRaw = String(formData.get('guestCount') ?? '').trim()
      const parsed = Number.parseInt(guestCountRaw, 10)
      if (!guestCountRaw || Number.isNaN(parsed) || parsed < 1) {
        nextErrors.guestCount = 'Bitte gib eine gültige Anzahl an Personen ein.'
      } else {
        guestCountValue = parsed
      }

      // Validate all guest names
      const nameErrors: Record<number, string> = {}
      guestNames.forEach((name, index) => {
        if (!name.trim()) {
          nameErrors[index] = 'Bitte fülle diesen Namen aus.'
        }
      })

      if (Object.keys(nameErrors).length > 0) {
        nextErrors.guestNames = nameErrors
      }

      if (Object.keys(nextErrors).length > 0) {
        setFormErrors(nextErrors)
        return
      }
    }

    setFormErrors({})
    setSubmitError(false)

    const guestMessage = attendance === 'ja'
      ? String(formData.get('guestMessage') ?? '').trim()
      : ''
    const dietaryRestrictions = attendance === 'ja' && hasDietaryRestrictions
      ? String(formData.get('dietaryRestrictions') ?? '').trim()
      : ''

    setIsSubmitting(true)

    try {
      await submitRsvp({
        guestNames: attendance === 'ja' ? guestNames : [String(formData.get('guestName') ?? '').trim()],
        guestCount: guestCountValue,
        guestMessage,
        dietaryRestrictions,
        attendance,
      })

      setIsSubmitted(true)
    } catch (error) {
      setSubmitError(true)
      console.error('RSVP form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card
      className={`rsvp${isSubmitting ? ' rsvp--loading' : ''}`}
      aria-label="Antwortformular"
    >
      {isSubmitting && (
        <div className="rsvp__loading-overlay" role="status" aria-live="polite">
          <span className="rsvp__spinner" aria-hidden="true" />
        </div>
      )}

      <CardHeader
        title="Deine Rückmeldung"
        className="rsvp__header"
      />

      <CardContent className="rsvp__content">
        {isSubmitted ? (
          <section className="rsvp__thank-you" aria-label="Vielen Dank">
            <h2>Vielen Dank!</h2>
            <p className="rsvp__note">
              Deine Rückmeldung ist bei uns angekommen.
              {attendance === "ja" && "Wir freuen uns sehr, dich an unserem besonderen Tag dabei zu haben. ✨"}
            </p>
          </section>
        ) : (
          <>
            <p className="rsvp__note">
              Wir freuen uns auf deine Antwort bis zum 10.05.2026 und darauf,
              diesen besonderen Tag mit euch zu verbringen!
            </p>

            <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <fieldset
                className={`rsvp__attendance${attendance === null ? ' rsvp__attendance--pending' : ''}`}
              >
                <legend className="rsvp__attendance-legend">Bist du dabei?</legend>
                <div className="rsvp__attendance-options">
                  {(['ja', 'nein'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`rsvp__attendance-option${attendance === value ? ' rsvp__attendance-option--selected' : ''}`}
                      onClick={() => handleAttendanceChange(value)}
                      aria-pressed={attendance === value}
                    >
                      {value === 'ja' ? 'Ja' : 'Nein'}
                    </button>
                  ))}
                </div>
              </fieldset>

              {attendance !== null && attendance === 'nein' && (
                <>
                  <label htmlFor="guestName">Name</label>
                  <input
                    id="guestName"
                    name="guestName"
                    type="text"
                    autoComplete="name"
                    placeholder="Dein Name"
                    required
                  />
                </>
              )}

              {attendance === 'ja' && (
                <>
                  <label htmlFor="guestCount">Anzahl Personen</label>
                  <input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    min={1}
                    max={12}
                    placeholder="z. B. 2"
                    required
                    onChange={handleGuestCountChange}
                    aria-invalid={Boolean(formErrors.guestCount)}
                    aria-describedby={formErrors.guestCount ? 'guestCountError' : undefined}
                  />
                  {formErrors.guestCount && (
                    <p id="guestCountError" className="rsvp__form-error" role="alert">
                      {formErrors.guestCount}
                    </p>
                  )}

                  {guestCount !== null && guestCount > 0 && (
                    <fieldset className="rsvp__guest-names">
                      {guestNames.map((name, index) => (
                        <div key={index} className="rsvp__guest-name-field">
                          <label htmlFor={`guestName${index}`}>
                            Name Person {index + 1}
                          </label>
                          <input
                            id={`guestName${index}`}
                            type="text"
                            autoComplete={index === 0 ? 'name' : 'off'}
                            placeholder={`Name Person ${index + 1}`}
                            value={name}
                            onChange={(e) =>
                              handleGuestNameChange(index, e.currentTarget.value)
                            }
                            required
                            aria-invalid={Boolean(
                              formErrors.guestNames?.[index]
                            )}
                            aria-describedby={
                              formErrors.guestNames?.[index]
                                ? `guestNameError${index}`
                                : undefined
                            }
                          />
                          {formErrors.guestNames?.[index] && (
                            <p
                              id={`guestNameError${index}`}
                              className="rsvp__form-error"
                              role="alert"
                            >
                              {formErrors.guestNames[index]}
                            </p>
                          )}
                        </div>
                      ))}
                    </fieldset>
                  )}
                </>
              )}

              {attendance === 'ja' && (
                <>
                  <div className="rsvp__toggle-row">
                    <input
                      id="hasDietaryRestrictions"
                      type="checkbox"
                      checked={hasDietaryRestrictions}
                      onChange={(e) => setHasDietaryRestrictions(e.target.checked)}
                    />
                    <label htmlFor="hasDietaryRestrictions">
                      Mindestens eine Person hat Lebensmittelallergien oder Unverträglichkeiten
                    </label>
                  </div>

                  {hasDietaryRestrictions && (
                    <>
                      <label htmlFor="dietaryRestrictions">
                        Allergien und Unverträglichkeiten
                      </label>
                      <textarea
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        rows={3}
                        placeholder="z. B. Laktoseintoleranz, Nussallergie, Vegan"
                      />
                    </>
                  )}

                  <label htmlFor="guestMessage">Nachricht</label>
                  <textarea
                    id="guestMessage"
                    name="guestMessage"
                    rows={5}
                    placeholder="Möchtest du uns noch etwas mitteilen?"
                  />
                </>
              )}

              {attendance !== null && (
                <button type="submit" disabled={isSubmitting}>
                  Rückmeldung senden
                </button>
              )}

              {submitError && (
                <div className="rsvp__submit-error" role="alert" ref={submitErrorRef}>
                  <span className="rsvp__submit-error-icon" aria-hidden="true">
                    ⚠️
                  </span>
                  <div>
                    <strong>Deine Anmeldung wurde leider nicht übermittelt.</strong>
                    <p>
                      Bitte versuche es noch einmal. Falls das Problem weiterhin besteht,
                      melde dich direkt bei uns.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default RsvpSection