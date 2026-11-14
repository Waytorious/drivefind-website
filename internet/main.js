/* ==========================================================================
   DRIVEFIND - Скрипт для практических работ № 2 и № 3
   Написан просто и понятно, чтобы легко было защитить перед преподом.
   ========================================================================== */

// Базовые данные всех 12 автомобилей из каталога (по 3 фотографии на каждое авто)
const CARS_DATA = {
  "1": {
    name: "2021 Toyota RAV4",
    price: "$26,500",
    img: "images/rav4/1.jpeg",
    photos: ["images/rav4/1.jpeg", "images/rav4/2.jpeg", "images/rav4/3.jpeg"],
    mileage: "45,000 км",
    engine: "2.5L Dynamic Force I4",
    power: "203 л.с.",
    torque: "249 Нм",
    trans: "8-ст. Автомат",
    drive: "Полный (AWD)",
    accel: "8.4 сек",
    speed: "200 км/ч",
    fuel: "7.8 л / 100 км",
    weight: "1615 кг",
    tank: "55 л",
    body: "Кроссовер",
    seats: "5",
    desc: "Популярный надежный японский кроссовер в идеальном техническом состоянии. Один аккуратный владелец."
  },
  "2": {
    name: "2019 Honda Civic",
    price: "$18,200",
    img: "images/civic/1.jpeg",
    photos: ["images/civic/1.jpeg", "images/civic/2.jpeg", "images/civic/3.jpeg"],
    mileage: "62,000 км",
    engine: "2.0L DOHC i-VTEC",
    power: "158 л.с.",
    torque: "187 Нм",
    trans: "Механика",
    drive: "Передний (FWD)",
    accel: "8.2 сек",
    speed: "210 км/ч",
    fuel: "6.5 л / 100 км",
    weight: "1290 кг",
    tank: "47 л",
    body: "Седан",
    seats: "5",
    desc: "Динамичный и экономичный городской седан с отличной управляемостью и спортивным характером."
  },
  "3": {
    name: "2020 Mazda CX-5",
    price: "$24,000",
    img: "images/cx-5/1.jpeg",
    photos: ["images/cx-5/1.jpeg", "images/cx-5/2.jpeg", "images/cx-5/3.jpeg"],
    mileage: "38,000 км",
    engine: "2.5L SkyActiv-G",
    power: "194 л.с.",
    torque: "258 Нм",
    trans: "Автомат",
    drive: "Полный (AWD)",
    accel: "8.9 сек",
    speed: "205 км/ч",
    fuel: "7.2 л / 100 км",
    weight: "1560 кг",
    tank: "58 л",
    body: "Кроссовер",
    seats: "5",
    desc: "Премиальный японский кроссовер в фирменном красном цвете Soul Red с акустикой Bose и кожаным салоном."
  },
  "4": {
    name: "2018 BMW 3 Series",
    price: "$22,900",
    img: "images/bmw-3/1.jpeg",
    photos: ["images/bmw-3/1.jpeg", "images/bmw-3/2.jpeg", "images/bmw-3/3.jpeg"],
    mileage: "85,000 км",
    engine: "2.0L TwinPower Turbo",
    power: "184 л.с.",
    torque: "270 Нм",
    trans: "8-ст. Автомат",
    drive: "Задний (RWD)",
    accel: "7.3 сек",
    speed: "235 км/ч",
    fuel: "6.0 л / 100 км",
    weight: "1500 кг",
    tank: "60 л",
    body: "Седан",
    seats: "5",
    desc: "Баварская классика с идеальной развесовкой по осям 50:50. Полная сервисная история."
  },
  "5": {
    name: "2023 Tesla Cybertruck",
    price: "$60,990",
    img: "images/cybertruck/1.jpeg",
    photos: ["images/cybertruck/1.jpeg", "images/cybertruck/2.jpeg", "images/cybertruck/3.jpeg"],
    mileage: "21,000 км",
    engine: "Dual Motor Electric",
    power: "600 л.с.",
    torque: "750 Нм",
    trans: "Автомат",
    drive: "Полный (AWD)",
    accel: "4.1 сек",
    speed: "180 км/ч",
    fuel: "0 л / 100 км",
    weight: "2995 кг",
    tank: "123 кВт⋅ч",
    body: "Пикап",
    seats: "5",
    desc: "Футуристичный бронированный электропикап из сверхтвердой нержавеющей стали с запасом хода более 500 км."
  },
  "6": {
    name: "2017 VW Golf",
    price: "$14,500",
    img: "images/golf/1.jpeg",
    photos: ["images/golf/1.jpeg", "images/golf/2.jpeg", "images/golf/3.jpeg"],
    mileage: "92,000 км",
    engine: "1.4L TSI",
    power: "125 л.с.",
    torque: "200 Нм",
    trans: "Механика",
    drive: "Передний (FWD)",
    accel: "9.1 сек",
    speed: "204 км/ч",
    fuel: "5.3 л / 100 км",
    weight: "1257 кг",
    tank: "50 л",
    body: "Хэтчбек",
    seats: "5",
    desc: "Надежный и практичный немецкий хэтчбек. Эталонная эргономика и скромный расход бензина."
  },
  "7": {
    name: "2005 Mazda MX-5 Miata",
    price: "$15,400",
    img: "images/miata/1.jpeg",
    photos: ["images/miata/1.jpeg", "images/miata/2.jpeg", "images/miata/3.jpeg"],
    mileage: "28,000 км",
    engine: "2.0L SkyActiv-G I4",
    power: "181 л.с.",
    torque: "205 Нм",
    trans: "6-ст. Механика",
    drive: "Задний (RWD)",
    accel: "6.5 сек",
    speed: "219 км/ч",
    fuel: "6.9 л / 100 км",
    weight: "1058 кг",
    tank: "45 л",
    body: "Родстер",
    seats: "2",
    desc: "Компактный и легкий родстер с идеальной развесовкой 50:50. Отличное состояние, гаражное хранение."
  },
  "8": {
    name: "2020 Ford Mustang",
    price: "$29,800",
    img: "images/mustang/1.jpeg",
    photos: ["images/mustang/1.jpeg", "images/mustang/2.jpeg", "images/mustang/3.jpeg"],
    mileage: "34,000 км",
    engine: "2.3L EcoBoost Turbo",
    power: "310 л.с.",
    torque: "475 Нм",
    trans: "Автомат",
    drive: "Задний (RWD)",
    accel: "5.3 сек",
    speed: "250 км/ч",
    fuel: "9.5 л / 100 км",
    weight: "1650 кг",
    tank: "60 л",
    body: "Купе",
    seats: "4",
    desc: "Легендарный американский маслкар с агрессивным внешним видом и отличной динамикой."
  },
  "9": {
    name: "2021 Nissan Altima",
    price: "$19,500",
    img: "images/altima/1.jpeg",
    photos: ["images/altima/1.jpeg", "images/altima/2.jpeg", "images/altima/3.jpeg"],
    mileage: "41,000 км",
    engine: "2.5L DOHC I4",
    power: "188 л.с.",
    torque: "244 Нм",
    trans: "Автомат",
    drive: "Передний (FWD)",
    accel: "7.9 сек",
    speed: "215 км/ч",
    fuel: "7.1 л / 100 км",
    weight: "1460 кг",
    tank: "61 л",
    body: "Седан",
    seats: "5",
    desc: "Комфортный просторный седан для дальних поездок с фирменными сиденьями Zero Gravity."
  },
  "10": {
    name: "2019 Audi A4",
    price: "$23,700",
    img: "images/audi_a4/1.jpeg",
    photos: ["images/audi_a4/1.jpeg", "images/audi_a4/2.jpeg", "images/audi_a4/3.jpeg"],
    mileage: "58,000 км",
    engine: "2.0L TFSI Quattro",
    power: "249 л.с.",
    torque: "370 Нм",
    trans: "Автомат",
    drive: "Полный (AWD)",
    accel: "5.8 сек",
    speed: "250 км/ч",
    fuel: "6.8 л / 100 км",
    weight: "1585 кг",
    tank: "58 л",
    body: "Седан",
    seats: "5",
    desc: "Премиальный немецкий седан с фирменным полным приводом Quattro и виртуальной приборной панелью."
  },
  "11": {
    name: "2018 Subaru Outback",
    price: "$20,100",
    img: "images/outback/1.jpeg",
    photos: ["images/outback/1.jpeg", "images/outback/2.jpeg", "images/outback/3.jpeg"],
    mileage: "76,000 км",
    engine: "2.5L Boxer 4",
    power: "175 л.с.",
    torque: "235 Нм",
    trans: "Автомат",
    drive: "Полный (AWD)",
    accel: "9.6 сек",
    speed: "198 км/ч",
    fuel: "7.7 л / 100 км",
    weight: "1630 кг",
    tank: "60 л",
    body: "Универсал",
    seats: "5",
    desc: "Универсал повышенной проходимости с клиренсом 213 мм и постоянным полным приводом Symmetrical AWD."
  },
  "12": {
    name: "2022 Kia Sportage",
    price: "$27,300",
    img: "images/sportage/1.jpeg",
    photos: ["images/sportage/1.jpeg", "images/sportage/2.jpeg", "images/sportage/3.jpeg"],
    mileage: "19,000 км",
    engine: "2.5L Smartstream",
    power: "187 л.с.",
    torque: "241 Нм",
    trans: "Автомат",
    drive: "Полный (AWD)",
    accel: "8.8 сек",
    speed: "201 км/ч",
    fuel: "8.1 л / 100 км",
    weight: "1610 кг",
    tank: "54 л",
    body: "Кроссовер",
    seats: "5",
    desc: "Стильный городской кроссовер в максимальной комплектации с панорамной крышей и цифровым кокпитом."
  }
};

