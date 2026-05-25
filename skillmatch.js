// ============================================================
// SKILLMATCH JS - VERSÃO FINAL PROFISSIONAL
// ============================================================

// ========================
// RF13 - Closure (contador de análises)
// ========================
function criarContadorDeAnalises() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}

// ========================
// RF01 - Classe base Pessoa
// ========================
class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }

  apresentar() {
    return `Olá, meu nome é ${this.nome}`;
  }
}

// ========================
// RF02 - Classe Candidato (Herança)
// ========================
class Candidato extends Pessoa {
  constructor(nome, area, habilidades, experienciaMeses) {
    super(nome);
    this.area = area;
    this.habilidades = habilidades;
    this.experienciaMeses = experienciaMeses;
  }

  exibirPerfil() {
    console.log(this.apresentar());
    console.log(`Área: ${this.area}`);
    console.log(`Experiência: ${this.experienciaMeses} meses`);
    console.log(`Habilidades: ${this.habilidades.join(", ")}`);
  }
}

// ========================
// RF09 - Classe Vaga
// ========================
class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa} (${this.modalidade}) - R$ ${this.salario}`;
  }
}

// ========================
// RF10 - Herança: VagaFrontEnd
// ========================
class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível: ${this.nivel}`;
  }
}

// ========================
// RF03, RF04, RF05 - Compatibilidade
// ========================
function calcularCompatibilidade(candidato, vaga) {
  const habilidadesEncontradas = vaga.requisitos.filter(req =>
    candidato.habilidades.includes(req)
  );

  const habilidadesFaltantes = vaga.requisitos.filter(req =>
    !candidato.habilidades.includes(req)
  );

  const percentual = Math.round(
    (habilidadesEncontradas.length / vaga.requisitos.length) * 100
  );

  let classificacao;
  if (percentual >= 80) classificacao = "Alta compatibilidade";
  else if (percentual >= 50) classificacao = "Média compatibilidade";
  else classificacao = "Baixa compatibilidade";

  return {
    vaga,
    percentual,
    habilidadesEncontradas,
    habilidadesFaltantes,
    classificacao,
  };
}

// ========================
// RF12 - Callback
// ========================
function finalizarAnalise(nome, callback) {
  console.log("\n✅ Análise finalizada.");
  callback(nome);
}

function mensagemFinal(nome) {
  console.log(`📌 ${nome}, revise suas habilidades e continue evoluindo.`);
}

// ========================
// RF14 - Promise + Async/Await
// ========================
function buscarVagas() {
  return new Promise(resolve => {
    setTimeout(() => resolve(vagas), 1000);
  });
}

// ========================
// DADOS
// ========================
const candidato = new Candidato(
  "Leandro",
  "Front-End",
  ["JavaScript", "GitHub", "Lógica de Programação", "Kanban", "CSS"],
  3
);

const vagas = [
  new VagaFrontEnd(1, "TechStart", "Dev Front-End Jr",
    ["JavaScript", "GitHub", "Lógica de Programação"], 2800, "Remoto", "Júnior"),

  new VagaFrontEnd(2, "CodeLab", "Estágio Front-End",
    ["JavaScript", "Kanban", "GitHub"], 1800, "Híbrido", "Estágio"),

  new VagaFrontEnd(3, "WebSolutions", "Programador JS Jr",
    ["JavaScript", "Arrays", "Objetos", "Funções"], 3000, "Presencial", "Júnior"),

  new VagaFrontEnd(4, "DevAgency", "Dev Web Jr",
    ["JavaScript", "CSS", "GitHub", "Lógica de Programação", "Kanban"], 2500, "Remoto", "Júnior"),
];

// ========================
// EXECUÇÃO
// ========================
async function iniciarSistema() {
  console.log("⏳ Carregando vagas...\n");

  const vagasCarregadas = await buscarVagas();

  console.log(`✅ ${vagasCarregadas.length} vagas carregadas\n`);

  candidato.exibirPerfil();

  const contarAnalise = criarContadorDeAnalises();

  const resultados = vagasCarregadas.map(vaga =>
    calcularCompatibilidade(candidato, vaga)
  );

  console.log("\n================ RESULTADOS ================\n");

  resultados.forEach(r => {
    const numero = contarAnalise();

    console.log(`📊 Análise #${numero}`);
    console.log(r.vaga.exibirResumo());
    console.log(r.vaga.exibirNivel());
    console.log(`Compatibilidade: ${r.percentual}%`);
    console.log(`Classificação: ${r.classificacao}`);
    console.log(`✔ Encontradas: ${r.habilidadesEncontradas.join(", ") || "Nenhuma"}`);
    console.log(`❌ Faltantes: ${r.habilidadesFaltantes.join(", ") || "Nenhuma"}`);
    console.log("--------------------------------------------");
  });

  // Melhor vaga
  const melhor = resultados.reduce((a, b) =>
    b.percentual > a.percentual ? b : a
  );

  console.log("\n🏆 Melhor vaga:");
  console.log(`${melhor.vaga.empresa} - ${melhor.vaga.cargo} (${melhor.percentual}%)`);

  // Vagas remotas (CORRIGIDO)
  const vagasRemotas = vagasCarregadas.filter(v => v.modalidade === "Remoto");

  console.log("\n🌐 Vagas remotas disponíveis:");
  vagasRemotas.forEach(v => console.log(`${v.empresa} - ${v.cargo}`));

  // Atende alguma completamente
  const atendeAlgumaCompletamente = resultados.some(r => r.percentual === 100);
  console.log(`\n🎯 Atende 100% alguma vaga: ${atendeAlgumaCompletamente ? "Sim" : "Não"}`);

  // Recomendação (MELHORADA)
  const faltantesUnicas = [
    ...new Set(resultados.flatMap(r => r.habilidadesFaltantes))
  ];

  console.log("\n📚 Recomendação de estudos:");
  if (faltantesUnicas.length > 0) {
    console.log(faltantesUnicas.join(", "));
  } else {
    console.log("Você atende todos os requisitos!");
  }

  console.log(`\n📈 Total de análises: ${resultados.length}`);

  finalizarAnalise(candidato.nome, mensagemFinal);
}

iniciarSistema();