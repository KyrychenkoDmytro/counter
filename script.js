let stateCurrentValue;

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:8080/counts');
        // const response = await fetch('http://localhost:8080/counts?date=2024-02-26');  // forbidden get request
        const arr = await response.json();
        const { count, updatedAt } = arr[0];
        const countValue = document.getElementById('countValue');
        const lastUpdated = document.getElementById('lastUpdated');

        countValue.textContent = count;
        lastUpdated.textContent = new Date(updatedAt).toLocaleString();
        stateCurrentValue = count;

        updateButtonState();

        document.getElementById('increaseBtn').addEventListener('click', async function () {
            await updateCountOnServer('increase');
            changeNumber(stateCurrentValue);
            updateButtonState();
        });

        document.getElementById('decreaseBtn').addEventListener('click', decreaseButtonClick);
    } catch (error) {
        console.log(error)
    }
});

async function decreaseButtonClick() {
    await updateCountOnServer('decrease');
    changeNumber(stateCurrentValue);
    updateButtonState();
}

async function updateCountOnServer(action) {
    try {
        const response = await fetch(`http://localhost:8080/counts/${action}`, {
            method: 'PATCH',
        });
        const { count, updatedAt } = await response.json();

        const countValue = document.getElementById('countValue');
        const lastUpdated = document.getElementById('lastUpdated');

        stateCurrentValue = count;
        countValue.textContent = count;
        lastUpdated.textContent = new Date(updatedAt).toLocaleString();
    } catch (error) {
        console.log(error)
    }
}

function changeNumber(newNumber) {
    const numberElement = document.getElementById('countValue');
    numberElement.classList.add('increase');
    setTimeout(() => {
        numberElement.textContent = newNumber;
        numberElement.classList.remove('increase');
    }, 300);
}

function updateButtonState() {
    const decreaseBtn = document.getElementById('decreaseBtn');
    decreaseBtn.disabled = stateCurrentValue === 0;
    if (stateCurrentValue === 0) {
        decreaseBtn.removeEventListener('click', decreaseButtonClick);
    } else {
        decreaseBtn.addEventListener('click', decreaseButtonClick);
    }
}