// ==========================================================================
// 1. ВНЕШНИЙ API: Погода автосалона через Open-Meteo (Требование ПР 2, Часть 2)
// ==========================================================================
function initWeather() {
  const card = document.querySelector('.contact-form');
  if (!card) return;

  const weatherBox = document.createElement('div');
  weatherBox.id = 'weather-widget';
  weatherBox.style.cssText = 'background:#f0f9ff; border:1px solid #bae6fd; padding:10px 14px; border-radius:12px; margin-bottom:15px; font-size:13px; color:#0369a1; transition:all 0.3s ease;';
  weatherBox.innerHTML = '⏳ <em>Загрузка погоды на площадке автосалона (Open-Meteo API)...</em>';
  card.parentNode.insertBefore(weatherBox, card);

  fetch('https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.61&current_weather=true')
    .then(res => {
      if (!res.ok) throw new Error('Ошибка ответа сервера погоды');
      return res.json();
    })
    .then(data => {
      const temp = Math.round(data.current_weather.temperature);
      weatherBox.innerHTML = `🌤️ <strong>Погода на площадке дилера:</strong> ${temp > 0 ? '+' : ''}${temp}°C, отличные условия для тест-драйва!`;
    })
    .catch(() => {
      weatherBox.style.background = '#fef2f2';
      weatherBox.style.borderColor = '#fecaca';
      weatherBox.style.color = '#991b1b';
      weatherBox.innerHTML = `⚠️ <strong>Связь с сервером погоды отсутствует:</strong> данные временно недоступны (офлайн-режим), автосалон работает в штатном режиме!`;
    });
}

