const TEMPO_POR_ANDAR = 3; // 3 segundos por andar
const TEMPO_PORTA = 5;      // 5 segundos para abrir/fechar

// Lista de chamadas (origem, destino)
const chamadasOriginais = [
    { origem: 0, destino: 4 },
    { origem: 2, destino: 1 },
    { origem: 3, destino: 0 },
    { origem: 4, destino: 2 }
];

/**
 * ESTRATÉGIA A: Atender por ordem de chegada
 */
function estrategiaOrdemDeChegada(chamadas) {
    let andarAtual = 0; // O elevador começa no andar 0
    let deslocamentoTotal = 0;
    let tempoPortas = 0;
    let ordemAtendimento = [];

    for (let chamada of chamadas) {
        // 1. Deslocamento do andar atual até a origem da pessoa
        let deslocAteOrigem = Math.abs(andarAtual - chamada.origem);
        // 2. Deslocamento da origem até o destino final da pessoa
        let deslocAteDestino = Math.abs(chamada.origem - chamada.destino);

        deslocamentoTotal += (deslocAteOrigem + deslocAteDestino);
        
        // São duas paradas por pessoa: abre/fecha na origem e abre/fecha no destino (5s + 5s = 10s)
        tempoPortas += (TEMPO_PORTA * 2);

        // O elevador agora está no destino da chamada atendida
        andarAtual = chamada.destino;
        ordemAtendimento.push(`(${chamada.origem},${chamada.destino})`);
    }

    let tempoMovimento = deslocamentoTotal * TEMPO_POR_ANDAR;
    let tempoTotal = tempoMovimento + tempoPortas;

    return {
        nome: "Estratégia A: Ordem de Chegada",
        ordem: ordemAtendimento.join(" -> "),
        deslocamento: deslocamentoTotal,
        tempo: tempoTotal
    };
}

/**
 * ESTRATÉGIA B: Atender o mais próximo primeiro
 */
function estrategiaMaisProximo(chamadas) {
    let andarAtual = 0; // Começa no andar 0
    let deslocamentoTotal = 0;
    let tempoPortas = 0;
    let ordemAtendimento = [];
    
    // Faz uma cópia da lista para podermos manipular/remover os itens atendidos
    let fila = [...chamadas]; 

    while (fila.length > 0) {
        let melhorIndice = 0;
        let menorDistanciaAteOrigem = Math.abs(andarAtual - fila[0].origem);

        // Procura na fila quem está mais perto do andar onde o elevador está agora
        for (let i = 1; i < fila.length; i++) {
            let distancia = Math.abs(andarAtual - fila[i].origem);
            if (distancia < menorDistanciaAteOrigem) {
                menorDistanciaAteOrigem = distancia;
                melhorIndice = i;
            }
        }

        // Seleciona a chamada mais próxima encontrada
        let chamada = fila.splice(melhorIndice, 1)[0];

        // Calcula os deslocamentos igual à regra geral
        let deslocAteOrigem = Math.abs(andarAtual - chamada.origem);
        let deslocAteDestino = Math.abs(chamada.origem - chamada.destino);

        deslocamentoTotal += (deslocAteOrigem + deslocAteDestino);
        tempoPortas += (TEMPO_PORTA * 2);

        andarAtual = chamada.destino;
        ordemAtendimento.push(`(${chamada.origem},${chamada.destino})`);
    }

    let tempoMovimento = deslocamentoTotal * TEMPO_POR_ANDAR;
    let tempoTotal = tempoMovimento + tempoPortas;

    return {
        nome: "Estratégia B: Mais Próximo Primeiro",
        ordem: ordemAtendimento.join(" -> "),
        deslocamento: deslocamentoTotal,
        tempo: tempoTotal
    };
}

// Executando e comparando os resultados
const resultadoA = estrategiaOrdemDeChegada(chamadasOriginais);
const resultadoB = estrategiaMaisProximo(chamadasOriginais);

console.log("=== DESAFIO DO ELEVADOR ETEC ===");
console.log(`\n${resultadoA.nome}:`);
console.log(`- Ordem de atendimento: ${resultadoA.ordem}`);
console.log(`- Deslocamento total: ${resultadoA.deslocamento} andares`);
console.log(`- Tempo total gasto: ${resultadoA.tempo} segundos`);

console.log(`\n${resultadoB.nome}:`);
console.log(`- Ordem de atendimento: ${resultadoB.ordem}`);
console.log(`- Deslocamento total: ${resultadoB.deslocamento} andares`);
console.log(`- Tempo total gasto: ${resultadoB.tempo} segundos`);

console.log("\n=== CONCLUSÃO ===");
if (resultadoB.tempo < resultadoA.tempo) {
    console.log(`A "${resultadoB.nome}" foi mais eficiente, economizando ${resultadoA.tempo - resultadoB.tempo} segundos!`);
} else {
    console.log(`A "${resultadoA.nome}" teve melhor ou igual desempenho.`);
}
