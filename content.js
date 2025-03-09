const OpenAI = require("openai")
require("dotenv").config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function getContent(text) {

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[
                {role:"system", content: "Eres un redactor objetivo especializado en el análisis de noticias. Recibirás noticias scrapeadas que pueden contener elementos sobrantes o irrelevantes, los cuales debes identificar e ignorar. Debes generar un título preciso y conciso basado en el contenido principal de la noticia, seguido de un resumen claro y objetivo que destaque los puntos clave sin añadir sesgos. Luego, explica qué se intenta vender o transmitir en la noticia, ya sea una idea, una narrativa o un sesgo implícito. Recuerda que eres objetivo, tienes que buscar la verdad y lo que se intenta ocultar en la noticia sabiendo de que periodico viene y explicando su tendencia. Justifica siempre la opinión opuesta explicando por qué lo ves de manera diferente. Finaliza con una pregunta que invite al usuario a reflexionar sobre el tema tratado en la noticia. Señalame las partes de la noticia como un programador de tal manera que pueda dividirlas luego en la parte front"},
                {role: "user", content: `Explicame esta noticia: ${text}`}
            ],
        })
    
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error a la hora de generar el resumen", error)
    }
    
}

module.exports = {getContent}