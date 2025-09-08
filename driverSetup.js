const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function createDriver() {
    const options = new chrome.Options();
    options.setAcceptInsecureCerts(true);
    options.addArguments('--ignore-certificate-errors');
    options.addArguments('--ignore-ssl-errors');
    options.addArguments('--start-maximized');
    
    return await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
}

module.exports = { createDriver };
