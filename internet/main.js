// Данные автомобилей каталога (1–12)
const CARS_DATA = {
  "1": { name: "2021 Toyota RAV4", price: "$26,500", img: "images/rav4/1.jpeg", mileage: "45,000 км", engine: "2.5L Dynamic Force I4", power: "203 л.с.", torque: "249 Нм", trans: "8-ст. Автомат", drive: "Полный (AWD)", accel: "8.4 сек", speed: "200 км/ч", fuel: "7.8 л / 100 км", weight: "1615 кг", tank: "55 л", body: "Кроссовер", seats: "5", desc: "Популярный надежный японский кроссовер в идеальном техническом состоянии. Один аккуратный владелец." },
  "2": { name: "2019 Honda Civic", price: "$18,200", img: "images/civic/1.jpeg", mileage: "62,000 км", engine: "2.0L DOHC i-VTEC", power: "158 л.с.", torque: "187 Нм", trans: "Механика", drive: "Передний (FWD)", accel: "8.2 сек", speed: "210 км/ч", fuel: "6.5 л / 100 км", weight: "1290 кг", tank: "47 л", body: "Седан", seats: "5", desc: "Динамичный и экономичный городской седан с отличной управляемостью и спортивным характером." },
  "3": { name: "2020 Mazda CX-5", price: "$24,000", img: "images/cx-5/1.jpeg", mileage: "38,000 км", engine: "2.5L SkyActiv-G", power: "194 л.с.", torque: "258 Нм", trans: "Автомат", drive: "Полный (AWD)", accel: "8.9 сек", speed: "205 км/ч", fuel: "7.2 л / 100 км", weight: "1560 кг", tank: "58 л", body: "Кроссовер", seats: "5", desc: "Премиальный японский кроссовер в фирменном красном цвете Soul Red с акустикой Bose и кожаным салоном." },
  "4": { name: "2018 BMW 3 Series", price: "$22,900", img: "images/bmw-3/1.jpeg", mileage: "85,000 км", engine: "2.0L TwinPower Turbo", power: "184 л.с.", torque: "270 Нм", trans: "8-ст. Автомат", drive: "Задний (RWD)", accel: "7.3 сек", speed: "235 км/ч", fuel: "6.0 л / 100 км", weight: "1500 кг", tank: "60 л", body: "Седан", seats: "5", desc: "Баварская классика с идеальной развесовкой по осям 50:50. Полная сервисная история." },
  "5": { name: "2023 Tesla Cybertruck", price: "$60,990", img: "images/cybertruck/1.jpeg", mileage: "21,000 км", engine: "Dual Motor Electric", power: "600 л.с.", torque: "750 Нм", trans: "Автомат", drive: "Полный (AWD)", accel: "4.1 сек", speed: "180 км/ч", fuel: "0 л / 100 км", weight: "2995 кг", tank: "123 кВт⋅ч", body: "Пикап", seats: "5", desc: "Футуристичный бронированный электропикап из сверхтвердой нержавеющей стали с запасом хода более 500 км." },
  "6": { name: "2017 VW Golf", price: "$14,500", img: "images/golf/1.jpeg", mileage: "92,000 км", engine: "1.4L TSI", power: "125 л.с.", torque: "200 Нм", trans: "Механика", drive: "Передний (FWD)", accel: "9.1 сек", speed: "204 км/ч", fuel: "5.3 л / 100 км", weight: "1257 кг", tank: "50 л", body: "Хэтчбек", seats: "5", desc: "Надежный и практичный немецкий хэтчбек. Эталонная эргономика и скромный расход бензина." },
  "7": { name: "2005 Mazda MX-5 Miata", price: "$15,400", img: "images/miata/1.jpeg", mileage: "28,000 км", engine: "2.0L SkyActiv-G I4", power: "181 л.с.", torque: "205 Нм", trans: "6-ст. Механика", drive: "Задний (RWD)", accel: "6.5 сек", speed: "219 км/ч", fuel: "6.9 л / 100 км", weight: "1058 кг", tank: "45 л", body: "Родстер", seats: "2", desc: "Компактный и легкий родстер с идеальной развесовкой 50:50. Отличное состояние, гаражное хранение." },
  "8": { name: "2020 Ford Mustang", price: "$29,800", img: "images/mustang/1.jpeg", mileage: "34,000 км", engine: "2.3L EcoBoost Turbo", power: "310 л.с.", torque: "475 Нм", trans: "Автомат", drive: "Задний (RWD)", accel: "5.3 сек", speed: "250 км/ч", fuel: "9.5 л / 100 км", weight: "1650 кг", tank: "60 л", body: "Купе", seats: "4", desc: "Легендарный американский маслкар с агрессивным внешним видом и отличной динамикой." },
  "9": { name: "2021 Nissan Altima", price: "$19,500", img: "images/altima/1.jpeg", mileage: "41,000 км", engine: "2.5L DOHC I4", power: "188 л.с.", torque: "244 Нм", trans: "Автомат", drive: "Передний (FWD)", accel: "7.9 сек", speed: "215 км/ч", fuel: "7.1 л / 100 км", weight: "1460 кг", tank: "61 л", body: "Седан", seats: "5", desc: "Комфортный просторный седан для дальних поездок с фирменными сиденьями Zero Gravity." },
  "10": { name: "2019 Audi A4", price: "$23,700", img: "images/audi_a4/1.jpeg", mileage: "58,000 км", engine: "2.0L TFSI Quattro", power: "249 л.с.", torque: "370 Нм", trans: "Автомат", drive: "Полный (AWD)", accel: "5.8 сек", speed: "250 км/ч", fuel: "6.8 л / 100 км", weight: "1585 кг", tank: "58 л", body: "Седан", seats: "5", desc: "Премиальный немецкий седан с фирменным полным приводом Quattro и виртуальной приборной панелью." },
  "11": { name: "2018 Subaru Outback", price: "$20,100", img: "images/outback/1.jpeg", mileage: "76,000 км", engine: "2.5L Boxer 4", power: "175 л.с.", torque: "235 Нм", trans: "Автомат", drive: "Полный (AWD)", accel: "9.6 сек", speed: "198 км/ч", fuel: "7.7 л / 100 км", weight: "1630 кг", tank: "60 л", body: "Универсал", seats: "5", desc: "Универсал повышенной проходимости с клиренсом 213 мм и постоянным полным приводом Symmetrical AWD." },
  "12": { name: "2022 Kia Sportage", price: "$27,300", img: "images/sportage/1.jpeg", mileage: "19,000 км", engine: "2.5L Smartstream", power: "187 л.с.", torque: "241 Нм", trans: "Автомат", drive: "Полный (AWD)", accel: "8.8 сек", speed: "201 км/ч", fuel: "8.1 л / 100 км", weight: "1610 кг", tank: "54 л", body: "Кроссовер", seats: "5", desc: "Стильный городской кроссовер в максимальной комплектации с панорамной крышей и цифровым кокпитом." }
};

