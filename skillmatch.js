// ================================
// PERFIL DO CANDIDATO
// ================================

const candidato = {
    nome: "Leandro",
    area: "Front-End",
    habilidades: [
        "JavaScript",
        "GitHub",
        "Lógica de Programação",
        "Kanban"
    ],
    experienciaMeses: 3
};

console.log("Perfil do candidato:");
console.log(candidato);

// ================================
// LISTA DE VAGAS
// ================================

const vagas = [
    {
        id: 1,
        empresa: "TechStart",
        cargo: "Desenvolvedor Front-End Júnior",
        requisitos: ["JavaScript", "GitHub", "Lógica de Programação"],
        salario: 2800,
        modalidade: "Remoto"
    },
    {
        id: 2,
        empresa: "CodeLab",
        cargo: "Estágio Front-End",
        requisitos: ["JavaScript", "Kanban", "GitHub"],
        salario: 1800,
        modalidade: "Híbrido"
    },
    {
        id: 3,
        empresa: "WebSolutions",
        cargo: "Programador JavaScript Júnior",
        requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
        salario: 3000,
        modalidade: "Presencial"
    }
];

console.log("\nLista de vagas:");
console.log(vagas);

// ================================
// ANÁLISE DAS VAGAS
// ================================

const resultados = vagas.map((vaga) => {

    const habilidadesEncontradas = vaga.requisitos.filter((req) =>
        candidato.habilidades.includes(req)
    );

    const habilidadesFaltantes = vaga.requisitos.filter((req) =>
        !candidato.habilidades.includes(req)
    );

    const compatibilidade =
        (habilidadesEncontradas.length / vaga.requisitos.length) * 100;

    let classificacao = "";

    if (compatibilidade >= 80) {
        classificacao = "Alta compatibilidade";
    } else if (compatibilidade >= 50) {
        classificacao = "Média compatibilidade";
    } else {
        classificacao = "Baixa compatibilidade";
    }

    return {
        vaga,
        compatibilidade,
        classificacao,
        habilidadesEncontradas,
        habilidadesFaltantes
    };
});

// ================================
// EXIBIÇÃO DOS RESULTADOS
// ================================

resultados.forEach((res) => {
    console.log("\n----------------------------");
    console.log(`Empresa: ${res.vaga.empresa}`);
    console.log(`Cargo: ${res.vaga.cargo}`);
    console.log(`Compatibilidade: ${res.compatibilidade}%`);
    console.log(`Classificação: ${res.classificacao}`);
    console.log("Habilidades encontradas:");
    console.log(res.habilidadesEncontradas);
    console.log("Habilidades faltantes:");
    console.log(res.habilidadesFaltantes);
});

// ================================
// MELHOR VAGA (USANDO REDUCE)
// ================================

const melhor = resultados.reduce((melhorAtual, atual) => {
    if (!melhorAtual || atual.compatibilidade > melhorAtual.compatibilidade) {
        return atual;
    }
    return melhorAtual;
}, null);

console.log("\n================================");
console.log("Melhor vaga encontrada:");
console.log(`Empresa: ${melhor.vaga.empresa}`);
console.log(`Cargo: ${melhor.vaga.cargo}`);
console.log(`Compatibilidade: ${melhor.compatibilidade}%`);

// ================================
// RECOMENDAÇÃO DE ESTUDO
// ================================

console.log("\nSugestão de estudos:");

if (melhor.habilidadesFaltantes.length === 0) {
    console.log("Você já atende todos os requisitos da melhor vaga!");
} else {
    melhor.habilidadesFaltantes.forEach((hab) => {
        console.log(`Estude: ${hab}`);
    });
}