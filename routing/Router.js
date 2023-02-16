import {MainController} from '../controllers/MainController.js';
import {PostController} from '../controllers/PostController.js';

const routes = [
    {
        path: `^/$`,
        controller: MainController
    },
    {
        path: `/posts/(\\d+)`,
        controller: PostController
    },
];

export class Router {
    constructor() {
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }

    onDocumentClick(event) {
        const {target} = event;
        const {tagName} = target;

        if (tagName === 'A') {

            if (target.href !== undefined) {
                this.go(target.href);
            }
        }
    }

    go(pathname) {
        window.history.pushState({}, '', pathname);
        this.invokeController();
    }
    invokeController() {
        let id;
        const {pathname} = window.location;
        const regexId = `/posts/(\\d+)`;
        if (pathname.match(regexId)) {
            id = pathname.match(regexId)[1];
        }

        const result = routes.find((route) => {
            const regex = new RegExp(route.path);
            const matches = pathname.match(regex);
            return Boolean(matches);
        });

        const ControllerClass = result.controller;
        const controller = new ControllerClass();

        if (ControllerClass === PostController) {
            controller.process(id);
        }
        else {
            controller.process();
        }
    }

    start() {
        window.addEventListener('popstate', this.invokeController);
        document.addEventListener('click', this.onDocumentClick);
        this.invokeController();
    }

    stop() {
        document.removeEventListener('click', this.onDocumentClick);
    }
}

export const router = new Router();
