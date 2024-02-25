export async function subscriber() {
    const response = await fetch(`https://myp-tools.mayly.x10host.com/subscriber`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to run subscriber');
    }
}