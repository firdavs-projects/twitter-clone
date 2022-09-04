import AdminPageView from './adminPageView';

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