const getPhotos = car => [1, 2, 3].map(n => car.img.replace('/1.', `/${n}.`));
const authHeaders = () => ({ 'Authorization': `Bearer ${localStorage.getItem('drivefind_token')}` });

// 1. Внешний API (Open-Meteo на contacts.html)
function initWeather() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const box = document.createElement('div');
  box.id = 'weather-widget';
  box.style.cssText = 'background:#f0f9ff; border:1px solid #bae6fd; padding:10px 14px; border-radius:12px; margin-bottom:15px; font-size:13px; color:#0369a1; transition:all 0.3s ease;';
  box.innerHTML = '⏳ <em>Загрузка погоды на площадке автосалона (Open-Meteo API)...</em>';
  form.parentNode.insertBefore(box, form);

  fetch('https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.61&current_weather=true')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(data => {
      const t = Math.round(data.current_weather.temperature);
      box.innerHTML = `🌤️ <strong>Погода на площадке дилера:</strong> ${t > 0 ? '+' : ''}${t}°C, отличные условия для тест-драйва!`;
    })
    .catch(() => {
      box.style.cssText += 'background:#fef2f2; border-color:#fecaca; color:#991b1b;';
      box.innerHTML = '⚠️ <strong>Связь с сервером погоды отсутствует:</strong> данные временно недоступны (офлайн-режим), автосалон работает в штатном режиме!';
    });
}

