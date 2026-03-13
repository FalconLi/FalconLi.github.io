# Main Info Editing Guide (Email + Social Icons)

This guide explains how to edit your header/footer contact info and social icons.

## Files involved

- `_data/main_info.yaml`: your profile data
- `_layouts/default.html`: how that data is displayed
- `_includes/google_analytics.html`: analytics script (optional)

## 1) Add one or two emails

The template now supports three email styles.

Option A (single email):

```yaml
email: "your_email@example.com"
```

Option B (two emails, your current setup):

```yaml
email1: "first@example.com"
email2: "second@example.com"
```

Option C (multiple emails list):

```yaml
emails:
  - "first@example.com"
  - "second@example.com"
  - "third@example.com"
```

Display priority:

1. If `emails` exists, it is used.
2. Else `email1`/`email2` are used.
3. Else `email` is used.

## 1.5) Add a department line under title

Use this key in `_data/main_info.yaml`:

```yaml
department: "Department of Computer Science, The University of ..."
```

If `department` exists, it is shown under `title` in the header.

## 2) Show or hide social icons

Use these keys in `_data/main_info.yaml`:

- `bsky`
- `twitter`
- `linkedin`
- `github`
- `google_scholar`

How to hide an icon:

- Remove the key, or
- Comment the line with `#`, or
- Keep key with empty value `""`

How to show an icon:

- Add the key with a valid URL.

Example:

```yaml
linkedin: "https://www.linkedin.com/in/your-id/"
github: "https://github.com/your-id"
google_scholar: "https://scholar.google.com/citations?user=XXXX"
```

The layout now renders each icon only when its URL is non-empty.

## 3) Google Analytics (optional)

If you want analytics, set:

```yaml
google_analystics_tracking_id: "G-XXXXXXXXXX"
```

If this key is missing or empty, analytics script is not loaded.

## 3.5) SEO/OpenGraph metadata (optional but recommended)

You can set these in `_data/main_info.yaml`:

```yaml
author: "Your Name"
meta_description: "Short one-line summary of your profile/site."
og_site_name: "Your Name"
```

If omitted, the template falls back to your `name` and `title`.

## 4) Recommended edit workflow

1. Edit `_data/main_info.yaml`.
2. Save file.
3. Refresh local site.
4. Confirm header and footer are correct.

## 5) Common mistakes

1. Wrong indentation in YAML: use spaces, not tabs.
2. Typo in key names: use exact key names above.
3. Quotation issues: wrap strings in quotes.
4. Caching confusion: hard refresh browser (`Ctrl+F5`) after edits.

## 6) Quick templates

Minimal profile:

```yaml
name: "Your Name"
title: "Your Title"
email: "you@example.com"
profile_pic: "/assets/profile-pics/your_photo.jpg"
linkedin: "https://www.linkedin.com/in/your-id/"
github: "https://github.com/your-id"
```

Two-email profile with Scholar:

```yaml
name: "Your Name"
title: "Your Title"
email1: "work@example.com"
email2: "personal@example.com"
profile_pic: "/assets/profile-pics/your_photo.jpg"
linkedin: "https://www.linkedin.com/in/your-id/"
github: "https://github.com/your-id"
google_scholar: "https://scholar.google.com/citations?user=XXXX"
```
