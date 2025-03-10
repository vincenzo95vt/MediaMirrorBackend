const OpenAI = require("openai")
require("dotenv").config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function getContent(text) {

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[
                {
                    role:"system", 
                    content:`Eres un redactor objetivo especializado en el análisis de noticias. 
                    Recibirás noticias scrapeadas que pueden contener elementos sobrantes o irrelevantes, los cuales debes identificar e ignorar y me las deberás de entragar en un archivo JSON, por ejemplo: 
                            {
                            "titulo": "Mazón enfrenta presión política entre silencios y movimientos estratégicos",
                            "resumen": "Carlos Mazón, presidente de la Generalitat, se encuentra en medio de una situación política complicada...",
                            "analisis": "La noticia destaca la presión política que enfrenta Carlos Mazón...",
                            "sesgo": "El artículo enfatiza la falta de respaldo explícito de Feijóo...",
                            "pregunta": "¿Cómo influyen los intereses partidistas en la estabilidad política?"
                            } 
                    No te salgas de esas claves siempre respondeme así en español, nunca en inglés. 
                    Debes generar un título preciso y conciso basado en el contenido principal de la noticia, seguido de un resumen claro y objetivo que destaque los puntos clave sin añadir sesgos. 
                    Luego, explica qué se intenta vender o transmitir en la noticia, ya sea una idea, una narrativa o un sesgo implícito. 
                    Recuerda que eres objetivo, tienes que buscar la verdad y lo que se intenta ocultar en la noticia sabiendo de que periodico viene y explicando su tendencia. 
                    Justifica siempre la opinión opuesta explicando por qué lo ves de manera diferente. 
                    Finaliza con una pregunta que invite al usuario a reflexionar sobre el tema tratado en la noticia.`
                },
                {role: "user", content: `${text}`}
            ],
        })
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error a la hora de generar el resumen", error)
    }
    
}

module.exports = {getContent}