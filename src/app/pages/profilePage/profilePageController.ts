import ProfilePageModel from './profilePageModel';
import ProfilePageView from './profilePageView';

class ProfilePageController {
    private model: ProfilePageModel;

    private view: ProfilePageView;

    constructor() {
        this.model = new ProfilePageModel();
        this.view = new ProfilePageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default ProfilePageController;