// ==========================================================================
// 2. ФОРМА ОБРАТНОЙ СВЯЗИ И ВАЛИДАЦИЯ (Требование ПР 2, contacts.html)
// ==========================================================================
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const msgInput = form.querySelector('textarea');
  const submitBtn = form.querySelector('button');

  function makeErrorSpan(afterElem) {
    const span = document.createElement('span');
    span.style.cssText = 'color:red; font-size:12px; display:none; margin-top:-5px; margin-bottom:5px;';
    afterElem.parentNode.insertBefore(span, afterElem.nextSibling);
    return span;
  }

  const nameError = makeErrorSpan(nameInput);
  const emailError = makeErrorSpan(emailInput);
  const msgError = makeErrorSpan(msgInput);

  const successBox = document.createElement('div');
  successBox.style.cssText = 'color:#15803d; background:#dcfce7; padding:8px; border-radius:8px; display:none; margin-bottom:10px; font-weight:bold;';
  form.insertBefore(successBox, form.firstChild);

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let isValid = true;

    nameError.style.display = 'none';
    emailError.style.display = 'none';
    msgError.style.display = 'none';
    successBox.style.display = 'none';

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.innerText = 'Введите имя (минимум 2 буквы)';
      nameError.style.display = 'block';
      nameInput.style.borderColor = 'red';
      isValid = false;
    } else {
      nameInput.style.borderColor = '#ccc';
    }

    if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
      emailError.innerText = 'Введите корректный email со знаками @ и точкой';
      emailError.style.display = 'block';
      emailInput.style.borderColor = 'red';
      isValid = false;
    } else {
      emailInput.style.borderColor = '#ccc';
    }

    if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
      msgError.innerText = 'Напишите сообщение не короче 5 символов';
      msgError.style.display = 'block';
      msgInput.style.borderColor = 'red';
      isValid = false;
    } else {
      msgInput.style.borderColor = '#ccc';
    }

    if (isValid) {
      successBox.innerText = 'Спасибо! Ваше сообщение принято, скоро ответим.';
      successBox.style.display = 'block';

      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: msgInput.value.trim()
        })
      }).catch(() => {});

      form.reset();
    }
  });
}

