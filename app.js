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

        // 5. Hide StarchQC and SamplePrep products on products-devices.html
        var starchQC = document.getElementById('i-sens-starch');
        var samplePrep = document.getElementById('nano-sample-prep');
        if (starchQC) {
            starchQC.style.display = 'none';
            var prevHr = starchQC.previousElementSibling;
            if (prevHr && prevHr.tagName === 'HR') {
                prevHr.style.display = 'none';
            }
        }
        if (samplePrep) {
            samplePrep.style.display = 'none';
            var prevHr = samplePrep.previousElementSibling;
            if (prevHr && prevHr.tagName === 'HR') {
                prevHr.style.display = 'none';
            }
        }

        // 6. Hide StarchQC and SamplePrep cards from the homepage slider
        document.querySelectorAll('a[href="product-i-sens-starch.html"], a[href="product-n-sens-sampleprep.html"]').forEach(function(el) {
            if (el.classList.contains('blog-slider-card')) {
                el.style.display = 'none';
            }
        });

        // 7. Hide StarchQC inline link on products.html to avoid dead links
        var starchInline = document.querySelector('a[href="product-i-sens-starch.html"]');
        if (starchInline && !starchInline.classList.contains('blog-slider-card') && !starchInline.classList.contains('dropdown-item')) {
            starchInline.style.display = 'none';
            // Also hide the preceding comma and space if possible
            var parent = starchInline.parentNode;
            if (parent) {
                parent.innerHTML = parent.innerHTML.replace(', <a href="product-i-sens-starch.html"', ' <a href="product-i-sens-starch.html"');
            }
        }

        // 8. Language Switcher — now visible (subdirectory-based i18n)

        // 9. Hide Blogs section globally (dropdown menu, homepage slider, split panel)
        document.querySelectorAll('a[href="knowledge-blogs.html"]').forEach(function(el) {
            el.style.display = 'none';
        });
        var homeBlogSec = document.getElementById('home-blog-section');
        if (homeBlogSec) {
            homeBlogSec.style.display = 'none';
        }
        var blogsSplitCol = document.querySelector('.knowledge-column-panel.blogs');
        if (blogsSplitCol) {
            blogsSplitCol.style.display = 'none';
        }
        var knowledgeSplitContainer = document.querySelector('.knowledge-split-container');
        if (knowledgeSplitContainer && blogsSplitCol) {
            knowledgeSplitContainer.style.gridTemplateColumns = '1fr';
        }

    });
})();

// =====================================================================
// LANGUAGE SWITCHER — Robust Relative Path & Subdirectory i18n
// Works identically on file:// (local test), localhost, and production.
// =====================================================================

var SUPPORTED_LANGS = ['en', 'tr', 'fr', 'de', 'es'];

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
    cookie_saved: 'Cookie preferences saved.', cookie_all: 'All cookies accepted.'
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
    cookie_saved: 'Çerez tercihleri kaydedildi.', cookie_all: 'Tüm çerezler kabul edildi.'
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
    cookie_saved: 'Préférences de cookies enregistrées.', cookie_all: 'Tous les cookies acceptés.'
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
    cookie_saved: 'Cookie-Einstellungen gespeichert.', cookie_all: 'Alle Cookies akzeptiert.'
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
    cookie_saved: 'Preferencias de cookies guardadas.', cookie_all: 'Todas las cookies aceptadas.'
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
// StarchQC/SamplePrep yayinlanirsa buraya eklenmeli (product-starchqc.html, product-sampleprep.html).
var TRANSLATED_PAGES = {};
['index.html','about.html','contact.html','faq.html','privacy-policy.html','terms-of-service.html',
 'industries.html','industry-dairy.html','industry-food-feed.html','industry-chemical-pharma.html',
 'products.html','products-devices.html','products-software.html','products-portal.html',
 'products-calibration-models.html','product-calix.html','product-masterline.html','product-prochem.html',
 'product-proline.html','product-proline-17es.html','product-proline-2550.html','product-tornado.html',
 'knowledge.html','knowledge-technology.html','knowledge-blogs.html'
].forEach(function(p) { TRANSLATED_PAGES[p] = true; });

