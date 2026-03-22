import { submitRsvp, type RsvpPayload } from './rsvpService'

// Mock fetch globally
globalThis.fetch = jest.fn() as jest.Mock

describe('rsvpService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('submitRsvp', () => {
        const mockPayload: RsvpPayload = {
            guestName: 'John Doe',
            guestCount: 2,
            guestMessage: 'Looking forward to it!',
            dietaryRestrictions: '',
        }

        it('should submit RSVP data with correct request format', async () => {
            const mockFetch = fetch as jest.MockedFunction<typeof fetch>
            mockFetch.mockResolvedValueOnce({
                ok: true,
            } as Response)

            await submitRsvp(mockPayload)

            expect(mockFetch).toHaveBeenCalledTimes(1)
            expect(mockFetch).toHaveBeenCalledWith(
                'https://example.com/api/rsvp',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mockPayload),
                }),
            )
        })

        it('should resolve successfully when response is ok', async () => {
            const mockFetch = fetch as jest.MockedFunction<typeof fetch>
            mockFetch.mockResolvedValueOnce({
                ok: true,
            } as Response)

            await expect(submitRsvp(mockPayload)).resolves.toBeUndefined()
        })

        it('should throw error when response status is not ok', async () => {
            const mockFetch = fetch as jest.MockedFunction<typeof fetch>
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
            } as Response)

            await expect(submitRsvp(mockPayload)).rejects.toThrow(
                'RSVP request failed with status 400',
            )
        })

        it('should throw error when response status is 500', async () => {
            const mockFetch = fetch as jest.MockedFunction<typeof fetch>
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
            } as Response)

            await expect(submitRsvp(mockPayload)).rejects.toThrow(
                'RSVP request failed with status 500',
            )
        })

        it('should throw error on network failure', async () => {
            const mockFetch = fetch as jest.MockedFunction<typeof fetch>
            const networkError = new Error('Network request failed')
            mockFetch.mockRejectedValueOnce(networkError)

            await expect(submitRsvp(mockPayload)).rejects.toThrow(
                'Network request failed',
            )
        })

        it('should handle empty message gracefully', async () => {
            const mockFetch = fetch as jest.MockedFunction<typeof fetch>
            mockFetch.mockResolvedValueOnce({
                ok: true,
            } as Response)

            const payloadWithEmptyMessage: RsvpPayload = {
                ...mockPayload,
                guestMessage: '',
            }

            await submitRsvp(payloadWithEmptyMessage)

            expect(mockFetch).toHaveBeenCalledWith(
                'https://example.com/api/rsvp',
                expect.objectContaining({
                    body: JSON.stringify(payloadWithEmptyMessage),
                }),
            )
        })
    })
})
