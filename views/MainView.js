import {Header} from '../components/header/header.js';
import {PostCardRender} from '../components/postCardRender/postCardRender.js';
import EventBus from '../utils/eventBus.js';
import template from '../components/error/error.handlebars';

export class MainView {
    constructor() {
        this.root = document.querySelector('#root');
        this.container = null;
        this.header = null;
        this.posts = null;

        EventBus.on('postCard:got-info', this.update.bind(this));
        EventBus.on('postCard:backend-error', this.renderError.bind(this));
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
        this.posts = new PostCardRender(postContainer);

        this.container.append(headerContainer, postContainer);
        this.root.append(this.container);

        this.header.render(headerContainer);
    }

    update(data = {}) {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return;
        }
        this.posts.innerHTML = '';
        this.posts.update(data);
    }

    renderError(data) {
        const card = document.querySelector('.posts');
        card.innerHTML = '';
        this.posts.innerHTML = '';

        const errorStatus = data.title;
        const errorText = data.description;

        const context = {errorStatus, errorText};
        const html = template(context);

        this.root.append(this.container);

        this.container.innerHTML += html;
    }
}