// 2. Форма обратной связи и валидация (contacts.html)
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const msgInput = form.querySelector('textarea');

  const makeError = el => {
    const span = document.createElement('span');
    span.style.cssText = 'color:red; font-size:12px; display:none; margin-top:-5px; margin-bottom:5px;';
    el.parentNode.insertBefore(span, el.nextSibling);
    return span;
  };

  const errors = [makeError(nameInput), makeError(emailInput), makeError(msgInput)];
  const successBox = document.createElement('div');
  successBox.style.cssText = 'color:#15803d; background:#dcfce7; padding:8px; border-radius:8px; display:none; margin-bottom:10px; font-weight:bold;';
  form.insertBefore(successBox, form.firstChild);

  const check = (input, errEl, valid, msg) => {
    errEl.innerText = msg;
    errEl.style.display = valid ? 'none' : 'block';
    input.style.borderColor = valid ? '#ccc' : 'red';
    return valid;
  };

  form.querySelector('button').addEventListener('click', e => {
    e.preventDefault();
    successBox.style.display = 'none';

    const okName = check(nameInput, errors[0], nameInput.value.trim().length >= 2, 'Введите имя (минимум 2 буквы)');
    const okEmail = check(emailInput, errors[1], emailInput.value.includes('@') && emailInput.value.includes('.'), 'Введите корректный email со знаками @ и точкой');
    const okMsg = check(msgInput, errors[2], msgInput.value.trim().length >= 5, 'Напишите сообщение не короче 5 символов');

    if (okName && okEmail && okMsg) {
      successBox.innerText = 'Спасибо! Ваше сообщение принято, скоро ответим.';
      successBox.style.display = 'block';
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameInput.value.trim(), email: emailInput.value.trim(), message: msgInput.value.trim() })
      }).catch(() => {});
      form.reset();
    }
  });
}

// 3. Фильтр в каталоге (catalogue.html)
function initCatalogueFilter() {
  const filterBox = document.querySelector('.filter-box');
  if (!filterBox) return;

  const inputs = filterBox.querySelectorAll('input');
  if (inputs.length < 6) return;

  // Синхронизация пар Min / Max (Цена, Год, Пробег)
  [[0, 1], [2, 3], [4, 5]].forEach(([minI, maxI]) => {
    const minEl = inputs[minI], maxEl = inputs[maxI];
    minEl.addEventListener('input', () => {
      if (minEl.value && maxEl.value && +minEl.value > +maxEl.value) maxEl.value = minEl.value;
    });
    maxEl.addEventListener('input', () => {
      if (minEl.value && maxEl.value && +maxEl.value < +minEl.value) minEl.value = maxEl.value;
    });
  });

  const filterError = document.createElement('div');
  filterError.style.cssText = 'color:red; font-size:13px; display:none; width:100%; text-align:center; margin-top:5px;';
  filterBox.parentNode.insertBefore(filterError, filterBox.nextSibling);

  filterBox.querySelector('button').addEventListener('click', e => {
    e.preventDefault();
    filterError.style.display = 'none';

    const minPrice = +inputs[0].value || 0, maxPrice = +inputs[1].value || Infinity;
    const minYear = parseInt(inputs[2].value, 10) || 0, maxYear = parseInt(inputs[3].value, 10) || Infinity;
    const minMile = +inputs[4].value || 0, maxMile = +inputs[5].value || Infinity;

    let visible = 0;
    document.querySelectorAll('.car-grid .card').forEach(card => {
      const price = +(card.querySelector('.price')?.innerText.replace(/[^\d]/g, '') || 0);
      const year = parseInt(card.querySelector('h3')?.innerText.slice(0, 4), 10) || 2020;
      const mile = +(card.querySelector('p')?.innerText.replace(/[^\d]/g, '') || 0);
      const show = price >= minPrice && price <= maxPrice && year >= minYear && year <= maxYear && mile >= minMile && mile <= maxMile;
      card.style.display = show ? 'flex' : 'none';
      if (show) visible++;
    });

    if (visible === 0) {
      filterError.innerText = 'По выбранным фильтрам ничего не найдено.';
      filterError.style.display = 'block';
    }
  });
}

