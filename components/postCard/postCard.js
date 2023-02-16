import template from './postCard.handlebars';
export class PostCard {
    constructor(parent) {
        this.parent = parent;
    }
    render(post) {
        const {id, author, subscribers, title, content, img, published} = post;
        const context = {id, author, subscribers, title, content, img, published};
        const html = template(context);
        this.parent.innerHTML += html;
    }
}
