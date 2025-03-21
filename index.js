const express = require("express")
const app = express()
const cors = require("cors");
const { returnNews } = require("./app.js");
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000

app.post("/scrape", async (req, res) => {
    const url = req.body.url;
    
    if(!url) {
        return res.status(400).json({error: "Se requiere una url"})
    };
    
    const summarizedContent = await returnNews(url);
    console.log(summarizedContent)
    if(!summarizedContent || summarizedContent.error) {
        return res.status(400).json({error: summarizedContent});
    }
    return res.status(200).json({
        status: 200,
        content: summarizedContent
    })
})

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando correctamente");
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

module.exports = app