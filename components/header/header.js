import dzenLogoSrc from '../assets/dzen-logo.png';
import template from './header.handlebars';

const CREATE_POST = 'https://dzen.ru/profile/editor/create#brief-editor';
const VIDEO = 'https://dzen.ru/video';
const SEARCH = 'https://dzen.ru/discover';

export class Header {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const iconLogoAlt = 'Логотип Дзена';
        const iconCreateAlt = 'Иконка создания поста';
        const buttonCreateText = 'Создать';
        const buttonVideoText = 'Видео';
        const buttonSearchText = 'Поиск в Дзене';

        const context = {dzenLogoSrc, iconLogoAlt, iconCreateAlt,buttonCreateText, buttonVideoText, buttonSearchText, CREATE_POST, VIDEO, SEARCH};
        const html = template(context);
        this.parent.innerHTML += html;

    }
}

