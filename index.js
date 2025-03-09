const puppeteer = require("puppeteer");
const { getContent } = require("./content");

const scrapeNews = async (url) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });
    
        const content = await page.evaluate(() => document.body.innerText);
        await browser.close();
        return content;
    } catch (error) {
        console.error("Error en el scraping", error)
    }
    
};

const returnNews = async () => {
    const url = "https://www.elmundo.es/internacional/2025/03/08/67c98c2be9cf4a51218b4578.html";
    const scrapedContent = await scrapeNews(url);
    const content = await getContent(scrapedContent);
    console.log(content)
}

module.exports = {scrapeNews, returnNews}