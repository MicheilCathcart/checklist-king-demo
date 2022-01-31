import { ProcessKingdomPage } from './app.po';

describe('process-kingdom App', () => {
  let page: ProcessKingdomPage;

  beforeEach(() => {
    page = new ProcessKingdomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
