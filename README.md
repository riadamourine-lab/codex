# ⬡ NEXUS GAMING — دليل المطوّر

## هيكل المشروع
```
nexus_gaming/
├── index.html          ← افتحه مباشرة في المتصفح
├── css/style.css       ← كل التصميم
├── js/
│   ├── covers.js       ← صور الأغلفة Base64
│   ├── games.js        ← بيانات الألعاب والروابط ← عدّل هنا
│   └── app.js          ← منطق التطبيق
├── torrents/           ← ملفات .torrent المحلية
└── README.md
```

---

## 🖼️ كيف تضيف صورة غلاف — 

### الطريقة 1 — من الإنترنت مباشرة (الأسهل)

**الخطوة 1:** افتح هذا الرابط في المتصفح:
```
https://www.base64-image.de
```

**الخطوة 2:** اضغط زر "select image" وارفع صورة الغلاف من جهازك
- مقاس مناسب: 300×400 بكسل أو أي نسبة 3:4
- أي صيغة: JPG أو PNG أو WEBP

**الخطوة 3:** بعد الرفع ستظهر نص طويل جداً مثل:
```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgG...
```
اضغط "copy to clipboard" أو حدد كل النص وانسخه

**الخطوة 4:** افتح ملف `js/covers.js` بـ Notepad أو VS Code

**الخطوة 5:** في آخر السطر قبل `};` أضف:
```javascript
// اختر اسماً قصيراً بدون مسافات
re9: "data:image/jpeg;base64,/9j/4AAQSkZJRgAB...(الباقي)",
```

> ⚠️ مهم: الاسم يجب أن يكون بالإنجليزي فقط، بدون مسافات، بدون أرقام في البداية

**أمثلة أسماء صحيحة:**
```
re9     witcher4    gta6    batman1
```

**أمثلة أسماء خاطئة:**
```
RE9     لعبة1    gta 6    9game
```

---

### الطريقة 2 — Python سريع (للمطورين)

إذا عندك Python مثبّت، شغّل هذا الكود:
```python
from PIL import Image
import base64, io

# غيّر المسار لمسار صورتك
img = Image.open("C:/Users/Ayman/Desktop/re9_cover.jpg").convert('RGB')
img.thumbnail((300, 400))  # تصغير تلقائي

buf = io.BytesIO()
img.save(buf, format='JPEG', quality=75)
b64 = base64.b64encode(buf.getvalue()).decode()

# اطبع النتيجة
print(f're9: "data:image/jpeg;base64,{b64}"')
```
ثم انسخ الناتج إلى `covers.js`

---

### الخطوة الأخيرة — ربط الصورة باللعبة

افتح `js/games.js` وابحث عن اللعبة التي أضفت لها صورة، عدّل سطر `img`:

```javascript
{
  s: 're',
  bl: 'RE9',
  t: 'Resident Evil 9',
  // ...
  img: 're9',   // ← نفس الاسم اللي حطيته في covers.js
  // ...
}
```

**قبل التعديل:** `img: null`
**بعد التعديل:** `img: 're9'`

---

## 🔗 إضافة رابط تورنت

في `js/games.js` ابحث عن اللعبة وعدّل `mag`:
```javascript
mag: 'magnet:?xt=urn:btih:HASH_هنا&dn=اسم_اللعبة',
```

**أو ملف محلي:**
1. ضع `GTA6.torrent` في مجلد `torrents/`
2. في games.js: `torrentFile: 'GTA6.torrent'`

---

## ➕ إضافة لعبة جديدة

في `js/games.js` أضف قبل `];`:
```javascript
{
  s: 're',                    // السلسلة
  bl: 'RE9',                  // اسم البادج
  t: 'Resident Evil 9',       // الاسم الكامل
  y: 2025,                    // السنة
  g: 'Survival Horror',       // النوع
  r: '9.5',                   // التقييم
  sz: '80 GB',                // الحجم
  ca: '#ff0055',              // اللون الأساسي
  ca2: '#880022',             // اللون الثانوي
  img: 're9',                 // مفتاح الصورة في covers.js (أو null)
  mag: 'magnet:?xt=urn:btih:HASH',
  dev: 'Capcom', pub: 'Capcom',
  platform: 'PC / PS5',
  modes: 'Single Player',
  desc: 'وصف اللعبة...',
  tags: [
    { l: '18+',    c: '#cc0000' },
    { l: 'CAPCOM', c: 'rgba(255,255,255,.1)' },
  ],
  req: {
    min: { os:'Windows 10 64-bit', cpu:'Core i5-8400', ram:'8 GB',
           gpu:'GTX 1060 6GB', storage:'80 GB', dx:'DirectX 12' },
    rec: { os:'Windows 11 64-bit', cpu:'Core i7-10700K', ram:'16 GB',
           gpu:'RTX 3070', storage:'80 GB SSD', dx:'DirectX 12' },
  },
},
```

---

## 🆕 إضافة سلسلة جديدة

**في games.js** أضف:
```javascript
SERIES_META.batman = { label:'Batman Arkham', color:'#4488ff' };
```

**في index.html** أضف زر في الـ nav:
```html
<button class="nb" data-f="batman" style="--ac:#4488ff">
  <span class="dot"></span>Batman
</button>
```

---

## 🎨 تغيير الألوان

في أعلى `css/style.css`:
```css
:root {
  --c1: #00f5ff;  /* اللون الأساسي الليلي */
  --c2: #bf00ff;  /* البنفسجي */
  --bg: #04040d;  /* خلفية الليل */
}
```

---

## ⚡ تحسين الأداء

في `js/app.js` لتقليل الجزيئات:
```javascript
setInterval(mk, 1600);  // زد الرقم = أقل جزيئات
for(let i=0;i<14;i++)  // قلّل العدد = 5 مثلاً
```

---

## 🌐 نشر مجاني

**Netlify (أسرع طريقة):**
1. اذهب لـ https://netlify.com/drop
2. اسحب مجلد `nexus_gaming` كاملاً للصفحة
3. احصل على رابط مثل `random-name.netlify.app` فوراً ✅
4. لتغيير الرابط: اضغط Site Settings → Change site name

**GitHub Pages:**
1. اصنع repo جديد على github.com
2. ارفع الملفات
3. Settings → Pages → Deploy from branch: main
4. رابطك: `username.github.io/repo-name` ✅

---

## 📊 الألعاب الحالية — 44 لعبة

| السلسلة | العدد |
|---------|-------|
| Resident Evil | 5 |
| GTA | 5 |
| Hitman | 6 |
| Tomb Raider | 3 |
| Max Payne | 3 |
| Forza Horizon | 2 |
| Mafia | 2 |
| The Witcher | 3 |
| Assassin's Creed | 6 |
| Far Cry | 4 |
| Red Dead Redemption | 2 |
| Dark Souls / Elden Ring | 3 |

---
تحياتي من المبرمج ايمن 
