"""
Master Component Template Generator for Unified Header & Footer across all 5 languages.
Guarantees 100% vocabulary consistency and matches the EXACT original CSS layout and structure.
"""
import os
import re

LANG_CONFIG = {
    'en': {
        'home': 'Home',
        'industries': 'Industries',
        'ind_food': 'Food and Feed',
        'ind_dairy': 'Dairy',
        'ind_chem': 'Chemical and Pharma',
        'products': 'Products',
        'prod_devices': 'Devices',
        'prod_software': 'Software',
        'prod_portal': 'Portal',
        'prod_models': 'Calibration Models',
        'knowledge': 'Knowledge',
        'know_tech': 'Technology',
        'know_blogs': 'Blogs',
        'about': 'About Us',
        'contact': 'Contact',
        'faq': 'FAQ',
        'footer_desc': 'Providing high-precision analytical spectroscopy devices and software solutions since 2023.',
        'footer_ind': 'Industries',
        'footer_prod': 'Products',
        'footer_contact': 'Contact Us',
        'footer_phone_lbl': 'Phone:',
        'footer_email_lbl': 'Email:',
        'footer_follow': 'Follow us on:',
        'footer_privacy': 'Privacy Policy',
        'footer_terms': 'Terms of Service',
        'footer_rights': 'All rights reserved.',
        'footer_tagline': 'Designed for scientific and industrial precision.',
        'logo_alt': 'USTECH Innovations Logo',
        'nav_toggle': 'Toggle Navigation'
    },
    'tr': {
        'home': 'Ana Sayfa',
        'industries': 'Sektörler',
        'ind_food': 'Gıda ve Yem',
        'ind_dairy': 'Süt ve Süt Ürünleri',
        'ind_chem': 'Kimya ve İlaç',
        'products': 'Ürünler',
        'prod_devices': 'Cihazlar',
        'prod_software': 'Yazılım',
        'prod_portal': 'Portal',
        'prod_models': 'Kalibrasyon Modelleri',
        'knowledge': 'Bilgi Bankası',
        'know_tech': 'Teknoloji',
        'know_blogs': 'Bloglar',
        'about': 'Hakkımızda',
        'contact': 'İletişim',
        'faq': 'SSS',
        'footer_desc': "2023'ten beri yüksek hassasiyetli analitik spektroskopi cihazları ve yazılım çözümleri sunuyoruz.",
        'footer_ind': 'Sektörler',
        'footer_prod': 'Ürünler',
        'footer_contact': 'İletişim',
        'footer_phone_lbl': 'Telefon:',
        'footer_email_lbl': 'E-posta:',
        'footer_follow': 'Bizi takip edin:',
        'footer_privacy': 'Gizlilik Politikası',
        'footer_terms': 'Kullanım Koşulları',
        'footer_rights': 'Tüm hakları saklıdır.',
        'footer_tagline': 'Bilimsel ve endüstriyel hassasiyet için tasarlandı.',
        'logo_alt': 'USTECH Innovations logosu',
        'nav_toggle': 'Menüyü aç/kapat'
    },
    'fr': {
        'home': 'Accueil',
        'industries': 'Industries',
        'ind_food': 'Alimentation et Nutrition Animale',
        'ind_dairy': 'Produits Laitiers',
        'ind_chem': 'Chimie et Pharmacie',
        'products': 'Produits',
        'prod_devices': 'Appareils',
        'prod_software': 'Logiciels',
        'prod_portal': 'Portail',
        'prod_models': "Modèles d'Étalonnage",
        'knowledge': 'Connaissances',
        'know_tech': 'Technologie',
        'know_blogs': 'Blogs',
        'about': 'À Propos',
        'contact': 'Contact',
        'faq': 'FAQ',
        'footer_desc': "Fourniture d'appareils de spectroscopie analytique de haute précision et de solutions logicielles depuis 2023.",
        'footer_ind': 'Industries',
        'footer_prod': 'Produits',
        'footer_contact': 'Contactez-nous',
        'footer_phone_lbl': 'Téléphone :',
        'footer_email_lbl': 'E-mail :',
        'footer_follow': 'Suivez-nous sur :',
        'footer_privacy': 'Politique de Confidentialité',
        'footer_terms': "Conditions d'Utilisation",
        'footer_rights': 'Tous droits réservés.',
        'footer_tagline': 'Conçu pour la précision scientifique et industrielle.',
        'logo_alt': 'Logo USTECH Innovations',
        'nav_toggle': 'Basculer la navigation'
    },
    'de': {
        'home': 'Startseite',
        'industries': 'Branchen',
        'ind_food': 'Lebensmittel und Futtermittel',
        'ind_dairy': 'Milchwirtschaft',
        'ind_chem': 'Chemie und Pharma',
        'products': 'Produkte',
        'prod_devices': 'Geräte',
        'prod_software': 'Software',
        'prod_portal': 'Portal',
        'prod_models': 'Kalibrationsmodelle',
        'knowledge': 'Wissen',
        'know_tech': 'Technologie',
        'know_blogs': 'Blogs',
        'about': 'Über Uns',
        'contact': 'Kontakt',
        'faq': 'FAQ',
        'footer_desc': 'Bereitstellung hochpräziser analytischer Spektroskopiegeräte und Softwarelösungen seit 2023.',
        'footer_ind': 'Branchen',
        'footer_prod': 'Produkte',
        'footer_contact': 'Kontakt',
        'footer_phone_lbl': 'Telefon:',
        'footer_email_lbl': 'E-Mail:',
        'footer_follow': 'Folgen Sie uns auf:',
        'footer_privacy': 'Datenschutzrichtlinie',
        'footer_terms': 'Nutzungsbedingungen',
        'footer_rights': 'Alle Rechte vorbehalten.',
        'footer_tagline': 'Entwickelt für wissenschaftliche und industrielle Präzision.',
        'logo_alt': 'USTECH Innovations Logo',
        'nav_toggle': 'Navigation umschalten'
    },
    'es': {
        'home': 'Inicio',
        'industries': 'Industrias',
        'ind_food': 'Alimentos y Piensos',
        'ind_dairy': 'Lácteos',
        'ind_chem': 'Química y Farmacia',
        'products': 'Productos',
        'prod_devices': 'Dispositivos',
        'prod_software': 'Software',
        'prod_portal': 'Portal',
        'prod_models': 'Modelos de Calibración',
        'knowledge': 'Conocimiento',
        'know_tech': 'Tecnología',
        'know_blogs': 'Blogs',
        'about': 'Sobre Nosotros',
        'contact': 'Contacto',
        'faq': 'FAQ',
        'footer_desc': 'Proporcionando dispositivos de espectroscopia analítica de alta precisión y soluciones de software desde 2023.',
        'footer_ind': 'Industrias',
        'footer_prod': 'Productos',
        'footer_contact': 'Contáctenos',
        'footer_phone_lbl': 'Teléfono:',
        'footer_email_lbl': 'Correo electrónico:',
        'footer_follow': 'Síganos en:',
        'footer_privacy': 'Política de Privacidad',
        'footer_terms': 'Términos de Servicio',
        'footer_rights': 'Todos los derechos reservados.',
        'footer_tagline': 'Diseñado para la precisión científica e industrial.',
        'logo_alt': 'Logotipo de USTECH Innovations',
        'nav_toggle': 'Alternar navegación'
    },
    'ar': {
        'home': 'الرئيسية',
        'industries': 'الصناعات',
        'ind_food': 'الأغذية والأعلاف',
        'ind_dairy': 'الألبان',
        'ind_chem': 'الكيمياء والصيدلة',
        'products': 'المنتجات',
        'prod_devices': 'الأجهزة',
        'prod_software': 'البرمجيات',
        'prod_portal': 'البوابة',
        'prod_models': 'نماذج المعايرة',
        'knowledge': 'المعرفة',
        'know_tech': 'التكنولوجيا',
        'know_blogs': 'المدونات',
        'about': 'من نحن',
        'contact': 'اتصل بنا',
        'faq': 'الأسئلة الشائعة',
        'footer_desc': 'نقدم أجهزة طيفية تحليلية عالية الدقة وحلول برمجية متطورة منذ عام 2023.',
        'footer_ind': 'الصناعات',
        'footer_prod': 'المنتجات',
        'footer_contact': 'اتصل بنا',
        'footer_phone_lbl': 'الهاتف:',
        'footer_email_lbl': 'البريد الإلكتروني:',
        'footer_follow': 'تابعنا على:',
        'footer_privacy': 'سياسة الخصوصية',
        'footer_terms': 'شروط الخدمة',
        'footer_rights': 'جميع الحقوق محفوظة.',
        'footer_tagline': 'مصمم للدقة العلمية والصناعية.',
        'logo_alt': 'شعار USTECH Innovations',
        'nav_toggle': 'تبديل القائمة'
    },
    'zh': {
        'home': '首页',
        'industries': '行业应用',
        'ind_food': '食品与饲料',
        'ind_dairy': '乳制品',
        'ind_chem': '化工与制药',
        'products': '产品中心',
        'prod_devices': '硬件设备',
        'prod_software': '软件系统',
        'prod_portal': '云端门户',
        'prod_models': '校准模型',
        'knowledge': '知识中心',
        'know_tech': '核心技术',
        'know_blogs': '技术博客',
        'about': '关于我们',
        'contact': '联系我们',
        'faq': '常见问题',
        'footer_desc': '自2023年起提供高精度在线分析光谱仪器与化学计量学软件解决方案。',
        'footer_ind': '行业应用',
        'footer_prod': '产品中心',
        'footer_contact': '联系我们',
        'footer_phone_lbl': '电话：',
        'footer_email_lbl': '邮箱：',
        'footer_follow': '关注我们：',
        'footer_privacy': '隐私政策',
        'footer_terms': '服务条款',
        'footer_rights': '保留所有权利。',
        'footer_tagline': '专为严苛的科学与工业精度而设计。',
        'logo_alt': 'USTECH Innovations 标志',
        'nav_toggle': '切换导航'
    }
}

