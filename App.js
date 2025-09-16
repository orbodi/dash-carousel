#!/usr/bin/env node

require('dotenv').config();

// App.js
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/** ========= CONFIG ========= **/
const DISPLAY_TIME = 60000; // temps d'affichage par onglet (ms)
const SCROLL_STEP = 300;    // pixels par scroll
const SCROLL_INTERVAL = 10000; // intervalle entre deux scrolls (ms)


const dashboards = [
    {
        name: 'Solar',
        url: 'https://monitor.eid.local/Orion/Login.aspx?ReturnUrl=%2fOrion%2fSummaryView.aspx',
        login: {
            usernameSel: By.id('ctl00_BodyContent_Username'),
            passwordSel: By.id('ctl00_BodyContent_Password'),
            submitSel:   By.id('ctl00_BodyContent_LoginButton'),
            username: process.env.SOLAR_USER,
            password: process.env.SOLAR_PASS
        },
        readyCheck: By.css('.ResourceContainer'),
        isVisibleInCarousel: true
    },
    {
        name: 'Palo',
        url: 'https://172.16.11.23/php/login.php',
        login: {
            usernameSel: By.id('user'),
            passwordSel: By.id('passwd'),
            submitSel:   By.id('trLoginBtn'),
            username: process.env.PALO_USER,
            password: process.env.PALO_PASS
        },
        readyCheck: By.id('ext-gen93'),
        isVisibleInCarousel: true
    },
    {
        name: 'F5',
        url: 'https://172.16.11.26',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('passwd'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.F5_USER,
            password: process.env.F5_PASS
        },
        consentSel: By.name('.-primary'),
        linkId: By.id('mainmenu-statistics-dashboard'),
        readyCheck: By.id('panels'),
        isVisibleInCarousel: false
    },
    {
        name: 'F5 - Dashboard 2',
        url: 'https://172.16.11.26/tmui/tmui/dashboard/app/index.html?xui=false#/?name=ltm.js',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('passwd'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.F5_USER,
            password: process.env.F5_PASS
        },
        consentSel: By.name('.-primary'),
        linkId: By.id('mainmenu-statistics-dashboard'),
        readyCheck: By.id('grid'),
        isVisibleInCarousel: true
    },
    {
        name: 'F5 - Dashboard 1',
        url: 'https://172.16.11.26/tmui/tmui/dashboard/app/index.html?xui=false#/?name=sys.js',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('passwd'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.F5_USER,
            password: process.env.F5_PASS
        },
        consentSel: By.name('.-primary'),
        linkId: By.id('mainmenu-statistics-dashboard'),
        readyCheck: By.css('.canvas'),
        isVisibleInCarousel: true
    },
    {
        name: 'Forti',
        url: 'https://172.16.11.35/',
        login: {
            usernameSel: By.name('username'),
            passwordSel: By.name('secretkey'),
            submitSel:   By.css('button[type="button"]'),
            username: process.env.FORTI_USER,
            password: process.env.FORTI_PASS
        },
        readyCheck: By.css('.module-list'),
        isVisibleInCarousel: true
    },
    {
        name: 'Appstra',
        url: 'https://172.16.10.5',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('password'),
            submitSel:   By.id('login-btn'),
            username: process.env.APPSTRA_USER,
            password: process.env.APPSTRA_PASS
        },
        readyCheck: By.css('.main-content-wrapper'),
        isVisibleInCarousel: true
    },
    {
        name: 'Appstra',
        url: 'https://172.16.10.5/#/devices/systems',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('password'),
            submitSel:   By.id('login-btn'),
            username: process.env.APPSTRA_USER,
            password: process.env.APPSTRA_PASS
        },
        readyCheck: By.css('.main-content-wrapper'),
        isVisibleInCarousel: true
    },
    {
        name: 'Appstra',
        url: 'https://172.16.10.5/#/blueprints/d0923191-4420-4319-87a0-3f0ffb441983/dashboard',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('password'),
            submitSel:   By.id('login-btn'),
            username: process.env.APPSTRA_USER,
            password: process.env.APPSTRA_PASS
        },
        readyCheck: By.css('.main-content-wrapper'),
        isVisibleInCarousel: true
    },
    {
        name: 'Graylog',
        url: 'http://172.16.54.96',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('password'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.GRAYLOG_USER,
            password: process.env.GRAYLOG_PASS
        },
        readyCheck: By.css('.sc-fSoaGE'),
        isVisibleInCarousel: true
    },
    {
        name: 'DDOS',
        url: 'https://172.16.11.30',
        login: {
            usernameSel: By.name('username'),
            passwordSel: By.name('password'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.DDOS_USER,
            password: process.env.DDOS_PASS
        },
        consentSel: By.id('banner_button'),
        forceVisiblePassword: true,
        readyCheck: By.css('.page-container'),
        isVisibleInCarousel: true
    },
    {
        name: 'DDOS-PROTECT-GROUPS',
        url: 'https://172.16.11.30/groups/list/',
        login: {
            usernameSel: By.name('username'),
            passwordSel: By.name('password'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.DDOS_USER,
            password: process.env.DDOS_PASS
        },
        consentSel: By.id('banner_button'),
        forceVisiblePassword: true,
        readyCheck: By.css('.page-container'),
        isVisibleInCarousel: true
    },
    {
        name: 'LogRhythm',
        url: 'https://secudefense.eid.local/dashboard',
        login: {
            usernameSel: By.id('username'),
            passwordSel: By.id('password'),
            submitSel:   By.css('button[type="submit"]'),
            username: process.env.LOGRHYTHM_USER,
            password: process.env.LOGRHYTHM_PASS
        },
        readyCheck: By.css('.page-dashboard'),
        isVisibleInCarousel: true
    }
];



/** ========= UTILITAIRES ========= **/
async function waitDomReady(driver, timeout = 15000) {
  await driver.wait(() =>
    driver.executeScript('return document.readyState').then(s => s === 'complete'),
    timeout
  );
}

async function clickConsentIfAny(driver) {
  const guesses = [
    By.name('.-primary'), // Sélecteur champ username
    By.id('banner_button'),
    By.css('button#accept, button#agree, button[aria-label*="accept"], button[aria-label*="agree"]'),
    By.xpath("//button[contains(translate(.,'ACEPTÉRNDUI','aceptérndui'),'accepter') or contains(.,'I agree') or contains(.,'OK')]")
  ];
  for (const sel of guesses) {
    try {
      const el = await driver.wait(until.elementLocated(sel), 2000).catch(() => null);
      if (!el) continue;
      await driver.wait(until.elementIsVisible(el), 2000).catch(() => null);
      await driver.executeScript('arguments[0].scrollIntoView({block:"center"});', el);
      await el.click().catch(() => null);
      break;
    } catch (_) {}
  }
}

async function switchToFrameWith(driver, locator) {
  await driver.switchTo().defaultContent();
  const main = await driver.findElements(locator);
  if (main.length) return true;

  const frames = await driver.findElements(By.tagName('iframe'));
  for (let i = 0; i < frames.length; i++) {
    try {
      await driver.switchTo().frame(frames[i]);
      const found = await driver.findElements(locator);
      if (found.length) return true;
      await driver.switchTo().defaultContent();
    } catch (_) {
      await driver.switchTo().defaultContent();
    }
  }
  return false;
}


async function safeType(driver, locator, text, timeout = 10000) {
  const el = await driver.wait(until.elementLocated(locator), timeout);

  // rendre visible si besoin
  await driver.wait(until.elementIsVisible(el), timeout).catch(async () => {
    await driver.executeScript(`
      try {
        arguments[0].style.display = 'block';
        arguments[0].style.visibility = 'visible';
        arguments[0].removeAttribute('disabled');
      } catch(e){}
    `, el);
  });

  // injection qui déclenche vraiment React/Angular/Vue
  await driver.executeScript(`
    const el = arguments[0];
    const value = arguments[1];
    const lastValue = el.value;

    // assigner via le prototype pour que React capte la mutation
    el.value = value;
    const tracker = el._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }

    // forcer React/Angular/Vue à re-rendre la valeur
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  `, el, text);

  // attendre que la valeur soit bien prise en compte
  await driver.wait(async () => {
    const val = await el.getAttribute("value");
    return val === text;
  }, timeout, `Le champ ${locator} n'a pas été correctement rempli avec "${text}"`);
}


async function safeClick(driver, locator, timeout = 10000) {
  const el = await driver.wait(until.elementLocated(locator), timeout);
  try { await driver.wait(until.elementIsVisible(el), timeout); } catch (_) {}
  try {
    await driver.executeScript('arguments[0].scrollIntoView({block:"center"});', el);
    await driver.wait(until.elementIsEnabled(el), 3000).catch(() => {});
    await el.click();
  } catch (_) {
    await driver.executeScript('arguments[0].click();', el);
  }
}

async function clickById(driver, locator, timeout = 10000) {
  try {
    const el = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(el), timeout).catch(() => {});
    await driver.executeScript('arguments[0].scrollIntoView({block:"center"});', el);
    await el.click().catch(async () => {
      await driver.executeScript('arguments[0].click();', el);
    });
    console.log(`Lien ${locator} cliqué avec succès`);
  } catch (err) {
    console.warn(`Impossible de cliquer sur ${locator}:`, err.message);
  }
}


