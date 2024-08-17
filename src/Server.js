const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numbersWindow = [];

async function fetchNumbers(numberId) {
    const url = `http://third-party-api.com/numbers/${numberId}`;
    try {
        const response = await axios.get(url, { timeout: 500 });  // 500ms timeout
        return response.data.numbers || [];
    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        return [];
    }
}

function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    const windowPrevState = [...numbersWindow];

    // Fetch numbers from third-party API
    const fetchedNumbers = await fetchNumbers(numberId);

    // Add unique numbers to the window
    fetchedNumbers.forEach((number) => {
        if (!numbersWindow.includes(number)) {
            if (numbersWindow.length >= WINDOW_SIZE) {
                numbersWindow.shift();  // Remove the oldest number
            }
            numbersWindow.push(number);
        }
    });

    const windowCurrState = [...numbersWindow];
    const avg = calculateAverage(numbersWindow);

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: fetchedNumbers,
        avg: parseFloat(avg.toFixed(2)),
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
