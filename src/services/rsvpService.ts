const apiUrl: string = "https://api.web3forms.com/submit"
const apiPublicKey: string = "093412d4-c1c3-4766-b571-04193fe10876"

export type RsvpForm = {
    guestNames: string[]
    guestCount?: number
    guestMessage: string
    dietaryRestrictions: string
    attendance: 'ja' | 'nein'
}

export async function submitRsvp(form: RsvpForm): Promise<void> {

    const payload = {
        "Gast/Gäste": form.guestNames.join(", "),
        "Nimmt Teil": form.attendance,
        "Essenseinschränkungen": form.dietaryRestrictions,
        "Nachricht": form.guestMessage,
        subject: "Anmeldung von " + form.guestNames[0],
        access_key: apiPublicKey
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