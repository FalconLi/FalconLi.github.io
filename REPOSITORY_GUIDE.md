# Personal Website Template Guide (Beginner-Friendly)

This file explains how this repository is organized, how the website is built, and exactly which files you should edit to replace the template owner's information with your own.

## 1) What this repository is

This is a **Jekyll** static website template for a personal academic/professional homepage.

- "Static website" means it generates plain HTML/CSS/JS files (no backend server code).
- Jekyll takes templates + data files and builds a final site into `_site/`.
- Most of your edits will be in `_data/*.yaml` and `index.html`.

## 2) High-level design (simple mental model)

Think of this repo in 4 layers:

1. **Content data**: `_data/*.yaml`
2. **Page structure**: `index.html`, `_layouts/*.html`
3. **Style and behavior**: `libs/custom/my_css.css`, `libs/custom/my_js.js`
4. **Static assets**: `assets/...` (images, PDFs, thumbnails, CV)

Jekyll combines these into the final website.

## 3) Repository map (what each folder/file does)

### Core files

- `_config.yml`
  - Jekyll config.
  - Important setting: `baseurl` (currently `/msaveski`).
- `index.html`
  - Main homepage sections (Bio, Publications, Resume, Template section).
  - Uses data from `_data`.
- `_layouts/default.html`
  - Shared page layout (header, profile image, top nav, footer, library imports).
- `_layouts/project.html`
  - Layout for each project detail page in `_projects`.
- `_includes/google_analytics.html`
  - Google Analytics snippet.
- `_includes/image_with_caption.html`
  - Reusable helper to show an image + caption.

### Content data files

- `_data/main_info.yaml`
  - Name, title, email, profile picture path, social links, scholar link, analytics id.
- `_data/publications.yaml`
  - Full publication list.
- `_data/experience.yaml`
  - Timeline entries shown in "Vita/Resume".
- `_data/projects.yaml`
  - Project cards (used by Projects section, currently commented out on homepage).
- `_data/template_users.yaml`
  - Links shown in "Website Design" section (can be removed if you want).

### Project pages

- `_projects/*.md`
  - Individual project pages, each with front matter (`layout`, `title`, etc.) and content.
  - Rendered through `_layouts/project.html`.

### Assets and libraries

- `assets/profile-pics/`
  - Profile photos.
- `assets/cv/`
  - CV PDF (`cv_web.pdf`).
- `assets/publications/`
  - PDFs/slides/posters for publications.
- `assets/projects/`
  - Project images and project files.
- `libs/custom/my_css.css`
  - Your custom styling.
- `libs/custom/my_js.js`
  - Your custom JavaScript.
- `libs/external/`
  - Third-party libraries (Skeleton CSS, Font Awesome, Academicons, jQuery).

### Legacy/optional files

- `_website_2014/`
  - Old legacy site files, not part of the current homepage flow.
- `__deploy.sh`
  - Old deploy script for the original owner's server.
- `__redirect_mit.html`, `__redirect_su.html`
  - Redirect pages for old hosting setups.

## 4) Fastest path to personalize the website

If you want to get your own version quickly, edit in this order:

1. `_data/main_info.yaml`
2. `assets/profile-pics/` (add your photo), then update `profile_pic`
3. `index.html` (replace Bio text)
4. `_data/experience.yaml`
5. `_data/publications.yaml`
6. `assets/cv/cv_web.pdf` (replace with your CV)
7. `_config.yml` (`baseurl`)
8. `_layouts/default.html` (replace hardcoded metadata that still says Martin Saveski)

## 5) Exactly what to edit for your information

## A) Header info, social links, profile picture

Edit: `_data/main_info.yaml`

Fields to replace:

- `name`
- `title`
- `email`
- `profile_pic` (path to your photo in `assets/profile-pics`)
- `bsky`, `twitter`, `linkedin`, `github`, `google_scholar`
- `google_analystics_tracking_id`

Example format:

```yaml
name: "Your Name"
title: "Your Role, Your Organization"
email: "your_email [AT] domain.com"
profile_pic: "/assets/profile-pics/your_photo.jpg"
bsky: "https://bsky.app/profile/..."
twitter: "https://twitter.com/..."
linkedin: "https://www.linkedin.com/in/..."
github: "https://github.com/..."
google_scholar: "https://scholar.google.com/citations?user=..."
google_analystics_tracking_id: "G-XXXXXXXXXX"
```

Important:

