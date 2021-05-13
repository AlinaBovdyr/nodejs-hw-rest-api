# REST API для работы с коллекцией контактов
=============================================

### REST API поддерживаtn следующие рауты:

**@ POST /api/users/signup**
- получает body в формате {email, password}
- если в body нет каких-то обязательных полей, возвращает json с ключом {"message": <Ошибка от Joi>} и статусом 400
- если почта уже используется кем-то другим, возвращает json с ключом {"message": "Email in use"} и статусом 409
- если с body все хорошо, возвращает объект "user": {email, subscription, avatarURL} с статусом 201

**@ POST /api/users/login**
- получает body в формате {email, password}
- если в body нет каких-то обязательных полей, возвращает json с ключом {"message": <Ошибка от Joi>} и статусом 400
- если пароль или email неверный, возвращает json с ключом {"message": "Email or password is wrong"} и статусом 401
- если с body все хорошо, возвращает объект "user": {email, subscription, avatarURL} с статусом 201 и создает token

**@ POST /api/users/logout**
- берет токен из заголовков Authorization, проверяет токен на валидность
- если пользователя с таким id не существует или токены не совпадают, возвращает json с ключом {"message": "Not authorized"} и статусом 401
- если пароль или email неверный, возвращает json с ключом {"message": "Email or password is wrong"} с статусом 401
- если все хорошо, удаляет токен и возвращает статус 204

**@ GET /api/users/current**
- берет токен из заголовков Authorization, проверяет токен на валидность
- если пользователя с таким id не существует или токены не совпадают, возвращает json с ключом {"message": "Not authorized"} и статусом 401
- если все хорошо, возвращает объект {email, subscription, avatarURL} с статусом 200

**@ PATCH /api/users/avatars**
- обновляет аватарку пользователя
- получает токен из заголовков Authorization и body в формате form-data с загруженным файлом в поле avatar
- если пользователя с таким id не существует или токены не совпадают, возвращает json с ключом {"message": "Not authorized"} и статусом 401
- если все хорошо, возвращает json с ключом {"avatarURL": "ссылка на изображение"} и статусом 200


**@ GET /api/contacts**
- ничего не получает
- вызывает функцию listContacts для работы с json-файлом contacts.json
- возвращает массив всех контактов в json-формате со статусом 200

**@ GET /api/contacts/:contactId**
- получает параметр contactId
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

**@ POST /api/contacts**
- получает body в формате {name, email, phone}
- если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
- если с body все хорошо, добавляет уникальный идентификатор в объект контакта
- вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
- по результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201

**@ DELETE /api/contacts/:contactId**
- получает параметр contactId
- вызывает функцию removeContact для работы с json-файлом contacts.json
- если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
- если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

**@ PUT /api/contacts/:contactId**
- получает параметр contactId
- получает body в json-формате c обновлением любых полей name, email и phone
- если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
- если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
- по результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404

**@ PATCH /api/contacts/:contactId/favorite**
- получает параметр contactId
- получает body в json-формате c обновлением поля favorite
- если body нет, возвращает json с ключом {"message": "missing field favorite"} и статусом 400
- если с body все хорошо, вызывает функцию updateStatusContact(contactId, body) для обновления контакта в базе
- по результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404


### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