// ==========================================================================
// 3. ФИЛЬТР В КАТАЛОГЕ (3x2: Цена, Год, Пробег + Мягкая синхронизация)
// ==========================================================================
function initCatalogueFilter() {
  const filterBox = document.querySelector('.filter-box');
  if (!filterBox) return;

  const inputs = filterBox.querySelectorAll('input');
  if (inputs.length < 6) return;

  const filterBtn = filterBox.querySelector('button');

  // МЯГКАЯ АВТОКОРРЕКЦИЯ ДИАПАЗОНОВ (Мин / Макс):
  // 1. Если минимальное превысило максимальное -> максимальное мягко подтягивается до минимального
  // 2. Если максимальное стало меньше минимального -> минимальное мягко опускается до максимального
  function setupMinMaxSync(minInp, maxInp) {
    minInp.addEventListener('input', function() {
      if (minInp.value !== '' && maxInp.value !== '') {
        const minVal = parseFloat(minInp.value);
        const maxVal = parseFloat(maxInp.value);
        if (minVal > maxVal) {
          maxInp.value = minInp.value;
        }
      }
    });

    maxInp.addEventListener('input', function() {
      if (minInp.value !== '' && maxInp.value !== '') {
        const minVal = parseFloat(minInp.value);
        const maxVal = parseFloat(maxInp.value);
        if (maxVal < minVal) {
          minInp.value = maxInp.value;
        }
      }
    });
  }

  // Применяем к 3 столбцам: Цена (0, 1), Год (2, 3), Пробег (4, 5)
  setupMinMaxSync(inputs[0], inputs[1]);
  setupMinMaxSync(inputs[2], inputs[3]);
  setupMinMaxSync(inputs[4], inputs[5]);

  // Блок для ошибки если ничего не найдено
  const filterError = document.createElement('div');
  filterError.style.cssText = 'color:red; font-size:13px; display:none; width:100%; text-align:center; margin-top:5px;';
  filterBox.parentNode.insertBefore(filterError, filterBox.nextSibling);

  filterBtn.addEventListener('click', function(e) {
    e.preventDefault();
    filterError.style.display = 'none';

    const minPrice = parseFloat(inputs[0].value) || 0;
    const maxPrice = parseFloat(inputs[1].value) || Infinity;
    const minYear = parseInt(inputs[2].value) || 0;
    const maxYear = parseInt(inputs[3].value) || Infinity;
    const minMileage = parseFloat(inputs[4].value) || 0;
    const maxMileage = parseFloat(inputs[5].value) || Infinity;

    const cards = document.querySelectorAll('.car-grid .card');
    let visibleCount = 0;

    cards.forEach(card => {
      const priceText = card.querySelector('.price')?.innerText.replace(/[^\d]/g, '') || '0';
      const titleText = card.querySelector('h3')?.innerText || '';
      const pText = card.querySelector('p')?.innerText || '';

      const cardPrice = parseFloat(priceText);
      const cardYear = parseInt(titleText.slice(0, 4)) || 2020;
      const cardMileage = parseFloat(pText.replace(/[^\d]/g, '')) || 0;

      const matchPrice = cardPrice >= minPrice && cardPrice <= maxPrice;
      const matchYear = cardYear >= minYear && cardYear <= maxYear;
      const matchMileage = cardMileage >= minMileage && cardMileage <= maxMileage;

      if (matchPrice && matchYear && matchMileage) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      filterError.innerText = 'По выбранным фильтрам ничего не найдено.';
      filterError.style.display = 'block';
    }
  });
}

// ==========================================================================
// 4. ДИНАМИЧЕСКАЯ СТРАНИЦА АВТОМОБИЛЯ (item.html?id=...)
// ==========================================================================
function initItemPage() {
  if (!document.querySelector('.gallery-card')) return; // мы не на странице товара
  const h1 = document.querySelector('.item-card h1');
  if (!h1) return;

  // Считываем ID автомобиля из строки браузера (?id=...)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '7'; // по умолчанию Миата (id=7)
  const car = CARS_DATA[id];

  if (!car) return;

  // 1. Название и вкладка браузера
  h1.innerText = car.name;
  document.title = `DriveFind — ${car.name}`;

  // 2. Цена и пробег
  const priceElem = document.querySelector('.price-large');
  if (priceElem) priceElem.innerText = car.price;

  const subtitle = document.querySelector('.item-subtitle');
  if (subtitle) subtitle.innerText = `${car.mileage} • ${car.trans} • ${car.drive}`;

  // 3. Описание
  const desc = document.querySelector('.description');
  if (desc && car.desc) desc.innerText = car.desc;

  // 4. Главная фотография
  const mainImg = document.querySelector('.gallery-card img');
  if (mainImg) {
    mainImg.src = car.img;
    mainImg.alt = car.name;
  }

  // 5. Заполняем характеристики в таблице
  const specValues = document.querySelectorAll('.specs-grid .spec-value');
  if (specValues.length >= 12) {
    specValues[0].innerText = car.engine;
    specValues[1].innerText = car.power;
    specValues[2].innerText = car.torque;
    specValues[3].innerText = car.trans;
    specValues[4].innerText = car.drive;
    specValues[5].innerText = car.accel;
    specValues[6].innerText = car.speed || '210 км/ч';
    specValues[7].innerText = car.fuel;
    specValues[8].innerText = car.weight;
    specValues[9].innerText = car.tank;
    specValues[10].innerText = car.body;
    specValues[11].innerText = car.seats || '5';
  }

  // 6. Подключаем листание 3-х фото для этой машины
  initItemGallery(car.photos || [car.img]);
}

function initItemGallery(photos) {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const galleryImg = document.querySelector('.gallery-card img');
  if (!prevBtn || !nextBtn || !galleryImg || !photos || photos.length === 0) return;

  let curIndex = 0;
  galleryImg.src = photos[0];

  // Создаем точки-индикаторы для фото (1/3, 2/3, 3/3)
  let dotsContainer = document.querySelector('.gallery-dots');
  if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-dots';
    galleryImg.parentNode.appendChild(dotsContainer);
  }
  dotsContainer.innerHTML = '';

  photos.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
    dot.setAttribute('title', `Фото ${idx + 1} из ${photos.length}`);
    dot.onclick = () => updateSlide(idx);
    dotsContainer.appendChild(dot);
  });

  function updateSlide(idx) {
    curIndex = (idx + photos.length) % photos.length;
    galleryImg.src = photos[curIndex];
    const dots = dotsContainer.querySelectorAll('.gallery-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === curIndex);
    });
  }

  prevBtn.onclick = function() {
    updateSlide(curIndex - 1);
  };

  nextBtn.onclick = function() {
    updateSlide(curIndex + 1);
  };
}

