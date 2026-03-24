const apiUrl: string = import.meta.env.VITE_API_URL;
const apiKey: string = import.meta.env.VITE_API_PUBLICKEY;

export type RsvpForm = {
    guestName: string
    guestCount: number
    guestMessage: string
    dietaryRestrictions: string
}

export async function submitRsvp(form: RsvpForm): Promise<void> {

    const payload = {
        ...form,
        subject: "Anmeldung von " + form.guestName,
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