# Decade Awards – Shopify Migration Checklist

This checklist compares the live store at [decadeawards.com](https://www.decadeawards.com/) with the **decadeawards-dylan** Shopify theme so you can align content, pages, and collections during migration.

---

## ✅ Already Aligned in Theme

| Item | Status |
|------|--------|
| **Footer** – Tools, Site Info, legal line, copyright, newsletter, social, phone (509-474-9530), email (sales@decadeawards.com) | Updated to match live |
| **Promo bar** – Free shipping threshold $95, phone, email | In header-group |
| **Sidebar / collection nav** – Full category + sport lists (Engraved Plates, Lapel & Chenille Pins, Picture Frames, Ribbons/Rosettes, Racing, Track & Field, Volleyball, Wrestling, etc.) | In `sidebar-navigation.liquid` and `collection-with-sidebar.liquid` |
| **Product customizer** – Engraving, ribbons, colorfill, perpetual plates, 360 viewer, group order upload | In `snippets/product-customizer.liquid` |
| **Design system** – Playfair Display, custom color schemes (burgundy #9a282c, navy #21477e) | In design-system + settings_data |

---

## 📋 Content & Structure To Do

### 1. Shopify pages (create in Admin)

Create these pages so footer/header links resolve. Use the URLs below as handles where possible.

| Page handle | Purpose |
|-------------|---------|
| `amazon-plate-request-form` | Amazon Plate Request Form (Tools) |
| `artwork-guidelines` | Artwork Guidelines |
| `design-ideas` | Design Ideas |
| `text-ideas` | Text Ideas |
| `accessibility` | Accessibility Statement |
| `return-policy` | Return Policy (or use Shopify Policy) |
| `terms-conditions` | Terms & Conditions (or use **Settings → Policies**) |
| `about-us`, `our-story`, `testimonials`, `our-mission` | About Us column |
| `contact`, `faq`, `shipping-returns`, `free-shipping` | Help column |

**Note:** For “Website Terms” use Shopify’s **Policies** (e.g. Terms of Service). The footer already links to `/policies/terms-of-service`.

---

### 2. Collections (create in Shopify Admin)

Ensure these collection handles exist so footer/sidebar/homepage links work:

**Categories:**  
`fantasy-football`, `last-place-trophies`, `trophies`, `medals`, `corporate-awards`, `plaques`, `academic`, `perpetual-trophies`, `personalized-gifts` (or `gifts-glassware`), `novelty-awards` (or `3d-novelty-awards`), `engraved-plates`, `lapel-pins`, `picture-frames`, `ribbons` (or `ribbons-rosettes`).

**Sports:**  
`baseball`, `basketball`, `bowling`, `cheerleading`, `football`, `golf`, `gymnastics`, `hockey`, `racing`, `soccer`, `softball`, `swimming`, `tennis`, `track-field`, `volleyball`, `wrestling`. Consider `other-sports-games` if you use it on the live site.

**Other:**  
`march-madness`, `sales-trophies`, `spelling-bee`, `3d-crystals` (for “3D Crystals Sub Surface engraving”).

Update `sidebar-navigation.liquid` and `collection-with-sidebar.liquid` if you choose different handles (e.g. `personalized-gifts` vs `gifts-glassware`).

---

### 3. Blog

- Create a blog (e.g. handle **news**) for “Musings from A Trophy Wife” / “Celebrating Life's Victories Blog”.
- Footer links use `/blogs/news`; if you use another handle, update the footer section links in the theme editor or in `footer-decade.liquid`.

---

### 4. Homepage sections (theme editor)

Current `templates/index.json` has:

1. Hero (homepage-hero-banner)  
2. Shop by Category (10 tiles)  
3. Shop by Sport (12 tiles)  
4. Featured cards (4)  
5. Fantasy Football Trophies carousel  
6. New Products carousel  

**To match live site more closely:**

- **Categories:** Add 4 more tiles in the theme editor: **Engraved Plates**, **Lapel & Chenille Pins**, **Picture Frames**, **Ribbons/Rosettes** (with collection links and images).
- **Sports:** Add 5 more sport tiles: **Racing**, **Track & Field**, **Volleyball**, **Wrestling**, **Other Sports/Games** (with collection links and images).
- **Featured Products:** Add a third product carousel section (same section type as “New Products”) and set heading to “Featured Products” and choose the right collection (e.g. 3D crystals, luggage tags, etc.).

---

### 5. Sections not yet in theme (optional)

| Live section | Suggestion |
|--------------|------------|
| **What Our Clients Say** (testimonials) | Add a custom section that renders a list of testimonials (e.g. from a metafield, block settings, or app). Or use a testimonial app and embed it. |
| **About Decade Awards** (“Know More” modal / block) | Add a custom section or block with the “About Decade Awards” copy and “Know More” CTA linking to `/pages/about-us` or a dedicated about page. |
| **Second hero** (e.g. MEDALS “Explore Now”) | Duplicate the homepage hero section in the theme editor and configure a second hero for Medals (or use one hero and rotate copy/CTA). |

---

### 6. Images

- Homepage category/sport tiles currently use **BigCommerce CDN** URLs in `templates/index.json`. For Shopify:
  - Upload images to **Shopify Files** or theme **Assets**.
  - In the theme editor, replace each block’s image URL with the new Shopify image (or asset URL).
- Use high‑resolution images for hero and carousels; keep aspect ratio and file size in check for performance.

---

### 7. Navigation (header menu)

- Live site: **Shop By Sports**, **Shop By Category** (mega or dropdown), **About Us**, **Help**, **Tools**.
- Theme uses **header-group** with **promo-bar** + **header**; header menu is set in Theme Settings → Header (e.g. `main-menu`).
- In Shopify Admin: **Online Store → Navigation** – create a menu that matches (Shop By Sports, Shop By Category, then About Us / Help / Tools with the same links as the footer).

---

### 8. Policies & legal

- Set **Settings → Policies** in Shopify Admin: Terms of Service, Privacy Policy, Refund Policy, Shipping Policy, etc.
- Footer already links to `/policies/terms-of-service` and `/pages/accessibility`; keep Accessibility page content in sync with your policy.

---

### 9. Product metafields (for customizer)

For the product customizer to work, products need the right metafields (e.g. in Shopify Admin or via bulk edit):

- Engraving: `custom.engraving_line_count`, `custom.characters_per_line`
- Ribbons: `ribbons.options`
- Colorfill: `colorfill.options`
- Perpetual plates: `perpetual.plate_options`
- 360 viewer: `custom.spin360_code`
- Optional: `custom.has_file_upload`, `custom.has_comments`, `custom.has_group_ordering`, `custom.min_purchase_qty`

Define these in **Settings → Custom data** and assign values per product.

---

### 10. Post-launch checks

- [ ] All footer and header links go to the correct pages/collections/blogs.
- [ ] Collection handles in theme (footer, sidebar, homepage) match Shopify.
- [ ] Blog handle matches footer links (e.g. `news` → `/blogs/news`).
- [ ] Policies and Accessibility page are published and linked.
- [ ] Homepage hero, category, sport, and product carousels use Shopify-hosted images.
- [ ] Test product customizer (engraving, ribbons, etc.) on key products.
- [ ] Cart type (notification/drawer/page) and promo bar ($95 free shipping) match merchant preferences.
- [ ] Domain and SSL: point domain to Shopify and enable SSL.

---

## Quick reference – live vs theme

| Area | Live (decadeawards.com) | Theme (decadeawards-dylan) |
|------|-------------------------|----------------------------|
| Footer Tools | 12 links (incl. Amazon Plate, March Madness, Spelling Bee, blog) | ✅ Updated to match |
| Footer Site Info | Blogs, Return Policy, 3D Crystals, Artwork, Design, Text, collections, blog | ✅ Updated to match |
| Footer bottom | © + “Website Terms \| Accessibility” + payments | ✅ Updated to match |
| Homepage categories | 14 categories | 10 tiles (add 4 in editor) |
| Homepage sports | 17 sports | 12 tiles (add 5 in editor) |
| Featured Products | Yes (3rd carousel) | Add in theme editor |
| Testimonials | “What Our Clients Say” | Not in theme (custom section or app) |
| About modal | “About Decade Awards” + Know More | Not in theme (optional section) |

---

*Last updated from comparison with https://www.decadeawards.com/ and theme codebase.*
