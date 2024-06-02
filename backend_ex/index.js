const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const BASE_URL = 'http://api.nbp.pl/api/exchangerates';
app.use(cors()); 

app.get('/average_rate', async (req, res) => {
    const { date, currency } = req.query;

    if (!date || !currency) {
        return res.status(400).json({ error: 'Please provide both date and currency code' });
    }

    try {
        const response = await axios.get(`${BASE_URL}/rates/a/${currency}/${date}/`, {
            headers: { Accept: 'application/json' }
        });
        const rate = response.data.rates[0].mid;
        res.json({ date, currency, average_rate: rate });
    } catch (error) {
        res.status(404).json({ error: 'Data not found' });
    }
});

app.get('/min_max_average', async (req, res) => {
    const { currency, quotations } = req.query;

    if (!currency || !quotations || quotations > 255) {
        return res.status(400).json({ error: 'Please provide a valid currency code and number of quotations (<= 255)' });
    }

    try {
        const response = await axios.get(`${BASE_URL}/rates/a/${currency}/last/${quotations}/`, {
            headers: { Accept: 'application/json' }
        });
        const rates = response.data.rates.map(rate => rate.mid);
        res.json({ currency, max_average: Math.max(...rates), min_average: Math.min(...rates) });
    } catch (error) {
        res.status(404).json({ error: 'Data not found' });
    }
});

app.get('/major_difference', async (req, res) => {
    const { currency, quotations } = req.query;

    if (!currency || !quotations || quotations > 255) {
        return res.status(400).json({ error: 'Please provide a valid currency code and number of quotations (<= 255)' });
    }

    try {
        const response = await axios.get(`${BASE_URL}/rates/c/${currency}/last/${quotations}/`, {
            headers: { Accept: 'application/json' }
        });

        const differences = response.data.rates.map(rate => rate.ask - rate.bid);
        res.json({ currency, major_difference: Math.max(...differences) });
    } catch (error) {
        res.status(404).json({ error: 'Data not found' });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});