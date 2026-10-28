# Do Chain

Минималистичный TODO для iPhone (PWA). Повторы как в Google Календаре, приоритеты S/A/B/C/D, мотивашка дня, статистика и выгрузка в CSV/JSON. Данные хранятся на устройстве (localStorage).

## Установка на iPhone
Открой сайт в Safari → «Поделиться» → «На экран “Домой”».

## Разработка
```
node tools/serve.js   # http://localhost:5180
```
Статический сайт без сборки: `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`. Для Vercel: Framework Preset = Other, Root Directory = `./`.
