const apiUrl: string = import.meta.env.VITE_API_URL;
const apiKey: string = import.meta.env.VITE_API_PUBLICKEY;

export type RsvpForm = {
    guestNames: string[]
    guestCount?: number
    guestMessage: string
    dietaryRestrictions: string
    attendance: 'ja' | 'nein'
}

export async function submitRsvp(form: RsvpForm): Promise<void> {

    const payload = {
        ...form,
        subject: "Anmeldung von " + form.guestNames[0],
        access_key: apiKey
    }

    const response = await fetch(apiUrl, {
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