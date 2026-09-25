/* ==========================================================================
   CAMPER ÉLITE - SCRIPT PRINCIPAL (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Actualizar año dinámicamente en el footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Inicializar galerías fijando el primer botón activo
  inicializarGalerias();

  // 3. Cerrar menú móvil al hacer clic fuera
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('menu');
    const menuBtn = document.querySelector('.menu-btn');
    if (menu && menu.classList.contains('is-open')) {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove('is-open');
      }
    }
  });

  // 4. Destacar enlace activo en la navegación según el scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 110;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

/**
 * Muestra el modal de confirmación tras enviar el formulario
 */
function abrirConfirmacionModal(nombre, email) {
  const modal = document.getElementById('confirmacionModal');
  const texto = document.getElementById('confirmacionTexto');

  if (modal && texto) {
    texto.innerHTML = `
      ¡Muchas gracias <strong>${nombre}</strong>!<br><br>
      Se ha abierto tu aplicación de WhatsApp para enviar directamente la consulta a nuestro número <strong style="color: #2E7D32;">+34 639 17 06 13</strong> 📲.<br><br>
      Asimismo, conservamos tu email <strong style="color: #1565C0;">${email}</strong> para mantener el contacto y resolver todas tus dudas sobre el alquiler de campers en Vitoria-Gasteiz.
    `;
    modal.classList.add('is-open');
  } else {
    alert(`¡Gracias ${nombre}! Se ha iniciado el mensaje de WhatsApp a +34 639 17 06 13.`);
  }
}

function cerrarConfirmacionModal() {
  const modal = document.getElementById('confirmacionModal');
  if (modal) {
    modal.classList.remove('is-open');
  }
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  if (menu) {
    menu.classList.toggle('is-open');
  }
}

function galeria(id, index) {
  const galeriaEl = document.getElementById(id);
  if (!galeriaEl) return;

  const imgs = galeriaEl.querySelectorAll('img');
  imgs.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });

  const card = galeriaEl.closest('.card');
  if (card) {
    const buttons = card.querySelectorAll('.gallery-buttons button');
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  }
}

function inicializarGalerias() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const firstButton = card.querySelector('.gallery-buttons button');
    if (firstButton) {
      firstButton.classList.add('active');
    }
  });
}

