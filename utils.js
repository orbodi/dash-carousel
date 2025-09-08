const { By, until } = require('selenium-webdriver');

async function waitAndClick(driver, locator, timeout = 10000) {
    const el = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
}

async function waitAndSendKeys(driver, locator, value, timeout = 10000) {
    const el = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.clear();
    await el.sendKeys(value);
}

async function acceptAlert(driver, timeout = 5000) {
    try {
        await driver.wait(until.alertIsPresent(), timeout);
        const alert = await driver.switchTo().alert();
        await alert.dismiss(); // annuler l'alert
    } catch (err) {
        // Pas d'alert
    }
}

module.exports = { waitAndClick, waitAndSendKeys, acceptAlert };
