const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/stream/:id', async (req, res) => {
  const eventoID = req.params.id;

  try {
    const response = await axios.get(`https://streamtp4.com/global1.php?stream=${eventoID}`);
    const html = response.data;

    const regex = /(https?:\/\/[^'"]+\.m3u8[^'"]*)/;
    const match = html.match(regex);

    if (match && match[1]) {
      res.json({ m3u8: match[1] });
    } else {
      res.status(404).json({ error: 'Link M3U8 não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar stream' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
