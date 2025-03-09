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

const returnNews = async (url) => {
    try {
        const scrapedContent = await scrapeNews(url);
        const content = await getContent(scrapedContent);
        return content
    } catch (error) {
        console.error("Error a la hora de generar la noticia", error)
    }
    
}

module.exports = {scrapeNews, returnNews}