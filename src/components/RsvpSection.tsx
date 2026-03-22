import { useState, type ChangeEvent, type FormEvent } from 'react'
import './RsvpSection.scss'
import { submitRsvp } from '../services/rsvpService'

type FormErrors = {
    guestName?: string
    guestCount?: string
}

function RsvpSection() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [hasDietaryRestrictions, setHasDietaryRestrictions] = useState(false)

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

    const handleGuestNameChange = (_event: ChangeEvent<HTMLInputElement>) => {
        clearFieldError('guestName')
    }

    const handleGuestCountChange = (_event: ChangeEvent<HTMLInputElement>) => {
        clearFieldError('guestCount')
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formElement = event.currentTarget
        const formData = new FormData(formElement)
        const guestName = String(formData.get('guestName') ?? '').trim()
        const guestCountRaw = String(formData.get('guestCount') ?? '').trim()
        const nextErrors: FormErrors = {}

        if (!guestName) {
            nextErrors.guestName = 'Bitte gib deinen Namen ein.'
        }

        const guestCount = Number.parseInt(guestCountRaw, 10)
        if (!guestCountRaw || Number.isNaN(guestCount) || guestCount < 1) {
            nextErrors.guestCount = 'Bitte gib eine gültige Anzahl an Personen ein.'
        }

        if (Object.keys(nextErrors).length > 0) {
            setFormErrors(nextErrors)
            return
        }

        setFormErrors({})
        setSubmitError(false)
        const guestMessage = String(formData.get('guestMessage') ?? '').trim()
        const dietaryRestrictions = hasDietaryRestrictions
            ? String(formData.get('dietaryRestrictions') ?? '').trim()
            : ''

        setIsSubmitting(true)

        try {
            await submitRsvp({
                guestName,
                guestCount,
                guestMessage,
                dietaryRestrictions,
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
        <section
            className={`rsvp-card${isSubmitting ? ' is-loading' : ''}`}
            aria-label="Antwortformular"
        >
            {isSubmitting && (
                <div className="rsvp-loading-overlay" role="status" aria-live="polite">
                    <span className="rsvp-spinner" aria-hidden="true" />
                </div>
            )}

            <div className="rsvp-content">
                {isSubmitted ? (
                    <section className="rsvp-thank-you" aria-label="Vielen Dank">
                        <h2>Vielen Dank!</h2>
                        <p className="card-note">
                            Deine Rückmeldung ist bei uns angekommen. Wir freuen uns sehr,
                            dich an unserem besonderen Tag dabei zu haben. ✨
                        </p>
                    </section>
                ) : (
                    <>
                        <h2>Deine Rückmeldung</h2>
                        <p className="card-note">
                            Wir freuen uns auf deine Antwort und darauf, diesen besonderen Tag
                            gemeinsam zu erleben. 🦢
                        </p>

                        <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
                            <label htmlFor="guestName">Name</label>
                            <input
                                id="guestName"
                                name="guestName"
                                type="text"
                                autoComplete="name"
                                placeholder="Dein Name"
                                required
                                onChange={handleGuestNameChange}
                                aria-invalid={Boolean(formErrors.guestName)}
                                aria-describedby={formErrors.guestName ? 'guestNameError' : undefined}
                            />
                            {formErrors.guestName && (
                                <p id="guestNameError" className="form-error" role="alert">
                                    {formErrors.guestName}
                                </p>
                            )}

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
                                <p id="guestCountError" className="form-error" role="alert">
                                    {formErrors.guestCount}
                                </p>
                            )}

                            <div className="rsvp-toggle-row">
                                <input
                                    id="hasDietaryRestrictions"
                                    type="checkbox"
                                    checked={hasDietaryRestrictions}
                                    onChange={(e) => setHasDietaryRestrictions(e.target.checked)}
                                />
                                <label htmlFor="hasDietaryRestrictions">
                                    Ich habe Lebensmittelallergien oder Unverträglichkeiten
                                </label>
                            </div>

                            {hasDietaryRestrictions && (
                                <>
                                    <label htmlFor="dietaryRestrictions">Allergien und Unverträglichkeiten</label>
                                    <textarea
                                        id="dietaryRestrictions"
                                        name="dietaryRestrictions"
                                        rows={3}
                                        placeholder="z. B. Laktoseintoleranz, Nussallergie"
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

                            <button type="submit" disabled={isSubmitting}>
                                Rückmeldung senden
                            </button>

                            {submitError && (
                                <div className="rsvp-submit-error" role="alert">
                                    <span className="rsvp-submit-error-icon" aria-hidden="true">⚠️</span>
                                    <div>
                                        <strong>Deine Anmeldung wurde leider nicht übermittelt.</strong>
                                        <p>Bitte versuche es noch einmal. Falls das Problem weiterhin besteht, melde dich direkt bei uns.</p>
                                    </div>
                                </div>
                            )}
                        </form>
                    </>
                )}
            </div>
        </section>
    )
}

export default RsvpSection