const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Agrega esta línea

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors()); // Agrega esta línea para habilitar CORS
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/weather', async (req, res) => {
    try {
      const { ciudad, apiKey } = req.query;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  