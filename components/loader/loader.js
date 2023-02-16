import template from './loader.handlebars';

export class Loader {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const context = '';
        const html = template(context);
        this.parent.innerHTML += html;
    }
}