FLAG_SVGS = {
    'en': '<svg viewBox="0 0 60 30" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L20,10 M40,20 L60,30" stroke="#C8102E" stroke-width="4"/><path d="M60,0 L40,10 M20,20 L0,30" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>',
    'tr': '<svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="30" height="20" fill="#E30A17"/><circle cx="14.5" cy="10" r="6" fill="#fff"/><circle cx="16" cy="10" r="4.8" fill="#E30A17"/><g transform="translate(20,10) rotate(33)"><polygon points="0,-3.5 0.8,-1 3.3,-1 1.3,0.4 2,2.8 0,1.2 -2,2.8 -1.3,0.4 -3.3,-1 -0.8,-1" fill="#fff"/></g></svg>',
    'fr': '<svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="10" height="20" fill="#002395"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ED2939"/></svg>',
    'de': '<svg viewBox="0 0 5 3" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#DD0000"/><rect y="2" width="5" height="1" fill="#FFCC00"/></svg>',
    'es': '<svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="30" height="5" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/><rect y="15" width="30" height="5" fill="#AA151B"/><g transform="translate(10,10)"><rect x="-2" y="-3.5" width="4" height="4.5" rx="0.3" fill="#AA151B" stroke="#7B2D26" stroke-width="0.2"/><rect x="-1.5" y="-3" width="1.2" height="1.8" rx="0.15" fill="#F1BF00"/><rect x="0.3" y="-3" width="1.2" height="1.8" rx="0.15" fill="#fff"/><rect x="-1.5" y="-0.8" width="1.2" height="1.5" rx="0.15" fill="#fff"/><rect x="0.3" y="-0.8" width="1.2" height="1.5" rx="0.15" fill="#F1BF00"/><line x1="-3" y1="-3.5" x2="-3" y2="2" stroke="#7B2D26" stroke-width="0.4"/><line x1="3" y1="-3.5" x2="3" y2="2" stroke="#7B2D26" stroke-width="0.4"/><ellipse cx="-3" cy="-3.8" rx="0.6" ry="0.5" fill="#7B2D26"/><ellipse cx="3" cy="-3.8" rx="0.6" ry="0.5" fill="#7B2D26"/><path d="M-2,-3.5 Q0,-5.5 2,-3.5" fill="none" stroke="#AA151B" stroke-width="0.5"/></g></svg>',
    'ar': '<svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="30" height="20" fill="#006C35"/><path d="M6,13.5 L24,13.5 M22,11.5 L24.5,13.5 L22,15.5 M7.5,12 L7.5,15" stroke="#fff" stroke-width="0.9" fill="none" stroke-linecap="round"/><text x="15" y="9.5" font-family="sans-serif" font-size="4.5" font-weight="bold" fill="#fff" text-anchor="middle" letter-spacing="0.5">العربية</text></svg>',
    'zh': '<svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="30" height="20" fill="#DE2910"/><polygon points="5,2 6.2,5.7 10,5.7 6.9,8 8.1,11.7 5,9.4 1.9,11.7 3.1,8 0,5.7 3.8,5.7" fill="#FFDE00"/><g transform="translate(10,2) rotate(23)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g><g transform="translate(12,4) rotate(45)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g><g transform="translate(12,7) rotate(0)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g><g transform="translate(10,9) rotate(-20)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g></svg>'
}

