const RSVP_API_URL = 'https://example.com/api/rsvp'

export type RsvpPayload = {
    guestName: string
    guestCount: number
    guestMessage: string
    dietaryRestrictions: string
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
    const response = await fetch(RSVP_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error(`RSVP request failed with status ${response.status}`)
    }
}