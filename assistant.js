/* =====================================================================
   USTECH Asistani (09-10.11.2026) -- DENEME SURUMU, canliya alinmadi.
   - Tamamen tarayicida calisir; dis hizmet YOK (tek istisna: "uzmana ilet"
     gonderimi, iletisim formunun da kullandigi Web3Forms).
   - Durust kimlik: otomatik asistan; sahte temsilci / "yaziyor..." yok.
   - Yanitlar yalniz sitenin kendi icerigi: SSS (faq.html JSON-LD, ziyaretci
     dilinde), arama dizini (SEARCH_I18N / searchDb), urun aciklamalari.
   - Gizli urunler (SamplePrep, ProLine17ES, Portal, Kalibrasyon
     Modelleri) hicbir kosulda onerilmez: IZINLI_SAYFALAR beyaz listesi.
   - Yerel deneme kipinde (localhost) e-posta GONDERILMEZ; gercek gonderim
     icin adrese ?asistan_gercek=1 eklenir.
   - Yukleyici app.js icinde (bolum 18); canliya alirken oradaki localhost
     kilidi kaldirilir ve sync_to_github.py HOLD_LOCAL'dan bu iki dosya cikar.
   ===================================================================== */
(function () {
    'use strict';
    if (window.__ustechAssistant) return;
    window.__ustechAssistant = true;

    var SCRIPT = document.currentScript;
    var BASE = (SCRIPT && SCRIPT.src) ? SCRIPT.src.replace(/[^\/]*(\?.*)?$/, '') : '/';
    var LANGS = ['en', 'tr', 'fr', 'de', 'es', 'ar', 'zh'];
    var LANG = (function () {
        var l = ((document.documentElement && document.documentElement.lang) || 'en').toLowerCase().slice(0, 2);
        return LANGS.indexOf(l) >= 0 ? l : 'en';
    })();
    var RTL = LANG === 'ar';
    var YEREL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    var GERCEK_GONDER = !YEREL || /[?&]asistan_gercek=1\b/.test(location.search);
    var WEB3FORMS_KEY = '2791c5d7-ecdd-4b3e-90fa-f6e33964a84d'; // iletisim formuyla ayni adres (info@)
    var DEPO = 'ustech_asistan_v1';

    function sayfaUrl(sayfa) {
        return BASE + (LANG === 'en' ? '' : LANG + '/') + sayfa;
    }

    /* ------------------------------------------------------------------ */
    /* Metinler                                                            */
    /* ------------------------------------------------------------------ */
    var T = {
        en: {
            label: 'How can we help you?', title: 'USTECH Assistant',
            sub: 'Automated assistant · Our experts reply within 24 hours',
            greet: "Hello! I'm USTECH's automated assistant. I can help you choose a product, request a quote, get technical support or find answers to common questions. I can also pass your request to our experts, who reply within 24 hours.",
            m_product: 'Find the right product', m_quote: 'Request a quote', m_support: 'Get technical support',
            m_software: 'Download software', m_faq: 'Browse common questions', m_expert: 'Message an expert',
            pf_q: 'What would you like to do?',
            pf_inline: 'Continuous measurement on the production line (inline)',
            pf_lab: 'Lab analysis of grain, feed or forage',
            pf_field: 'Handheld on-site measurement in the field', pf_mill: 'Grind samples before analysis', pf_starch: 'Measure damaged starch in flour',
            pf_model: 'Build calibration models (software)', pf_plc: 'Connect analyzer results to PLC/SCADA',
            pf_unsure: "I'm not sure, show me by industry",
            pf_res: 'These products may fit your needs:',
            pf_inline_note: 'We have three inline analyzers. Which one fits depends on your product and line, so tell us about your application and our experts will recommend one.',
            pf_lab_note: 'Tornado+ can grind your samples before analysis.',
            sec_q: 'Which industry are you in?', sec_food: 'Food & feed', sec_dairy: 'Dairy', sec_chem: 'Chemical & pharmaceutical', sec_other: 'Other',
            sec_res: 'This page shows our solutions for your industry:',
            sec_other_txt: 'Tell us about your process and our experts will help you find the right solution.',
            q_prod: 'Which product are you interested in?', unsure: 'Not sure yet',
            q_app: 'What would you like to measure, and in which material? Please describe it briefly (e.g. moisture and fat in milk powder).',
            s_prod: 'Which product do you need support with?',
            s_serial: 'What is the serial number of the device? If you do not know it, press "Skip".',
            s_issue: 'Please briefly describe the issue.',
            e_msg: 'Please write your message:',
            f_intro: 'Leave your contact details and our experts will get back to you within 24 hours.',
            f_name: 'Full name', f_email: 'Email', f_company: 'Company', f_country: 'Country',
            f_consent: 'I agree that my details are processed to handle this request.', f_privacy: 'Privacy Policy',
            f_send: 'Send', f_cancel: 'Cancel',
            f_err_req: 'Please fill in your name and email and tick the consent box.', f_err_email: 'Please enter a valid email address.',
            sending: 'Sending…',
            ok: 'Thank you! Your request has been passed to our experts. We will reply within 24 hours to this email address:\n{email}',
            fail: 'Your request could not be sent. Please try again or use the form on our contact page.',
            test: '(Local test: no email was sent.)',
            contact: 'Contact page',
            sw_txt: 'You can download the latest versions of our software from the download section on each product page:',
            faq_intro: 'Here are some of the most frequently asked questions. You can also type your own question below.',
            faq_err: 'The questions could not be loaded. You can view them on our FAQ page:', faq_page: 'FAQ page',
            found_faq: 'From our frequently asked questions:', found_pages: 'Related pages:',
            none: "I couldn't find a ready answer to this on our website. Shall I pass your question to our experts?",
            helped: 'Did this help? If not, I can pass your question to our experts.',
            yes_send: 'Yes, pass it to an expert', price: 'Prices depend on the application and instrument configuration, so they are not listed on our website. I can pass your quote request to our experts:', intent: 'I can take you to the right place for this:', fwd: 'Pass my question to an expert', to_expert: 'Ask an expert', menu: 'Main menu', skip: 'Skip',
            restart: 'New conversation', close: 'Close', input: 'Type your question…', send_aria: 'Send',
            foot: 'Answers are based on the information on our website.',
            you: 'You'
        },
        tr: {
            label: 'Size nasıl yardımcı olabiliriz?', title: 'USTECH Asistanı',
            sub: 'Otomatik asistan · Uzmanlarımız 24 saat içinde dönüş yapar',
            greet: 'Merhaba! Ben USTECH\'in otomatik asistanıyım. Ürün seçimi, teklif, teknik destek ve sık sorulan sorular konusunda yardımcı olabilirim. Dilerseniz talebinizi uzmanlarımıza iletirim; 24 saat içinde size dönüş yapılır.',
            m_product: 'Ürün seçimi', m_quote: 'Teklif talebi', m_support: 'Teknik destek ve servis',
            m_software: 'Yazılım indirme', m_faq: 'Sık sorulan sorular', m_expert: 'Uzmana mesaj',
            pf_q: 'Ne yapmak istiyorsunuz?',
            pf_inline: 'Üretim hattında sürekli (hat içi) ölçüm',
            pf_lab: 'Laboratuvarda tahıl, yem veya kaba yem analizi',
            pf_field: 'Sahada, numunenin başında el tipi ölçüm', pf_mill: 'Analiz öncesi numune öğütme', pf_starch: 'Undaki hasarlı nişastayı ölçme',
            pf_model: 'Kalibrasyon modeli geliştirme (yazılım)', pf_plc: 'Analizör sonuçlarını PLC/SCADA\'ya bağlama',
            pf_unsure: 'Emin değilim, sektörüme göre bakalım',
            pf_res: 'Şu ürünler ihtiyacınıza uygun olabilir:',
            pf_inline_note: 'Üç hat içi analizörümüz var. Hangisinin uygun olduğu ürününüze ve hattınıza bağlı; uygulamanızı yazarsanız uzmanlarımız öneride bulunur.',
            pf_lab_note: 'Numunelerinizi analizden önce Tornado+ ile öğütebilirsiniz.',
            sec_q: 'Hangi sektördesiniz?', sec_food: 'Gıda ve yem', sec_dairy: 'Süt ve süt ürünleri', sec_chem: 'Kimya ve ilaç', sec_other: 'Diğer',
            sec_res: 'Sektörünüze yönelik çözümlerimiz bu sayfada:',
            sec_other_txt: 'Prosesinizi anlatırsanız uzmanlarımız doğru çözümü bulmanıza yardımcı olur.',
            q_prod: 'Hangi ürünle ilgileniyorsunuz?', unsure: 'Henüz emin değilim',
            q_app: 'Hangi üründe neyi ölçmek istiyorsunuz? Kısaca yazın (örn. süt tozunda nem ve yağ).',
            s_prod: 'Hangi ürün için destek istiyorsunuz?',
            s_serial: 'Cihazın seri numarası nedir? Bilmiyorsanız “Atla” düğmesine basın.',
            s_issue: 'Sorunu kısaca anlatır mısınız?',
            e_msg: 'Mesajınızı yazın:',
            f_intro: 'İletişim bilgilerinizi bırakın, uzmanlarımız 24 saat içinde size dönüş yapsın.',
            f_name: 'Ad Soyad', f_email: 'E-posta', f_company: 'Şirket', f_country: 'Ülke',
            f_consent: 'Bilgilerimin bu talebin yanıtlanması için işlenmesini kabul ediyorum.', f_privacy: 'Gizlilik Politikası',
            f_send: 'Gönder', f_cancel: 'Vazgeç',
            f_err_req: 'Lütfen adınızı ve e-postanızı yazıp onay kutusunu işaretleyin.', f_err_email: 'Lütfen geçerli bir e-posta adresi girin.',
            sending: 'Gönderiliyor…',
            ok: 'Teşekkürler! Talebiniz uzmanlarımıza iletildi. 24 saat içinde aşağıdaki e-posta adresine dönüş yapacağız:\n{email}',
            fail: 'Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da iletişim sayfamızdaki formu kullanın.',
            test: '(Yerel deneme: e-posta gönderilmedi.)',
            contact: 'İletişim sayfası',
            sw_txt: 'Yazılımlarımızın en güncel sürümlerini ürün sayfalarındaki indirme bölümünden alabilirsiniz:',
            faq_intro: 'Sık sorulan sorulardan bazıları aşağıda. Kendi sorunuzu da yazabilirsiniz.',
            faq_err: 'Sorular yüklenemedi. SSS sayfamızdan bakabilirsiniz:', faq_page: 'SSS sayfası',
            found_faq: 'Sık sorulan sorulardan:', found_pages: 'İlgili sayfalar:',
            none: 'Bu konuda sitemizde hazır bir yanıt bulamadım. Sorunuzu uzmanlarımıza iletmemi ister misiniz?',
            helped: 'Bu bilgiler işinize yaradı mı? Yaramadıysa sorunuzu uzmanlarımıza iletebilirim.',
            yes_send: 'Evet, uzmana ilet', price: 'Fiyatlar uygulamaya ve cihaz yapılandırmasına göre belirlendiği için sitemizde yer almıyor. Teklif talebinizi uzmanlarımıza iletebilirim:', intent: 'Bu konuda sizi doğru yere yönlendirebilirim:', fwd: 'Sorumu uzmana ilet', to_expert: 'Uzmana sorun', menu: 'Ana menü', skip: 'Atla',
            restart: 'Yeni konuşma', close: 'Kapat', input: 'Sorunuzu yazın…', send_aria: 'Gönder',
            foot: 'Yanıtlar sitemizdeki bilgilere dayanır.',
            you: 'Siz'
        },
        fr: {
            label: 'Comment pouvons-nous vous aider ?', title: 'Assistant USTECH',
            sub: 'Assistant automatique · Nos experts répondent sous 24 heures',
            greet: "Bonjour ! Je suis l'assistant automatique d'USTECH. Je peux vous aider à choisir un produit, demander un devis, obtenir une assistance technique ou trouver des réponses aux questions fréquentes. Je peux aussi transmettre votre demande à nos experts, qui répondent sous 24 heures.",
            m_product: 'Trouver le bon produit', m_quote: 'Demander un devis', m_support: 'Obtenir une assistance technique',
            m_software: 'Télécharger les logiciels', m_faq: 'Consulter les questions fréquentes', m_expert: 'Écrire à un expert',
            pf_q: 'Que souhaitez-vous faire ?',
            pf_inline: 'Mesure continue sur la ligne de production (en ligne)',
            pf_lab: 'Analyse en laboratoire de céréales, d’aliments pour animaux ou de fourrages',
            pf_field: 'Mesure portable sur site, sur le terrain', pf_mill: 'Broyer les échantillons avant analyse', pf_starch: 'Mesurer l’amidon endommagé dans la farine',
            pf_model: 'Développer des modèles d’étalonnage (logiciel)', pf_plc: 'Relier les résultats de l’analyseur à un API/SCADA',
            pf_unsure: 'Je ne sais pas, voyons par secteur',
            pf_res: 'Ces produits peuvent répondre à vos besoins :',
            pf_inline_note: 'Nous proposons trois analyseurs en ligne. Le choix dépend de votre produit et de votre ligne ; décrivez votre application et nos experts vous conseilleront.',
            pf_lab_note: 'Tornado+ permet de broyer vos échantillons avant l’analyse.',
            sec_q: 'Quel est votre secteur ?', sec_food: 'Agroalimentaire et alimentation animale', sec_dairy: 'Produits laitiers', sec_chem: 'Chimie et pharmacie', sec_other: 'Autre',
            sec_res: 'Nos solutions pour votre secteur sont présentées sur cette page :',
            sec_other_txt: 'Décrivez votre procédé et nos experts vous aideront à trouver la bonne solution.',
            q_prod: 'Quel produit vous intéresse ?', unsure: 'Je ne sais pas encore',
            q_app: 'Que souhaitez-vous mesurer, et dans quelle matière ? Décrivez-le brièvement (p. ex. humidité et matière grasse dans le lait en poudre).',
            s_prod: 'Pour quel produit avez-vous besoin d’assistance ?',
            s_serial: 'Quel est le numéro de série de l’appareil ? Si vous ne le connaissez pas, appuyez sur « Passer ».',
            s_issue: 'Pouvez-vous décrire brièvement le problème ?',
            e_msg: 'Écrivez votre message :',
            f_intro: 'Laissez vos coordonnées et nos experts vous répondront sous 24 heures.',
            f_name: 'Nom et prénom', f_email: 'E-mail', f_company: 'Entreprise', f_country: 'Pays',
            f_consent: 'J’accepte que mes données soient traitées pour répondre à cette demande.', f_privacy: 'Politique de confidentialité',
            f_send: 'Envoyer', f_cancel: 'Annuler',
            f_err_req: 'Veuillez indiquer votre nom et votre e-mail et cocher la case de consentement.', f_err_email: 'Veuillez saisir une adresse e-mail valide.',
            sending: 'Envoi en cours…',
            ok: 'Merci ! Votre demande a été transmise à nos experts. Nous vous répondrons sous 24 heures à l’adresse suivante :\n{email}',
            fail: 'Votre demande n’a pas pu être envoyée. Veuillez réessayer ou utiliser le formulaire de notre page contact.',
            test: '(Test local : aucun e-mail envoyé.)',
            contact: 'Page contact',
            sw_txt: 'Vous pouvez télécharger les dernières versions de nos logiciels dans la section de téléchargement de chaque page produit :',
            faq_intro: 'Voici quelques-unes des questions les plus fréquentes. Vous pouvez aussi saisir votre propre question ci-dessous.',
            faq_err: 'Les questions n’ont pas pu être chargées. Consultez notre page FAQ :', faq_page: 'Page FAQ',
            found_faq: 'Dans nos questions fréquentes :', found_pages: 'Pages associées :',
            none: 'Je n’ai pas trouvé de réponse toute faite sur notre site. Voulez-vous que je transmette votre question à nos experts ?',
            helped: 'Ces informations vous ont-elles été utiles ? Sinon, je peux transmettre votre question à nos experts.',
            yes_send: 'Oui, transmettre à un expert', price: 'Les prix dépendent de l’application et de la configuration de l’appareil ; ils ne figurent donc pas sur notre site. Je peux transmettre votre demande de devis à nos experts :', intent: 'Je peux vous orienter vers la bonne démarche :', fwd: 'Transmettre ma question à un expert', to_expert: 'Demander à un expert', menu: 'Menu principal', skip: 'Passer',
            restart: 'Nouvelle conversation', close: 'Fermer', input: 'Saisissez votre question…', send_aria: 'Envoyer',
            foot: 'Les réponses reposent sur les informations de notre site.',
            you: 'Vous'
        },
        de: {
            label: 'Wie können wir Ihnen helfen?', title: 'USTECH-Assistent',
            sub: 'Automatischer Assistent · Unsere Experten antworten innerhalb von 24 Stunden',
            greet: 'Hallo! Ich bin der automatische Assistent von USTECH. Ich helfe Ihnen bei der Produktauswahl, bei Angebotsanfragen, beim technischen Support und bei häufigen Fragen. Ich kann Ihre Anfrage auch an unsere Experten weiterleiten, die innerhalb von 24 Stunden antworten.',
            m_product: 'Passendes Produkt finden', m_quote: 'Angebot anfordern', m_support: 'Technischen Support anfragen',
            m_software: 'Software herunterladen', m_faq: 'Häufige Fragen ansehen', m_expert: 'Experten schreiben',
            pf_q: 'Was möchten Sie tun?',
            pf_inline: 'Kontinuierliche Messung in der Produktionslinie (inline)',
            pf_lab: 'Laboranalyse von Getreide, Futtermitteln oder Grundfutter',
            pf_field: 'Mobile Vor-Ort-Messung mit dem Handgerät', pf_mill: 'Proben vor der Analyse mahlen', pf_starch: 'Beschädigte Stärke im Mehl messen',
            pf_model: 'Kalibriermodelle entwickeln (Software)', pf_plc: 'Analysatorergebnisse an SPS/SCADA anbinden',
            pf_unsure: 'Nicht sicher – nach Branche suchen',
            pf_res: 'Diese Produkte könnten zu Ihrem Bedarf passen:',
            pf_inline_note: 'Wir bieten drei Inline-Analysatoren an. Welcher passt, hängt von Ihrem Produkt und Ihrer Linie ab; beschreiben Sie Ihre Anwendung, und unsere Experten geben eine Empfehlung.',
            pf_lab_note: 'Mit Tornado+ können Sie Ihre Proben vor der Analyse mahlen.',
            sec_q: 'In welcher Branche sind Sie tätig?', sec_food: 'Lebens- und Futtermittel', sec_dairy: 'Milchwirtschaft', sec_chem: 'Chemie und Pharma', sec_other: 'Andere',
            sec_res: 'Unsere Lösungen für Ihre Branche finden Sie auf dieser Seite:',
            sec_other_txt: 'Beschreiben Sie Ihren Prozess, und unsere Experten helfen Ihnen, die passende Lösung zu finden.',
            q_prod: 'Für welches Produkt interessieren Sie sich?', unsure: 'Noch nicht sicher',
            q_app: 'Was möchten Sie in welchem Material messen? Bitte beschreiben Sie es kurz (z. B. Feuchte und Fett in Milchpulver).',
            s_prod: 'Für welches Produkt benötigen Sie Support?',
            s_serial: 'Wie lautet die Seriennummer des Geräts? Wenn Sie sie nicht kennen, klicken Sie auf „Überspringen“.',
            s_issue: 'Bitte beschreiben Sie das Problem kurz.',
            e_msg: 'Bitte schreiben Sie Ihre Nachricht:',
            f_intro: 'Hinterlassen Sie Ihre Kontaktdaten, und unsere Experten melden sich innerhalb von 24 Stunden.',
            f_name: 'Vor- und Nachname', f_email: 'E-Mail', f_company: 'Unternehmen', f_country: 'Land',
            f_consent: 'Ich bin einverstanden, dass meine Daten zur Bearbeitung dieser Anfrage verarbeitet werden.', f_privacy: 'Datenschutzerklärung',
            f_send: 'Senden', f_cancel: 'Abbrechen',
            f_err_req: 'Bitte geben Sie Namen und E-Mail an und setzen Sie das Häkchen zur Einwilligung.', f_err_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            sending: 'Wird gesendet…',
            ok: 'Vielen Dank! Ihre Anfrage wurde an unsere Experten weitergeleitet. Wir antworten Ihnen innerhalb von 24 Stunden an diese E-Mail-Adresse:\n{email}',
            fail: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie das Formular auf unserer Kontaktseite.',
            test: '(Lokaler Test: keine E-Mail gesendet.)',
            contact: 'Kontaktseite',
            sw_txt: 'Die neuesten Versionen unserer Software finden Sie im Download-Bereich der jeweiligen Produktseite:',
            faq_intro: 'Hier einige der häufigsten Fragen. Sie können Ihre eigene Frage auch unten eingeben.',
            faq_err: 'Die Fragen konnten nicht geladen werden. Sie finden sie auf unserer FAQ-Seite:', faq_page: 'FAQ-Seite',
            found_faq: 'Aus unseren häufigen Fragen:', found_pages: 'Passende Seiten:',
            none: 'Dazu habe ich auf unserer Website keine fertige Antwort gefunden. Soll ich Ihre Frage an unsere Experten weiterleiten?',
            helped: 'Hat Ihnen das geholfen? Falls nicht, leite ich Ihre Frage gern an unsere Experten weiter.',
            yes_send: 'Ja, an einen Experten weiterleiten', price: 'Die Preise hängen von der Anwendung und der Gerätekonfiguration ab und werden daher nicht auf unserer Website genannt. Ich kann Ihre Angebotsanfrage an unsere Experten weiterleiten:', intent: 'Dafür kann ich Sie an die richtige Stelle weiterleiten:', fwd: 'Frage an einen Experten weiterleiten', to_expert: 'Einen Experten fragen', menu: 'Hauptmenü', skip: 'Überspringen',
            restart: 'Neues Gespräch', close: 'Schließen', input: 'Ihre Frage eingeben…', send_aria: 'Senden',
            foot: 'Die Antworten beruhen auf den Informationen unserer Website.',
            you: 'Sie'
        },
        es: {
            label: '¿Cómo podemos ayudarle?', title: 'Asistente USTECH',
            sub: 'Asistente automático · Nuestros expertos responden en 24 horas',
            greet: '¡Hola! Soy el asistente automático de USTECH. Puedo ayudarle a elegir un producto, solicitar un presupuesto, obtener soporte técnico o encontrar respuestas a preguntas frecuentes. También puedo enviar su solicitud a nuestros expertos, que responden en 24 horas.',
            m_product: 'Encontrar el producto adecuado', m_quote: 'Solicitar presupuesto', m_support: 'Obtener soporte técnico',
            m_software: 'Descargar software', m_faq: 'Ver preguntas frecuentes', m_expert: 'Escribir a un experto',
            pf_q: '¿Qué desea hacer?',
            pf_inline: 'Medición continua en la línea de producción (en línea)',
            pf_lab: 'Análisis de laboratorio de cereales, piensos o forrajes',
            pf_field: 'Medición portátil in situ, en campo', pf_mill: 'Moler muestras antes del análisis', pf_starch: 'Medir el almidón dañado en la harina',
            pf_model: 'Desarrollar modelos de calibración (software)', pf_plc: 'Conectar los resultados del analizador a PLC/SCADA',
            pf_unsure: 'No estoy seguro, veamos por sector',
            pf_res: 'Estos productos pueden ajustarse a sus necesidades:',
            pf_inline_note: 'Tenemos tres analizadores en línea. Cuál es el adecuado depende de su producto y su línea; describa su aplicación y nuestros expertos le harán una recomendación.',
            pf_lab_note: 'Con Tornado+ puede moler sus muestras antes del análisis.',
            sec_q: '¿En qué sector trabaja?', sec_food: 'Alimentos y piensos', sec_dairy: 'Lácteos', sec_chem: 'Química y farmacia', sec_other: 'Otro',
            sec_res: 'En esta página encontrará nuestras soluciones para su sector:',
            sec_other_txt: 'Describa su proceso y nuestros expertos le ayudarán a encontrar la solución adecuada.',
            q_prod: '¿Qué producto le interesa?', unsure: 'Aún no lo sé',
            q_app: '¿Qué desea medir y en qué material? Descríbalo brevemente (p. ej., humedad y grasa en leche en polvo).',
            s_prod: '¿Para qué producto necesita soporte?',
            s_serial: '¿Cuál es el número de serie del equipo? Si no lo conoce, pulse «Omitir».',
            s_issue: '¿Puede describir brevemente el problema?',
            e_msg: 'Escriba su mensaje:',
            f_intro: 'Déjenos sus datos de contacto y nuestros expertos le responderán en 24 horas.',
            f_name: 'Nombre y apellidos', f_email: 'Correo electrónico', f_company: 'Empresa', f_country: 'País',
            f_consent: 'Acepto que mis datos se traten para gestionar esta solicitud.', f_privacy: 'Política de privacidad',
            f_send: 'Enviar', f_cancel: 'Cancelar',
            f_err_req: 'Indique su nombre y correo electrónico y marque la casilla de consentimiento.', f_err_email: 'Introduzca una dirección de correo electrónico válida.',
            sending: 'Enviando…',
            ok: '¡Gracias! Su solicitud se ha enviado a nuestros expertos. Le responderemos en un plazo de 24 horas a esta dirección de correo:\n{email}',
            fail: 'No se pudo enviar su solicitud. Inténtelo de nuevo o utilice el formulario de nuestra página de contacto.',
            test: '(Prueba local: no se envió ningún correo.)',
            contact: 'Página de contacto',
            sw_txt: 'Puede descargar las últimas versiones de nuestro software en la sección de descargas de cada página de producto:',
            faq_intro: 'Estas son algunas de las preguntas más frecuentes. También puede escribir su propia pregunta abajo.',
            faq_err: 'No se pudieron cargar las preguntas. Puede verlas en nuestra página de preguntas frecuentes:', faq_page: 'Preguntas frecuentes',
            found_faq: 'De nuestras preguntas frecuentes:', found_pages: 'Páginas relacionadas:',
            none: 'No he encontrado una respuesta en nuestro sitio. ¿Quiere que envíe su pregunta a nuestros expertos?',
            helped: '¿Le ha resultado útil? Si no, puedo enviar su pregunta a nuestros expertos.',
            yes_send: 'Sí, enviar a un experto', price: 'Los precios dependen de la aplicación y de la configuración del equipo, por lo que no figuran en nuestro sitio. Puedo enviar su solicitud de presupuesto a nuestros expertos:', intent: 'Puedo orientarle hacia la opción adecuada:', fwd: 'Enviar mi pregunta a un experto', to_expert: 'Preguntar a un experto', menu: 'Menú principal', skip: 'Omitir',
            restart: 'Nueva conversación', close: 'Cerrar', input: 'Escriba su pregunta…', send_aria: 'Enviar',
            foot: 'Las respuestas se basan en la información de nuestro sitio.',
            you: 'Usted'
        },
        ar: {
            label: 'كيف يمكننا مساعدتك؟', title: 'مساعد USTECH',
            sub: 'مساعد آلي · يرد خبراؤنا خلال 24 ساعة',
            greet: 'مرحباً! أنا المساعد الآلي لشركة USTECH. يمكنني مساعدتك في اختيار منتج أو طلب عرض سعر أو الحصول على الدعم الفني أو إيجاد إجابات للأسئلة الشائعة. ويمكنني أيضاً إرسال طلبك إلى خبرائنا الذين يردون خلال 24 ساعة.',
            m_product: 'العثور على المنتج المناسب', m_quote: 'طلب عرض سعر', m_support: 'الحصول على الدعم الفني',
            m_software: 'تنزيل البرامج', m_faq: 'تصفح الأسئلة الشائعة', m_expert: 'مراسلة خبير',
            pf_q: 'ماذا تريد أن تفعل؟',
            pf_inline: 'قياس مستمر على خط الإنتاج (مضمّن)',
            pf_lab: 'تحليل الحبوب أو الأعلاف أو العلف الخشن في المختبر',
            pf_field: 'قياس ميداني بجهاز محمول باليد', pf_mill: 'طحن العينات قبل التحليل', pf_starch: 'قياس النشا التالف في الدقيق',
            pf_model: 'بناء نماذج المعايرة (برنامج)', pf_plc: 'ربط نتائج المحلل بـ PLC/SCADA',
            pf_unsure: 'لست متأكداً، لنبحث حسب القطاع',
            pf_res: 'قد تناسب هذه المنتجات احتياجاتك:',
            pf_inline_note: 'لدينا ثلاثة محللات مضمّنة. يعتمد اختيار المناسب منها على منتجك وخط إنتاجك؛ صف لنا تطبيقك وسيقدم خبراؤنا توصيتهم.',
            pf_lab_note: 'يمكنك طحن عيناتك قبل التحليل باستخدام Tornado+.',
            sec_q: 'في أي قطاع تعمل؟', sec_food: 'الأغذية والأعلاف', sec_dairy: 'الألبان', sec_chem: 'الكيماويات والأدوية', sec_other: 'أخرى',
            sec_res: 'تجد حلولنا الخاصة بقطاعك في هذه الصفحة:',
            sec_other_txt: 'صف لنا عمليتك وسيساعدك خبراؤنا في إيجاد الحل المناسب.',
            q_prod: 'ما المنتج الذي تهتم به؟', unsure: 'لست متأكداً بعد',
            q_app: 'ما الذي تريد قياسه، وفي أي مادة؟ صِف ذلك باختصار (مثل الرطوبة والدهون في الحليب المجفف).',
            s_prod: 'ما المنتج الذي تحتاج إلى دعم له؟',
            s_serial: 'ما الرقم التسلسلي للجهاز؟ إذا لم تكن تعرفه فاضغط «تخطٍّ».',
            s_issue: 'هل يمكنك وصف المشكلة باختصار؟',
            e_msg: 'اكتب رسالتك:',
            f_intro: 'اترك بيانات الاتصال الخاصة بك وسيرد عليك خبراؤنا خلال 24 ساعة.',
            f_name: 'الاسم الكامل', f_email: 'البريد الإلكتروني', f_company: 'الشركة', f_country: 'البلد',
            f_consent: 'أوافق على معالجة بياناتي للرد على هذا الطلب.', f_privacy: 'سياسة الخصوصية',
            f_send: 'إرسال', f_cancel: 'إلغاء',
            f_err_req: 'يرجى كتابة الاسم والبريد الإلكتروني وتحديد مربع الموافقة.', f_err_email: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
            sending: 'جارٍ الإرسال…',
            ok: 'شكراً لك! تم إرسال طلبك إلى خبرائنا، وسنرد عليك خلال 24 ساعة على عنوان البريد الإلكتروني التالي:\n{email}',
            fail: 'تعذر إرسال طلبك. يرجى المحاولة مرة أخرى أو استخدام النموذج في صفحة الاتصال.',
            test: '(اختبار محلي: لم يُرسل أي بريد.)',
            contact: 'صفحة الاتصال',
            sw_txt: 'يمكنك تنزيل أحدث إصدارات برامجنا من قسم التنزيل في صفحة كل منتج:',
            faq_intro: 'هذه بعض الأسئلة الأكثر شيوعاً. يمكنك أيضاً كتابة سؤالك أدناه.',
            faq_err: 'تعذر تحميل الأسئلة. يمكنك الاطلاع عليها في صفحة الأسئلة الشائعة:', faq_page: 'الأسئلة الشائعة',
            found_faq: 'من أسئلتنا الشائعة:', found_pages: 'صفحات ذات صلة:',
            none: 'لم أجد إجابة جاهزة لهذا في موقعنا. هل تريد أن أرسل سؤالك إلى خبرائنا؟',
            helped: 'هل كانت هذه المعلومات مفيدة؟ إن لم تكن كذلك، يمكنني إرسال سؤالك إلى خبرائنا.',
            yes_send: 'نعم، أرسله إلى خبير', price: 'تعتمد الأسعار على التطبيق وتكوين الجهاز، لذلك لا تُنشر على موقعنا. يمكنني إرسال طلب عرض السعر إلى خبرائنا:', intent: 'يمكنني توجيهك إلى الخيار المناسب:', fwd: 'أرسل سؤالي إلى خبير', to_expert: 'اسأل خبيراً', menu: 'القائمة الرئيسية', skip: 'تخطٍّ',
            restart: 'محادثة جديدة', close: 'إغلاق', input: 'اكتب سؤالك…', send_aria: 'إرسال',
            foot: 'تستند الإجابات إلى المعلومات المنشورة في موقعنا.',
            you: 'أنت'
        },
        zh: {
            label: '我们能为您做些什么？', title: 'USTECH 助手',
            sub: '自动助手 · 我们的专家将在 24 小时内回复',
            greet: '您好！我是 USTECH 的自动助手，可以帮助您选择产品、申请报价、获取技术支持或查找常见问题的答案。我也可以将您的需求转交给我们的专家，他们会在 24 小时内回复。',
            m_product: '选择合适的产品', m_quote: '申请报价', m_support: '获取技术支持',
            m_software: '下载软件', m_faq: '查看常见问题', m_expert: '联系专家',
            pf_q: '您想做什么？',
            pf_inline: '在生产线上连续测量（在线）',
            pf_lab: '在实验室分析谷物、饲料或粗饲料',
            pf_field: '在现场使用手持式设备测量', pf_mill: '分析前研磨样品', pf_starch: '测量面粉中的破损淀粉',
            pf_model: '建立校准模型（软件）', pf_plc: '将分析仪结果接入 PLC/SCADA',
            pf_unsure: '不确定，按行业查看',
            pf_res: '以下产品可能符合您的需求：',
            pf_inline_note: '我们有三款在线分析仪。哪一款合适取决于您的产品和产线；请描述您的应用，我们的专家会为您推荐。',
            pf_lab_note: '分析前可使用 Tornado+ 研磨样品。',
            sec_q: '您所在的行业是？', sec_food: '食品与饲料', sec_dairy: '乳制品', sec_chem: '化工与制药', sec_other: '其他',
            sec_res: '本页介绍了我们面向您所在行业的解决方案：',
            sec_other_txt: '请描述您的工艺，我们的专家会帮助您找到合适的方案。',
            q_prod: '您对哪款产品感兴趣？', unsure: '还不确定',
            q_app: '您想测量哪种物料中的哪些指标？请简要描述（例如奶粉中的水分和脂肪）。',
            s_prod: '您需要哪款产品的支持？',
            s_serial: '设备的序列号是多少？如果不知道，请点击“跳过”。',
            s_issue: '请简要描述问题。',
            e_msg: '请输入您的留言：',
            f_intro: '请留下您的联系方式，我们的专家将在 24 小时内回复您。',
            f_name: '姓名', f_email: '电子邮箱', f_company: '公司', f_country: '国家/地区',
            f_consent: '我同意为处理本次请求而处理我的个人信息。', f_privacy: '隐私政策',
            f_send: '发送', f_cancel: '取消',
            f_err_req: '请填写姓名和电子邮箱，并勾选同意框。', f_err_email: '请输入有效的电子邮箱地址。',
            sending: '正在发送…',
            ok: '谢谢！您的请求已转交给我们的专家。我们将在 24 小时内回复至以下邮箱：\n{email}',
            fail: '请求未能发送。请重试，或使用联系页面上的表单。',
            test: '（本地测试：未发送邮件。）',
            contact: '联系页面',
            sw_txt: '您可以在各产品页面的下载区获取我们软件的最新版本：',
            faq_intro: '以下是部分常见问题。您也可以在下方输入自己的问题。',
            faq_err: '问题未能加载。您可以在常见问题页面查看：', faq_page: '常见问题页面',
            found_faq: '来自常见问题：', found_pages: '相关页面：',
            none: '我没有在网站上找到现成的答案。需要我把您的问题转交给我们的专家吗？',
            helped: '这些信息对您有帮助吗？如果没有，我可以把您的问题转交给我们的专家。',
            yes_send: '好的，转交专家', price: '价格取决于具体应用和仪器配置，因此未在网站上列出。我可以将您的报价请求转交给我们的专家：', intent: '我可以为您引导到合适的选项：', fwd: '把我的问题转交专家', to_expert: '咨询专家', menu: '主菜单', skip: '跳过',
            restart: '新对话', close: '关闭', input: '请输入您的问题…', send_aria: '发送',
            foot: '回答基于我们网站上的信息。',
            you: '您'
        }
    };
    var L = T[LANG];
    function t(k, v) {
        var s = (L[k] != null ? L[k] : T.en[k]) || k;
        if (v) Object.keys(v).forEach(function (n) { s = s.split('{' + n + '}').join(v[n]); });
        return s;
    }

    /* ------------------------------------------------------------------ */
    /* Urunler (yalniz YAYINDAKILER). Aciklama: EN sayfanin meta aciklamasi, */
    /* diger dillerde SEARCH_I18N'deki ceviri -- yeni iddia uretilmez.      */
    /* ------------------------------------------------------------------ */
    var URUNLER = {
        p17ec: { ad: 'ProLine17EC', sayfa: 'product-proline-17ec.html', form: 'ProLine 17EC',
            en: 'Inline NIR analyzer: 950-1650 nm InGaAs array, sapphire window and IP65 316 stainless housing, with real-time results every 2 to 20 seconds.' },
        p17ecs: { ad: 'ProLine17ECS', sayfa: 'product-proline-17ecs.html', form: 'ProLine 17ECS',
            en: 'Inline NIR analyzer with split probe and controller: 23,000:1 SNR, 2,000 spectra per sample, sapphire window and IP65 316 stainless head.' },
        p2550: { ad: 'ProLine2550', sayfa: 'product-proline-2550.html', form: 'ProLine 2550',
            en: 'Inline FT-NIR process analyzer, Essential or Advanced, for pipes, chutes and conveyors: 1,350–2,550 nm, IP65 and Ethernet TCP/IP.' },
        master: { ad: 'MasterLine17EC', sayfa: 'product-masterline.html', form: 'MasterLine17EC',
            en: 'Benchtop NIR analyzer: fast, non-destructive at-line QC of grain, feed ingredients and forage, with a rotating sample cup and motorized lid.' },
        trueline: { ad: 'TrueLine 17EC', sayfa: 'product-trueline-17ec.html', form: 'TrueLine 17EC',
            en: 'Handheld NIR analyzer for on-site measurements with the ProChem Mobile app: 908–1676 nm, 1.4 kg, Bluetooth.' },
        tornado: { ad: 'Tornado+', sayfa: 'product-tornado.html', form: 'Tornado+',
            en: 'Water-cooled laboratory mill with a 9,000 rpm rotor and ring sieves for fast, uniform grinding of grain, seed and feed samples before analysis.' },
        starch: { ad: 'StarchQC', sayfa: 'product-starchqc.html', form: 'StarchQC',
            en: 'Measures damaged starch in flour by amperometric iodine absorption in 8 minutes, reporting AI %, NDS, UCDC, AACC and Farrand units on a printer.' },
        calix: { ad: 'caliX', sayfa: 'product-calix.html', form: 'caliX',
            en: 'Build, validate and deploy NIR calibration models in minutes. caliX combines PLS, PCA and AutoML in an eight-module workspace for NIR, FTIR and Raman data.' },
        prochem: { ad: 'ProChem', sayfa: 'product-prochem.html', form: 'ProChem',
            en: 'Links USTECH analyzers to your PLC and SCADA: live dashboards, alarms and automatic setpoint control that turn NIR results into real-time action.' }
    };
    var URUN_SIRASI = ['p17ec', 'p17ecs', 'p2550', 'master', 'trueline', 'tornado', 'starch', 'calix', 'prochem'];
    var SEKTORLER = { sec_food: 'industry-food-feed.html', sec_dairy: 'industry-dairy.html', sec_chem: 'industry-chemical-pharma.html' };
    var IZINLI_SAYFALAR = /^(index|about|contact|faq|industries|industry-food-feed|industry-dairy|industry-chemical-pharma|products|products-devices|products-software|product-proline-17ec|product-proline-17ecs|product-proline-2550|product-masterline|product-trueline-17ec|product-tornado|product-starchqc|product-calix|product-prochem|knowledge|knowledge-technology|knowledge-blogs|blog-[a-z0-9-]+)\.html$/;

    function dizin() { return (typeof SEARCH_I18N !== 'undefined') ? SEARCH_I18N : {}; }
    function sayfaBilgi(sayfa) {
        var d = dizin()[sayfa];
        if (LANG !== 'en' && d && d[LANG]) return { t: d[LANG].t, s: d[LANG].s };
        var db = window.__ustechSearchDb || [];
        for (var i = 0; i < db.length; i++) if (db[i].url === sayfa) return { t: db[i].title, s: db[i].snippet };
        return { t: sayfa, s: '' };
    }
    function urunAciklama(k) {
        var u = URUNLER[k];
        if (LANG === 'en') return u.en;
        var d = dizin()[u.sayfa];
        return (d && d[LANG] && d[LANG].s) || u.en;
    }

    /* ------------------------------------------------------------------ */
    /* Durum ve kalicilik (sayfa degisince konusma kaybolmasin)            */
    /* ------------------------------------------------------------------ */
    var durum = { acik: false, log: [], akis: null };
    try {
        var kayit = JSON.parse(sessionStorage.getItem(DEPO) || 'null');
        if (kayit && kayit.l === LANG && kayit.d && Array.isArray(kayit.d.log)) durum = kayit.d;
    } catch (e) {}
    // { tur, bas (durum.log icindeki baslangic), adim, veri, form } -- sayfa degisince yarim akis da surer
    var akis = (durum.akis && typeof durum.akis === 'object') ? durum.akis : null;
    function kaydet() {
        try {
            if (durum.log.length > 60) {
                var fazla = durum.log.length - 60;
                durum.log = durum.log.slice(fazla);
                if (akis) akis.bas = Math.max(0, (akis.bas || 0) - fazla);
            }
            durum.akis = akis;
            sessionStorage.setItem(DEPO, JSON.stringify({ l: LANG, d: durum }));
        } catch (e) {}
    }
    function akisBaslat(tur, veri, bas) {
        akis = { bas: (typeof bas === 'number') ? bas : Math.max(0, durum.log.length - 1), tur: tur, veri: veri || {} };
        return akis;
    }
    function mobil() { return !!(window.matchMedia && window.matchMedia('(max-width: 600px)').matches); }
    var nesil = 0;            // her tiklama/yazmada artar; gec donen arama sonucu yeni akisi ezmesin
    var faqListe = null;      // [{q, a}]

    /* ------------------------------------------------------------------ */
    /* DOM yardimcilari                                                    */
    /* ------------------------------------------------------------------ */
    function el(etiket, ozel, cocuklar) {
        var e = document.createElement(etiket);
        if (ozel) Object.keys(ozel).forEach(function (k) {
            if (k === 'text') e.textContent = ozel[k];
            else if (k === 'cls') e.className = ozel[k];
            else if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), ozel[k]);
            else e.setAttribute(k, ozel[k]);
        });
        (cocuklar || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
        return e;
    }
    var IKON_SOHBET = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    var IKON_KAPAT = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    var IKON_GONDER = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>';
    var IKON_YENI = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';

    /* ------------------------------------------------------------------ */
    /* Arayuz                                                              */
    /* ------------------------------------------------------------------ */
    var kok, baslatici, panel, logEl, secenekEl, girdi, formAlani;

    function kur() {
        document.body.classList.add('ua-var');
        kok = el('div', { id: 'ustech-asistan', cls: 'ua' + (RTL ? ' ua-rtl' : ''), dir: RTL ? 'rtl' : 'ltr', lang: LANG });

        baslatici = el('button', { type: 'button', cls: 'ua-baslatici', 'aria-expanded': 'false', 'aria-controls': 'ua-panel' });
        baslatici.innerHTML = '<span class="ua-baslatici-ikon">' + IKON_SOHBET + '</span>';
        baslatici.appendChild(el('span', { cls: 'ua-baslatici-yazi', text: t('label') }));
        baslatici.addEventListener('click', function () { durum.acik ? kapat() : ac(); });

        panel = el('div', { id: 'ua-panel', cls: 'ua-panel', role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'ua-baslik', hidden: '' });
        var bas = el('div', { cls: 'ua-bas' }, [
            el('div', { cls: 'ua-logo', 'aria-hidden': 'true', text: 'U' }),
            el('div', { cls: 'ua-bas-yazi' }, [
                el('div', { id: 'ua-baslik', cls: 'ua-baslik', role: 'heading', 'aria-level': '2', text: t('title') }),
                el('p', { cls: 'ua-alt', text: t('sub') })
            ])
        ]);
        var yeniBtn = el('button', { type: 'button', cls: 'ua-ikon-btn', 'aria-label': t('restart'), title: t('restart'), onclick: yeniden });
        yeniBtn.innerHTML = IKON_YENI;
        var kapatBtn = el('button', { type: 'button', cls: 'ua-ikon-btn', 'aria-label': t('close'), title: t('close'), onclick: kapat });
        kapatBtn.innerHTML = IKON_KAPAT;
        bas.appendChild(el('div', { cls: 'ua-bas-dugmeler' }, [yeniBtn, kapatBtn]));

        logEl = el('div', { cls: 'ua-log', role: 'log', 'aria-live': 'polite', 'aria-relevant': 'additions' });
        secenekEl = el('div', { cls: 'ua-secenekler' });
        formAlani = el('div', { cls: 'ua-form-alani' });

        girdi = el('textarea', { cls: 'ua-girdi', rows: '1', placeholder: t('input'), 'aria-label': t('input'), maxlength: '1500' });
        girdi.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); yaziGonder(); }
        });
        girdi.addEventListener('input', function () { girdi.style.height = 'auto'; girdi.style.height = Math.min(girdi.scrollHeight, 110) + 'px'; });
        var gonderBtn = el('button', { type: 'button', cls: 'ua-gonder', 'aria-label': t('send_aria'), onclick: yaziGonder });
        gonderBtn.innerHTML = IKON_GONDER;
        var alt = el('div', { cls: 'ua-alt-bolum' }, [
            el('div', { cls: 'ua-girdi-satir' }, [girdi, gonderBtn]),
            el('p', { cls: 'ua-not', text: t('foot') })
        ]);

        panel.appendChild(bas);
        panel.appendChild(el('div', { cls: 'ua-govde' }, [logEl, formAlani, secenekEl]));
        panel.appendChild(alt);
        kok.appendChild(panel);
        kok.appendChild(baslatici);
        document.body.appendChild(kok);

        // Esc: odak panelde ya da (secenek silinince) body'ye dusmusse kapat
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape' || !durum.acik) return;
            var a = document.activeElement;
            if (a && a !== document.body && !kok.contains(a)) return;
            e.stopPropagation(); kapat();
        });
        // Telefonda tam ekran: Tab panelin disina (gorunmeyen sayfaya) kacmasin
        panel.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab' || !mobil()) return;
            var o = Array.prototype.filter.call(panel.querySelectorAll('button, a[href], input, textarea, summary'),
                function (x) { return !x.disabled && x.offsetParent !== null && x.tabIndex >= 0; });
            if (!o.length) return;
            var ilk = o[0], son = o[o.length - 1];
            if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
            else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
        });
        // Telefonda ekran klavyesi acilinca panel gorunen alana sigsin (iOS 100% yuksekligi kucultmez)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', gorunurAlan);
            window.visualViewport.addEventListener('scroll', gorunurAlan);
        }
        window.addEventListener('resize', gorunurAlan);

        // Eski konusmayi geri yukle
        durum.log.forEach(function (m) { ciz(m, true); });
        // Telefonda her sayfada tam ekran yeniden acilmasin (ornegin urun kartina basinca)
        if (durum.acik && mobil()) { durum.acik = false; kaydet(); }
        if (durum.acik) ac(true);
    }
    function gorunurAlan() {
        var v = window.visualViewport;
        if (!kok) return;
        if (durum.acik && mobil() && v) {
            kok.style.top = v.offsetTop + 'px'; kok.style.bottom = 'auto'; kok.style.height = v.height + 'px';
        } else {
            kok.style.top = ''; kok.style.bottom = ''; kok.style.height = '';
        }
        if (durum.acik) asagi();
    }

    function ac(sessiz) {
        durum.acik = true; kaydet();
        document.documentElement.classList.add('ua-kilit');
        panel.hidden = false;
        kok.classList.add('ua-acik');
        baslatici.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-modal', mobil() ? 'true' : 'false');
        if (!durum.log.length) karsila();
        else if (!secenekEl.childNodes.length && !formAlani.childNodes.length) bekleyeniCiz();
        gorunurAlan();
        asagi();
        if (!sessiz) {
            setTimeout(function () { girdi.focus(); }, 60);
            if (typeof window.trackEvent === 'function') window.trackEvent('assistant_open', { page_language: LANG });
        }
    }
    function kapat() {
        durum.acik = false; kaydet();
        document.documentElement.classList.remove('ua-kilit');
        panel.hidden = true;
        kok.classList.remove('ua-acik');
        baslatici.setAttribute('aria-expanded', 'false');
        gorunurAlan();
        baslatici.focus();
    }
    function yeniden() {
        nesil++;
        durum.log = []; akis = null; kaydet();
        logEl.innerHTML = ''; secenekEl.innerHTML = ''; formKapat();
        karsila();
        girdi.focus();
    }
    /* Sayfa degisince yarim kalan akisi yeniden ciz (soru gunlukte zaten duruyor) */
    function bekleyeniCiz() {
        if (!akis) return anaMenuDugmeleri();
        if (akis.form) return formGoster(true);
        if (akis.adim === 'seri') return secenekler([{ t: t('skip'), f: function () { akis.veri.seri = ''; sorunSor(); } }, menuSecenegi()]);
        if (akis.adim === 'uygulama' || akis.adim === 'sorun' || akis.adim === 'mesaj') return secenekler([menuSecenegi()]);
        // dugme bekleyen ara adim (urun secimi vb.): dugmeler yeniden kurulamaz, temiz baslat
        akis = null; kaydet();
        anaMenuDugmeleri();
    }
    function formKapat() { formAlani.innerHTML = ''; girdi.disabled = false; if (akis) akis.form = false; }
    function asagi() { var g = logEl.parentNode; g.scrollTop = g.scrollHeight; }

    /* Mesaj modeli: { w: 'b'|'u', x: metin, k: [ {t, u, d} kart/baglanti ], f: [{q,a}] } */
    function mesaj(m) { durum.log.push(m); kaydet(); ciz(m); }
    function ciz(m, eski) {
        var balon = el('div', { cls: 'ua-mesaj ' + (m.w === 'u' ? 'ua-kullanici' : 'ua-bot') });
        if (m.w === 'u') balon.appendChild(el('span', { cls: 'ua-gizli', text: t('you') + ': ' }));
        if (m.x) m.x.split('\n').forEach(function (satir, i) {
            if (i) balon.appendChild(el('br'));
            balon.appendChild(document.createTextNode(satir));
        });
        if (m.f && m.f.length) {
            m.f.forEach(function (s) {
                var d = el('details', { cls: 'ua-sss' }, [el('summary', { text: s.q }), el('p', { text: s.a })]);
                if (m.f.length === 1) d.open = true;
                balon.appendChild(d);
            });
        }
        if (m.k && m.k.length) {
            var liste = el('div', { cls: 'ua-kartlar' });
            m.k.forEach(function (k) {
                var a = el('a', { cls: 'ua-kart', href: k.u }, [el('strong', { text: k.t })]);
                if (k.d) a.appendChild(el('span', { text: k.d }));
                if (/^https?:/.test(k.u) && k.u.indexOf(location.host) < 0) { a.target = '_blank'; a.rel = 'noopener'; }
                liste.appendChild(a);
            });
            balon.appendChild(liste);
        }
        logEl.appendChild(balon);
        if (!eski) asagi();
    }
    function bot(x, ek) { var m = { w: 'b', x: x }; if (ek) Object.keys(ek).forEach(function (k) { m[k] = ek[k]; }); mesaj(m); }
    function kullanici(x) { mesaj({ w: 'u', x: x }); }

    function secenekler(liste) {
        secenekEl.innerHTML = '';
        liste.forEach(function (s) {
            secenekEl.appendChild(el('button', { type: 'button', cls: 'ua-secenek' + (s.ikincil ? ' ua-ikincil' : ''), text: s.t,
                onclick: function () {
                    nesil++;
                    secenekEl.innerHTML = ''; if (!s.sessiz) kullanici(s.t); s.f();
                    // tiklanan dugme silindi -> odak body'ye dustu; klavye kullanicisi icin geri getir
                    setTimeout(function () {
                        if (!durum.acik || panel.contains(document.activeElement)) return;
                        var ilk = secenekEl.querySelector('button');
                        (ilk || (girdi.disabled ? null : girdi) || panel.querySelector('.ua-ikon-btn')).focus();
                    }, 0);
                } }));
        });
        asagi();
    }
    function menuSecenegi() { return { t: t('menu'), ikincil: true, f: anaMenu }; }
    function uzmanSecenegi() { return { t: t('to_expert'), f: function () { uzmanAkisi(); } }; }

    /* ------------------------------------------------------------------ */
    /* Akislar                                                             */
    /* ------------------------------------------------------------------ */
    function karsila() { bot(t('greet')); anaMenuDugmeleri(); }
    function anaMenu() { formKapat(); akis = null; kaydet(); anaMenuDugmeleri(); }
    function anaMenuDugmeleri() {
        secenekler([
            { t: t('m_product'), f: urunBulucu },
            { t: t('m_quote'), f: function () { teklifAkisi(); } },
            { t: t('m_support'), f: destekAkisi },
            { t: t('m_software'), f: yazilim },
            { t: t('m_faq'), f: sss },
            { t: t('m_expert'), f: function () { uzmanAkisi(); } }
        ]);
    }

    function urunKartlari(anahtarlar) {
        return anahtarlar.map(function (k) { return { t: URUNLER[k].ad, u: sayfaUrl(URUNLER[k].sayfa), d: urunAciklama(k) }; });
    }
    function sonuc(anahtarlar, not, teklifUrunu) {
        bot(t('pf_res') + (not ? '\n' + not : ''), { k: urunKartlari(anahtarlar) });
        secenekler([
            { t: t('m_quote'), f: function () { teklifAkisi(teklifUrunu); } },
            uzmanSecenegi(), menuSecenegi()
        ]);
    }
    function urunBulucu() {
        akisBaslat('bulucu');
        bot(t('pf_q'));
        secenekler([
            { t: t('pf_inline'), f: function () { sonuc(['p17ec', 'p17ecs', 'p2550', 'prochem'], t('pf_inline_note')); } },
            { t: t('pf_lab'), f: function () { sonuc(['master', 'tornado'], t('pf_lab_note'), 'master'); } },
            { t: t('pf_field'), f: function () { sonuc(['trueline'], '', 'trueline'); } },
            { t: t('pf_mill'), f: function () { sonuc(['tornado'], '', 'tornado'); } },
            { t: t('pf_starch'), f: function () { sonuc(['starch'], '', 'starch'); } },
            { t: t('pf_model'), f: function () { sonuc(['calix'], '', 'calix'); } },
            { t: t('pf_plc'), f: function () { sonuc(['prochem'], '', 'prochem'); } },
            { t: t('pf_unsure'), f: sektor },
            menuSecenegi()
        ]);
    }
    function sektor() {
        bot(t('sec_q'));
        var liste = Object.keys(SEKTORLER).map(function (k) {
            return { t: t(k), f: function () {
                var b = sayfaBilgi(SEKTORLER[k]);
                bot(t('sec_res'), { k: [{ t: b.t, u: sayfaUrl(SEKTORLER[k]), d: b.s }] });
                secenekler([{ t: t('m_quote'), f: function () { teklifAkisi(); } }, uzmanSecenegi(), menuSecenegi()]);
            } };
        });
        liste.push({ t: t('sec_other'), f: function () { bot(t('sec_other_txt')); uzmanAkisi(); } });
        liste.push(menuSecenegi());
        secenekler(liste);
    }

    function urunSecimi(soru, devam) {
        bot(soru);
        var liste = URUN_SIRASI.map(function (k) { return { t: URUNLER[k].ad, f: function () { devam(URUNLER[k].form); } }; });
        liste.push({ t: t('unsure'), f: function () { devam(''); } });
        liste.push(menuSecenegi());
        secenekler(liste);
    }
    function teklifAkisi(onSecili, bas) {
        akisBaslat('quote', {}, bas);
        function uygulama(urun) {
            akis.veri.urun = urun;
            akis.adim = 'uygulama';
            bot(t('q_app'));
            secenekler([menuSecenegi()]);
            girdi.focus();
        }
        if (onSecili) { kullanici(URUNLER[onSecili].ad); uygulama(URUNLER[onSecili].form); }
        else urunSecimi(t('q_prod'), uygulama);
    }
    function destekAkisi(bas) {
        akisBaslat('support', {}, bas);
        urunSecimi(t('s_prod'), function (urun) {
            akis.veri.urun = urun;
            akis.adim = 'seri';
            bot(t('s_serial'));
            secenekler([{ t: t('skip'), f: function () { akis.veri.seri = ''; sorunSor(); } }, menuSecenegi()]);
            girdi.focus();
        });
    }
    function sorunSor() { akis.adim = 'sorun'; bot(t('s_issue')); secenekler([menuSecenegi()]); girdi.focus(); }
    function uzmanAkisi() {
        akisBaslat('expert');
        akis.adim = 'mesaj';
        bot(t('e_msg'));
        secenekler([menuSecenegi()]);
        girdi.focus();
    }
    function yazilim() {
        bot(t('sw_txt'), { k: [
            { t: 'caliX', u: sayfaUrl('product-calix.html') + '#software-portal', d: urunAciklama('calix') },
            { t: 'ProChem', u: sayfaUrl('product-prochem.html') + '#software-portal', d: urunAciklama('prochem') }
        ] });
        secenekler([uzmanSecenegi(), menuSecenegi()]);
    }

    function sssYukle(cb) {
        if (faqListe) return cb(faqListe);
        fetch(sayfaUrl('faq.html'), { credentials: 'same-origin' }).then(function (r) {
            if (!r.ok) throw new Error(r.status); return r.text();
        }).then(function (html) {
            var belge = new DOMParser().parseFromString(html, 'text/html');
            var liste = [];
            belge.querySelectorAll('script[type="application/ld+json"]').forEach(function (s) {
                try {
                    var j = JSON.parse(s.textContent);
                    (Array.isArray(j) ? j : [j]).forEach(function (o) {
                        if (o && o['@type'] === 'FAQPage' && o.mainEntity) o.mainEntity.forEach(function (q) {
                            if (q && q.name && q.acceptedAnswer) liste.push({ q: q.name, a: q.acceptedAnswer.text || '' });
                        });
                    });
                } catch (e) {}
            });
            faqListe = liste;
            cb(liste);
        }).catch(function () { faqListe = null; cb(null); });
    }
    function sss() {
        sssYukle(function (liste) {
            if (!liste || !liste.length) {
                bot(t('faq_err'), { k: [{ t: t('faq_page'), u: sayfaUrl('faq.html') }] });
                secenekler([uzmanSecenegi(), menuSecenegi()]);
                return;
            }
            bot(t('faq_intro'));
            var ilk = liste.slice(0, 6).map(function (s) {
                return { t: s.q, f: function () { bot('', { f: [s] }); sonrasi(); } };
            });
            ilk.push(menuSecenegi());
            secenekler(ilk);
        });
    }
    function sonrasi() { secenekler([uzmanSecenegi(), menuSecenegi()]); }

    /* ------------------------------------------------------------------ */
    /* Serbest metin: akis bekliyorsa yanit, degilse sitede arama          */
    /* ------------------------------------------------------------------ */
    function yaziGonder() {
        var x = (girdi.value || '').trim();
        if (!x) return;
        if (girdi.disabled) return;
        nesil++;
        girdi.value = ''; girdi.style.height = 'auto';
        kullanici(x);
        secenekEl.innerHTML = '';
        if (akis && akis.adim === 'uygulama') { akis.veri.uygulama = x; akis.adim = null; return formGoster(); }
        if (akis && akis.adim === 'seri') { akis.veri.seri = x; return sorunSor(); }
        if (akis && akis.adim === 'sorun') { akis.veri.sorun = x; akis.adim = null; return formGoster(); }
        if (akis && akis.adim === 'mesaj') { akis.veri.mesaj = x; akis.adim = null; return formGoster(); }
        // Selam / tesekkur: arama yapma, menuyu goster
        if (/^(merhaba|selam|selamlar|iyi gunler|tesekkur(ler)?|sagol|hello|hi|hey|thanks|thank you|good (morning|afternoon)|bonjour|salut|merci|hallo|guten tag|danke|hola|buenos dias|gracias|مرحبا|السلام عليكم|شكرا|你好|您好|谢谢)[\s!.,?]*$/.test(normal(x))) {
            bot(t('label')); anaMenuDugmeleri(); return;
        }
        ara(x);
    }

    // Durak kelimeleri NORMALLESTIRILMIS bicimde (aksansiz, ı -> i)
    var DURAK = /^(the|and|for|with|what|how|does|can|you|your|are|is|of|in|on|to|an|do|my|we|our|which|there|have|bir|ve|ile|icin|mi|mu|ne|nasil|nedir|neler|var|bu|su|da|de|ki|olan|olur|olacak|midir|hangi|kadar|kac|le|la|les|des|du|un|une|et|est|pour|avec|quel|quelle|comment|der|die|das|und|ist|mit|fur|ein|eine|wie|was|welche|el|los|las|es|con|para|que|una|del|como|cual)$/;
    function normal(s) {
        return (s || '').toLocaleLowerCase(LANG === 'tr' ? 'tr' : undefined)
            .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i')
            // Arapca: hareke/tesdid ve hemze isaretleri (NFD sonrasi ayri karakter), ta marbuta, elif maksura
            .replace(/[ً-ٰٟـ]/g, '').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
            // Cince ile Latin bitisikse ("连接PLC") ayri kelime say
            .replace(/([一-鿿])(?=[^一-鿿\s])/g, '$1 ').replace(/([^一-鿿\s])(?=[一-鿿])/g, '$1 ');
    }
    // \p{L} (ES2018) eski tarayicida SOZDIZIMI hatasi verir ve butun dosyayi durdurur -> RegExp ile, yedekli
    var AYIRICI = (function () {
        try { return new RegExp('[^\\p{L}\\p{N}+]+', 'u'); }
        catch (e) { return /[^0-9a-zÀ-ɏͰ-ϿЀ-ӿ؀-ۿ一-鿿+]+/; }
    })();
    function kelimeler(n) { return n.split(AYIRICI).filter(Boolean); }
    function parcala(s) {
        var n = normal(s);
        var p = kelimeler(n).filter(function (w) { return w.length > 1 && !DURAK.test(w) && !/^[一-鿿]+$/.test(w); });
        // Cince: bosluk yok -> ikili karakter gruplari
        var cjk = n.match(/[一-鿿]+/g) || [];
        // soru kaliplari ("是多少", "如何", "什么") ve baglac karakterleri ikiliyi anlamsizlastirir -> at
        var CJK_DURAK = /^(多少|什么|如何|怎么|怎样|可以|是否|有没|没有|请问|一下|哪些|哪个|为什|我们|你们|您的)$|[的是吗呢了么和与在有]/;
        cjk.forEach(function (g) {
            for (var i = 0; i < g.length - 1; i++) { var c = g.substr(i, 2); if (!CJK_DURAK.test(c)) p.push(c); }
            if (g.length === 1 && !CJK_DURAK.test(g)) p.push(g);
        });
        return p;
    }
    /* Esleme: Latin kelimeler alan kelimelerinin BASINDAN eslesir (nem -> nemi, nem olcumu;
       ama "hava" -> "havalandirma" gibi ic eslesme yok sayilmaz, kapsam kurali eler).
       Sorudaki kelimelerin en az yarisi bulunmazsa sonuc 0. */
    function puan(parcalar, alanlar) {
        if (!parcalar.length) return 0;
        var toplam = 0, eslesen = 0;
        parcalar.forEach(function (w) {
            var cjk = /[一-鿿]/.test(w), bulundu = false;
            alanlar.forEach(function (a) {
                if (!a.m) return;
                if (!a.k) a.k = kelimeler(a.m);
                var var_ = cjk ? a.m.indexOf(w) >= 0
                    : a.k.some(function (k) { return k === w || (w.length >= 3 && k.indexOf(w) === 0) || (k.length >= 4 && w.indexOf(k) === 0 && w.length - k.length <= 3); });
                if (var_) { toplam += a.w * (w.length > 4 ? 1.5 : 1); bulundu = true; }
            });
            if (bulundu) eslesen++;
        });
        var kapsam = eslesen / parcalar.length;
        // Cince ikili gruplarin bir kismi kelime sinirini asar (anlamsiz) -> esik daha dusuk
        var yalnizCjk = parcalar.every(function (w) { return /[一-鿿]/.test(w); });
        if (kapsam < (yalnizCjk ? 0.34 : 0.5)) return 0;
        return toplam * kapsam;
    }
    /* Niyet: fiyat/teklif -> teklif akisi; ariza/servis -> destek akisi. Soruda urun adi
       geciyorsa o urun on secili gelir. */
    var NIYET_TEKLIF = /(fiyat|ucret|teklif|kac para|price|pricing|cost|quote|quotation|prix|tarif|devis|preis|angebot|kosten|precio|presupuesto|cotizacion|how much|was kostet|wie viel kostet|combien|cuanto cuesta|cuanto vale|سعر|اسعار|عرض سعر|价格|报价|多少钱)/;
    var NIYET_DESTEK = /(ariza|bozuk|bozul|hata|calismiyor|servis|tamir|destek|support|repair|broken|error|not working|fault|panne|reparation|assistance|defekt|reparatur|fehler|averia|reparacion|soporte|عطل|اصلاح|دعم|故障|维修|支持|坏了|损坏)/;
    function urunBul(n) {
        // uzun ad once: "proline17ecs" icinde "proline17ec" de gecer
        var bitisik = n.replace(/\s+/g, '');
        var sirali = URUN_SIRASI.slice().sort(function (a, b) { return URUNLER[b].ad.length - URUNLER[a].ad.length; });
        for (var i = 0; i < sirali.length; i++) {
            if (bitisik.indexOf(normal(URUNLER[sirali[i]].ad).replace(/\s+/g, '')) >= 0) return sirali[i];
        }
        return null;
    }
    function niyetSecenekleri(x, bas) {
        var n = normal(x), liste = [], urun = urunBul(n);
        if (NIYET_TEKLIF.test(n)) liste.push({ t: t('m_quote'), f: function () { teklifAkisi(urun || undefined, bas); } });
        if (NIYET_DESTEK.test(n)) liste.push({ t: t('m_support'), f: function () { destekAkisi(bas); } });
        return liste;
    }

    function ara(x) {
        var p = parcala(x);
        var bas = Math.max(0, durum.log.length - 1);   // ziyaretcinin sorusu: e-postadaki ozet buradan baslar
        var niyet = niyetSecenekleri(x, bas);
        // Fiyat sitede yazmiyor: aramada zayif eslesmeler ("kac" -> "kacinir") yerine dogrudan teklif yolu
        if (NIYET_TEKLIF.test(normal(x))) { bot(t('price')); secenekler(niyet.concat([menuSecenegi()])); return; }
        var benim = nesil;
        sssYukle(function (liste) {
            if (benim !== nesil) return;   // bu arada baska bir akis baslatildi
            akis = null;
            var sssSonuc = (liste || []).map(function (s) {
                return { s: s, p: puan(p, [{ m: normal(s.q), w: 3 }, { m: normal(s.a), w: 1 }]) };
            }).filter(function (r) { return r.p >= 2.5; }).sort(function (a, b) { return b.p - a.p; }).slice(0, 2);

            var sayfalar = [];
            if (LANG === 'en') {
                (window.__ustechSearchDb || []).forEach(function (r) {
                    if (!IZINLI_SAYFALAR.test(r.url)) return;
                    sayfalar.push({ url: r.url, t: r.title, s: r.snippet, p: puan(p, [{ m: normal(r.title), w: 3 }, { m: normal(r.keywords), w: 2 }, { m: normal(r.snippet), w: 1 }]) });
                });
            } else {
                var d = dizin();
                Object.keys(d).forEach(function (u) {
                    if (!IZINLI_SAYFALAR.test(u) || !d[u][LANG]) return;
                    var r = d[u][LANG];
                    sayfalar.push({ url: u, t: r.t, s: r.s, p: puan(p, [{ m: normal(r.t), w: 3 }, { m: normal(r.k), w: 2 }, { m: normal(r.s), w: 1 }]) });
                });
            }
            var gorulen = {};
            sayfalar = sayfalar.filter(function (r) { return r.p >= 2; }).sort(function (a, b) { return b.p - a.p; })
                .filter(function (r) { if (gorulen[r.url]) return false; gorulen[r.url] = 1; return true; }).slice(0, 3);

            if (!sssSonuc.length && !sayfalar.length) {
                if (niyet.length) { bot(t('intent')); secenekler(niyet.concat([menuSecenegi()])); return; }
                bot(t('none'));
                secenekler([
                    { t: t('yes_send'), f: function () { akisBaslat('expert', { mesaj: x }, bas); formGoster(); } },
                    menuSecenegi()
                ]);
                return;
            }
            if (sssSonuc.length) bot(t('found_faq'), { f: sssSonuc.map(function (r) { return r.s; }) });
            if (sayfalar.length) bot(t('found_pages'), { k: sayfalar.map(function (r) { return { t: r.t, u: sayfaUrl(r.url), d: r.s }; }) });
            bot(t('helped'));
            secenekler(niyet.concat([
                { t: t('fwd'), f: function () { akisBaslat('expert', { mesaj: x }, bas); formGoster(); } },
                menuSecenegi()
            ]));
        });
    }

    /* ------------------------------------------------------------------ */
    /* Iletisim formu ve gonderim                                          */
    /* ------------------------------------------------------------------ */
    function alan(id, etiket, tur, zorunlu, oto) {
        var g = el('input', { id: id, type: tur, cls: 'ua-input', autocomplete: oto || 'off', maxlength: '160' });
        if (zorunlu) { g.required = true; g.setAttribute('aria-required', 'true'); }
        return el('label', { cls: 'ua-etiket', for: id }, [el('span', { text: etiket + (zorunlu ? ' *' : '') }), g]);
    }
    function formGoster(yenidenCiz) {
        secenekEl.innerHTML = '';
        if (!akis) akisBaslat('expert');
        akis.form = true;
        if (!yenidenCiz) bot(t('f_intro')); else kaydet();
        girdi.disabled = true;   // form acikken yazilan metin aramaya gidip akisi ezmesin
        var hata = el('div', { cls: 'ua-hata', role: 'alert' });
        var onay = el('input', { id: 'ua-onay', type: 'checkbox' });
        var gizlilik = el('a', { href: sayfaUrl('privacy-policy.html'), target: '_blank', rel: 'noopener', text: t('f_privacy') });
        var tuzak = el('input', { type: 'checkbox', name: 'botcheck', cls: 'ua-tuzak', tabindex: '-1', 'aria-hidden': 'true' });
        var gonder = el('button', { type: 'submit', cls: 'ua-btn ua-btn-ana', text: t('f_send') });
        var vazgec = el('button', { type: 'button', cls: 'ua-btn', text: t('f_cancel'), onclick: function () { nesil++; anaMenu(); setTimeout(function () { var b = secenekEl.querySelector('button'); if (b) b.focus(); }, 0); } });
        var form = el('form', { cls: 'ua-form', novalidate: '' }, [
            alan('ua-ad', t('f_name'), 'text', true, 'name'),
            alan('ua-eposta', t('f_email'), 'email', true, 'email'),
            alan('ua-sirket', t('f_company'), 'text', false, 'organization'),
            alan('ua-ulke', t('f_country'), 'text', false, 'country-name'),
            el('label', { cls: 'ua-onay', for: 'ua-onay' }, [onay, el('span', {}, [t('f_consent') + ' ', gizlilik])]),
            tuzak, hata,
            el('div', { cls: 'ua-form-dugmeler' }, [vazgec, gonder])
        ]);
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var ad = form.querySelector('#ua-ad').value.trim();
            var eposta = form.querySelector('#ua-eposta').value.trim();
            hata.textContent = '';
            if (!ad || !eposta || !onay.checked) { hata.textContent = t('f_err_req'); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(eposta)) { hata.textContent = t('f_err_email'); return; }
            if (tuzak.checked) return;
            gonder.disabled = true; vazgec.disabled = true; gonder.textContent = t('sending');
            gonderTalep({
                ad: ad, eposta: eposta,
                sirket: form.querySelector('#ua-sirket').value.trim(),
                ulke: form.querySelector('#ua-ulke').value.trim()
            }, function (basarili, testMi) {
                if (basarili) {
                    formKapat();
                    akis = null;
                    bot(t('ok', { email: '\u2068' + eposta + '\u2069' }) + (testMi ? '\n' + t('test') : ''));
                    secenekler([menuSecenegi()]);
                    var ilk = secenekEl.querySelector('button'); if (ilk) ilk.focus();
                } else {
                    gonder.disabled = false; vazgec.disabled = false; gonder.textContent = t('f_send');
                    hata.textContent = t('fail');
                    hata.appendChild(document.createTextNode(' '));
                    hata.appendChild(el('a', { href: sayfaUrl('contact.html'), text: t('contact') }));
                }
            });
        });
        formAlani.innerHTML = '';
        formAlani.appendChild(form);
        asagi();
        if (!yenidenCiz) setTimeout(function () { form.querySelector('#ua-ad').focus(); }, 50);
    }

    var TUR_ADI = { quote: 'Quote request', support: 'Technical support', expert: 'Message to an expert' };
    function gonderTalep(kisi, cb) {
        var v = (akis && akis.veri) || {};
        var tur = (akis && akis.tur) || 'expert';
        var satirlar = [
            'Request type: ' + TUR_ADI[tur],
            v.urun ? 'Product: ' + v.urun : (tur !== 'expert' ? 'Product: not sure yet' : ''),
            v.uygulama ? 'Application / parameters: ' + v.uygulama : '',
            tur === 'support' ? 'Serial number: ' + (v.seri || '-') : '',
            v.sorun ? 'Issue: ' + v.sorun : '',
            v.mesaj ? 'Message: ' + v.mesaj : '',
            '\u0000',
            'Name: ' + kisi.ad, 'Email: ' + kisi.eposta,
            'Company: ' + (kisi.sirket || '-'), 'Country: ' + (kisi.ulke || '-'),
            'Visitor language: ' + LANG, 'Page: ' + location.href,
            '\u0000',
            '--- Conversation ---'
        ].filter(function (s) { return s !== ''; }).map(function (s) { return s === '\u0000' ? '' : s; });
        // akisin basindan (ziyaretcinin ilk tiklamasi/sorusu) itibaren; en fazla son 24 kayit
        durum.log.slice(Math.max((akis && akis.bas) || 0, durum.log.length - 24)).forEach(function (m) {
            var x = (m.x || '') + (m.f ? ' ' + m.f.map(function (s) { return '[FAQ] ' + s.q; }).join(' ') : '') + (m.k ? ' ' + m.k.map(function (k) { return '[' + k.t + ']'; }).join(' ') : '');
            if (x.trim()) satirlar.push((m.w === 'u' ? 'Visitor: ' : 'Assistant: ') + x.trim().slice(0, 400));
        });
        var govde = {
            access_key: WEB3FORMS_KEY,
            subject: 'USTECH Assistant – ' + TUR_ADI[tur] + (v.urun ? ': ' + v.urun : '') + ' (' + kisi.ad + ')',
            from_name: 'USTECH Website Assistant',
            inquiry_type: 'assistant-' + tur,
            product_interest: v.urun || '',
            name: kisi.ad, email: kisi.eposta, company: kisi.sirket, country: kisi.ulke,
            message: satirlar.join('\n')
        };
        function olcum() {
            if (typeof window.trackEvent === 'function') window.trackEvent('generate_lead', { form_type: 'assistant_' + tur, product: v.urun || '' });
        }
        if (!GERCEK_GONDER) {
            if (window.console) console.info('[USTECH Asistan] yerel deneme, gonderilmedi:', govde);
            setTimeout(function () { olcum(); cb(true, true); }, 500);
            return;
        }
        // Baglanti takilirsa "Gonderiliyor..." sonsuza kadar kalmasin: 15 sn sonra hata goster
        var bitti = false;
        function sonuclan(ok) { if (bitti) return; bitti = true; clearTimeout(zaman); if (ok) olcum(); cb(ok, false); }
        var iptal = (typeof AbortController === 'function') ? new AbortController() : null;
        var zaman = setTimeout(function () { if (iptal) iptal.abort(); sonuclan(false); }, 15000);
        fetch('https://api.web3forms.com/submit', {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(govde), signal: iptal ? iptal.signal : undefined
        }).then(function (r) { return r.json().then(function (j) { return r.status === 200 && j && j.success !== false; }); })
            .then(function (ok) { sonuclan(!!ok); })
            .catch(function () { sonuclan(false); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kur);
    else kur();
})();