FLAG_ICONS_SMALL = {
    'en': '<svg viewBox="0 0 60 30" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L20,10 M40,20 L60,30" stroke="#C8102E" stroke-width="4"/><path d="M60,0 L40,10 M20,20 L0,30" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>',
    'tr': '<svg viewBox="0 0 30 20" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><rect width="30" height="20" fill="#E30A17"/><circle cx="14.5" cy="10" r="6" fill="#fff"/><circle cx="16" cy="10" r="4.8" fill="#E30A17"/><g transform="translate(20,10) rotate(33)"><polygon points="0,-3.5 0.8,-1 3.3,-1 1.3,0.4 2,2.8 0,1.2 -2,2.8 -1.3,0.4 -3.3,-1 -0.8,-1" fill="#fff"/></g></svg>',
    'de': '<svg viewBox="0 0 5 3" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#DD0000"/><rect y="2" width="5" height="1" fill="#FFCC00"/></svg>',
    'fr': '<svg viewBox="0 0 30 20" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><rect width="10" height="20" fill="#002395"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ED2939"/></svg>',
    'es': '<svg viewBox="0 0 30 20" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><rect width="30" height="5" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/><rect y="15" width="30" height="5" fill="#AA151B"/><g transform="translate(10,10)"><rect x="-2" y="-3.5" width="4" height="4.5" rx="0.3" fill="#AA151B" stroke="#7B2D26" stroke-width="0.2"/><rect x="-1.5" y="-3" width="1.2" height="1.8" rx="0.15" fill="#F1BF00"/><rect x="0.3" y="-3" width="1.2" height="1.8" rx="0.15" fill="#fff"/><rect x="-1.5" y="-0.8" width="1.2" height="1.5" rx="0.15" fill="#fff"/><rect x="0.3" y="-0.8" width="1.2" height="1.5" rx="0.15" fill="#F1BF00"/><line x1="-3" y1="-3.5" x2="-3" y2="2" stroke="#7B2D26" stroke-width="0.4"/><line x1="3" y1="-3.5" x2="3" y2="2" stroke="#7B2D26" stroke-width="0.4"/><ellipse cx="-3" cy="-3.8" rx="0.6" ry="0.5" fill="#7B2D26"/><ellipse cx="3" cy="-3.8" rx="0.6" ry="0.5" fill="#7B2D26"/><path d="M-2,-3.5 Q0,-5.5 2,-3.5" fill="none" stroke="#AA151B" stroke-width="0.5"/></g></svg>',
    'ar': '<svg viewBox="0 0 30 20" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><rect width="30" height="20" fill="#006C35"/><path d="M6,13.5 L24,13.5 M22,11.5 L24.5,13.5 L22,15.5 M7.5,12 L7.5,15" stroke="#fff" stroke-width="0.9" fill="none" stroke-linecap="round"/><text x="15" y="9.5" font-family="sans-serif" font-size="4.5" font-weight="bold" fill="#fff" text-anchor="middle" letter-spacing="0.5">العربية</text></svg>',
    'zh': '<svg viewBox="0 0 30 20" width="24" height="16" preserveAspectRatio="xMidYMid slice" style="border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"><rect width="30" height="20" fill="#DE2910"/><polygon points="5,2 6.2,5.7 10,5.7 6.9,8 8.1,11.7 5,9.4 1.9,11.7 3.1,8 0,5.7 3.8,5.7" fill="#FFDE00"/><g transform="translate(10,2) rotate(23)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g><g transform="translate(12,4) rotate(45)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g><g transform="translate(12,7) rotate(0)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g><g transform="translate(10,9) rotate(-20)"><polygon points="0,-1 0.3,-0.3 1,-0.3 0.5,0.1 0.7,0.8 0,0.4 -0.7,0.8 -0.5,0.1 -1,-0.3 -0.3,-0.3" fill="#FFDE00"/></g></svg>'
}

