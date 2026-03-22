import { render, screen, waitFor } from '../test/render'
import userEvent from '@testing-library/user-event'
import RsvpSection from './RsvpSection'
import * as rsvpService from '../services/rsvpService'

// Mock the RSVP service
jest.mock('../services/rsvpService')

describe('RsvpSection', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    const getFormInputs = () => ({
        nameInput: screen.getByLabelText('Name'),
        countInput: screen.getByLabelText('Anzahl Personen'),
        messageInput: screen.getByLabelText('Nachricht'),
        submitButton: screen.getByRole('button', { name: /Rückmeldung senden/i }),
    })

    describe('initial render', () => {
        it('should render form in initial state', () => {
            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            expect(nameInput).toBeInTheDocument()
            expect(countInput).toBeInTheDocument()
            expect(submitButton).toBeInTheDocument()
        })

        it('should not show any errors initially', () => {
            render(<RsvpSection />)

            // No error messages should be visible
            const alerts = screen.queryAllByRole('alert')
            expect(alerts).toHaveLength(0)
        })
    })

    describe('validation logic', () => {
        it('should reject submission with empty name', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            const { countInput, submitButton } = getFormInputs()

            await user.type(countInput, '2')
            await user.click(submitButton)

            // Validation should show an error
            const errors = screen.getAllByRole('alert')
            expect(errors.length).toBeGreaterThan(0)

            // Service should not be called
            expect(rsvpService.submitRsvp).not.toHaveBeenCalled()
        })

        it('should reject submission with empty guest count', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            const { nameInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'John Doe')
            await user.click(submitButton)

            // Validation should show an error
            const errors = screen.getAllByRole('alert')
            expect(errors.length).toBeGreaterThan(0)

            // Service should not be called
            expect(rsvpService.submitRsvp).not.toHaveBeenCalled()
        })

        it('should reject zero or negative guest count', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'John Doe')
            await user.type(countInput, '0')
            await user.click(submitButton)

            // Validation should fail
            const errors = screen.getAllByRole('alert')
            expect(errors.length).toBeGreaterThan(0)

            // Service should not be called
            expect(rsvpService.submitRsvp).not.toHaveBeenCalled()
        })

        it('should show multiple errors when multiple fields are invalid', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            const { submitButton } = getFormInputs()
            await user.click(submitButton)

            // Both fields are invalid
            const errors = screen.getAllByRole('alert')
            expect(errors.length).toBeGreaterThanOrEqual(2)
        })

        it('should clear validation errors when field is corrected', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            const { nameInput, submitButton } = getFormInputs()

            // Show validation error
            await user.click(submitButton)
            expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)

            // Correct the field
            await user.type(nameInput, 'John')

            // Error should clear
            const alertBefore = screen.getAllByRole('alert')
            expect(alertBefore.length).toBeLessThan(2) // Some errors remain (count), not name
        })
    })

    describe('submission and state management', () => {
        it('should call submitRsvp with parsed data on valid submission', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Jane Smith')
            await user.type(countInput, '3')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({
                        guestName: 'Jane Smith',
                        guestCount: 3,
                    }),
                )
            })
        })

        it('should trim whitespace from inputs during submission', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, '   Alice   ')
            await user.type(countInput, '1')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({
                        guestName: 'Alice',
                    }),
                )
            })
        })

        it('should include optional message in submission', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, messageInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Bob')
            await user.type(countInput, '2')
            await user.type(messageInput, 'Excited to attend!')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({
                        guestMessage: 'Excited to attend!',
                    }),
                )
            })
        })

        it('should change UI state to submitted after successful submission', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp).mockResolvedValueOnce(undefined)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Charlie')
            await user.type(countInput, '4')
            await user.click(submitButton)

            await waitFor(() => {
                // Form inputs should disappear
                expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
            })
        })

        it('should disable submit button during submission', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(
                () => new Promise(resolve => setTimeout(resolve, 100)),
            )

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'David')
            await user.type(countInput, '1')
            await user.click(submitButton)

            expect(submitButton).toBeDisabled()

            await waitFor(() => {
                // Eventually completes
                expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
            })
        })
    })

    describe('error handling', () => {
        it('should show error banner when submission fails', async () => {
            const user = userEvent.setup()
            const error = new Error('API error')
            jest.mocked(rsvpService.submitRsvp).mockRejectedValueOnce(error)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Eve')
            await user.type(countInput, '2')
            await user.click(submitButton)

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeVisible()
            })
        })

        it('should keep form visible after submission error', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp).mockRejectedValueOnce(new Error('API error'))

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Frank')
            await user.type(countInput, '3')
            await user.click(submitButton)

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeVisible()
            })

            // Form should still be visible
            expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        })

        it('should re-enable submit button after error', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp).mockRejectedValueOnce(new Error('API error'))

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Grace')
            await user.type(countInput, '1')
            await user.click(submitButton)

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeVisible()
            })

            // Button should be re-enabled
            expect(submitButton).not.toBeDisabled()
        })

        it('should not show error banner initially', () => {
            render(<RsvpSection />)

            // Error banner should not be present on initial render
            const alerts = screen.queryAllByRole('alert')
            expect(alerts).toHaveLength(0)
        })

        it('should clear error state when attempting new submission after error', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp)
                .mockRejectedValueOnce(new Error('API error'))
                .mockResolvedValueOnce(undefined)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            // First submission fails
            await user.type(nameInput, 'Henry')
            await user.type(countInput, '2')
            await user.click(submitButton)

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeVisible()
            })

            // Clear inputs and retry
            await user.clear(nameInput)
            await user.clear(countInput)
            await user.type(nameInput, 'Henry Updated')
            await user.type(countInput, '3')
            await user.click(submitButton)

            // Error should be cleared and form should show success
            await waitFor(() => {
                expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
            })
        })

        it('should clear error state after successful submission following a previous error', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp)
                .mockRejectedValueOnce(new Error('API error'))
                .mockResolvedValueOnce(undefined)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            // First submission fails
            await user.type(nameInput, 'Ivy')
            await user.type(countInput, '1')
            await user.click(submitButton)

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeVisible()
            })

            // Second submission succeeds
            await user.clear(nameInput)
            await user.clear(countInput)
            await user.type(nameInput, 'Ivy')
            await user.type(countInput, '1')
            await user.click(submitButton)

            // After success, error banner should disappear and thank you message should appear
            await waitFor(() => {
                expect(screen.queryByRole('alert')).not.toBeInTheDocument()
                expect(screen.getByText(/Vielen Dank/i)).toBeInTheDocument()
            })
        })

        it('should display error banner again when retry fails', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp)
                .mockRejectedValueOnce(new Error('First error'))
                .mockRejectedValueOnce(new Error('Second error'))

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            // First submission fails
            await user.type(nameInput, 'Jack')
            await user.type(countInput, '1')
            await user.click(submitButton)

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeVisible()
            })

            // Clear and retry, but fail again
            await user.clear(nameInput)
            await user.clear(countInput)
            await user.type(nameInput, 'Jack')
            await user.type(countInput, '2')
            await user.click(submitButton)

            // Error banner should still be visible after second failure
            await waitFor(() => {
                const alert = screen.getByRole('alert')
                expect(alert).toBeVisible()
            })

            // Form should still be usable
            expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        })
    })

    describe('loading state', () => {
        it('should show loading indicator during submission', async () => {
            const user = userEvent.setup()
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(
                () => new Promise(resolve => setTimeout(resolve, 200)),
            )

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()

            await user.type(nameInput, 'Henry')
            await user.type(countInput, '2')
            await user.click(submitButton)

            const loadingOverlay = screen.getByRole('status')
            expect(loadingOverlay).toBeInTheDocument()

            await waitFor(() => {
                expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
            })
        })
    })

    describe('dietary restrictions toggle', () => {
        const getDietaryToggle = () =>
            screen.getByRole('checkbox', { name: /Lebensmittelallergien/i })

        const getDietaryInput = () =>
            screen.getByLabelText(/Allergien und Unvertr\u00e4glichkeiten/i)

        it('should not show dietary restrictions input by default', () => {
            render(<RsvpSection />)

            expect(getDietaryToggle()).not.toBeChecked()
            expect(screen.queryByLabelText(/Allergien und Unvertr\u00e4glichkeiten/i)).not.toBeInTheDocument()
        })

        it('should show dietary restrictions input when toggle is enabled', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            await user.click(getDietaryToggle())

            expect(getDietaryInput()).toBeInTheDocument()
        })

        it('should hide dietary restrictions input when toggle is disabled again', async () => {
            const user = userEvent.setup()
            render(<RsvpSection />)

            await user.click(getDietaryToggle()) // enable
            await user.click(getDietaryToggle()) // disable

            expect(screen.queryByLabelText(/Allergien und Unvertr\u00e4glichkeiten/i)).not.toBeInTheDocument()
        })

        it('should submit empty string for dietaryRestrictions when toggle is off', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()
            await user.type(nameInput, 'Jane')
            await user.type(countInput, '2')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({ dietaryRestrictions: '' }),
                )
            })
        })

        it('should submit dietary restriction text when toggle is on and text is provided', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()
            await user.click(getDietaryToggle())
            await user.type(getDietaryInput(), 'Laktoseintoleranz')
            await user.type(nameInput, 'Jane')
            await user.type(countInput, '2')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({ dietaryRestrictions: 'Laktoseintoleranz' }),
                )
            })
        })

        it('should submit empty string when toggle is on but text input is empty', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()
            await user.click(getDietaryToggle())
            // Leave dietary input empty
            await user.type(nameInput, 'Jane')
            await user.type(countInput, '2')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({ dietaryRestrictions: '' }),
                )
            })
        })

        it('should submit empty string when toggle is disabled after entering text', async () => {
            const user = userEvent.setup()
            const mockSubmitRsvp = jest.fn().mockResolvedValueOnce(undefined)
            jest.mocked(rsvpService.submitRsvp).mockImplementationOnce(mockSubmitRsvp)

            render(<RsvpSection />)

            const { nameInput, countInput, submitButton } = getFormInputs()
            const toggle = getDietaryToggle()

            await user.click(toggle) // enable
            await user.type(getDietaryInput(), 'Nussallergie')
            await user.click(toggle) // disable — input unmounts, value discarded

            await user.type(nameInput, 'Jane')
            await user.type(countInput, '2')
            await user.click(submitButton)

            await waitFor(() => {
                expect(mockSubmitRsvp).toHaveBeenCalledWith(
                    expect.objectContaining({ dietaryRestrictions: '' }),
                )
            })
        })
    })
})
