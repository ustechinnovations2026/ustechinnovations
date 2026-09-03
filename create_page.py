import os
import re

ref_file = r"c:\Users\user\Desktop\ustech ogi\ustech-website-deploy\product-proline-17es.html"
out_file = r"c:\Users\user\Desktop\ustech ogi\ustech-website-deploy\product-proline-17ec.html"

with open(ref_file, "r", encoding="utf-8") as f:
    html = f.read()

# Replace canonical and hreflang
html = html.replace("product-proline-17es.html", "product-proline-17ec.html")
html = html.replace("ProLine17ES", "ProLine17EC")
html = html.replace("17ES", "17EC")

# Titles and Meta
html = html.replace("ProLine17EC Analyzer - Industrial inline Process Analytical Technology (PAT) spectrometer for pipelines and chutes.", "The USTECH ProLine17EC is a rugged IP65 inline NIR spectrometer featuring a 950–1650 nm InGaAs array, 316 stainless steel housing, and food-grade sapphire window for continuous, real-time quality control.")

# Update Hero Image
html = html.replace('src="images/online.webp"', 'src="images/proline_17ec.png"')

# Update Hero text
hero_para_old = "The ProLine 17EC FT-NIR Analyzer is a high-performance, compact analysis system designed for continuous, real-time quality control and rapid process monitoring within standard industrial environments. Installed directly in the process line without the need for bypass configurations, it eliminates the delays of manual sampling and traditional wet-chemistry laboratory preparation. Powered by advanced near-infrared spectroscopy, the ProLine 17EC simultaneously analyzes multiple chemical and physical properties within seconds, transferring accurate, actionable data straight to process control systems. This continuous tracking capability empowers manufacturers to improve operational yields and systematically optimize production profit."
hero_para_new = "<strong>Continuous Analysis, Real-Time Quality</strong><br><br>The USTECH ProLine17EC is an advanced Near-Infrared (NIR) spectroscopy platform engineered for continuous, real-time monitoring of key production parameters within seconds. Installed directly onto production lines, pipes, vessels, or chute conveyors without requiring sample bypass streams or hazardous reagents, it provides end-to-end traceability while maximizing yield, operational throughput, and profitability from raw material intake through final product approval."
html = html.replace(hero_para_old, hero_para_new)

# Add JSON-LD before </head>
json_ld = """
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "USTECH ProLine17EC",
      "image": "https://www.ustechinnovations.com/images/proline_17ec.png",
      "description": "The USTECH ProLine17EC is an advanced inline NIR spectroscopy analyzer engineered for continuous, real-time quality control in food, feed, pharma, and bioenergy.",
      "brand": {
        "@type": "Brand",
        "name": "USTECH Innovations"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ustechinnovations.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Devices",
        "item": "https://www.ustechinnovations.com/products-devices.html"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "ProLine17EC Analyzer"
      }]
    }
    </script>
"""
html = html.replace("</head>", json_ld + "</head>")

# Make sure brand is cali<span class="calix-x">X</span> if applicable (though this page doesn't seem to use caliX)
# Wait, user prompt said: "The caliX brand MUST always be rendered as: cali<span class="calix-x">X</span>"
html = re.sub(r'\bcaliX\b', 'cali<span class="calix-x">X</span>', html)


with open(out_file, "w", encoding="utf-8") as f:
    f.write(html)
