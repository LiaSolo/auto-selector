# Автоселектор

Нужен для объявления финалистов на Унивидении. Проект написан на React,
для анимации использован Framer Motion. На проекте используются вебсокеты
для коммуникации между страницами настроек и интерфейсной частью.

## Доступные страницы

- `/` - объявление финалистов для полуфинала
- `/final` - объявление финалистов для финала
- `/settings` - настройки для полуфинала
- `/final-settings` - настройки для финала

## Как настроить проект

В файле `src/config.js` указан список факультетов, их лого и цвета.
Также там прописан адрес бэкенда и веб-сокета.

Для изменения фона можно просто заменить файл `/assets/BGTimer.gif`.

### Полуфинал

На странице `settings` есть опции с выбором факультетов-участников,
сначала нужно выбрать их, отправить на сервер. После этого заполнить победителей. 
Также нужно всегда заполнять поле "пароль", он валидируется на сервере.

Для того, чтобы на странице с финалистами объявился следующий финалист нужно нажать на кнопку "продвинуть сюжет",
перед этим также заполнить "пароль".

### Финал

На странице `final-settings` есть опции с выбором факультетов-участников,
при выборе факультета сразу отображается форма для ввода его баллов.
Нужно заполнить все факультеты и отправить их на сервер. Также нужно всегда заполнять поле "пароль", он валидируется на сервере.

Для того, чтобы на странице с финалистами объявился следующий финалист нужно нажать на кнопку "продвинуть сюжет",
перед этим также заполнить "пароль".

## Как поднять проект локально

```
npm i

npm start
```

## Как задеплоить проект

```
npm run build
```


## Репозиторий бэкенда для этого проекта

https://github.com/konnovK/univision2022backend

# Полезные заметки и гайды 

- Статический сервер: https://create-react-app.dev/docs/deployment/ 
- Привязать домен с помощью apache2: https://2domains.ru/support/vps-i-servery/nastroyka-virtualnykh-khostov-apache-na-ubuntu 
- System limit for number of file watchers reached: https://bobbyhadz.com/blog/system-limit-for-number-of-file-watchers-reached 
- Доступ к файлам сервера по FTP можно устроить с помощью FileZilla 
- Можно подключиться к серверу по ssh и редактировать прямо в Visual Studio Code (установить расширение Remote SSH) 
- Количество факультетов в строке: `src/pages/<название страницы>/style.css` .FacultyPointList grid-template-rows: 1fr - столько раз, сколько элементов в строке 
- С полуфиналами в этом году не работали, но скорее всего в `src/pages/<Settings>/index.js` надо будет заменить handleClickSendMessage на код ниже (см. `src/pages/<FinalSettings>/index.js`)
```
import useWebSocket from 'react-use-websocket';

const { sendMessage } = useWebSocket(socketUrl);

    const handleClickSendMessage = (event) => {
        setFetching((prev) => ({...prev, ok: "", error: "", loading: true}))
        event.preventDefault()
        sendMessage('111');
        setFetching((prev) => ({...prev, ok: "все оки"}));
        setFetching((prev) => ({...prev, loading: false}));
    }
```
- Чтобы изменить цвет полос факультетов, которым выставлены зрительскиие баллы, изменить `setTimeout(() => setColor('rgba(155,255,148,0.5)'), 3000)` согласно кодам цветов rgb в `src/components/FacultyPoints/index.js`
```
useEffect(() => {
        if (currFac && id === currFac.faculty) {
            setColor('rgba(0, 0, 0, 0.5)');
            setTimeout(() => setColor('rgba(155,255,148,0.5)'), 3000);
        }
    }, [currFac])
```
