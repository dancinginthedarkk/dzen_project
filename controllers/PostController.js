import {PostView} from '../views/PostView.js';
import {postItemModel} from '../models/postItemModel.js';
import EventBus from '../utils/eventBus.js';

export class PostController {
    process(id) {
        const view = new PostView();
        view.render();

        const postCard = new postItemModel();
        EventBus.emit('postItem:loading');
        postCard.fetchDataById(id);
    }
}
