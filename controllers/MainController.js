import {MainView} from '../views/MainView.js';
import {PostModel} from '../models/postModel.js';
import EventBus from "../utils/eventBus.js";

export class MainController {
    process() {
        const view = new MainView();
        view.render();

        const postCards = new PostModel();
        EventBus.emit('postCard:loading');
        postCards.fetchData();
    }
}