function filtrarRutas(categoria, btn) {
  const filtroBtns = document.querySelectorAll('.filtro-btn');
  filtroBtns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const rutaCards = document.querySelectorAll('.ruta-card');
  rutaCards.forEach(card => {
    const catCard = card.getAttribute('data-categoria');
    if (categoria === 'todas' || catCard === categoria) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// BASE DE DATOS DE ITINERARIOS DETALLADOS (17 RUTAS RECOMENDADAS)
const itinerariosDetallados = {
  // LAS MERINDADES
  merindades_finde: {
    titulo: "Las Merindades en un Fin de Semana",
    duracion: "2 Días | 180 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://senderosdelasmerindades.es/que-ver-en-las-merindades-en-un-fin-de-semana/",
    origenFuente: "Senderos de las Merindades",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Itinerario Fin de Semana:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Vitoria-Gasteiz a Frías y Tobera</strong> - Salida desde nuestra base en Vitoria. Visita a la ciudad medieval de Frías, su icónico castillo colgado y el desfiladero de Tobera con sus cascadas. Pernocta en área camper de Frías.</li>
        <li><strong>Día 2: Ojo Guareña y Puentedey</strong> - Complejo kárstico de Ojo Guareña (ermita excavada en la roca de San Bernabé) y paseo por el puente natural de roca de Puentedey.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Ruta ideal muy cercana a nuestra base de Vitoria-Gasteiz. Perfecta para una escapada de 48 horas con pernocta segura y paisajes inolvidables.</p>
    `
  },
  merindades_3_4: {
    titulo: "Qué ver en Las Merindades en 3 o 4 Días",
    duracion: "3 - 4 Días | 280 km",
    vehiculo: "Recomendado: Opel Vivaro o Autocaravana CI L51",
    fuente: "https://senderosdelasmerindades.es/que-ver-en-las-merindades-en-3-o-4-dias/",
    origenFuente: "Senderos de las Merindades",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Itinerario 3-4 Días:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Frías, Tobera y Medina de Pomar</strong> - Murallas medievales, castillo de los Velasco y arquitectura popular.</li>
        <li><strong>Día 2: Ojo Guareña y Espinosa de los Monteros</strong> - Cueva de San Bernabé y casonas hidalgas en Espinosa.</li>
        <li><strong>Día 3: Cañón del Ebro y Orbaneja del Castillo</strong> - Espectacular pueblo con cascada que cruza sus calles y miradores del Ebro.</li>
        <li><strong>Día 4 (Opcional): Salto del Nervión y Valle de Losa</strong> - El salto de agua más alto de la Península antes de volver a Vitoria.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Excelentes áreas de autocaravanas en Medina de Pomar, Espinosa de los Monteros y Frías con todos los servicios.</p>
    `
  },
  merindades_5dias: {
    titulo: "Gran Ruta por Las Merindades en 5 Días",
    duracion: "5 Días | 380 km",
    vehiculo: "Recomendado: Autocaravana CI L51 o Mercedes Vito",
    fuente: "https://senderosdelasmerindades.es/que-ver-en-las-merindades-en-5-dias/",
    origenFuente: "Senderos de las Merindades",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Itinerario Completo 5 Días:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Romanes y Castillos</strong> - Frías, ermita de San Martín de Elines y Pedrosa de Tobalina.</li>
        <li><strong>Día 2: Valle de Mena y Cascadas</strong> - Cascada de Peñalad y bosques del Valle de Mena.</li>
        <li><strong>Día 3: Valles Glaciares de Lunada y Picón Blanco</strong> - Carreteras de montaña entre prados y Neveras pasiegas.</li>
        <li><strong>Día 4: Ojo Guareña y Puentedey</strong> - Espeleología cultural y arquitectura kárstica.</li>
        <li><strong>Día 5: Desfiladero de los Palancares y Orbaneja</strong> - Senderismo fluvial y mirador sobre el río Ebro.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Un viaje apasionante con el equilibrio perfecto entre naturaleza salvaje, patrimonio y buena gastronomía castellano-leonesa.</p>
    `
  },

  // CANTABRIA
  valles_pasiegos: {
    titulo: "Ruta por los Valles Pasiegos",
    duracion: "3 Días | 220 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/ruta-por-los-valles-pasiegos.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Itinerario por el Corazón Pasiego:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Selaya y Villacarriedo</strong> - Palacio de Soñanes, obracor de sobaos pasiegos tradicionales y valles verdes.</li>
        <li><strong>Día 2: Vega de Pas y San Roque de Riomiera</strong> - Cabañas pasiegas, puertos de montaña (Lunada y Estacas de Trueba) y paisajes de infarto.</li>
        <li><strong>Día 3: Liérganes y Balneario</strong> - Puente mayor conocido como el del 'Hombre Pez' y arquitectura rústica cantábrica.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Carreteras panorámicas estrechas pero muy accesibles con furgonetas camper ágiles. Imprescindible probar el sobao pasiego y la quesada recién hecha.</p>
    `
  },
  villas_marineras: {
    titulo: "Ruta por las Villas Marineras de Cantabria",
    duracion: "4 - 5 Días | 260 km",
    vehiculo: "Recomendado: Opel Vivaro o Autocaravana CI L51",
    fuente: "https://www.rutasporcantabria.com/ruta-por-las-villas-marineras.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">De Castro Urdiales a San Vicente de la Barquera:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Castro Urdiales y Laredo</strong> - Iglesia de Santa María de la Asunción, Puebla Vieja y playa de la Salvé.</li>
        <li><strong>Día 2: Santoña y Noja</strong> - Ruta del Faro del Caballo, marismas de Santoña y conserveras de anchoas artesanales.</li>
        <li><strong>Día 3: Santander y Suances</strong> - El Sardinero, Palacio de la Magdalena y acantilados al atardecer en Suances.</li>
        <li><strong>Día 4: Comillas y San Vicente de la Barquera</strong> - El Capricho de Gaudí, Palacio de Sobrellano y vistas a los Picos de Europa desde la ría de San Vicente.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Abundancia de parkings y áreas preparadas para autocaravanas frente al mar. Excelente gastronomía marinera.</p>
    `
  },
  interior_desconocido: {
    titulo: "Ruta por el Interior Desconocido de Cantabria",
    duracion: "3 Días | 210 km",
    vehiculo: "Recomendado: Mercedes Vito o Opel Vivaro",
    fuente: "https://www.rutasporcantabria.com/ruta-por-el-interior-desconocido-de-cantabria.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Valles del Nansa y Saja Sin Masificaciones:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Valle de Toranzo y Alceda</strong> - Parques de árboles centenarios y casonas solariegas.</li>
        <li><strong>Día 2: Valle del Nansa y Carmona</strong> - Pueblo típico cántabro famoso por la artesanía de albarcas de madera y vacas tudancas.</li>
        <li><strong>Día 3: Tudanca y embalse de La Cohilla</strong> - Casa Museo de José María de Pereda y garganta del río Nansa.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Tranquilidad absoluta para pernoctar en contacto directo con la naturaleza autóctona.</p>
    `
  },
  carlos_v: {
    titulo: "Ruta del Emperador Carlos V",
    duracion: "4 Días | 310 km",
    vehiculo: "Recomendado: Autocaravana CI L51 o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/ruta-del-emperador-carlos-v.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Revive el último viaje del Emperador (1556):</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Desembarco en Laredo</strong> - Recorrido por el puerto histórico y el centro medieval de Colindres.</li>
        <li><strong>Día 2: Ampuero y Limpias</strong> - Valles interiores, santuario del Cristo de Limpias y gastronomía local.</li>
        <li><strong>Día 3: Medina de Pomar y Medina de las Merindades</strong> - Cruce de la sierra cantábrica por los antiguos caminos reales.</li>
        <li><strong>Día 4: Hacia los valles de reinosa y paso a la meseta</strong> - Historia, castillos y fortalezas históricas.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Una ruta temática cultural e histórica ideal para viajes pausados en camper o autocaravana.</p>
    `
  },
  cuevas_prehistoricas: {
    titulo: "Visita a las Cuevas Prehistóricas de Cantabria (UNESCO)",
    duracion: "2 - 3 Días | 190 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/visita-a-las-cuevas-prehistoricas-de-cantabria.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Viaje a los orígenes del Arte Rupestre:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Cueva de El Castillo y Las Monedas (Puente Viesgo)</strong> - Pinturas rupestres de manos de más de 40.000 años de antigüedad.</li>
        <li><strong>Día 2: Neocueva de Altamira y Cueva de El Pendo</strong> - Museo de Altamira en Santillana del Mar y cueva de Camargo.</li>
        <li><strong>Día 3: Cueva de Covalanas y Cullalvera (Ramales de la Victoria)</strong> - 'La cueva de los ciervos rojos' pintada en trazo punteado.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Imprescindible reservar con antelación las entradas a las cuevas originales. Entornos de aparcamiento amplios.</p>
    `
  },
  cantabria_medieval: {
    titulo: "Ruta por la Cantabria Medieval",
    duracion: "3 Días | 230 km",
    vehiculo: "Recomendado: Opel Vivaro o Autocaravana CI L51",
    fuente: "https://www.rutasporcantabria.com/ruta-por-la-cantabria-medieval.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Torres, Castillos y Colegiatas:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Santillana del Mar</strong> - Colegiata de Santa Juliana, calles empedradas y arquitectura señorial.</li>
        <li><strong>Día 2: Cartes y Bárcena Mayor</strong> - Torre de Pero Niño en Cartes y único pueblo cántabro dentro de un Parque Natural.</li>
        <li><strong>Día 3: Potes y Torre del Infantado</strong> - Villa medieval a los pies de los Picos de Europa.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Viaja en el tiempo y disfruta de la mejor gastronomía tradicional de montaña en Bárcena Mayor.</p>
    `
  },
  puertos_miticos: {
    titulo: "Puertos Míticos de la Vuelta a España",
    duracion: "3 Días | 340 km",
    vehiculo: "Recomendado: Mercedes Vito u Opel Vivaro",
    fuente: "https://www.rutasporcantabria.com/ruta-por-los-puertos-miticos-de-la-vuelta-a-espana.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Ruta para amantes de la montaña y el ciclismo:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Peña Cabarga y Puerto de Alisas</strong> - Mirador de la bahía de Santander y carretera escénica de Alisas.</li>
        <li><strong>Día 2: Puerto de Palombera y Collada de Carmona</strong> - Miradores del Parque Saja-Besaya.</li>
        <li><strong>Día 3: Puerto de la Lunada y Estacas de Trueba</strong> - Carreteras de montaña entre paredones de roca y puertos legendarios.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Lleva bicicletas en nuestro portabicicletas disponible en la Mercedes Vito o utiliza los miradores para fotografías panorámicas únicas.</p>
    `
  },
  campoo_palombera: {
    titulo: "Ruta por Campoo y Puerto de Palombera",
    duracion: "2 - 3 Días | 210 km",
    vehiculo: "Recomendado: Autocaravana CI L51 o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/ruta-por-campoo-y-palombera.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Del Nacimiento del Ebro al Corazón del Saja:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Reinosa y Fontibre</strong> - Nacimiento del río Ebro, ruinas romanas de Julióbriga y embalse del Ebro.</li>
        <li><strong>Día 2: Estación de Alto Campoo y Puerto de Palombera</strong> - Subida a las cumbres y bajada por el bosque atlántico del Saja.</li>
        <li><strong>Día 3: Ucieda y Cabezón de la Sal</strong> - Rutas de senderismo bajo hayas centenarias.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Pernocta placentera y fresca en verano en las inmediaciones del embalse o del parque de Fontibre.</p>
    `
  },
  cabuerniga: {
    titulo: "Ruta por el Valle de Cabuérniga",
    duracion: "2 Días | 160 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/ruta-por-cabuerniga.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Arquitectura popular y tradiciones vivas:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Cabezón de la Sal, Carrejo y Valle de Cabuérniga</strong> - Museo de la Naturaleza en Carrejo y casonas de piedra con balconadas de madera de roble.</li>
        <li><strong>Día 2: Bárcena Mayor y Hayedo de Ucieda</strong> - Visita a la joya de la arquitectura tradicional cántabra y degustación del famoso cocido montañés.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Un viaje perfecto de fin de semana para conectar con el silencio y la buena mesa cántabra.</p>
    `
  },
  polaciones_liebana: {
    titulo: "Ruta por Polaciones y Valle de Liébana",
    duracion: "3 - 4 Días | 270 km",
    vehiculo: "Recomendado: Autocaravana CI L51 o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/ruta-por-polaciones-y-liebana.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Alta Montaña y Picos de Europa:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Valle de Polaciones y Puerto de Piedrasluengas</strong> - El valle más aislado y alto de Cantabria con miradores hacia el Macizo de Andara.</li>
        <li><strong>Día 2: Potes y Monasterio de Santo Toribio de Liébana</strong> - Centro neustro de Liébana y visita al Lignum Crucis.</li>
        <li><strong>Día 3: Fuente Dé y Mogrovejo</strong> - Teleférico a 1.800m de altitud y pueblo idílico de Mogrovejo (escenario de películas).</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">El parking de Fuente Dé cuenta con espacio de pernocta autorizado a los pies de las murallas de piedra de Picos de Europa.</p>
    `
  },
  arte_romanico: {
    titulo: "Arte Románico en Campoo y Valderredible",
    duracion: "2 Días | 190 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/arte-romanico-en-campoo-y-valderredible.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Tesoros Esculpidos en la Roca:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Colegiata de San Pedro de Cervatos y Retortillo</strong> - Capiteles eróticos y ruinas romanas.</li>
        <li><strong>Día 2: Valderredible y San Martín de Elines</strong> - Colegiata mozárabe y la fascinante ermita rupestre de Santa María de Valverde excavada en la piedra.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Ruta muy tranquila que bordea el curso alto del río Ebro en un entorno natural relajado.</p>
    `
  },
  soba_ason: {
    titulo: "Ruta por Soba y Nacimiento del Asón",
    duracion: "2 Días | 170 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/ruta-por-soba-y-ason.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Cascadas de Vértigo y Cumbres Kársticas:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Nacimiento del río Gándara y Valle de Soba</strong> - Mirador suspendido en el aire sobre las cascadas del Gándara y la capital del valle (La Gándara).</li>
        <li><strong>Día 2: Salto del Asón y Puerto de Alisas</strong> - Espectacular cascada de cola de caballo de más de 70 metros de caída libre.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Ideal para amantes del senderismo, fotografía de naturaleza y catorce de cascadas en primavera u otoño.</p>
    `
  },
  playa_montana: {
    titulo: "Un Día de Playa y Montaña en Cantabria",
    duracion: "1 - 2 Días | 140 km",
    vehiculo: "Recomendado: Opel Vivaro o Mercedes Vito",
    fuente: "https://www.rutasporcantabria.com/un-dia-de-playa-y-montana-en-cantabria.html",
    origenFuente: "Rutas por Cantabria",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">El contraste cántabro express:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Mañana: Dunas de Liencres y Costa Quebrada</strong> - Paseo matutino por la playa de Valdearenas y formación de urros de roca en el mar.</li>
        <li><strong>Tarde: Puerto de Palombera o Liérganes</strong> - Comida típica y paseo de montaña en apenas 45 minutos de trayecto en camper.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Demuestra la magia de Cantabria: desayunar con el sonido de las olas y cenar en la montaña bajo las estrellas.</p>
    `
  },

  // FRANCIA
  montignac_vezere: {
    titulo: "Ruta por Montignac y el Valle del Vézère (Francia)",
    duracion: "4 - 5 Días | 520 km",
    vehiculo: "Recomendado: Autocaravana CI L51 o Opel Vivaro",
    fuente: "https://www.france.fr/es/articulo/ruta-coche-montignac-valle-vezere/",
    origenFuente: "France.fr - Turismo de Francia",
    detalles: `
      <h4 style="color: #1565C0; margin-bottom: 0.5rem;">Viaje Internacional desde Vitoria por la Dordoña:</h4>
      <ul style="margin-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
        <li><strong>Día 1: Vitoria-Gasteiz a Montignac-Lascaux</strong> - Salida por la A-1/AP-8 hacia el sudoeste francés. Llegada a Montignac y visita a Lascaux IV (Centro Internacional de Arte Rupestre).</li>
        <li><strong>Día 2: Les Eyzies-de-Tayac y Abri de la Madeleine</strong> - La capital mundial de la prehistoria y trogloditas a orillas del río Vézère.</li>
        <li><strong>Día 3: Castillos de Commarque y Beynac</strong> - Fortalezas medievales colgadas en acantilados calcáreos.</li>
        <li><strong>Día 4: Sarlat-la-Canéda y regreso</strong> - Paseo por la ciudad medieval mejor conservada de Europa y mercado gastronómico de foies y trufas.</li>
      </ul>
      <h4 style="color: #2E7D32; margin-bottom: 0.5rem;">Consejos Camper:</h4>
      <p style="color: #475569; font-size: 0.95rem;">Francia es el paraíso de las autocaravanas con redes de 'Aires de Camping-Car' equipadas en cada pueblo.</p>
    `
  }
};

function abrirRutaModal(clave) {
  const modal = document.getElementById('rutaModal');
  const modalBody = document.getElementById('modalBody');
  const info = itinerariosDetallados[clave];

  if (modal && modalBody && info) {
    modalBody.innerHTML = `
      <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #1565C0; margin-bottom: 0.4rem;">
        📍 Fuente oficial: <a href="${info.fuente}" target="_blank" rel="noopener noreferrer" style="color: #1565C0; text-decoration: underline;">${info.origenFuente}</a>
      </div>
      <h3 style="font-size: 1.6rem; margin-bottom: 0.3rem; color: #0F172A;">${info.titulo}</h3>
      <div style="font-weight: 700; color: #F57C00; margin-bottom: 0.3rem;">⏱️ ${info.duracion}</div>
      <div style="font-size: 0.88rem; color: #2E7D32; font-weight: 600; margin-bottom: 1.5rem;">🚐 ${info.vehiculo}</div>
      ${info.detalles}
      <div style="margin-top: 1.8rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
        <a href="${info.fuente}" target="_blank" rel="noopener noreferrer" class="btn btn-secundario" style="flex: 1; min-width: 200px;">Ver Guía Original 🔗</a>
        <a href="#flota" class="btn btn-primario" onclick="cerrarModal()" style="flex: 1; min-width: 200px;">Reservar Camper en Vitoria</a>
      </div>
    `;
    modal.classList.add('is-open');
  }
}

function cerrarModal() {
  const modal = document.getElementById('rutaModal');
  if (modal) {
    modal.classList.remove('is-open');
  }
}