// Eski URL -> guncel sayfa (eski .htaccess yonlendirmeleri; GitHub Pages .htaccess okumaz)
var LEGACY_PAGE_MAP = {
    'product-n-sens-feed.html': 'product-masterline.html',
    'product-n-sens-online.html': 'product-proline-17es.html',
    'product-n-sens-tornado.html': 'product-tornado.html',
    'product-n-sens-sampleprep.html': 'products-devices.html',   // SamplePrep bekletiliyor
    'product-i-sens-starch.html': 'products-devices.html',        // StarchQC bekletiliyor
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
 "about.html": {
  "de": {
   "k": "über uns unternehmen team",
   "s": "Das Team hinter USTECH: Chemometriker und Automatisierer, die seit 2023 FT-NIR-Analysatoren, caliX-Software und portable Kalibrierungen entwickeln.",
   "t": "Über USTECH Innovations: FT-NIR- und Chemometrie-Experten"
  },
  "es": {
   "k": "sobre nosotros empresa equipo",
   "s": "El equipo de USTECH: quimiometristas e ingenieros de automatización que desarrollan analizadores FT-NIR, software caliX y calibraciones portátiles desde 2023.",
   "t": "Acerca de USTECH Innovations: FT-NIR y expertos en quimiometría"
  },
  "fr": {
   "k": "à propos entreprise équipe",
   "s": "L'équipe USTECH : chimiométriciens et automaticiens développant depuis 2023 des analyseurs FT-NIR, le logiciel caliX et des étalonnages portables.",
   "t": "À propos de USTECH Innovations : FT-NIR et experts en chimiométrie"
  },
  "tr": {
   "k": "hakkımızda hakkinda şirket ekip misyon",
   "s": "USTECH'in arkasındaki ekip: 2023'ten bu yana FT-NIR analizörleri, caliX yazılımı ve taşınabilir kalibrasyonlar geliştiren kemometri ve otomasyon mühendisleri.",
   "t": "USTECH Innovations Hakkında: FT-NIR ve Kemometri Uzmanları"
  }
 },
 "contact.html": {
  "de": {
   "k": "kontakt angebot preis demo support",
   "s": "Sprechen Sie mit einem USTECH-Anwendungstechniker: Angebot, Demo oder kostenlose Musteranalyse und ROI-Rechner für Ihre jährlichen Einsparungen.",
   "t": "Kontaktieren Sie USTECH | Fordern Sie eine Demo oder eine NIR-Probenanalyse an"
  },
  "es": {
   "k": "contacto cotización precio demo soporte",
   "s": "Hable con un ingeniero de aplicaciones USTECH: cotización, demostración o análisis de muestra gratuito y calculadora de ROI para sus ahorros anuales.",
   "t": "Contacto USTECH | Solicite una demostración o un análisis de muestra NIR"
  },
  "fr": {
   "k": "contact devis prix démo support",
   "s": "Parlez à un ingénieur d'application USTECH : devis, démonstration ou analyse d'échantillon gratuite, et calculateur de ROI pour vos économies annuelles.",
   "t": "Contacter USTECH | Demander une démo ou une analyse d'échantillon NIR"
  },
  "tr": {
   "k": "iletişim iletisim teklif fiyat demo destek adres telefon",
   "s": "USTECH uygulama mühendisiyle görüşün: teklif isteyin, demo veya ücretsiz numune analizi ayırtın, ROI hesaplayıcıyla yıllık tasarrufunuzu görün.",
   "t": "USTECH İle İletişime Geçin | Demo veya NIR Numune Analizi Talep Edin"
  }
 },
 "faq.html": {
  "de": {
   "k": "faq häufige fragen garantie wartung",
   "s": "30 Antworten zu FT-NIR-Genauigkeit, MEMS-Spektrometern, SPS/SCADA-Integration, Kalibrierungsübertragung, Wartung und ROI – vom Anwendungsteam von USTECH.",
   "t": "FT-NIR Spektroskopie FAQ: Geräte, Software, Modelle"
  },
  "es": {
   "k": "preguntas frecuentes garantía mantenimiento",
   "s": "30 respuestas sobre precisión FT-NIR, espectrómetros MEMS, integración PLC/SCADA, transferencia de calibración, mantenimiento y ROI.",
   "t": "Preguntas frecuentes sobre espectroscopía FT-NIR: dispositivos, software y modelos"
  },
  "fr": {
   "k": "faq questions fréquentes garantie entretien",
   "s": "30 réponses sur la précision FT-NIR, les spectromètres MEMS, l'intégration PLC/SCADA, le transfert d'étalonnage, la maintenance et le ROI.",
   "t": "FAQ sur la spectroscopie FT-NIR : appareils, logiciels, modèles"
  },
  "tr": {
   "k": "sss sık sorulan sorular soru cevap garanti bakım",
   "s": "USTECH uygulama ekibinden FT-NIR doğruluğu, MEMS spektrometreleri, PLC/SCADA entegrasyonu, kalibrasyon aktarımı, bakım ve ROI hakkında 30 yanıt.",
   "t": "FT-NIR Spektroskopisi SSS: Cihazlar, Yazılım, Modeller"
  }
 },
 "index.html": {
  "de": {
   "k": "startseite",
   "s": "Echtzeit-Inline-FT-NIR-Analyse für Lebensmittel-, Futtermittel-, Molkerei- und Chemiebetriebe. Weniger Überdosierung, Spezifikation in jeder Charge.",
   "t": "Inline-FT-NIR-Prozessanalysatoren und Chemometrie"
  },
  "es": {
   "k": "inicio",
   "s": "Análisis FT-NIR en línea en tiempo real para plantas de alimentos, piensos, lácteos y química. Menos exceso de dosificación y especificación en cada lote.",
   "t": "Analizadores de procesos y quimiometría en línea FT-NIR"
  },
  "fr": {
   "k": "accueil",
   "s": "Analyse FT-NIR en ligne en temps réel pour l'agroalimentaire, l'alimentation animale, le lait et la chimie. Moins de surdosage, spécifications tenues.",
   "t": "Analyseurs de processus et chimiométrie en ligne FT-NIR"
  },
  "tr": {
   "k": "ana sayfa anasayfa ustech",
   "s": "Gıda, yem, süt ve kimya tesisleri için gerçek zamanlı hat içi FT-NIR analizi. İsrafı azaltın, her partide spesifikasyonu tutturun, döngüyü kapatın.",
   "t": "Hat İçi FT-NIR Proses Analizörleri ve Kemometri"
  }
 },
 "industries.html": {
  "de": {
   "k": "branchen industrien anwendungen",
   "s": "Wie sich Inline-FT-NIR-Analyse in Lebensmittel- und Futtermittelverarbeitung, Molkerei sowie Chemie- und Pharmaproduktion auszahlt. USTECH-Lösungen.",
   "t": "FT-NIR Lösungen nach Branche: Lebensmittel, Milchprodukte, Chemie"
  },
  "es": {
   "k": "sectores industrias aplicaciones",
   "s": "Cómo el análisis FT-NIR en línea resulta rentable en molienda, piensos, lácteos y producción química o farmacéutica. Soluciones USTECH por sector.",
   "t": "FT-NIR Soluciones por industria: alimentaria, láctea, química"
  },
  "fr": {
   "k": "secteurs industries applications",
   "s": "Comment l'analyse FT-NIR en ligne devient rentable en meunerie, alimentation animale, produits laitiers et production chimique ou pharmaceutique.",
   "t": "Solutions FT-NIR par secteur : alimentation, produits laitiers, produits chimiques"
  },
  "tr": {
   "k": "sektörler sektor endüstri uygulama",
   "s": "Gıda ve yem öğütme, süt işleme ve kimya veya ilaç üretiminde hat içi FT-NIR analizinin nasıl kazanç sağladığını görün. Sektöre özel USTECH çözümleri.",
   "t": "Sektörlere Göre FT-NIR Çözümleri: Gıda, Süt, Kimya"
  }
 },
 "industry-chemical-pharma.html": {
  "de": {
   "k": "chemie pharma polymer harz",
   "s": "Bereit für FDA 21 CFR Part 11 FT-NIR für Pharma- und Chemieanlagen: Echtzeit-PAT für Rohstoff-ID, Mischungsgleichmäßigkeit, Trocknungsendpunkt und Reaktionen.",
   "t": "Chemische und pharmazeutische Prozessanalytik (PAT)"
  },
  "es": {
   "k": "química farmacéutica farma polímero resina",
   "s": "FT-NIR listo para FDA 21 CFR Part 11 en plantas químicas y farmacéuticas: PAT en tiempo real para materias primas, uniformidad de mezcla y secado.",
   "t": "Analítica de Procesos (PAT) para Química y Farma"
  },
  "fr": {
   "k": "chimie pharmacie pharma polymère résine",
   "s": "FT-NIR conforme FDA 21 CFR Part 11 pour la pharma et la chimie : identification des matières premières, uniformité de mélange, point final de séchage.",
   "t": "Analyse des processus chimiques et pharmaceutiques (PAT)"
  },
  "tr": {
   "k": "kimya ilaç ilac farma polimer reçine hidroksil karışım",
   "s": "İlaç ve kimya tesisleri için FDA 21 CFR Part 11'e hazır FT-NIR: hammadde kimliği, karışım tekdüzeliği, kurutma uç noktası ve reaksiyon izleme.",
   "t": "Kimya ve İlaç Proses Analitiği (PAT)"
  }
 },
 "industry-dairy.html": {
  "de": {
   "k": "molkerei milch käse butter sahne joghurt",
   "s": "Jeden Tankwagen bewerten, Butterfett-Überdosierung beenden und Pulverfeuchte regeln – mit CIP-fähigem Inline-FT-NIR für Molkereibetriebe.",
   "t": "Inline-NIR für die Milchwirtschaft: Fettstandardisierung & Ausbeute"
  },
  "es": {
   "k": "lácteos leche queso mantequilla crema yogur",
   "s": "Clasifique cada cisterna, elimine el exceso de materia grasa y controle la humedad del polvo con FT-NIR en línea compatible con CIP. Descubra USTECH.",
   "t": "NIR en Línea para Lácteos: Grasa y Rendimiento"
  },
  "fr": {
   "k": "produits laitiers lait fromage beurre crème yaourt",
   "s": "Classez chaque camion-citerne, supprimez les pertes de matière grasse et maîtrisez l'humidité des poudres avec le FT-NIR en ligne compatible CIP.",
   "t": "NIR en ligne pour les produits laitiers : standardisation et rendement des matières grasses"
  },
  "tr": {
   "k": "süt sut peynir tereyağı krema yoğurt süt tozu yağ protein",
   "s": "Her tankeri derecelendirin, tereyağı yağı israfını bitirin ve süt tesisleri için CIP uyumlu hat içi FT-NIR ile toz nemini kontrol edin.",
   "t": "Süt Endüstrisi için Hat İçi NIR: Yağ Standardizasyonu ve Verim"
  }
 },
 "industry-food-feed.html": {
  "de": {
   "k": "lebensmittel futtermittel getreide mehl protein feuchte",
   "s": "Echtzeit-NIR-Analyse von Protein, Feuchte und Fett von der Annahme bis zum Fertigfutter. Weniger Rezeptur-Überdosierung, jede Charge dokumentiert.",
   "t": "Inline-NIR für Mischfutterwerke: Protein-Überdosierung stoppen"
  },
  "es": {
   "k": "alimentos piensos granos harina proteína humedad",
   "s": "Análisis NIR en tiempo real de proteína, humedad y grasa desde la recepción hasta el pienso terminado. Evite el exceso de formulación con USTECH.",
   "t": "NIR en Línea para Piensos: Evite Ceder Proteína"
  },
  "fr": {
   "k": "alimentation aliments animaux céréales farine protéine humidité",
   "s": "Analyse NIR en temps réel des protéines, de l'humidité et des matières grasses, de la réception à l'aliment fini. Chaque lot documenté avec USTECH.",
   "t": "NIR en ligne pour les usines d'aliments : stop au surdosage de protéines"
  },
  "tr": {
   "k": "gıda gida yem tahıl un protein nem yağ kül lif nişasta değirmen",
   "s": "Alımdan bitmiş yeme kadar gerçek zamanlı NIR protein, nem ve yağ analizi. Formülasyon israfını durdurun ve USTECH ile her partiyi belgeleyin.",
   "t": "Yem Fabrikaları İçin Hat İçi NIR: Protein İsrafını Durdurun"
  }
 },
 "knowledge-blogs.html": {
  "de": {
   "k": "blog artikel anwendungshinweise",
   "s": "52 Artikel, Whitepaper und Leitfäden zu NIR-Kalibrierung, PLS-Modellierung, Inline-Prozesskontrolle und ROI – praxisnahe Lektüre für QC- und Prozessingenieure.",
   "t": "NIR-Spektroskopie-Blog & Whitepaper"
  },
  "es": {
   "k": "blog artículos notas de aplicación",
   "s": "52 artículos, whitepapers y guías sobre calibración NIR, modelado PLS, control de procesos en línea y ROI: lectura práctica para ingenieros de procesos y control de calidad.",
   "t": "Blog de Espectroscopía NIR y Artículos Técnicos"
  },
  "fr": {
   "k": "blog articles notes d'application",
   "s": "52 articles, livres blancs et guides sur l'étalonnage NIR, la modélisation PLS, le contrôle de processus en ligne et le retour sur investissement - lecture pratique pour les ingénieurs de contrôle qualité et de procédés.",
   "t": "Blog et livres blancs sur la spectroscopie NIR"
  },
  "tr": {
   "k": "blog makale uygulama notu teknik yazı",
   "s": "Analitik cihazlar için endüstriyel kullanımlar hakkında bilgi edinin. USTECH uzmanlarından vaka çalışmaları, makaleler ve beyaz kitaplar okuyun.",
   "t": "NIR Spektroskopisi Blogu ve Teknik İncelemeler"
  }
 },
 "knowledge-technology.html": {
  "de": {
   "k": "technologie spektroskopie theorie",
   "s": "FT-NIR-Spektroskopie erklärt, von Photonen bis zur Vorhersage: Messpfad, Kalibrierwissenschaft und das caliX-ProChem-Ökosystem von USTECH.",
   "t": "NIR-Technologie & Kalibrierwissenschaft"
  },
  "es": {
   "k": "tecnología espectroscopía teoría",
   "s": "La espectroscopía FT-NIR explicada, de fotones a predicciones: trayectoria de medición, ciencia de calibración y ecosistema caliX + ProChem.",
   "t": "Tecnología NIR y Ciencia de Calibración"
  },
  "fr": {
   "k": "technologie spectroscopie théorie",
   "s": "Le FT-NIR expliqué, des photons aux prédictions : chemin de mesure, science de l'étalonnage et écosystème caliX + ProChem, par USTECH.",
   "t": "Technologie NIR et science de l'étalonnage"
  },
  "tr": {
   "k": "teknoloji ft-nir nir spektroskopi mems teori kalibrasyon bilimi",
   "s": "ProChem, caliX, AutoML ve MEMS FT-NIR cihazlarının üretim tesislerinde gerçek zamanlı kalite kontrolü için nasıl çalıştığını öğrenin.",
   "t": "NIR Teknoloji ve Kalibrasyon Bilimi"
  }
 },
 "knowledge.html": {
  "de": {
   "k": "wissen technologie leitfäden",
   "s": "NIR-Spektroskopie von Grund auf: Technologie-Erklärungen, Kalibrierwissenschaft und technische Fachbeiträge der USTECH-Ingenieure.",
   "t": "NIR-Wissenszentrum: Technologie & Leitfäden"
  },
  "es": {
   "k": "conocimiento tecnología guías",
   "s": "Aprenda espectroscopía NIR desde los fundamentos: explicaciones tecnológicas, ciencia de calibración y artículos técnicos de los ingenieros USTECH.",
   "t": "Centro de Conocimiento NIR: Tecnología y Guías"
  },
  "fr": {
   "k": "connaissances technologie guides",
   "s": "Apprenez la spectroscopie NIR de A à Z : explications technologiques, science de l'étalonnage et publications techniques des ingénieurs USTECH.",
   "t": "Centre de connaissances NIR : technologie et guides"
  },
  "tr": {
   "k": "bilgi bankası bilgi teknoloji rehber",
   "s": "NIR spektroskopisini temelden öğrenin: teknoloji açıklamaları, kalibrasyon bilimi ve USTECH mühendislerinin yazdığı teknik incelemeler.",
   "t": "NIR Bilgi Merkezi: Teknoloji ve Kılavuzlar"
  }
 },
 "product-calix.html": {
  "de": {
   "k": "calix kalibrierung chemometrie maschinelles lernen",
   "s": "NIR-Kalibriermodelle in Minuten erstellen, validieren und ausrollen. caliX vereint PLS, PCA und AutoML in einem Arbeitsbereich mit acht Modulen.",
   "t": "caliX: AutoML Chemometrie- & Kalibrierungssoftware"
  },
  "es": {
   "k": "calix calibración quimiometría aprendizaje automático",
   "s": "Cree, valide e implemente modelos de calibración NIR en minutos. caliX reúne PLS, PCA y AutoML en un espacio de trabajo de ocho módulos.",
   "t": "caliX: Software de Quimiometría y Calibración AutoML"
  },
  "fr": {
   "k": "calix étalonnage chimiométrie apprentissage automatique",
   "s": "Créez, validez et déployez des modèles d'étalonnage NIR en quelques minutes. caliX réunit PLS, PCA et AutoML dans un espace de travail à huit modules.",
   "t": "caliX : AutoML Logiciel de chimiométrie et d'étalonnage"
  },
  "tr": {
   "k": "calix kalibrasyon modeli kemometri makine öğrenimi pls pca automl",
   "s": "Dakikalar içinde NIR kalibrasyon modeli oluşturun ve dağıtın. caliX; PLS, PCA ve AutoML'i sekiz modüllü tek çalışma alanında birleştirir.",
   "t": "caliX: AutoML Kemometri ve Kalibrasyon Yazılımı"
  }
 },
 "product-masterline.html": {
  "de": {
   "k": "masterline tischgerät analysator getreide",
   "s": "USTECH MasterLine - Tisch-FT-NIR-Analysator für die schnelle, zerstörungsfreie Qualitätskontrolle von Getreide, Futterzutaten und Raufutter.",
   "t": "MasterLine Tisch-FT-NIR-Analysator für Getreide- und Futtermittel-QC"
  },
  "es": {
   "k": "masterline sobremesa analizador granos",
   "s": "MasterLine: analizador FT-NIR de sobremesa para control de calidad rápido y no destructivo de granos, piensos y forrajes en menos de 30 segundos.",
   "t": "Analizador FT-NIR de Sobremesa MasterLine"
  },
  "fr": {
   "k": "masterline paillasse analyseur céréales",
   "s": "USTECH MasterLine - Analyseur de paillasse FT-NIR pour le contrôle qualité des céréales, des ingrédients alimentaires et du fourrage.",
   "t": "Analyseur FT-NIR de paillasse MasterLine pour céréales et aliments"
  },
  "tr": {
   "k": "masterline masaüstü analizör tahıl yem laboratuvar",
   "s": "USTECH MasterLine - Tahıl, yem bileşeni ve kaba yemin hızlı ve tahribatsız kalite kontrolü için 30 saniyenin altında ölçen masaüstü FT-NIR analizörü.",
   "t": "MasterLine Masaüstü FT-NIR Analizörü: Tahıl ve Yem Kalite Kontrolü"
  }
 },
 "product-prochem.html": {
  "de": {
   "k": "prochem prozesssteuerung sps scada echtzeit",
   "s": "ProChem verbindet USTECH-Analysatoren mit SPS und SCADA: Live-Dashboards, Alarme und automatische Sollwertregelung in Echtzeit.",
   "t": "ProChem: Echtzeit-PAT & Closed-Loop-Regelung"
  },
  "es": {
   "k": "prochem control de procesos plc scada tiempo real",
   "s": "ProChem conecta los analizadores USTECH con su PLC y SCADA: paneles en vivo, alarmas y control automático de consigna en tiempo real.",
   "t": "ProChem: PAT en Tiempo Real y Control en Circuito Cerrado"
  },
  "fr": {
   "k": "prochem contrôle de processus plc scada temps réel",
   "s": "ProChem relie les analyseurs USTECH à votre automate et SCADA : tableaux de bord, alarmes et régulation automatique des consignes en temps réel.",
   "t": "ProChem : PAT en temps réel et contrôle en boucle fermée"
  },
  "tr": {
   "k": "prochem proses kontrol plc scada gerçek zamanlı pat",
   "s": "ProChem, USTECH analizörlerini PLC ve SCADA'ya bağlar: canlı paneller, alarmlar ve NIR sonucunu anında eyleme çeviren otomatik ayar noktası kontrolü.",
   "t": "ProChem: Gerçek Zamanlı PAT ve Kapalı Döngü Kontrol"
  }
 },
 "product-proline-17es.html": {
  "de": {
   "k": "proline 17es sensor förderband",
   "s": "ProLine17ES Analysator – Industrielles Inline-Spektrometer für Prozessanalysentechnik (PAT) für Rohrleitungen und Rutschen.",
   "t": "ProLine17ES Analysator"
  },
  "es": {
   "k": "proline 17es sensor cinta transportadora",
   "s": "Analizador ProLine17ES: espectrómetro industrial en línea de Tecnología Analítica de Procesos (PAT) para tuberías y conductos.",
   "t": "Analizador ProLine17ES"
  },
  "fr": {
   "k": "proline 17es capteur convoyeur",
   "s": "Analyseur ProLine17ES - Spectromètre industriel de technologie d'analyse de processus en ligne (PAT) pour pipelines et goulottes.",
   "t": "Analyseur ProLine17ES"
  },
  "tr": {
   "k": "proline 17es sensör konveyör bant hat içi",
   "s": "ProLine17ES Analizörü - Boru hatları ve oluklar için endüstriyel hat içi Proses Analitik Teknolojisi (PAT) spektrometresi.",
   "t": "ProLine17ES Analizörü"
  }
 },
 "product-proline-2550.html": {
  "de": {
   "k": "proline 2550 rohr reaktor flüssigkeit",
   "s": "IP69K-Inline-FT-NIR-Analysator für Rohre, Mischer und Reaktoren. Unbegrenzte Parameter, OPC UA und PROFINET, Regelkreis über ProChem.",
   "t": "ProLine2550 Inline-FT-NIR-Prozessanalysator"
  },
  "es": {
   "k": "proline 2550 tubería reactor líquido",
   "s": "Analizador FT-NIR en línea IP69K para tuberías, mezcladores y reactores. Parámetros ilimitados, OPC UA y PROFINET, lazo cerrado con ProChem.",
   "t": "Analizador de Procesos FT-NIR en Línea ProLine2550"
  },
  "fr": {
   "k": "proline 2550 conduite réacteur liquide",
   "s": "Analyseur FT-NIR en ligne IP69K pour tuyauteries, mélangeurs et réacteurs. Paramètres illimités, OPC UA et PROFINET, boucle fermée via ProChem.",
   "t": "ProLine2550 Analyseur de processus en ligne FT-NIR"
  },
  "tr": {
   "k": "proline 2550 boru reaktör sıvı toz hat içi analizör",
   "s": "Boru, karıştırıcı ve reaktörler için IP69K sınıfı hat içi FT-NIR analizörü. Sınırsız parametre, OPC UA ve PROFINET, ProChem ile kapalı döngü kontrol.",
   "t": "ProLine2550 Hat İçi FT-NIR Proses Analizörü"
  }
 },
 "product-tornado.html": {
  "de": {
   "k": "tornado mühle mahlen probenvorbereitung",
   "s": "USTECH Tornado+ Hochleistungs-Labormühle – Wassergekühlte Probenaufbereitungsmühle für Getreide, Saatgut und Futtermittel.",
   "t": "USTECH Tornado+ Labormühle"
  },
  "es": {
   "k": "tornado molino molienda preparación de muestras",
   "s": "Molino de laboratorio de alto rendimiento USTECH Tornado+: molino de preparación de muestras refrigerado por agua para granos, semillas y piensos.",
   "t": "Molino de Laboratorio USTECH Tornado+"
  },
  "fr": {
   "k": "tornado broyeur broyage préparation échantillon",
   "s": "USTECH Tornado+ : broyeur de laboratoire haute performance refroidi à l'eau pour la préparation d'échantillons de céréales, graines et aliments du bétail.",
   "t": "USTECH Tornado+ Broyeur de laboratoire"
  },
  "tr": {
   "k": "tornado değirmen öğütme numune hazırlama su soğutmalı",
   "s": "USTECH Tornado+ Yüksek Performanslı Laboratuvar Değirmeni - Tahıllar, tohumlar ve yemler için su soğutmalı numune hazırlama değirmeni.",
   "t": "USTECH Tornado+ Laboratuvar Değirmeni"
  }
 },
 "products-devices.html": {
  "de": {
   "k": "geräte analysator spektrometer sensor hardware",
   "s": "Vergleichen Sie USTECH FT-NIR-Hardware: ProLine2550 und ProLine17ES Inline-Analysatoren, MasterLine At-Line-QC, SamplePrep und Tornado+ Probenmühlen.",
   "t": "FT-NIR-Analysegeräte für Inline- & At-Line-QC"
  },
  "es": {
   "k": "dispositivos analizador espectrómetro sensor hardware",
   "s": "Compare el hardware FT-NIR de USTECH: analizadores en línea ProLine2550 y ProLine17ES, MasterLine at-line, SamplePrep y molinos Tornado+.",
   "t": "Analizadores FT-NIR para Control en Línea y At-Line"
  },
  "fr": {
   "k": "appareils analyseur spectromètre capteur matériel",
   "s": "Comparez le matériel FT-NIR USTECH : analyseurs en ligne ProLine2550 et ProLine17ES, contrôle at-line MasterLine, broyeurs SamplePrep et Tornado+.",
   "t": "Appareils d'analyse FT-NIR pour le contrôle qualité en ligne et at-line"
  },
  "tr": {
   "k": "cihazlar cihaz analizör spektrometre sensör donanım hat içi hat başı",
   "s": "USTECH FT-NIR donanımını karşılaştırın: ProLine2550 ve ProLine17ES hat içi analizörler, MasterLine hat başı QC, SamplePrep ve Tornado+ değirmenleri.",
   "t": "Hat İçi ve Hat Başı Kalite Kontrolü için FT-NIR Analizör Cihazları"
  }
 },
 "products-software.html": {
  "de": {
   "k": "software chemometrie automatisierung",
   "s": "Erstellen Sie NIR-Kalibrierungen in Minuten mit caliX AutoML und übertragen Sie Ergebnisse mit ProChem an SPS/SCADA für echte Closed-Loop-Prozesssteuerung.",
   "t": "caliX & ProChem: Chemometrie- und PAT-Software"
  },
  "es": {
   "k": "software quimiometría automatización",
   "s": "Cree calibraciones NIR en minutos con caliX AutoML y conecte los resultados al PLC/SCADA con ProChem para un control de proceso en lazo cerrado real.",
   "t": "caliX y ProChem: Software de Quimiometría y PAT"
  },
  "fr": {
   "k": "logiciels chimiométrie automatisation",
   "s": "Créez des étalonnages NIR en quelques minutes avec caliX AutoML et reliez les résultats au PLC/SCADA via ProChem pour un contrôle en boucle fermée.",
   "t": "caliX & ProChem : Logiciels de chimiométrie et PAT"
  },
  "tr": {
   "k": "yazılım yazilim kemometri otomasyon",
   "s": "caliX AutoML ile dakikalar içinde NIR kalibrasyonları oluşturun ve gerçek kapalı döngü proses kontrolü için sonuçları ProChem ile PLC/SCADA'ya bağlayın.",
   "t": "caliX ve ProChem: Kemometri ve PAT Yazılımı"
  }
 },
 "products.html": {
  "de": {
   "k": "produkte geräte software kalibrierung",
   "s": "Die USTECH-Produktfamilie: ProLine Inline-FT-NIR-Analysatoren, caliX Chemometrie-Software, ProChem-Automatisierung und fertige Kalibriermodelle.",
   "t": "FT-NIR-Analysatoren, Software & Kalibrierungen"
  },
  "es": {
   "k": "productos dispositivos software calibración",
   "s": "Familia de productos USTECH: analizadores FT-NIR en línea ProLine, software de quimiometría caliX, automatización ProChem y modelos de calibración listos.",
   "t": "Analizadores FT-NIR, Software y Calibraciones"
  },
  "fr": {
   "k": "produits appareils logiciels étalonnage",
   "s": "La gamme USTECH : analyseurs en ligne FT-NIR ProLine, logiciel de chimiométrie caliX, automatisation ProChem et modèles d'étalonnage prêts à l'emploi.",
   "t": "Analyseurs FT-NIR, logiciels et étalonnages"
  },
  "tr": {
   "k": "ürünler urunler cihaz yazılım kalibrasyon",
   "s": "USTECH ürün ailesini keşfedin: ProLine hat içi FT-NIR analizörleri, caliX kemometri yazılımı, ProChem otomasyonu ve kullanıma hazır kalibrasyon modelleri.",
   "t": "FT-NIR Analizörleri, Yazılım ve Kalibrasyonlar"
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

// Detect current language from pathname (supports file:// and http/https://)
function detectCurrentLang() {
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var match = path.match(/\/(tr|fr|de|es)(\/|$)/i);
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

    // Currently in a language subfolder (tr, fr, de, es)
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
        
        // Update the flag circle to show current language flag
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
    window.scrollTo(0, 0);

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
            return '$' + Math.round(num).toLocaleString('en-US');
        }
        
        [throughputInput, valInput, wasteInput, failsInput].forEach(input => {
            input.addEventListener('input', calculateROI);
        });
        
        // Run initial calculation
        calculateROI();
    }

    // 7. Interactive Parameter Selector for Industry subpages
    const paramList = document.getElementById('paramList');
    if (paramList) {
        // Master Parameter database
        const paramsDb = {
            // Food and Feed
            protein: { t:'Crude Protein (CP)',          desc:'Crude protein is the single most important — and expensive — quality parameter in animal feed formulation. It directly determines both the nutritional value and the raw material cost of finished feed. ProLine2550 measures protein continuously on incoming raw materials and finished product, providing the real-time data that allows nutritionists to formulate precisely to specification and eliminate systematic protein give-away.', r:'5 – 65%', a:'±0.10% compound feed', m:'Grain, meal, compound feed, pellet', ref:'ISO 5983 (Kjeldahl)' },
            moisture:{ t:'Moisture',                    desc:'Moisture is the most immediately actionable parameter at grain intake — determining safe storage routing, weight-adjusted pricing, and drying requirements. In pelleting, conditioner moisture governs die wear and pellet durability; post-cooler moisture determines storage safety. ProLine2550 measures moisture inline at every critical point in the process, enabling real-time decisions that protect margin and product quality simultaneously.', r:'5 – 40%', a:'±0.08% typical', m:'All grain and feed matrices', ref:'ISO 712 / 6496' },
            fat:     { t:'Crude Fat (Ether Extract)',    desc:'Fat content is a major energy contributor and an important cost driver in poultry, aquaculture, and pet food formulations. ProLine2550 monitors fat continuously in ingredients and finished feeds, enabling formulation accuracy that reduces the over-addition of expensive fat sources used to guarantee minimum energy specifications. Particularly valuable in compound feeds, DDGS, and full-fat soybean where fat content is highly variable.', r:'0.5 – 30%', a:'±0.12% typical', m:'Feed, meal, grain, DDGS', ref:'ISO 6492' },
            fiber:   { t:'Crude Fiber (CF)',             desc:'Crude fiber content governs energy availability and gut health in monogastric species, and is a regulatory label requirement in many markets. Real-time fiber monitoring enables formulation adjustments as high-fiber co-products like wheat bran, beet pulp, and sunflower meal enter the formulation — preventing inadvertent energy dilution in finished feeds.', r:'1 – 40%', a:'±0.20% typical', m:'Feed, grain, co-products, forage', ref:'ISO 6865' },
            ash:     { t:'Ash / Mineral Content',        desc:'Ash (total minerals) is a key quality indicator for protein meals — elevated ash in soybean meal or fish meal signals adulteration or dilution with mineral-rich by-products. It is also a label requirement for many compound feed categories. Continuous ash monitoring enables early detection of ingredient quality deviations that would not be visible in protein or moisture measurements alone.', r:'0.5 – 20%', a:'±0.15% typical', m:'Meals, compound feed, grain', ref:'ISO 5984' },
            starch:  { t:'Starch',                      desc:'Starch is the primary energy source in cereal-based diets and its measurement is directly relevant to both nutritional value and ingredient pricing. In brewing and distilling co-products (DDGS, wheat syrup), residual starch indicates the efficiency of fermentation. ProLine2550 delivers starch measurements alongside protein, moisture, and fiber simultaneously — giving a complete energy-protein picture in a single scan.', r:'5 – 80%', a:'±0.25% typical', m:'Grain, co-products, compound feed', ref:'ICC 168 / enzymatic' },
            ndf:     { t:'NDF / ADF (Fibre Fractions)',  desc:'Neutral Detergent Fiber (NDF) and Acid Detergent Fiber (ADF) are the gold standard measures of fiber quality for ruminant nutrition — directly predictive of rumen fill, dry matter intake potential, and digestible energy. Inline NDF/ADF monitoring at forage intake and in TMR mixing enables precision ruminant formulation that traditional crude fiber measurement cannot support.', r:'5 – 75%', a:'±0.4% NDF typical', m:'Forage, silage, hay, TMR components', ref:'Van Soest method' },
            
            // Dairy
            dairy_fat: { t:'Butter Fat', desc:'Fat content determines dairy yield value and texture. In cream standardization, continuous fat measurements enable direct closed-loop dosing valves to hit fat targets with high repeatabilities.', r:'0.5 – 55%', a:'±0.05% in liquids', m:'Raw milk, cream, whey concentrate', ref:'ISO 1211 / Gerber' },
            dairy_protein: { t:'Total Protein', desc:'Total protein (caseins and whey proteins) is critical for milk pricing and cheese coagulation dynamics. Continuous monitoring at raw receiving provides standardized dairy inputs.', r:'1.5 – 15%', a:'±0.04% typical', m:'Milk, whey, liquid concentrates', ref:'ISO 8968 / Kjeldahl' },
            dairy_lactose: { t:'Lactose', desc:'Lactose tracking supports standard milk powder calibrations and guides filtration runs (ultrafiltration/reverse osmosis) to optimize dry matter content.', r:'0.1 – 10%', a:'±0.06% typical', m:'Raw milk, permeate, retentate', ref:'HPLC / enzymatic' },
            dairy_solids: { t:'Total Solids', desc:'Total solids represent the remaining dry mass after water is removed. Critical for milk powder evaporators and condensed milk processing yield calculations.', r:'5 – 60%', a:'±0.10% typical', m:'Liquid milk, evaporated milk, whey', ref:'ISO 6731 / Gravimetric' },
            dairy_moisture: { t:'Moisture in Powder', desc:'Moisture content determines storage lifespan and weight yield of dairy powders. Real-time fluid bed sensor feed prevents over-drying, preserving product weight.', r:'1 – 15%', a:'±0.08% in powders', m:'Skim milk powder, WPC, whey powder', ref:'ISO 5537 / Oven' },
            dairy_acidity: { t:'Titratable Acidity', desc:'Acidity levels indicate lactic fermentation progression in yogurt or cheese. Monitors product stability and raw milk freshness upon truck intake.', r:'0.1 – 2.5% Lactic Acid', a:'±0.02% typical', m:'Raw milk, liquid yogurt, whey', ref:'Soxhlet-Henkel / Titration' },
            
            // Chemical and Pharma
            pharma_assay: { t:'Active Ingredient Assay', desc:'Ensures precise API concentration in powder blends and finished dosages. High optical stability identifies variations in active molecule strength.', r:'0.1 – 99%', a:'±0.15% typical', m:'Active powders, granulates, tablets', ref:'Ph. Eur. / HPLC' },
            pharma_id: { t:'Raw Material Identification', desc:'Spectroscopic identification of excipients and raw APIs. Handheld or box scans verify incoming bags at dock doors in seconds with zero contamination.', r:'Classification Model', a:'&gt;99.8% specificity', m:'Cellulose, Lactose, active APIs', ref:'Ph. Eur. 2.2.40 / PCA' },
            pharma_moisture: { t:'Moisture in Granulates', desc:'Water content monitoring during fluid bed granulation. Prevents static issues (from over-drying) or binding issues (from under-drying).', r:'0.2 – 15%', a:'±0.08% typical', m:'Drying granulates, powders', ref:'Loss on Drying (LOD)' },
            pharma_uniformity: { t:'Blend Uniformity', desc:'Tracks standard deviations during powder bin blending. Tells operators exactly when the mix reaches homogeneity without stopping the blender.', r:'Continuous Deviation', a:'Correlation with reference RSD', m:'Rotating V-blender powder mixes', ref:'USP &lt;905&gt; / RSD' },
            pharma_polymer: { t:'Polymer Identification', desc:'Differentiates polymer types and molecular weights (e.g., HDPE, LDPE, PP) in chemical packaging or reactor feedstock, ensuring material specifications.', r:'Classification Model', a:'&gt;99.5% classification', m:'Plastic pellets, raw resin feed', ref:'FTIR / Raman correlation' },
            pharma_solvent: { t:'Solvent Composition', desc:'Measures alcohol-water or solvent ratio inside chemical reaction loops. Avoids manual sampling, ensuring pure conversions.', r:'1 – 99%', a:'±0.10% typical', m:'Liquid chemical loops, solvents', ref:'Gas Chromatography (GC)' }
        };

        const rows = paramList.querySelectorAll('.param-row');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                const key = row.dataset.param;
                const p = paramsDb[key];
                
                if (p) {
                    document.getElementById('detailTitle').textContent = p.t;
                    document.getElementById('detailDesc').textContent = p.desc;
                    document.getElementById('sv0').textContent = p.r;
                    document.getElementById('sv1').textContent = p.a;
                    document.getElementById('sv2').textContent = p.m;
                    document.getElementById('sv3').textContent = p.ref;
                    
                    rows.forEach(r => r.classList.remove('active'));
                    row.classList.add('active');
                }
            });
        });
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
                                <input type="checkbox" id="cookie-analytical" checked>
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
            keywords: "home homepage ft-nir spectroscopy process analytics main welcome index",
            snippet: "Advanced spectroscopy solutions. Next-generation inline FT-NIR analytical instruments for process control."
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
            snippet: "Find answers about FT-NIR technology, calibration models, hardware maintenance, and support services."
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
            snippet: "Overview of USTECH products: high-performance FT-NIR devices and process-control software solutions."
            },
            {
            title: "Analytical Devices & Hardware",
            url: "products-devices.html",
            category: "Products",
            keywords: "devices hardware proline2550 analyzer sensor probes inline at-line",
            snippet: "Explore our rugged industrial FT-NIR spectrometer systems, fiber-optic probes, and process interfaces."
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
            title: "USTECH MasterLine",
            url: "product-masterline.html",
            category: "Products",
            keywords: "USTECH MasterLine grain animal feed moisture protein fat ash fiber at-line cup",
            snippet: "Robust at-line analyzer designed for quality control of grains, meals, and finished animal feeds."
            },
            {
            title: "ProLine17ES Analyzer",
            url: "product-proline-17es.html",
            category: "Products",
            keywords: "ProLine17ES conveyor belt pipe chute continuous inline measurement sensor",
            snippet: "Continuous inline analyzer for real-time monitoring of raw materials on conveyor belts, chutes, and pipes."
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
            title: "FT-NIR Technology & Theory",
            url: "knowledge-technology.html",
            category: "Knowledge",
            keywords: "technology ft-nir theory mems interferometer reflectance transmission chemometrics calibration",
            snippet: "Learn the scientific principles behind FT-NIR spectroscopy, MEMS technology, and chemometrics."
            },
            {
            title: "Blogs & Application Notes",
            url: "knowledge-blogs.html",
            category: "Knowledge",
            keywords: "blog articles application notes case studies papers downloads whitepapers news",
            snippet: "Read the latest industry insights, application case studies, and scientific articles from our experts."
            },
            {
            title: "Calibration Transfer Feasibility on MEMS Spectrometers",
            url: "blog-calibration-transfer.html",
            category: "Knowledge",
            keywords: "calibration transfer feasibility mems spectrometers optical bias standard PDS",
            snippet: "Read our technical white paper detailing how unit-to-unit calibration transferability is solved by MEMS lithography."
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
            snippet: "White paper documenting the structural stress tolerances and lifetime cycles of USTECH chip-scale combs."
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
            title: "Rapid Moisture and Protein Analysis in Milk Powder using FT-NIR",
            url: "blog-milk-powder-analysis.html",
            category: "Knowledge",
            keywords: "rapid moisture protein analysis milk powder spray dryer discharge dairy composition",
            snippet: "Real-time monitoring of spray dryer discharge parameters using MEMS FT-NIR technology."
            },
            {
            title: "Real-Time Fat Analysis in Ground Beef Processing",
            url: "blog-ground-beef-fat.html",
            category: "Knowledge",
            keywords: "real-time fat analysis ground beef processing inline meat fat moisture measurement",
            snippet: "Inline measurement of fat and moisture concentration in ground beef lines using at-line and process FT-NIR systems."
            },
            {
            title: "Crude Fiber and Ash Content Determination in Feed Rations using FT-NIR",
            url: "blog-feed-fiber-ash.html",
            category: "Knowledge",
            keywords: "crude fiber ash content determination feed rations animal feed plants mill composition",
            snippet: "Controlling crude fiber, ash, and moisture parameters in animal feed plants using inline and at-line near-infrared spectroscopy."
            },
            {
            title: "Starch Damage and Gluten Verification in Wheat Semolina using FT-NIR",
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
            snippet: "Real-time tracking of hydroxyl value (OHV) and reaction endpoints in chemical reactors using fiber-optic-coupled FT-NIR."
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
            searchToggle.setAttribute('aria-label', 'Open Search');
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
                { title: "ProLine17ES Sensor", url: "product-proline-17es.html" },
                { title: "Food & Feed Solutions", url: "industry-food-feed.html" },
                { title: "B2B ROI Calculator", url: "contact.html#roi" },
                { title: "USTECH MasterLine", url: "product-masterline.html" }
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
                    { title: "USTECH MasterLine (Product)", url: "product-masterline.html" },
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
                groupTitle.innerHTML = `💡 ${ui('suggested_for')} "${query}"`;
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
                    dropdown.innerHTML = `<div class="search-no-results">${ui('no_suggestions')} "${query}"</div>`;
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

    // 11. Live Support System (Disabled for development - uncomment to re-enable)
    // injectLiveSupport();

    function injectLiveSupport() {
        // Representative Agents definitions
        const AGENTS = {
            sarah: {
                id: 'sarah',
                name: 'USTECH Support',
                role: 'Sales & General Inquiries',
                avatar: 'images/support_avatar_generic.webp',
                greeting: 'Hello! I am your USTECH Support Assistant. How can I help you today with quotes, product trials, or general inquiries?'
            },
            marcus: {
                id: 'marcus',
                name: 'USTECH Support',
                role: 'Technical & Scientific Support',
                avatar: 'images/support_avatar_generic.webp',
                greeting: 'Hello! I am here to assist with your scientific and technical questions, including chemometrics, calibrations, and spectroscopy technology. What can I answer for you?'
            }
        };

        // Default agent assigned on load
        let currentAgent = AGENTS.sarah;

        // Knowledge Base for Semantic Keyword Matching
        const KNOWLEDGE_BASE = [
            // Q1
            {
                keywords: ['chemical preparation', 'preparation', 'chemical usage', 'non-destructive', 'sample destruction'],
                agent: 'marcus',
                reply: 'No. Near-infrared spectroscopy is a completely non-destructive physical measurement. Light is projected onto the sample surface and its reflection is analyzed. There is absolutely no chemical usage, no waste disposal cost, and no sample destruction.'
            },
            // Q2
            {
                keywords: ['accuracy', 'wet chemistry', 'repeatability', 'precision', 'reference methods', 'traditional lab'],
                agent: 'marcus',
                reply: 'FT-NIR is a secondary analytical method, meaning it is calibrated against primary laboratory reference methods (such as wet chemistry). Once calibrated, it achieves repeatability and accuracy extremely close to the reference methods, with the benefit of being infinitely faster (seconds vs. hours), eliminating human operator error, and requiring no consumables or hazardous reagents.'
            },
            // Q3
            {
                keywords: ['difference', 'filter-based', 'diode array', 'resolution', 'spectral resolution'],
                agent: 'marcus',
                reply: 'Filter-based systems measure only a few specific wavelengths, limiting their flexibility. Diode Array systems measure multiple wavelengths but have lower spectral resolution. FT-NIR uses an interferometer to scan the entire near-infrared spectrum continuously at extremely high resolution, providing superior accuracy, better calibration stability, and the ability to detect trace constituents.'
            },
            // Q4
            {
                keywords: ['mems', 'scanning grating', 'interferometer', 'solid-state', 'vibration', 'rugged', 'moving parts'],
                agent: 'marcus',
                reply: 'Scanning grating spectrometers rely on delicate moving mirrors and gratings that are highly sensitive to vibration, temperature changes, and wear. MEMS-based spectrometers (like USTECH\'s optical engines) use solid-state micro-electromechanical systems etched directly onto silicon. They contain no macro-scale moving parts, making them extremely rugged, shock-resistant, and thermally stable for harsh production floors.'
            },
            // Q5
            {
                keywords: ['waveband', 'range', 'wavelength', 'nanometer', 'nm', '800', '2600', '12500', '3850', 'absorption bands'],
                agent: 'marcus',
                reply: 'USTECH FT-NIR instruments operate in the 800 nm to 2600 nm waveband (12,500 to 3,850 cm¹). This broad range covers the key absorption bands for C-H, O-H, and N-H molecular bonds, allowing for comprehensive analysis of moisture, protein, fat, starch, fiber, and ash.'
            },
            // Q6
            {
                keywords: ['trace', 'below 0.1%', 'ppm', 'lowest concentration', 'detection limit'],
                agent: 'marcus',
                reply: 'NIR spectroscopy is highly sensitive, but its practical detection limit is typically around 0.1% (1000 ppm) for organic constituents under standard conditions. For concentrations below this threshold, accuracy depends heavily on the sample matrix and the precision of the primary reference method used to train the calibration model.'
            },
            // Q7
            {
                keywords: ['tornado', 'mill', 'heating', 'cooling', 'water loop', 'grinding', 'evaporation', 'fat melting'],
                agent: 'marcus',
                reply: 'The USTECH Tornado+ mill features a double-walled grinding chamber connected to a continuous liquid water-cooling loop. When grinding grain or high-fat feed samples, the cooling liquid rapidly dissipates motor friction heat, keeping the chamber cold and preventing moisture evaporation or fat melting.'
            },
            // Q8
            {
                keywords: ['light source', 'bulb', 'lamp', 'halogen', '20000', 'hours', 'redundancy', 'backup lamp', 'proline17es'],
                agent: 'marcus',
                reply: 'Our online analyzers use long-life halogen lamps rated for over 20,000 operating hours. In addition, the systems are equipped with dual-lamp redundancy: if the primary lamp fails, the analyzer automatically rotates the backup lamp into place and triggers an alert, ensuring zero process downtime.'
            },
            // Q9
            {
                keywords: ['physical samples', 'solids', 'grains', 'powders', 'liquids', 'slurries', 'pastes', 'vials', 'vial rotator', 'flow cell'],
                agent: 'marcus',
                reply: 'Our FT-NIR systems can analyze a wide variety of sample forms. Solids, grains, and powders are measured using vials, vials rotators, or petri dish scanners. Liquids, slurries, and pastes are measured using transmission accessories, transflection fiber probes, or inline flow cells mounted directly on pipelines.'
            },
            // Q10
            {
                keywords: ['starchqc', 'damaged starch', 'amperometric', 'degradation', 'enzymes', 'kinetics'],
                agent: 'marcus',
                reply: 'The USTECH StarchQC Damaged Starch analyzer utilizes an amperometric technique to measure starch degradation kinetics. By exposing a small flour sample to specific enzymes, the analyzer measures the electrochemical reaction rate as damaged starch is broken down, giving a highly accurate damaged starch percentage in minutes.'
            },
            // Q11
            {
                keywords: ['protective window', 'window', 'sapphire', 'wiper', 'clean', 'purge', 'buildup'],
                agent: 'marcus',
                reply: 'Yes, inline sensors require a protective window, and how is it kept clean? Yes, inline sensors use a high-durability sapphire optical window to separate the sensor optics from the product flow. Sapphire is extremely scratch-resistant (9 on Mohs scale). To prevent product buildup, we offer automatic air-purge collars or mechanical wipers that sweep the window clean at defined intervals without stopping the production line.'
            },
            // Q12
            {
                keywords: ['path length', 'pathlength', 'transmission', 'liquid analysis', 'transflection'],
                agent: 'marcus',
                reply: 'The optimal path length depends on the chemical composition and absorption strength of the liquid. For water-based liquids or solvents in the transmission NIR region, path lengths typically range from 1 mm to 8 mm. We offer adjustable transflection and transmission probes to easily tune this path length for your specific fluid matrix.'
            },
            // Q13
            {
                keywords: ['warranty', 'guarantee', 'service contract', 'maintenance', 'support plan'],
                agent: 'sarah',
                reply: 'All USTECH FT-NIR instruments and sensors come with a standard 12-month comprehensive warranty. We also offer extended warranty programs and annual service contracts that cover preventive maintenance, optical alignment checks, and light source replacements.'
            },
            // Q14
            {
                keywords: ['plc', 'scada', 'integration', 'integrate', 'modbus', 'opc ua', 'siemens', 'allen-bradley', 'prochem'],
                agent: 'marcus',
                reply: 'Yes, absolutely. Our ProChem software suite is designed with industrial communication protocols in mind. It natively supports OPC UA, Modbus TCP, and direct analog/digital outputs (4-20 mA) to communicate results directly to PLC systems (such as Siemens, Allen-Bradley) or SCADA platforms within 15-30 seconds.'
            },
            // Q15
            {
                keywords: ['closed loop', 'control', 'pid', 'valves', 'setpoint', 'parameters'],
                agent: 'marcus',
                reply: 'ProChem calculates real-time chemical concentration values and sends them to the plant SCADA/PLC. The PLC compares these values against the setpoints (e.g., target moisture) and modulates control valves (e.g., steam or water spray) using PID loops. ProChem also includes built-in safety boundaries to ignore readings during process start/stop phases.'
            },
            // Q16
            {
                keywords: ['calix', 'fda', '21 cfr', 'cfr', 'part 11', 'compliance', 'signature', 'audit trail'],
                agent: 'marcus',
                reply: 'Yes. The caliX Suite supports full electronic signature tracking, secure multi-user role permission levels, complete audit trail logging of all calibration modifications, and raw data export validation. It fully complies with the strict documentation and integrity standards mandated by 21 CFR Part 11 and GMP Annex 11.'
            },
            // Q17
            {
                keywords: ['offline', 'network drop', 'connection lost', 'air gap'],
                agent: 'marcus',
                reply: 'Yes. While the caliX cloud dashboard manages calibrations and fleet diagnostics centrally, all local measurement logic, optical calculations, and PLC communication interfaces run locally on the instrument\'s dedicated PC. If the internet or internal network drops, the system continues running offline without any data loss or process interruption.'
            },
            // Q18
            {
                keywords: ['cybersecurity', 'encryption', 'tls', 'outbound', 'network security'],
                agent: 'marcus',
                reply: 'All data communication between the local instrument PC and the caliX Cloud is fully encrypted using TLS 1.3. The local client agent only establishes outbound connections; no inbound ports are ever opened on the plant network. Furthermore, the local PC can be completely air-gapped from the internet if corporate security policies prohibit cloud connectivity.'
            },
            // Q19
            {
                keywords: ['custom dashboards', 'pdf', 'quality reports', 'report', 'certificate of analysis', 'coa'],
                agent: 'sarah',
                reply: 'Yes. ProChem features a flexible reporting template engine. You can configure the software to generate automated PDF certificates of analysis (COAs) at the end of each production lot. These reports can include statistical summaries, outlier warnings, and charts, and can be automatically emailed to QA managers or stored on a local network drive.'
            },
            // Q20
            {
                keywords: ['share calibrations', 'unit-to-unit', 'n-sens', 'mems silicon', 'calibration model'],
                agent: 'marcus',
                reply: 'Yes. Because our optical engines are built using MEMS silicon chips rather than handcrafted glass and mirror components, unit-to-unit variation is practically non-existent. A calibration model built in the caliX software suite can be deployed instantly to multiple devices without the need for manual model matching.'
            },
            // Q21
            {
                keywords: ['maintenance', 'update', 'chemometric support', 'validation', 'optimize'],
                agent: 'marcus',
                reply: 'USTECH offers comprehensive support. Through the caliX Suite, users can upload new reference data to automatically update regression models. We also offer remote chemometric support, where our expert specialists connect securely to review model performance, run validation tests, and optimize calibrations remotely.'
            },
            // Q22
            {
                keywords: ['outlier', 'mahalanobis', 'distance', 't2', 'hotelling', 'alarm'],
                agent: 'marcus',
                reply: 'An outlier is a sample whose spectral signature deviates significantly from the calibration dataset (due to foreign materials, extreme density changes, or parameters outside the model\'s range). Our software calculates the Mahalanobis Distance for every scan. If a sample is flagged as an outlier, the system alerts the operator and ignores the reading to prevent false data from affecting PLC control loops.'
            },
            // Q23
            {
                keywords: ['samples', 'custom calibration', 'reference samples', 'pls model', '50', '100'],
                agent: 'marcus',
                reply: 'To build a robust custom PLS (Partial Least Squares) calibration model from scratch, we generally recommend a minimum of 50 to 100 sample points spanning the entire expected range of values. However, USTECH provides pre-installed global calibration databases for most feed, grain, dairy, and polymer applications, meaning you can start analyzing on day one with only a few verification points.'
            },
            // Q24
            {
                keywords: ['calibration transfer', 'foss', 'bruker', 'thermo', 'transfer model', 'older device'],
                agent: 'marcus',
                reply: 'Yes. Our chemometricians have extensive experience transferring calibration databases from older scanning monochromators or photodiode-array instruments (e.g., FOSS, Bruker, Thermo) to USTECH FT-NIR devices. We utilize mathematical standardization algorithms to match the spectral profile and save years of reference analysis work.'
            },
            // Q25
            {
                keywords: ['modeling algorithms', 'pls', 'pca', 'mlr', 'svm', 'regression', 'pre-processing', 'math'],
                agent: 'marcus',
                reply: 'The caliX Suite supports a wide range of chemometric modeling tools. For quantitative analysis, it supports PLS (Partial Least Squares), MLR (Multiple Linear Regression), and advanced Machine Learning models. For qualitative classification, it supports PCA (Principal Component Analysis), SIMCA (Soft Independent Modeling of Class Analogy), and SVM (Support Vector Machines).'
            },
            // Q26
            {
                keywords: ['roi', 'return on investment', 'saving', 'payback', 'cost reduction'],
                agent: 'sarah',
                reply: 'Most industrial processing plants achieve a full Return on Investment within 6 to 12 months. Savings are realized through reduced raw material giveaway (closed-loop tolerance management), elimination of out-of-specification batches, lower laboratory labor costs, and reduced energy usage from optimized drying and mixing processes.'
            },
            // Q27
            {
                keywords: ['optical re-alignment', 'realignment', 'alignment', 'factory calibration'],
                agent: 'marcus',
                reply: 'Never. Unlike traditional laboratory FT-NIR spectrometers that use rotating mirrors and laser-guided interferometers which require periodic realignment, our MEMS interferometers are solid-state and permanent. The optical paths are fixed at the factory, ensuring permanent wavelength calibration stability.'
            },
            // Q28
            {
                keywords: ['routine maintenance', 'clean window', 'weekly', 'bulb', 'wiper seals'],
                agent: 'sarah',
                reply: 'Routine maintenance is minimal. For benchtop systems, operators should clean the sample window weekly and run a standard reference scan using the built-in gold reference plate. For online sensors, the main maintenance task is replacing the light bulb every 2-3 years and verifying the window wiper seals during annual plant shutdowns.'
            },
            // Q29
            {
                keywords: ['training', 'operator training', 'class', 'workshop'],
                agent: 'sarah',
                reply: 'Yes. Every instrument installation includes comprehensive on-site training. We cover basic system operation, sample preparation, software interface navigation, and routine maintenance troubleshooting. We also offer advanced chemometrics training for QA managers who want to develop and maintain their own calibrations.'
            },
            // Q30
            {
                keywords: ['installation time', 'install', 'commissioning', 'setup time', 'pipeline sensor fitting'],
                agent: 'sarah',
                reply: 'A typical pipeline sensor installation takes 1 to 2 days of physical fitting and sensor configuration. We coordinate with your engineering teams to mount the sensor flange during scheduled maintenance windows, followed by electrical connections, PLC communication validation, and calibration verification.'
            },
            // Extra: Quote request shortcut
            {
                keywords: ['request a quote', 'request quote', 'get quote', 'sales contact'],
                agent: 'sarah',
                reply: 'I would be happy to help you get a quote! Please let me know your contact details or email, or visit our <a href="contact.html" style="color:var(--accent-gold);text-decoration:underline;">Contact</a> page to submit your details directly to our sales department.'
            }
        ];

        // Create elements
        const supportBtn = document.createElement('button');
        supportBtn.className = 'live-support-btn';
        supportBtn.id = 'live-support-btn';
        supportBtn.setAttribute('aria-label', 'Live Support');
        supportBtn.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div class="live-support-badge" id="live-support-badge">1</div>
        `;

        const supportPanel = document.createElement('div');
        supportPanel.className = 'live-support-panel';
        supportPanel.id = 'live-support-panel';
        supportPanel.innerHTML = `
            <div class="live-support-header">
                <div class="live-support-agent-profile">
                    <div style="position: relative; width: 44px; height: 44px;">
                        <img id="live-support-avatar" src="${currentAgent.avatar}" alt="${currentAgent.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-gold);">
                        <span class="live-support-status-dot" style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background-color: #4caf50; border-radius: 50%; border: 2px solid var(--bg-primary);"></span>
                    </div>
                    <div class="live-support-agent-info" style="display: flex; flex-direction: column;">
                        <h4 id="live-support-agent-name" style="margin: 0; color: #ffffff; font-size: 0.95rem; font-weight: 700; font-family: var(--font-title);">${currentAgent.name}</h4>
                        <span id="live-support-agent-role" style="font-size: 0.75rem; color: rgba(255,255,255,0.7);">${currentAgent.role}</span>
                    </div>
                </div>
                <button class="live-support-close-btn" id="live-support-close-btn" aria-label="Close Chat">&times;</button>
            </div>
            <div class="live-support-chat-log" id="live-support-chat-log"></div>
            <div class="chat-suggestions" id="chat-suggestions" style="display: flex; gap: 0.5rem; padding: 0.75rem 1rem; background-color: var(--bg-primary); border-top: 1px solid var(--border-color); overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;">
                <button class="chat-suggestion-chip" data-msg="Request a Quote">Request Quote</button>
                <button class="chat-suggestion-chip" data-msg="How does caliX AutoML work?">cali<span class="calix-x">X</span> AutoML</button>
                <button class="chat-suggestion-chip" data-msg="How does calibration transfer work?">Calibration Transfer</button>
                <button class="chat-suggestion-chip" data-msg="Connect analyzer to PLC">PLC SCADA Link</button>
            </div>
            <div class="live-support-footer">
                <input type="text" id="live-support-input" placeholder="Type your message..." autocomplete="off">
                <button class="live-support-send-btn" id="live-support-send-btn" aria-label="Send Message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(supportBtn);
        document.body.appendChild(supportPanel);

        const badge = document.getElementById('live-support-badge');
        const chatLog = document.getElementById('live-support-chat-log');
        const input = document.getElementById('live-support-input');
        const sendBtn = document.getElementById('live-support-send-btn');
        const closeBtn = document.getElementById('live-support-close-btn');
        const suggestionChips = document.querySelectorAll('.chat-suggestion-chip');
        const avatarImg = document.getElementById('live-support-avatar');
        const agentName = document.getElementById('live-support-agent-name');
        const agentRole = document.getElementById('live-support-agent-role');

        let isOpened = false;
        let transferPending = false; // State to track offline form input

        // Toggle panel open
        supportBtn.addEventListener('click', () => {
            supportPanel.classList.add('open');
            if (badge) badge.style.display = 'none'; // hide badge on open
            if (!isOpened) {
                // Initialize default greeting
                addMessage("agent", currentAgent.greeting);
                isOpened = true;
            }
            chatLog.scrollTop = chatLog.scrollHeight;
        });

        // Close panel
        closeBtn.addEventListener('click', () => {
            supportPanel.classList.remove('open');
        });

        // Click outside closes it
        document.addEventListener('click', (e) => {
            if (!supportPanel.contains(e.target) && !supportBtn.contains(e.target) && supportPanel.classList.contains('open')) {
                supportPanel.classList.remove('open');
            }
        });

        // Send message handlers
        sendBtn.addEventListener('click', handleUserSend);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleUserSend();
        });

        // Suggestion chips
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const text = chip.getAttribute('data-msg');
                addMessage("user", text);
                chatLog.scrollTop = chatLog.scrollHeight;
                triggerAgentReply(text);
            });
        });

        function handleUserSend() {
            const val = input.value.trim();
            if (!val) return;

            addMessage("user", val);
            input.value = '';
            chatLog.scrollTop = chatLog.scrollHeight;

            triggerAgentReply(val);
        }

        function switchAgent(targetAgentId) {
            const nextAgent = AGENTS[targetAgentId];
            if (nextAgent && currentAgent.id !== nextAgent.id) {
                currentAgent = nextAgent;
                // Update header UI
                avatarImg.src = currentAgent.avatar;
                avatarImg.alt = currentAgent.name;
                agentName.textContent = currentAgent.name;
                agentRole.textContent = currentAgent.role;

                // Add system message to log
                const sysMsg = document.createElement('div');
                sysMsg.className = 'chat-system-message';
                sysMsg.style.cssText = 'text-align: center; font-size: 0.75rem; color: var(--text-muted); margin: 0.5rem 0; font-style: italic;';
                sysMsg.textContent = `Session routed to: ${currentAgent.role}`;
                chatLog.appendChild(sysMsg);
            }
        }

        function addMessage(sender, text) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const bubble = document.createElement('div');
            bubble.className = `chat-message ${sender}`;
            bubble.innerHTML = `
                <div>${text}</div>
                <div class="chat-message-time">${time}</div>
            `;
            chatLog.appendChild(bubble);
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        function triggerAgentReply(userMsg) {
            // Show typing indicator
            const typingBubble = document.createElement('div');
            typingBubble.className = 'chat-message agent';
            typingBubble.id = 'support-typing';
            typingBubble.innerHTML = `<div><em>Typing...</em></div>`;
            chatLog.appendChild(typingBubble);
            chatLog.scrollTop = chatLog.scrollHeight;

            setTimeout(() => {
                const typing = document.getElementById('support-typing');
                if (typing) typing.remove();

                // If user is filling offline lead email form
                if (transferPending) {
                    handleOfflineFormSubmit(userMsg);
                    return;
                }

                const result = getSmartReply(userMsg);
                
                // Perform agent auto-switch if response suggests another agent
                if (result.suggestedAgent && result.suggestedAgent !== currentAgent.id) {
                    switchAgent(result.suggestedAgent);
                }

                addMessage("agent", result.reply);
                chatLog.scrollTop = chatLog.scrollHeight;

                if (result.triggerHandoff) {
                    transferPending = true;
                }
            }, 1000);
        }

        function handleOfflineFormSubmit(emailText) {
            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailText)) {
                // Show sending message
                addMessage("agent", "Sending your support request directly to our team... Please wait.");
                chatLog.scrollTop = chatLog.scrollHeight;

                // Compile chat history for the support team
                const messageElements = chatLog.querySelectorAll('.chat-message');
                let conversationSummary = "";
                messageElements.forEach(msgEl => {
                    const isUser = msgEl.classList.contains('user');
                    const sender = isUser ? "User" : "Agent/Bot";
                    const text = msgEl.innerText || msgEl.textContent;
                    conversationSummary += `[${sender}]: ${text}\n\n`;
                });

                // Web3Forms payload
                const payload = {
                    access_key: "2791c5d7-ecdd-4b3e-90fa-f6e33964a84d",
                    from_name: "USTECH Live Support",
                    subject: `Live Support Inquiry from ${emailText}`,
                    email: emailText,
                    message: `User Work Email: ${emailText}\n\n--- Chat Conversation Log ---\n\n${conversationSummary}`
                };

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (response.status === 200) {
                        addMessage("agent", `Thank you! Your inquiry has been successfully sent to our support team. We will contact you at <strong>${emailText}</strong> within 24 hours. <br><br>If you need to send files or immediate attachments, feel free to use our backup mail link: <a href="mailto:info@ustechinnovations.com?subject=Live Support Request&body=Hi USTECH Team, please follow up with me at ${emailText} regarding my query." style="color:var(--accent-gold);text-decoration:underline;">Send Email Directly</a>.`);
                    } else {
                        addMessage("agent", `Your request was logged locally, but the auto-send encountered a network issue. Please click this backup link to submit your request directly: <a href="mailto:info@ustechinnovations.com?subject=Live Support Request&body=Hi USTECH Team, please follow up with me at ${emailText} regarding my query." style="color:var(--accent-gold);text-decoration:underline;">Send Email Directly</a>.`);
                    }
                    chatLog.scrollTop = chatLog.scrollHeight;
                })
                .catch(error => {
                    console.error("Web3Forms submission error:", error);
                    addMessage("agent", `Your request was logged locally, but the auto-send encountered a network issue. Please click this backup link to submit your request directly: <a href="mailto:info@ustechinnovations.com?subject=Live Support Request&body=Hi USTECH Team, please follow up with me at ${emailText} regarding my query." style="color:var(--accent-gold);text-decoration:underline;">Send Email Directly</a>.`);
                    chatLog.scrollTop = chatLog.scrollHeight;
                });

                transferPending = false;
            } else {
                addMessage("agent", "That email address doesn't seem valid. Please enter a valid company email address so we can route your ticket correctly, or mail us at info@ustechinnovations.com.");
            }
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        function getSmartReply(msg) {
            const cleanMsg = msg.toLowerCase().replace(/[^\w\s]/g, ' ');
            const userWords = cleanMsg.split(/\s+/).filter(w => w.length > 2);

            if (userWords.length === 0) {
                return {
                    reply: "I'm not sure I understood. Could you please specify your question, or ask about our devices (ProLine2550), caliX software, or request a quote?",
                    suggestedAgent: currentAgent.id
                };
            }

            let bestMatch = null;
            let highestScore = 0;

            for (const item of KNOWLEDGE_BASE) {
                let score = 0;
                for (const keyword of item.keywords) {
                    // Direct contains or word matching
                    if (cleanMsg.includes(keyword)) {
                        score += 1.0;
                    }
                    // Part of keyword matching
                    for (const word of userWords) {
                        if (keyword.includes(word) && word.length > 3) {
                            score += 0.4;
                        }
                    }
                }
                // Normalize by keywords length to prevent longer keyword lists from dominating unfairly
                score = score / Math.sqrt(item.keywords.length);

                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = item;
                }
            }

            // Score threshold check
            if (highestScore >= 0.25 && bestMatch) {
                return {
                    reply: bestMatch.reply,
                    suggestedAgent: bestMatch.agent
                };
            }

            // Fallback to offline handoff form
            return {
                reply: "I couldn't find a direct answer in our technical databases. Would you like to transfer your query directly to our support team? <br><br><strong>Please type your email address below</strong> and we'll contact you shortly.",
                suggestedAgent: 'sarah',
                triggerHandoff: true
            };
        }
    }

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
                    if (messageLabel) messageLabel.textContent = 'Application Details / Message';
                    if (messageTextarea) messageTextarea.placeholder = 'Briefly describe your measurement challenge (e.g. moisture control in corn feed)...';
                } else if (target === 'support') {
                    salesFields.forEach(f => f.style.display = 'none');
                    supportFields.forEach(f => f.style.display = 'block');
                    generalFields.forEach(f => f.style.display = 'none');
                    if (messageLabel) messageLabel.textContent = 'Describe the Technical Issue';
                    if (messageTextarea) messageTextarea.placeholder = 'Please describe the symptoms, error messages, or calibration behavior in detail...';
                } else if (target === 'general') {
                    salesFields.forEach(f => f.style.display = 'none');
                    supportFields.forEach(f => f.style.display = 'none');
                    generalFields.forEach(f => f.style.display = 'block');
                    if (messageLabel) messageLabel.textContent = 'Your Inquiry / Message';
                    if (messageTextarea) messageTextarea.placeholder = 'Please type your general question or partnership proposal details here...';
                }
            });
        });
    }

    // 15.5. AJAX Form Submission via Web3Forms
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

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
                    alert("Submission failed: " + (res.message || "Unknown error"));
                }
            })
            .catch(error => {
                console.log(error);
                alert("An error occurred during submission. Please try again later.");
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
            title: "Calibration Transfer Feasibility on MEMS Spectrometers",
            image: "images/blog_mems_sensor.webp",
            industry: "general-tech",
            type: "WHITE PAPER",
            snippet: "How MEMS optical tolerances enable unit-to-unit calibration transferability without adjustments."
            },
            {
            url: "blog-cattle-feed-waste.html",
            title: "Reducing Ingredient Waste in Cattle Feed",
            image: "images/blog_cattle_feed.webp",
            industry: "food-feed",
            type: "CASE STUDY",
            snippet: "Learn how inline NIR sensors over feed mixer exits improved yield by 1.2%."
            },
            {
            url: "blog-pls-regression-calix.html",
            title: "Introduction to PLS Regression in caliX Suite",
            image: "images/blog_pls_regression.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "A step-by-step tutorial explaining how to compile calibration models from reference wet chemistry."
            },
            {
            url: "blog-hydroxyl-value-polyol.html",
            title: "Real-Time Hydroxyl Value Monitoring in Polyol Production",
            image: "images/blog_polyol_reactors.webp",
            industry: "chemical-pharma",
            type: "WHITE PAPER",
            snippet: "Detailed white paper explaining the real-time inline tracking of OHV in chemical polymerization processes."
            },
            {
            url: "blog-moisture-milk-powder.html",
            title: "Standardizing Moisture in Milk Powder Spray Drying",
            image: "images/blog_milk_powder.webp",
            industry: "dairy",
            type: "CASE STUDY",
            snippet: "Optimize yields and prevent sticky powder clogs on spray dryer discharges."
            },
            {
            url: "blog-savitzky-golay-filtering.html",
            title: "Understanding Savitzky-Golay Preprocessing",
            image: "images/blog_spectral_math.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "A mathematical breakdown of smoothing filters, parameters, and derivatives for NIR spectra."
            },
            {
            url: "blog-blend-uniformity-pharma.html",
            title: "Blend Uniformity Verification in Active Pharmas",
            image: "images/blog_pharma_blending.webp",
            industry: "chemical-pharma",
            type: "CASE STUDY",
            snippet: "Verify dry powder homogeneity dynamically inside bin blenders without stopping."
            },
            {
            url: "blog-mems-durability-industrial.html",
            title: "MEMS Comb-Drive Mechanical Durability in Industrial Environments",
            image: "images/blog_mems_durability.webp",
            industry: "general-tech",
            type: "WHITE PAPER",
            snippet: "Shock resistance, lifetime cycles, and structural stress tolerances of silicon chip-scale combs."
            },
            {
            url: "blog-pca-classification-models.html",
            title: "Developing Robust Classification Models via PCA",
            image: "images/blog_pca_chemometrics.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "Methodology explaining Principal Component Selection for raw material identification."
            },
            {
            url: "blog-starch-extraction-milling.html",
            title: "Optimizing Starch Extraction Efficiency in Wet Milling",
            image: "images/blog_starch_milling.webp",
            industry: "food-feed",
            type: "CASE STUDY",
            snippet: "How a processing plant used at-line NIR composition monitoring to maximize corn starch yield."
            },
            {
            url: "blog-fiber-interface-reactors.html",
            title: "Optical Fiber Interface Designs for Corrosive Reactors",
            image: "images/blog_fiber_reactors.webp",
            industry: "chemical-pharma",
            type: "WHITE PAPER",
            snippet: "Probes using sapphire windows and Hastelloy materials for high pressure and temperature loops."
            },
            {
            url: "blog-opc-ua-dosing-valves.html",
            title: "Standardizing OPC UA Integrations for Closed-Loop Dosing Valves",
            image: "images/blog_opc_ua_plc.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "A guide mapping process OPC UA tags directly to spectrometer predictions for automated dosing valves."
            },
            {
            url: "blog-milk-powder-analysis.html",
            title: "Rapid Moisture and Protein Analysis in Milk Powder",
            image: "images/blog_milk_spray_drying.webp",
            industry: "dairy",
            type: "WHITE PAPER",
            snippet: "Real-time monitoring of moisture and protein parameters in spray dryer discharge using MEMS FT-NIR technology."
            },
            {
            url: "blog-ground-beef-fat.html",
            title: "Real-Time Fat Analysis in Ground Beef Processing",
            image: "images/blog_ground_beef.webp",
            industry: "food-feed",
            type: "WHITE PAPER",
            snippet: "Inline measurement of fat and moisture concentration in ground beef lines using at-line and process FT-NIR systems."
            },
            {
            url: "blog-feed-fiber-ash.html",
            title: "Crude Fiber and Ash Content Determination in Feed Rations",
            image: "images/blog_feed_analysis.webp",
            industry: "food-feed",
            type: "WHITE PAPER",
            snippet: "Controlling crude fiber, ash, and moisture parameters in animal feed plants using inline FT-NIR."
            },
            {
            url: "blog-semolina-starch-gluten.html",
            title: "Starch Damage and Gluten Verification in Wheat Semolina",
            image: "images/blog_semolina_gluten.webp",
            industry: "food-feed",
            type: "WHITE PAPER",
            snippet: "Inline quality monitoring of semolina parameters including wet gluten, index, and starch damage."
            },
            {
            url: "blog-polymerization-hydroxyl.html",
            title: "Hydroxyl Value Monitoring in Polymerization Processes",
            image: "images/blog_hydroxyl_value.webp",
            industry: "chemical-pharma",
            type: "WHITE PAPER",
            snippet: "Real-time tracking of hydroxyl value (OHV) in chemical reactors using fiber-optic-coupled FT-NIR."
            },
            {
            url: "blog-olive-oil-acidity.html",
            title: "FFA Monitoring in Olive Oil Processing",
            image: "images/blog_olive_oil_acidity.webp",
            industry: "food-feed",
            type: "WHITE PAPER",
            snippet: "Simultaneous determination of free fatty acidity, moisture, and peroxide value at decanter discharge."
            },
            {
            url: "blog-bioreactor-cell-culture.html",
            title: "Bioreactor Feeding Optimization in Mammalian Cell Culture",
            image: "images/blog_bioreactor_cell.webp",
            industry: "chemical-pharma",
            type: "CASE STUDY",
            snippet: "Real-time inline monitoring of glucose, lactate, and viable cell density inside bioreactors."
            },
            {
            url: "blog-milk-adulteration-receiving.html",
            title: "Rapid Adulteration Detection in Raw Milk Receiving",
            image: "images/blog_milk_adulteration.webp",
            industry: "dairy",
            type: "CASE STUDY",
            snippet: "Screening raw milk tankers for added water, urea, and melamine in seconds."
            },
            {
            url: "blog-outlier-detection-mahalanobis.html",
            title: "Chemometric Outlier Detection: Mahalanobis Distance vs. Hotelling's T²",
            image: "images/blog_outlier_detection.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "A detailed guide explaining outlier threshold limits for regression and classification calibrations."
            },
            {
            url: "blog-wavelength-selection-ipls.html",
            title: "Wavelength Selection & Feature Engineering for NIR Models",
            image: "images/blog_wavelength_selection.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "How to use Genetic Algorithms and iPLS in the caliX suite to select optimal wavelength bands."
            },
            {
            url: "blog-soybean-crush-yield.html",
            title: "Optimizing Oil and Protein Extraction in Soybean Crush Plants",
            image: "images/blog_feed_analysis.webp",
            industry: "food-feed",
            type: "CASE STUDY",
            snippet: "Maximize extraction yield and prevent protein giveaway during commercial oilseed crush operations."
            },
            {
            url: "blog-petfood-extrusion-moisture.html",
            title: "Moisture and Fat Standardization in Pet Food Extrusion",
            image: "images/blog_cattle_feed.webp",
            industry: "food-feed",
            type: "WHITE PAPER",
            snippet: "Achieving batch-to-batch consistency and shelf-life protection in commercial kibble production."
            },
            {
            url: "blog-corn-gluten-dryer.html",
            title: "Real-Time Moisture Control in Corn Gluten Feed Dryers",
            image: "images/blog_starch_milling.webp",
            industry: "food-feed",
            type: "CASE STUDY",
            snippet: "Continuous moisture standardization to reduce thermal drying energy costs and stabilize protein content."
            },
            {
            url: "blog-flour-ash-milling.html",
            title: "Continuous Ash and Protein Monitoring in Wheat Flour Milling",
            image: "images/blog_semolina_gluten.webp",
            industry: "food-feed",
            type: "GUIDE",
            snippet: "Ensure absolute flour quality grading and optimize flour extraction margins in dry milling lines."
            },
            {
            url: "blog-cheese-yield-prediction.html",
            title: "Evaluating Cheese Yield Prediction Models Using caliX",
            image: "images/blog_mems_sensor.webp",
            industry: "dairy",
            type: "GUIDE",
            snippet: "Maximize cheese manufacturing yield by predicting vat outcomes using chemometric modelling."
            },
            {
            url: "blog-liquid-milk-standardization.html",
            title: "Optimizing Fat and Protein Standardization in Liquid Milk",
            image: "images/blog_milk_spray_drying.webp",
            industry: "dairy",
            type: "WHITE PAPER",
            snippet: "Direct closed-loop dosing valves to hit fat targets with high repeatabilities."
            },
            {
            url: "blog-whey-permeate-evaporator.html",
            title: "Total Solids Control in Whey Permeate Evaporators",
            image: "images/blog_milk_powder.webp",
            industry: "dairy",
            type: "CASE STUDY",
            snippet: "Stabilizing evaporator output density to prevent crystallization and optimize dryer feed rate."
            },
            {
            url: "blog-butter-fat-moisture.html",
            title: "Inline Fat and Moisture Standardization in Continuous Butter Making",
            image: "images/blog_milk_spray_drying.webp",
            industry: "dairy",
            type: "WHITE PAPER",
            snippet: "Maximize weight yield and maintain strict legal water limits (16.0% max) in continuous butter churns."
            },
            {
            url: "blog-yogurt-fermentation-lactic.html",
            title: "Monitoring Lactic Acid and pH in Yogurt Fermentation",
            image: "images/blog_milk_adulteration.webp",
            industry: "dairy",
            type: "WHITE PAPER",
            snippet: "Improve yogurt batch consistency and prevent post-acidification using continuous acidity scans."
            },
            {
            url: "blog-cheese-moisture-milling.html",
            title: "Moisture and Salt Monitoring in Cheddar Cheese Milling",
            image: "images/blog_mems_sensor.webp",
            industry: "dairy",
            type: "CASE STUDY",
            snippet: "Grade cheese curd splits dynamically and optimize salt-to-moisture ratios in real-time."
            },
            {
            url: "blog-dairy-receiving-total-solids.html",
            title: "Incoming Milk Fat and Total Solids Grading at Receiving Docks",
            image: "images/blog_milk_adulteration.webp",
            industry: "dairy",
            type: "GUIDE",
            snippet: "Grade raw milk tanker deliveries instantly and standardise intake value parameters."
            },
            {
            url: "blog-pharma-granulation-moisture.html",
            title: "Moisture Monitoring in Fluid Bed Granulation",
            image: "images/blog_pharma_blending.webp",
            industry: "chemical-pharma",
            type: "CASE STUDY",
            snippet: "Achieve consistent active pharmaceutical powder granulation drying cycles using inline moisture probes."
            },
            {
            url: "blog-solvent-distillation-purity.html",
            title: "Inline Solvent Purity Monitoring in Chemical Distillation Columns",
            image: "images/blog_fiber_reactors.webp",
            industry: "chemical-pharma",
            type: "WHITE PAPER",
            snippet: "Control reflux ratios and optimize distillation energy input via real-time binary fraction analysis."
            },
            {
            url: "blog-packaging-polymer-density.html",
            title: "Density and Crystallinity Grading of Polyethylene Packaging",
            image: "images/blog_polyol_reactors.webp",
            industry: "chemical-pharma",
            type: "GUIDE",
            snippet: "Ensure incoming polymer film barrier properties and density grading using rapid reflectance scans."
            },
            {
            url: "blog-pharma-raw-material-id.html",
            title: "Incoming Raw Material Identification in Pharmaceutical Warehouses",
            image: "images/blog_pharma_blending.webp",
            industry: "chemical-pharma",
            type: "CASE STUDY",
            snippet: "Verify 100% of incoming raw material bags at dock doors to eliminate chemical contamination risks."
            },
            {
            url: "blog-chemical-alkyd-resin.html",
            title: "Acid Value and Viscosity Tracking in Alkyd Resin Cooking",
            image: "images/blog_polyol_reactors.webp",
            industry: "chemical-pharma",
            type: "WHITE PAPER",
            snippet: "Predict reaction endpoints and acid values continuously in high-temperature chemical reactors."
            },
            {
            url: "blog-msc-snv-preprocessing.html",
            title: "Multiplicative Scatter Correction and Standard Normal Variate Preprocessing",
            image: "images/blog_spectral_math.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "Learn how SNV and MSC algorithms eliminate physical sample packing and particle size variations."
            },
            {
            url: "blog-spectrometer-reference-bg.html",
            title: "Standardizing Reference Background Measurement Intervals in Process Spectroscopy",
            image: "images/blog_mems_durability.webp",
            industry: "general-tech",
            type: "GUIDE",
            snippet: "Ensure long-term calibration model stability by managing ambient temperature and diode source drift."
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

/* ==========================================================================
   Local Privacy Policy Modal for Blog Pages
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Look for any links with showPrivacy in href
    const privacyLinks = document.querySelectorAll('a[href*="showPrivacy=1"]');
    if (privacyLinks.length === 0) return;

    // Check if we are not on contact.html (as contact.html has its own modal)
    if (window.location.pathname.indexOf('contact.html') !== -1) return;

    privacyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openLocalPrivacyModal();
        });
    });

    function openLocalPrivacyModal() {
        let modal = document.getElementById('local-privacy-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'local-privacy-modal';
            modal.style.position = 'fixed';
            modal.style.inset = '0';
            modal.style.zIndex = '100000';
            modal.style.background = 'rgba(0,0,0,0.7)';
            modal.style.backdropFilter = 'blur(6px)';
            modal.style.webkitBackdropFilter = 'blur(6px)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.padding = '2rem';

            modal.innerHTML = `
                <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 16px; max-width: 850px; width: 100%; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 24px 80px rgba(0,0,0,0.5); text-align: left; font-family: var(--font-body); color: var(--text-primary);">
                    <!-- Modal Header -->
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.75rem 2rem; border-bottom: 1px solid var(--border-color); flex-shrink: 0;">
                        <div>
                            <h2 style="font-size: 1.5rem; font-family: var(--font-title); font-weight: 700; color: var(--text-primary); letter-spacing: -0.5px; margin: 0;">Privacy Policy & Data Protection Clarification Text</h2>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: var(--text-muted);">Compliance Status: KVKK (No. 6698) | GDPR (EU 2016/679) | CCPA/CPRA</p>
                        </div>
                        <button id="close-local-privacy-btn" style="background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 6px; transition: all 0.2s ease; line-height: 1;">&times;</button>
                    </div>
                    <!-- Modal Body -->
                    <div style="padding: 2rem; overflow-y: auto; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
                        <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;"><strong>Document Reference:</strong> PP-KVKK-2026-V3 | <strong>Last Updated:</strong> June 30, 2026</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem; margin-top: 0;">1. Data Controller Identification</h3>
                        <p style="margin-bottom: 1.25rem;">This Privacy Policy and Clarification Text has been prepared by <strong>USTECH Innovations LLC</strong> ("USTECH", "Company", "we", "us", or "our"), headquartered at 30 N Gould St Ste 34301, Sheridan, WY 82801, USA, in our capacity as the <strong>Data Controller</strong> under the Turkish Personal Data Protection Law No. 6698 ("KVKK"), the EU General Data Protection Regulation ("GDPR"), and the California Consumer Privacy Act ("CCPA/CPRA"). This document governs the processing of personal data collected through our B2B website, online service portals, contact channels, and marketing platforms.</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">2. Categorization of Processed Personal Data</h3>
                        <p style="margin-bottom: 0.75rem;">In alignment with national and international data protection laws, we categorize the personal data we process as follows:</p>
                        <ul style="padding-left: 1.5rem; margin-bottom: 1.25rem; list-style-type: disc;">
                            <li style="margin-bottom: 0.4rem;"><strong style="color: var(--text-primary);">Identity Information:</strong> First name, last name.</li>
                            <li style="margin-bottom: 0.4rem;"><strong style="color: var(--text-primary);">Contact Information:</strong> Corporate email address, direct business telephone/mobile number, physical business address, and country of operation.</li>
                            <li style="margin-bottom: 0.4rem;"><strong style="color: var(--text-primary);">Professional & Employment Information:</strong> Job title, department, company name, industry sector, and technical areas of interest.</li>
                            <li style="margin-bottom: 0.4rem;"><strong style="color: var(--text-primary);">Transaction Security & Technical Information:</strong> IP address, device type and operating system, browser specifications, system activity logs, cookie IDs, and detailed website navigation paths.</li>
                            <li style="margin-bottom: 0.4rem;"><strong style="color: var(--text-primary);">Customer Transaction Information:</strong> Quotation requests, details of analytical challenges submitted via forms, interest in specific spectrometer systems, and communication history.</li>
                        </ul>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">3. Legal Bases and Purposes of Processing</h3>
                        <p style="margin-bottom: 0.75rem;">Your personal data is collected and processed through automatic or semi-automatic means based on the legal grounds set forth in Article 5 of the KVKK and Article 6 of the GDPR:</p>
                        
                        <div style="margin-left: 1rem; margin-bottom: 1.25rem; border-left: 3px solid var(--border-color); padding-left: 1rem;">
                            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">A. Performance and Execution of Contracts (KVKK Art. 5/2/c, GDPR Art. 6/1/b):</strong></p>
                            <p style="margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">To evaluate B2B inquiries, formulate commercial quotations, deliver analytical hardware (such as ProLine or MasterLine spectrometers), manage licenses for caliX/ProChem software suites, and deliver post-sale calibration tune-ups and customer support services.</p>

                            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">B. Data Controller's Legitimate Interests (KVKK Art. 5/2/f, GDPR Art. 6/1/f):</strong></p>
                            <p style="margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">To maintain network security, perform diagnostics and debugging, analyze traffic trends to optimize website user experience, detect and prevent malicious activities, and protect our proprietary rights and intellectual assets.</p>

                            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">C. Explicit Consent of the Data Subject (KVKK Art. 5/1, GDPR Art. 6/1/a):</strong></p>
                            <p style="margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">To distribute technical whitepapers, send industry-specific newsletters, invite you to scientific webinars, and share promotional updates. You have the right to withdraw this consent instantly via subscription links in our emails.</p>

                            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">D. Compliance with Legal Obligations (KVKK Art. 5/2/a, GDPR Art. 6/1/c):</strong></p>
                            <p style="margin-bottom: 0.75rem; font-size: 0.85rem; color: var(--text-muted);">To adhere to tax regulations, commercial accounting standards, international trade laws, export controls on dual-use analytical equipment, and binding requests from courts or judicial authorities.</p>
                        </div>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">4. Cross-Border Data Transfers</h3>
                        <p style="margin-bottom: 1.25rem;">To operate our B2B services, USTECH utilizes secured cloud infrastructure located in the United States. Consequently, personal data collected from users in Turkey, the European Union, and other global regions is transferred internationally to the US. We secure these transfers in compliance with GDPR (Chapter V) using Standard Contractual Clauses (SCCs) and seek your explicit consent when you submit web forms in compliance with KVKK Article 9 regulations.</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">5. Data Sharing & Sharing Categories</h3>
                        <p style="margin-bottom: 1.25rem;">We enforce a strict policy against selling, sharing, or leasing personal data to third parties. We may disclose data only to: (a) local authorized USTECH sales and service partners in your jurisdiction to process regional requests directly; (b) cloud hosting, CRM (such as HubSpot/Salesforce), and security service providers bound by strict Data Processing Agreements (DPAs); (c) legally authorized public institutions when necessary to comply with legal mandates.</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">6. Data Retention and Deletion</h3>
                        <p style="margin-bottom: 1.25rem;">We store your personal data only as long as necessary for the processing purposes detailed herein, or as mandated by applicable statutory limitation periods. Information submitted via contact or RFQ forms is retained for a maximum of 36 months following the last communication, unless it converts into a customer contract. Marketing consent data is stored until consent is explicitly withdrawn, after which it is securely destroyed or anonymized.</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">7. Technical and Organizational Security Measures</h3>
                        <p style="margin-bottom: 0.75rem;">To protect personal data from unauthorized access, alteration, loss, or leakage, USTECH implements industry-standard controls:</p>
                        <ul style="padding-left: 1.5rem; margin-bottom: 1.25rem; list-style-type: disc;">
                            <li style="margin-bottom: 0.3rem;">All data transit is encrypted using Secure Sockets Layer (SSL) / TLS 1.3 protocols.</li>
                            <li style="margin-bottom: 0.3rem;">Access to database systems is restricted through zero-trust access controls and multi-factor authentication (MFA).</li>
                            <li style="margin-bottom: 0.3rem;">Periodic vulnerability scanning, firewalls, and server-side threat detection systems are active.</li>
                            <li style="margin-bottom: 0.3rem;">All staff handling client data undergo periodic data security and privacy training.</li>
                        </ul>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">8. Global Privacy Rights</h3>
                        <p style="margin-bottom: 0.75rem;">Depending on your legal residence, you are entitled to several specific rights regarding your personal data:</p>

                        <p style="margin-bottom: 0.5rem; font-weight: 700; color: var(--text-primary); font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase;">A. Data Subject Rights Under Turkey's KVKK (Article 11):</p>
                        <ul style="padding-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc;">
                            <li style="margin-bottom: 0.3rem;">To learn whether your personal data is being processed,</li>
                            <li style="margin-bottom: 0.3rem;">To request information if your personal data has been processed,</li>
                            <li style="margin-bottom: 0.3rem;">To learn the purpose of the processing and whether the data is used in line with this purpose,</li>
                            <li style="margin-bottom: 0.3rem;">To know the third parties to whom your personal data has been transferred domestically or internationally,</li>
                            <li style="margin-bottom: 0.3rem;">To request the rectification of personal data if it has been processed incompletely or inaccurately,</li>
                            <li style="margin-bottom: 0.3rem;">To request the erasure or destruction of your personal data under the conditions laid down in Article 7 of the KVKK,</li>
                            <li style="margin-bottom: 0.3rem;">To request that the third parties to whom your personal data was transferred be notified of the rectification, erasure, or destruction operations,</li>
                            <li style="margin-bottom: 0.3rem;">To object to any outcome detrimental to you resulting from the analysis of your processed data exclusively through automated systems,</li>
                            <li style="margin-bottom: 0.3rem;">To demand compensation for damages incurred due to the unlawful processing of your personal data.</li>
                        </ul>

                        <p style="margin-bottom: 0.5rem; font-weight: 700; color: var(--text-primary); font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase;">B. EU GDPR Rights:</p>
                        <ul style="padding-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc;">
                            <li style="margin-bottom: 0.3rem;">Right to access, correct, update, or request deletion of your personal data.</li>
                            <li style="margin-bottom: 0.3rem;">Right to object to processing, restrict processing, or request data portability.</li>
                            <li style="margin-bottom: 0.3rem;">Right to withdraw consent at any time without affecting the lawfulness of prior processing.</li>
                        </ul>

                        <p style="margin-bottom: 0.5rem; font-weight: 700; color: var(--text-primary); font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase;">C. California CCPA/CPRA Rights:</p>
                        <ul style="padding-left: 1.5rem; margin-bottom: 1.25rem; list-style-type: disc;">
                            <li style="margin-bottom: 0.3rem;">Right to know what categories of personal information we collect and disclose.</li>
                            <li style="margin-bottom: 0.3rem;">Right to request deletion and correction of personal information.</li>
                            <li style="margin-bottom: 0.3rem;">Right to opt out of the sale or sharing of your personal information (Do Not Sell/Share).</li>
                            <li style="margin-bottom: 0.3rem;">Right to non-discrimination for exercising your privacy rights.</li>
                        </ul>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">9. Application and Contact Procedure</h3>
                        <p style="margin-bottom: 1.25rem;">You may submit requests to exercise your rights by emailing <strong style="color: var(--text-primary);">privacy@ustechinnovations.com</strong>. For applications originating from Turkey under the KVKK, requests must comply with the "Communiqué on Application Procedures and Principles to the Data Controller". Applications must contain: Name, Surname, wet signature (if written), Turkish ID number (or Passport Number/nationality for foreign nationals), physical address for response, contact email, and clear details of the request. Requests will be processed within 30 days free of charge.</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">10. Cookies</h3>
                        <p style="margin-bottom: 1.25rem;">We use cookies to enable core website services and to collect anonymized telemetry. Essential cookies are loaded automatically. Functional and analytical cookies (such as tracking site usage) are disabled by default and will only run if you provide consent via our Cookie Banner. You can manage, alter, or reject these cookies at any time.</p>

                        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">11. Corporate Contact Details</h3>
                        <p style="margin-bottom: 0;"><strong style="color: var(--text-primary);">USTECH Innovations LLC</strong><br>30 N Gould St Ste 34301, Sheridan, WY 82801, USA<br>Email: privacy@ustechinnovations.com<br>Phone: +1 307 527 0072</p>
                    </div>
                    <!-- Modal Footer -->
                    <div style="padding: 1.25rem 2rem; border-top: 1px solid var(--border-color); flex-shrink: 0; text-align: right; display: flex; justify-content: flex-end; gap: 1rem;">
                        <button id="decline-local-privacy-btn" class="btn btn-secondary" style="padding: 0.6rem 2rem; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">Cancel</button>
                        <button id="agree-local-privacy-btn" class="btn btn-primary" style="padding: 0.6rem 2rem; font-size: 0.9rem; border-radius: 4px; cursor: pointer; color: white;">I Agree & Accept</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = document.getElementById('close-local-privacy-btn');
            const agreeBtn = document.getElementById('agree-local-privacy-btn');
            const declineBtn = document.getElementById('decline-local-privacy-btn');

            closeBtn.onmouseover = () => {
                closeBtn.style.color = 'var(--text-primary)';
                closeBtn.style.background = 'var(--bg-secondary)';
            };
            closeBtn.onmouseout = () => {
                closeBtn.style.color = 'var(--text-secondary)';
                closeBtn.style.background = 'none';
            };

            const closeModal = () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', closeModal);
            declineBtn.addEventListener('click', closeModal);

            agreeBtn.addEventListener('click', () => {
                const checkbox = document.querySelector('.lead-capture-card input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = true;
                }
                closeModal();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});


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

            <a href="tel:+13075270072" class="specialist-contact-item">
                <span class="specialist-contact-icon">${phoneSVG}</span>
                <span>
                    <span class="specialist-contact-label">${ui('spec_call')}</span>
                    <span class="specialist-contact-value">+1 307 527 0072</span>
                </span>
            </a>

            <a href="mailto:info@ustechinnovations.com" class="specialist-contact-item">
                <span class="specialist-contact-icon">${emailSVG}</span>
                <span>
                    <span class="specialist-contact-label">${ui('spec_email')}</span>
                    <span class="specialist-contact-value">info@ustechinnovations.com</span>
                </span>
            </a>

            <a href="https://www.linkedin.com/company/ustech-innovations-llc/about/" target="_blank" rel="noopener noreferrer" class="specialist-contact-item">
                <span class="specialist-contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
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

