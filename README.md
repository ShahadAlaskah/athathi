# 🛋️ أثاثي (Athathi) - Furniture RFQ Marketplace

**أثاثي** هي منصة إلكترونية (سوق) متخصصة في تقديم طلبات عروض الأسعار (RFQ) لربط مصنعي الأثاث والنجارين بالعملاء في المملكة العربية السعودية. تهدف المنصة إلى تسهيل عملية تفصيل وصناعة الأثاث من خلال تقنية موثوقة، سريعة، وذات تجربة مستخدم عالية الجودة.

[English Description below](#english-description)

---

## 🚀 الميزات الرئيسية (Key Features)

* **نظام طلبات التسعير (RFQ):** إمكانية رفع طلبات تفصيل أثاث مخصصة مع إرفاق الصور والمواصفات بدقة.
* **إدارة العروض (Offer Management):** نظام متقدم يسمح للمصنعين بتقديم عروض أسعار تنافسية، مع واجهات تفاعلية للعملاء لمراجعة العروض وقبولها بسهولة.
* **تجربة مستخدم مميزة (Premium UI/UX):** تصميم عصري وتفاعلي لتسهيل رحلة العميل منذ تقديم الطلب وحتى قبول العرض والبدء بالتصنيع.
* **المحادثات الفورية (Chat):** تواصل مباشر بين العميل والنجار للتفاوض وتوضيح التفاصيل، مدعوم بنظام تنبيهات متطور وبنية تحتية عبر WebSockets.
* **الأمان والموثوقية:** بنية تحتية آمنة تضمن خصوصية بيانات العملاء والمصنعين.
* **لوحة تحكم (Dashboard):** واجهات مخصصة لكل من العملاء (لتتبع طلباتهم) والمزودين/النجارين (لإدارة العروض التي قدموها).

## 🛠️ التقنيات المستخدمة (Tech Stack)

تم بناء المشروع باستخدام بنية Monorepo متقدمة (عبر Nx) تتضمن:

* **الواجهة الأمامية (Frontend):** Next.js / React / Tailwind CSS
* **الواجهة الخلفية (Backend):** NestJS / TypeScript
* **قاعدة البيانات (Database):** PostgreSQL / Prisma ORM
* **أخرى (Others):** WebSockets للدردشة المباشرة، ونظام إدارة تخزين الملفات والصور.

## 🎯 الهدف من المنصة

دعم السوق المحلي في السعودية من خلال رقمنة قطاع صناعة الأثاث وتفصيله، مما يقلل من الوقت والجهد على العميل للبحث عن النجار المناسب، ويزيد من فرص العمل والمبيعات لمصنعي الأثاث المحليين.

---

<span id="english-description"></span>

## 🌐 English Description

**Athathi** is a specialized Request for Quotation (RFQ) marketplace connecting furniture manufacturers and carpenters with customers in Saudi Arabia. The platform streamlines the custom furniture manufacturing process through a reliable, fast, and premium user experience.

### 🌟 Core Features
* **RFQ System:** Customers can seamlessly submit custom furniture fabrication requests with detailed specifications and images.
* **Dynamic Offer Management:** Manufacturers can submit competitive bids, while customers enjoy an interactive and intuitive interface to review and accept offers.
* **Premium UX/UI:** A modern, highly responsive design that ensures a smooth journey from request submission to production initiation.
* **Real-time Chat:** Instant messaging between customers and craftsmen for negotiation and clarification, powered by WebSockets.
* **Security & Reliability:** Built with robust security measures to protect user and provider data.

### 💻 Tech Stack
The project is built as a robust Monorepo (using Nx), featuring:
* **Frontend:** Next.js / React / Tailwind CSS
* **Backend:** NestJS / TypeScript
* **Database:** PostgreSQL with Prisma ORM

---

## 💻 كيفية التشغيل محلياً (Local Setup)

1. استنساخ المستودع (Clone the repo):
   ```bash
   git clone https://github.com/your-username/athathi.git
   ```
2. تثبيت الحزم (Install dependencies):
   ```bash
   npm install
   ```
3. تشغيل خادم التطوير (Run development server):
   ```bash
   npx nx run-many --target=serve --all
   ```

---
**💡 مساهمات (Contributing)**
نرحب بأي مساهمات لتحسين المنصة! يرجى قراءة ملف الإرشادات قبل تقديم أي `Pull Request`.