// 4. Страница автомобиля и фотогалерея (item.html?id=...)
function initItemPage() {
  if (!document.querySelector('.gallery-card')) return;
  const h1 = document.querySelector('.item-card h1');
  if (!h1) return;

  const id = new URLSearchParams(window.location.search).get('id') || '7';
  const car = CARS_DATA[id];
  if (!car) return;

  h1.innerText = car.name;
  document.title = `DriveFind — ${car.name}`;
  const priceEl = document.querySelector('.price-large');
  if (priceEl) priceEl.innerText = car.price;
  const subEl = document.querySelector('.item-subtitle');
  if (subEl) subEl.innerText = `${car.mileage} • ${car.trans} • ${car.drive}`;
  const descEl = document.querySelector('.description');
  if (descEl) descEl.innerText = car.desc;

  const mainImg = document.querySelector('.gallery-card img');
  if (mainImg) { mainImg.src = car.img; mainImg.alt = car.name; }

  const fields = ['engine', 'power', 'torque', 'trans', 'drive', 'accel', 'speed', 'fuel', 'weight', 'tank', 'body', 'seats'];
  const vals = document.querySelectorAll('.specs-grid .spec-value');
  if (vals.length >= fields.length) fields.forEach((k, i) => { vals[i].innerText = car[k]; });

  initItemGallery(getPhotos(car));
}

function initItemGallery(photos) {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const img = document.querySelector('.gallery-card img');
  if (!prevBtn || !nextBtn || !img || !photos.length) return;

  let cur = 0;
  img.src = photos[0];

  let dotsBox = document.querySelector('.gallery-dots');
  if (!dotsBox) {
    dotsBox = document.createElement('div');
    dotsBox.className = 'gallery-dots';
    img.parentNode.appendChild(dotsBox);
  }
  dotsBox.innerHTML = '';

  const updateSlide = idx => {
    cur = (idx + photos.length) % photos.length;
    img.src = photos[cur];
    dotsBox.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  };

  photos.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.title = `Фото ${i + 1} из ${photos.length}`;
    dot.onclick = () => updateSlide(i);
    dotsBox.appendChild(dot);
  });

  prevBtn.onclick = () => updateSlide(cur - 1);
  nextBtn.onclick = () => updateSlide(cur + 1);
}

// 5. Сравнение автомобилей (compare.html)
function initComparePage() {
  const select1 = document.getElementById('car-select-1');
  const select2 = document.getElementById('car-select-2');
  if (!select1 || !select2) return;

  const keys = ['engine', 'power', 'torque', 'trans', 'drive', 'accel', 'fuel', 'weight', 'tank'];
  [select1, select2].forEach(sel => {
    sel.addEventListener('change', () => {
      const car = CARS_DATA[sel.value];
      const col = sel.closest('.compare-column-card');
      if (!car || !col) return;
      const img = col.querySelector('.compare-preview img');
      const title = col.querySelector('.compare-preview h3');
      const price = col.querySelector('.compare-preview .price-large');
      if (img) img.src = car.img;
      if (title) title.innerText = car.name;
      if (price) price.innerText = car.price;
      const rows = col.querySelectorAll('.spec-row-val');
      if (rows.length >= keys.length) keys.forEach((k, i) => { rows[i].innerText = car[k]; });
    });
  });
}

