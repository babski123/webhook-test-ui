export async function getWorkers() {
    const response = await fetch(`https://myp-tools.mayly.x10host.com/workers`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to retrieve workers');
    }
}