- Keep YAML indentation with spaces (no tabs).
- Keep quotes around text values.
- The key name is currently spelled `google_analystics_tracking_id` in code. Keep that spelling unless you also update `_includes/google_analytics.html`.

## B) Bio section text

Edit: `index.html`

- Find `<div class="docs-section" id="bio">`.
- Replace the two biography paragraphs with your own text.

## C) Publications

Edit: `_data/publications.yaml`

Each paper entry supports:

- `title`
- `authors`
- `venue`
- `paper_pdf`
- optional: `slides`, `poster`, `video`, `code`, `data`
- `selected: y` or `selected: n`

How it displays:

- "Selected" tab shows only `selected: y`.
- "All" tab shows everything.

Internal file link example:

- `paper_pdf: "/assets/publications/2026_my_paper/paper.pdf"`

External URL example:

- `paper_pdf: "https://doi.org/...."`

## D) Resume/Vita timeline

Edit: `_data/experience.yaml`

Each entry has:

- `place`
- `time`
- `title`
- `subtitle`
- `category` (`work` or `school`)

`category` controls left/right side on the timeline.

## E) CV PDF link

Replace file:

- `assets/cv/cv_web.pdf`

This file is linked in `index.html` under the Resume/Vita section.

## F) Projects (optional)

Current status:

- The Projects section in `index.html` is commented out.
- Project pages still exist in `_projects`.

If you want projects on homepage:

1. Uncomment the Projects section in `index.html`.
2. Uncomment the Projects nav item in `_layouts/default.html`.
3. Edit `_data/projects.yaml` for project cards.
4. Edit corresponding `_projects/*.md` pages.

## G) Template users section (optional removal)

Current section:

- `index.html` includes a "Website Design" section.
- It reads links from `_data/template_users.yaml`.

If you do not want this on your site, delete or comment out that whole section in `index.html`.

## H) Page metadata (important for SEO/share cards)

Edit: `_layouts/default.html`

There are still hardcoded values like "Martin Saveski" and old URLs in:

- `<meta name="description" ...>`
- `<meta name="author" ...>`
- Open Graph tags (`og:title`, `og:url`, `og:site_name`)
- `<link rel="canonical" ...>`

Replace them with your own name and domain.

## 6) Base URL and deployment settings

Edit: `_config.yml`

Current value:

```yaml
baseurl: /msaveski
```

How to set:

- If deploying as `https://username.github.io`: set `baseurl: ""`
- If deploying as `https://username.github.io/repo-name`: set `baseurl: "/repo-name"`

Why this matters:

- Many links use `{{ site.baseurl }}`. Wrong `baseurl` causes broken links/CSS/images.

## 7) Local run instructions (preview before publishing)

This template expects Jekyll. Typical commands:

```bash
gem install jekyll bundler
jekyll serve
```

Then open:

- `http://127.0.0.1:4000/<baseurl>/`
- With current config that would be `http://127.0.0.1:4000/msaveski/`

Note:

- If `jekyll` is not installed yet, the command will fail until Ruby/Jekyll are installed.

## 8) Styling and layout customization

For appearance changes:

- Edit `libs/custom/my_css.css` for colors, spacing, typography, navbar behavior.
- Edit `libs/custom/my_js.js` for navbar scroll behavior/smooth scrolling logic.

For major structure changes:

- Edit `index.html` (homepage sections).
- Edit `_layouts/default.html` (header/nav/footer/global structure).

## 9) Common pitfalls (important)

1. YAML spacing errors: YAML is space-sensitive; bad indentation breaks build.
2. Broken paths: Keep internal paths starting with `/assets/...`.
3. Wrong `baseurl`: Most common cause of missing CSS/images after deployment.
4. Dead navbar links: Navbar has a "Prospective Students" link, but that section is currently commented out.
5. Old owner info left in metadata: Update hardcoded meta tags in `_layouts/default.html`.
6. Encoding artifacts in old text: If strange characters appear, retype that text and save file as UTF-8.

## 10) What you can ignore at first

You can ignore these initially:

- `_website_2014/`
- `__deploy.sh` (unless you use the same server method)
- `__redirect_*.html`
- most files under `libs/external/`

## 11) Beginner-safe editing workflow

Use this workflow each time:

1. Edit one file.
2. Save.
3. Run local preview (`jekyll serve`).
4. Refresh browser.
5. Confirm the section changed as expected.
6. Repeat.

This prevents breaking many things at once.

---

If you want, the next step can be a second guide called `PERSONALIZATION_CHECKLIST.md` where we fill in a concrete checklist with your actual name, links, education, publications, and timeline entries one by one.
