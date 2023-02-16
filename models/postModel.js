import EventBus from '../utils/eventBus.js';
export class PostModel {
    constructor(author = null, subscribers = null, title = null, content = null, img = null, published = null) {
        this.author = author;
        this.subscribers = subscribers;
        this.title = title;
        this.content = content;
        this.img = img;
        this.published = published;
    }

    fetchData() {
        fetch('/api/posts')
            .then((response) => {
                const {status} = response;

                if (status === 404) {
                    EventBus.emit('postCard:backend-error', {title: 'Ошибка 404', description: 'Страница, которую вы запрашиваете, не существует. Возможно был введен неверный адрес.'});
                    return;
                }

                if (status === 400) {
                    EventBus.emit('postCard:backend-error', {title: 'Ошибка 400', description: 'Вы ввели некорректный запрос, проверьте данные.'});
                    return;
                }

                if (status === 500) {
                    EventBus.emit('postCard:backend-error', {title: 'Ошибка 500', description: 'Ошибка обращения к сервису. Попробуйте обновить страницу.'});
                    return;
                }

                return response.json();
            })
            .catch((error) => {
                EventBus.emit('postCard:backend-error', {title: 'Ошибка 500', description: 'Ошибка обращения к сервису. Попробуйте обновить страницу.'});
            })

            .then((data) => {
                EventBus.emit('postCard:got-info', data);
            })
    }
}
