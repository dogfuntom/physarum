const puppeteer = require('puppeteer');

let urls = Array(16).fill(0);
urls = urls.map((_,i)=>'0xe195d'+i+'b945583b6ba7e9d7b883297f1f1d1f2c830e8a0be2e33d1473ca5b4f9');

(async function () {
    for (let i = 0; i < 1 && urls.length>0; i++) {
        console.log('launch…')
        // const browser = await puppeteer.launch({});
        
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--headless',
                  '--disable-gpu',
                '--hide-scrollbars',
                '--mute-audio'
            ]
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: 256, height: 256 });
        console.log('goto…')
        await page.goto('http://localhost:8080/#'+urls.pop())
        // ,
        //     {
            //         waitUntil: "Load",
            //         timeout: 0
            //     }
            // )
            
        console.log('save!')
        await page.screenshot({ path: `gallery/${i}_black.png` })
        await browser.close();
        // console.log(i)
    }
})()