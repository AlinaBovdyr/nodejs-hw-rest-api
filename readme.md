# REST API для работы с коллекцией контактов
=============================================

### REST API поддерживаtn следующие рауты:

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
- если с body все хорошо, вызывает функцию updateStatusContact(contactId, body) (напиши ее) для обновления контакта в базе
- по результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404


### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
