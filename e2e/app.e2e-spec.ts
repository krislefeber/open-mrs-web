import { OpenMrsPage } from './app.po';

describe('open-mrs App', () => {
  let page: OpenMrsPage;

  beforeEach(() => {
    page = new OpenMrsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
