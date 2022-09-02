import AdminPageView from './adminPageView';
import authManager from '../../services/authManager';

class AdminPageController {
  private view: AdminPageView;

  constructor() {
    this.view = new AdminPageView();
  }

  public createPage() {
    this.view.render();
  }
}

export default AdminPageController;
