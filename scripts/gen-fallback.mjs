// Generates src/lib/fallback-data.json (offline copy of the API shape) used only if the live API is unreachable.
import fs from "node:fs";
const cats=[["chal","চাল","🍚"],["dal","ডাল","🫘"],["tel","তেল","🛢️"],["sobji","সবজি","🥬"],["mach","মাছ","🐟"],["mangsho","মাংস","🍗"],["dim-dui","ডিম-দুধ","🥛"],["mosla","মসলা","🌶️"]];
const L=`sorno-machi-chal|স্বর্ণমাছি চাল|chal|kg|🍚|148|2.1
miniket-chal|মিনিকেট চাল|chal|kg|🍚|99|-2.9
nazir-chal|নাজির চাল|chal|kg|🍚|74|0
batam-size-chal|বাটাম সাইজ চাল|chal|kg|🍚|66|3.1
mosur-dal|মসুর ডাল|dal|kg|🫘|142|2.9
mug-dal|মুগ ডাল|dal|kg|🫘|135|0
chola-dal|ছোলা|dal|kg|🫘|120|-2.4
aman-dal-khosasila|আমন ডাল (খোসাসিলা)|dal|kg|🫘|156|2.6
sorishar-tel|সরিষার তেল|tel|litre|🫙|192|2.1
pam-tel|পাম তেল|tel|kg|🛢️|168|-2.3
ghani-banga-sorishar-tel|ঘানি ভাঙা সরিষার তেল|tel|litre|🫙|215|2.4
alu|আলু|sobji|kg|🥔|30|-6.2
peyaj|পেঁয়াজ|sobji|kg|🧅|54|12.5
kaccha-moric|কাঁচামরিচ|sobji|kg|🌶️|92|-12.4
begun|বেগুন|sobji|kg|🍆|44|4.8
dhenders|ঢেঁড়স|sobji|kg|🟢|38|0
rui-mach|রুই মাছ|mach|kg|🐟|46|4.5
telapiya-mach|তেলাপিয়া|mach|kg|🐟|36|0
ilish-mach|ইলিশ মাছ|mach|kg|🐠|1850|3.4
katla-mach|কাতলা মাছ|mach|kg|🐠|43|-4.4
chingri-mach|চিংড়ি মাছ (খোলা)|mach|kg|🦐|330|3.1
murgi-r-mangsho|মুরগির মাংস|mangsho|kg|🍗|225|-1.3
goru-r-mangsho|গরুর মাংস|mangsho|kg|🥩|790|-1.2
khasir-mangsho|খাসির মাংস|mangsho|kg|🍖|1290|-3
hanser-mangsho|হাঁসের মাংস|mangsho|kg|🦆|285|-3.4
dim|ডিম|dim-dui|dozen|🥚|158|3.9
dui-dudh|দুধ|dim-dui|litre|🥛|102|2
doi|দই|dim-dui|litre|🥣|92|0
mokhhan|মাখন (১০০ গ্রাম)|dim-dui|piece|🧈|145|3.6
ada|আদা|mosla|kg|🫚|85|9
roshun|রসুন|mosla|kg|🧄|125|-7.4
morich-gunda|মরিচ গুঁড়া|mosla|kg|🌶️|245|-2
dhanepata-gunda|ধনেপাতা গুঁড়া|mosla|kg|🍃|265|0`.split("\n");
const M=[["কারওয়ান বাজার","ঢাকা"],["গ্রীন মার্কেট, মিরপুর","ঢাকা"],["চৌদগ্রাম বাজার","চট্টগ্রাম"],["আমতলী বাজার","চট্টগ্রাম"],["সদর বাজার","রাজশাহী"],["বাসারহাট বাজার","রাজশাহী"],["মাঠ বাজার","ময়মনসিংহ"],["চৌর বাজার","ময়মনসিংহ"],["বাজারহাট","খুলনা"],["ডবলগেট বাজার","খুলনা"],["আমবাজার","সিলেট"],["চৌরাস্তা বাজার","সিলেট"]];
const products=L.map((l,i)=>{const [slug,nameBn,category,unit,image,today,pct]=l.split("|");const t=+today,p=+pct;
 const cat=cats.find(c=>c[0]===category);
 return {id:i+1,slug,nameBn,category,categoryNameBn:cat[1],categoryIcon:cat[2],unit,image,today:t,
  yesterday:Math.round(t/(1+p/100)),lastWeek:Math.round(t*(1-p/100*1.5)),lastMonth:Math.round(t*(1-p/100*2.2)),
  change:{dir:p>0?"up":p<0?"down":"flat",pct:p},
  markets:M.map(([market,division],j)=>{const a=0.97-((i*7+j*5)%6)/100,b=1.03+((i*3+j*11)%8)/100;return {market,division,min:Math.round(t*a),max:Math.round(t*b)}})};});
fs.writeFileSync("src/lib/fallback-data.json",JSON.stringify({categories:cats.map(([id,nameBn,icon])=>({id,slug:id,nameBn,icon})),products}));
