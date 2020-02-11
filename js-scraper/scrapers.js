const puppeteer = require('puppeteer');
const mailer = require("./email-sender")
const inputOutput = require('./input-output')

async function scrapeProduct(url, title_arg, price_arg) {
    const browser = await puppeteer.launch();
       // {'args' : ['--no-sandbox','--disable-setuid-sandbox']}; for heroku deployment. muliCohen
    const page = await browser.newPage();
    await page.goto(url);
    
    async function getElementData(path) {
        const [el] = await page.$x(path); //after inspecting and copying element xPath (first element of the returned array). muliCohen
        const txt = await el.getProperty('textContent');
        const element = await txt.jsonValue();
        return element;
    }
    
    let title = await getElementData(title_arg);
    let price = await getElementData(price_arg);
    
    price = parseInt(price.replace(/\D/g,''));
    
    let localPrice = inputOutput.read(title);
  
    if (price != localPrice) {
        mailer(`${title} is only ${price}`);
        inputOutput.write(title, price);
    } 
    browser.close();
    console.log(`${title} is only ${price}`)
}

let pageScraped = 'https://www.kley-zemer.co.il/%D7%9E%D7%92%D7%91%D7%A8_%D7%9E%D7%A0%D7%95%D7%A8%D7%95%D7%AA_15_%D7%95%D7%95%D7%90%D7%98_fender_bassbreaker_15_combo';
let title = '//*[@id="P8"]/div[1]/div/div[2]/div[1]/div[1]/div[1]/h1/div[2]';
let price = '/html/body/form/div[3]/div/main/section/div/div[2]/div[1]/div[1]/div/div[2]/div[4]/div[1]';

scrapeProduct(pageScraped, title, price);

//000 martin
scrapeProduct('https://www.avigil.co.il/shop/%d7%9b%d7%9c-%d7%94%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa/%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa-%d7%90%d7%a7%d7%95%d7%a1%d7%98%d7%99%d7%95%d7%aa?filter_manufacturer=martin', '//*[@id="main"]/div/div[2]/div/div[3]/div[9]/div/div[2]/div[2]/div[1]/p[2]/a', '//*[@id="main"]/div/div[2]/div/div[3]/div[9]/div/div[2]/div[2]/div[2]/span/span');

//00 martin
scrapeProduct('https://www.avigil.co.il/shop/%d7%9b%d7%9c-%d7%94%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa/%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa-%d7%90%d7%a7%d7%95%d7%a1%d7%98%d7%99%d7%95%d7%aa?filter_manufacturer=martin', '//*[@id="main"]/div/div[2]/div/div[3]/div[10]/div/div[2]/div[2]/div[1]/p[2]/a', '//*[@id="main"]/div/div[2]/div/div[3]/div[10]/div/div[2]/div[2]/div[2]/span/span');

//spruce jr
scrapeProduct('https://www.avigil.co.il/shop/%d7%9b%d7%9c-%d7%94%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa/%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa-%d7%90%d7%a7%d7%95%d7%a1%d7%98%d7%99%d7%95%d7%aa?filter_manufacturer=martin', '//*[@id="main"]/div/div[2]/div/div[3]/div[16]/div/div[2]/div[2]/div[1]/p[2]/a', '//*[@id="main"]/div/div[2]/div/div[3]/div[16]/div/div[2]/div[2]/div[2]/span/span');

//mahog jr
scrapeProduct('https://www.avigil.co.il/shop/%d7%9b%d7%9c-%d7%94%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa/%d7%92%d7%99%d7%98%d7%a8%d7%95%d7%aa-%d7%90%d7%a7%d7%95%d7%a1%d7%98%d7%99%d7%95%d7%aa?filter_manufacturer=martin', '//*[@id="main"]/div/div[2]/div/div[3]/div[17]/div/div[2]/div[2]/div[1]/p[2]/a', '//*[@id="main"]/div/div[2]/div/div[3]/div[17]/div/div[2]/div[2]/div[2]/span/span');

//tweed jr
scrapeProduct('https://www.kley-zemer.co.il/AllResults?bskeyword=blues%20junior', '//*[@id="P8"]/div[2]/div[2]/div/div/a/div[2]/h2/div[2]', '/html/body/form/div[3]/div/main/section/div/div[2]/div/div[2]/div[2]/div/div/a/div[3]/div[1]');

//blues jr
scrapeProduct('https://www.kley-zemer.co.il/AllResults?bskeyword=blues%20junior', '//*[@id="P8"]/div[2]/div[1]/div/div/a/div[2]/h2/div[2]', '/html/body/form/div[3]/div/main/section/div/div[2]/div/div[2]/div[1]/div/div/a/div[3]/div[1]');
