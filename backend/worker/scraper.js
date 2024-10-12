const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapePage(url) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const pageContent = await page.evaluate(() => {
            const content = [];
            const headers = document.querySelectorAll('h1, h2, h3');

            headers.forEach(header => {
                const headerText = header.innerText.trim();
                let nextElement = header.nextElementSibling;
                let paragraphs = [];

                while (nextElement && nextElement.tagName === 'P') {
                    paragraphs.push(nextElement.innerText.trim());
                    nextElement = nextElement.nextElementSibling;
                }

                if (paragraphs.length > 0) {
                    content.push(`${headerText}\n${paragraphs.join('\n')}`);
                }
            });

            return content.join('\n\n');
        });

        await browser.close();
        return pageContent;
    } catch (error) {
        console.error(`Error scraping URL: ${url}`, error);
        return '';
    }
}

async function scrapeUrls(inputObj) {
    let resultObj = {};

    for (let section in inputObj) {
        let sectionContent = [];

        for (let url of inputObj[section]) {
            if (url) {
                const content = await scrapePage(url);
                sectionContent.push(content);
            }
        }

        resultObj[section] = sectionContent.join('\n\n');
    }

    return resultObj;
}

// const input = {
//     "summary": [
//         "https://builtin.com/artificial-intelligence/artificial-intelligence-future",
//         "https://www.coursera.org/articles/ai-trends",
//         "https://online-engineering.case.edu/blog/advancements-in-artificial-intelligence-and-machine-learning",
//         "https://builtin.com/artificial-intelligence/artificial-intelligence-future"
//     ],
// };

// scrapeUrls(input).then(result => {
//     const jsonData = JSON.stringify(result, null, 2);
//     fs.writeFile('scrapedData.json', jsonData, (err) => {
//         if (err) {
//             console.error('Error writing to file', err);
//         } else {
//             console.log('Data successfully written to scrapedData.json');
//         }
//     });
// });

module.exports = scrapeUrls;