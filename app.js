const fs=require("fs");const util=require("util");const readFilePromise=util.promisify(fs.readFile);const writeFilePromise=util.promisify(fs.writeFile);(async()=>{try{const first=await readFilePromise("./testFolder/first.txt","utf-8");const second=await readFilePromise("./testFolder/subFolder/second.txt","utf-8");console.log(first);console.log(second);writeFilePromise("./testFolder/third.txt",first+"\n"+second,"utf-8")}catch(err){console.error(err)}})();