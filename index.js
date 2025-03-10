const puppeteer = require("puppeteer");
const { getContent } = require("./content");
const { urlCheck } = require("./utils");

const scrapeNews = async (url) => {
    try {
        if (!url || typeof url !== "string" || !url.startsWith("https")) {
            return {
                error: true,
                message: "No es una URL válida"
            };
        }
        const check = urlCheck(url)
        if(check === false){
            return {
                error: true,
                message: "Ups, parece que tu periódico no es de confianza."
            };
        }else{
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "domcontentloaded" });
        
            const content = await page.evaluate(() => document.body.innerText);
            await browser.close();
            return {
                error: false,
                content
            }
        }
    } catch (error) {
        return {
            error: true,
            message: "Error al procesar la pagina"
        };
    }
    
};

const returnNews = async (url) => {
    try {
        const scrapedContent = await scrapeNews(url);
        console.log(scrapedContent)
        if(scrapedContent.error){
            return scrapedContent
        }
        const content = await getContent(scrapedContent);
        if(typeof content === "string"){
            const parsedContent = JSON.parse(content)
            return parsedContent
        }
    } catch (error) {
        console.error("Error a la hora de generar la noticia", error)
    }
    
}

module.exports = {scrapeNews, returnNews}