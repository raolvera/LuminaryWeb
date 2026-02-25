<!-- cSpell:disable -->
# Luminary Restaurant - Netlify & Decap CMS Setup Guide

## What's Been Set Up

1. **Decap CMS (Content Management System)**
   - Admin interface at `/admin`
   - Configuration file for managing content
   - Content stored in JSON files

2. **Content Structure**
   - Home page content (hero, story, chef philosophy)
   - About page content
   - Events page content
   - Menu items (organized by category)

3. **Netlify Configuration**
   - Ready for deployment
   - Git Gateway for authentication

## Deployment Steps

### 1. Push to GitHub

```bash
cd LuminaryWeb
git init
git add .
git commit -m "Initial commit with Decap CMS"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
<!-- cSpell:enable -->

### 2. Deploy to Netlify

1. Go to <https://app.netlify.com>
2. Click "Add new site" > "Import an existing project"
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
5. Click "Deploy site"

### 3. Enable Netlify Identity

1. In your Netlify site dashboard, go to "Identity"
2. Click "Enable Identity"
3. Under "Registration preferences", select "Invite only"
4. Under "Services" > "Git Gateway", click "Enable Git Gateway"

### 4. Invite Users

1. Go to Identity tab
2. Click "Invite users"
3. Enter email addresses for team members
4. They'll receive an invitation to set up their account

### 5. Access CMS

- Visit: `https://your-site-name.netlify.app/admin`
- Log in with invited user credentials
- Start managing content!

## What Team Can Edit

### Without Developer

- ✅ Hero image and text
- ✅ Story section content and video
- ✅ Chef philosophy text and image
- ✅ All menu items (add, edit, delete)
- ✅ Menu item images
- ✅ About page content
- ✅ Events page content
- ✅ All images across the site

### Stays the Same

- ❌ Site structure/layout
- ❌ Navigation menu
- ❌ Footer
- ❌ Reservation form functionality
- ❌ Styling/colors

## Content Management

### To Update Menu

1. Go to `/admin`
2. Click "Menu Items"
3. Add new item or edit existing
4. Upload image, set price, description
5. Save and publish

### To Update Images

1. Go to relevant page section
2. Click on image field
3. Upload new image
4. Save changes

### To Update Text

1. Navigate to the page
2. Edit text fields
3. Save and publish

## Important Notes

- All content changes are version controlled via Git
- Changes are published immediately after saving
- Original content is preserved in JSON files
- Team can revert changes if needed
- No coding knowledge required for content updates

## Support

<!-- cSpell:disable -->
For technical issues or questions:

- Check Netlify documentation: <https://docs.netlify.com>
- Decap CMS docs: <https://decapcms.org/docs/>

<!-- cSpell:enable -->
