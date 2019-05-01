export default {
  words: [
    { id: 0, language1: 'weather', language2: 'tiempo', alternatives: ['clima'] },
    { id: 1, language1: 'thing', language2: 'cosa', alternatives: ['chisme', 'aparato', 'vaina', 'asunto'] },
    { id: 2, language1: 'man', language2: 'hombre', alternatives: ['señor', 'senor'] },
    { id: 3, language1: 'part', language2: 'parte', alternatives: ['pieza', 'repuesto'] },
    { id: 4, language1: 'life', language2: 'vida' },
    { id: 5, language1: 'moment', language2: 'momento', alternatives: ['instante'] },
    { id: 6, language1: 'form', language2: 'forma', alternatives: ['formulario'] },
    { id: 7, language1: 'house', language2: 'casa' },
    { id: 8, language1: 'world', language2: 'mundo' },
    { id: 9, language1: 'woman', language2: 'mujer', alternatives: ['señora', 'senora'] },
    { id: 10, language1: 'case', language2: 'caso', alternatives: ['cuestión', 'cuestion', 'ejemplo'] },
    { id: 11, language1: 'place', language2: 'lugar', alternatives: ['sitio'] },
    { id: 12, language1: 'person', language2: 'persona' },
    { id: 13, language1: 'hour', language2: 'hora' },
    { id: 14, language1: 'work', language2: 'trabajo', alternatives: ['obra'] },
    { id: 15, language1: 'point', language2: 'punto' },
    { id: 16, language1: 'hand', language2: 'mano' },
    { id: 17, language1: 'end', language2: 'fin', alternatives: ['final', 'extremo'] },
    { id: 18, language1: 'type', language2: 'tipo' },
    { id: 19, language1: 'people', language2: 'gente', alternatives: ['personas'] },
    { id: 20, language1: 'example', language2: 'ejemplo', alternatives: ['muestra'] },
    { id: 21, language1: 'side', language2: 'lado', alternatives: ['margen'] },
    { id: 22, language1: 'son', language2: 'hijo' },
    { id: 23, language1: 'problem', language2: 'problema' },
    { id: 24, language1: 'bill', language2: 'cuenta', alternatives: ['adición', 'adicion', 'factura', 'recibo', 'nota'] },
    { id: 25, language1: 'middle', language2: 'medio', alternatives: ['centro', 'mitad'] },
    { id: 26, language1: 'word', language2: 'palabra' },
    { id: 27, language1: 'father', language2: 'padre' },
    { id: 28, language1: 'change', language2: 'cambio', alternatives: ['variación', 'variacion'] },
    { id: 29, language1: 'history', language2: 'historia' },
    /* { id: 30, language1: 'idea', language2: 'idea' },
    { id: 31, language1: 'water', language2: 'agua' },
    { id: 32, language1: 'night', language2: 'noche' },
    { id: 33, language1: 'city', language2: 'ciudad' },
    { id: 34, language1: 'way', language2: 'manera' },
    { id: 35, language1: 'name', language2: 'nombre' },
    { id: 36, language1: 'family', language2: 'familia' },
    { id: 37, language1: 'reality', language2: 'realidad' },
    { id: 38, language1: 'truth', language2: 'verdad' },
    { id: 39, language1: 'month', language2: 'mes' },
    { id: 40, language1: 'group', language2: 'grupo' },
    { id: 41, language1: 'body', language2: 'cuerpo' },
    { id: 42, language1: 'fact', language2: 'hecho' },
    { id: 43, language1: 'beginning', language2: 'principio' },
    { id: 44, language1: 'town', language2: 'pueblo' },
    { id: 45, language1: 'afternoon', language2: 'tarde' },
    { id: 46, language1: 'eye', language2: 'ojo' },
    { id: 47, language1: 'street', language2: 'calle' },
    { id: 48, language1: 'book', language2: 'libro' },
    { id: 49, language1: 'strength', language2: 'fuerza' },
    { id: 50, language1: 'light', language2: 'luz' },
    { id: 51, language1: 'saint', language2: 'santo' },
    { id: 52, language1: 'front', language2: 'frente' },
    { id: 53, language1: 'friend', language2: 'amigo' },
    { id: 54, language1: 'sense', language2: 'sentido' },
    { id: 55, language1: 'step', language2: 'paso' },
    { id: 56, language1: 'century', language2: 'siglo' },
    { id: 57, language1: 'god', language2: 'dios' },
    { id: 58, language1: 'earth', language2: 'tierra' },
    { id: 59, language1: 'paper', language2: 'papel' },
    { id: 60, language1: 'mother', language2: 'madre' },
    { id: 61, language1: 'theme', language2: 'tema' },
    { id: 62, language1: 'class', language2: 'clase' },
    { id: 63, language1: 'money', language2: 'dinero' },
    { id: 64, language1: 'head', language2: 'cabeza' },
    { id: 65, language1: 'order', language2: 'orden' },
    { id: 66, language1: 'week', language2: 'semana' },
    { id: 67, language1: 'view', language2: 'vista' },
    { id: 68, language1: 'agreement', language2: 'acuerdo' },
    { id: 69, language1: 'bottom', language2: 'fondo' },
    { id: 70, language1: 'road', language2: 'camino' },
    { id: 71, language1: 'voice', language2: 'voz' },
    { id: 72, language1: 'study', language2: 'estudio' },
    { id: 73, language1: 'value', language2: 'valor' },
    { id: 74, language1: 'measurement', language2: 'medida' },
    { id: 75, language1: 'center', language2: 'centro' },
    { id: 76, language1: 'need', language2: 'necesidad' },
    { id: 77, language1: 'lack', language2: 'falta' },
    { id: 78, language1: 'age', language2: 'edad' },
    { id: 79, language1: 'state', language2: 'estado' },
    { id: 80, language1: 'door', language2: 'puerta' },
    { id: 81, language1: 'face', language2: 'cara' },
    { id: 82, language1: 'color', language2: 'color' },
    { id: 83, language1: 'movement', language2: 'movimiento' },
    { id: 84, language1: 'possibility', language2: 'posibilidad' },
    { id: 85, language1: 'game', language2: 'juego' },
    { id: 86, language1: 'air', language2: 'aire' },
    { id: 87, language1: 'war', language2: 'guerra' },
    { id: 88, language1: 'result', language2: 'resultado' },
    { id: 89, language1: 'law', language2: 'ley' },
    { id: 90, language1: 'aspect', language2: 'aspecto' },
    { id: 91, language1: 'foot', language2: 'pie' },
    { id: 92, language1: 'species', language2: 'especie' },
    { id: 93, language1: 'service', language2: 'servicio' },
    { id: 94, language1: 'activity', language2: 'actividad' },
    { id: 95, language1: 'doubt', language2: 'duda' },
    { id: 96, language1: 'difference', language2: 'diferencia' },
    { id: 97, language1: 'quantity', language2: 'cantidad' },
    { id: 98, language1: 'society', language2: 'sociedad' },
    { id: 99, language1: 'effect', language2: 'efecto' },
    { id: 100, language1: 'object', language2: 'objeto' },
    { id: 101, language1: 'love', language2: 'amor' },
    { id: 102, language1: 'death', language2: 'muerte' },
    { id: 103, language1: 'power', language2: 'poder' },
    { id: 104, language1: 'importance', language2: 'importancia' },
    { id: 105, language1: 'system', language2: 'sistema' },
    { id: 106, language1: 'trip', language2: 'viaje' },
    { id: 107, language1: 'ground', language2: 'suelo' },
    { id: 108, language1: 'regard', language2: 'respecto' },
    { id: 109, language1: 'knowledge', language2: 'conocimiento' },
    { id: 110, language1: 'freedom', language2: 'libertad' },
    { id: 111, language1: 'effort', language2: 'esfuerzo' },
    { id: 112, language1: 'rest', language2: 'resto' },
    { id: 113, language1: 'area', language2: 'zona' },
    { id: 114, language1: 'fear', language2: 'miedo' },
    { id: 115, language1: 'process', language2: 'proceso' },
    { id: 116, language1: 'minute', language2: 'minuto' },
    { id: 117, language1: 'table', language2: 'mesa' },
    { id: 118, language1: 'program', language2: 'programa' }, */
  ],
};