// 6. Авторизация и модальные окна (ПР 3)
function initAuthHeader() {
  const header = document.querySelector('header');
  if (!header || !header.querySelector('.nav-links')) return;

  const authBtn = document.createElement('a');
  authBtn.href = '#';
  authBtn.id = 'auth-link';
  authBtn.className = 'auth-nav-btn';
  header.appendChild(authBtn);

  const modalWrapStyle = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:9999; justify-content:center; align-items:center;';
  const inputStyle = 'width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:12px; box-sizing:border-box; font-size:14px; outline:none;';

  let authModal = document.getElementById('login-modal');
  if (!authModal) {
    authModal = document.createElement('div');
    authModal.id = 'login-modal';
    authModal.style.cssText = modalWrapStyle;
    authModal.innerHTML = `
      <div style="background:white; padding:25px; border-radius:16px; width:90%; max-width:360px; box-shadow:0 10px 25px rgba(0,0,0,0.15); position:relative; font-family:sans-serif;">
        <button id="modal-close-x" style="position:absolute; top:12px; right:15px; background:none; border:none; font-size:22px; cursor:pointer; color:#888;">&times;</button>
        <div style="display:flex; gap:10px; margin-bottom:18px; border-bottom:1px solid #eee; padding-bottom:8px;">
          <button id="tab-login" type="button" style="flex:1; background:none; border:none; font-size:16px; font-weight:bold; color:#3a71c9; cursor:pointer; padding-bottom:4px; border-bottom:2px solid #3a71c9;">Вход</button>
          <button id="tab-register" type="button" style="flex:1; background:none; border:none; font-size:16px; font-weight:bold; color:#888; cursor:pointer; padding-bottom:4px; border-bottom:2px solid transparent;">Регистрация</button>
        </div>
        <p id="modal-hint" style="font-size:13px; color:#555; margin-top:0; margin-bottom:12px; display:none;"></p>
        <div id="form-login">
          <div style="margin-bottom:12px;"><input type="text" id="login-username" placeholder="Логин" style="${inputStyle}"></div>
          <div style="margin-bottom:14px;"><input type="password" id="login-password" placeholder="Пароль" style="${inputStyle}"></div>
          <button id="login-submit-btn" class="btn" style="width:100%; padding:10px; font-size:15px; border-radius:14px;">Войти</button>
        </div>
        <div id="form-register" style="display:none;">
          <div style="margin-bottom:12px;"><input type="text" id="reg-username" placeholder="Придумайте логин (от 3 букв)" style="${inputStyle}"></div>
          <div style="margin-bottom:12px;"><input type="email" id="reg-email" placeholder="Email (например user@mail.ru)" style="${inputStyle}"></div>
          <div style="margin-bottom:14px;"><input type="password" id="reg-password" placeholder="Пароль (от 6 символов)" style="${inputStyle}"></div>
          <button id="reg-submit-btn" class="btn" style="width:100%; padding:10px; font-size:15px; border-radius:14px;">Зарегистрироваться</button>
        </div>
        <div id="modal-error" style="color:red; font-size:12px; margin-top:12px; display:none; text-align:center;"></div>
      </div>`;
    document.body.appendChild(authModal);

    const closeModal = () => { authModal.style.display = 'none'; };
    authModal.querySelector('#modal-close-x').onclick = closeModal;
    authModal.onclick = e => { if (e.target === authModal) closeModal(); };

    const tabLogin = authModal.querySelector('#tab-login');
    const tabReg = authModal.querySelector('#tab-register');
    const formLogin = authModal.querySelector('#form-login');
    const formReg = authModal.querySelector('#form-register');
    const errBox = authModal.querySelector('#modal-error');

    const setTab = isLogin => {
      tabLogin.style.color = isLogin ? '#3a71c9' : '#888';
      tabLogin.style.borderBottomColor = isLogin ? '#3a71c9' : 'transparent';
      tabReg.style.color = isLogin ? '#888' : '#3a71c9';
      tabReg.style.borderBottomColor = isLogin ? 'transparent' : '#3a71c9';
      formLogin.style.display = isLogin ? 'block' : 'none';
      formReg.style.display = isLogin ? 'none' : 'block';
      errBox.style.display = 'none';
    };
    tabLogin.onclick = () => setTab(true);
    tabReg.onclick = () => setTab(false);

    const showErr = msg => { errBox.innerText = msg; errBox.style.display = 'block'; };
    const authSubmit = (url, body, fallbackErr) => {
      errBox.style.display = 'none';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(r => r.ok ? r.json() : r.json().then(j => { throw new Error(j.detail || fallbackErr); }))
      .then(data => {
        localStorage.setItem('drivefind_token', data.token);
        localStorage.setItem('drivefind_user', data.user.username);
        closeModal();
        location.reload();
      })
      .catch(err => showErr(err.message));
    };

    authModal.querySelector('#login-submit-btn').onclick = () => {
      const u = document.getElementById('login-username').value.trim();
      const p = document.getElementById('login-password').value;
      if (!u || !p) return showErr('Заполните все поля!');
      authSubmit('/api/auth/login', { username: u, password: p }, 'Неверный логин или пароль');
    };

    authModal.querySelector('#reg-submit-btn').onclick = () => {
      const u = document.getElementById('reg-username').value.trim();
      const e = document.getElementById('reg-email').value.trim();
      const p = document.getElementById('reg-password').value;
      if (!u || !e || !p) return showErr('Заполните все поля!');
      if (p.length < 6) return showErr('Пароль должен быть не менее 6 символов!');
      authSubmit('/api/auth/register', { username: u, email: e, password: p }, 'Ошибка регистрации');
    };
  }

  let profileModal = document.getElementById('profile-modal');
  if (!profileModal) {
    profileModal = document.createElement('div');
    profileModal.id = 'profile-modal';
    profileModal.style.cssText = modalWrapStyle;
    profileModal.innerHTML = `
      <div style="background:white; padding:25px; border-radius:16px; width:90%; max-width:320px; box-shadow:0 10px 25px rgba(0,0,0,0.15); position:relative; font-family:sans-serif; text-align:center;">
        <button id="profile-close-x" style="position:absolute; top:12px; right:15px; background:none; border:none; font-size:22px; cursor:pointer; color:#888;">&times;</button>
        <div style="font-size:42px; margin-bottom:8px;">👤</div>
        <h3 id="profile-title" style="margin:0 0 6px 0; color:#1d1b16;">Аккаунт</h3>
        <p style="color:#64748b; font-size:13px; margin:0 0 18px 0;">Вы успешно авторизованы</p>
        <button id="profile-logout-btn" type="button" style="width:100%; padding:10px; background:#f43f5e; color:white; border:none; border-radius:12px; font-size:14px; cursor:pointer; font-weight:bold;">Выйти из аккаунта</button>
      </div>`;
    document.body.appendChild(profileModal);

    const closeProfile = () => { profileModal.style.display = 'none'; };
    profileModal.querySelector('#profile-close-x').onclick = closeProfile;
    profileModal.onclick = e => { if (e.target === profileModal) closeProfile(); };
    profileModal.querySelector('#profile-logout-btn').onclick = () => {
      if (localStorage.getItem('drivefind_token')) {
        fetch('/api/auth/logout', { method: 'POST', headers: authHeaders() }).catch(() => {});
      }
      localStorage.removeItem('drivefind_token');
      localStorage.removeItem('drivefind_user');
      location.reload();
    };
  }

  const savedUser = localStorage.getItem('drivefind_token') && localStorage.getItem('drivefind_user');
  authBtn.innerText = savedUser ? `👤 ${savedUser}` : 'Вход';
  authBtn.onclick = e => {
    e.preventDefault();
    if (savedUser) {
      document.getElementById('profile-title').innerText = `👤 ${savedUser}`;
      profileModal.style.display = 'flex';
    } else {
      const hint = document.getElementById('modal-hint');
      if (hint) hint.style.display = 'none';
      document.getElementById('modal-error').style.display = 'none';
      authModal.style.display = 'flex';
    }
  };

  initFavoritesButtons();
}