async function ensureLoggedIn(driver, dash) {
  await waitDomReady(driver);
  await clickConsentIfAny(driver);
  const already = await driver.findElements(dash.readyCheck);
  if (already.length) return;

  if(dash.consentSel) {
  await clickConsentIfAny(driver, dash.consentSel);
 }


  const inFrame = await switchToFrameWith(driver, dash.login.usernameSel);
  if (!inFrame) {
    await waitDomReady(driver);
    await switchToFrameWith(driver, dash.login.usernameSel);
  }

  if(dash.forceVisiblePassword) {
  await driver.executeScript(`
    const pwd = document.querySelector('input[name="password"]');
    if(pwd) { pwd.style.display='block'; pwd.style.visibility='visible'; }
  `);
 }

  await safeType(driver, dash.login.usernameSel, dash.login.username);
  //await driver.sleep(3000); 

  await safeType(driver, dash.login.passwordSel, dash.login.password);
  await driver.sleep(1000); 

  await safeClick(driver, dash.login.submitSel);

  await driver.switchTo().defaultContent();
  await waitDomReady(driver);
  await driver.wait(until.elementLocated(dash.readyCheck), 20000);
}

/** ========= SCROLL ROBUSTE DESCENTE + REMONTE ========= **/
async function autoScroll(driver, durationMs) {
  const steps = Math.floor((durationMs / SCROLL_INTERVAL) / 2);

  const scrollElement = async (step, down = true) => {
    await driver.executeScript(function(stepArg, downArg) {
      function findScrollable(root) {
        if (document.scrollingElement && document.scrollingElement.scrollHeight > document.scrollingElement.clientHeight + 10) {
          return document.scrollingElement;
        }
        const nodes = root.querySelectorAll('*');
        for (let n of nodes) {
          const cs = window.getComputedStyle(n);
          if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll' || cs.overflowY === 'overlay') && n.scrollHeight > n.clientHeight + 10) {
            return n;
          }
        }
        return document.scrollingElement || null;
      }
      const el = findScrollable(document);
      if (el) {
        el.scrollTop += downArg ? stepArg : -stepArg;
      }
    }, step, down);
  };

  // 1️ - Descente
  for (let i = 0; i < steps; i++) {
    await scrollElement(SCROLL_STEP, true);
    await driver.sleep(SCROLL_INTERVAL);
  }

  // Pause en bas
  await driver.sleep(2000);

  // 2️ - Remontée
  for (let i = 0; i < steps; i++) {
    await scrollElement(SCROLL_STEP, false);
    await driver.sleep(SCROLL_INTERVAL);
  }

  // Pause en haut
  await driver.sleep(1000);
}