// ==========================================================================
// 5. СРАВНЕНИЕ АВТОМОБИЛЕЙ (compare.html)
// ==========================================================================
function initComparePage() {
  const select1 = document.getElementById('car-select-1');
  const select2 = document.getElementById('car-select-2');
  if (!select1 || !select2) return;

  function updateColumn(colCard, car) {
    if (!colCard || !car) return;
    const img = colCard.querySelector('.compare-preview img');
    const title = colCard.querySelector('.compare-preview h3');
    const price = colCard.querySelector('.compare-preview .price-large');

    if (img) img.src = car.img;
    if (title) title.innerText = car.name;
    if (price) price.innerText = car.price;

    const rows = colCard.querySelectorAll('.spec-row-val');
    if (rows.length >= 9) {
      rows[0].innerText = car.engine;
      rows[1].innerText = car.power;
      rows[2].innerText = car.torque;
      rows[3].innerText = car.trans;
      rows[4].innerText = car.drive;
      rows[5].innerText = car.accel;
      rows[6].innerText = car.fuel;
      rows[7].innerText = car.weight;
      rows[8].innerText = car.tank;
    }
  }

  select1.addEventListener('change', function() {
    const car = CARS_DATA[select1.value];
    const colCard = select1.closest('.compare-column-card');
    updateColumn(colCard, car);
  });

  select2.addEventListener('change', function() {
    const car = CARS_DATA[select2.value];
    const colCard = select2.closest('.compare-column-card');
    updateColumn(colCard, car);
  });
}

