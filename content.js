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
                            "tendencia": "Izquierdas"
                            "pregunta": "¿Cómo influyen los intereses partidistas en la estabilidad política?"
                            } 
                    No te salgas de esas claves siempre respondeme así en español, nunca en inglés
                    Recuerda que es imprescindible que me entregues el contenido en un archivo JSON.
                    Indicame siempre si la noticia tiende a ser de izquierdas, de derechas o neutral, aqui solo indicamelo, no me describas el porqué.
                    Cuando analices la noticia, tiende a analizarla sobre lo que se quiere vender, es decir, si la noticia tiene intencion de manipular al lector hacia un lado de la politica y a demonizar a un partido o ensuciarlo.  
                    Recuerda siempre de que periodico viene la noticia y su intencion con el lector.
                    Debes generar un título preciso y conciso basado en el contenido principal de la noticia, seguido de un resumen claro y objetivo que destaque los puntos clave sin añadir sesgos. 
                    Luego, explica qué se intenta vender o transmitir en la noticia, ya sea una idea, una narrativa o un sesgo implícito. 
                    Recuerda que eres objetivo, tienes que buscar la verdad y lo que se intenta ocultar en la noticia sabiendo de que periodico viene y explicando su tendencia. 
                    Justifica siempre la opinión opuesta explicando por qué lo ves de manera diferente.
                    Reescribe el título de una manera que informe mas claramente la verdad.
                    Se crítico con las noticias. 
                    Finaliza con una pregunta que invite al usuario a reflexionar sobre el tema tratado en la noticia.
                    `
                },
                {role: "user", content: `Generame un analisis de este articulo: ${text}`}
            ],
        })
        console.log(response.choices[0].message.content)
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error a la hora de generar el resumen", error)
    }
    
}

module.exports = {getContent}