/** ========= SCRIPT PRINCIPAL ========= **/
(async function main_v1() {
  const options = new chrome.Options()
    .setAcceptInsecureCerts(true)
    .addArguments('--ignore-certificate-errors')
    .addArguments('--allow-insecure-localhost')
    .addArguments('--start-maximized')
    .addArguments('--disable-infobars')
    .addArguments('--disable-extensions')
    .addArguments("--start-fullscreen");

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    console.log('Lancement WebDriver...');

    const tabs = [];

    // Ouvre le 1er dashboard dans l'onglet courant
    await driver.get(dashboards[0].url);
    await driver.sleep(5000); // attendre que la page soit bien chargée
    await driver.executeScript('history.go(0)');
    await ensureLoggedIn(driver, dashboards[0]);
    tabs.push(await driver.getWindowHandle());


    //await driver.manage().window().maximize();

    // Ouvre les autres dashboards dans de nouveaux onglets
    for (let i = 1; i < dashboards.length; i++) {
      await driver.executeScript('window.open("about:blank","_blank");');
      const handles = await driver.getAllWindowHandles();
      const newTab = handles.find(h => !tabs.includes(h));
      tabs.push(newTab);

      await driver.switchTo().window(newTab);
      await driver.get(dashboards[i].url);
      await ensureLoggedIn(driver, dashboards[i]);

    //    // Click sur le lien si défini
    //     if (dashboards[i].linkId) {
    //         await clickById(driver, dashboards[i].linkId);
    //     }

        if(dashboards[i].consentSel) {
            await clickConsentIfAny(driver, dashboards[i].consentSel);
        }
    }

    console.log(`Tous les dashboards sont ouverts et connectés.`);


    // Carrousel dynamique
    while (true) {
      for (let i = 0; i < dashboards.length; i++) {
        if (!dashboards[i].isVisibleInCarousel) continue;
        await driver.switchTo().window(tabs[i]);
        await ensureLoggedIn(driver, dashboards[i]);
        console.log(`Dashboard affiché : ${dashboards[i].name}`);
        await autoScroll(driver, DISPLAY_TIME); // scroll robuste
      }
    }
  } catch (e) {
    console.error('Erreur principale :', e);
  } finally {
    // laisse tourner pour le mur d’écrans
    // await driver.quit();
  }
})();