// 7. Избранное: отдельная страница и сердечки на карточках
const emptyBox = (icon, title, text, actionHtml) => `
  <div style="grid-column:1 / -1; text-align:center; padding:45px 20px; background:white; border-radius:16px; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <span style="font-size:42px;">${icon}</span>
    <h3 style="margin:10px 0;">${title}</h3>
    <p style="color:#64748b; font-size:14px; margin-bottom:20px;">${text}</p>
    ${actionHtml}
  </div>`;

function initFavoritesPage() {
  const grid = document.getElementById('favorites-grid');
  if (!grid) return;

  if (!localStorage.getItem('drivefind_token')) {
    grid.innerHTML = emptyBox(
      '🔒', 'Войдите, чтобы просматривать избранное',
      'Сохранённые автомобили привязываются к вашей учётной записи.',
      '<button id="fav-open-auth-btn" class="btn" style="padding:10px 24px; border-radius:12px;">Войти в аккаунт</button>'
    );
    grid.querySelector('#fav-open-auth-btn').onclick = () => {
      const modal = document.getElementById('login-modal');
      if (modal) modal.style.display = 'flex';
    };
    return;
  }

  grid.innerHTML = '<p style="grid-column:1 / -1; text-align:center; color:#888;">Загрузка избранного...</p>';

  fetch('/api/favorites', { headers: authHeaders() })
    .then(r => r.json())
    .then(cars => {
      grid.innerHTML = '';
      if (!cars || !cars.length) {
        grid.innerHTML = emptyBox(
          '🤍', 'В избранном пока пусто',
          'Выбирайте понравившиеся автомобили в каталоге и нажимайте на сердечко!',
          '<a href="catalogue.html" class="btn" style="padding:10px 24px; border-radius:12px; display:inline-block;">Перейти в каталог</a>'
        );
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
          </div>`;

        card.querySelector('.fav-btn').onclick = e => {
          e.stopPropagation();
          e.preventDefault();
          fetch(`/api/favorites/${car.id}`, { method: 'DELETE', headers: authHeaders() }).then(() => {
            card.remove();
            updateCardsFavoriteState();
            if (!grid.querySelector('.card')) initFavoritesPage();
          });
        };
        grid.appendChild(card);
      });
    })
    .catch(() => {
      grid.innerHTML = '<p style="grid-column:1 / -1; text-align:center; color:red;">Не удалось загрузить избранное</p>';
    });
}

function initFavoritesButtons() {
  document.querySelectorAll('.card').forEach(card => {
    const match = card.querySelector('a[href*="id="]')?.href.match(/id=(\d+)/);
    if (!match) return;
    const carId = parseInt(match[1], 10);

    let favBtn = card.querySelector('.fav-btn');
    if (!favBtn) {
      favBtn = document.createElement('button');
      favBtn.className = 'fav-btn';
      favBtn.type = 'button';
      favBtn.title = 'Добавить в избранное';
      favBtn.dataset.carId = carId;
      favBtn.innerHTML = '🤍';
      card.appendChild(favBtn);
    }
    favBtn.onclick = e => { e.stopPropagation(); e.preventDefault(); handleFavoriteClick(carId, favBtn); };
  });

  const itemFooter = document.querySelector('.card-footer-item');
  if (itemFooter) {
    const carId = parseInt(new URLSearchParams(window.location.search).get('id') || '7', 10);
    let itemFavBtn = itemFooter.querySelector('#item-fav-btn');
    if (!itemFavBtn) {
      itemFavBtn = document.createElement('button');
      itemFavBtn.id = 'item-fav-btn';
      itemFavBtn.className = 'btn';
      itemFavBtn.style.cssText = 'margin-top:10px; background:#fff; color:#3a71c9; border:1px solid #3a71c9; width:100%; border-radius:12px;';
      itemFavBtn.innerHTML = '🤍 В избранное';
      itemFooter.appendChild(itemFavBtn);
    }
    itemFavBtn.onclick = () => handleFavoriteClick(carId, itemFavBtn);
  }

  updateCardsFavoriteState();
}

function handleFavoriteClick(carId, btn) {
  if (!localStorage.getItem('drivefind_token')) {
    const hint = document.getElementById('modal-hint');
    if (hint) {
      hint.innerText = '💡 Войдите или зарегистрируйтесь, чтобы сохранять автомобили в избранное!';
      hint.style.display = 'block';
    }
    const authModal = document.getElementById('login-modal');
    if (authModal) authModal.style.display = 'flex';
    return;
  }

  fetch(`/api/favorites/${carId}`, {
    method: btn.classList.contains('active') ? 'DELETE' : 'POST',
    headers: authHeaders()
  })
  .then(r => { if (!r.ok) throw new Error(); updateCardsFavoriteState(); })
  .catch(() => {});
}

function updateCardsFavoriteState() {
  const navFavLinks = document.querySelectorAll('a[href="favorites.html"], #nav-fav-link');
  const setEmptyState = () => {
    navFavLinks.forEach(l => { l.innerText = 'Избранное'; });
    document.querySelectorAll('.fav-btn').forEach(b => { b.innerHTML = '🤍'; b.classList.remove('active'); });
    const itemBtn = document.getElementById('item-fav-btn');
    if (itemBtn) { itemBtn.innerHTML = '🤍 В избранное'; itemBtn.classList.remove('active'); }
  };

  if (!localStorage.getItem('drivefind_token')) return setEmptyState();

  fetch('/api/favorites', { headers: authHeaders() })
    .then(r => r.json())
    .then(cars => {
      const favIds = new Set(cars.map(c => c.id));
      const title = favIds.size ? `Избранное (${favIds.size})` : 'Избранное';
      navFavLinks.forEach(l => { l.innerText = title; });

      document.querySelectorAll('.fav-btn').forEach(b => {
        const active = favIds.has(parseInt(b.dataset.carId, 10));
        b.innerHTML = active ? '❤️' : '🤍';
        b.classList.toggle('active', active);
      });

      const itemBtn = document.getElementById('item-fav-btn');
      if (itemBtn) {
        const curId = parseInt(new URLSearchParams(window.location.search).get('id') || '7', 10);
        const active = favIds.has(curId);
        itemBtn.innerHTML = active ? '❤️ В избранном' : '🤍 В избранное';
        itemBtn.classList.toggle('active', active);
      }
    })
    .catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCatalogueFilter();
  initItemPage();
  initComparePage();
  initFavoritesPage();
  initAuthHeader();
  initWeather();
});
