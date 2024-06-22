// script.js

function getRandomAdviceId() {
    return Math.floor(Math.random() * 224) + 1; // assuming there are 224 advices
}

async function getAdvice() {
    let adviceId = localStorage.getItem('adviceId');
    if (!adviceId) {
        adviceId = getRandomAdviceId();
        localStorage.setItem('adviceId', adviceId);
    } else {
        adviceId = parseInt(adviceId, 10) + 1;
        if (adviceId > 224) { // reset hoga jab limit exceed krega
            adviceId = 1;
        }
        localStorage.setItem('adviceId', adviceId);
    }

    try {
        const response = await fetch(`https://api.adviceslip.com/advice/${adviceId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('advice-header').textContent = `Advice #${adviceId}`;
        document.getElementById('advice').textContent = `"${data.slip.advice}"`;
    } catch (error) {
        console.error('Error fetching advice:', error);
        document.getElementById('advice-header').textContent = 'Advice';
        document.getElementById('advice').textContent = 'Failed to fetch advice. Please try again later.';
    }
}
