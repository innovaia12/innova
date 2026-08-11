const rawData = {
  "botella de plástico": {
    degradacion: "Hasta 450 años",
    impacto: "Contamina suelos y océanos, entra en la cadena alimentaria y libera microplásticos.",
    reutilizacion: "Úsala como maceta, contenedor para agua o decórala para manualidades.",
    consejos: [
      "Evita usar botellas de plástico desechables.",
      "Opta por botellas reutilizables de acero o vidrio.",
      "Recicla correctamente cuando ya no puedas reutilizarla."
    ]
  },
  "papel": {
    degradacion: "2 a 6 semanas",
    impacto: "Aunque se biodegrada, su fabricación consume agua y energía.",
    reutilizacion: "Reutiliza como notas, embalaje o compostaje.",
    consejos: [
      "Reduce el consumo de papel impreso.",
      "Reutiliza hojas usadas para apuntes.",
      "Recicla papel limpio y seco."
    ]
  },
  "lata de aluminio": {
    degradacion: "200 a 500 años",
    impacto: "Consume recursos y energía en su producción, pero es 100% reciclable.",
    reutilizacion: "Haz organizadores, portalápices o macetas con ella.",
    consejos: [
      "Enjuaga y recicla las latas.",
      "Prefiere productos en envases retornables cuando sea posible.",
      "Reutiliza latas para manualidades sostenibles."
    ]
  },
  "bolsa de plástico": {
    degradacion: "500 a 1000 años",
    impacto: "Afecta a la fauna marina, bloquea drenajes y se fragmenta en microplásticos.",
    reutilizacion: "Reutilízala varias veces como bolsa de compras o basura.",
    consejos: [
      "Usa bolsas de tela reutilizables.",
      "No las dejes en la calle ni en la naturaleza.",
      "Recicla cuando sean irreutilizables."
    ]
  },
  "vidrio": {
    degradacion: "No se degrada fácilmente, puede durar miles de años",
    impacto: "Es inerte, pero genera residuos voluminosos si no se recicla.",
    reutilizacion: "Úsalo como frascos, envases o elementos decorativos.",
    consejos: [
      "Recicla vidrio en contenedores verdes.",
      "Reutiliza frascos como almacenaje doméstico.",
      "Evita romper vidrio innecesariamente."
    ]
  },
  "caja de cartón": {
    degradacion: "2 a 5 meses si está limpia",
    impacto: "Genera residuos reciclables y puede contaminarse si se moja.",
    reutilizacion: "Úsala para almacenar objetos o como protector en mudanzas.",
    consejos: [
      "Pliega cajas limpias antes de reciclarlas.",
      "Reutiliza cajas como organizadores.",
      "No las tires al contenedor de residuos orgánicos."
    ]
  },
  "telefono movil": {
    degradacion: "No se degrada en condiciones normales y puede durar siglos en vertederos",
    impacto: "Contiene metales tóxicos y materiales difíciles de reciclar.",
    reutilizacion: "Dona o recicla en puntos limpios especializados.",
    consejos: [
      "No tires tu móvil a la basura común.",
      "Busca programas de reciclaje o donaciones.",
      "Repara o reutiliza antes de reemplazarlo."
    ]
  }
};

const normalizeText = (text) =>
  text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const data = {};
Object.entries(rawData).forEach(([key, value]) => {
  data[normalizeText(key)] = value;
});

function mostrarResultado(itemName, itemData) {
  const result = document.getElementById("result");
  document.getElementById("result-title").textContent = itemName;
  document.getElementById("result-degradation").textContent = `Tiempo de degradación: ${itemData.degradacion}`;
  document.getElementById("result-impact").textContent = `Impacto ambiental: ${itemData.impacto}`;
  document.getElementById("result-reuse").textContent = `Reutilización: ${itemData.reutilizacion}`;

  const tipsList = document.getElementById("result-tips");
  tipsList.innerHTML = "";
  itemData.consejos.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  result.classList.remove("hidden");
}

function mostrarMensajeGenerico(text) {
  const result = document.getElementById("result");
  document.getElementById("result-title").textContent = "Sin dato exacto disponible";
  document.getElementById("result-degradation").textContent = text;
  document.getElementById("result-impact").textContent = "La mayoría de los residuos afectan al agua, suelo y biodiversidad."
  document.getElementById("result-reuse").textContent = "Busca opciones de reutilización creativas y reduce el consumo."
  const tipsList = document.getElementById("result-tips");
  tipsList.innerHTML = "";
  [
    "Compra menos plástico de un solo uso.",
    "Elige productos duraderos y reparables.",
    "Recicla y compostea siempre que puedas."
  ].forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
  result.classList.remove("hidden");
}

function buscarObjeto() {
  const input = document.getElementById("item-input");
  const rawConsulta = input.value.trim();
  const consulta = normalizeText(rawConsulta);

  if (!consulta) {
    alert("Por favor, escribe el nombre de un objeto.");
    return;
  }

  const itemData = data[consulta];

  if (itemData) {
    mostrarResultado(rawConsulta, itemData);
  } else {
    mostrarMensajeGenerico(`No encontré información exacta para '${rawConsulta}', pero puedes usar estos consejos generales para reducir el impacto ambiental.`);
  }
}

const button = document.getElementById("search-button");
button.addEventListener("click", buscarObjeto);

const input = document.getElementById("item-input");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buscarObjeto();
  }
});

const suggestionButtons = document.querySelectorAll(".suggestions button");
suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.textContent.trim();
    buscarObjeto();
  });
});
