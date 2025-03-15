const puppeteer = require("puppeteer");

const { getContent } = require("./content");
const { urlCheck } = require("./utils");

const scrapeNews = async (url) => {
    console.log(url)
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
            const browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true
            });
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
        console.error("Esto no funciona:",error)
        return {
            error: true,
            log: error.message,
            message: "Error al procesar la pagina"
        };
    }
    
};

console.log("OPENAI_API", process.env.OPENAI_API_KEY)

const returnNews = async (url) => {
    try {
        const scrapedContent = await scrapeNews(url);
        console.log(scrapedContent)
        if(scrapedContent.error){
            return scrapedContent
        }
        const content = await getContent(scrapedContent.content);
        if(typeof content === "string"){
            const parsedContent = JSON.parse(content)
            return parsedContent
        }
    } catch (error) {
        console.error("Error a la hora de generar la noticia", error)
    }
    
}

module.exports = {scrapeNews, returnNews}