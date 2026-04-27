const express = require('express');
const cors = require('cors');
const app = express();

// تفعيل خاصية الـ CORS للسماح للمتصفح بالوصول للسيرفر من أي رابط
app.use(cors());

// نقطة فحص البنق (Ping) والاستجابة السريعة
app.head('/download', (req, res) => {
    res.status(200).end();
});

// نقطة اختبار سرعة التحميل (ترسل 10 ميجا بايت)
app.get('/download', (req, res) => {
    // إنشاء بيانات بحجم 10 ميجا بايت (مليئة بالأصفار)
    const fileSizeInBytes = 10 * 1024 * 1024;
    const buffer = Buffer.alloc(fileSizeInBytes, '0');

    // إخبار المتصفح بنوع الملف وحجمه
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileSizeInBytes);

    // إرسال البيانات
    res.send(buffer);
});

// تحديد المنفذ: يستخدم المنفذ الموفر من المنصة السحابية أو 3000 للمحلي
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ السيرفر يعمل الآن بنجاح`);
    console.log(`📍 المنفذ الحالي: ${PORT}`);
});