LANG_NAMES = {
    'en': 'English',
    'tr': 'Türkçe',
    'de': 'Deutsch',
    'fr': 'Français',
    'es': 'Español',
    'ar': 'العربية',
    'zh': '简体中文'
}

def render_master_header(lang, current_page):
    c = LANG_CONFIG[lang]
    is_sub = (lang != 'en')
    logo_prefix = "../" if is_sub else ""

    # Generate dropdown language links
    lang_options_html = []
    for l in ['en', 'tr', 'de', 'fr', 'es', 'ar', 'zh']:
        if is_sub:
            if l == lang:
                target = current_page
            elif l == 'en':
                target = f"../{current_page}"
            else:
                target = f"../{l}/{current_page}"
        else:
            if l == 'en':
                target = current_page
            else:
                target = f"{l}/{current_page}"

        icon = FLAG_ICONS_SMALL[l]
        name = LANG_NAMES[l]
        lang_options_html.append(f"""                        <a href="{target}" class="dropdown-item lang-option" data-lang="{l}" style="display: flex; align-items: center; gap: 0.65rem;">
                            {icon}
                            {name}
                        </a>""")

    lang_dropdown_content = "\n".join(lang_options_html)
    flag_circle_svg = FLAG_SVGS[lang]

    # Check active states
    act_home = ' active' if current_page == 'index.html' else ''
    act_ind = ' active' if 'industry' in current_page or current_page == 'industries.html' else ''
    act_prod = ' active' if 'product' in current_page or current_page == 'products.html' else ''
    act_know = ' active' if 'knowledge' in current_page or current_page == 'knowledge.html' else ''
    act_about = ' active' if current_page == 'about.html' else ''
    act_contact = ' active' if current_page == 'contact.html' else ''
    act_faq = ' active' if current_page == 'faq.html' else ''

    header_html = f"""    <!-- Header / Navigation -->
    <header>
        <div class="nav-container">
            <a href="index.html" class="logo"><img src="{logo_prefix}images/logo.svg?v=1.0.5" alt="{c['logo_alt']}" style="width: auto;" fetchpriority="high" decoding="async"></a>
            <button class="nav-toggle" aria-label="{c['nav_toggle']}">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links">
                <li><a href="index.html" class="nav-link{act_home}">{c['home']}</a></li>
                <li class="nav-item has-dropdown">
                    <a href="industries.html" class="nav-link{act_ind}">{c['industries']} <span style="font-size: 0.7rem; margin-left: 2px;">&#9660;</span></a>
                    <div class="dropdown-menu">
                        <a href="industry-food-feed.html" class="dropdown-item">{c['ind_food']}</a>
                        <a href="industry-dairy.html" class="dropdown-item">{c['ind_dairy']}</a>
                        <a href="industry-chemical-pharma.html" class="dropdown-item">{c['ind_chem']}</a>
                    </div>
                </li>
                <li class="nav-item has-dropdown">
                    <a href="products.html" class="nav-link{act_prod}">{c['products']} <span style="font-size: 0.7rem; margin-left: 2px;">&#9660;</span></a>
                    <div class="dropdown-menu">
                        <a href="products-devices.html" class="dropdown-item">{c['prod_devices']}</a>
                        <a href="products-software.html" class="dropdown-item">{c['prod_software']}</a>
                        <a href="products-portal.html" class="dropdown-item">{c['prod_portal']}</a>
                        <a href="products-calibration-models.html" class="dropdown-item">{c['prod_models']}</a>
                    </div>
                </li>
                <li class="nav-item has-dropdown">
                    <a href="knowledge.html" class="nav-link{act_know}">{c['knowledge']} <span style="font-size: 0.7rem; margin-left: 2px;">&#9660;</span></a>
                    <div class="dropdown-menu">
                        <a href="knowledge-technology.html" class="dropdown-item">{c['know_tech']}</a>
                        <a href="knowledge-blogs.html" class="dropdown-item">{c['know_blogs']}</a>
                    </div>
                </li>
                <li><a href="about.html" class="nav-link{act_about}">{c['about']}</a></li>
                <li><a href="contact.html" class="nav-link{act_contact}">{c['contact']}</a></li>
                <li><a href="faq.html" class="nav-link{act_faq}">{c['faq']}</a></li>
                <li class="nav-item has-dropdown">
                    <a href="#" class="nav-link lang-toggle" onclick="return false;" style="display: flex; align-items: center; padding: 0.25rem 0;">
                        <span class="lang-flag-circle" data-lang="{lang}" style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 19px; border-radius: 3.5px; cursor: pointer; transition: all 0.2s ease; overflow: hidden;">
                            {flag_circle_svg}
                        </span>
                    </a>
                    <div class="dropdown-menu">
{lang_dropdown_content}
                    </div>
                </li>
            </ul>
        </div>
    </header>"""
    return header_html

