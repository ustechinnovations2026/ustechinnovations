// Clean index.html from URL for clean address bar (wrapped in try-catch to prevent file:// protocol security errors)
try {
    if (window.location.protocol.startsWith('http') && (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html')) {
        const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }
} catch (e) {
    console.warn("Could not clean URL path:", e);
}

// =====================================================================
//  TEMPORARILY HIDDEN ELEMENTS — Remove this block to re-enable all
//  To restore: simply delete or comment out this entire IIFE block.
// =====================================================================
(function() {
    document.addEventListener('DOMContentLoaded', function() {

        // 1. Hide Portal & Calibration Models links from ALL nav dropdowns and footers
        var linksToHide = [
            'products-portal.html',
            'products-calibration-models.html'
        ];
        document.querySelectorAll('a.dropdown-item, .footer-links a').forEach(function(link) {
            var href = link.getAttribute('href');
            if (href && linksToHide.some(function(h) { return href.indexOf(h) !== -1; })) {
                link.style.display = 'none';
            }
        });

        // 2. Hide Portal & Calibration columns on products.html split page
        var portalCol = document.querySelector('.product-column-panel.portal');
        var calibCol = document.querySelector('.product-column-panel.calibration');
        if (portalCol) portalCol.style.display = 'none';
        if (calibCol) calibCol.style.display = 'none';
        // Revert grid to 2 columns if on products page
        var splitContainer = document.querySelector('.products-split-container');
        if (splitContainer && (portalCol || calibCol)) {
            splitContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }

        // 3. Hide "Download ... Brochure/Guide" buttons on industry pages
        document.querySelectorAll('a.btn').forEach(function(btn) {
            var text = btn.textContent.trim().toLowerCase();
            if (text.indexOf('download') === 0 && (
                text.indexOf('brochure') !== -1 ||
                text.indexOf('guide') !== -1 ||
                text.indexOf('application note') !== -1
            )) {
                btn.style.display = 'none';
            }
        });

        // 4. Hide ROI Calculator sections on index.html and contact.html
        document.querySelectorAll('section.roi-section').forEach(function(section) {
            section.style.display = 'none';
        });

        // 5. Hide SamplePrep product on products-devices.html (StarchQC now visible)
        var samplePrep = document.getElementById('nano-sample-prep');
        if (samplePrep) {
            samplePrep.style.display = 'none';
            var prevHr = samplePrep.previousElementSibling;
            if (prevHr && prevHr.tagName === 'HR') {
                prevHr.style.display = 'none';
            }
        }

        // 6. Hide SamplePrep card from the homepage slider
        document.querySelectorAll('a[href="product-n-sens-sampleprep.html"]').forEach(function(el) {
            if (el.classList.contains('blog-slider-card')) {
                el.style.display = 'none';
            }
        });

        // 8. Language Switcher — now visible (subdirectory-based i18n)

        // 9. Bloglar 30.10.2026'da kullanici karariyla yeniden gorunur (gizleme kaldirildi).

    });
})();

// =====================================================================
// LANGUAGE SWITCHER — Robust Relative Path & Subdirectory i18n
// Works identically on file:// (local test), localhost, and production.
// =====================================================================

var SUPPORTED_LANGS = ['en', 'tr', 'fr', 'de', 'es', 'ar', 'zh'];

// =====================================================================
// UI I18N (USTECH_UI_I18N_v1) -- app.js tek dosya 5 dile servis edilir; icindeki
// sabit metinler bu sozlukten gelir. Sayfa dili <html lang> / URL'den.
// (18.08.2026 denetimi O2/Y3/Y4. Uretici/yama: i18n/duzelt_faz2_appjs.py)
// =====================================================================
var UI_I18N = {
  en: {
    search_ph: 'Search pages, products, blogs...', search_ph_short: 'Search website...',
    close_search: 'Close Search', popular: 'Popular Searches', popular_badge: 'Popular',
    suggested_for: 'Suggested Results for', suggested_badge: 'Suggested',
    no_suggestions: 'No suggestions found for', no_results: 'No results found matching your query.',
    cat_Products: 'Products', cat_Industries: 'Industries', cat_Knowledge: 'Knowledge', cat_General: 'General',
    cookie_settings: 'Cookie Settings', cookie_title: 'Cookie Preferences',
    cookie_text: 'We use cookies to optimize your experience, analyze site usage, and support our marketing efforts. Customize your settings below.',
    cookie_ess: 'Essential Cookies', cookie_ess_d: 'Necessary for the website to function properly. Cannot be disabled.',
    cookie_ana: 'Analytical Cookies', cookie_ana_d: 'Help us measure traffic and analyze user behavior to improve site features.',
    cookie_mkt: 'Marketing Cookies', cookie_mkt_d: 'Used to deliver targeted content and monitor advertising performance.',
    cookie_save: 'Save Settings', cookie_accept: 'Accept All', back_top: 'Back to Top',
    spec_tab: 'Talk to a Specialist', spec_close: 'Close',
    spec_text: 'Our NIR spectroscopy experts are ready to help you find the right solution for your process. Reach out through any channel below.',
    spec_call: 'Call Us', spec_email: 'Email', spec_cta: 'Request a Consultation',
    cookie_saved: 'Cookie preferences saved.', cookie_all: 'All cookies accepted.',
    cta_badge: 'Application Consultation',
    cta_title: 'Optimize Your Process with Real-Time NIR',
    cta_desc: 'Tell us about your product and process; our application team will get back to you with a suitable solution and a quote.',
    cta_btn: 'Discuss Your Application',
    form_sales_lbl: "Application Details / Message",
    form_sales_ph: "Tell us about your parameters of interest, samples, or process requirements...",
    form_support_lbl: "Describe the Technical Issue",
    form_support_ph: "Please describe the symptoms, error messages, or calibration behavior in detail...",
    form_general_lbl: "Your Inquiry / Message",
    form_general_ph: "Please type your general question or partnership proposal details here...",
    form_sending: "Sending...",
    form_failed: "Submission failed:",
    form_error: "An error occurred during submission. Please try again later or email us at info@ustechinnovations.com.",
    open_search: "Open Search",
    locale: "en-US"
  },
  tr: {
    search_ph: 'Sayfa, ürün, blog ara...', search_ph_short: 'Sitede ara...',
    close_search: 'Aramayı kapat', popular: 'Popüler Aramalar', popular_badge: 'Popüler',
    suggested_for: 'Önerilen sonuçlar:', suggested_badge: 'Önerilen',
    no_suggestions: 'Öneri bulunamadı:', no_results: 'Aramanızla eşleşen sonuç bulunamadı.',
    cat_Products: 'Ürünler', cat_Industries: 'Sektörler', cat_Knowledge: 'Bilgi Bankası', cat_General: 'Genel',
    cookie_settings: 'Çerez Ayarları', cookie_title: 'Çerez Tercihleri',
    cookie_text: 'Deneyiminizi iyileştirmek, site kullanımını analiz etmek ve pazarlama çalışmalarımızı desteklemek için çerezler kullanıyoruz. Tercihlerinizi aşağıdan belirleyin.',
    cookie_ess: 'Zorunlu Çerezler', cookie_ess_d: 'Sitenin düzgün çalışması için gereklidir. Kapatılamaz.',
    cookie_ana: 'Analitik Çerezler', cookie_ana_d: 'Trafiği ölçmemize ve site özelliklerini iyileştirmek için kullanıcı davranışını analiz etmemize yardımcı olur.',
    cookie_mkt: 'Pazarlama Çerezleri', cookie_mkt_d: 'Hedefli içerik sunmak ve reklam performansını izlemek için kullanılır.',
    cookie_save: 'Ayarları Kaydet', cookie_accept: 'Tümünü Kabul Et', back_top: 'Başa Dön',
    spec_tab: 'Bir Uzmanla Görüşün', spec_close: 'Kapat',
    spec_text: 'NIR spektroskopi uzmanlarımız prosesiniz için doğru çözümü bulmanıza yardımcı olmaya hazır. Aşağıdaki kanallardan bize ulaşın.',
    spec_call: 'Bizi Arayın', spec_email: 'E-posta', spec_cta: 'Danışmanlık Talep Edin',
    cookie_saved: 'Çerez tercihleri kaydedildi.', cookie_all: 'Tüm çerezler kabul edildi.',
    cta_badge: 'Uygulama Görüşmesi',
    cta_title: 'Üretiminizi Gerçek Zamanlı NIR ile Güçlendirin',
    cta_desc: 'Ürününüzü ve prosesinizi anlatın; uygulama ekibimiz size uygun çözüm ve teklifle dönüş yapsın.',
    cta_btn: 'Uygulamanızı Görüşelim',
    form_sales_lbl: "Uygulama Detayları / Mesaj",
    form_sales_ph: "İlgilendiğiniz parametreleri, numunelerinizi veya proses gereksinimlerinizi anlatın...",
    form_support_lbl: "Teknik Sorunu Açıklayın",
    form_support_ph: "Belirtileri, hata mesajlarını veya kalibrasyon davranışını ayrıntılı olarak açıklayın...",
    form_general_lbl: "Talebiniz / Mesajınız",
    form_general_ph: "Genel sorunuzu veya iş birliği önerinizin ayrıntılarını buraya yazın...",
    form_sending: "Gönderiliyor...",
    form_failed: "Gönderim başarısız oldu:",
    form_error: "Gönderim sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin ya da info@ustechinnovations.com adresine e-posta gönderin.",
    open_search: "Aramayı aç",
    locale: "tr-TR"
  },
  fr: {
    search_ph: 'Rechercher pages, produits, blogs...', search_ph_short: 'Rechercher sur le site...',
    close_search: 'Fermer la recherche', popular: 'Recherches populaires', popular_badge: 'Populaire',
    suggested_for: 'Résultats suggérés pour', suggested_badge: 'Suggéré',
    no_suggestions: 'Aucune suggestion pour', no_results: 'Aucun résultat ne correspond à votre recherche.',
    cat_Products: 'Produits', cat_Industries: 'Secteurs', cat_Knowledge: 'Connaissances', cat_General: 'Général',
    cookie_settings: 'Paramètres des cookies', cookie_title: 'Préférences de cookies',
    cookie_text: "Nous utilisons des cookies pour optimiser votre expérience, analyser l'utilisation du site et soutenir nos actions marketing. Personnalisez vos paramètres ci-dessous.",
    cookie_ess: 'Cookies essentiels', cookie_ess_d: 'Nécessaires au bon fonctionnement du site. Ne peuvent pas être désactivés.',
    cookie_ana: 'Cookies analytiques', cookie_ana_d: "Nous aident à mesurer le trafic et à analyser le comportement des utilisateurs pour améliorer le site.",
    cookie_mkt: 'Cookies marketing', cookie_mkt_d: 'Utilisés pour diffuser du contenu ciblé et mesurer les performances publicitaires.',
    cookie_save: 'Enregistrer', cookie_accept: 'Tout accepter', back_top: 'Retour en haut',
    spec_tab: 'Parler à un spécialiste', spec_close: 'Fermer',
    spec_text: 'Nos experts en spectroscopie NIR sont prêts à vous aider à trouver la solution adaptée à votre procédé. Contactez-nous par le canal de votre choix.',
    spec_call: 'Appelez-nous', spec_email: 'E-mail', spec_cta: 'Demander une consultation',
    cookie_saved: 'Préférences de cookies enregistrées.', cookie_all: 'Tous les cookies acceptés.',
    cta_badge: 'Échange sur votre application',
    cta_title: 'Optimisez votre production avec le NIR',
    cta_desc: 'Présentez-nous votre produit et votre procédé : notre équipe applications vous proposera une solution adaptée et un devis.',
    cta_btn: 'Parlons de votre application',
    form_sales_lbl: "Votre application de mesure / Message",
    form_sales_ph: "Parlez-nous de vos paramètres d'intérêt, de vos échantillons ou des exigences de votre procédé...",
    form_support_lbl: "Décrivez le problème technique",
    form_support_ph: "Décrivez en détail les symptômes, les messages d'erreur ou le comportement de l'étalonnage...",
    form_general_lbl: "Votre demande / Message",
    form_general_ph: "Saisissez ici votre question générale ou les détails de votre proposition de partenariat...",
    form_sending: "Envoi en cours...",
    form_failed: "Échec de l'envoi :",
    form_error: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard ou nous écrire à info@ustechinnovations.com.",
    open_search: "Ouvrir la recherche",
    locale: "fr-FR"
  },
  de: {
    search_ph: 'Seiten, Produkte, Blogs durchsuchen...', search_ph_short: 'Website durchsuchen...',
    close_search: 'Suche schließen', popular: 'Beliebte Suchanfragen', popular_badge: 'Beliebt',
    suggested_for: 'Vorgeschlagene Ergebnisse für', suggested_badge: 'Vorschlag',
    no_suggestions: 'Keine Vorschläge für', no_results: 'Keine Ergebnisse für Ihre Suche gefunden.',
    cat_Products: 'Produkte', cat_Industries: 'Branchen', cat_Knowledge: 'Wissen', cat_General: 'Allgemein',
    cookie_settings: 'Cookie-Einstellungen', cookie_title: 'Cookie-Einstellungen',
    cookie_text: 'Wir verwenden Cookies, um Ihr Erlebnis zu optimieren, die Nutzung der Website zu analysieren und unser Marketing zu unterstützen. Passen Sie Ihre Einstellungen unten an.',
    cookie_ess: 'Notwendige Cookies', cookie_ess_d: 'Für die Funktion der Website erforderlich. Können nicht deaktiviert werden.',
    cookie_ana: 'Analyse-Cookies', cookie_ana_d: 'Helfen uns, den Traffic zu messen und das Nutzerverhalten zu analysieren, um die Website zu verbessern.',
    cookie_mkt: 'Marketing-Cookies', cookie_mkt_d: 'Dienen der Bereitstellung zielgerichteter Inhalte und der Messung der Werbeleistung.',
    cookie_save: 'Einstellungen speichern', cookie_accept: 'Alle akzeptieren', back_top: 'Nach oben',
    spec_tab: 'Mit einem Experten sprechen', spec_close: 'Schließen',
    spec_text: 'Unsere NIR-Spektroskopie-Experten helfen Ihnen gern, die passende Lösung für Ihren Prozess zu finden. Kontaktieren Sie uns über einen der folgenden Kanäle.',
    spec_call: 'Rufen Sie uns an', spec_email: 'E-Mail', spec_cta: 'Beratung anfordern',
    cookie_saved: 'Cookie-Einstellungen gespeichert.', cookie_all: 'Alle Cookies akzeptiert.',
    cta_badge: 'Anwendungsberatung',
    cta_title: 'Optimieren Sie Ihre Produktion mit NIR',
    cta_desc: 'Beschreiben Sie uns Ihr Produkt und Ihren Prozess – unser Anwendungsteam meldet sich mit einer passenden Lösung und einem Angebot.',
    cta_btn: 'Ihre Anwendung besprechen',
    form_sales_lbl: "Ihre Messaufgabe / Nachricht",
    form_sales_ph: "Erzählen Sie uns von den gewünschten Parametern, Ihren Proben oder Ihren Prozessanforderungen ...",
    form_support_lbl: "Beschreiben Sie das technische Problem",
    form_support_ph: "Bitte beschreiben Sie Symptome, Fehlermeldungen oder das Kalibrierverhalten im Detail ...",
    form_general_lbl: "Ihre Anfrage / Nachricht",
    form_general_ph: "Bitte geben Sie hier Ihre allgemeine Frage oder die Details Ihres Partnerschaftsvorschlags ein ...",
    form_sending: "Wird gesendet ...",
    form_failed: "Senden fehlgeschlagen:",
    form_error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder schreiben Sie uns an info@ustechinnovations.com.",
    open_search: "Suche öffnen",
    locale: "de-DE"
  },
  es: {
    search_ph: 'Buscar páginas, productos, blogs...', search_ph_short: 'Buscar en el sitio...',
    close_search: 'Cerrar búsqueda', popular: 'Búsquedas populares', popular_badge: 'Popular',
    suggested_for: 'Resultados sugeridos para', suggested_badge: 'Sugerido',
    no_suggestions: 'No hay sugerencias para', no_results: 'No se encontraron resultados para su búsqueda.',
    cat_Products: 'Productos', cat_Industries: 'Sectores', cat_Knowledge: 'Conocimiento', cat_General: 'General',
    cookie_settings: 'Configuración de cookies', cookie_title: 'Preferencias de cookies',
    cookie_text: 'Utilizamos cookies para optimizar su experiencia, analizar el uso del sitio y apoyar nuestras acciones de marketing. Personalice su configuración a continuación.',
    cookie_ess: 'Cookies esenciales', cookie_ess_d: 'Necesarias para el funcionamiento del sitio. No se pueden desactivar.',
    cookie_ana: 'Cookies analíticas', cookie_ana_d: 'Nos ayudan a medir el tráfico y analizar el comportamiento de los usuarios para mejorar el sitio.',
    cookie_mkt: 'Cookies de marketing', cookie_mkt_d: 'Se utilizan para ofrecer contenido dirigido y medir el rendimiento publicitario.',
    cookie_save: 'Guardar configuración', cookie_accept: 'Aceptar todo', back_top: 'Volver arriba',
    spec_tab: 'Hable con un especialista', spec_close: 'Cerrar',
    spec_text: 'Nuestros expertos en espectroscopía NIR están listos para ayudarle a encontrar la solución adecuada para su proceso. Contáctenos por cualquiera de estos canales.',
    spec_call: 'Llámenos', spec_email: 'Correo', spec_cta: 'Solicitar consulta',
    cookie_saved: 'Preferencias de cookies guardadas.', cookie_all: 'Todas las cookies aceptadas.',
    cta_badge: 'Consulta de aplicación',
    cta_title: 'Optimice su producción con NIR',
    cta_desc: 'Cuéntenos sobre su producto y su proceso; nuestro equipo de aplicaciones le responderá con una solución adecuada y un presupuesto.',
    cta_btn: 'Hablemos de su aplicación',
    form_sales_lbl: "Su aplicación de medición / Mensaje",
    form_sales_ph: "Cuéntenos qué parámetros le interesan, sus muestras o los requisitos de su proceso...",
    form_support_lbl: "Describa el problema técnico",
    form_support_ph: "Describa con detalle los síntomas, los mensajes de error o el comportamiento de la calibración...",
    form_general_lbl: "Su consulta / Mensaje",
    form_general_ph: "Escriba aquí su consulta general o los detalles de su propuesta de colaboración...",
    form_sending: "Enviando...",
    form_failed: "Error en el envío:",
    form_error: "Se produjo un error durante el envío. Inténtelo de nuevo más tarde o escríbanos a info@ustechinnovations.com.",
    open_search: "Abrir búsqueda",
    locale: "es-ES"
  },
  ar: {
    search_ph: 'البحث في الصفحات والمنتجات...', search_ph_short: 'البحث في الموقع...',
    close_search: 'إغلاق البحث', popular: 'عمليات البحث الشائعة', popular_badge: 'شائع',
    suggested_for: 'النتائج المقترحة لـ', suggested_badge: 'مقترح',
    no_suggestions: 'لم يتم العثور على اقتراحات لـ', no_results: 'لم يتم العثور على نتائج تطابق استفسارك.',
    cat_Products: 'المنتجات', cat_Industries: 'الصناعات', cat_Knowledge: 'المعرفة', cat_General: 'عام',
    cookie_settings: 'إعدادات ملفات تعريف الارتباط', cookie_title: 'تفضيلات ملفات تعريف الارتباط',
    cookie_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع ودعم جهودنا التسويقية. خصص إعداداتك أدناه.',
    cookie_ess: 'ملفات تعريف الارتباط الأساسية', cookie_ess_d: 'ضرورية لعمل الموقع بشكل صحيح. لا يمكن تعطيلها.',
    cookie_ana: 'ملفات تعريف الارتباط التحليلية', cookie_ana_d: 'تساعدنا في قياس حركة المرور وتحليل سلوك المستخدمين لتحسين الموقع.',
    cookie_mkt: 'ملفات تعريف الارتباط التسويقية', cookie_mkt_d: 'تُستخدم لتقديم محتوى مستهدف وقياس أداء الإعلانات.',
    cookie_save: 'حفظ الإعدادات', cookie_accept: 'قبول الكل', back_top: 'العودة إلى الأعلى',
    spec_tab: 'تحدث مع خبير متخصص', spec_close: 'إغلاق',
    spec_text: 'خبراء التحليل الطيفي NIR لدينا مستعدون لمساعدتك في العثور على الحل المناسب لعمليتك. تواصل معنا عبر أي قناة أدناه.',
    spec_call: 'اتصل بنا', spec_email: 'البريد الإلكتروني', spec_cta: 'طلب استشارة',
    cookie_saved: 'تم حفظ تفضيلات ملفات تعريف الارتباط.', cookie_all: 'تم قبول جميع ملفات تعريف الارتباط.',
    cta_badge: 'استشارة التطبيق',
    cta_title: 'عزز كفاءة إنتاجك مع تقنية NIR في الوقت الفعلي',
    cta_desc: 'أخبرونا عن منتجكم وعمليتكم، وسيعود إليكم فريق التطبيقات لدينا بحل مناسب وعرض سعر.',
    cta_btn: 'لنناقش تطبيقكم',
    form_sales_lbl: "تفاصيل تطبيق القياس / الرسالة",
    form_sales_ph: "أخبرنا عن المعلمات التي تهمك أو العينات أو متطلبات العملية...",
    form_support_lbl: "صف المشكلة التقنية",
    form_support_ph: "يرجى وصف الأعراض أو رسائل الخطأ أو سلوك المعايرة بالتفصيل...",
    form_general_lbl: "استفسارك / رسالتك",
    form_general_ph: "يرجى كتابة سؤالك العام أو تفاصيل اقتراح الشراكة هنا...",
    form_sending: "جارٍ الإرسال...",
    form_failed: "تعذّر الإرسال:",
    form_error: "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا أو مراسلتنا على info@ustechinnovations.com.",
    open_search: "فتح البحث",
    locale: "ar-u-nu-latn"
  },
  zh: {
    search_ph: '搜索页面、产品、技术博客...', search_ph_short: '搜索网站...',
    close_search: '关闭搜索', popular: '热门搜索', popular_badge: '热门',
    suggested_for: '推荐结果：', suggested_badge: '推荐',
    no_suggestions: '未找到相关建议：', no_results: '未找到符合您查询条件的结果。',
    cat_Products: '产品中心', cat_Industries: '行业应用', cat_Knowledge: '知识中心', cat_General: '常规页面',
    cookie_settings: 'Cookie 设置', cookie_title: 'Cookie 偏好设置',
    cookie_text: '我们使用 Cookie 来优化您的浏览体验、分析网站流量并支持我们的营销活动。您可以在下方自定义设置。',
    cookie_ess: '必要 Cookie', cookie_ess_d: '网站正常运行所必需的 Cookie，无法禁用。',
    cookie_ana: '分析 Cookie', cookie_ana_d: '帮助我们统计访问量并分析用户行为，以持续改进网站功能。',
    cookie_mkt: '营销 Cookie', cookie_mkt_d: '用于提供针对性内容并衡量广告投放效果。',
    cookie_save: '保存设置', cookie_accept: '接受全部', back_top: '返回顶部',
    spec_tab: '咨询技术专家', spec_close: '关闭',
    spec_text: '我们的近红外（NIR）光谱专家随时为您提供量身定制的工艺解决方案。请通过以下方式与我们联系。',
    spec_call: '致电我们', spec_email: '发送邮件', spec_cta: '预约技术咨询',
    cookie_saved: 'Cookie 偏好已保存。', cookie_all: '已接受所有 Cookie。',
    cta_badge: '应用咨询',
    cta_title: '借助实时近红外光谱赋能生产工艺',
    cta_desc: '请告诉我们您的产品和工艺，我们的应用团队将为您提供合适的解决方案和报价。',
    cta_btn: '探讨您的应用需求',
    form_sales_lbl: "测量应用详情 / 留言",
    form_sales_ph: "告诉我们您感兴趣的参数、样品或工艺要求……",
    form_support_lbl: "请描述技术问题",
    form_support_ph: "请详细描述故障现象、错误信息或校准表现……",
    form_general_lbl: "您的咨询 / 留言",
    form_general_ph: "请在此输入您的一般问题或合作提案详情……",
    form_sending: "正在发送……",
    form_failed: "提交失败：",
    form_error: "提交时出错。请稍后重试，或发送邮件至 info@ustechinnovations.com。",
    open_search: "打开搜索",
    locale: "zh-CN"
  }
};
function ui(key) {
    var lang = (typeof detectCurrentLang === 'function') ? detectCurrentLang() : 'en';
    var d = UI_I18N[lang] || UI_I18N.en;
    return (d[key] !== undefined) ? d[key] : (UI_I18N.en[key] !== undefined ? UI_I18N.en[key] : key);
}
// Aksan / Turkce harf katlamali kucuk harf: "İlaç"->"ilac", "gıda"->"gida", "étalonnage"->"etalonnage"
function fold(str) {
    return String(str || '').replace(/<[^>]+>/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/ı/g, 'i').replace(/I/g, 'i').toLowerCase();
}

// Dil klasorlerinde (tr/ fr/ de/ es/) karsiligi OLAN sayfalar. Bunlarin disindaki
// hedefler (bloglar, eski urun URL'leri, dogrulama dosyalari) yalnizca kokte var.
// SamplePrep yayinlanirsa buraya eklenmeli (product-sampleprep.html). StarchQC 07.09.2026'da eklendi.
var TRANSLATED_PAGES = {};
[
 'index.html',
 'about.html',
 'contact.html',
 'faq.html',
 'privacy-policy.html',
 'terms-of-service.html',
 'industries.html',
 'industry-dairy.html',
 'industry-food-feed.html',
 'industry-chemical-pharma.html',
 'products.html',
 'products-devices.html',
 'products-software.html',
 'products-portal.html',
 'products-calibration-models.html',
 'product-calix.html',
 'product-masterline.html',
 'product-prochem.html',
 'product-proline.html',
 'product-proline-17ec.html',
 'product-proline-17ecs.html',
 // 'product-trueline-17ec.html',  // Temporarily Hidden
 'product-starchqc.html',
 // 'product-proline-17es.html',  // Temporarily Hidden
 'product-proline-2550.html',
 'product-tornado.html',
 'knowledge.html',
 'knowledge-technology.html',
 'knowledge-blogs.html',
 'blog-5-questions-buying-ftnir.html',
 'blog-bioreactor-cell-culture.html',
 'blog-blend-uniformity-pharma.html',
 'blog-business-case-inline-nir.html',
 'blog-butter-fat-moisture.html',
 'blog-calibration-transfer.html',
 'blog-cattle-feed-waste.html',
 'blog-cheese-moisture-milling.html',
 'blog-cheese-yield-prediction.html',
 'blog-chemical-alkyd-resin.html',
 'blog-corn-gluten-dryer.html',
 'blog-dairy-receiving-total-solids.html',
 'blog-feed-fiber-ash.html',
 'blog-fiber-interface-reactors.html',
 'blog-flour-ash-milling.html',
 'blog-ground-beef-fat.html',
 'blog-hidden-costs-lab-qc.html',
 'blog-hydroxyl-value-polyol.html',
 'blog-inline-atline-offline.html',
 'blog-inline-ftnir-paradigm.html',
 'blog-liquid-milk-standardization.html',
 'blog-mems-durability-industrial.html',
 'blog-milk-adulteration-receiving.html',
 'blog-milk-powder-analysis.html',
 'blog-moisture-milk-powder.html',
 'blog-msc-snv-preprocessing.html',
 'blog-nir-vs-ftnir.html',
 'blog-olive-oil-acidity.html',
 'blog-opc-ua-dosing-valves.html',
 'blog-outlier-detection-mahalanobis.html',
 'blog-packaging-polymer-density.html',
 'blog-pca-classification-models.html',
 'blog-petfood-extrusion-moisture.html',
 'blog-pharma-granulation-moisture.html',
 'blog-pharma-raw-material-id.html',
 'blog-plc-scada-integration.html',
 'blog-pls-calibration-explained.html',
 'blog-pls-regression-calix.html',
 'blog-polymerization-hydroxyl.html',
 'blog-prochem-measurement-control.html',
 'blog-savitzky-golay-filtering.html',
 'blog-semolina-starch-gluten.html',
 'blog-solvent-distillation-purity.html',
 'blog-soybean-crush-yield.html',
 'blog-spectral-range-advantage.html',
 'blog-spectrometer-reference-bg.html',
 'blog-starch-extraction-milling.html',
 'blog-wavelength-selection-ipls.html',
 'blog-what-is-ftnir.html',
 'blog-what-is-nir-spectroscopy.html',
 'blog-whey-permeate-evaporator.html',
 'blog-yogurt-fermentation-lactic.html'
].forEach(function(p) { TRANSLATED_PAGES[p] = true; });

// Eski URL -> guncel sayfa (eski .htaccess yonlendirmeleri; GitHub Pages .htaccess okumaz)
var LEGACY_PAGE_MAP = {
    'product-n-sens-feed.html': 'product-masterline.html',
    'product-n-sens-online.html': 'product-proline-17ec.html',   // 17ES emekli -> 17EC (07.09.2026)
    'product-n-sens-tornado.html': 'product-tornado.html',
    'product-proline-17es.html': 'product-proline-17ec.html',   // emekli urun -> halefi (07.09.2026)
    'product-n-sens-sampleprep.html': 'products-devices.html',   // SamplePrep bekletiliyor
    'product-i-sens-starch.html': 'product-starchqc.html',        // StarchQC yayinda (07.09.2026)
    'about-us.html': 'about.html',
    'technology.html': 'knowledge-technology.html',
    'our-technology.html': 'knowledge-technology.html'
};

// Sayfa ici goreli bir hedefi (searchDb, oneriler) mevcut sayfanin diline gore cozer:
// dil sayfasinda cevirisi olmayan hedef koke ("../") gider.
function resolveSiteUrl(url) {
    if (!url || /^(https?:|mailto:|tel:|#|\/)/.test(url)) return url;
    var base = url.split('#')[0].split('?')[0];
    if (detectCurrentLang() !== 'en' && !TRANSLATED_PAGES[base]) return '../' + url;
    return url;
}
// SEARCH_I18N: arama_dizini_uret.py doldurur (sayfa -> dil -> {t: baslik, s: aciklama, k: anahtar})
/* SEARCH_I18N_BEGIN */
// Uretici: i18n/arama_dizini_uret.py -- ELLE DUZENLEME, ceviri JSON'larini duzelt.
var SEARCH_I18N = {
  "index.html": {
    "tr": {
      "t": "Hat İçi NIR ve FT-NIR Proses Analizörleri",
      "s": "Gıda, yem, süt ve kimya tesisleri için hat içi ve hat başı NIR ve FT-NIR analizörleri; caliX kemometri ve ProChem yazılımıyla gerçek zamanlı kalite kontrolü.",
      "k": "hat i çi nir ve ft-nir proses analizörleri gıda yem süt ve kimya tesisleri için hat içi ve hat başı nir ve ft-nir analizörleri calix kemometri ve prochem yazılımıyla gerçek zamanlı kalite kontrolü ana sayfa anasayfa ustech"
    },
    "fr": {
      "t": "Analyseurs de procédés NIR et FT-NIR en ligne",
      "s": "Analyseurs NIR et FT-NIR en ligne et at-line, chimiométrie caliX et logiciel ProChem : le contrôle qualité en temps réel pour l'agroalimentaire et la chimie.",
      "k": "analyseurs de procédés nir et ft-nir en ligne analyseurs nir et ft-nir en ligne et at-line chimiométrie calix et logiciel prochem le contrôle qualité en temps réel pour l agroalimentaire et la chimie accueil"
    },
    "de": {
      "t": "Inline-NIR- und FT-NIR-Prozessanalysatoren",
      "s": "USTECH entwickelt Inline- und At-Line-NIR- und FT-NIR-Analysatoren, caliX-Chemometrie und ProChem für die Echtzeit-QK in Lebensmittel, Futter und Chemie.",
      "k": "inline-nir- und ft-nir-prozessanalysatoren ustech entwickelt inline- und at-line-nir- und ft-nir-analysatoren calix-chemometrie und prochem für die echtzeit-qk in lebensmittel futter und chemie startseite"
    },
    "es": {
      "t": "Analizadores de procesos NIR y FT-NIR en línea",
      "s": "USTECH fabrica analizadores NIR y FT-NIR en línea y at-line, la quimiometría caliX y ProChem para el control de calidad en alimentos, piensos y química.",
      "k": "analizadores de procesos nir y ft-nir en línea ustech fabrica analizadores nir y ft-nir en línea y at-line la quimiometría calix y prochem para el control de calidad en alimentos piensos y química inicio"
    },
    "ar": {
      "t": "أجهزة تحليل العمليات المضمنة NIR وFT-NIR",
      "s": "تصنع USTECH أجهزة تحليل NIR وFT-NIR المضمنة وعلى الخط، وبرنامج القياسات الكيميائية caliX وبرنامج ProChem لمراقبة الجودة الفورية في الأغذية والأعلاف والكيماويات.",
      "k": "أجهزة تحليل العمليات المضمنة nir وft-nir تصنع ustech أجهزة تحليل nir وft-nir المضمنة وعلى الخط، وبرنامج القياسات الكيميائية calix وبرنامج prochem لمراقبة الجودة الفورية في الأغذية والأعلاف والكيماويات الرئيسية"
    },
    "zh": {
      "t": "在线 NIR 和 FT-NIR 过程分析仪",
      "s": "USTECH 提供在线和线旁 NIR 与 FT-NIR 分析仪、caliX 化学计量学软件和 ProChem 软件，用于食品、饲料和化工行业的实时质量控制。",
      "k": "在线 nir 和 ft-nir 过程分析仪 ustech 提供在线和线旁 nir 与 ft-nir 分析仪 calix 化学计量学软件和 prochem 软件 用于食品 饲料和化工行业的实时质量控制 首页 官网 ustech"
    }
  },
  "about.html": {
    "tr": {
      "t": "Hakkımızda: NIR ve FT-NIR Analizörleri, Kemometri",
      "s": "2023'te Durham, NC'de kurulan USTECH Innovations LLC; NIR ve FT-NIR proses analizörleri, caliX kemometri yazılımı ve ProChem otomasyonu geliştirir.",
      "k": "hakkımızda nir ve ft-nir analizörleri kemometri 2023 te durham nc de kurulan ustech innovations llc nir ve ft-nir proses analizörleri calix kemometri yazılımı ve prochem otomasyonu geliştirir hakkımızda hakkinda şirket ekip misyon"
    },
    "fr": {
      "t": "À propos : analyseurs NIR et FT-NIR, chimiométrie",
      "s": "Fondée en 2023 à Durham (Caroline du Nord), USTECH Innovations LLC développe des analyseurs de procédé NIR et FT-NIR, le logiciel caliX et ProChem.",
      "k": "à propos analyseurs nir et ft-nir chimiométrie fondée en 2023 à durham caroline du nord ustech innovations llc développe des analyseurs de procédé nir et ft-nir le logiciel calix et prochem à propos entreprise équipe"
    },
    "de": {
      "t": "Über uns: NIR- und FT-NIR-Analysatoren, Chemometrie",
      "s": "Die 2023 in Durham, NC, gegründete USTECH Innovations LLC entwickelt NIR- und FT-NIR-Prozessanalysatoren, die Chemometrie-Software caliX und ProChem.",
      "k": "über uns nir- und ft-nir-analysatoren chemometrie die 2023 in durham nc gegründete ustech innovations llc entwickelt nir- und ft-nir-prozessanalysatoren die chemometrie-software calix und prochem über uns unternehmen team"
    },
    "es": {
      "t": "Nosotros: analizadores NIR y FT-NIR, quimiometría",
      "s": "USTECH Innovations LLC, fundada en 2023 en Durham (Carolina del Norte), desarrolla analizadores de proceso NIR y FT-NIR, el software caliX y ProChem.",
      "k": "nosotros analizadores nir y ft-nir quimiometría ustech innovations llc fundada en 2023 en durham carolina del norte desarrolla analizadores de proceso nir y ft-nir el software calix y prochem sobre nosotros empresa equipo"
    },
    "ar": {
      "t": "من نحن: أجهزة تحليل NIR وFT-NIR والقياسات الكيميائية",
      "s": "تأسست USTECH Innovations LLC عام 2023 في دورهام بولاية كارولاينا الشمالية، وتطوّر أجهزة تحليل العمليات NIR وFT-NIR وبرنامج caliX وأتمتة ProChem.",
      "k": "من نحن أجهزة تحليل nir وft-nir والقياسات الكيميائية تأسست ustech innovations llc عام 2023 في دورهام بولاية كارولاينا الشمالية، وتطوّر أجهزة تحليل العمليات nir وft-nir وبرنامج calix وأتمتة prochem من نحن الشركة الفريق"
    },
    "zh": {
      "t": "关于我们：NIR 与 FT-NIR 分析仪及化学计量学",
      "s": "USTECH Innovations LLC 于 2023 年在北卡罗来纳州达勒姆成立，开发 NIR 与 FT-NIR 过程分析仪、caliX 化学计量学软件和 ProChem 自动化软件。",
      "k": "关于我们 nir 与 ft-nir 分析仪及化学计量学 ustech innovations llc 于 2023 年在北卡罗来纳州达勒姆成立 开发 nir 与 ft-nir 过程分析仪 calix 化学计量学软件和 prochem 自动化软件 关于我们 公司 团队 愿景"
    }
  },
  "contact.html": {
    "tr": {
      "t": "İletişim: NIR Analizörü Teklifi ve Teknik Destek",
      "s": "NIR analizörleri, kemometri yazılımı ve kalibrasyonlarla ilgili teklif, teknik destek veya iş ortaklığı talepleriniz için USTECH uygulama uzmanlarına ulaşın.",
      "k": "i letişim nir analizörü teklifi ve teknik destek nir analizörleri kemometri yazılımı ve kalibrasyonlarla ilgili teklif teknik destek veya iş ortaklığı talepleriniz için ustech uygulama uzmanlarına ulaşın iletişim iletisim teklif fiyat destek adres telefon"
    },
    "fr": {
      "t": "Contact : devis d'analyseurs NIR et support",
      "s": "Contactez les spécialistes applications d'USTECH pour un devis, un support technique ou un partenariat concernant nos analyseurs NIR, logiciels de chimiométrie et calibrations.",
      "k": "contact devis d analyseurs nir et support contactez les spécialistes applications d ustech pour un devis un support technique ou un partenariat concernant nos analyseurs nir logiciels de chimiométrie et calibrations contact devis prix support"
    },
    "de": {
      "t": "Kontakt: Angebote für NIR-Analysatoren & Support",
      "s": "Kontaktieren Sie die Anwendungsspezialisten von USTECH für Angebote, technischen Support oder Partnerschaften zu NIR-Analysatoren, Chemometrie-Software und Kalibrierungen.",
      "k": "kontakt angebote für nir-analysatoren support kontaktieren sie die anwendungsspezialisten von ustech für angebote technischen support oder partnerschaften zu nir-analysatoren chemometrie-software und kalibrierungen kontakt angebot preis support"
    },
    "es": {
      "t": "Contacto: presupuestos de analizadores NIR y soporte",
      "s": "Contacte con los especialistas en aplicaciones de USTECH para presupuestos, soporte técnico o colaboraciones sobre analizadores NIR, software quimiométrico y calibraciones.",
      "k": "contacto presupuestos de analizadores nir y soporte contacte con los especialistas en aplicaciones de ustech para presupuestos soporte técnico o colaboraciones sobre analizadores nir software quimiométrico y calibraciones contacto cotización precio soporte"
    },
    "ar": {
      "t": "اتصل بنا: عروض أسعار محللات NIR والدعم الفني",
      "s": "تواصلوا مع أخصائيي التطبيقات في USTECH للحصول على عرض سعر أو دعم فني أو شراكة بشأن محللات NIR وبرامج القياسات الكيميائية والمعايرات.",
      "k": "اتصل بنا عروض أسعار محللات nir والدعم الفني تواصلوا مع أخصائيي التطبيقات في ustech للحصول على عرض سعر أو دعم فني أو شراكة بشأن محللات nir وبرامج القياسات الكيميائية والمعايرات اتصل بنا عرض سعر هاتف بريد دعم"
    },
    "zh": {
      "t": "联系我们：NIR 分析仪报价与技术支持",
      "s": "联系 USTECH 应用专家，获取 NIR 分析仪、化学计量学软件和校准模型的报价、技术支持或合作洽谈。",
      "k": "联系我们 nir 分析仪报价与技术支持 联系 ustech 应用专家 获取 nir 分析仪 化学计量学软件和校准模型的报价 技术支持或合作洽谈 联系我们 报价 支持 电话 邮箱 地址"
    }
  },
  "faq.html": {
    "tr": {
      "t": "NIR ve FT-NIR SSS: Cihaz, Yazılım, Kalibrasyon",
      "s": "NIR doğruluğu, cihaz donanımı, PLC/SCADA entegrasyonu, kalibrasyon aktarımı, bakım ve yatırım getirisi üzerine USTECH uygulama ekibinden 27 soru-yanıt.",
      "k": "nir ve ft-nir sss cihaz yazılım kalibrasyon nir doğruluğu cihaz donanımı plc scada entegrasyonu kalibrasyon aktarımı bakım ve yatırım getirisi üzerine ustech uygulama ekibinden 27 soru-yanıt sss sık sorulan sorular soru cevap garanti bakım"
    },
    "fr": {
      "t": "FAQ NIR et FT-NIR : appareils, logiciel, étalonnage",
      "s": "27 réponses de l'équipe applications USTECH sur la précision NIR, le matériel, l'intégration PLC/SCADA, le transfert d'étalonnage, la maintenance et le ROI.",
      "k": "faq nir et ft-nir appareils logiciel étalonnage 27 réponses de l équipe applications ustech sur la précision nir le matériel l intégration plc scada le transfert d étalonnage la maintenance et le roi faq questions fréquentes garantie entretien"
    },
    "de": {
      "t": "NIR- und FT-NIR-FAQ: Geräte, Software, Kalibrierung",
      "s": "27 Antworten des USTECH-Anwendungsteams zu NIR-Genauigkeit, Hardware, SPS/SCADA-Integration, Kalibrierungsübertragung, Wartung und ROI.",
      "k": "nir- und ft-nir-faq geräte software kalibrierung 27 antworten des ustech-anwendungsteams zu nir-genauigkeit hardware sps scada-integration kalibrierungsübertragung wartung und roi faq häufige fragen garantie wartung"
    },
    "es": {
      "t": "Preguntas frecuentes sobre NIR y FT-NIR",
      "s": "27 respuestas del equipo de aplicaciones de USTECH sobre precisión NIR, hardware, integración PLC/SCADA, transferencia de calibración, mantenimiento y ROI.",
      "k": "preguntas frecuentes sobre nir y ft-nir 27 respuestas del equipo de aplicaciones de ustech sobre precisión nir hardware integración plc scada transferencia de calibración mantenimiento y roi preguntas frecuentes garantía mantenimiento"
    },
    "ar": {
      "t": "أسئلة شائعة حول NIR وFT-NIR: الأجهزة والبرامج والمعايرة",
      "s": "27 إجابة من فريق تطبيقات USTECH حول دقة NIR وعتاد أجهزة التحليل وتكامل PLC/SCADA ونقل المعايرة والصيانة وعائد الاستثمار.",
      "k": "أسئلة شائعة حول nir وft-nir الأجهزة والبرامج والمعايرة 27 إجابة من فريق تطبيقات ustech حول دقة nir وعتاد أجهزة التحليل وتكامل plc scada ونقل المعايرة والصيانة وعائد الاستثمار الأسئلة الشائعة ضمان صيانة"
    },
    "zh": {
      "t": "NIR 与 FT-NIR 常见问题：设备、软件与定标",
      "s": "USTECH 应用团队关于 NIR 精度、分析仪硬件、PLC/SCADA 集成、定标转移、维护和投资回报的 27 个解答。",
      "k": "nir 与 ft-nir 常见问题 设备 软件与定标 ustech 应用团队关于 nir 精度 分析仪硬件 plc scada 集成 定标转移 维护和投资回报的 27 个解答 常见问题 问答 质保 维护"
    }
  },
  "industries.html": {
    "tr": {
      "t": "Sektörel NIR ve FT-NIR: Gıda, Yem, Süt, Kimya",
      "s": "Hat içi NIR analizinin gıda ve yem üretiminde, süt işlemede ve kimya-ilaç üretiminde nasıl kullanıldığını görün. Sektörünüze uygun USTECH çözümleri.",
      "k": "sektörel nir ve ft-nir gıda yem süt kimya hat içi nir analizinin gıda ve yem üretiminde süt işlemede ve kimya-ilaç üretiminde nasıl kullanıldığını görün sektörünüze uygun ustech çözümleri sektörler sektor endüstri uygulama"
    },
    "fr": {
      "t": "Solutions NIR et FT-NIR par secteur : alimentation, produits laitiers, produits chimiques",
      "s": "L'analyse NIR en ligne au service de la meunerie et de l'alimentation animale, de la transformation laitière et de la production chimique et pharmaceutique.",
      "k": "solutions nir et ft-nir par secteur alimentation produits laitiers produits chimiques l analyse nir en ligne au service de la meunerie et de l alimentation animale de la transformation laitière et de la production chimique et pharmaceutique secteurs industries applications"
    },
    "de": {
      "t": "NIR- und FT-NIR-Lösungen nach Branche: Lebensmittel, Milchprodukte, Chemie",
      "s": "Wie Inline-NIR-Analytik Mühlen und Futtermittelwerke, Molkereien sowie die Chemie- und Pharmaproduktion unterstützt. Entdecken Sie die USTECH-Branchenlösungen.",
      "k": "nir- und ft-nir-lösungen nach branche lebensmittel milchprodukte chemie wie inline-nir-analytik mühlen und futtermittelwerke molkereien sowie die chemie- und pharmaproduktion unterstützt entdecken sie die ustech-branchenlösungen branchen industrien anwendungen"
    },
    "es": {
      "t": "Soluciones NIR y FT-NIR por industria: alimentaria, láctea, química",
      "s": "Descubra cómo el análisis NIR en línea apoya la molienda de alimentos y piensos, el procesado lácteo y la producción química o farmacéutica. Soluciones USTECH.",
      "k": "soluciones nir y ft-nir por industria alimentaria láctea química descubra cómo el análisis nir en línea apoya la molienda de alimentos y piensos el procesado lácteo y la producción química o farmacéutica soluciones ustech sectores industrias aplicaciones"
    },
    "ar": {
      "t": "حلول NIR وFT-NIR حسب الصناعة: الأغذية، الألبان، الكيماويات",
      "s": "اكتشف كيف يدعم التحليل المضمن بتقنية NIR طحن الأغذية والأعلاف ومعالجة الألبان والإنتاج الكيميائي والدوائي. استكشف حلول USTECH القطاعية.",
      "k": "حلول nir وft-nir حسب الصناعة الأغذية، الألبان، الكيماويات اكتشف كيف يدعم التحليل المضمن بتقنية nir طحن الأغذية والأعلاف ومعالجة الألبان والإنتاج الكيميائي والدوائي استكشف حلول ustech القطاعية الصناعات التطبيقات"
    },
    "zh": {
      "t": "按行业分类的 NIR 和 FT-NIR 解决方案：食品、乳制品、化工",
      "s": "了解在线 NIR 分析如何支持食品与饲料加工、乳品加工以及化工和制药生产。探索 USTECH 行业解决方案。",
      "k": "按行业分类的 nir 和 ft-nir 解决方案 食品 乳制品 化工 了解在线 nir 分析如何支持食品与饲料加工 乳品加工以及化工和制药生产 探索 ustech 行业解决方案 行业应用 工业 解决方案"
    }
  },
  "industry-food-feed.html": {
    "tr": {
      "t": "Yem Fabrikaları İçin NIR: Protein Fazlasına Son",
      "s": "Hammadde kabulünden bitmiş yeme kadar protein, nem ve yağın gerçek zamanlı NIR analizi. Formülü hedefe göre kurun, her partiyi USTECH ile kayıt altına alın.",
      "k": "yem fabrikaları i çin nir protein fazlasına son hammadde kabulünden bitmiş yeme kadar protein nem ve yağın gerçek zamanlı nir analizi formülü hedefe göre kurun her partiyi ustech ile kayıt altına alın gıda gida yem tahıl un protein nem yağ kül lif nişasta değirmen"
    },
    "fr": {
      "t": "NIR en ligne pour l'alimentation animale",
      "s": "Analyse NIR en temps réel des protéines, de l'humidité et des lipides, de la réception à l'aliment fini. Formulez à la cible et documentez chaque lot.",
      "k": "nir en ligne pour l alimentation animale analyse nir en temps réel des protéines de l humidité et des lipides de la réception à l aliment fini formulez à la cible et documentez chaque lot alimentation aliments animaux céréales farine protéine humidité"
    },
    "de": {
      "t": "Inline-NIR für Futtermühlen: kein Proteinüberschuss",
      "s": "Echtzeit-NIR-Analyse von Protein, Feuchte und Fett vom Rohstoffeingang bis zum Fertigfutter. Zielgenau formulieren und jede Charge mit USTECH dokumentieren.",
      "k": "inline-nir für futtermühlen kein proteinüberschuss echtzeit-nir-analyse von protein feuchte und fett vom rohstoffeingang bis zum fertigfutter zielgenau formulieren und jede charge mit ustech dokumentieren lebensmittel futtermittel getreide mehl protein feuchte"
    },
    "es": {
      "t": "NIR para fábricas de piensos: sin exceso de proteína",
      "s": "Análisis NIR en tiempo real de proteína, humedad y grasa desde la recepción hasta el pienso terminado. Formule al objetivo y documente cada lote con USTECH.",
      "k": "nir para fábricas de piensos sin exceso de proteína análisis nir en tiempo real de proteína humedad y grasa desde la recepción hasta el pienso terminado formule al objetivo y documente cada lote con ustech alimentos piensos granos harina proteína humedad"
    },
    "ar": {
      "t": "NIR مضمن لمصانع الأعلاف: أوقف هدر البروتين",
      "s": "تحليل NIR في الوقت الفعلي للبروتين والرطوبة والدهون من استلام المواد الخام حتى العلف النهائي. ركّب الخلطات وفق الهدف ووثّق كل دفعة مع USTECH.",
      "k": "nir مضمن لمصانع الأعلاف أوقف هدر البروتين تحليل nir في الوقت الفعلي للبروتين والرطوبة والدهون من استلام المواد الخام حتى العلف النهائي ركّب الخلطات وفق الهدف ووثّق كل دفعة مع ustech الأغذية والأعلاف الحبوب الدقيق البروتين الرطوبة"
    },
    "zh": {
      "t": "饲料厂在线 NIR：杜绝蛋白质过量",
      "s": "从原料接收到成品饲料，实时 NIR 分析蛋白质、水分和脂肪。按目标配方生产，并借助 USTECH 记录每一批次。",
      "k": "饲料厂在线 nir 杜绝蛋白质过量 从原料接收到成品饲料 实时 nir 分析蛋白质 水分和脂肪 按目标配方生产 并借助 ustech 记录每一批次 食品与饲料 谷物 面粉 蛋白质 水分 脂肪 灰分 纤维 淀粉 磨粉"
    }
  },
  "industry-dairy.html": {
    "tr": {
      "t": "Süt Sektörü İçin Hat İçi NIR: Yağ Standardizasyonu",
      "s": "Süt tesisleri için hat içi NIR: her tankeri bileşimine göre değerlendirin, yağı kapalı döngüyle standardize edin, peynir verimi ve süt tozu nemini yönetin.",
      "k": "süt sektörü i çin hat i çi nir yağ standardizasyonu süt tesisleri için hat içi nir her tankeri bileşimine göre değerlendirin yağı kapalı döngüyle standardize edin peynir verimi ve süt tozu nemini yönetin süt sut peynir tereyağı krema yoğurt süt tozu yağ protein"
    },
    "fr": {
      "t": "NIR en ligne pour la laiterie : matière grasse",
      "s": "NIR en ligne pour laiteries : évaluez chaque citerne, standardisez la matière grasse en boucle fermée, améliorez rendement fromager et humidité des poudres.",
      "k": "nir en ligne pour la laiterie matière grasse nir en ligne pour laiteries évaluez chaque citerne standardisez la matière grasse en boucle fermée améliorez rendement fromager et humidité des poudres produits laitiers lait fromage beurre crème yaourt"
    },
    "de": {
      "t": "Inline-NIR für Molkereien: Fettstandardisierung",
      "s": "Inline-NIR für Molkereien: jeden Milchtankwagen bewerten, Fett im geschlossenen Regelkreis standardisieren, Käseausbeute steigern, Pulverfeuchte im Ziel halten.",
      "k": "inline-nir für molkereien fettstandardisierung inline-nir für molkereien jeden milchtankwagen bewerten fett im geschlossenen regelkreis standardisieren käseausbeute steigern pulverfeuchte im ziel halten molkerei milch käse butter sahne joghurt"
    },
    "es": {
      "t": "NIR en línea para lácteos: estandarización de grasa",
      "s": "NIR en línea para lácteas: evalúe cada cisterna, estandarice la grasa en lazo cerrado, suba el rendimiento quesero y controle la humedad de la leche en polvo.",
      "k": "nir en línea para lácteos estandarización de grasa nir en línea para lácteas evalúe cada cisterna estandarice la grasa en lazo cerrado suba el rendimiento quesero y controle la humedad de la leche en polvo lácteos leche queso mantequilla crema yogur"
    },
    "ar": {
      "t": "NIR مضمن للألبان: توحيد نسبة الدهن والمردود",
      "s": "NIR مضمن لمصانع الألبان: تقييم كل صهريج حليب، وتوحيد نسبة الدهن بتحكم مغلق الحلقة، ورفع مردود الخثارة، وضبط رطوبة الحليب المجفف على الهدف.",
      "k": "nir مضمن للألبان توحيد نسبة الدهن والمردود nir مضمن لمصانع الألبان تقييم كل صهريج حليب، وتوحيد نسبة الدهن بتحكم مغلق الحلقة، ورفع مردود الخثارة، وضبط رطوبة الحليب المجفف على الهدف الألبان الحليب الجبن الزبدة الزبادي مسحوق الحليب"
    },
    "zh": {
      "t": "乳品在线 NIR：脂肪标准化与得率",
      "s": "面向乳品厂的在线 NIR：评估每一辆奶罐车、以闭环控制标准化脂肪、提高凝乳得率，并将奶粉水分保持在目标范围内。",
      "k": "乳品在线 nir 脂肪标准化与得率 面向乳品厂的在线 nir 评估每一辆奶罐车 以闭环控制标准化脂肪 提高凝乳得率 并将奶粉水分保持在目标范围内 乳制品 牛奶 奶酪 黄油 稀奶油 酸奶 乳粉 脂肪 蛋白质"
    }
  },
  "industry-chemical-pharma.html": {
    "tr": {
      "t": "Kimya ve İlaç İçin NIR Proses Analitiği (PAT)",
      "s": "Kimya ve ilaç tesisleri için hat içi NIR proses analitik teknolojisi (PAT): hammadde doğrulama, karışım homojenliği ve reaksiyon son noktası takibi.",
      "k": "kimya ve i laç i çin nir proses analitiği pat kimya ve ilaç tesisleri için hat içi nir proses analitik teknolojisi pat hammadde doğrulama karışım homojenliği ve reaksiyon son noktası takibi kimya ilaç ilac farma polimer reçine hidroksil karışım"
    },
    "fr": {
      "t": "NIR et analyse de procédé chimie-pharma (PAT)",
      "s": "PAT par NIR en ligne pour la chimie et la pharmacie : vérification des matières premières, homogénéité des mélanges, fin de réaction.",
      "k": "nir et analyse de procédé chimie-pharma pat pat par nir en ligne pour la chimie et la pharmacie vérification des matières premières homogénéité des mélanges fin de réaction chimie pharmacie pharma polymère résine"
    },
    "de": {
      "t": "NIR für Prozessanalytik in Chemie und Pharma (PAT)",
      "s": "Inline-NIR als Prozessanalysetechnik (PAT) für Chemie- und Pharmawerke: Rohstoffprüfung, Mischungshomogenität und Erkennung von Reaktionsendpunkten.",
      "k": "nir für prozessanalytik in chemie und pharma pat inline-nir als prozessanalysetechnik pat für chemie- und pharmawerke rohstoffprüfung mischungshomogenität und erkennung von reaktionsendpunkten chemie pharma polymer harz"
    },
    "es": {
      "t": "NIR para procesos químicos y farmacéuticos (PAT)",
      "s": "PAT con NIR en línea para plantas químicas y farmacéuticas: verificación de materias primas, homogeneidad de mezcla y fin de reacción.",
      "k": "nir para procesos químicos y farmacéuticos pat pat con nir en línea para plantas químicas y farmacéuticas verificación de materias primas homogeneidad de mezcla y fin de reacción química farmacéutica farma polímero resina"
    },
    "ar": {
      "t": "NIR لتحليلات العمليات الكيميائية والدوائية (PAT)",
      "s": "تقنية تحليل العمليات (PAT) المضمنة بتقنية NIR للمصانع الكيميائية والدوائية: التحقق من المواد الخام وتجانس الخلطات وتحديد نقاط نهاية التفاعل.",
      "k": "nir لتحليلات العمليات الكيميائية والدوائية pat تقنية تحليل العمليات pat المضمنة بتقنية nir للمصانع الكيميائية والدوائية التحقق من المواد الخام وتجانس الخلطات وتحديد نقاط نهاية التفاعل الكيمياء والصيدلة الأدوية البوليمر الراتنج"
    },
    "zh": {
      "t": "用于化工与制药过程分析 (PAT) 的 NIR",
      "s": "面向化工和制药工厂的在线 NIR 过程分析技术 (PAT)：原料验证、混合均匀度和反应终点监测。",
      "k": "用于化工与制药过程分析 pat 的 nir 面向化工和制药工厂的在线 nir 过程分析技术 pat 原料验证 混合均匀度和反应终点监测 化工与制药 聚合物 树脂 羟基值 反应监测 结晶 干燥"
    }
  },
  "products.html": {
    "tr": {
      "t": "NIR ve FT-NIR Analizörleri, Cihazlar ve Yazılım",
      "s": "USTECH cihaz ve yazılımlarını keşfedin: hat içi ve hat başı NIR ve FT-NIR analizörleri, nişasta hasarı analizörü, laboratuvar değirmeni, caliX ve ProChem.",
      "k": "nir ve ft-nir analizörleri cihazlar ve yazılım ustech cihaz ve yazılımlarını keşfedin hat içi ve hat başı nir ve ft-nir analizörleri nişasta hasarı analizörü laboratuvar değirmeni calix ve prochem ürünler urunler cihaz yazılım kalibrasyon"
    },
    "fr": {
      "t": "Analyseurs NIR et FT-NIR, labo et logiciels",
      "s": "Appareils et logiciels USTECH : analyseurs NIR et FT-NIR en ligne et at-line, analyseur d'amidon endommagé, broyeur de laboratoire, caliX et ProChem.",
      "k": "analyseurs nir et ft-nir labo et logiciels appareils et logiciels ustech analyseurs nir et ft-nir en ligne et at-line analyseur d amidon endommagé broyeur de laboratoire calix et prochem produits appareils logiciels étalonnage"
    },
    "de": {
      "t": "NIR- und FT-NIR-Analysatoren, Laborgeräte, Software",
      "s": "USTECH-Geräte und -Software: Inline- und At-Line-NIR- und FT-NIR-Analysatoren, Stärkeschädigungs-Analysator, Labormühle, caliX und ProChem.",
      "k": "nir- und ft-nir-analysatoren laborgeräte software ustech-geräte und -software inline- und at-line-nir- und ft-nir-analysatoren stärkeschädigungs-analysator labormühle calix und prochem produkte geräte software kalibrierung"
    },
    "es": {
      "t": "Analizadores NIR/FT-NIR, equipos de lab y software",
      "s": "Equipos y software de USTECH: analizadores NIR y FT-NIR en línea y at-line, analizador de almidón dañado, molino de laboratorio, caliX y ProChem.",
      "k": "analizadores nir ft-nir equipos de lab y software equipos y software de ustech analizadores nir y ft-nir en línea y at-line analizador de almidón dañado molino de laboratorio calix y prochem productos dispositivos software calibración"
    },
    "ar": {
      "t": "أجهزة تحليل NIR وFT-NIR وأجهزة المختبر والبرامج",
      "s": "اكتشف أجهزة وبرامج USTECH: أجهزة تحليل NIR وFT-NIR المضمنة وعلى الخط، ومحلل تلف النشا، وطاحونة مختبرية، وcaliX وProChem.",
      "k": "أجهزة تحليل nir وft-nir وأجهزة المختبر والبرامج اكتشف أجهزة وبرامج ustech أجهزة تحليل nir وft-nir المضمنة وعلى الخط، ومحلل تلف النشا، وطاحونة مختبرية، وcalix وprochem المنتجات الأجهزة البرمجيات المعايرة"
    },
    "zh": {
      "t": "NIR 与 FT-NIR 分析仪、实验室仪器与软件",
      "s": "探索 USTECH 设备与软件：在线和线旁 NIR 与 FT-NIR 分析仪、破损淀粉分析仪、实验室磨粉机、caliX 和 ProChem。",
      "k": "nir 与 ft-nir 分析仪 实验室仪器与软件 探索 ustech 设备与软件 在线和线旁 nir 与 ft-nir 分析仪 破损淀粉分析仪 实验室磨粉机 calix 和 prochem 产品中心 硬件设备 软件系统 校准模型"
    }
  },
  "products-devices.html": {
    "tr": {
      "t": "NIR ve FT-NIR Analizörleri ve Laboratuvar Cihazları",
      "s": "USTECH cihazlarını karşılaştırın: ProLine17EC/17ECS hat içi NIR, ProLine2550 FT-NIR, MasterLine17EC hat başı NIR, StarchQC nişasta analizörü, Tornado+ değirmen.",
      "k": "nir ve ft-nir analizörleri ve laboratuvar cihazları ustech cihazlarını karşılaştırın proline17ec 17ecs hat içi nir proline2550 ft-nir masterline17ec hat başı nir starchqc nişasta analizörü tornado değirmen cihazlar cihaz analizör spektrometre sensör donanım hat içi hat başı"
    },
    "fr": {
      "t": "Analyseurs NIR et FT-NIR et appareils de labo",
      "s": "Comparez les appareils USTECH : ProLine17EC et 17ECS NIR en ligne, ProLine2550 FT-NIR, MasterLine17EC NIR at-line, analyseur StarchQC, broyeur Tornado+.",
      "k": "analyseurs nir et ft-nir et appareils de labo comparez les appareils ustech proline17ec et 17ecs nir en ligne proline2550 ft-nir masterline17ec nir at-line analyseur starchqc broyeur tornado appareils analyseur spectromètre capteur matériel"
    },
    "de": {
      "t": "NIR- und FT-NIR-Analysatoren und Laborgeräte",
      "s": "USTECH-Geräte im Vergleich: ProLine17EC und 17ECS Inline-NIR, ProLine2550 FT-NIR, MasterLine17EC At-Line-NIR, StarchQC-Stärkeanalysator, Tornado+-Mühle.",
      "k": "nir- und ft-nir-analysatoren und laborgeräte ustech-geräte im vergleich proline17ec und 17ecs inline-nir proline2550 ft-nir masterline17ec at-line-nir starchqc-stärkeanalysator tornado -mühle geräte analysator spektrometer sensor hardware"
    },
    "es": {
      "t": "Analizadores NIR y FT-NIR y equipos de laboratorio",
      "s": "Compare los equipos USTECH: ProLine17EC y 17ECS NIR en línea, ProLine2550 FT-NIR, MasterLine17EC NIR at-line, analizador StarchQC y molino Tornado+.",
      "k": "analizadores nir y ft-nir y equipos de laboratorio compare los equipos ustech proline17ec y 17ecs nir en línea proline2550 ft-nir masterline17ec nir at-line analizador starchqc y molino tornado dispositivos analizador espectrómetro sensor hardware"
    },
    "ar": {
      "t": "أجهزة تحليل NIR وFT-NIR وأجهزة المختبر",
      "s": "قارن أجهزة USTECH: ProLine17EC و17ECS بتقنية NIR المضمنة، وProLine2550 بتقنية FT-NIR، وMasterLine17EC على الخط، ومحلل النشا StarchQC، وطاحونة Tornado+.",
      "k": "أجهزة تحليل nir وft-nir وأجهزة المختبر قارن أجهزة ustech proline17ec و17ecs بتقنية nir المضمنة، وproline2550 بتقنية ft-nir، وmasterline17ec على الخط، ومحلل النشا starchqc، وطاحونة tornado الأجهزة المحللات أجهزة الطيف المستشعرات"
    },
    "zh": {
      "t": "NIR 与 FT-NIR 分析仪及实验室设备",
      "s": "比较 USTECH 设备：ProLine17EC 和 17ECS 在线 NIR、ProLine2550 FT-NIR、MasterLine17EC 线旁 NIR、StarchQC 破损淀粉分析仪和 Tornado+ 磨粉机。",
      "k": "nir 与 ft-nir 分析仪及实验室设备 比较 ustech 设备 proline17ec 和 17ecs 在线 nir proline2550 ft-nir masterline17ec 线旁 nir starchqc 破损淀粉分析仪和 tornado 磨粉机 硬件设备 光谱仪 分析仪 在线近红外 传感器 线旁"
    }
  },
  "products-software.html": {
    "tr": {
      "t": "caliX ve ProChem: Kemometri ve Proses Yazılımı",
      "s": "caliX AutoML ile NIR kalibrasyon modelleri kurun, ProChem ile hatta çalıştırın: canlı izleme panelleri, PLC/SCADA bağlantısı ve kapalı döngü kontrol.",
      "k": "calix ve prochem kemometri ve proses yazılımı calix automl ile nir kalibrasyon modelleri kurun prochem ile hatta çalıştırın canlı izleme panelleri plc scada bağlantısı ve kapalı döngü kontrol yazılım yazilim kemometri otomasyon"
    },
    "fr": {
      "t": "caliX & ProChem : Logiciels de chimiométrie et PAT",
      "s": "Créez vos étalonnages NIR avec la chimiométrie AutoML de caliX, puis exploitez-les en ligne avec ProChem : tableaux de bord, liaison PLC/SCADA, boucle fermée.",
      "k": "calix prochem logiciels de chimiométrie et pat créez vos étalonnages nir avec la chimiométrie automl de calix puis exploitez-les en ligne avec prochem tableaux de bord liaison plc scada boucle fermée logiciels chimiométrie automatisatıon"
    },
    "de": {
      "t": "caliX & ProChem: Chemometrie- und PAT-Software",
      "s": "NIR-Kalibrierungen mit caliX-AutoML erstellen und mit ProChem an der Linie betreiben: Live-Dashboards, SPS/SCADA-Anbindung und geschlossener Regelkreis.",
      "k": "calix prochem chemometrie- und pat-software nir-kalibrierungen mit calix-automl erstellen und mit prochem an der linie betreiben live-dashboards sps scada-anbindung und geschlossener regelkreis software chemometrie automatisierung"
    },
    "es": {
      "t": "caliX y ProChem: Software de Quimiometría y PAT",
      "s": "Cree calibraciones NIR con la quimiometría AutoML de caliX y ejecútelas en la línea con ProChem: paneles en vivo, enlace PLC/SCADA y control en lazo cerrado.",
      "k": "calix y prochem software de quimiometría y pat cree calibraciones nir con la quimiometría automl de calix y ejecútelas en la línea con prochem paneles en vivo enlace plc scada y control en lazo cerrado software quimiometría automatización"
    },
    "ar": {
      "t": "caliX و ProChem: القياسات الكيميائية وبرمجيات PAT",
      "s": "أنشئ معايرات NIR باستخدام AutoML في caliX، ثم شغّلها على خط الإنتاج مع ProChem: لوحات معلومات مباشرة وربط PLC/SCADA وتحكم مغلق الحلقة.",
      "k": "calix و prochem القياسات الكيميائية وبرمجيات pat أنشئ معايرات nir باستخدام automl في calix، ثم شغّلها على خط الإنتاج مع prochem لوحات معلومات مباشرة وربط plc scada وتحكم مغلق الحلقة البرمجيات الكيموميتريكس الأتمتة"
    },
    "zh": {
      "t": "caliX 与 ProChem：化学计量学与 PAT 软件",
      "s": "使用 caliX AutoML 化学计量学建立 NIR 定标，再通过 ProChem 在产线上运行：实时看板、PLC/SCADA 连接和闭环控制。",
      "k": "calix 与 prochem 化学计量学与 pat 软件 使用 calix automl 化学计量学建立 nir 定标 再通过 prochem 在产线上运行 实时看板 plc scada 连接和闭环控制 软件系统 化学计量学 自动化 过程控制"
    }
  },
  "product-calix.html": {
    "tr": {
      "t": "caliX: AutoML Kemometri ve Kalibrasyon Yazılımı",
      "s": "NIR kalibrasyon modellerini dakikalar içinde kurun, doğrulayın ve devreye alın. caliX; PLS, PCA ve AutoML'i NIR, FTIR ve Raman verisi için 8 modülde sunar.",
      "k": "calix automl kemometri ve kalibrasyon yazılımı nir kalibrasyon modellerini dakikalar içinde kurun doğrulayın ve devreye alın calix pls pca ve automl i nir ftir ve raman verisi için 8 modülde sunar calix kalibrasyon modeli kemometri makine öğrenimi pls pca automl"
    },
    "fr": {
      "t": "caliX : AutoML Logiciel de chimiométrie et d'étalonnage",
      "s": "Créez, validez et déployez des modèles d'étalonnage NIR en quelques minutes. caliX réunit PLS, PCA et AutoML dans un espace de travail à huit modules.",
      "k": "calix automl logiciel de chimiométrie et d étalonnage créez validez et déployez des modèles d étalonnage nir en quelques minutes calix réunit pls pca et automl dans un espace de travail à huit modules calix étalonnage chimiométrie apprentissage automatique"
    },
    "de": {
      "t": "caliX: AutoML Chemometrie- & Kalibrierungssoftware",
      "s": "NIR-Kalibriermodelle in Minuten erstellen, validieren und ausrollen. caliX vereint PLS, PCA und AutoML in einem Arbeitsbereich mit acht Modulen.",
      "k": "calix automl chemometrie- kalibrierungssoftware nir-kalibriermodelle in minuten erstellen validieren und ausrollen calix vereint pls pca und automl in einem arbeitsbereich mit acht modulen calix kalibrierung chemometrie maschinelles lernen"
    },
    "es": {
      "t": "caliX: Software de Quimiometría y Calibración AutoML",
      "s": "Cree, valide e implemente modelos de calibración NIR en minutos. caliX reúne PLS, PCA y AutoML en un espacio de trabajo de ocho módulos.",
      "k": "calix software de quimiometría y calibración automl cree valide e implemente modelos de calibración nir en minutos calix reúne pls pca y automl en un espacio de trabajo de ocho módulos calix calibración quimiometría aprendizaje automático"
    },
    "ar": {
      "t": "caliX :  AutoML  القياسات الكيميائية وبرامج المعايرة",
      "s": "بناء نماذج معايرة NIR والتحقق من صحتها ونشرها في دقائق.  يجمع  caliX  بين  PLS و  PCA  و  AutoML  في مساحة عمل مكونة من ثماني وحدات لبيانات NIR و FTIR و Raman.",
      "k": "calix automl القياسات الكيميائية وبرامج المعايرة بناء نماذج معايرة nir والتحقق من صحتها ونشرها في دقائق يجمع calix بين pls و pca و automl في مساحة عمل مكونة من ثماني وحدات لبيانات nir و ftir و raman calix معايرة كيموميتريكس تعلم آلي automl pls pca"
    },
    "zh": {
      "t": "caliX：AutoML 化学计量学与校准软件",
      "s": "在几分钟内建立、验证和部署 NIR 定标模型。caliX 在支持 NIR、FTIR 和 Raman 数据的一个八模块工作区中结合了 PLS、PCA 和 AutoML。",
      "k": "calix automl 化学计量学与校准软件 在几分钟内建立 验证和部署 nir 定标模型 calix 在支持 nir ftir 和 raman 数据的一个八模块工作区中结合了 pls pca 和 automl calix 校准模型 化学计量学 机器学习 automl pls pca"
    }
  },
  "product-prochem.html": {
    "tr": {
      "t": "ProChem: Gerçek Zamanlı PAT ve Kapalı Döngü Kontrol",
      "s": "ProChem, USTECH analizörlerini PLC ve SCADA'ya bağlar: canlı paneller, alarmlar ve NIR sonucunu anında eyleme çeviren otomatik ayar noktası kontrolü.",
      "k": "prochem gerçek zamanlı pat ve kapalı döngü kontrol prochem ustech analizörlerini plc ve scada ya bağlar canlı paneller alarmlar ve nir sonucunu anında eyleme çeviren otomatik ayar noktası kontrolü prochem proses kontrol plc scada gerçek zamanlı pat"
    },
    "fr": {
      "t": "ProChem : PAT en temps réel et contrôle en boucle fermée",
      "s": "ProChem relie les analyseurs USTECH à votre automate et SCADA : tableaux de bord, alarmes et régulation automatique des consignes en temps réel.",
      "k": "prochem pat en temps réel et contrôle en boucle fermée prochem relie les analyseurs ustech à votre automate et scada tableaux de bord alarmes et régulation automatique des consignes en temps réel prochem contrôle de processus plc scada temps réel"
    },
    "de": {
      "t": "ProChem: Echtzeit-PAT & Closed-Loop-Regelung",
      "s": "ProChem verbindet USTECH-Analysatoren mit SPS und SCADA: Live-Dashboards, Alarme und automatische Sollwertregelung in Echtzeit.",
      "k": "prochem echtzeit-pat closed-loop-regelung prochem verbindet ustech-analysatoren mit sps und scada live-dashboards alarme und automatische sollwertregelung in echtzeit prochem prozesssteuerung sps scada echtzeit"
    },
    "es": {
      "t": "ProChem: PAT en Tiempo Real y Control en Circuito Cerrado",
      "s": "ProChem conecta los analizadores USTECH con su PLC y SCADA: paneles en vivo, alarmas y control automático de consigna en tiempo real.",
      "k": "prochem pat en tiempo real y control en circuito cerrado prochem conecta los analizadores ustech con su plc y scada paneles en vivo alarmas y control automático de consigna en tiempo real prochem control de procesos plc scada tiempo real"
    },
    "ar": {
      "t": "ProChem : PAT في الوقت الفعلي والتحكم في الحلقة المغلقة",
      "s": "يربط  ProChem  أجهزة  تحليل USTECH بـ PLC و SCADA: لوحات المعلومات المباشرة والإنذارات والتحكم التلقائي في نقطة الضبط التي تحول نتائج NIR إلى إجراء في الوقت الفعلي.",
      "k": "prochem pat في الوقت الفعلي والتحكم في الحلقة المغلقة يربط prochem أجهزة تحليل ustech بـ plc و scada لوحات المعلومات المباشرة والإنذارات والتحكم التلقائي في نقطة الضبط التي تحول نتائج nir إلى إجراء في الوقت الفعلي prochem التحكم في العمليات plc scada pat"
    },
    "zh": {
      "t": "ProChem：实时 PAT 与闭环过程控制",
      "s": "ProChem 将 USTECH 分析仪连接到您的 PLC 和 SCADA：实时仪表板、警报和自动设定点控制，将 NIR 结果转化为实时操作。",
      "k": "prochem 实时 pat 与闭环过程控制 prochem 将 ustech 分析仪连接到您的 plc 和 scada 实时仪表板 警报和自动设定点控制 将 nir 结果转化为实时操作 prochem 过程控制 plc scada 实时监测 pat"
    }
  },
  "product-masterline.html": {
    "tr": {
      "t": "MasterLine17EC Masaüstü NIR Analizörü: Tahıl ve Yem",
      "s": "MasterLine17EC masaüstü NIR analizörü: tahıl, yem hammaddesi ve kaba yemin hızlı, numuneye zarar vermeden kalite kontrolü; döner numune kabı ve motorlu kapak.",
      "k": "masterline17ec masaüstü nir analizörü tahıl ve yem masterline17ec masaüstü nir analizörü tahıl yem hammaddesi ve kaba yemin hızlı numuneye zarar vermeden kalite kontrolü döner numune kabı ve motorlu kapak masterline masaüstü analizör tahıl yem laboratuvar"
    },
    "fr": {
      "t": "MasterLine17EC : NIR de paillasse pour grains",
      "s": "MasterLine17EC, NIR de paillasse : contrôle at-line rapide et non destructif des grains, matières premières et fourrages ; coupelle rotative, capot motorisé.",
      "k": "masterline17ec nir de paillasse pour grains masterline17ec nir de paillasse contrôle at-line rapide et non destructif des grains matières premières et fourrages coupelle rotative capot motorisé masterline paillasse analyseur céréales"
    },
    "de": {
      "t": "MasterLine17EC Tisch-NIR für Getreide und Futter",
      "s": "MasterLine17EC Tisch-NIR: schnelle, zerstörungsfreie At-Line-QK von Getreide, Futterrohstoffen und Grundfutter, mit Drehprobenbecher und Motordeckel.",
      "k": "masterline17ec tisch-nir für getreide und futter masterline17ec tisch-nir schnelle zerstörungsfreie at-line-qk von getreide futterrohstoffen und grundfutter mit drehprobenbecher und motordeckel masterline tischgerät analysator getreide"
    },
    "es": {
      "t": "MasterLine17EC NIR de sobremesa: grano y pienso",
      "s": "MasterLine17EC, NIR de sobremesa: control at-line rápido y no destructivo de grano, materias primas y forraje, con copa giratoria y tapa motorizada.",
      "k": "masterline17ec nir de sobremesa grano y pienso masterline17ec nir de sobremesa control at-line rápido y no destructivo de grano materias primas y forraje con copa giratoria y tapa motorizada masterline sobremesa analizador granos"
    },
    "ar": {
      "t": "MasterLine17EC محلل NIR مكتبي: الحبوب والأعلاف",
      "s": "محلل NIR المكتبي MasterLine17EC: مراقبة جودة سريعة وغير إتلافية على الخط للحبوب ومكونات الأعلاف والأعلاف الخشنة، مع كوب عينة دوّار وغطاء آلي.",
      "k": "masterline17ec محلل nir مكتبي الحبوب والأعلاف محلل nir المكتبي masterline17ec مراقبة جودة سريعة وغير إتلافية على الخط للحبوب ومكونات الأعلاف والأعلاف الخشنة، مع كوب عينة دوّار وغطاء آلي masterline محلل مكتبي الحبوب الأعلاف"
    },
    "zh": {
      "t": "MasterLine17EC 台式 NIR 分析仪：谷物与饲料质检",
      "s": "MasterLine17EC 台式 NIR 分析仪：对谷物、饲料原料和牧草进行快速、无损的线旁质量控制，配有旋转样品杯和电动盖。",
      "k": "masterline17ec 台式 nir 分析仪 谷物与饲料质检 masterline17ec 台式 nir 分析仪 对谷物 饲料原料和牧草进行快速 无损的线旁质量控制 配有旋转样品杯和电动盖 masterline 台式近红外分析仪 谷物 饲料 实验室"
    }
  },
  "product-proline-17ec.html": {
    "tr": {
      "t": "ProLine17EC Hat İçi NIR Analizörü: Proses Kontrolü",
      "s": "ProLine17EC hat içi NIR analizörü: 950-1650 nm InGaAs dizi, safir pencere ve IP65 316 paslanmaz gövde; 2-20 saniyede bir gerçek zamanlı sonuç verir.",
      "k": "proline17ec hat i çi nir analizörü proses kontrolü proline17ec hat içi nir analizörü 950-1650 nm ingaas dizi safir pencere ve ip65 316 paslanmaz gövde 2-20 saniyede bir gerçek zamanlı sonuç verir proline 17ec hat ici nir analizor sensor boru oluk konveyor safir ip65 paslanmaz celik ingaas surekli olcum kompakt"
    },
    "fr": {
      "t": "ProLine17EC, analyseur NIR en ligne de procédé",
      "s": "Analyseur NIR en ligne ProLine17EC : barrette InGaAs 950-1650 nm, fenêtre saphir, boîtier inox 316 IP65 et résultats en temps réel toutes les 2 à 20 secondes.",
      "k": "proline17ec analyseur nir en ligne de procédé analyseur nir en ligne proline17ec barrette ingaas 950-1650 nm fenêtre saphir boîtier inox 316 ip65 et résultats en temps réel toutes les 2 à 20 secondes proline 17ec analyseur nir en ligne capteur conduite goulotte convoyeur saphir ip65 acier inoxydable ingaas mesure continue compact"
    },
    "de": {
      "t": "ProLine17EC Inline-NIR-Analysator für Prozesse",
      "s": "ProLine17EC Inline-NIR-Analysator: InGaAs-Array 950-1650 nm, Saphirfenster, IP65-Gehäuse aus Edelstahl 316 und Echtzeitergebnisse alle 2 bis 20 Sekunden.",
      "k": "proline17ec inline-nir-analysator für prozesse proline17ec inline-nir-analysator ingaas-array 950-1650 nm saphirfenster ip65-gehäuse aus edelstahl 316 und echtzeitergebnisse alle 2 bis 20 sekunden proline 17ec inline-nir-analysator sensor rohr rutsche foerderband saphir ip65 edelstahl ingaas kontinuierliche messung kompakt"
    },
    "es": {
      "t": "ProLine17EC analizador NIR en línea para procesos",
      "s": "Analizador NIR en línea ProLine17EC: matriz InGaAs de 950-1650 nm, ventana de zafiro, carcasa inoxidable 316 IP65 y resultados en tiempo real cada 2 a 20 s.",
      "k": "proline17ec analizador nir en línea para procesos analizador nir en línea proline17ec matriz ingaas de 950-1650 nm ventana de zafiro carcasa inoxidable 316 ip65 y resultados en tiempo real cada 2 a 20 s proline 17ec analizador nir en linea sensor tuberia canaleta cinta transportadora zafiro ip65 acero inoxidable ingaas medicion continua compacto"
    },
    "ar": {
      "t": "ProLine17EC محلل NIR مضمن لمراقبة العمليات",
      "s": "محلل NIR المضمن ProLine17EC: مصفوفة InGaAs بنطاق 950-1650 نانومتر، ونافذة من الياقوت، وهيكل من الفولاذ 316 بتصنيف IP65، ونتائج فورية كل 2 إلى 20 ثانية.",
      "k": "proline17ec محلل nir مضمن لمراقبة العمليات محلل nir المضمن proline17ec مصفوفة ingaas بنطاق 950-1650 نانومتر، ونافذة من الياقوت، وهيكل من الفولاذ 316 بتصنيف ip65، ونتائج فورية كل 2 إلى 20 ثانية proline 17ec محلل مضمن مستشعر أنبوب حزام ناقل قياس مستمر مدمج"
    },
    "zh": {
      "t": "ProLine17EC 在线 NIR 过程分析仪",
      "s": "ProLine17EC 在线 NIR 分析仪：950-1650 nm InGaAs 阵列、蓝宝石窗口、IP65 316 不锈钢外壳，每 2 至 20 秒提供实时结果。",
      "k": "proline17ec 在线 nir 过程分析仪 proline17ec 在线 nir 分析仪 950-1650 nm ingaas 阵列 蓝宝石窗口 ip65 316 不锈钢外壳 每 2 至 20 秒提供实时结果 proline 17ec 在线近红外分析仪 传感器 管道 输送带 蓝宝石 不锈钢 连续测量 紧凑"
    }
  },
  "product-proline-17ecs.html": {
    "tr": {
      "t": "ProLine17ECS Ayrık Gövdeli Hat İçi NIR Analizörü",
      "s": "ProLine17ECS hat içi NIR analizörü: ayrık prob ve kontrol ünitesi, 23.000:1 sinyal/gürültü, numune başına 2.000 spektrum, safir pencere, IP65 paslanmaz.",
      "k": "proline17ecs ayrık gövdeli hat i çi nir analizörü proline17ecs hat içi nir analizörü ayrık prob ve kontrol ünitesi 23 000 1 sinyal gürültü numune başına 2 000 spektrum safir pencere ip65 paslanmaz proline 17ecs bolunmus mimari cift govde ayrik prob kafasi kontrol kutusu yuksek hassasiyet hat ici nir analizor safir ip65 paslanmaz celik"
    },
    "fr": {
      "t": "ProLine17ECS, NIR en ligne à deux boîtiers",
      "s": "Analyseur NIR en ligne ProLine17ECS à sonde et contrôleur séparés : SNR 23 000:1, 2 000 spectres par échantillon, fenêtre saphir et tête inox 316 IP65.",
      "k": "proline17ecs nir en ligne à deux boîtiers analyseur nir en ligne proline17ecs à sonde et contrôleur séparés snr 23 000 1 2 000 spectres par échantillon fenêtre saphir et tête inox 316 ip65 proline 17ecs architecture divisee double boitier sonde deportee boitier de commande haute sensibilite analyseur nir en ligne saphir ip65 acier inoxydable"
    },
    "de": {
      "t": "ProLine17ECS Inline-NIR in Split-Bauweise",
      "s": "ProLine17ECS Inline-NIR-Analysator mit getrennter Sonde und Steuereinheit: SNR 23.000:1, 2.000 Spektren pro Probe, Saphirfenster, IP65-Kopf aus Edelstahl 316.",
      "k": "proline17ecs inline-nir in split-bauweise proline17ecs inline-nir-analysator mit getrennter sonde und steuereinheit snr 23 000 1 2 000 spektren pro probe saphirfenster ip65-kopf aus edelstahl 316 proline 17ecs geteilte architektur zwei gehaeuse abgesetzter messkopf steuergeraet hohe empfindlichkeit inline-nir-analysator saphir ip65 edelstahl"
    },
    "es": {
      "t": "ProLine17ECS NIR en línea de diseño dividido",
      "s": "Analizador NIR en línea ProLine17ECS con sonda y controlador separados: SNR 23.000:1, 2.000 espectros por muestra, ventana de zafiro y cabezal inox 316 IP65.",
      "k": "proline17ecs nir en línea de diseño dividido analizador nir en línea proline17ecs con sonda y controlador separados snr 23 000 1 2 000 espectros por muestra ventana de zafiro y cabezal inox 316 ip65 proline 17ecs arquitectura dividida doble chasis cabezal de sonda separado caja de control alta sensibilidad analizador nir en linea zafiro ip65 acero inoxidable"
    },
    "ar": {
      "t": "ProLine17ECS محلل NIR مضمن بتصميم منفصل",
      "s": "محلل NIR المضمن ProLine17ECS بمسبار ووحدة تحكم منفصلين: نسبة إشارة إلى ضوضاء 23,000:1، و2,000 طيف لكل عينة، ونافذة من الياقوت، ورأس من الفولاذ 316 بتصنيف IP65.",
      "k": "proline17ecs محلل nir مضمن بتصميم منفصل محلل nir المضمن proline17ecs بمسبار ووحدة تحكم منفصلين نسبة إشارة إلى ضوضاء 23 000 1، و2 000 طيف لكل عينة، ونافذة من الياقوت، ورأس من الفولاذ 316 بتصنيف ip65 proline 17ecs بنية منفصلة رأس مسبار وحدة تحكم حساسية عالية محلل مضمن"
    },
    "zh": {
      "t": "ProLine17ECS 分体式在线 NIR 分析仪",
      "s": "ProLine17ECS 分体式在线 NIR 分析仪，探头与控制器分离：信噪比 23,000:1，每个样品 2,000 条光谱，蓝宝石窗口，IP65 316 不锈钢测量头。",
      "k": "proline17ecs 分体式在线 nir 分析仪 proline17ecs 分体式在线 nir 分析仪 探头与控制器分离 信噪比 23 000 1 每个样品 2 000 条光谱 蓝宝石窗口 ip65 316 不锈钢测量头 proline 17ecs 分体式结构 双机箱 分离式探头 控制器 高灵敏度 在线近红外分析仪 蓝宝石 不锈钢"
    }
  },
  "product-proline-2550.html": {
    "tr": {
      "t": "ProLine2550 Hat İçi FT-NIR Proses Analizörü",
      "s": "Boru, oluk ve konveyörler için Essential ve Advanced modelli hat içi FT-NIR proses analizörü: IP65/IP69K, Modbus TCP, OPC UA, PROFINET, ProChem uyumu.",
      "k": "proline2550 hat i çi ft-nir proses analizörü boru oluk ve konveyörler için essential ve advanced modelli hat içi ft-nir proses analizörü ip65 ip69k modbus tcp opc ua profinet prochem uyumu proline 2550 boru reaktör sıvı toz hat içi analizör"
    },
    "fr": {
      "t": "ProLine2550, analyseur de procédé FT-NIR en ligne",
      "s": "Analyseur de procédé FT-NIR en ligne ProLine2550, Essential ou Advanced, pour conduites, goulottes et convoyeurs : IP65/IP69K, Modbus TCP, OPC UA et PROFINET.",
      "k": "proline2550 analyseur de procédé ft-nir en ligne analyseur de procédé ft-nir en ligne proline2550 essential ou advanced pour conduites goulottes et convoyeurs ip65 ip69k modbus tcp opc ua et profinet proline 2550 conduite réacteur liquide"
    },
    "de": {
      "t": "ProLine2550 Inline-FT-NIR-Prozessanalysator",
      "s": "ProLine2550 Inline-FT-NIR-Prozessanalysator, Essential oder Advanced, für Rohre, Schurren und Förderbänder: IP65/IP69K, Modbus TCP, OPC UA und PROFINET.",
      "k": "proline2550 inline-ft-nir-prozessanalysator proline2550 inline-ft-nir-prozessanalysator essential oder advanced für rohre schurren und förderbänder ip65 ip69k modbus tcp opc ua und profinet proline 2550 rohr reaktor flüssigkeit"
    },
    "es": {
      "t": "ProLine2550 analizador de procesos FT-NIR en línea",
      "s": "Analizador de procesos FT-NIR en línea ProLine2550, Essential o Advanced, para tuberías, rampas y transportadores: IP65/IP69K, Modbus TCP, OPC UA y PROFINET.",
      "k": "proline2550 analizador de procesos ft-nir en línea analizador de procesos ft-nir en línea proline2550 essential o advanced para tuberías rampas y transportadores ip65 ip69k modbus tcp opc ua y profinet proline 2550 tubería reactor líquido"
    },
    "ar": {
      "t": "ProLine2550 محلل عمليات FT-NIR مضمن",
      "s": "محلل العمليات المضمن ProLine2550 بتقنية FT-NIR، بطرازي Essential وAdvanced، للأنابيب والمزالق والسيور الناقلة: IP65/IP69K وModbus TCP وOPC UA وPROFINET.",
      "k": "proline2550 محلل عمليات ft-nir مضمن محلل العمليات المضمن proline2550 بتقنية ft-nir، بطرازي essential وadvanced، للأنابيب والمزالق والسيور الناقلة ip65 ip69k وmodbus tcp وopc ua وprofinet proline 2550 أنبوب مفاعل سائل مسحوق خط الإنتاج"
    },
    "zh": {
      "t": "ProLine2550 在线 FT-NIR 过程分析仪",
      "s": "ProLine2550 在线 FT-NIR 过程分析仪，提供 Essential 和 Advanced 两种型号，适用于管道、溜槽和输送带：IP65/IP69K、Modbus TCP、OPC UA 和 PROFINET。",
      "k": "proline2550 在线 ft-nir 过程分析仪 proline2550 在线 ft-nir 过程分析仪 提供 essential 和 advanced 两种型号 适用于管道 溜槽和输送带 ip65 ip69k modbus tcp opc ua 和 profinet proline 2550 在线过程分析仪 管道 反应釜 液体 粉体"
    }
  },
  "product-tornado.html": {
    "tr": {
      "t": "Tornado+ Su Soğutmalı Laboratuvar Değirmeni",
      "s": "Tornado+ su soğutmalı laboratuvar değirmeni: 9.000 dev/dk rotor ve değiştirilebilir halka eleklerle tahıl, tohum ve yem numunelerini homojen öğütür.",
      "k": "tornado su soğutmalı laboratuvar değirmeni tornado su soğutmalı laboratuvar değirmeni 9 000 dev dk rotor ve değiştirilebilir halka eleklerle tahıl tohum ve yem numunelerini homojen öğütür tornado değirmen öğütme numune hazırlama su soğutmalı"
    },
    "fr": {
      "t": "Tornado+, broyeur de laboratoire refroidi par eau",
      "s": "Broyeur de laboratoire Tornado+ refroidi par eau, rotor à 9 000 tr/min et tamis annulaires, pour un broyage rapide et homogène des grains, graines et aliments.",
      "k": "tornado broyeur de laboratoire refroidi par eau broyeur de laboratoire tornado refroidi par eau rotor à 9 000 tr min et tamis annulaires pour un broyage rapide et homogène des grains graines et aliments tornado broyeur broyage préparation échantillon"
    },
    "de": {
      "t": "Tornado+ wassergekühlte Labormühle für Getreide",
      "s": "Wassergekühlte Labormühle Tornado+ mit 9.000-U/min-Rotor und Ringsieben für schnelles, gleichmäßiges Mahlen von Getreide-, Saat- und Futterproben.",
      "k": "tornado wassergekühlte labormühle für getreide wassergekühlte labormühle tornado mit 9 000-u min-rotor und ringsieben für schnelles gleichmäßiges mahlen von getreide- saat- und futterproben tornado mühle mahlen probenvorbereitung"
    },
    "es": {
      "t": "Tornado+ molino de laboratorio refrigerado por agua",
      "s": "Molino de laboratorio Tornado+ refrigerado por agua, con rotor de 9.000 rpm y tamices anulares, para moler rápido y de forma uniforme grano, semillas y pienso.",
      "k": "tornado molino de laboratorio refrigerado por agua molino de laboratorio tornado refrigerado por agua con rotor de 9 000 rpm y tamices anulares para moler rápido y de forma uniforme grano semillas y pienso tornado molino molienda preparación de muestras"
    },
    "ar": {
      "t": "Tornado+ طاحونة مختبرية مبردة بالماء",
      "s": "طاحونة Tornado+ المختبرية المبردة بالماء بدوّار 9,000 دورة/دقيقة ومناخل حلقية لطحن سريع ومتجانس لعينات الحبوب والبذور والأعلاف قبل التحليل.",
      "k": "tornado طاحونة مختبرية مبردة بالماء طاحونة tornado المختبرية المبردة بالماء بدوّار 9 000 دورة دقيقة ومناخل حلقية لطحن سريع ومتجانس لعينات الحبوب والبذور والأعلاف قبل التحليل tornado مطحنة تحضير العينات تبريد مائي"
    },
    "zh": {
      "t": "Tornado+ 水冷实验室磨粉机",
      "s": "Tornado+ 水冷实验室磨粉机，配备 9,000 rpm 转子和环形筛，可在分析前快速、均匀地研磨谷物、种子和饲料样品。",
      "k": "tornado 水冷实验室磨粉机 tornado 水冷实验室磨粉机 配备 9 000 rpm 转子和环形筛 可在分析前快速 均匀地研磨谷物 种子和饲料样品 tornado 旋风磨 样品制备 水冷 研磨"
    }
  },
  "product-starchqc.html": {
    "tr": {
      "t": "StarchQC Un Nişasta Hasarı Analizörü: 8 Dakikada",
      "s": "StarchQC undaki hasarlı nişastayı amperometrik iyot absorpsiyonu yöntemiyle 8 dakikada ölçer; sonucu AI %, NDS, UCDC, AACC ve Farrand birimlerinde yazdırır.",
      "k": "starchqc un nişasta hasarı analizörü 8 dakikada starchqc undaki hasarlı nişastayı amperometrik iyot absorpsiyonu yöntemiyle 8 dakikada ölçer sonucu ai nds ucdc aacc ve farrand birimlerinde yazdırır starchqc nişasta hasarı hasarlı nişasta un değirmen amperometrik iyot"
    },
    "fr": {
      "t": "StarchQC, analyseur d'amidon endommagé des farines",
      "s": "StarchQC mesure l'amidon endommagé des farines par absorption ampérométrique d'iode en 8 minutes et imprime les résultats en AI %, NDS, UCDC, AACC et Farrand.",
      "k": "starchqc analyseur d amidon endommagé des farines starchqc mesure l amidon endommagé des farines par absorption ampérométrique d iode en 8 minutes et imprime les résultats en ai nds ucdc aacc et farrand starchqc amidon endommagé farine meunerie ampérométrique iode"
    },
    "de": {
      "t": "StarchQC Analysator für Stärkeschädigung im Mehl",
      "s": "StarchQC misst die Stärkeschädigung im Mehl per amperometrischer Iodabsorption in 8 Minuten und druckt die Werte in AI %, NDS, UCDC, AACC und Farrand aus.",
      "k": "starchqc analysator für stärkeschädigung im mehl starchqc misst die stärkeschädigung im mehl per amperometrischer iodabsorption in 8 minuten und druckt die werte in ai nds ucdc aacc und farrand aus starchqc stärkeschädigung beschädigte stärke mehl mühle amperometrisch iod"
    },
    "es": {
      "t": "StarchQC analizador de almidón dañado en harina",
      "s": "StarchQC mide el almidón dañado en la harina por absorción amperométrica de yodo en 8 minutos e imprime los resultados en AI %, NDS, UCDC, AACC y Farrand.",
      "k": "starchqc analizador de almidón dañado en harina starchqc mide el almidón dañado en la harina por absorción amperométrica de yodo en 8 minutos e imprime los resultados en ai nds ucdc aacc y farrand starchqc almidón dañado harina molino amperométrico yodo"
    },
    "ar": {
      "t": "StarchQC محلل تلف النشا في الدقيق: اختبار 8 دقائق",
      "s": "يقيس StarchQC النشا التالف في الدقيق بطريقة امتصاص اليود الأمبيرومترية خلال 8 دقائق، ويطبع النتائج بوحدات AI % وNDS وUCDC وAACC وFarrand.",
      "k": "starchqc محلل تلف النشا في الدقيق اختبار 8 دقائق يقيس starchqc النشا التالف في الدقيق بطريقة امتصاص اليود الأمبيرومترية خلال 8 دقائق، ويطبع النتائج بوحدات ai وnds وucdc وaacc وfarrand starchqc النشا التالف الدقيق المطاحن اليود"
    },
    "zh": {
      "t": "StarchQC 面粉破损淀粉分析仪：8 分钟测试",
      "s": "StarchQC 采用电流法碘吸收原理，8 分钟内测定面粉中的破损淀粉，并以 AI %、NDS、UCDC、AACC 和 Farrand 单位打印结果。",
      "k": "starchqc 面粉破损淀粉分析仪 8 分钟测试 starchqc 采用电流法碘吸收原理 8 分钟内测定面粉中的破损淀粉 并以 ai nds ucdc aacc 和 farrand 单位打印结果 starchqc 破损淀粉 面粉 磨粉 电流法 碘"
    }
  },
  "knowledge.html": {
    "tr": {
      "t": "NIR Bilgi Merkezi: Teknoloji Rehberi ve Blog",
      "s": "NIR spektroskopisini temelden öğrenin: teknolojinin çalışma ilkesi, kalibrasyon bilimi ve proses kontrolü ile yatırım getirisi üzerine kaynaklı makaleler.",
      "k": "nir bilgi merkezi teknoloji rehberi ve blog nir spektroskopisini temelden öğrenin teknolojinin çalışma ilkesi kalibrasyon bilimi ve proses kontrolü ile yatırım getirisi üzerine kaynaklı makaleler bilgi bankası bilgi teknoloji rehber"
    },
    "fr": {
      "t": "Centre de ressources NIR : guide technique et blog",
      "s": "Apprenez la spectroscopie NIR depuis les bases : principe de la technologie, science de l'étalonnage et articles sourcés sur le contrôle de procédé et le ROI.",
      "k": "centre de ressources nir guide technique et blog apprenez la spectroscopie nir depuis les bases principe de la technologie science de l étalonnage et articles sourcés sur le contrôle de procédé et le roi connaissances technologie guides"
    },
    "de": {
      "t": "NIR-Wissensportal: Technologieleitfaden und Blog",
      "s": "NIR-Spektroskopie von Grund auf: wie die Technologie funktioniert, die Wissenschaft der Kalibrierung und belegte Fachartikel zu Prozesskontrolle und ROI.",
      "k": "nir-wissensportal technologieleitfaden und blog nir-spektroskopie von grund auf wie die technologie funktioniert die wissenschaft der kalibrierung und belegte fachartikel zu prozesskontrolle und roi wissen technologie leitfäden"
    },
    "es": {
      "t": "Centro de conocimiento NIR: guía tecnológica y blog",
      "s": "Aprenda espectroscopia NIR desde cero: cómo funciona la tecnología, la ciencia de la calibración y artículos con referencias sobre control de procesos y ROI.",
      "k": "centro de conocimiento nir guía tecnológica y blog aprenda espectroscopia nir desde cero cómo funciona la tecnología la ciencia de la calibración y artículos con referencias sobre control de procesos y roi conocimiento tecnología guías"
    },
    "ar": {
      "t": "مركز معرفة NIR: دليل التقنية والمدونة",
      "s": "تعلّم مطيافية NIR من الأساس: كيف تعمل التقنية، وعلم المعايرة، ومقالات موثّقة بالمراجع حول التحكم في العمليات وعائد الاستثمار.",
      "k": "مركز معرفة nir دليل التقنية والمدونة تعلّم مطيافية nir من الأساس كيف تعمل التقنية، وعلم المعايرة، ومقالات موثّقة بالمراجع حول التحكم في العمليات وعائد الاستثمار المعرفة التكنولوجيا الأدلة"
    },
    "zh": {
      "t": "NIR 知识中心：技术指南与博客",
      "s": "从基础学习 NIR 光谱：技术原理、定标科学，以及有文献依据的过程控制与投资回报文章。",
      "k": "nir 知识中心 技术指南与博客 从基础学习 nir 光谱 技术原理 定标科学 以及有文献依据的过程控制与投资回报文章 知识中心 技术文章 应用指南"
    }
  },
  "knowledge-technology.html": {
    "tr": {
      "t": "NIR Spektroskopisi Nasıl Çalışır? Kalibrasyon",
      "s": "Işıktan sonuca NIR spektroskopisi: ölçüm yolu, kalibrasyon bilimi ve caliX ile ProChem'in USTECH analizörleriyle birlikte nasıl çalıştığı, sade bir anlatımla.",
      "k": "nir spektroskopisi nasıl çalışır kalibrasyon işıktan sonuca nir spektroskopisi ölçüm yolu kalibrasyon bilimi ve calix ile prochem in ustech analizörleriyle birlikte nasıl çalıştığı sade bir anlatımla teknoloji nir ft-nir spektroskopi teori kalibrasyon bilimi"
    },
    "fr": {
      "t": "Comment fonctionne la spectroscopie NIR ?",
      "s": "La spectroscopie NIR, de la lumière à la prédiction : chemin de mesure, science de l'étalonnage et rôle de caliX et ProChem avec les analyseurs USTECH.",
      "k": "comment fonctionne la spectroscopie nir la spectroscopie nir de la lumière à la prédiction chemin de mesure science de l étalonnage et rôle de calix et prochem avec les analyseurs ustech technologie spectroscopie théorie"
    },
    "de": {
      "t": "Wie NIR-Spektroskopie funktioniert: Kalibrierung",
      "s": "Wie NIR-Spektroskopie funktioniert, vom Licht zur Vorhersage: Messweg, Kalibrierung und das Zusammenspiel von caliX und ProChem mit USTECH-Analysatoren.",
      "k": "wie nir-spektroskopie funktioniert kalibrierung wie nir-spektroskopie funktioniert vom licht zur vorhersage messweg kalibrierung und das zusammenspiel von calix und prochem mit ustech-analysatoren technologie spektroskopie theorie"
    },
    "es": {
      "t": "Cómo funciona la espectroscopia NIR: calibración",
      "s": "Cómo funciona la espectroscopia NIR, de la luz a la predicción: trayectoria de medida, calibración y cómo caliX y ProChem trabajan con los analizadores USTECH.",
      "k": "cómo funciona la espectroscopia nir calibración cómo funciona la espectroscopia nir de la luz a la predicción trayectoria de medida calibración y cómo calix y prochem trabajan con los analizadores ustech tecnología espectroscopía teoría"
    },
    "ar": {
      "t": "كيف تعمل مطيافية NIR: علم المعايرة",
      "s": "كيف تعمل مطيافية NIR من الضوء إلى التنبؤ: مسار القياس، وعلم المعايرة، وكيف يعمل caliX وProChem مع أجهزة تحليل USTECH.",
      "k": "كيف تعمل مطيافية nir علم المعايرة كيف تعمل مطيافية nir من الضوء إلى التنبؤ مسار القياس، وعلم المعايرة، وكيف يعمل calix وprochem مع أجهزة تحليل ustech التكنولوجيا ft-nir التحليل الطيفي mems المعايرة"
    },
    "zh": {
      "t": "NIR 光谱如何工作：定标科学",
      "s": "NIR 光谱从光到预测的工作原理：测量路径、定标科学，以及 caliX 和 ProChem 如何与 USTECH 分析仪协同工作。",
      "k": "nir 光谱如何工作 定标科学 nir 光谱从光到预测的工作原理 测量路径 定标科学 以及 calix 和 prochem 如何与 ustech 分析仪协同工作 核心技术 ft-nir 近红外光谱原理 mems 定标科学"
    }
  },
  "knowledge-blogs.html": {
    "tr": {
      "t": "NIR Spektroskopisi Blogu ve Teknik Makaleler",
      "s": "NIR kalibrasyonu, PLS modelleme, hat içi proses kontrolü ve yatırım getirisi üzerine teknik makaleler: kalite kontrol ve proses mühendisleri için.",
      "k": "nir spektroskopisi blogu ve teknik makaleler nir kalibrasyonu pls modelleme hat içi proses kontrolü ve yatırım getirisi üzerine teknik makaleler kalite kontrol ve proses mühendisleri için blog makale uygulama notu teknik yazı"
    },
    "fr": {
      "t": "Blog de spectroscopie NIR et articles techniques",
      "s": "Articles techniques sur l'étalonnage NIR, la modélisation PLS, le contrôle de procédé en ligne et le ROI : lecture pratique pour ingénieurs qualité et procédé.",
      "k": "blog de spectroscopie nir et articles techniques articles techniques sur l étalonnage nir la modélisation pls le contrôle de procédé en ligne et le roi lecture pratique pour ingénieurs qualité et procédé blog articles notes d application"
    },
    "de": {
      "t": "NIR-Spektroskopie-Blog und Fachartikel",
      "s": "Fachartikel zu NIR-Kalibrierung, PLS-Modellierung, Inline-Prozesskontrolle und ROI: praxisnahe Lektüre für QK- und Verfahrensingenieure.",
      "k": "nir-spektroskopie-blog und fachartikel fachartikel zu nir-kalibrierung pls-modellierung inline-prozesskontrolle und roi praxisnahe lektüre für qk- und verfahrensingenieure blog artikel anwendungshinweise"
    },
    "es": {
      "t": "Blog de espectroscopia NIR y artículos técnicos",
      "s": "Artículos técnicos sobre calibración NIR, modelado PLS, control de procesos en línea y ROI: lectura práctica para ingenieros de calidad y de procesos.",
      "k": "blog de espectroscopia nir y artículos técnicos artículos técnicos sobre calibración nir modelado pls control de procesos en línea y roi lectura práctica para ingenieros de calidad y de procesos blog articles notes de aplicación"
    },
    "ar": {
      "t": "مدونة مطيافية NIR ومقالات تقنية",
      "s": "مقالات وأوراق تقنية حول معايرة NIR ونمذجة PLS والتحكم المضمن في العمليات وعائد الاستثمار: قراءة عملية لمهندسي الجودة والعمليات.",
      "k": "مدونة مطيافية nir ومقالات تقنية مقالات وأوراق تقنية حول معايرة nir ونمذجة pls والتحكم المضمن في العمليات وعائد الاستثمار قراءة عملية لمهندسي الجودة والعمليات المدونات المقالات الملاحظات الفنية"
    },
    "zh": {
      "t": "NIR 光谱博客与技术文章",
      "s": "关于 NIR 定标、PLS 建模、在线过程控制和投资回报的技术文章：面向质量控制和工艺工程师的实用读物。",
      "k": "nir 光谱博客与技术文章 关于 nir 定标 pls 建模 在线过程控制和投资回报的技术文章 面向质量控制和工艺工程师的实用读物 技术博客 文章 应用说明 案例研究"
    }
  }
};
/* SEARCH_I18N_END */

// =====================================================================
// ANALYTICS -- onaya bagli (18.08.2026 denetimi O5).
// ANALYTICS.ga4 bos oldugu surece HICBIR olcum kodu yuklenmez. GA4 kimligi
// ('G-XXXXXXXXXX') girildiginde bile yukleme yalnizca ziyaretci "Analitik
// Cerezler"e onay verdikten sonra olur; onay oncesi disariya istek yok.
// =====================================================================
var ANALYTICS = { ga4: '' };

function getCookiePrefs() {
    try {
        var raw = localStorage.getItem('ustech_cookie_prefs');
        if (raw) return JSON.parse(raw);
        // eski format: 'accepted_all' -> hepsi acik; 'saved' -> bilinmiyor (kapali say)
        var legacy = localStorage.getItem('ustech_cookie_consent');
        if (legacy === 'accepted_all') return { analytical: true, marketing: true };
    } catch (e) {}
    return null;
}
function setCookiePrefs(prefs) {
    try { localStorage.setItem('ustech_cookie_prefs', JSON.stringify(prefs)); } catch (e) {}
    if (prefs && prefs.analytical) loadAnalytics();
}
function loadAnalytics() {
    if (!ANALYTICS.ga4 || window.__ustechGaLoaded) return;
    window.__ustechGaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS.ga4, { anonymize_ip: true, page_language: detectCurrentLang() });
    var sc = document.createElement('script');
    sc.async = true;
    sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ANALYTICS.ga4);
    document.head.appendChild(sc);
}
document.addEventListener('DOMContentLoaded', function () {
    var p = getCookiePrefs();
    if (p && p.analytical) loadAnalytics();
});
function searchLoc(item) {
    var lang = detectCurrentLang();
    if (lang === 'en' || !item || !item.url) return null;
    var base = item.url.split('#')[0];
    return (SEARCH_I18N[base] && SEARCH_I18N[base][lang]) || null;
}

// Detect current language from HTML lang attribute or pathname
function detectCurrentLang() {
    if (document.documentElement && document.documentElement.lang) {
        var htmlLang = document.documentElement.lang.toLowerCase().substring(0, 2);
        if (SUPPORTED_LANGS.indexOf(htmlLang) !== -1) {
            return htmlLang;
        }
    }
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var match = path.match(/\/(tr|fr|de|es|ar|zh)(\/|$)/i);
    return match ? match[1].toLowerCase() : 'en';
}

// Detect current page filename
function detectCurrentPage() {
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var filename = path.split('/').pop();
    if (!filename || filename === '' || filename.indexOf('.html') === -1) {
        filename = 'index.html';
    }
    return filename;
}

// Build relative URL for any target language
function getLangUrl(targetLang) {
    var currentPage = detectCurrentPage();
    var currentLang = detectCurrentLang();

    // Target is same as current language
    if (targetLang === currentLang) {
        return currentPage;
    }

    // 18.08.2026 (Y4): cevirisi olmayan sayfada (blog, eski urun URL'si) hedef dilde
    // 404 yerine en yakin mevcut sayfa: eski URL -> guncel sayfa; blog -> bilgi bankasi.
    var targetPage = LEGACY_PAGE_MAP[currentPage] || currentPage;
    if (targetLang !== 'en' && !TRANSLATED_PAGES[targetPage]) {
        targetPage = /^blog-/.test(targetPage) ? 'knowledge.html' : 'index.html';
    }

    // Currently in English root
    if (currentLang === 'en') {
        return targetLang + '/' + targetPage;
    }

    // Currently in a language subfolder (tr, fr, de, es, ar)
    if (targetLang === 'en') {
        return '../' + targetPage;
    }
    return '../' + targetLang + '/' + targetPage;
}

// Language switcher click handler
function selectLang(el) {
    var lang = el.getAttribute('data-lang');
    if (!lang) return;
    try {
        localStorage.setItem('ustech-lang', lang);
    } catch(e) {}
    var url = getLangUrl(lang);
    window.location.href = url;
}

// On page load: update the flag circle and ensure option hrefs are correct
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var currentLang = detectCurrentLang();
        var currentPage = detectCurrentPage();
        
        // Update the flag circle only if it does not match current language
        var firstCircle = document.querySelector('.lang-flag-circle');
        if (firstCircle && firstCircle.getAttribute('data-lang') !== currentLang) {
            var currentOption = document.querySelector('.lang-option[data-lang="' + currentLang + '"]');
            if (currentOption) {
                var svg = currentOption.querySelector('svg');
                if (svg) {
                    var clone = svg.cloneNode(true);
                    clone.setAttribute('width', '100%');
                    clone.setAttribute('height', '100%');
                    clone.setAttribute('preserveAspectRatio', 'xMidYMid slice');
                    clone.removeAttribute('style');
                    document.querySelectorAll('.lang-flag-circle').forEach(function(circle) {
                        circle.setAttribute('data-lang', currentLang);
                        circle.innerHTML = '';
                        circle.appendChild(clone.cloneNode(true));
                    });
                }
            }
        }
        
        // Set dynamic relative hrefs on all language options
        document.querySelectorAll('.lang-option').forEach(function(opt) {
            var lang = opt.getAttribute('data-lang');
            if (lang) {
                var targetUrl = getLangUrl(lang);
                opt.setAttribute('href', targetUrl);
                opt.addEventListener('click', function(e) {
                    try {
                        localStorage.setItem('ustech-lang', lang);
                    } catch(err) {}
                });
            }
        });
        
        // Auto-detect browser language on first visit (only on live web server, not file://)
        if (window.location.protocol.indexOf('http') === 0) {
            var savedLang = null;
            try {
                savedLang = localStorage.getItem('ustech-lang');
            } catch(e) {}
            
            if (!savedLang && currentLang === 'en' && currentPage === 'index.html') {
                var browserLang = (navigator.language || navigator.userLanguage || 'en').substring(0, 2).toLowerCase();
                if (SUPPORTED_LANGS.indexOf(browserLang) !== -1 && browserLang !== 'en') {
                    try {
                        localStorage.setItem('ustech-lang', browserLang);
                    } catch(e) {}
                    window.location.href = getLangUrl(browserLang);
                }
            }
        }
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    // Food & Feed Video Hover Playback Control
    const foodFeedCard = document.getElementById('food-feed-card');
    const foodFeedVideo = document.getElementById('food-feed-video');
    if (foodFeedCard && foodFeedVideo) {
        foodFeedCard.addEventListener('mouseenter', () => {
            foodFeedVideo.play().catch(error => {
                console.log("Video playback failed or interrupted: ", error);
            });
        });
        foodFeedCard.addEventListener('mouseleave', () => {
            foodFeedVideo.pause();
        });
    }

    // Dairy Video Hover Playback Control (Enforces starting at 2nd second)
    const dairyCard = document.getElementById('dairy-card');
    const dairyVideo = document.getElementById('dairy-video');
    if (dairyCard && dairyVideo) {
        // Enforce starting from 2nd second when metadata is loaded
        dairyVideo.addEventListener('loadedmetadata', () => {
            dairyVideo.currentTime = 2;
        });

        // If metadata is already loaded at code execution time
        if (dairyVideo.readyState >= 1) {
            dairyVideo.currentTime = 2;
        }

        dairyCard.addEventListener('mouseenter', () => {
            if (dairyVideo.currentTime < 2) {
                dairyVideo.currentTime = 2;
            }
            dairyVideo.play().catch(error => {
                console.log("Video playback failed or interrupted: ", error);
            });
        });

        dairyCard.addEventListener('mouseleave', () => {
            dairyVideo.pause();
        });

        // Enforce loop back to 2 seconds instead of 0 seconds
        dairyVideo.addEventListener('timeupdate', () => {
            if (dairyVideo.ended || (dairyVideo.currentTime > 0 && dairyVideo.currentTime < 2)) {
                dairyVideo.currentTime = 2;
            }
        });
    }

    // Chemical & Pharma Video Hover Playback Control (Enforces starting at 7th second)
    const chemPharmaCard = document.getElementById('chemical-pharma-card');
    const chemPharmaVideo = document.getElementById('chemical-pharma-video');
    if (chemPharmaCard && chemPharmaVideo) {
        // Enforce starting from 7th second when metadata is loaded
        chemPharmaVideo.addEventListener('loadedmetadata', () => {
            chemPharmaVideo.currentTime = 7;
        });

        // If metadata is already loaded at code execution time
        if (chemPharmaVideo.readyState >= 1) {
            chemPharmaVideo.currentTime = 7;
        }

        chemPharmaCard.addEventListener('mouseenter', () => {
            if (chemPharmaVideo.currentTime < 7) {
                chemPharmaVideo.currentTime = 7;
            }
            chemPharmaVideo.play().catch(error => {
                console.log("Video playback failed or interrupted: ", error);
            });
        });

        chemPharmaCard.addEventListener('mouseleave', () => {
            chemPharmaVideo.pause();
        });

        // Enforce loop back to 7 seconds instead of 0 seconds
        chemPharmaVideo.addEventListener('timeupdate', () => {
            if (chemPharmaVideo.ended || (chemPharmaVideo.currentTime > 0 && chemPharmaVideo.currentTime < 7)) {
                chemPharmaVideo.currentTime = 7;
            }
        });
    }

    // 1. Header Scroll Effect
    const header = document.querySelector('header');

    // Force scroll to top on fresh page load to prevent stale scroll position
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // Adreste #hedef varsa (orn. product-prochem.html#software-portal) en uste degil hedefe git;
    // tembel yuklenen gorseller duzeni kaydirdigi icin konum 'load'dan sonra hesaplanir.
    let hashTarget = null;
    try { hashTarget = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
    if (hashTarget) {
        const goToHash = () => window.scrollTo({ top: hashTarget.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' });
        if (document.readyState === 'complete') goToHash(); else window.addEventListener('load', goToHash);
    } else {
        window.scrollTo(0, 0);
    }

    // Initial check on page load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('open');
            }
        });
    }

    // 3. Dropdowns for Mobile (check width at click time, not bind time)
    const dropdownItems = document.querySelectorAll('.nav-item');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');
        
        if (link && menu) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && item.classList.contains('has-dropdown')) {
                    e.preventDefault();
                    // Close other open dropdowns
                    dropdownItems.forEach(other => {
                        if (other !== item) other.classList.remove('active');
                    });
                    item.classList.toggle('active');
                }
            });
        }
    });

    // 4. FAQ Accordion (Universal)
    const faqQuestions = document.querySelectorAll('.faq-question, .faq-q');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items in the same container
            const list = item.parentElement;
            list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4b. Mobile Card Accordion — Convert all cards to tap-to-expand on mobile
    if (window.innerWidth <= 768) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            // Only convert cards that have a heading AND paragraph content
            const heading = card.querySelector('h3, h4');
            const paragraphs = card.querySelectorAll(':scope > p');
            
            if (heading && paragraphs.length > 0) {
                card.classList.add('mobile-accordion');
                
                card.addEventListener('click', (e) => {
                    // Don't toggle if user clicked a link inside the card
                    if (e.target.tagName === 'A' || e.target.closest('a')) return;
                    
                    const isExpanded = card.classList.contains('expanded');
                    
                    // Close all sibling cards in the same parent
                    const parent = card.parentElement;
                    parent.querySelectorAll('.card.mobile-accordion.expanded').forEach(other => {
                        other.classList.remove('expanded');
                    });
                    
                    // Toggle current (open if it was closed)
                    if (!isExpanded) {
                        card.classList.add('expanded');
                    }
                });
            }
        });
    }

    // 5. Product/Software Tab Switcher (Backup for main products page if needed)
    const tabButtons = document.querySelectorAll('.product-tab-btn');
    const tabPanels = document.querySelectorAll('.product-panel');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                tabPanels.forEach(panel => {
                    if (panel.id === target) {
                        panel.style.display = 'block';
                    } else {
                        panel.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Interactive B2B ROI Calculator
    const roiForm = document.getElementById('roi-form');
    if (roiForm) {
        const throughputInput = document.getElementById('throughput');
        const valInput = document.getElementById('val');
        const wasteInput = document.getElementById('waste-red');
        const failsInput = document.getElementById('batch-fails');
        
        const processSavingsEl = document.getElementById('res-process');
        const failSavingsEl = document.getElementById('res-fails');
        const totalSavingsEl = document.getElementById('res-total');
        
        function calculateROI() {
            const throughput = parseFloat(throughputInput.value) || 0;
            const val = parseFloat(valInput.value) || 0;
            const wasteRed = (parseFloat(wasteInput.value) || 0) / 100;
            const batchFails = (parseFloat(failsInput.value) || 0) / 100;
            
            // Process Savings (Daily yield enhancement * 300 working days)
            const dailyProcessSavings = throughput * val * wasteRed;
            const annualProcessSavings = dailyProcessSavings * 300;
            
            // Batch Fail Savings (Assuming NIR inspection saves 50% of failed batches)
            const annualFailSavings = (batchFails * 0.5) * throughput * 300 * val;
            
            const totalAnnualSavings = annualProcessSavings + annualFailSavings;
            
            // Update UI with currency formatting (USD/EUR)
            processSavingsEl.textContent = formatCurrency(annualProcessSavings);
            failSavingsEl.textContent = formatCurrency(annualFailSavings);
            totalSavingsEl.textContent = formatCurrency(totalAnnualSavings);
        }
        
        function formatCurrency(num) {
            return new Intl.NumberFormat(ui('locale'), { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(num));
        }
        
        [throughputInput, valInput, wasteInput, failsInput].forEach(input => {
            input.addEventListener('input', calculateROI);
        });
        
        // Run initial calculation
        calculateROI();
    }

    // 8. Interactive NIR Spectroscopy Simulator
    const canvas = document.getElementById('spectroscopy-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const moistureSlider = document.getElementById('sim-moisture');
        const fatSlider = document.getElementById('sim-fat');
        const proteinSlider = document.getElementById('sim-protein');
        const starchSlider = document.getElementById('sim-starch');
        
        const valMoisture = document.getElementById('val-moisture');
        const valFat = document.getElementById('val-fat');
        const valProtein = document.getElementById('val-protein');
        const valStarch = document.getElementById('val-starch');
        
        let scanX = 0;
        let animationFrameId;
        
        function drawSpectrum() {
            const width = canvas.width = canvas.parentElement.clientWidth;
            const height = canvas.height = 300;
            
            ctx.clearRect(0, 0, width, height);
            
            const moisture = parseFloat(moistureSlider.value);
            const fat = parseFloat(fatSlider.value);
            const protein = parseFloat(proteinSlider.value);
            const starch = parseFloat(starchSlider.value);
            
            // Update labels
            if(valMoisture) valMoisture.textContent = moisture + '%';
            if(valFat) valFat.textContent = fat + '%';
            if(valProtein) valProtein.textContent = protein + '%';
            if(valStarch) valStarch.textContent = starch + '%';
            
            // Grid Lines & Background Grid
            ctx.strokeStyle = '#f1f3f5';
            ctx.lineWidth = 1;
            const gridCols = 10;
            const gridRows = 5;
            
            for (let i = 1; i < gridCols; i++) {
                const x = (width / gridCols) * i;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height - 30);
                ctx.stroke();
            }
            for (let i = 1; i < gridRows; i++) {
                const y = ((height - 30) / gridRows) * i;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            
            // Draw axis line
            ctx.strokeStyle = '#dee2e6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, height - 30);
            ctx.lineTo(width, height - 30);
            ctx.stroke();
            
            // Draw constituent curves
            ctx.strokeStyle = '#12141d';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            for (let x = 0; x < width; x++) {
                // Map x position to wavelength (1350nm to 2550nm)
                const wavelength = 1350 + (x / width) * 1200;
                
                // Base curve (smooth arc representing reference reflection)
                let yVal = 80 + Math.sin((x / width) * Math.PI) * 40;
                
                // Moisture absorption peaks: 1450nm (sharp) and 1940nm (wide)
                const mPeak1 = Math.exp(-Math.pow((wavelength - 1450) / 40, 2)) * moisture * 2.2;
                const mPeak2 = Math.exp(-Math.pow((wavelength - 1940) / 70, 2)) * moisture * 3.5;
                
                // Fat absorption peaks: 1720nm and 2300nm
                const fPeak1 = Math.exp(-Math.pow((wavelength - 1720) / 30, 2)) * fat * 2.8;
                const fPeak2 = Math.exp(-Math.pow((wavelength - 2300) / 50, 2)) * fat * 3.2;
                
                // Protein absorption peak: 2180nm
                const pPeak = Math.exp(-Math.pow((wavelength - 2180) / 45, 2)) * protein * 4.0;
                
                // Starch absorption peak: 2280nm
                const sPeak = Math.exp(-Math.pow((wavelength - 2280) / 35, 2)) * starch * 3.0;
                
                // Apply peaks (subtracting from reflectance Y value means drawing lower on screen)
                yVal += (mPeak1 + mPeak2 + fPeak1 + fPeak2 + pPeak + sPeak);
                
                // Bound Y value
                const yScreen = Math.min(height - 40, Math.max(10, yVal));
                
                if (x === 0) {
                    ctx.moveTo(x, yScreen);
                } else {
                    ctx.lineTo(x, yScreen);
                }
            }
            ctx.stroke();
            
            // Draw axis labels
            ctx.fillStyle = '#6c757d';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            
            const labelInterval = 5;
            for (let i = 0; i <= labelInterval; i++) {
                const x = (width / labelInterval) * i;
                const wlValue = Math.round(1350 + (i / labelInterval) * 1200);
                ctx.fillText(wlValue + ' nm', x, height - 12);
            }
            
            // Draw Y-axis label (Reflectance)
            ctx.save();
            ctx.translate(15, height / 2 - 15);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('Reflectance (R)', 0, 0);
            ctx.restore();
            
            // Drawing scanning indicator
            scanX = (scanX + 1.5) % width;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(scanX, 0);
            ctx.lineTo(scanX, height - 30);
            ctx.stroke();
            ctx.fillRect(scanX - 15, 0, 30, height - 30);
            
            // Show scanning text info
            ctx.fillStyle = '#12141d';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            const curWavelength = Math.round(1350 + (scanX / width) * 1200);
            ctx.fillText('Scanning: ' + curWavelength + ' nm', width - 20, 20);
            
            animationFrameId = requestAnimationFrame(drawSpectrum);
        }
        
        // Listen to sliders
        [moistureSlider, fatSlider, proteinSlider, starchSlider].forEach(slider => {
            slider.addEventListener('input', () => {
                cancelAnimationFrame(animationFrameId);
                drawSpectrum();
            });
        });
        
        // Handle window resizing
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationFrameId);
            drawSpectrum();
        });
        
        // Initialize
        drawSpectrum();
    }

    // 9. Floating Cookie Settings & Back-to-Top Widget injection
    injectFloatingWidgets();

    function injectFloatingWidgets() {
        const container = document.createElement('div');
        container.id = 'ustech-floating-widgets';
        
        const cookieSvg = `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>`;

        container.innerHTML = `
            <!-- Cookie Preferences Floating Button -->
            <button id="cookie-settings-btn" class="cookie-settings-btn" aria-label="${ui('cookie_settings')}">
                ${cookieSvg}
            </button>

            <!-- Cookie Preferences Modal -->
            <div id="cookie-modal" class="cookie-modal">
                <div class="cookie-modal-content">
                    <h3 class="cookie-modal-title">${ui('cookie_title')}</h3>
                    <p class="cookie-modal-text">${ui('cookie_text')}</p>
                    <div class="cookie-options">
                        <div class="cookie-option">
                            <div class="cookie-option-info">
                                <strong>${ui('cookie_ess')}</strong>
                                <span>${ui('cookie_ess_d')}</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="cookie-option">
                            <div class="cookie-option-info">
                                <strong>${ui('cookie_ana')}</strong>
                                <span>${ui('cookie_ana_d')}</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="cookie-analytical">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="cookie-option">
                            <div class="cookie-option-info">
                                <strong>${ui('cookie_mkt')}</strong>
                                <span>${ui('cookie_mkt_d')}</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="cookie-marketing">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div class="cookie-modal-buttons">
                        <button id="save-cookies-btn" class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">${ui('cookie_save')}</button>
                        <button id="accept-all-cookies-btn" class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">${ui('cookie_accept')}</button>
                    </div>
                </div>
            </div>

            <!-- Back to Top Button -->
            <button id="back-to-top-btn" class="back-to-top-btn" aria-label="${ui('back_top')}">
                ↑
            </button>
        `;

        document.body.appendChild(container);

        const cookieBtn = document.getElementById('cookie-settings-btn');
        const cookieModal = document.getElementById('cookie-modal');
        const saveBtn = document.getElementById('save-cookies-btn');
        const acceptAllBtn = document.getElementById('accept-all-cookies-btn');
        const backToTopBtn = document.getElementById('back-to-top-btn');

        // Check if user has already given cookie consent
        const hasCookieConsent = localStorage.getItem('ustech_cookie_consent');
        (function () {
            const p = getCookiePrefs();
            if (!p) return;
            const a = document.getElementById('cookie-analytical');
            const m = document.getElementById('cookie-marketing');
            if (a) a.checked = !!p.analytical;
            if (m) m.checked = !!p.marketing;
        })();
        if (hasCookieConsent) {
            if (cookieBtn) cookieBtn.style.display = 'none';
        } else {
            // Show modal automatically on first visit after brief delay
            setTimeout(() => {
                if (!localStorage.getItem('ustech_cookie_consent') && cookieModal) {
                    cookieModal.classList.add('open');
                }
            }, 1200);
        }

        if (cookieBtn && cookieModal) {
            cookieBtn.addEventListener('click', () => {
                cookieModal.classList.add('open');
            });

            cookieModal.addEventListener('click', (e) => {
                if (e.target === cookieModal) {
                    cookieModal.classList.remove('open');
                }
            });
        }

        if (saveBtn && cookieModal) {
            saveBtn.addEventListener('click', () => {
                localStorage.setItem('ustech_cookie_consent', 'saved');
                setCookiePrefs({
                    analytical: !!(document.getElementById('cookie-analytical') || {}).checked,
                    marketing: !!(document.getElementById('cookie-marketing') || {}).checked
                });
                cookieModal.classList.remove('open');
                if (cookieBtn) cookieBtn.style.display = 'none';
                showNotification(ui('cookie_saved'));
            });
        }

        if (acceptAllBtn && cookieModal) {
            acceptAllBtn.addEventListener('click', () => {
                const analytical = document.getElementById('cookie-analytical');
                const marketing = document.getElementById('cookie-marketing');
                if (analytical) analytical.checked = true;
                if (marketing) marketing.checked = true;
                localStorage.setItem('ustech_cookie_consent', 'accepted_all');
                setCookiePrefs({ analytical: true, marketing: true });
                cookieModal.classList.remove('open');
                if (cookieBtn) cookieBtn.style.display = 'none';
                showNotification(ui('cookie_all'));
            });
        }

        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    function showNotification(msg) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '50%';
        toast.style.left = '50%';
        toast.style.backgroundColor = 'var(--accent-black)';
        toast.style.color = 'var(--bg-primary)';
        toast.style.border = '1px solid var(--border-color)';
        toast.style.padding = '0.75rem 1.5rem';
        toast.style.borderRadius = '6px';
        toast.style.fontSize = '0.85rem';
        toast.style.fontWeight = '500';
        toast.style.boxShadow = 'var(--shadow-lg)';
        toast.style.zIndex = '100000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.transform = 'translate(-50%, -50%) translateY(10px)';
        toast.textContent = msg;

        document.body.appendChild(toast);
        
        toast.offsetHeight;

        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -50%) translateY(0)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -50%) translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 10. Search System
    setupSearch();

    function setupSearch() {
        const searchDb = [
            {
            title: "USTECH Innovations | Home",
            url: "index.html",
            category: "General",
            keywords: "home homepage nir ft-nir spectroscopy process analytics main welcome index",
            snippet: "Advanced spectroscopy solutions. Next-generation inline NIR and FT-NIR analytical instruments for process control."
            },
            {
            title: "About Us | USTECH Innovations",
            url: "about.html",
            category: "General",
            keywords: "about us team mission history company leaders quality",
            snippet: "Learn about our mission, history, and the team behind our industry-leading process spectroscopy solutions."
            },
            {
            title: "Contact Us & Request Quote",
            url: "contact.html",
            category: "General",
            keywords: "contact support quote sales location map address form phone email",
            snippet: "Get in touch with USTECH. Request a custom quote, get technical support, or find our office location."
            },
            {
            title: "Frequently Asked Questions (FAQ)",
            url: "faq.html",
            category: "General",
            keywords: "faq support questions calibration service maintenance warranty help",
            snippet: "Find answers about NIR technology, calibration models, hardware maintenance, and support services."
            },
            {
            title: "Industries Overview",
            url: "industries.html",
            category: "Industries",
            keywords: "industries overview sectors food feed dairy chemical pharma processing applications",
            snippet: "Overview of the industrial processing sectors we serve: Food & Feed, Dairy, and Chemical & Pharma."
            },
            {
            title: "Food & Feed Industry Solutions",
            url: "industry-food-feed.html",
            category: "Industries",
            keywords: "food feed grain agriculture animal feed protein moisture fat fiber starch ash",
            snippet: "Optimize ingredient formulation and prevent raw material giveaway with real-time inline analysis."
            },
            {
            title: "Dairy Industry Solutions",
            url: "industry-dairy.html",
            category: "Industries",
            keywords: "dairy milk cheese cream whey butter fat lactose protein solids yogurt concentration",
            snippet: "Ensure consistent product quality and maximize process yield with inline dairy standardization."
            },
            {
            title: "Chemical & Pharmaceutical Solutions",
            url: "industry-chemical-pharma.html",
            category: "Industries",
            keywords: "chemical pharmaceutical pharma hydroxyl moisture active ingredient API reaction blend polymer",
            snippet: "Monitor critical reactions, blend uniformity, and constituent concentration in harsh process environments."
            },
            {
            title: "Products Overview",
            url: "products.html",
            category: "Products",
            keywords: "products overview catalog devices hardware software suites calibrators",
            snippet: "Overview of USTECH products: high-performance NIR and FT-NIR devices and process-control software solutions."
            },
            {
            title: "Analytical Devices & Hardware",
            url: "products-devices.html",
            category: "Products",
            keywords: "devices hardware proline2550 proline17ec proline17ecs masterline tornado analyzer sensor probes inline at-line",
            snippet: "Explore our rugged industrial NIR and FT-NIR spectrometer systems, fiber-optic probes, and process interfaces."
            },
            {
            title: "Spectroscopy Software Suite",
            url: "products-software.html",
            category: "Products",
            keywords: "software prochem viewer calix chemometrics solo eigen vector model converter",
            snippet: "Explore our calibration, process control, and real-time monitoring software suites."
            },
            {
            title: "caliX Spectral Intelligence System",
            url: "product-calix.html",
            category: "Products",
            keywords: "calix automl machine learning calibration classification prediction data engine",
            snippet: "Advanced chemometric modeling software featuring automated calibration (AutoML) and data engineering."
            },
            /* StarchQC: HOLD_LOCAL -- kullanici karari, yayinlanana kadar arama dizininde yok (18.08.2026) */
            {
            title: "USTECH MasterLine17EC",
            url: "product-masterline.html",
            category: "Products",
            keywords: "USTECH MasterLine17EC grain animal feed moisture protein fat ash fiber at-line cup",
            snippet: "Robust at-line analyzer designed for quality control of grains, meals, and finished animal feeds."
            },
            /* ProLine17ES: emekli (07.09.2026), canlidan kaldirildi -> yerine 17EC ve 17ECS */
            {
            title: "USTECH StarchQC",
            url: "product-starchqc.html",
            category: "Products",
            keywords: "StarchQC damaged starch analyzer flour mill amperometric wet milling extraction at-line nisasta",
            snippet: "Amperometric damaged starch analyzer for flour mills: fast, accurate measurement without wet chemistry."
            },
            /* TrueLine 17EC: HOLD_LOCAL + UNPUBLISH_FROM_REMOTE -- yayinlanana kadar arama dizininde YOK */
            {
            title: "ProLine17EC NIR Analyzer",
            url: "product-proline-17ec.html",
            category: "Products",
            keywords: "ProLine17EC ProLine 17EC 17EC ProLine17ES 17ES legacy replacement inline NIR analyzer sensor InGaAs sapphire window IP65 stainless steel pipe chute conveyor moisture protein fat ash starch fiber PLC SCADA",
            snippet: "Compact inline NIR analyzer with InGaAs array and food-grade sapphire window for continuous, real-time process control."
            },
            {
            title: "ProLine17ECS Inline NIR Analyzer",
            url: "product-proline-17ecs.html",
            category: "Products",
            keywords: "ProLine17ECS ProLine 17ECS 17ECS split dual-chassis inline NIR analyzer high sensitivity probe head controller junction box InGaAs sapphire IP65 stainless steel",
            snippet: "Split dual-chassis inline NIR analyzer built for demanding process lines that need maximum sensitivity."
            },
            {
            title: "ProLine2550 Inline Process Analyzer",
            url: "product-proline-2550.html",
            category: "Products",
            keywords: "ProLine2550 inline process analyzer pipeline reactor liquid slurry powder FT-NIR",
            snippet: "Inline FT-NIR process analyzer for pipes, reactors and powder streams with closed-loop PLC integration."
            },
            /* SamplePrep: HOLD_LOCAL -- kullanici karari, yayinlanana kadar arama dizininde yok (18.08.2026) */
            {
            title: "USTECH Tornado+ Laboratory Mill",
            url: "product-tornado.html",
            category: "Products",
            keywords: "tornado mill grinder grinding water-cooled sample preparation grain feed seed laboratory",
            snippet: "Water-cooled high-performance laboratory mill for fast, uniform grinding of grain, seed and feed samples."
            },
            {
            title: "ProChem Process Control Software",
            url: "product-prochem.html",
            category: "Products",
            keywords: "prochem prochem viewer plc control closed loop ethernet integration database csv",
            snippet: "Centralized process control software integrating spectroscopy hardware directly with factory PLCs."
            },
            {
            title: "Knowledge Base Overview",
            url: "knowledge.html",
            category: "Knowledge",
            keywords: "knowledge base overview technology theory blogs articles whitepapers guides",
            snippet: "Access USTECH Innovations' knowledge base: learn about spectroscopy physics and read B2B case studies."
            },
            {
            title: "NIR Technology & Theory",
            url: "knowledge-technology.html",
            category: "Knowledge",
            keywords: "technology nir ft-nir theory diode-array interferometer reflectance transmission chemometrics calibration",
            snippet: "Learn the scientific principles behind NIR and FT-NIR spectroscopy, spectrometer design, and chemometrics."
            },
            {
            title: "Blogs & Application Notes",
            url: "knowledge-blogs.html",
            category: "Knowledge",
            keywords: "blog articles application notes case studies papers downloads whitepapers news",
            snippet: "Read the latest industry insights, application case studies, and scientific articles from our experts."
            },
            {
            title: "Calibration Transfer Between NIR Spectrometers: Methods and Feasibility",
            url: "blog-calibration-transfer.html",
            category: "Knowledge",
            keywords: "calibration transfer feasibility nir spectrometers bias standardization PDS",
            snippet: "How calibration transfer between NIR spectrometers works: standardisation and model-adjustment methods, and how feasibility is assessed."
            },
            {
            title: "Reducing Ingredient Waste in Cattle Feed Production",
            url: "blog-cattle-feed-waste.html",
            category: "Knowledge",
            keywords: "reducing ingredient waste cattle feed production inline NIR calibration soy protein",
            snippet: "Read this commercial case study showing how inline NIR sensors optimized animal feed mixing and protein margins."
            },
            {
            title: "Introduction to PLS Regression in caliX Suite",
            url: "blog-pls-regression-calix.html",
            category: "Knowledge",
            keywords: "introduction PLS regression calix suite chemometrics modeling preprocessing AutoML",
            snippet: "Step-by-step tutorial explaining spectral preprocessing, Latent Variable selection, and PLS model validation."
            },
            {
            title: "Real-Time Hydroxyl Value Monitoring in Polyol Production",
            url: "blog-hydroxyl-value-polyol.html",
            category: "Knowledge",
            keywords: "hydroxyl value polyol chemical polymerization esterification inline NIR titration",
            snippet: "Technical white paper detailing real-time tracking of OHV in chemical polymerization processes."
            },
            {
            title: "Standardizing Moisture in Milk Powder Spray Drying",
            url: "blog-moisture-milk-powder.html",
            category: "Knowledge",
            keywords: "moisture milk powder dairy spray dryer exit inline NIR moisture control",
            snippet: "Case study explaining how inline NIR standardization of milk powder spray dryer exit parameters prevents clogging and maximizes yield."
            },
            {
            title: "Understanding Savitzky-Golay Filtering in Preprocessing",
            url: "blog-savitzky-golay-filtering.html",
            category: "Knowledge",
            keywords: "savitzky golay filtering preprocessing spectral derivatives math smoothing calix",
            snippet: "Educational guide on Savitzky-Golay filtering calculations and derivative selection for NIR spectrum prep."
            },
            {
            title: "Blend Uniformity Verification in Active Pharmaceutical Blending",
            url: "blog-blend-uniformity-pharma.html",
            category: "Knowledge",
            keywords: "blend uniformity pharmaceutical blending powder RSD active ingredients pharma bin",
            snippet: "B2B case study demonstrating real-time relative standard deviation monitoring inside pharmaceutical bin blenders."
            },
            {
            title: "MEMS Comb-Drive Mechanical Durability in Industrial Environments",
            url: "blog-mems-durability-industrial.html",
            category: "Knowledge",
            keywords: "mems comb-drive durability industrial environments shock resistance g-force lifetime vibration",
            snippet: "What the reliability literature says about MEMS comb drives under shock, vibration, temperature cycling and fatigue."
            },
            {
            title: "Developing Robust Chemometric Classification Models via PCA",
            url: "blog-pca-classification-models.html",
            category: "Knowledge",
            keywords: "developing PCA classification chemometrics qualitative validation principal component analysis raw materials",
            snippet: "Guide detailing the selection of Principal Components for raw material identification and sample qualifiers."
            },
            {
            title: "Optimizing Starch Extraction Efficiency in Wet Corn Milling",
            url: "blog-starch-extraction-milling.html",
            category: "Knowledge",
            keywords: "starch extraction milling wet corn extraction feed centrifuge processing yield",
            snippet: "Industrial case study of starch yield enhancement and material control in wet-milling exit streams."
            },
            {
            title: "Optical Fiber Interface Designs for Corrosive Chemical Reactors",
            url: "blog-fiber-interface-reactors.html",
            category: "Knowledge",
            keywords: "optical fiber interface corrosive chemical reactors sapphire hastelloy probes pressure high temperature",
            snippet: "Engineering white paper on optical probe construction using sapphire windows and Hastelloy materials for aggressive environments."
            },
            {
            title: "Standardizing OPC UA Integrations for Closed-Loop Dosing Valves",
            url: "blog-opc-ua-dosing-valves.html",
            category: "Knowledge",
            keywords: "standardizing OPC UA integration closed-loop dosing valves PLC automation scada feedback loop",
            snippet: "Industrial automation guide outlining OPC UA tag mappings to feed spectrometer outputs into closed-loop control systems."
            },
            {
            title: "Moisture and Protein Analysis in Milk Powder by NIR Spectroscopy",
            url: "blog-milk-powder-analysis.html",
            category: "Knowledge",
            keywords: "rapid moisture protein analysis milk powder spray dryer discharge dairy composition",
            snippet: "Real-time monitoring of spray dryer discharge parameters using NIR spectroscopy."
            },
            {
            title: "Real-Time Fat Analysis in Ground Beef Processing",
            url: "blog-ground-beef-fat.html",
            category: "Knowledge",
            keywords: "real-time fat analysis ground beef processing inline meat fat moisture measurement",
            snippet: "Inline measurement of fat and moisture concentration in ground beef lines using at-line and inline NIR systems."
            },
            {
            title: "Crude Fiber and Ash Content Determination in Feed Rations by NIR Spectroscopy",
            url: "blog-feed-fiber-ash.html",
            category: "Knowledge",
            keywords: "crude fiber ash content determination feed rations animal feed plants mill composition",
            snippet: "Controlling crude fiber, ash, and moisture parameters in animal feed plants using inline and at-line near-infrared spectroscopy."
            },
            {
            title: "Starch Damage and Gluten Quality in Durum Wheat Semolina",
            url: "blog-semolina-starch-gluten.html",
            category: "Knowledge",
            keywords: "starch damage gluten verification wheat semolina milling quality wet gluten index",
            snippet: "Inline quality monitoring of semolina parameters including wet gluten, index, and starch damage in milling facilities."
            },
            {
            title: "Hydroxyl Value Monitoring in Polymerization Processes",
            url: "blog-polymerization-hydroxyl.html",
            category: "Knowledge",
            keywords: "hydroxyl value monitoring polymerization processes chemical reactors OHV reaction endpoints fiber optic",
            snippet: "Real-time tracking of hydroxyl value (OHV) and reaction endpoints in chemical reactors using fiber-optic-coupled NIR."
            },
            {
            title: "Free Fatty Acidity (FFA) Monitoring in Olive Oil Processing",
            url: "blog-olive-oil-acidity.html",
            category: "Knowledge",
            keywords: "free fatty acidity FFA monitoring olive oil processing decanter discharge moisture peroxide",
            snippet: "Simultaneous determination of free fatty acidity, moisture, and peroxide value at the decanter discharge during oil extraction."
            },
            {
            title: "Optimizing Oil and Protein Extraction in Soybean Crush Plants",
            url: "blog-soybean-crush-yield.html",
            category: "Knowledge",
            keywords: "soybean crush plants oil extraction protein yield de-solventizer toasters continuous meal",
            snippet: "Maximize extraction yield and prevent protein giveaway during commercial oilseed crush operations."
            },
            {
            title: "Moisture and Fat Standardization in Pet Food Extrusion",
            url: "blog-petfood-extrusion-moisture.html",
            category: "Knowledge",
            keywords: "pet food extrusion moisture fat standardization kibble mold vacuum coating conditioning",
            snippet: "Achieving batch-to-batch consistency and shelf-life protection in commercial kibble production."
            },
            {
            title: "Real-Time Moisture Control in Corn Gluten Feed Dryers",
            url: "blog-corn-gluten-dryer.html",
            category: "Knowledge",
            keywords: "corn gluten feed dryers moisture control drying steam pressure protein stability cgm cgf",
            snippet: "Continuous moisture standardization to reduce thermal drying energy costs and stabilize protein content."
            },
            {
            title: "Continuous Ash and Protein Monitoring in Wheat Flour Milling",
            url: "blog-flour-ash-milling.html",
            category: "Knowledge",
            keywords: "wheat flour milling ash protein monitoring stream splits extraction rates patent clear flour",
            snippet: "Ensure absolute flour quality grading and optimize flour extraction margins in dry milling lines."
            },
            {
            title: "Evaluating Cheese Yield Prediction Models Using caliX",
            url: "blog-cheese-yield-prediction.html",
            category: "Knowledge",
            keywords: "cheese yield prediction calix models moisture-in-curd vat coagulation PLS regression",
            snippet: "Maximize cheese manufacturing yield by predicting vat outcomes using chemometric modelling."
            },
            {
            title: "Optimizing Fat and Protein Standardization in Liquid Milk",
            url: "blog-liquid-milk-standardization.html",
            category: "Knowledge",
            keywords: "fat protein standardization liquid milk dosing valve blocks cream injection fat target",
            snippet: "Direct closed-loop dosing valves to hit fat targets with high repeatabilities."
            },
            {
            title: "Total Solids Control in Whey Permeate Evaporators",
            url: "blog-whey-permeate-evaporator.html",
            category: "Knowledge",
            keywords: "whey permeate evaporators total solids control concentration density spray dryer draw-off",
            snippet: "Stabilizing evaporator output density to prevent crystallization and optimize dryer feed rate."
            },
            {
            title: "Inline Fat and Moisture Standardization in Continuous Butter Making",
            url: "blog-butter-fat-moisture.html",
            category: "Knowledge",
            keywords: "inline fat moisture standardization continuous butter making churn reflectance probe water dosing",
            snippet: "Maximize weight yield and maintain strict legal water limits (16.0% max) in continuous butter churns."
            },
            {
            title: "Monitoring Lactic Acid and pH in Yogurt Fermentation",
            url: "blog-yogurt-fermentation-lactic.html",
            category: "Knowledge",
            keywords: "monitoring lactic acid pH yogurt fermentation live culture acidity probe cooling vat",
            snippet: "Improve yogurt batch consistency and prevent post-acidification using continuous acidity scans."
            },
            {
            title: "Moisture and Salt Monitoring in Cheddar Cheese Milling",
            url: "blog-cheese-moisture-milling.html",
            category: "Knowledge",
            keywords: "moisture salt monitoring cheddar cheese milling curd salting pressing salt-to-moisture",
            snippet: "Grade cheese curd splits dynamically and optimize salt-to-moisture ratios in real-time."
            },
            {
            title: "Incoming Milk Fat and Total Solids Grading at Receiving Docks",
            url: "blog-dairy-receiving-total-solids.html",
            category: "Knowledge",
            keywords: "incoming milk fat total solids grading receiving docks tanker delivery transmission cell",
            snippet: "Grade raw milk tanker deliveries instantly and standardise intake value parameters."
            },
            {
            title: "Moisture Monitoring in Fluid Bed Granulation",
            url: "blog-pharma-granulation-moisture.html",
            category: "Knowledge",
            keywords: "moisture monitoring fluid bed granulation powder active granulate drying endpoint LOD",
            snippet: "Achieve consistent active pharmaceutical powder granulation drying cycles using inline moisture probes."
            },
            {
            title: "Inline Solvent Purity Monitoring in Chemical Distillation Columns",
            url: "blog-solvent-distillation-purity.html",
            category: "Knowledge",
            keywords: "inline solvent purity monitoring chemical distillation columns reflux ratio binary fractions recovery",
            snippet: "Control reflux ratios and optimize distillation energy input via real-time binary fraction analysis."
            },
            {
            title: "Density and Crystallinity Grading of Polyethylene Packaging",
            url: "blog-packaging-polymer-density.html",
            category: "Knowledge",
            keywords: "density crystallinity grading polyethylene packaging polymer film thickness barrier HDPE LDPE",
            snippet: "Ensure incoming polymer film barrier properties and density grading using rapid reflectance scans."
            },
            {
            title: "Incoming Raw Material Identification in Pharmaceutical Warehouses",
            url: "blog-pharma-raw-material-id.html",
            category: "Knowledge",
            keywords: "incoming raw material identification pharmaceutical warehouses GMP active ingredients excipients PCA calix",
            snippet: "Verify 100% of incoming raw material bags at dock doors to eliminate chemical contamination risks."
            },
            {
            title: "Acid Value and Viscosity Tracking in Alkyd Resin Cooking",
            url: "blog-chemical-alkyd-resin.html",
            category: "Knowledge",
            keywords: "acid value viscosity tracking alkyd resin cooking esterification polymerization gelling endpoint",
            snippet: "Predict reaction endpoints and acid values continuously in high-temperature chemical reactors."
            },
            {
            title: "Multiplicative Scatter Correction and Standard Normal Variate Preprocessing",
            url: "blog-msc-snv-preprocessing.html",
            category: "Knowledge",
            keywords: "multiplicative scatter correction standard normal variate preprocessing SNV MSC light path reflectance",
            snippet: "Learn how SNV and MSC algorithms eliminate physical sample packing and particle size variations."
            },
            {
            title: "Standardizing Reference Background Measurement Intervals in Process Spectroscopy",
            url: "blog-spectrometer-reference-bg.html",
            category: "Knowledge",
            keywords: "standardizing reference background measurement intervals process spectroscopy calibration drift gold-flag mirror",
            snippet: "Ensure long-term calibration model stability by managing ambient temperature and diode source drift."
            },
            {
            title: "Rapid Adulteration Detection in Raw Milk Receiving",
            url: "blog-milk-adulteration-receiving.html",
            category: "Knowledge",
            keywords: "adulteration detection raw milk receiving water urea melamine screening tankers",
            snippet: "Screening incoming raw milk tanker deliveries for added water, urea, and melamine using automated transmission cell analyzers."
            },
            {
            title: "Bioreactor Feeding Optimization in Mammalian Cell Culture",
            url: "blog-bioreactor-cell-culture.html",
            category: "Knowledge",
            keywords: "bioreactor feeding optimization mammalian cell culture glucose lactate cell density sapphire probes",
            snippet: "Real-time inline monitoring of glucose, lactate, and viable cell density inside bioreactors using sapphire immersion probes."
            },
            {
            title: "Wavelength Selection & Feature Engineering for NIR Spectral Models",
            url: "blog-wavelength-selection-ipls.html",
            category: "Knowledge",
            keywords: "wavelength selection feature engineering NIR spectral models genetic algorithms iPLS calix",
            snippet: "How to use Genetic Algorithms and iPLS in the caliX suite to select optimal wavelength bands and improve model portability."
            },
            {
            title: "Chemometric Outlier Detection: Mahalanobis Distance vs. Hotelling's T²",
            url: "blog-outlier-detection-mahalanobis.html",
            category: "Knowledge",
            keywords: "outlier detection mahalanobis distance hotelling's t2 chemometrics regression classification calibration",
            snippet: "A detailed guide explaining how to calculate and set outlier threshold limits for regression and classification calibrations."
            }
        ];


        // 1. Inject Search Toggle Button + Search Overlay Panel
        const navContainer = document.querySelector('.nav-container');
        const navLinksUl = document.querySelector('.nav-links');
        if (navContainer && navLinksUl) {
            // Create the small search toggle button (magnifying glass)
            const searchToggle = document.createElement('button');
            searchToggle.className = 'search-toggle-btn';
            searchToggle.id = 'search-toggle-btn';
            searchToggle.setAttribute('aria-label', ui('open_search'));
            searchToggle.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            `;
            // Insert after the nav-links (right side, next to lang selector)
            navLinksUl.parentNode.insertBefore(searchToggle, navLinksUl.nextSibling);

            // Create the search overlay backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'search-overlay-backdrop';
            backdrop.id = 'search-overlay-backdrop';
            document.body.appendChild(backdrop);

            // Create the search overlay panel
            const searchContainer = document.createElement('div');
            searchContainer.className = 'header-search-container';
            searchContainer.id = 'header-search-overlay';
            searchContainer.innerHTML = `
                <div class="search-inner-wrapper">
                    <div class="search-input-wrapper">
                        <input type="text" id="header-search-input" placeholder="${ui('search_ph')}" autocomplete="off">
                        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <button id="search-clear-btn" class="search-clear-btn" type="button">&times;</button>
                        <button id="search-close-btn" class="search-close-btn" type="button" aria-label="${ui('close_search')}">&times;</button>
                    </div>
                    <div id="search-results-dropdown" class="search-results-dropdown"></div>
                </div>
            `;
            document.body.appendChild(searchContainer);

            // Toggle search open/close
            function openSearch() {
                searchContainer.classList.add('open');
                backdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    const input = document.getElementById('header-search-input');
                    if (input) input.focus();
                }, 350);
            }
            function closeSearch() {
                searchContainer.classList.remove('open');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
                const input = document.getElementById('header-search-input');
                if (input) { input.value = ''; }
                const dropdown = document.getElementById('search-results-dropdown');
                if (dropdown) { dropdown.classList.remove('open'); dropdown.innerHTML = ''; }
                const clearBtn = document.getElementById('search-clear-btn');
                if (clearBtn) clearBtn.style.display = 'none';
            }

            searchToggle.addEventListener('click', openSearch);
            backdrop.addEventListener('click', closeSearch);
            const closeBtn = document.getElementById('search-close-btn');
            if (closeBtn) closeBtn.addEventListener('click', closeSearch);

            // Close with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && searchContainer.classList.contains('open')) {
                    closeSearch();
                }
            });

            // Ctrl+K / Cmd+K shortcut to open search
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    if (searchContainer.classList.contains('open')) {
                        closeSearch();
                    } else {
                        openSearch();
                    }
                }
            });
        }

        // 2. Inject Mobile Search at the top of the mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const mobileSearchItem = document.createElement('li');
            mobileSearchItem.className = 'mobile-search-item';
            mobileSearchItem.innerHTML = `
                <div class="search-input-wrapper">
                    <input type="text" id="mobile-search-input" placeholder="${ui('search_ph_short')}" autocomplete="off">
                    <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <button id="mobile-search-clear-btn" class="search-clear-btn" type="button">&times;</button>
                </div>
                <div id="mobile-search-dropdown" class="search-results-dropdown"></div>
            `;
            // Insert at the beginning of the list
            navLinks.insertBefore(mobileSearchItem, navLinks.firstChild);
        }

        // Setup Event Listeners for both search inputs
        bindSearchInput('header-search-input', 'search-results-dropdown', 'search-clear-btn');
        bindSearchInput('mobile-search-input', 'mobile-search-dropdown', 'mobile-search-clear-btn');

        function locTitle(item) {
            const loc = searchLoc(item);
            return (loc && loc.t) || item.title;
        }

        function renderPopularSuggestions(dropdown) {
            dropdown.innerHTML = '';
            
            const groupTitle = document.createElement('div');
            groupTitle.className = 'search-result-group-title';
            groupTitle.innerHTML = `⚡ ${ui('popular')}`;
            dropdown.appendChild(groupTitle);

            const suggestions = [
                { title: "cali<span class=\"calix-x\">X</span> AutoML Suite", url: "product-calix.html" },
                { title: "ProLine17EC NIR Analyzer", url: "product-proline-17ec.html" },
                { title: "Food & Feed Solutions", url: "industry-food-feed.html" },
                /* "B2B ROI Calculator" -> contact.html#roi KALDIRILDI (07.09.2026):
                   #roi capasi sitede hic yok ve roi-section app.js madde 4 ile gizli. */
                { title: "USTECH StarchQC", url: "product-starchqc.html" },
                { title: "USTECH MasterLine17EC", url: "product-masterline.html" }
            ];

            const container = document.createElement('div');
            container.style.padding = '0.25rem 0';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';

            suggestions.forEach(item => {
                const link = document.createElement('a');
                link.href = resolveSiteUrl(item.url);
                link.className = 'search-result-item';
                link.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                        <span class="search-result-title">🔍 ${locTitle(item)}</span>
                        <span style="font-size:0.65rem; color:var(--text-muted); background:var(--bg-tertiary); padding: 2px 6px; border-radius: 10px;">${ui('popular_badge')}</span>
                    </div>
                `;
                container.appendChild(link);
            });

            dropdown.appendChild(container);
            dropdown.classList.add('open');
        }

        function bindSearchInput(inputId, dropdownId, clearBtnId) {
            const input = document.getElementById(inputId);
            const dropdown = document.getElementById(dropdownId);
            const clearBtn = document.getElementById(clearBtnId);

            if (!input || !dropdown) return;

            let dropdownSelectedIndex = -1;

            const curatedSuggestions = {
                "feed": [
                    { title: "USTECH MasterLine17EC (Product)", url: "product-masterline.html" },
                    { title: "Food & Feed Industry Solutions", url: "industry-food-feed.html" },
                    { title: "Blog: Cattle Feed Waste Optimization", url: "blog-cattle-feed-waste.html" },
                    { title: "Blog: NIR Feed Fiber & Ash Analysis", url: "blog-feed-fiber-ash.html" },
                    { title: "USTECH Tornado+ (Product)", url: "product-tornado.html" }
                ],
                "calix": [
                    { title: "cali<span class=\"calix-x\">X</span> AutoML Suite (Product)", url: "product-calix.html" },
                    { title: "Products Overview", url: "products.html" },
                    { title: "Blog: PLS Regression in cali<span class=\"calix-x\">X</span>", url: "blog-pls-regression-calix.html" },
                    { title: "Blog: Outlier Detection Methods", url: "blog-outlier-detection-mahalanobis.html" }
                ],
                "pharma": [
                    { title: "Chemical & Pharma Industry Solutions", url: "industry-chemical-pharma.html" },
                    { title: "Blog: Blend Uniformity in Pharma", url: "blog-blend-uniformity-pharma.html" },
                    { title: "Blog: Pharma Granulation Moisture", url: "blog-pharma-granulation-moisture.html" },
                    { title: "Blog: Raw Material ID via NIR", url: "blog-pharma-raw-material-id.html" }
                ]
            };

            // Turkish aliases for feed and pharma
            curatedSuggestions["yem"] = curatedSuggestions["feed"];
            curatedSuggestions["ilaç"] = curatedSuggestions["pharma"];
            curatedSuggestions["ilac"] = curatedSuggestions["pharma"];

            function updateDropdownSelection() {
                const items = dropdown.querySelectorAll('.search-result-item');
                items.forEach((item, index) => {
                    if (index === dropdownSelectedIndex) {
                        item.classList.add('selected');
                        // Ensure active item is visible in dropdown scroll
                        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    } else {
                        item.classList.remove('selected');
                    }
                });
            }

            function showSuggestionsForQuery(query, dropdown) {
                dropdown.innerHTML = '';
                
                const groupTitle = document.createElement('div');
                groupTitle.className = 'search-result-group-title';
                groupTitle.textContent = `💡 ${ui('suggested_for')} "${query}"`;  // sorgu HTML olarak basilmasin
                dropdown.appendChild(groupTitle);

                let list = [];
                const cleanQuery = query.toLowerCase().trim();
                
                if (curatedSuggestions[cleanQuery]) {
                    list = curatedSuggestions[cleanQuery];
                } else {
                    // Dynamic fallback: get top 5 search matches
                    list = performSearch(cleanQuery).slice(0, 5).map(item => ({
                        title: item.title,
                        url: item.url
                    }));
                }

                if (list.length === 0) {
                    dropdown.innerHTML = '<div class="search-no-results"></div>';
                    dropdown.firstChild.textContent = `${ui('no_suggestions')} "${query}"`;  // sorgu HTML olarak basilmasin
                    dropdownSelectedIndex = -1;
                    return;
                }

                const container = document.createElement('div');
                container.style.padding = '0.25rem 0';
                container.style.display = 'flex';
                container.style.flexDirection = 'column';

                list.forEach(item => {
                    const link = document.createElement('a');
                    link.href = resolveSiteUrl(item.url);
                    link.className = 'search-result-item';
                    link.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                            <span class="search-result-title">🔍 ${locTitle(item)}</span>
                            <span style="font-size:0.65rem; color:var(--accent-gold); background:rgba(213, 178, 121, 0.1); border: 1px solid rgba(213, 178, 121, 0.2); padding: 2px 6px; border-radius: 10px;">${ui('suggested_badge')}</span>
                        </div>
                    `;
                    container.appendChild(link);
                });

                dropdown.appendChild(container);
                dropdown.classList.add('open');
                
                // Immediately select the first suggestion
                dropdownSelectedIndex = 0;
                updateDropdownSelection();
            }

            input.addEventListener('input', () => {
                const query = input.value.trim().toLowerCase();
                
                if (clearBtn) {
                    clearBtn.style.display = query ? 'flex' : 'none';
                }

                if (!query) {
                    renderPopularSuggestions(dropdown);
                    dropdownSelectedIndex = -1;
                    updateDropdownSelection();
                    return;
                }

                const results = performSearch(query);
                renderResults(results, dropdown);
                dropdownSelectedIndex = -1;
                updateDropdownSelection();
            });

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    input.value = '';
                    clearBtn.style.display = 'none';
                    renderPopularSuggestions(dropdown);
                    dropdownSelectedIndex = -1;
                    updateDropdownSelection();
                    input.focus();
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!input.contains(e.target) && !dropdown.contains(e.target) && (!clearBtn || !clearBtn.contains(e.target))) {
                    dropdown.classList.remove('open');
                }
            });

            // Focus handler to show popular suggestions if empty, or search results if filled
            input.addEventListener('focus', () => {
                const query = input.value.trim().toLowerCase();
                if (query) {
                    const results = performSearch(query);
                    renderResults(results, dropdown);
                } else {
                    renderPopularSuggestions(dropdown);
                }
                dropdownSelectedIndex = -1;
                updateDropdownSelection();
            });

            // Mouseover delegation to sync hover with selection index
            dropdown.addEventListener('mouseover', (e) => {
                const item = e.target.closest('.search-result-item');
                if (item) {
                    const items = Array.from(dropdown.querySelectorAll('.search-result-item'));
                    dropdownSelectedIndex = items.indexOf(item);
                    updateDropdownSelection();
                }
            });

            // Close on ESC, select item with ArrowDown/ArrowUp, navigate with Enter
            input.addEventListener('keydown', (e) => {
                const items = dropdown.querySelectorAll('.search-result-item');
                
                if (dropdown.classList.contains('open') && items.length > 0) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        dropdownSelectedIndex = (dropdownSelectedIndex + 1) % items.length;
                        updateDropdownSelection();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        dropdownSelectedIndex = (dropdownSelectedIndex - 1 + items.length) % items.length;
                        updateDropdownSelection();
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        if (dropdownSelectedIndex >= 0 && dropdownSelectedIndex < items.length) {
                            items[dropdownSelectedIndex].click();
                        } else {
                            // If they just hit Enter on the query, show the custom suggestions list
                            const query = input.value.trim().toLowerCase();
                            if (query) {
                                showSuggestionsForQuery(query, dropdown);
                            }
                        }
                    }
                }

                if (e.key === 'Escape') {
                    dropdown.classList.remove('open');
                    input.blur();
                }
            });
        }

        function performSearch(query) {
            const searchTerms = fold(query).split(/\s+/).filter(t => t.length > 0);
            if (searchTerms.length === 0) return [];

            return searchDb.map(item => {
                let score = 0;
                // 18.08.2026 (Y3): sayfa dilindeki baslik/aciklama/anahtarlar da aranir;
                // fold() aksan ve Turkce harf farkini kaldirir ("İlaç" ~ "ilac").
                const loc = searchLoc(item);
                const titleLower = fold((loc && loc.t) || item.title);
                const keywordsLower = fold(item.keywords + ' ' + (loc ? (loc.k || '') + ' ' + (loc.t || '') + ' ' + (loc.s || '') : ''));
                const snippetLower = fold((loc && loc.s) || item.snippet);
                const categoryLower = fold(item.category + ' ' + ui('cat_' + item.category));

                searchTerms.forEach(term => {
                    if (titleLower.includes(term)) {
                        score += 10;
                        if (titleLower.startsWith(term)) score += 5;
                    }
                    if (keywordsLower.includes(term)) score += 5;
                    if (snippetLower.includes(term)) score += 2;
                    if (categoryLower.includes(term)) score += 3;
                });

                return { item, score };
            })
            .filter(res => res.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(res => res.item);
        }

        function renderResults(results, dropdown) {
            dropdown.innerHTML = '';

            if (results.length === 0) {
                dropdown.innerHTML = '<div class="search-no-results">' + ui('no_results') + '</div>';
                dropdown.classList.add('open');
                return;
            }

            // Group by category
            const grouped = {};
            results.forEach(item => {
                if (!grouped[item.category]) {
                    grouped[item.category] = [];
                }
                grouped[item.category].push(item);
            });

            const categories = ["Products", "Industries", "Knowledge", "General"];
            
            categories.forEach(cat => {
                if (grouped[cat] && grouped[cat].length > 0) {
                    const groupTitle = document.createElement('div');
                    groupTitle.className = 'search-result-group-title';
                    groupTitle.textContent = ui('cat_' + cat);
                    dropdown.appendChild(groupTitle);

                    grouped[cat].forEach(item => {
                        const link = document.createElement('a');
                        link.href = resolveSiteUrl(item.url);
                        link.className = 'search-result-item';
                        const loc = searchLoc(item);
                        link.innerHTML = `
                            <div class="search-result-title">${(loc && loc.t) || item.title}</div>
                            <div class="search-result-snippet">${(loc && loc.s) || item.snippet}</div>
                        `;
                        dropdown.appendChild(link);
                    });
                }
            });

            dropdown.classList.add('open');
        }
    }

    // 11. Live Support System KALDIRILDI (19.08.2026, denetim D7).
    //     Simule sohbet (sahte temsilci + 'Typing...') zaten devre disiydi; ~500 satir
    //     olu kod ve images/support_avatar_generic.webp bagimliligi temizlendi.
    //     Gecmisi: yerel git ve _yedek_20260818/app.js.faz4_oncesi

    // 12. Language Selector Removed (Pure English Website)

    // 13. Infographic Step Controller
    setupInfographic();

    function setupInfographic() {
        const steps = document.querySelectorAll('.infographic-step-card');
        const details = document.querySelectorAll('.infographic-detail-content');

        if (steps.length > 0 && details.length > 0) {
            steps.forEach(step => {
                step.addEventListener('click', () => {
                    const stepNum = step.getAttribute('data-step');

                    // Set active step card
                    steps.forEach(s => s.classList.remove('active'));
                    step.classList.add('active');

                    // Set active detail panel
                    details.forEach(d => {
                        d.classList.remove('active');
                        if (d.id === `infographic-detail-${stepNum}`) {
                            d.classList.add('active');
                        }
                    });
                });
            });
        }
    }

    // 14. Mailto Link Helper (Copies to clipboard & triggers default client)
    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailtoLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('mailto:')) {
                const email = href.replace('mailto:', '');
                navigator.clipboard.writeText(email).then(() => {
                    showNotification(`Email copied to clipboard: ${email}`);
                }).catch(err => {
                    console.error('Failed to copy email: ', err);
                });
            }
        });
    });

    // 15. Contact Page Tabs Handler
    const contactTabs = document.querySelectorAll('.contact-tab-btn');
    if (contactTabs.length > 0) {
        const salesFields = document.querySelectorAll('.sales-field');
        const supportFields = document.querySelectorAll('.support-field');
        const generalFields = document.querySelectorAll('.general-field');
        const formTypeInput = document.getElementById('form-type');
        const messageLabel = document.getElementById('message-label');
        const messageTextarea = document.getElementById('form-message');

        contactTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;

                // Update active tab buttons styling
                contactTabs.forEach(b => {
                    b.classList.remove('active');
                    b.style.color = 'var(--text-secondary)';
                    b.style.borderBottomColor = 'transparent';
                    b.style.fontWeight = '500';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--accent-black)';
                btn.style.borderBottomColor = 'var(--accent-black)';
                btn.style.fontWeight = '600';

                // Update hidden input type value
                if (formTypeInput) {
                    formTypeInput.value = target;
                }

                // Show/hide fields based on selected tab
                if (target === 'sales') {
                    salesFields.forEach(f => f.style.display = 'block');
                    supportFields.forEach(f => f.style.display = 'none');
                    generalFields.forEach(f => f.style.display = 'none');
                    if (messageLabel) messageLabel.textContent = ui('form_sales_lbl');
                    if (messageTextarea) messageTextarea.placeholder = ui('form_sales_ph');
                } else if (target === 'support') {
                    salesFields.forEach(f => f.style.display = 'none');
                    supportFields.forEach(f => f.style.display = 'block');
                    generalFields.forEach(f => f.style.display = 'none');
                    if (messageLabel) messageLabel.textContent = ui('form_support_lbl');
                    if (messageTextarea) messageTextarea.placeholder = ui('form_support_ph');
                } else if (target === 'general') {
                    salesFields.forEach(f => f.style.display = 'none');
                    supportFields.forEach(f => f.style.display = 'none');
                    generalFields.forEach(f => f.style.display = 'block');
                    if (messageLabel) messageLabel.textContent = ui('form_general_lbl');
                    if (messageTextarea) messageTextarea.placeholder = ui('form_general_ph');
                }
            });
        });
    }

    // 15.4. Urun sayfalarindaki "Teklif Isteyin" baglantilari contact.html?product=<kod> tasir;
    //      03.11.2026'ya kadar bu parametreyi okuyan kod yoktu, form bos aciliyordu.
    const productSelect = document.getElementById('form-product');
    if (productSelect) {
        let productSlug = '';
        try { productSlug = (new URLSearchParams(window.location.search).get('product') || '').toLowerCase(); } catch (e) {}
        const PRODUCT_BY_SLUG = {
            'calix': 'caliX', 'prochem': 'ProChem', 'masterline': 'MasterLine17EC',
            'proline-17ec': 'ProLine 17EC', 'proline-17ecs': 'ProLine 17ECS',
            'proline-2550': 'ProLine 2550', 'proline-2550-essential': 'ProLine 2550', 'proline-2550-advanced': 'ProLine 2550',
            'starchqc': 'StarchQC', 'tornado': 'Tornado+'
        };
        const productValue = PRODUCT_BY_SLUG[productSlug];
        if (productValue && Array.from(productSelect.options).some(o => o.value === productValue)) {
            productSelect.value = productValue;
        }
    }

    // 15.5. AJAX Form Submission via Web3Forms
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = leadForm.querySelector('button[type="submit"]');

            // Hata mesaji: alert() yerine formun icinde, ekran okuyucuya duyurulan kutu
            function showFormError(msg) {
                let box = leadForm.querySelector('.form-error-msg');
                if (!box) {
                    if (!msg) return;
                    box = document.createElement('div');
                    box.className = 'form-error-msg';
                    box.setAttribute('role', 'alert');
                    box.style.cssText = 'margin-top: 1rem; padding: 0.75rem 1rem; border: 1px solid #c0392b; border-radius: 8px; color: #a5281b; background: #fdf0ee; font-size: 0.9rem;';
                    submitBtn.insertAdjacentElement('afterend', box);
                }
                box.textContent = msg;
                box.style.display = msg ? 'block' : 'none';
            }
            const originalBtnText = submitBtn.textContent;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.textContent = ui('form_sending');
            showFormError('');

            const formData = new FormData(leadForm);
            
            // =========================================================================
            // Web3Forms Configuration:
            // Key configured for info@ustechinnovations.com
            // =========================================================================
            const web3FormsAccessKey = "2791c5d7-ecdd-4b3e-90fa-f6e33964a84d"; 
            
            formData.append("access_key", web3FormsAccessKey);

            // Convert to JSON object for sending
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status === 200) {
                    // Success modal trigger
                    const successModal = document.getElementById('contact-success-modal');
                    if (successModal) {
                        successModal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                    leadForm.reset();
                } else {
                    console.log(res);
                    showFormError(ui('form_failed') + ' ' + (res.message || ui('form_error')));
                }
            })
            .catch(error => {
                console.log(error);
                showFormError(ui('form_error'));
            })
            .finally(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    // 16. Draggable Blogs & Product Showcase Sliders
    setupAllSliders();

    function setupAllSliders() {
        const blogContainer = document.getElementById('home-blog-slider-container');
        const blogPrevBtn = document.getElementById('blog-slider-prev');
        const blogNextBtn = document.getElementById('blog-slider-next');

        const hwContainer = document.getElementById('showcase-hardware-container');
        const swContainer = document.getElementById('showcase-software-container');
        const showcasePrevBtn = document.getElementById('showcase-slider-prev');
        const showcaseNextBtn = document.getElementById('showcase-slider-next');

        // Helper: setup dragging/swiping
        function makeContainerDraggable(container) {
            if (!container) return;
            let isDown = false;
            let startX;
            let scrollLeft;
            let isDragging = false;
            let startPageX = 0;
            let startPageY = 0;

            container.addEventListener('mousedown', (e) => {
                isDown = true;
                container.classList.add('active');
                container.style.scrollBehavior = 'auto';
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                isDragging = false;
                startPageX = e.pageX;
                startPageY = e.pageY;
            });

            container.addEventListener('mouseleave', () => {
                isDown = false;
                container.classList.remove('active');
            });

            container.addEventListener('mouseup', () => {
                isDown = false;
                container.classList.remove('active');
            });

            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 1.5;
                container.scrollLeft = scrollLeft - walk;

                const diffX = Math.abs(e.pageX - startPageX);
                const diffY = Math.abs(e.pageY - startPageY);
                if (diffX > 10 || diffY > 10) {
                    isDragging = true;
                }
            });

            container.addEventListener('touchstart', (e) => {
                isDown = true;
                container.style.scrollBehavior = 'auto';
                const touch = e.touches[0];
                startX = touch.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                isDragging = false;
                startPageX = touch.pageX;
                startPageY = touch.pageY;
            }, { passive: true });

            container.addEventListener('touchend', () => {
                isDown = false;
            });

            container.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                const touch = e.touches[0];
                const x = touch.pageX - container.offsetLeft;
                const walk = (x - startX) * 1.5;
                container.scrollLeft = scrollLeft - walk;

                const diffX = Math.abs(touch.pageX - startPageX);
                const diffY = Math.abs(touch.pageY - startPageY);
                if (diffX > 10 || diffY > 10) {
                    isDragging = true;
                }
            }, { passive: true });

            container.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }

        // 1. Blogs Slider Setup
        makeContainerDraggable(blogContainer);
        if (blogContainer && blogPrevBtn && blogNextBtn) {
            const getCardWidth = () => {
                const firstCard = blogContainer.querySelector('.blog-slider-card');
                return firstCard ? (firstCard.offsetWidth + 32) : 412;
            };

            blogPrevBtn.addEventListener('click', () => {
                blogContainer.style.scrollBehavior = 'smooth';
                blogContainer.scrollLeft -= getCardWidth();
            });

            blogNextBtn.addEventListener('click', () => {
                blogContainer.style.scrollBehavior = 'smooth';
                blogContainer.scrollLeft += getCardWidth();
            });

            const toggleBlogButtons = () => {
                const maxScroll = blogContainer.scrollWidth - blogContainer.clientWidth;
                blogPrevBtn.style.opacity = blogContainer.scrollLeft <= 5 ? '0.4' : '1';
                blogPrevBtn.style.pointerEvents = blogContainer.scrollLeft <= 5 ? 'none' : 'auto';
                blogNextBtn.style.opacity = blogContainer.scrollLeft >= maxScroll - 5 ? '0.4' : '1';
                blogNextBtn.style.pointerEvents = blogContainer.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
            };

            blogContainer.addEventListener('scroll', toggleBlogButtons);
            setTimeout(toggleBlogButtons, 100);
            window.addEventListener('resize', toggleBlogButtons);

            // Dynamic Blog Filtering and Sorting Setup
            const blogTrack = blogContainer.querySelector('.blog-slider-track');
            const blogCards = Array.from(blogTrack.querySelectorAll('.blog-slider-card'));
            const filterBtns = document.querySelectorAll('.blog-filter-btn');
            const sortSelect = document.getElementById('blog-sort-select');

            function filterAndSortBlogs() {
                const activeFilterBtn = document.querySelector('.blog-filter-btn.active');
                const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
                const activeSort = sortSelect ? sortSelect.value : 'date-newest';

                // Filter cards visibility
                let visibleCards = [];
                blogCards.forEach(card => {
                    const industry = card.getAttribute('data-industry');
                    const matchesFilter = activeFilter === 'all' || industry === activeFilter;

                    if (matchesFilter) {
                        card.style.display = 'flex';
                        visibleCards.push(card);
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Sort visible cards
                visibleCards.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return activeSort === 'date-newest' ? dateB - dateA : dateA - dateB;
                });

                // Re-append sorted visible cards to track
                visibleCards.forEach(card => {
                    blogTrack.appendChild(card);
                });

                // Reset scroll position and recalculate buttons
                blogContainer.style.scrollBehavior = 'auto';
                blogContainer.scrollLeft = 0;
                setTimeout(toggleBlogButtons, 50);
            }

            // Click event for filter pills
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => {
                        b.classList.remove('active');
                        b.style.background = 'transparent';
                        b.style.borderColor = 'var(--border-color)';
                        b.style.color = 'var(--text-secondary)';
                    });
                    btn.classList.add('active');
                    btn.style.background = 'var(--accent-black)';
                    btn.style.borderColor = 'var(--accent-black)';
                    btn.style.color = '#ffffff';

                    filterAndSortBlogs();
                });
            });

            // Change event for sort dropdown
            if (sortSelect) {
                sortSelect.addEventListener('change', filterAndSortBlogs);
            }

            // Run initial filter and sort (default to date-newest on page load)
            filterAndSortBlogs();
        }

        // 2. Showcase Sliders Drag Setup
        makeContainerDraggable(hwContainer);
        makeContainerDraggable(swContainer);

        // 3. Shared Showcase Navigation Buttons Setup
        if (showcasePrevBtn && showcaseNextBtn) {
            const getShowcaseCardWidth = (container) => {
                const firstCard = container.querySelector('.blog-slider-card');
                return firstCard ? (firstCard.offsetWidth + 32) : 412;
            };

            showcasePrevBtn.addEventListener('click', () => {
                const activeContainer = document.querySelector('.home-blog-slider-container.active-panel');
                if (activeContainer) {
                    activeContainer.style.scrollBehavior = 'smooth';
                    activeContainer.scrollLeft -= getShowcaseCardWidth(activeContainer);
                }
            });

            showcaseNextBtn.addEventListener('click', () => {
                const activeContainer = document.querySelector('.home-blog-slider-container.active-panel');
                if (activeContainer) {
                    activeContainer.style.scrollBehavior = 'smooth';
                    activeContainer.scrollLeft += getShowcaseCardWidth(activeContainer);
                }
            });

            // Toggle shared buttons opacity based on active container scroll position
            window.updateShowcaseButtonsState = function() {
                const activeContainer = document.querySelector('.home-blog-slider-container.active-panel');
                if (!activeContainer) return;
                const maxScroll = activeContainer.scrollWidth - activeContainer.clientWidth;
                
                showcasePrevBtn.style.opacity = activeContainer.scrollLeft <= 5 ? '0.4' : '1';
                showcasePrevBtn.style.pointerEvents = activeContainer.scrollLeft <= 5 ? 'none' : 'auto';
                showcaseNextBtn.style.opacity = activeContainer.scrollLeft >= maxScroll - 5 ? '0.4' : '1';
                showcaseNextBtn.style.pointerEvents = activeContainer.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
            };

            if (hwContainer) hwContainer.addEventListener('scroll', window.updateShowcaseButtonsState);
            if (swContainer) swContainer.addEventListener('scroll', window.updateShowcaseButtonsState);
            
            setTimeout(window.updateShowcaseButtonsState, 100);
            window.addEventListener('resize', window.updateShowcaseButtonsState);
        }

        // Tab switcher window exposure
        window.switchShowcaseTab = function(tab) {
            const hwContainer = document.getElementById('showcase-hardware-container');
            const swContainer = document.getElementById('showcase-software-container');
            const tabButtons = document.querySelectorAll('.showcase-tab-btn');
            
            if (tab === 'hardware') {
                if (hwContainer) hwContainer.classList.add('active-panel');
                if (swContainer) swContainer.classList.remove('active-panel');
                tabButtons.forEach(btn => {
                    if (btn.getAttribute('onclick').includes('hardware')) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            } else {
                if (hwContainer) hwContainer.classList.remove('active-panel');
                if (swContainer) swContainer.classList.add('active-panel');
                tabButtons.forEach(btn => {
                    if (btn.getAttribute('onclick').includes('software')) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }

            // Sync shared nav buttons opacity for the new active panel
            if (window.updateShowcaseButtonsState) {
                window.updateShowcaseButtonsState();
            }
        };
    }

    // ==========================================
    // 17. Dynamic Read Next Recommendations
    // ==========================================
    setupReadNextRecommendations();

    function setupReadNextRecommendations() {
        const readNextHeader = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.trim() === 'Read Next');
        if (!readNextHeader) return;

        const gridContainer = readNextHeader.nextElementSibling;
        if (!gridContainer || !gridContainer.classList.contains('grid')) return;

        // Master blog database
        const BLOG_POSTS = [
            {
            url: "blog-calibration-transfer.html",
            title: "Calibration Transfer Between NIR Spectrometers: Methods and Feasibility",
            image: "images/blog_mems_sensor.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "Why a NIR calibration built on one spectrometer rarely runs unchanged on another, which standardisation and model-adjustment methods the literature describes, and how transfer feasibility is assessed for an instrument family."
            },
            {
            url: "blog-cattle-feed-waste.html",
            title: "Reducing Ingredient Waste in Cattle Feed Production",
            image: "images/blog_cattle_feed.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "Why cattle feed is over-formulated against ingredient variability, what the literature says about where that variability comes from, and how NIR at intake and at the mixer narrows the margin."
            },
            {
            url: "blog-pls-regression-calix.html",
            title: "Introduction to PLS Regression in caliX Suite",
            image: "images/blog_pls_regression.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "A practitioner's walk through a PLS calibration: how the data are split, how the pre-processing and the number of latent variables are chosen by validation, which diagnostics to read, and how the model is kept alive in production."
            },
            {
            url: "blog-hydroxyl-value-polyol.html",
            title: "Real-Time Hydroxyl Value Monitoring in Polyol Production",
            image: "images/blog_polyol_reactors.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why the hydroxyl number is the end-point variable in polyol production, what the titration reference methods and the NIR standards require, and why temperature is the main obstacle for an in-reactor calibration."
            },
            {
            url: "blog-moisture-milk-powder.html",
            title: "Standardizing Moisture in Milk Powder Spray Drying",
            image: "images/blog_milk_powder.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "Why the outlet moisture of a milk-powder spray dryer decides stickiness, caking, shelf life and yield, which variables the operator can move, and how an inline NIR moisture value feeds the control loop."
            },
            {
            url: "blog-savitzky-golay-filtering.html",
            title: "Understanding Savitzky-Golay Filtering in Preprocessing",
            image: "images/blog_spectral_math.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "What the Savitzky-Golay filter actually does to a spectrum, why derivatives remove baselines, and how window length and polynomial order should be chosen, with the original and follow-up literature."
            },
            {
            url: "blog-blend-uniformity-pharma.html",
            title: "Blend Uniformity Verification in Active Pharmaceutical Blending",
            image: "images/blog_pharma_blending.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why blend uniformity is a regulated in-process attribute, what thief sampling can and cannot tell you, and what the literature shows about in-line NIR monitoring of powder blending as a PAT tool."
            },
            {
            url: "blog-mems-durability-industrial.html",
            title: "MEMS Comb-Drive Mechanical Durability in Industrial Environments",
            image: "images/blog_mems_durability.webp",
            industry: "general-tech",
            type: "ARTICLE",
            snippet: "What the reliability literature says about silicon springs and comb drives under shock, vibration, temperature cycling and fatigue, and what the military and IEC environmental test methods actually specify."
            },
            {
            url: "blog-pca-classification-models.html",
            title: "Developing Robust Chemometric Classification Models via PCA",
            image: "images/blog_pca_chemometrics.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "How PCA scores, loadings and residuals become a classification model, where the Hotelling and Q limits come from, why class-modelling differs from PLS-DA, and how regulators expect a qualitative NIR model to be validated."
            },
            {
            url: "blog-starch-extraction-milling.html",
            title: "Optimizing Starch Extraction Efficiency in Wet Corn Milling",
            image: "images/blog_starch_milling.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "Where starch is lost in a corn wet mill, how separation performance is measured, and what published work says spectroscopy can and cannot monitor in slurry streams."
            },
            {
            url: "blog-fiber-interface-reactors.html",
            title: "Optical Fiber Interface Designs for Corrosive Chemical Reactors",
            image: "images/blog_fiber_reactors.webp",
            industry: "chemical-pharma",
            type: "GUIDE",
            snippet: "How probe geometry, the silica fibre, the sapphire window, the wetted alloy and the seal decide what an NIR spectrometer actually sees inside a corrosive or hot reactor, with the literature behind each choice."
            },
            {
            url: "blog-opc-ua-dosing-valves.html",
            title: "Closing the Dosing Loop on Analyzer Results with OPC UA",
            image: "images/blog_opc_ua_plc.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "What an analyzer result needs to carry over OPC UA before a PLC may act on it, how dead time and sampling interval shape the PID loop, and where the safety interlocks must sit, with the standards behind each point."
            },
            {
            url: "blog-milk-powder-analysis.html",
            title: "Moisture and Protein Analysis in Milk Powder by NIR Spectroscopy",
            image: "images/blog_milk_spray_drying.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "How moisture, protein, fat and lactose in milk powder are determined by the reference methods, what published NIR calibrations report for them, and how an at-line or inline NIR step is calibrated and validated."
            },
            {
            url: "blog-ground-beef-fat.html",
            title: "Real-Time Fat Analysis in Ground Beef Processing",
            image: "images/blog_ground_beef.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "Why fat content is the controlling specification for ground beef, what the reference methods involve, and what peer-reviewed on-line NIR studies at grinder outlets and on conveyors actually report."
            },
            {
            url: "blog-feed-fiber-ash.html",
            title: "Crude Fiber and Ash Content Determination in Feed Rations by NIR Spectroscopy",
            image: "images/blog_feed_analysis.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "How crude fibre and ash are determined by the reference methods, what published NIR calibrations achieve for them in compound feed, and how an at-line step fits into a mill's quality routine."
            },
            {
            url: "blog-semolina-starch-gluten.html",
            title: "Starch Damage and Gluten Quality in Durum Wheat Semolina",
            image: "images/blog_semolina_gluten.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "What starch damage, wet gluten and gluten index mean for pasta quality, how the reference methods work, and what published NIR studies can and cannot predict in durum semolina."
            },
            {
            url: "blog-polymerization-hydroxyl.html",
            title: "Hydroxyl Value Monitoring in Polymerization Processes",
            image: "images/blog_hydroxyl_value.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "What hydroxyl value and acid value tell you about a step-growth polyester batch, how the titration reference methods work, why the O–H bands make the reaction visible to NIR, and what in-reactor studies have shown."
            },
            {
            url: "blog-olive-oil-acidity.html",
            title: "Free Fatty Acidity (FFA) Monitoring in Olive Oil Processing",
            image: "images/blog_olive_oil_acidity.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "How free acidity and peroxide value define olive oil grades, how they arise before and in the mill, what published NIR calibrations achieve for them, and where a measurement point fits."
            },
            {
            url: "blog-bioreactor-cell-culture.html",
            title: "Bioreactor Feeding Optimization in Mammalian Cell Culture",
            image: "images/blog_bioreactor_cell.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why glucose and lactate control matters in CHO fed-batch culture, why NIR struggles in aqueous culture media, and what the literature shows for in-situ Raman and mid-infrared feed control."
            },
            {
            url: "blog-milk-adulteration-receiving.html",
            title: "Rapid Adulteration Detection in Raw Milk Receiving",
            image: "images/blog_milk_adulteration.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "What peer-reviewed studies show infrared spectroscopy can detect in raw milk, and how a screen-then-confirm step fits into a dairy intake line."
            },
            {
            url: "blog-outlier-detection-mahalanobis.html",
            title: "Chemometric Outlier Detection: Mahalanobis Distance vs. Hotelling's T²",
            image: "images/blog_outlier_detection.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "How Mahalanobis distance, Hotelling's T-squared, leverage and Q residuals tell a process analyzer whether a spectrum belongs to its calibration, how their limits are set, and why one statistic carries several names in software."
            },
            {
            url: "blog-wavelength-selection-ipls.html",
            title: "Wavelength Selection & Feature Engineering for NIR Spectral Models",
            image: "images/blog_wavelength_selection.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "Why restricting a NIR calibration to selected wavelengths can help, how iPLS, genetic algorithms, UVE, CARS, VIP and jackknifing choose them, and why the selection must be validated independently."
            },
            {
            url: "blog-soybean-crush-yield.html",
            title: "Optimizing Oil and Protein Extraction in Soybean Crush Plants",
            image: "images/blog_feed_analysis.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "How solvent extraction and the desolventiser-toaster set the oil, moisture and protein quality of soybean meal, which reference methods define them, and where NIR measurement fits."
            },
            {
            url: "blog-petfood-extrusion-moisture.html",
            title: "Moisture and Fat Standardization in Pet Food Extrusion",
            image: "images/blog_cattle_feed.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "Why kibble moisture at the dryer exit and fat at the coater decide shelf life and label compliance, and what published NIR studies on extruded pet food actually show."
            },
            {
            url: "blog-corn-gluten-dryer.html",
            title: "Real-Time Moisture Control in Corn Gluten Feed Dryers",
            image: "images/blog_starch_milling.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "Why the gluten feed dryer is one of the largest energy users in a corn wet mill, what over-drying and under-drying cost, and how on-line NIR moisture measurement can close the dryer control loop."
            },
            {
            url: "blog-flour-ash-milling.html",
            title: "Continuous Ash and Protein Monitoring in Wheat Flour Milling",
            image: "images/blog_semolina_gluten.webp",
            industry: "food-feed",
            type: "ARTICLE",
            snippet: "Why ash tracks bran in flour streams, what the incineration and Kjeldahl reference methods involve, what published NIR work shows for ash and protein, and how stream monitoring fits into a mill."
            },
            {
            url: "blog-cheese-yield-prediction.html",
            title: "Evaluating Cheese Yield Prediction Models",
            image: "images/blog_mems_sensor.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "How cheese yield is predicted from milk fat and protein, what infrared spectroscopy adds at milk intake and in the vat, and how a yield model is built and validated."
            },
            {
            url: "blog-liquid-milk-standardization.html",
            title: "Optimizing Fat and Protein Standardization in Liquid Milk",
            image: "images/blog_milk_spray_drying.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "How in-line fat standardisation of drinking milk works, where density-based cream control reaches its limits, and what published work shows for in-line NIR measurement of fat and protein."
            },
            {
            url: "blog-whey-permeate-evaporator.html",
            title: "Total Solids Control in Whey Permeate Evaporators",
            image: "images/blog_milk_powder.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "Why the solids content leaving a whey or permeate evaporator matters for fouling, lactose crystallisation and drying, and how it can be measured and controlled."
            },
            {
            url: "blog-butter-fat-moisture.html",
            title: "Inline Fat and Moisture Standardization in Continuous Butter Making",
            image: "images/blog_milk_spray_drying.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "What the butter standards fix for fat, water and salt, where a continuous buttermaker sets them, and what published inline-sensor and NIR studies show about controlling them at the line."
            },
            {
            url: "blog-yogurt-fermentation-lactic.html",
            title: "Monitoring Lactic Acid and pH in Yogurt Fermentation",
            image: "images/blog_milk_adulteration.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "Why the end-point of yogurt fermentation matters, how pH and titratable acidity are measured, and what in-line NIR studies report about following acidification."
            },
            {
            url: "blog-cheese-moisture-milling.html",
            title: "Moisture and Salt Monitoring in Cheddar Cheese Milling",
            image: "images/blog_mems_sensor.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "Why the salt-in-moisture ratio fixed at the salting belt governs Cheddar ripening, how moisture and salt are determined by the reference methods, and what published NIR studies show for cheese."
            },
            {
            url: "blog-dairy-receiving-total-solids.html",
            title: "Incoming Milk Fat and Total Solids Grading at Receiving Docks",
            image: "images/blog_milk_adulteration.webp",
            industry: "dairy",
            type: "ARTICLE",
            snippet: "Why raw milk is paid for by its fat, protein and solids, how the reference methods and mid-infrared analysers establish those values, and what published NIR studies show for raw-milk composition."
            },
            {
            url: "blog-pharma-granulation-moisture.html",
            title: "Moisture Monitoring in Fluid Bed Granulation",
            image: "images/blog_pharma_blending.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why residual moisture is the critical attribute of a fluid-bed granulation, what the reference methods measure, what in-line NIR studies have shown, and why sampling, probe fouling and temperature decide whether the method holds up."
            },
            {
            url: "blog-solvent-distillation-purity.html",
            title: "Inline Solvent Purity Monitoring in Chemical Distillation Columns",
            image: "images/blog_fiber_reactors.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why distillation columns are usually run on temperature, what near-infrared spectroscopy adds for solvent composition and water content, and how such an analyzer is calibrated and validated."
            },
            {
            url: "blog-packaging-polymer-density.html",
            title: "Density and Crystallinity Grading of Polyethylene Packaging",
            image: "images/blog_polyol_reactors.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "How density and crystallinity of LDPE, LLDPE and HDPE are determined by the reference methods, what the near-infrared spectrum of polyethylene actually encodes, and what published NIR density calibrations have achieved on pellets, film and melt."
            },
            {
            url: "blog-pharma-raw-material-id.html",
            title: "Incoming Raw Material Identification in Pharmaceutical Warehouses",
            image: "images/blog_pharma_blending.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why GMP expects an identity test on every container of starting material, what the EMA and the pharmacopoeias require of a qualitative NIR method, and how spectral libraries and through-container measurement are built and validated."
            },
            {
            url: "blog-chemical-alkyd-resin.html",
            title: "Acid Value and Viscosity Tracking in Alkyd Resin Cooking",
            image: "images/blog_polyol_reactors.webp",
            industry: "chemical-pharma",
            type: "ARTICLE",
            snippet: "Why alkyd cooks are followed by acid value and viscosity, what the titration and viscosity reference methods involve, why the gel point makes timing critical, and what published in-line NIR studies show."
            },
            {
            url: "blog-msc-snv-preprocessing.html",
            title: "Multiplicative Scatter Correction and Standard Normal Variate Preprocessing",
            image: "images/blog_spectral_math.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "What multiplicative scatter correction and the standard normal variate transform do to a diffuse-reflectance NIR spectrum, how the two are related, and when each is the better choice."
            },
            {
            url: "blog-spectrometer-reference-bg.html",
            title: "Standardizing Reference Background Measurement Intervals in Process Spectroscopy",
            image: "images/blog_mems_durability.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "Why a process NIR spectrometer needs reference measurements, which effects make its response drift, and how performance tests and routine checks reveal drift before it reaches the results."
            }
        ];

        // Get current filename from URL path
        const currentPath = window.location.pathname;
        const currentFilename = currentPath.split('/').pop() || '';

        // Find the current blog post entry
        const currentBlog = BLOG_POSTS.find(post => post.url === currentFilename);
        if (!currentBlog) return;

        const currentIndustry = currentBlog.industry;

        // Filter out current post
        const otherPosts = BLOG_POSTS.filter(post => post.url !== currentFilename);

        // Prioritize same-industry posts
        let selectedRecommendations = otherPosts.filter(post => post.industry === currentIndustry);

        // Fallback to general-tech if we have fewer than 4 posts
        if (selectedRecommendations.length < 4) {
            const generalFallbacks = otherPosts.filter(
                post => post.industry === 'general-tech' && !selectedRecommendations.includes(post)
            );
            selectedRecommendations = selectedRecommendations.concat(generalFallbacks).slice(0, 4);
        }

        // Final safety fallback to any other industry if we still don't have 4 posts
        if (selectedRecommendations.length < 4) {
            const remainingNeeded = 4 - selectedRecommendations.length;
            const extraFallbacks = otherPosts.filter(post => !selectedRecommendations.includes(post));
            selectedRecommendations = selectedRecommendations.concat(extraFallbacks.slice(0, remainingNeeded));
        }

        // Limit to exactly 4 items
        selectedRecommendations = selectedRecommendations.slice(0, 4);

        // Render recommendations
        gridContainer.className = 'grid grid-4';
        gridContainer.innerHTML = '';

        selectedRecommendations.forEach(post => {
            let btnText = 'Read Article';
            if (post.type === 'WHITE PAPER') btnText = 'Read White Paper';
            else if (post.type === 'GUIDE') btnText = 'Read Guide';
            else if (post.type === 'CASE STUDY') btnText = 'Read Case Study';

            gridContainer.innerHTML += `
                <div class="card" onclick="window.location.href='${post.url}';" style="cursor: pointer; padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 100%;">
                    <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid var(--border-color);">
                    <div style="padding: 1.75rem; display: flex; flex-direction: column; flex-grow: 1;">
                        <span style="font-size: 0.75rem; font-weight: bold; color: var(--accent-grey); margin-bottom: 0.5rem; display: block;">${post.type}</span>
                        <h4 style="font-size: 1.15rem; margin-bottom: 0.75rem; line-height: 1.3; margin-top: 0;"><a href="${post.url}" style="color: var(--accent-black); text-decoration: none;">${post.title}</a></h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; flex-grow: 1; line-height: 1.5;">${post.snippet}</p>
                        <a href="${post.url}" class="btn-text" style="font-size: 0.85rem; align-self: flex-start; margin-top: auto;">${btnText}</a>
                    </div>
                </div>
            `;
        });

        // Add a "Browse All Publications" button below the grid
        const parentElement = gridContainer.parentElement;
        let browseAllBtn = parentElement.querySelector('.read-next-browse-btn');
        if (!browseAllBtn) {
            browseAllBtn = document.createElement('div');
            browseAllBtn.className = 'read-next-browse-btn';
            browseAllBtn.style.marginTop = '2.5rem';
            browseAllBtn.innerHTML = `
                <a href="knowledge-blogs.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    Browse All Publications
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            `;
            gridContainer.after(browseAllBtn);
        }
    }
});


/* ==========================================================================
   Laser Animation Logic for Hero Section
   ========================================================================= */
function initLaserAnimation() {
    const lens = document.getElementById('lens-point');
    const pathScatter = document.getElementById('path-scatter');
    const pathGlow = document.getElementById('path-glow');
    const pathCore = document.getElementById('path-core');
    
    // Check if we are on the page with the laser
    if (!lens || !pathScatter) return;

    function updateLaserPath() {
        const rect = lens.getBoundingClientRect();
        
        // Exact center of the diode
        const startX = rect.left + (rect.width / 2);
        const startY = rect.top + (rect.height / 2);
        
        const w = window.innerWidth;
        const h = window.innerHeight;

        // Mathematical alignment: The device is rotated 55 degrees for steeper bounces.
        const angleDeg = 55;
        const slope = Math.tan(angleDeg * Math.PI / 180);

        let currentX = startX;
        let currentY = startY;
        let goingDown = true;
        
        let pathString = "M  + startX +   + startY + ";
        pathString = pathString.replace(/"/g, '');
        
        const sparks = [
            document.getElementById('spark-1'), 
            document.getElementById('spark-2'), 
            document.getElementById('spark-3'),
            document.getElementById('spark-4'),
            document.getElementById('spark-5')
        ];
        
        // Move all sparks off-screen initially
        sparks.forEach(s => { if(s) { s.style.left = '-1000px'; s.style.top = '-1000px'; } });
        let sparkIndex = 0;

        // Generate bounces mathematically until the beam leaves the screen width
        while(currentX < w + 500) {
            let targetY = goingDown ? (h - 20) : 20;
            let dy = Math.abs(targetY - currentY);
            let dx = dy / slope;
            
            currentX += dx;
            currentY = targetY;
            
            pathString += " L  + currentX +   + currentY + ";
            pathString = pathString.replace(/"/g, '');
            
            // Position spark at the bounce point
            if (sparkIndex < sparks.length && currentX < w + 100) {
                if (sparks[sparkIndex]) {
                    sparks[sparkIndex].style.left = currentX + 'px';
                    sparks[sparkIndex].style.top = currentY + 'px';
                }
                sparkIndex++;
            }
            
            goingDown = !goingDown;
        }

        pathScatter.setAttribute('d', pathString);
        pathGlow.setAttribute('d', pathString);
        pathCore.setAttribute('d', pathString);
    }

    window.addEventListener('resize', updateLaserPath);
    // Initial draw
    setTimeout(updateLaserPath, 100);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initLaserAnimation);

// =====================================================================
//  Talk to a Specialist — Floating Side Widget (auto-injected)
// =====================================================================
(function() {
    // Don't inject if already present
    if (document.querySelector('.specialist-tab')) return;

    // Phone icon SVG
    const phoneSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';

    // Email icon SVG
    const emailSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';

    // Chat/headset icon SVG
    const headsetSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>';

    // Tab icon (headset for tab button)
    const tabIconSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>';

    // Close icon
    const closeSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'specialist-backdrop';
    document.body.appendChild(backdrop);

    // Create side tab
    const tab = document.createElement('button');
    tab.className = 'specialist-tab';
    tab.setAttribute('aria-label', ui('spec_tab'));
    tab.innerHTML = tabIconSVG + ' ' + ui('spec_tab');
    document.body.appendChild(tab);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'specialist-panel';
    panel.innerHTML = `
        <div class="specialist-panel-header">
            <h4>${ui('spec_tab')}</h4>
            <button class="specialist-panel-close" aria-label="${ui('spec_close')}">${closeSVG}</button>
        </div>
        <div class="specialist-panel-body">
            <p>${ui('spec_text')}</p>

            <a href="mailto:info@ustechinnovations.com" class="specialist-contact-item">
                <span class="specialist-contact-icon">${emailSVG}</span>
                <span>
                    <span class="specialist-contact-label">${ui('spec_email')}</span>
                    <span class="specialist-contact-value">info@ustechinnovations.com</span>
                </span>
            </a>

            <a href="https://www.linkedin.com/company/ustech-innovations-llc/about/" target="_blank" rel="noopener noreferrer" class="specialist-contact-item">
                <span class="specialist-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z"/></svg>
                </span>
                <span>
                    <span class="specialist-contact-label">LinkedIn</span>
                    <span class="specialist-contact-value">USTECH Innovations</span>
                </span>
            </a>

            <a href="contact.html" class="specialist-panel-cta">
                ${headsetSVG}&nbsp;&nbsp;${ui('spec_cta')}
            </a>
        </div>
    `;
    document.body.appendChild(panel);

    // Open / Close logic
    function openPanel() {
        panel.classList.add('open');
        tab.classList.add('hidden');
        backdrop.classList.add('active');
    }

    function closePanel() {
        panel.classList.remove('open');
        tab.classList.remove('hidden');
        backdrop.classList.remove('active');
    }

    tab.addEventListener('click', openPanel);
    panel.querySelector('.specialist-panel-close').addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            closePanel();
        }
    });
})();

// =====================================================================
//  Global Scroll-Triggered CTA Slide-in Widget (auto-injected)
// =====================================================================
(function() {
    function initScrollCTA() {
        // Don't show on contact page or if user dismissed in this session
        if (window.location.pathname.indexOf('contact.html') !== -1) return;
        if (sessionStorage.getItem('ustech_scroll_cta_closed') === '1') return;
        if (document.querySelector('.ustech-scroll-cta')) return;

        var lang = (typeof detectCurrentLang === 'function') ? detectCurrentLang() : 'en';
        var contactHref = 'contact.html';
        if (lang !== 'en' && window.location.pathname.indexOf('/' + lang + '/') === -1) {
            contactHref = lang + '/contact.html';
        }

        var ctaEl = document.createElement('div');
        ctaEl.className = 'ustech-scroll-cta';
        ctaEl.setAttribute('role', 'complementary');
        ctaEl.setAttribute('aria-label', ui('cta_title'));

        ctaEl.innerHTML = `
            <button class="ustech-scroll-cta-close" aria-label="${ui('spec_close')}">&times;</button>
            <div class="ustech-scroll-cta-badge">
                <span class="ustech-scroll-cta-badge-dot"></span>
                <span>${ui('cta_badge')}</span>
            </div>
            <h4 class="ustech-scroll-cta-title">${ui('cta_title')}</h4>
            <p class="ustech-scroll-cta-desc">${ui('cta_desc')}</p>
            <a href="${contactHref}" class="ustech-scroll-cta-btn">
                <span>${ui('cta_btn')}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
        `;

        document.body.appendChild(ctaEl);

        var closeBtn = ctaEl.querySelector('.ustech-scroll-cta-close');
        var isShown = false;

        function handleScroll() {
            if (isShown || sessionStorage.getItem('ustech_scroll_cta_closed') === '1') return;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            var scrollPct = scrollTop / docHeight;

            // Trigger only when visitor reaches 1/3 (35%) of the page depth
            if (scrollPct >= 0.35 && scrollTop >= 650) {
                isShown = true;
                ctaEl.classList.add('is-visible');
                window.removeEventListener('scroll', handleScroll);
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check after 600ms in case user is already scrolled
        setTimeout(handleScroll, 600);

        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            ctaEl.classList.remove('is-visible');
            ctaEl.classList.add('is-dismissed');
            sessionStorage.setItem('ustech_scroll_cta_closed', '1');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollCTA);
    } else {
        initScrollCTA();
    }
})();