// ==========================================================================
// 6. АВТОРИЗАЦИЯ ДЛЯ ПР 3 (Серверная часть FastAPI)
// ==========================================================================
function initAuthHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const nav = header.querySelector('.nav-links');
  if (!nav) return;

  const authBtn = document.createElement('a');
  authBtn.href = '#';
  authBtn.id = 'auth-link';
  authBtn.style.cssText = 'color: #3a71c9; cursor: pointer; display: inline-flex; align-items: center; vertical-align: middle;';
  nav.appendChild(authBtn);

  // 1. Модальное окно Входа и Регистрации (переключение по табам)
  let authModal = document.getElementById('login-modal');
  if (!authModal) {
    authModal = document.createElement('div');
    authModal.id = 'login-modal';
    authModal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:9999; justify-content:center; align-items:center;';
    authModal.innerHTML = `
      <div style="background:white; padding:25px; border-radius:16px; width:90%; max-width:360px; box-shadow:0 10px 25px rgba(0,0,0,0.15); position:relative; font-family:sans-serif;">
        <button id="modal-close-x" style="position:absolute; top:12px; right:15px; background:none; border:none; font-size:22px; cursor:pointer; color:#888;">&times;</button>
        
        <!-- Вкладки: Вход / Регистрация -->
        <div style="display:flex; gap:10px; margin-bottom:18px; border-bottom:1px solid #eee; padding-bottom:8px;">
          <button id="tab-login" type="button" style="flex:1; background:none; border:none; font-size:16px; font-weight:bold; color:#3a71c9; cursor:pointer; padding-bottom:4px; border-bottom:2px solid #3a71c9;">Вход</button>
          <button id="tab-register" type="button" style="flex:1; background:none; border:none; font-size:16px; font-weight:bold; color:#888; cursor:pointer; padding-bottom:4px; border-bottom:2px solid transparent;">Регистрация</button>
        </div>

        <p id="modal-hint" style="font-size:13px; color:#555; margin-top:0; margin-bottom:12px; display:none;"></p>

        <!-- Форма Входа -->
        <div id="form-login">
          <div style="margin-bottom:12px;">
            <input type="text" id="login-username" placeholder="Логин" style="width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:12px; box-sizing:border-box; font-size:14px; outline:none;">
          </div>
          <div style="margin-bottom:14px;">
            <input type="password" id="login-password" placeholder="Пароль" style="width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:12px; box-sizing:border-box; font-size:14px; outline:none;">
          </div>
          <button id="login-submit-btn" class="btn" style="width:100%; padding:10px; font-size:15px; border-radius:14px;">Войти</button>
        </div>

        <!-- Форма Регистрации -->
        <div id="form-register" style="display:none;">
          <div style="margin-bottom:12px;">
            <input type="text" id="reg-username" placeholder="Придумайте логин (от 3 букв)" style="width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:12px; box-sizing:border-box; font-size:14px; outline:none;">
          </div>
          <div style="margin-bottom:12px;">
            <input type="email" id="reg-email" placeholder="Email (например user@mail.ru)" style="width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:12px; box-sizing:border-box; font-size:14px; outline:none;">
          </div>
          <div style="margin-bottom:14px;">
            <input type="password" id="reg-password" placeholder="Пароль (от 6 символов)" style="width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:12px; box-sizing:border-box; font-size:14px; outline:none;">
          </div>
          <button id="reg-submit-btn" class="btn" style="width:100%; padding:10px; font-size:15px; border-radius:14px;">Зарегистрироваться</button>
        </div>

        <div id="modal-error" style="color:red; font-size:12px; margin-top:12px; display:none; text-align:center;"></div>
      </div>
    `;
    document.body.appendChild(authModal);

    const closeModal = () => { authModal.style.display = 'none'; };
    authModal.querySelector('#modal-close-x').onclick = closeModal;
    authModal.onclick = (e) => { if (e.target === authModal) closeModal(); };

    // Переключение табов Вход / Регистрация
    const tabLogin = authModal.querySelector('#tab-login');
    const tabReg = authModal.querySelector('#tab-register');
    const formLogin = authModal.querySelector('#form-login');
    const formReg = authModal.querySelector('#form-register');
    const errBox = authModal.querySelector('#modal-error');

    tabLogin.onclick = () => {
      tabLogin.style.color = '#3a71c9';
      tabLogin.style.borderBottomColor = '#3a71c9';
      tabReg.style.color = '#888';
      tabReg.style.borderBottomColor = 'transparent';
      formLogin.style.display = 'block';
      formReg.style.display = 'none';
      errBox.style.display = 'none';
    };

    tabReg.onclick = () => {
      tabReg.style.color = '#3a71c9';
      tabReg.style.borderBottomColor = '#3a71c9';
      tabLogin.style.color = '#888';
      tabLogin.style.borderBottomColor = 'transparent';
      formReg.style.display = 'block';
      formLogin.style.display = 'none';
      errBox.style.display = 'none';
    };

    // Отправка Входа
    authModal.querySelector('#login-submit-btn').onclick = function() {
      const u = document.getElementById('login-username').value.trim();
      const p = document.getElementById('login-password').value;
      errBox.style.display = 'none';

      if (!u || !p) {
        errBox.innerText = 'Заполните все поля!';
        errBox.style.display = 'block';
        return;
      }

      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      })
      .then(res => {
        if (!res.ok) throw new Error('Неверный логин или пароль');
        return res.json();
      })
      .then(data => {
        localStorage.setItem('drivefind_token', data.token);
        localStorage.setItem('drivefind_user', data.user.username);
        closeModal();
        location.reload();
      })
      .catch(err => {
        errBox.innerText = err.message;
        errBox.style.display = 'block';
      });
    };

    // Отправка Регистрации
    authModal.querySelector('#reg-submit-btn').onclick = function() {
      const u = document.getElementById('reg-username').value.trim();
      const e = document.getElementById('reg-email').value.trim();
      const p = document.getElementById('reg-password').value;
      errBox.style.display = 'none';

      if (!u || !e || !p) {
        errBox.innerText = 'Заполните все поля!';
        errBox.style.display = 'block';
        return;
      }
      if (p.length < 6) {
        errBox.innerText = 'Пароль должен быть не менее 6 символов!';
        errBox.style.display = 'block';
        return;
      }

      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, email: e, password: p })
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(j => { throw new Error(j.detail || 'Ошибка регистрации'); });
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem('drivefind_token', data.token);
        localStorage.setItem('drivefind_user', data.user.username);
        closeModal();
        location.reload();
      })
      .catch(err => {
        errBox.innerText = err.message;
        errBox.style.display = 'block';
      });
    };
  }

  // 2. Модальное окно Профиля (простое окно аккаунта с кнопкой выхода)
  let profileModal = document.getElementById('profile-modal');
  if (!profileModal) {
    profileModal = document.createElement('div');
    profileModal.id = 'profile-modal';
    profileModal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:9999; justify-content:center; align-items:center;';
    profileModal.innerHTML = `
      <div style="background:white; padding:25px; border-radius:16px; width:90%; max-width:320px; box-shadow:0 10px 25px rgba(0,0,0,0.15); position:relative; font-family:sans-serif; text-align:center;">
        <button id="profile-close-x" style="position:absolute; top:12px; right:15px; background:none; border:none; font-size:22px; cursor:pointer; color:#888;">&times;</button>
        <div style="font-size:42px; margin-bottom:8px;">👤</div>
        <h3 id="profile-title" style="margin:0 0 6px 0; color:#1d1b16;">Аккаунт</h3>
        <p style="color:#64748b; font-size:13px; margin:0 0 18px 0;">Вы успешно авторизованы</p>
        <button id="profile-logout-btn" type="button" style="width:100%; padding:10px; background:#f43f5e; color:white; border:none; border-radius:12px; font-size:14px; cursor:pointer; font-weight:bold;">Выйти из аккаунта</button>
      </div>
    `;
    document.body.appendChild(profileModal);

    const closeProfile = () => { profileModal.style.display = 'none'; };
    profileModal.querySelector('#profile-close-x').onclick = closeProfile;
    profileModal.onclick = (e) => { if (e.target === profileModal) closeProfile(); };

    profileModal.querySelector('#profile-logout-btn').onclick = () => {
      const token = localStorage.getItem('drivefind_token');
      if (token) {
        fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }).catch(() => {});
      }
      localStorage.removeItem('drivefind_token');
      localStorage.removeItem('drivefind_user');
      location.reload();
    };
  }

  const savedToken = localStorage.getItem('drivefind_token');
  const savedUser = localStorage.getItem('drivefind_user');

  if (savedToken && savedUser) {
    authBtn.innerText = `👤 ${savedUser}`;
    authBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('profile-title').innerText = `👤 ${savedUser}`;
      profileModal.style.display = 'flex';
    });
  } else {
    authBtn.innerText = 'Вход';
    authBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const hint = document.getElementById('modal-hint');
      if (hint) hint.style.display = 'none';
      document.getElementById('modal-error').style.display = 'none';
      authModal.style.display = 'flex';
    });
  }

  // Подключение сердечек на карточках машин
  initFavoritesButtons();
}

