# WordPress & WooCommerce Technical Implementation Guide
## Dark Romance Author Portal for Christiana Ciocan

This document provides the exact technical blueprint for deploying and maintaining the **Christiana Ciocan** Dark Romance Author website on WordPress.

---

### 1. Recommended Core Architecture

| Component | Recommendation | Why? |
| :--- | :--- | :--- |
| **Theme** | **Hello Elementor** or **Astra** (Minimal child theme) | Cleanest DOM, zero bloat, blazing fast load times. Gives 100% design control to Elementor without conflicting styles. |
| **Page Builder** | **Elementor** (Free or Pro) | The client specifically requested standard tools they can maintain themselves. Elementor Flexbox Containers allow effortless drag-and-drop. |
| **E-Commerce** | **WooCommerce** (Latest) | Standard, powerful, no recurring platform fees. Handles both digital eBook files and physical signed paperbacks seamlessly. |
| **Forms** | **Fluent Forms** or **WPForms** | Secure, lightweight, built-in reCAPTCHA / Cloudflare Turnstile anti-spam, and responsive styling. |
| **Payments** | **WooCommerce Stripe Gateway** + **WooCommerce PayPal Payments** | Official, 100% free plugins (no monthly subscription fee). Standard 2.9% + $0.30 per card transaction. |

---

### 2. Edge-to-Edge Mobile Video Carousel Implementation (calypsobooks.ro style)

The client requested:
> *"I will also want that carousel/player at the top that can play short AI animations/videos. But it must be fitted from edge to edge without side border on mobile version. See example below: https://calypsobooks.ro/"*

#### In Elementor (Flexbox Container Setup):
1. Create a **Main Container**:
   - **Content Width**: `Full Width` (100%)
   - **Width**: `100%`
   - **Min Height**: `75vh` to `85vh`
   - **Padding**: `0px` on all sides (Top, Bottom, Left, Right)
   - **Margin**: `0px`
   - **Overflow**: `Hidden`

2. Inside the Container, add a **Media Carousel** / **Video Slider Widget** or Custom HTML block:
   ```html
   <div class="hero-video-slider">
     <div class="video-slide active">
       <video autoplay muted loop playsinline webkit-playsinline class="bg-video">
         <source src="wp-content/uploads/hero-teaser-1.mp4" type="video/mp4">
       </video>
       <div class="hero-overlay"></div>
       <div class="hero-caption">
         <span class="sub">NEW DARK ROMANCE SENSATION</span>
         <h1 class="title">THE DEVIL'S ROSE</h1>
         <p class="blurb">"He was hired to ruin me. Instead, he made me love the dark."</p>
         <a href="/product/the-devils-rose/" class="btn-gold">Order Direct</a>
       </div>
     </div>
   </div>
   ```

3. **Critical CSS for Zero-Border Mobile Full-Bleed**:
   Paste this into **Elementor > Site Settings > Custom CSS** or child theme `style.css`:
   ```css
   @media (max-width: 768px) {
     .hero-video-slider,
     .elementor-section.hero-carousel-fullbleed,
     .e-con.hero-carousel-fullbleed {
       width: 100vw !important;
       max-width: 100vw !important;
       margin-left: calc(-50vw + 50%) !important;
       margin-right: calc(-50vw + 50%) !important;
       padding-left: 0 !important;
       padding-right: 0 !important;
       border-left: none !important;
       border-right: none !important;
       border-radius: 0 !important;
     }

     .hero-video-slider video,
     .hero-video-slider .bg-video {
       width: 100vw !important;
       height: 75vh !important;
       object-fit: cover !important;
       display: block !important;
     }
   }
   ```
   *Note: The `playsinline` and `webkit-playsinline` attributes ensure that mobile Safari (iOS) does not pop the video out into a fullscreen media player.*

---

### 3. WooCommerce Setup for E-Books & Paperbacks

In WooCommerce, each book is created as a **Variable Product**:

#### Attributes Setup:
- **Attribute Name**: `Edition`
- **Values**: `eBook (Instant Download)` | `Signed Paperback` | `Deluxe Hardcover`
- Check: **"Used for variations"**

#### Variations Configuration:
1. **eBook (Instant Download)**:
   - Check: **Virtual**
   - Check: **Downloadable**
   - Regular Price: `$5.99`
   - Downloadable Files: Upload `.epub`, `.mobi`, and `.pdf`
   - Download Limit: `3` (or unlimited)
   - Download Expiry: `Never`

2. **Signed Paperback (Direct from Author)**:
   - Uncheck Virtual & Downloadable
   - Regular Price: `$19.99`
   - Weight & Dimensions: Enter package size (e.g., 0.5 kg)
   - Shipping Class: `Standard Book Mail`
   - Inventory: Enter quantity of physical copies available

---

### 4. Payment Gateway Integration (Stripe & PayPal)

The client asked:
> *"Possibility of having card payments also. Depending on the cost."*

#### Clarification for Client:
- **Cost for Stripe Plugin**: **$0 (100% Free)**.
- Official Plugin: `WooCommerce Stripe Payment Gateway` developed by Automattic / WooCommerce.
- There is **no monthly subscription fee**.
- Only standard bank card processing fees apply when a sale occurs (typically 2.9% + $0.30 per transaction in the US, or 1.4% + €0.25 in Europe).
- Enables **Apple Pay**, **Google Pay**, and all major Credit/Debit Cards (Visa, MasterCard, Amex) directly on the website without redirecting customers.

#### PayPal Setup:
- Official Plugin: `WooCommerce PayPal Payments`.
- Also 100% free plugin with standard transaction pricing.

---

### 5. Automated Confirmation Emails & Direct Delivery

1. Navigate to **WooCommerce > Settings > Emails**.
2. Customize the **Completed Order** email template:
   - Background Color: `#100e13`
   - Header Color: `#d4af37` (Gold)
   - Font: Georgia / Serif
   - Message: Branded note from Christiana thanking the reader, providing direct download links for the eBooks, and sharing tracking details for paperbacks.
3. (Optional integration): **BookFunnel** or **StoryOrigin** WooCommerce integration for 1-click automatic Kindle loading.

---

### 6. SSL & Security Setup

1. Enable free **Let's Encrypt SSL** via the hosting control panel (cPanel / Hostinger / SiteGround / Cloudflare).
2. Go to **Settings > General** in WordPress:
   - Ensure both **WordPress Address (URL)** and **Site Address (URL)** start with `https://`.
3. In **WooCommerce > Settings > Advanced**, enable **Force secure checkout**.