(async function main() {
  const options = new chrome.Options()
    .setAcceptInsecureCerts(true)
    .addArguments('--ignore-certificate-errors')
    .addArguments('--allow-insecure-localhost')
    .addArguments('--start-maximized')
    .addArguments('--disable-infobars')
    .addArguments('--disable-extensions')
    .addArguments('--start-fullscreen');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    console.log('🚀 Lancement WebDriver...');

    const tabs = [];

    // --- Ouverture du premier dashboard ---
    try {
      await driver.get(dashboards[0].url);
      await driver.sleep(5000);
      await driver.executeScript('history.go(0)');
      await ensureLoggedIn(driver, dashboards[0]);
      tabs.push(await driver.getWindowHandle());
    } catch (err) {
      console.error(`❌ Échec ouverture/connexion du dashboard ${dashboards[0].name}:`, err.message);
      tabs.push(await driver.getWindowHandle()); // quand même garder un handle
    }

    // --- Ouverture des autres dashboards ---
    for (let i = 1; i < dashboards.length; i++) {
      await driver.executeScript('window.open("about:blank","_blank");');
      const handles = await driver.getAllWindowHandles();
      const newTab = handles.find(h => !tabs.includes(h));
      tabs.push(newTab);

      await driver.switchTo().window(newTab);

      try {
        await driver.get(dashboards[i].url);
        await ensureLoggedIn(driver, dashboards[i]);

        if (dashboards[i].consentSel) {
          await clickConsentIfAny(driver, dashboards[i].consentSel);
        }

        if (dashboards[i].linkId) {
          await clickById(driver, dashboards[i].linkId);
        }

      } catch (err) {
        console.error(`❌ Échec ouverture/connexion du dashboard ${dashboards[i].name}:`, err.message);
        // continue quand même sur les autres
      }
    }

    console.log(`✅ Tous les dashboards sont ouverts (même ceux en erreur).`);

    // --- Carrousel dynamique ---
    while (true) {
      for (let i = 0; i < dashboards.length; i++) {
        if (!dashboards[i].isVisibleInCarousel) continue;

        try {
          await driver.switchTo().window(tabs[i]);
          await ensureLoggedIn(driver, dashboards[i]);
          console.log(`➡️ Dashboard affiché : ${dashboards[i].name}`);
          await autoScroll(driver, DISPLAY_TIME);
        } catch (err) {
          console.error(`⚠️ Erreur lors du rafraîchissement du dashboard ${dashboards[i].name}:`, err.message);
          // On loggue et on passe au suivant
        }
      }
    }

  } catch (e) {
    console.error('❌ Erreur principale :', e);
  } finally {
    // Optionnel : garder ouvert pour mur d’écran
    // await driver.quit();
  }
})();

