// ai.js

const express = require('express');
const axios = require('axios');

const aiRouter = express.Router();

aiRouter.post('/analyze', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003",
            prompt: `Evaluate the following request and rate its urgency on a scale from 1 to 5 where 5 is very urgent: "${text}"`,
            max_tokens: 50,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        });


        const urgencyScore = parseInt(response.data.choices[0].text.trim(), 10);
        console.log(urgencyScore)
        res.json({ urgencyScore: urgencyScore || 0 });

    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).send('Error analyzing text');
    }
});

module.exports = aiRouter; 
