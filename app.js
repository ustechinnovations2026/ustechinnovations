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

        // 8. Hide Language Switcher dropdown
        document.querySelectorAll('.lang-toggle').forEach(function(toggle) {
            var parentLi = toggle.closest('li');
            if (parentLi) {
                parentLi.style.display = 'none';
            }
        });

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

// Dynamic translation function that triggers Google Translate programmatically
function translatePageTo(lang) {
    var select = document.querySelector('select.goog-te-combo');
    if (select) {
        select.value = lang;
        var event = new Event('change', { bubbles: true });
        select.dispatchEvent(event);
    } else {
        // If Google Translate dropdown is not ready, wait and try again
        setTimeout(function() {
            translatePageTo(lang);
        }, 150);
    }
}

// Language Switcher — updates flag icons and triggers dynamic translation
function selectLang(el) {
    var lang = el.getAttribute('data-lang');
    var svg = el.querySelector('svg');
    if (!svg) return;
    var clone = svg.cloneNode(true);
    clone.setAttribute('width', '100%');
    clone.setAttribute('height', '100%');
    clone.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    clone.removeAttribute('style');
    document.querySelectorAll('.lang-flag-circle').forEach(function(circle) {
        circle.setAttribute('data-lang', lang);
        circle.innerHTML = '';
        circle.appendChild(clone.cloneNode(true));
    });

    localStorage.setItem('ustech-lang', lang);

    // Update dynamic hero title override to keep professional marketing slogans in all languages
    var heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        if (lang === 'tr') {
            heroTitle.textContent = 'Anlık Analiz, Kusursuz Karar, Kesintisiz Üretim.';
        } else if (lang === 'es') {
            heroTitle.textContent = 'Análisis en Tiempo Real, Decisiones Impecables, Producción Ininterrumpida.';
        } else if (lang === 'de') {
            heroTitle.textContent = 'Echtzeitanalyse, Makellose Entscheidungen, Kontinuierliche Produktion.';
        } else {
            heroTitle.textContent = 'Real-Time Analysis, Flawless Decisions, Uninterrupted Production.';
        }
    }

    translatePageTo(lang);
}

