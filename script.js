let stateCurrentValue;

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('http://localhost:8080/counts');
    const arr = await response.json();
    const { count, updatedAt } = arr[0];
    const countValue = document.getElementById('countValue');
    const lastUpdated = document.getElementById('lastUpdated');

    countValue.textContent = count;
    lastUpdated.textContent = new Date(updatedAt).toLocaleString();
    stateCurrentValue = count;

    document.getElementById('increaseBtn').addEventListener('click', async function () {
        await updateCount('increase');
    });

    document.getElementById('decreaseBtn').addEventListener('click', async function () {
        await updateCount('decrease');
    });
});

async function updateCount(action) {
    if (action === 'increase') {
        stateCurrentValue++;
    } else if (action === 'decrease') {
        if (stateCurrentValue === 0) {
            alert('Cannot decrease count below 0');
            return;
        }
        stateCurrentValue--;
    }
    const newDate = new Date();

    const updateResponse = await fetch('http://localhost:8080/counts', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: '1q2w3e', count: stateCurrentValue, updatedAt: newDate })
    });

    const { count, updatedAt } = await updateResponse.json();

    const countValue = document.getElementById('countValue');
    const lastUpdated = document.getElementById('lastUpdated');

    countValue.textContent = count;
    lastUpdated.textContent = new Date(updatedAt).toLocaleString();
}