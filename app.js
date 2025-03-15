const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");

const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
});

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
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
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