// 3. Отдельная страница "Избранное" (favorites.html)
function initFavoritesPage() {
  const grid = document.getElementById('favorites-grid');
  if (!grid) return;

  const token = localStorage.getItem('drivefind_token');
  if (!token) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 45px 20px; background: white; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <span style="font-size: 42px;">🔒</span>
        <h3 style="margin: 10px 0;">Войдите, чтобы просматривать избранное</h3>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
          Сохранённые автомобили привязываются к вашей учётной записи.
        </p>
        <button id="fav-open-auth-btn" class="btn" style="padding: 10px 24px; border-radius: 12px;">Войти в аккаунт</button>
      </div>
    `;
    const openBtn = grid.querySelector('#fav-open-auth-btn');
    if (openBtn) {
      openBtn.onclick = () => {
        const modal = document.getElementById('login-modal');
        if (modal) modal.style.display = 'flex';
      };
    }
    return;
  }

  grid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; color:#888;">Загрузка избранного...</p>';

  fetch('/api/favorites', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(r => r.json())
  .then(cars => {
    grid.innerHTML = '';
    if (!cars || cars.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 45px 20px; background: white; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <span style="font-size: 42px;">🤍</span>
          <h3 style="margin: 10px 0;">В избранном пока пусто</h3>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
            Выбирайте понравившиеся автомобили в каталоге и нажимайте на сердечко!
          </p>
          <a href="catalogue.html" class="btn" style="padding: 10px 24px; border-radius: 12px; display: inline-block;">Перейти в каталог</a>
        </div>
      `;
      return;
    }

    cars.forEach(car => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = `fav-card-${car.id}`;
      card.innerHTML = `
        <button class="fav-btn active" type="button" data-car-id="${car.id}" title="Удалить из избранного">❤️</button>
        <img src="${car.image_url}" alt="${car.brand} ${car.model}">
        <h3>${car.year} ${car.brand} ${car.model}</h3>
        <p>${car.mileage ? car.mileage.toLocaleString() + ' км' : ''} • ${car.transmission}</p>
        <div class="card-footer">
          <span class="price">$${car.price.toLocaleString()}</span>
          <a href="item.html?id=${car.id}" class="btn">Подробнее</a>
        </div>
      `;

      const favBtn = card.querySelector('.fav-btn');
      favBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        fetch(`/api/favorites/${car.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(() => {
          card.remove();
          updateCardsFavoriteState();
          if (grid.querySelectorAll('.card').length === 0) {
            initFavoritesPage();
          }
        });
      };

      grid.appendChild(card);
    });
  })
  .catch(() => {
    grid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; color:red;">Не удалось загрузить избранное</p>';
  });
}

// 3. Сердечки (Избранное) на всех карточках машин
function initFavoritesButtons() {
  const token = localStorage.getItem('drivefind_token');
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const link = card.querySelector('a[href*="id="]');
    if (!link) return;
    const match = link.href.match(/id=(\d+)/);
    if (!match) return;
    const carId = parseInt(match[1], 10);

    let favBtn = card.querySelector('.fav-btn');
    if (!favBtn) {
      favBtn = document.createElement('button');
      favBtn.className = 'fav-btn';
      favBtn.setAttribute('type', 'button');
      favBtn.setAttribute('title', 'Добавить в избранное');
      favBtn.dataset.carId = carId;
      favBtn.innerHTML = '🤍';
      card.appendChild(favBtn);
    }

    favBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      handleFavoriteClick(carId, favBtn);
    };
  });

  // Также на странице item.html (под кнопкой связи)
  const itemFooter = document.querySelector('.card-footer-item');
  if (itemFooter) {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id') || '7', 10);
    let itemFavBtn = itemFooter.querySelector('#item-fav-btn');
    if (!itemFavBtn) {
      itemFavBtn = document.createElement('button');
      itemFavBtn.id = 'item-fav-btn';
      itemFavBtn.className = 'btn';
      itemFavBtn.style.cssText = 'margin-top:10px; background:#fff; color:#3a71c9; border:1px solid #3a71c9; width:100%; border-radius:12px;';
      itemFavBtn.innerHTML = '🤍 В избранное';
      itemFooter.appendChild(itemFavBtn);
    }
    itemFavBtn.onclick = () => handleFavoriteClick(carId, itemFavBtn, true);
  }

  updateCardsFavoriteState();
}

function handleFavoriteClick(carId, btnElement, isItemPage = false) {
  const token = localStorage.getItem('drivefind_token');
  if (!token) {
    const authModal = document.getElementById('login-modal');
    const hint = document.getElementById('modal-hint');
    if (hint) {
      hint.innerText = '💡 Войдите или зарегистрируйтесь, чтобы сохранять автомобили в избранное!';
      hint.style.display = 'block';
    }
    if (authModal) authModal.style.display = 'flex';
    return;
  }

  const isFav = btnElement.classList.contains('active');
  const method = isFav ? 'DELETE' : 'POST';

  fetch(`/api/favorites/${carId}`, {
    method: method,
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => {
    if (!res.ok) throw new Error('Ошибка');
    updateCardsFavoriteState();
  })
  .catch(() => {});
}

function updateCardsFavoriteState() {
  const token = localStorage.getItem('drivefind_token');
  const navFavLinks = document.querySelectorAll('a[href="favorites.html"], #nav-fav-link');

  if (!token) {
    navFavLinks.forEach(l => l.innerText = 'Избранное');
    document.querySelectorAll('.fav-btn').forEach(b => {
      b.innerHTML = '🤍';
      b.classList.remove('active');
    });
    const itemBtn = document.getElementById('item-fav-btn');
    if (itemBtn) {
      itemBtn.innerHTML = '🤍 В избранное';
      itemBtn.classList.remove('active');
    }
    return;
  }

  fetch('/api/favorites', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(r => r.json())
  .then(cars => {
    const favIds = new Set(cars.map(c => c.id));
    const title = favIds.size > 0 ? `Избранное (${favIds.size})` : 'Избранное';
    navFavLinks.forEach(l => l.innerText = title);

    document.querySelectorAll('.fav-btn').forEach(b => {
      const id = parseInt(b.dataset.carId, 10);
      if (favIds.has(id)) {
        b.innerHTML = '❤️';
        b.classList.add('active');
      } else {
        b.innerHTML = '🤍';
        b.classList.remove('active');
      }
    });

    const itemBtn = document.getElementById('item-fav-btn');
    if (itemBtn) {
      const urlParams = new URLSearchParams(window.location.search);
      const carId = parseInt(urlParams.get('id') || '7', 10);
      if (favIds.has(carId)) {
        itemBtn.innerHTML = '❤️ В избранном';
        itemBtn.classList.add('active');
      } else {
        itemBtn.innerHTML = '🤍 В избранное';
        itemBtn.classList.remove('active');
      }
    }
  })
  .catch(() => {});
}

// ==========================================================================
// ТОЧКА ВХОДА (Запуск функций при загрузке страницы)
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initCatalogueFilter();
  initItemPage();
  initComparePage();
  initFavoritesPage();
  initAuthHeader();
  initWeather();
});
