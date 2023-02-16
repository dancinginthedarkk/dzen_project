import {Header} from '../components/header/header.js';
import {postItem} from '../components/postItem/postItem.js';
import EventBus from '../utils/eventBus.js';
import template from '../components/error/error.handlebars';

export class PostView {
    constructor() {
        this.root = document.querySelector('#root');
        this.container = null;
        this.header = null;
        this.post = null;

        EventBus.on('postItem:got-info', this.update.bind(this));
        EventBus.on('postItem:backend-error', this.renderError.bind(this));
    }

    render() {
        this.root.innerHTML = '';
        this.container = document.createElement('div');
        this.container.classList.add('page-container');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('page-header');
        this.header = new Header(headerContainer);

        const postContainer = document.createElement('div');
        postContainer.classList.add('page-posts');
        this.post = new postItem(postContainer);

        this.container.append(headerContainer, postContainer);
        this.root.append(this.container);

        this.header.render(headerContainer);
    }

    update(data = {}) {
        if (!data || !Object.keys(data)) {
            return;
        }
        this.post.innerHTML = '';
        this.post.update(data);
    }

    renderError(data) {
        const card = document.querySelector('.card');
        card.innerHTML = '';
        this.post.innerHTML = '';

        const errorStatus = data.title;
        const errorText = data.description;

        const context = {errorStatus, errorText};
        const html = template(context);

        this.root.append(this.container);

        this.container.innerHTML += html;
    }
}
