import re

with open(r'c:\Users\user\Desktop\ustech ogi\ustech-website-deploy\product-proline-17es.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update Metadata
html = html.replace('product-proline-17es.html', 'product-proline-17ec-s.html')
html = html.replace('ProLine17ES Analyzer', 'ProLine17EC-S Inline FT-NIR Analyzer')
html = html.replace('ProLine17ES', 'ProLine17EC-S')
html = html.replace('ProLine 17ES', 'ProLine17EC-S')
html = html.replace('product-proline-17es.jpg', 'product-proline-17ec-s.jpg')
html = html.replace('Industrial inline Process Analytical Technology (PAT) spectrometer for pipelines and chutes.', 'USTECH ProLine17EC-S features high-speed InGaAs detection delivering 2,000 spectra per sample, 23,000:1 SNR, dual-chassis IP65 316 stainless steel housing, and sapphire interface for demanding inline applications.')

# Update Content
html = html.replace('images/online.webp', 'images/proline_17ec_s.png')
html = html.replace('Inline Process Control', 'High-Sensitivity Inline Control')
html = html.replace('The ProLine17EC-S FT-NIR Analyzer is a high-performance, compact analysis system designed for continuous, real-time quality control and rapid process monitoring within standard industrial environments. Installed directly in the process line without the need for bypass configurations, it eliminates the delays of manual sampling and traditional wet-chemistry laboratory preparation. Powered by advanced near-infrared spectroscopy, the ProLine17EC-S simultaneously analyzes multiple chemical and physical properties within seconds, transferring accurate, actionable data straight to process control systems. This continuous tracking capability empowers manufacturers to improve operational yields and systematically optimize production profit.', 'The USTECH ProLine17EC-S is an advanced Near-Infrared (NIR) spectroscopy system engineered for demanding inline process environments. Built with a modular split architecture and delivering an exceptional 23,000:1 signal-to-noise ratio with 2,000 spectra per sample, it enables continuous, high-accuracy monitoring of key production parameters within seconds—maximizing yield and traceability from raw materials to final release.')

html = html.replace('proline-17es', 'proline-17ec-s')

# Update 'Continuous Analysis, Real-Time Quality'
html = html.replace('<h1 style="font-size: 2.5rem; margin-top: 0.5rem; margin-bottom: 1rem; letter-spacing: -1px;">ProLine17EC-S Inline FT-NIR Analyzer</h1>', '<h1 style="font-size: 2.5rem; margin-top: 0.5rem; margin-bottom: 0.2rem; letter-spacing: -1px;">ProLine17EC-S</h1><h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-secondary);">Continuous Analysis, Real-Time Quality</h2>')

# Hardware Section
html = html.replace('Ruggedized Inline Hardware Architecture', 'Split Dual-Chassis Architecture')
html = html.replace('Built to withstand the physical stresses of heavy industrial environments, the ProLine17EC-S combines an ultra-compact form factor with premium mechanical components for direct process integration.', 'Built to withstand the physical stresses of heavy industrial environments, the ProLine17EC-S features a dual-chassis split setup: Optical probe head + External junction/controller enclosure.')

html = html.replace('Encased in a robust, high-durability Stainless Steel 316 grade chassis with an ultra-compact profile (96 mm diameter, 180 mm length), ensuring exceptional resistance against external manufacturing stresses.', 'Features a dedicated optical measuring head (96 mm × 180 mm) in 316 Stainless Steel, designed to withstand direct mechanical pressure and high-velocity material flow.')

html = html.replace('Fully rated to IP65 industrial standards, offering complete defense against dust penetration and water splashes common in heavy processing areas.', 'Fully IP65-rated with a modular split enclosure for versatile mounting on confined or high-vibration process lines. Triple heavy-duty sealed metallic cable glands.')

# Product Kit Section
html = html.replace('ProLine17EC-S FT-NIR Inline Analyzer Main Unit', 'ProLine17EC-S Optical Probe Unit')
html = html.replace('The core spectroscopic sensing cylinder engineered for inline process monitoring.', 'Precision-machined 316 SS sensing cylinder with sapphire interface.')

html = html.replace('High-Quality Shielded LAN Cable', 'Remote Controller & Junction Box')
html = html.replace('Minimum Cat 5e RJ45 connection with IP67-rated sealing to ensure secure, noise-free ethernet data transmission.', 'Matching IP65 enclosure with triple industrial cable glands.')

html = html.replace('Industrial Power Supply Component', 'Heavy-Duty Interconnect Cable Assembly')
html = html.replace('2.1 Plug-in type power interface supporting 176-264 V input and delivering a stable 24 V DC / 3.6 A output.', 'Shielded industrial cabling linking the probe head to the controller.')

html = html.replace('Standard integrated food-grade O-ring seals for seamless process window mounting.', 'FDA-compliant replacement O-ring seals.')

# Applications Section
html = html.replace('Full Value Chain Traceability', 'Industry Applications & Use Cases')
html = html.replace('The ProLine17EC-S provides a versatile analytical anchor across diverse industrial sectors—including Feed, Food, and Pharma/Chemical manufacturing—delivering complete data traceability from start to finish.', 'Targeted quality control across high-throughput industrial sectors.')

html = html.replace('Incoming Goods Inspection', 'Food & Feed Processing')
html = html.replace('Instant verification of raw material quality directly at the reception point.', 'Real-time multi-constituent tracking at 2,000 spectra/sample ensures exact nutritional dosing and rapid batch sign-off without manual grab sampling.')

html = html.replace('In-Process Production Control', 'Pharmaceutical & Chemical')
html = html.replace('Continuous, automated monitoring of product flows to secure batch consistency and process boundaries.', 'Ensures strict regulatory compliance and batch uniformity. Leveraging non-destructive technology, it delivers highly precise measurements of Active Pharmaceutical Ingredients (APIs) and complex reaction dynamics directly in-line, eliminating cross-contamination risk.')

html = html.replace('Finished Product Release', 'Bioenergy & Biomass')
html = html.replace('Final validation of end-product formulations before final release.', 'Maximizes process efficiency and enables sustainable energy production. Real-time monitoring of moisture, ash, cellulose, and lignin in biomass feedstock ensures optimized fuel quality, higher thermal efficiency, and lower operating costs.')

html = html.replace('Universal Sample Capability', 'Continuous Analysis')
html = html.replace('Optimized for direct, non-destructive measurement of both solid and liquid samples in ground, unground, or pelletized forms.', 'Generates precise analytical results in an average of 2 to 20 seconds (max <30 s). Direct real-time data transmission to control room systems empowers operators with instant intervention capabilities.')

# Calix replacement
html = re.sub(r'caliX', r'cali<span class="calix-x">X</span>', html)

# Specs update
html = html.replace('2000 spectra / sample', '2,000 spectra per sample')
html = html.replace('Real-Time (Average 2 – 20 seconds / analysis)', 'Typical: 2 – 20 s (Fastest: 2 s, Max: < 30 s)')

with open(r'c:\Users\user\Desktop\ustech ogi\ustech-website-deploy\product-proline-17ec-s.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