def render_master_footer(lang, current_page):
    c = LANG_CONFIG[lang]
    is_sub = (lang != 'en')
    logo_prefix = "../" if is_sub else ""

    footer_html = f"""    <!-- Footer -->
    <footer>
        <div class="footer-grid">
            <!-- Left: Industries + Products -->
            <div class="footer-left">
                <div class="footer-links-col">
                    <h4>{c['footer_ind']}</h4>
                    <ul class="footer-links">
                        <li><a href="industry-food-feed.html">{c['ind_food']}</a></li>
                        <li><a href="industry-dairy.html">{c['ind_dairy']}</a></li>
                        <li><a href="industry-chemical-pharma.html">{c['ind_chem']}</a></li>
                    </ul>
                </div>
                <div class="footer-links-col">
                    <h4>{c['footer_prod']}</h4>
                    <ul class="footer-links">
                        <li><a href="products-devices.html">{c['prod_devices']}</a></li>
                        <li><a href="products-software.html">{c['prod_software']}</a></li>
                        <li><a href="products-portal.html">{c['prod_portal']}</a></li>
                        <li><a href="products-calibration-models.html">{c['prod_models']}</a></li>
                    </ul>
                </div>
            </div>
            <!-- Center: Logo -->
            <div class="footer-logo-center">
                <a href="index.html" class="logo"><img src="{logo_prefix}images/logo.svg?v=1.0.5" alt="{c['logo_alt']}" style="height: 58px; width: auto;" fetchpriority="high" decoding="async"></a>
                <p>{c['footer_desc']}</p>
            </div>
            <!-- Right: Contact -->
            <div class="footer-links-col">
                <h4>{c['footer_contact']}</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">30 N Gould St Ste 34301, Sheridan, WY 82801</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">{c['footer_phone_lbl']} <a href="tel:+13075270072" style="color: inherit; text-decoration: none;">+1 307 527 0072</a></p>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">{c['footer_email_lbl']} <a href="mailto:info@ustechinnovations.com" style="color: inherit; text-decoration: none;">info@ustechinnovations.com</a></p>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 600;">{c['footer_follow']}</p>
                <div class="footer-socials" style="display: flex; gap: 0.75rem; margin-top: 0; ">
                    <a href="https://www.linkedin.com/company/ustech-innovations-llc/about/" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 USTECH Innovations LLC. {c['footer_rights']} | <a href="privacy-policy.html" style="color: var(--text-muted);">{c['footer_privacy']}</a> | <a href="terms-of-service.html" style="color: var(--text-muted);">{c['footer_terms']}</a></p>
            <p>{c['footer_tagline']}</p>
        </div>
    </footer>"""
    return footer_html

print("Master component generator with original CSS structure loaded.")
