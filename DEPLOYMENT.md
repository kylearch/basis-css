# Deployment Instructions for BasisCSS

## Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Have access to your Vercel account
3. Have access to your domain registrar for basiscss.com

## Initial Deployment

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy to Vercel (staging):**
   ```bash
   npm run deploy
   ```
   - Follow the prompts
   - Select or create a new project
   - Use default settings (the vercel.json handles configuration)

3. **Deploy to Production:**
   ```bash
   npm run deploy:prod
   ```

## Custom Domain Setup

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Domains" tab
3. Add `basiscss.com` and `www.basiscss.com`
4. Vercel will provide DNS records

### In Your Domain Registrar:
Add the following DNS records (Vercel will show you the exact values):

**For basiscss.com (apex domain):**
- Type: A
- Name: @ or blank
- Value: 76.76.21.21 (Vercel's IP)

**For www.basiscss.com:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### Verify Domain:
1. Wait for DNS propagation (5-30 minutes typically)
2. Vercel will automatically provision SSL certificates
3. Your site will be live at https://basiscss.com

## Continuous Deployment

After initial setup, any future deployments:
```bash
npm run deploy:prod
```

Or set up Git integration in Vercel for automatic deployments on push.

## Files Configured:
- `vercel.json` - Main configuration with headers, caching, and clean URLs
- `.vercelignore` - Files to exclude from deployment
- `package.json` - Deployment scripts added

## Current Settings:
- Clean URLs enabled (no .html extensions needed)
- Security headers configured
- Cache headers for static assets (CSS/JS)
- Ready for custom domain configuration