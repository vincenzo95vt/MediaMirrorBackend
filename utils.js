const ALLOWED_DOMAINS = [
    ...[
        "elpais.com", "elmundo.es", "abc.es", "lavanguardia.com", "elconfidencial.com",
        "eldiario.es", "elperiodico.com", "20minutos.es", "publico.es", "larazon.es", "elespanol.com",
        "nuevatribuna.es", "okdiario.com"
    ],
    ...[
        "expansion.com", "cincodias.elpais.com", "eleconomista.es", "invertia.com"
    ],
    ...[
        "marca.com", "as.com", "sport.es", "mundodeportivo.com", "estadiodeportivo.com"
    ],
    ...[
        "diariovasco.com", "elcorreogallego.es", "elperiodicoextremadura.com", "heraldo.es",
        "lavozdigital.es", "levante-emv.com", "diariodesevilla.es", "lne.es", "elcomercio.es",
        "diariodemallorca.es", "ultimahora.es", "elnortedecastilla.es", "diariodeburgos.es"
    ]
];

const urlCheck = (url) => {
    try {
        const parsedUrl = new URL(url);
        return ALLOWED_DOMAINS.some(domain => parsedUrl.hostname.includes(domain))
    } catch (error) {
        return false
    }
}

module.exports = {urlCheck}