// Restore saved language and initialize Google Translate client on all page loads
(function() {
    // Add style rules to hide Google Translate banner and UI artifacts
    var style = document.createElement('style');
    style.innerHTML = `
        body { top: 0 !important; }
        .goog-te-banner-frame, .goog-te-banner, .skiptranslate, #goog-gt-tt { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    // Set up Google Translate init function
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,tr,de,es',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    // Dynamically load Google Translate API script
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);

    // Create target container for Translate API if not present
    document.addEventListener('DOMContentLoaded', function() {
        if (!document.getElementById('google_translate_element')) {
            var el = document.createElement('div');
            el.id = 'google_translate_element';
            el.style.display = 'none';
            document.body.appendChild(el);
        }

        // Apply saved language after loading
        var saved = localStorage.getItem('ustech-lang');
        if (saved) {
            var option = document.querySelector('.lang-option[data-lang="' + saved + '"]');
            if (option) {
                selectLang(option);
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
            <button id="cookie-settings-btn" class="cookie-settings-btn" aria-label="Cookie Settings">
                ${cookieSvg}
            </button>

            <!-- Cookie Preferences Modal -->
            <div id="cookie-modal" class="cookie-modal">
                <div class="cookie-modal-content">
                    <h3 class="cookie-modal-title">Cookie Preferences</h3>
                    <p class="cookie-modal-text">We use cookies to optimize your experience, analyze site usage, and support our marketing efforts. Customize your settings below.</p>
                    <div class="cookie-options">
                        <div class="cookie-option">
                            <div class="cookie-option-info">
                                <strong>Essential Cookies</strong>
                                <span>Necessary for the website to function properly. Cannot be disabled.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="cookie-option">
                            <div class="cookie-option-info">
                                <strong>Analytical Cookies</strong>
                                <span>Help us measure traffic and analyze user behavior to improve site features.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="cookie-analytical" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="cookie-option">
                            <div class="cookie-option-info">
                                <strong>Marketing Cookies</strong>
                                <span>Used to deliver targeted content and monitor advertising performance.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="cookie-marketing">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div class="cookie-modal-buttons">
                        <button id="save-cookies-btn" class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">Save Settings</button>
                        <button id="accept-all-cookies-btn" class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">Accept All</button>
                    </div>
                </div>
            </div>

            <!-- Back to Top Button -->
            <button id="back-to-top-btn" class="back-to-top-btn" aria-label="Back to Top">
                ↑
            </button>
        `;

        document.body.appendChild(container);

        const cookieBtn = document.getElementById('cookie-settings-btn');
        const cookieModal = document.getElementById('cookie-modal');
        const saveBtn = document.getElementById('save-cookies-btn');
        const acceptAllBtn = document.getElementById('accept-all-cookies-btn');
        const backToTopBtn = document.getElementById('back-to-top-btn');

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
                cookieModal.classList.remove('open');
                showNotification("Cookie preferences saved successfully.");
            });
        }

        if (acceptAllBtn && cookieModal) {
            acceptAllBtn.addEventListener('click', () => {
                const analytical = document.getElementById('cookie-analytical');
                const marketing = document.getElementById('cookie-marketing');
                if (analytical) analytical.checked = true;
                if (marketing) marketing.checked = true;
                cookieModal.classList.remove('open');
                showNotification("All cookies accepted.");
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
            {
            title: "USTECH StarchQC",
            url: "product-i-sens-starch.html",
            category: "Products",
            keywords: "i-sens starch modified starch wet milling extraction centrifuge at-line",
            snippet: "Specialized at-line analyzer for rapid measurement of starch content and quality in wet milling processes."
            },
            {
            title: "USTECH MasterLine",
            url: "product-n-sens-feed.html",
            category: "Products",
            keywords: "USTECH MasterLine grain animal feed moisture protein fat ash fiber at-line cup",
            snippet: "Robust at-line analyzer designed for quality control of grains, meals, and finished animal feeds."
            },
            {
            title: "ProLine17ES Analyzer",
            url: "product-n-sens-online.html",
            category: "Products",
            keywords: "ProLine17ES conveyor belt pipe chute continuous inline measurement",
            snippet: "Continuous inline analyzer for real-time monitoring of raw materials on conveyor belts, chutes, and pipes."
            },
            {
            title: "USTECH SamplePrep Module",
            url: "product-n-sens-sampleprep.html",
            category: "Products",
            keywords: "n-sens sample prep presentation packer uniform scanning density",
            snippet: "Automated sample preparation accessory ensuring uniform density and surface for high-accuracy scans."
            },
            {
            title: "USTECH Tornado+ Rotating Scanner",
            url: "product-n-sens-tornado.html",
            category: "Products",
            keywords: "n-sens tornado rotating cup heterogeneous sample scanning average",
            snippet: "High-throughput rotating sample scanner designed for precise analysis of highly heterogeneous materials."
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
            title: "Introduction to PLS Regression in Calix Suite",
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

        // 1. Inject Search Box into Desktop Navigation
        const navContainer = document.querySelector('.nav-container');
        const logoLink = navContainer ? navContainer.querySelector('.logo') : null;
        if (navContainer && logoLink) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'header-search-container';
            searchContainer.innerHTML = `
                <div class="search-input-wrapper">
                    <input type="text" id="header-search-input" placeholder="Search website..." autocomplete="off">
                    <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <button id="search-clear-btn" class="search-clear-btn" type="button">&times;</button>
                </div>
                <div id="search-results-dropdown" class="search-results-dropdown"></div>
            `;
            // Insert it immediately after the logo link
            logoLink.after(searchContainer);
        }

        // 2. Inject Mobile Search at the top of the mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const mobileSearchItem = document.createElement('li');
            mobileSearchItem.className = 'mobile-search-item';
            mobileSearchItem.innerHTML = `
                <div class="search-input-wrapper">
                    <input type="text" id="mobile-search-input" placeholder="Search website..." autocomplete="off">
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

        function renderPopularSuggestions(dropdown) {
            dropdown.innerHTML = '';
            
            const groupTitle = document.createElement('div');
            groupTitle.className = 'search-result-group-title';
            groupTitle.innerHTML = `⚡ Popular Searches`;
            dropdown.appendChild(groupTitle);

            const suggestions = [
                { title: "caliX AutoML Suite", url: "product-calix.html" },
                { title: "ProLine17ES Sensor", url: "product-n-sens-online.html" },
                { title: "Food & Feed Solutions", url: "industry-food-feed.html" },
                { title: "B2B ROI Calculator", url: "contact.html#roi" },
                { title: "USTECH MasterLine", url: "product-n-sens-feed.html" }
            ];

            const container = document.createElement('div');
            container.style.padding = '0.25rem 0';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';

            suggestions.forEach(item => {
                const link = document.createElement('a');
                link.href = item.url;
                link.className = 'search-result-item';
                link.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                        <span class="search-result-title">🔍 ${item.title}</span>
                        <span style="font-size:0.65rem; color:var(--text-muted); background:var(--bg-tertiary); padding: 2px 6px; border-radius: 10px;">Popular</span>
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
                    { title: "USTECH MasterLine (Product)", url: "product-n-sens-feed.html" },
                    { title: "Food & Feed Industry Solutions", url: "industry-food-feed.html" },
                    { title: "Blog: Cattle Feed Waste Optimization", url: "blog-cattle-feed-waste.html" },
                    { title: "Blog: NIR Feed Fiber & Ash Analysis", url: "blog-feed-fiber-ash.html" },
                    { title: "USTECH Tornado+ (Product)", url: "product-n-sens-tornado.html" }
                ],
                "calix": [
                    { title: "caliX AutoML Suite (Product)", url: "product-calix.html" },
                    { title: "Products Overview", url: "products.html" },
                    { title: "Blog: PLS Regression in caliX", url: "blog-pls-regression-calix.html" },
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
                groupTitle.innerHTML = `💡 Suggested Results for "${query}"`;
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
                    dropdown.innerHTML = `<div class="search-no-results">No suggestions found for "${query}"</div>`;
                    dropdownSelectedIndex = -1;
                    return;
                }

                const container = document.createElement('div');
                container.style.padding = '0.25rem 0';
                container.style.display = 'flex';
                container.style.flexDirection = 'column';

                list.forEach(item => {
                    const link = document.createElement('a');
                    link.href = item.url;
                    link.className = 'search-result-item';
                    link.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                            <span class="search-result-title">🔍 ${item.title}</span>
                            <span style="font-size:0.65rem; color:var(--accent-gold); background:rgba(213, 178, 121, 0.1); border: 1px solid rgba(213, 178, 121, 0.2); padding: 2px 6px; border-radius: 10px;">Suggested</span>
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
            const searchTerms = query.split(/\s+/).filter(t => t.length > 0);
            if (searchTerms.length === 0) return [];

            return searchDb.map(item => {
                let score = 0;
                const titleLower = item.title.toLowerCase();
                const keywordsLower = item.keywords.toLowerCase();
                const snippetLower = item.snippet.toLowerCase();
                const categoryLower = item.category.toLowerCase();

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
                dropdown.innerHTML = '<div class="search-no-results">No results found matching your query.</div>';
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
                    groupTitle.textContent = cat;
                    dropdown.appendChild(groupTitle);

                    grouped[cat].forEach(item => {
                        const link = document.createElement('a');
                        link.href = item.url;
                        link.className = 'search-result-item';
                        link.innerHTML = `
                            <div class="search-result-title">${item.title}</div>
                            <div class="search-result-snippet">${item.snippet}</div>
                        `;
                        dropdown.appendChild(link);
                    });
                }
            });

            dropdown.classList.add('open');
        }
    }

    // 11. Live Support System
    injectLiveSupport();

    function injectLiveSupport() {
        const supportBtn = document.createElement('button');
        supportBtn.className = 'live-support-btn';
        supportBtn.id = 'live-support-btn';
        supportBtn.setAttribute('aria-label', 'Live Support');
        supportBtn.innerHTML = `
            <svg width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div class="live-support-badge" id="live-support-badge">1</div>
        `;

        const supportPanel = document.createElement('div');
        supportPanel.className = 'live-support-panel';
        supportPanel.id = 'live-support-panel';
        supportPanel.innerHTML = `
            <div class="live-support-header">
                <div class="live-support-title">
                    <span class="live-support-status-dot"></span>
                    <h4>USTECH Live Support</h4>
                </div>
                <button class="live-support-close-btn" id="live-support-close-btn" aria-label="Close Chat">&times;</button>
            </div>
            <div class="live-support-chat-log" id="live-support-chat-log"></div>
            <div class="chat-suggestions" id="chat-suggestions">
                <button class="chat-suggestion-chip" data-msg="Request Quote">Request Quote</button>
                <button class="chat-suggestion-chip" data-msg="caliX Software Demo">caliX Software Demo</button>
                <button class="chat-suggestion-chip" data-msg="FT-NIR Hardware FAQ">FT-NIR Hardware FAQ</button>
                <button class="chat-suggestion-chip" data-msg="Speak to Sales">Speak to Sales</button>
            </div>
            <div class="live-support-footer">
                <input type="text" id="live-support-input" placeholder="Type your message..." autocomplete="off">
                <button class="live-support-send-btn" id="live-support-send-btn" aria-label="Send Message">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

        let isOpened = false;

        // Toggle panel open
        supportBtn.addEventListener('click', () => {
            supportPanel.classList.add('open');
            if (badge) badge.style.display = 'none'; // hide badge on open
            if (!isOpened) {
                // Add initial greeting on first load
                addMessage("agent", "Hello! Welcome to USTECH Innovations Live Support. I am your live assistant. How can I help you today with our products, spectroscopy devices, or caliX software?");
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

                const response = getSimulatedReply(userMsg);
                addMessage("agent", response);
            }, 1000);
        }

        function getSimulatedReply(msg) {
            const text = msg.toLowerCase();

            if (text.includes('demo') || text.includes('calix') || text.includes('software')) {
                return "We can provide a demo version for you to test the full features of our caliX Spectral Intelligence software. Please send your request via our contact form or at info@ustechinnovations.com. Our sales engineers will get in touch with you within 24 hours.";
            }
            if (text.includes('quote') || text.includes('price') || text.includes('sales')) {
                return "If you would like to receive a custom quote for your project regarding our devices (ProLine2550 and n-Sens series), please fill out the form on our [Contact Us](contact.html) page or send your requirements to info@ustechinnovations.com.";
            }
            if (text.includes('device') || text.includes('proline') || text.includes('hardware')) {
                return "USTECH FT-NIR devices (inline and at-line models) perform continuous, high-accuracy analysis directly on industrial process lines (conveyor belts, pipes, etc.). You can find detailed technical specifications in our [Analytical Devices](products-devices.html) catalog.";
            }
            if (text.includes('faq') || text.includes('question') || text.includes('support')) {
                return "For answers regarding FT-NIR technology, calibration transfers, and maintenance/service, you can visit our [Frequently Asked Questions (FAQ)](faq.html) page.";
            }
            
            return "We have received your message! As USTECH Innovations, we are happy to support you with B2B process spectroscopy. If you have a more specific question, I can arrange for our sales or support team to contact you directly. You can send your contact details to info@ustechinnovations.com.";
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
    tab.setAttribute('aria-label', 'Talk to a Specialist');
    tab.innerHTML = tabIconSVG + ' Talk to a Specialist';
    document.body.appendChild(tab);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'specialist-panel';
    panel.innerHTML = `
        <div class="specialist-panel-header">
            <h4>Talk to a Specialist</h4>
            <button class="specialist-panel-close" aria-label="Close">${closeSVG}</button>
        </div>
        <div class="specialist-panel-body">
            <p>Our NIR spectroscopy experts are ready to help you find the right solution for your process. Reach out through any channel below.</p>

            <a href="tel:+13075270072" class="specialist-contact-item">
                <span class="specialist-contact-icon">${phoneSVG}</span>
                <span>
                    <span class="specialist-contact-label">Call Us</span>
                    <span class="specialist-contact-value">+1 307 527 0072</span>
                </span>
            </a>

            <a href="mailto:info@ustechinnovations.com" class="specialist-contact-item">
                <span class="specialist-contact-icon">${emailSVG}</span>
                <span>
                    <span class="specialist-contact-label">Email</span>
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
                ${headsetSVG}&nbsp;&nbsp;Request a Consultation
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

