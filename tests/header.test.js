const Page = require('./helper/page');

let page;

beforeEach(async () => {
    //console.log(page);
    page = await Page.build();
    await page.goto('http://localhost:3000');
})

afterEach(async () => {
    await page.close();
})

test('the header have the correct test', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster')
});

test('clicking log in start a Oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
})

test('when sign in test if log out buttom', async () => {
    await page.login();
    
    const text = await page.getContentsOf('a[href="/auth/logout"]');

    expect(text).toEqual('Logout');

})
