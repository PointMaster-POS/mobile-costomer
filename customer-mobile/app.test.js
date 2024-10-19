import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const PORT = 4723;

const config = {
    platformName: "iOS",
    platformVersion: "14.4",
    deviceName: "iPhone 11",
    app: "path/to/your.apk or yourapp.ipa",
    automationName: "XCUITest",// UiAutomator2, Espresso, or UiAutomator1 for Android
};

const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
    await driver.init(config);
})


test('Test Accessibilty Id', async () => {
    expect(await driver.hasElementByAccessibilityId('email')).toBe(true);
    expect(await driver.hasElementByAccessibilityId('password')).toBe(true);
});