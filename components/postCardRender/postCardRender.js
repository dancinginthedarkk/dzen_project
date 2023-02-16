import {PostCard} from '../postCard/postCard.js';
import EventBus from '../../utils/eventBus.js';
import {Loader} from '../loader/loader.js';

export class PostCardRender {
    constructor(parent) {
        this.parent = parent;
        this.container = document.createElement('div');
        this.container.classList.add('posts')

        EventBus.on('postCard:loading', this.render.bind(this));
    }

    render(data) {
        if (!data) {
            this.container.innerHTML = '';
            const loader = new Loader(this.container);
            loader.render();
            this.parent.prepend(this.container);
            return;
        }

        data.forEach((post) => {
            const postCard = new PostCard(this.container);
            postCard.render(post);
        });
        this.parent.append(this.container);
    }

    update(data) {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.render(data);
    }
}
