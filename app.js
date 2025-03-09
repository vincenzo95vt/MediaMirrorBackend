const express = require("express")
const app = express()
const cors = require("cors");
const { scrapeNews } = require(".");
app.use(express.json());
app.use(cors());


const port = 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post("/scrape", async (req, res) => {
    const url = req.body.url;
    
    if(!url) {
        return res.status(400).json({error: "Se requiere una url"})
    }

    const content = await scrapeNews(url);
    if(!content) {
        return res.status(400).json({error: "No se pudo obtener el contenido de la noticia"});
    }
})