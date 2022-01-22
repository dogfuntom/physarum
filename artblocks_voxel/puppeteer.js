const puppeteer = require('puppeteer');

// function random_hash() {
//     let x = "0123456789abcdef", hash = '0x'
//     for (let i = 64; i > 0; --i) {
//       hash += x[Math.floor(Math.random() * x.length)]
//     }
//     return hash
//   }


// let urls = Array(128).fill(0);
// urls = urls.map(_=>random_hash());
// console.log(urls)

let urls = [
    '0xc06aeb32d71d1ead2c3f8fe9b5f6e9941f8253909082d04e85c02d7cc66c4d63',
    '0x6eae1cacf3557f9d6e4d462cd7b2d575374b76b41ba7b8ed7637745765264047',
    '0x03c799f94ac1d73ee65484705b2fc75dc6bf690774cbf3bde503628209bcb4fb',
    '0x682f373cbeee7a89b0d6a52a0bdbccc057b4096019a9dce34d58ca8e029c1c7a',
    '0x1c5569e0d7e55709430c08c01c062c20c79fc8e26b159fa03f454fed71b3bc15',
    '0x6d87865f8576b135c1dcc8babcd3e470a92a75f9f065de5a9726b08d960f5c08',
    '0xd47f7ef2c1cfe02093932f74b3ca0799c0c01f99cddfd0008a925eece981c087',
    '0x60d93c948fbe87ff42cbbf5a021dbe90c9a8063cd9f0a03a37763aaf4f04b704',
    '0x265252ceb93c0306ccc1b411f635c6121e8c148635ac13048cd0495a41ce3d0f',
    '0xe9b597c1852f91583c23a1a7fa65a996afa9d54219ca70d9f97e6b6f3e80606f',
    '0xb168b55048eeee1c66a982903a7ab2e0af9fe4ac5dbb1ea6aa9ed1f979bb9b7c',
    '0x909a1df52d8794e7a57dfd0bb7efc18f20454a7eec6d31a9f328be5faecc6a40',
    '0x6fc59e6588f2529c5c9cee1a70fb21914342a2bc00fc3e0ba1a74f538537d9ac',
    '0x392d7575cd35b8411279a13720aef8cc882d1fccff4c4008588185c2c61e6a74',
    '0x7ac55155a699c26e3db2b42909544f79c8ba5c1e01c5e9d0975a8c01442a6ee1',
    '0xd84a5c4ea8ac512658fb7eba5eab214056c1e934f0132c9ab24c2a25a862aec1',
    '0xcb1a0f8592fbbd0b3184cfe7f86733bb317383452b71f95ff6ba18cdb812c982',
    '0x65974aa01110adf0346ed15f39829964f964aeed453dc694b21b3eb45366cd70',
    '0x42e0e940d4e00e5199c17a602cbe223f6fcd5fccd72a10e88c3677923114ca98',
    '0x228e1c13ed60502bbcaac1ec4b6807486259630c49c6996ae8b303b0a85be4f1',
    '0x7f7461433543d7529837d7d6259c14ebf87506e751be26c6821113272361384a',
    '0xe23b54024aa197d4e8bf6a5f14fe6ee91efe693d0a6b7dccef537a0de9c08305',
    '0xf747b3640bd7e4020f402272ad453844d5f21663f865bf0bb85b31064a85e10f',
    '0x40ad306e0c1372e54b7320bbcfd7fd9e7d0bf4e71c6da61b0ac13dbeeec45892',
    '0x6d16658278e3a3bcc2068dcf54ebd536f4f01f1fdcf9ad6c598cfddc532b14d7',
    '0xb3d1121225159d36254e0781d8522961e3b9ab88175e3052d5fae29f3e2d4e19',
    '0x931a532d3045e1a784810315af4fbf81a46353bdefea9b4d336bc277276eaed2',
    '0x5bcaaa18d73fa2dc879fa432c14e485e4ed96555367d33d2ad89e095cc884791',
    '0x41fc34b40642b5572738d637aef06ef21dc59f7c5f64c46205ff49ee96b3e208',
    '0x2f6cd9eeb5b0a85ab80b79807197c58e2598921b58aef588cadb8a6820c17795',
    '0x3729c932a74efb9b69e77e7ab115869a912e52d833f6703b887a5cf8b1d793c7',
    '0x761c379839f971742b157e02e63aaa6f1031c66aabbfee031a8800348489bb5a',
    '0x545c7791ee767cdb205557ccff8b5bdf2c46ef17c4064898bb97e927f1ad5ec0',
    '0x3d274b16672e489da3a76599c42debe23649c3fb19269d7d798e194588a17dbe',
    '0x9aa8862fbe88542fb31b69476dc32730176cd6205332fee511c221d3f6e6738f',
    '0x19ad6173dc91e42d47cfa4b3824a912a12dfd0b90f0e9bbdc6006fbbfdf8bb7c',
    '0x4863624f7349235cf499049cdc534c02e6529446b72bfec1d06d281402e5b1ed',
    '0x0d3c74dd5b7f3ef4a2c7175182a72dbae9b0f632780aaea58d0c70b4ad0e3e85',
    '0x85309c2259ad035347aec10f8461a1925fb960523855777d00338a048b6ee31e',
    '0xfa7f8e3c20d0e369fc6679584fac289c82d61bc4c8a043cf17a007caa95bac82',
    '0x6ee66ece645ea1229a1968795ec08c7935655da463a8171800c926bd7492be38',
    '0x1d3ee472928377ed2c6b430a34e1d6665377e2352807f736736c1a59c059ba44',
    '0x134935ff79da516d3e316262c33a9e70c596b10fd6bb1db2b59877fa764c4468',
    '0x7cfd2b11b1b246d98b5735d018ad8e93169548800659894d2216724aa179de08',
    '0xfa5b2b512d48f3a9a552c09fd313b79f102012a5385bfa56ea34c624f665e68d',
    '0xb7c4f613967bede72bf1c1e05ba3fa73eb7015ceb6565e618b19e43f3fd5d780',
    '0x87ccef9cb32f4dfa9de87f4fea9516c933f48fe4b868b6f1dc091936a6549ce2',
    '0x94f2da61fa63fbded3e9a9a41e26683ab3f7cc8bc008747c38b042397221e698',
    '0xecbae2b7acd499ec1ecb8bdd5c6826fc355451cc160f8ca5ea734b317ed50c5c',
    '0x456a3368278b7389b2c3dedace5ee3c929be59ae3c1561fcd4b90c5e9e506742',
    '0xf18a5abfb65b1f7be868a10213adb94dd4d6a57dbfefe1e196e65cb87e93c87d',
    '0xceb8502a811df58f9b359f5300bcfa8e70e13d5f79cf8220a3fb56a0155a0b43',
    '0x6b9790f641b85e020b35be868d2f81f8c0b1f6f5ea525a1bcdfa61ab1379f886',
    '0x4c479fe3db69cd26c901b583afe34059e6fdd8fe90388ce8e5c38fc3c6e4fa82',
    '0x1d1ebfec0275bdca5fcd4bc1b7efa055330fe4626e5cf29d0644447beea06841',
    '0x25a3815bddf0607534acf6624f144d4afe98cdaa917a8ff6ffcfc026b2854ad0',
    '0x7947d0c24e2bce464a867c35c43eb7f8152b8f535fe7e615bbd3ac3d2e5ae578',
    '0x9e8085e44907022c8140cadfa46904c4b4147597942091c74a7b7c2675c99fa2',
    '0x801c5f8d1dd6b985a738dd32a3b75f9d8066c078b9cca28f0c9d2a4465c427df',
    '0xe211c0be468107bde37eeb46d98a95b2fb406ff88f795ee3e600944c4a42cffb',
];

// urls = urls.map((_,i)=>'0xe195db9558b6ba7e9d7b883297f1f1d1f2c830e8a0be2e33d1473ca5b4f9');

(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            // '--headless',
            // '--disable-gpu',
            '--hide-scrollbars',
            '--mute-audio'
        ]
    });
    console.log('launch…')
    const page = await browser.newPage();
    for (let i = 0; i < 100 && urls.length>0; i++) {
        // const browser = await puppeteer.launch({});
        
        await page.setViewport({ width: 512, height: 512 });
        console.log('goto…')
        let hash = urls.pop()
        console.log(hash)
        await page.goto('http://localhost:8080/#'+hash)
        await page.goto('http://localhost:8080/#'+hash)
        // await page.goto('https://shaders.dianov.org/artblocks_regl/dist_/#'+hash)
        // await page.goto('https://shaders.dianov.org/artblocks_regl/dist_/#'+hash)
            
        console.log('save!')
        await page.waitForTimeout(100);
        await page.screenshot({ path: `/Users/ivandianov/Downloads/ab/test3/${i}_${hash}.png` })
    }
    await browser.close();
})()