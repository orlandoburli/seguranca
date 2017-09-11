import { SegurancaUiPage } from './app.po';

describe('seguranca-ui App', () => {
  let page: SegurancaUiPage;

  beforeEach(() => {
    page = new SegurancaUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
