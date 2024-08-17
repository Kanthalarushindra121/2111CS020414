import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [response, setResponse] = useState(null);

    const fetchNumbers = async (numberId) => {
        try {
            const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
            setResponse(res.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <div>
            <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
            <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
            <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
            <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>

            {response && (
                <div>
                    <h3>Response:</h3>
                    <p><strong>Window Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
                    <p><strong>Window Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
                    <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>
                    <p><strong>Average:</strong> {response.avg}</p>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
