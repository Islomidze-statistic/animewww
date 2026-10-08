# ANIME 夢 — Anime Hub

## Tailwind CSS version

Проект теперь подключает **Tailwind CSS** через официальный CDN и использует Tailwind utility-классы вместе с небольшим `style.css`.

### Почему так
Это удобно для готового статического проекта: достаточно открыть `index.html`, и не нужен Node.js/Tailwind build.

### В проекте
- Tailwind CSS CDN
- RU / EN переключатель
- темы: black/white, red, green, yellow, pink, purple
- каталог и поиск
- карточки аниме с постерами и описаниями
- 3D tilt-анимация карточек
- отдельный Blue Lock
- отдельный JoJo
- login / registration UI
- responsive layout

### Запуск
Открой `index.html` в браузере. Для Tailwind и постеров нужен интернет.

### Файлы
- `index.html` — главная
- `blue-lock.html` — Blue Lock
- `jojo.html` — JoJo
- `anime-data.js` — данные аниме
- `app.js` — логика
- `style.css` — темы и 3D/CSS-анимации
- `package.json` — метаданные проекта


## Обновление
- Добавлены 3D-эффекты карточек: perspective, tilt, depth, hover и плавное движение.
- Добавлено Избранное: сердечко на каждой карточке и сохранение через localStorage.
- Добавлен отдельный блок Избранное на главной.
- Добавлены сортировка каталога и обновление избранного без сервера.
