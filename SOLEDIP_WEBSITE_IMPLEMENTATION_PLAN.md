# SoleDip Website Implementation Plan

**Domain:** `www.soledip.3qinnova.com`  
**Status:** Research complete, ready for development  
**Timeline:** 14 days to launch  
**Date Created:** August 23, 2026

---

## Executive Summary

SoleDip needs a companion website at `soledip.3qinnova.com` to host legal documents (Terms & Conditions, Privacy Policy), support information, company pages, and compliance documentation. This plan integrates with the existing SoleDip iOS project infrastructure and follows industry standards established by major platforms (Stripe, Airtable, Retool, Make, Zapier, Webflow).

---

## 1. Research Findings: Industry Standards

Analyzed 7 major app/platform makers:
- **Stripe** - Enterprise-grade legal structure
- **Airtable** - Organized hub model
- **Webflow** - Security/Trust subdomains
- **Retool** - Docs-integrated approach
- **Make** - Regional/Language prefixing
- **Zapier** - Simple direct documents
- **Bubble** - Minimal legal footprint

### Key Patterns Identified

1. **Path-based Organization** (Most common)
   - `/legal` - Hub page with categorized links
   - `/support` - Help center entry
   - `/company` or `/about` - Company info
   - NOT subdomain-based for core legal pages

2. **Hub Pages > Flat Structures**
   - Single overview page linking to specific documents
   - Better organization and user experience
   - Easier to maintain and update

3. **Privacy Gets Its Own Page**
   - Separate from generic "Legal" document
   - Due to user interest and regulatory requirements
   - Typically most visited legal page

4. **Strong Internal Cross-Linking**
   - Privacy → CCPA → Data Deletion → Contact
   - Creates complete user journey
   - Helps with SEO and navigation

5. **Subdomains Only for Specialized Content**
   - `docs.*` - Technical documentation
   - `support.*` - Help portal
   - `status.*` - Service status
   - `trust.*` - Security/compliance (rare)

---

## 2. Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router) with TypeScript
  - Native SEO optimization
  - Built-in image optimization
  - Perfect for static legal content export
  - Vercel native support

- **Styling:** Tailwind CSS 4 + Radix UI
  - Rapid development
  - Dark/light mode support
  - Accessible headless components
  - Can reuse iOS design tokens

- **Content:** Markdown (MDX)
  - Version control in git
  - Easy diff tracking for legal revisions
  - Audit trail for compliance
  - No external dependencies

### Backend & Database
- **Database:** Supabase (already in use)
  - Contact form submissions
  - Legal document audit logs
  - Optional support ticket system

- **API:** Next.js API Routes
  - Contact form handler
  - Data submission endpoints

### Deployment & Infrastructure
- **Hosting:** Vercel
  - Next.js native optimization
  - Automatic preview deployments
  - Zero-config setup
  - Edge Functions support

- **CDN & DNS:** Cloudflare
  - Edge caching
  - WAF (Web Application Firewall)
  - SSL/TLS management
  - DDoS protection

- **Analytics:** PostHog
  - Privacy-respecting (GDPR-compliant)
  - Page view tracking
  - Engagement metrics

---

## 3. Repository Structure

### Monorepo Approach (Recommended)

Add `/website` subdirectory to existing SoleDip monorepo:

```
soledip-monorepo/
├── ios/              # Existing iOS app
├── supabase/         # Existing backend
├── worker/           # Existing extractor
├── docs/             # Existing documentation
└── website/          # ← NEW: soledip.3qinnova.com
    ├── app/          # Next.js pages & layouts
    │   ├── (marketing)/      # Public marketing pages
    │   ├── (legal)/          # Legal document pages
    │   ├── (support)/        # Support/help pages
    │   ├── (company)/        # Company info pages
    │   ├── (trust)/          # Trust/security pages
    │   └── api/              # API routes
    ├── components/   # React components
    │   ├── layout/   # Header, Footer, Navigation
    │   ├── forms/    # Contact, Data deletion forms
    │   ├── legal/    # Legal doc components
    │   └── ui/       # Button, Card, Alert, etc.
    ├── docs/         # Markdown content repository
    │   ├── legal/    # Terms, Privacy, Cookies, CCPA, DPA
    │   ├── support/  # FAQ, Troubleshooting, Account Deletion
    │   └── company/  # About, Contact, Careers
    ├── lib/          # Utilities & helpers
    │   ├── markdown.ts       # MDX rendering
    │   ├── seo.ts            # SEO metadata
    │   ├── analytics.ts      # PostHog integration
    │   └── content-loader.ts # Load markdown
    ├── public/       # Static assets
    │   ├── logos/
    │   ├── favicons/
    │   ├── og-images/
    │   └── downloads/
    ├── styles/       # Global CSS
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── middleware.ts
```

### Why Monorepo?
✓ Single source of truth for Privacy Policy (shared between app & web)  
✓ Unified CI/CD pipeline  
✓ Consistent deployment strategy  
✓ Legal document version control in one git history  
✓ Easier cross-team coordination

---

## 4. URL Architecture & Site Map

### Root Domain Organization

```
https://www.soledip.3qinnova.com/

├── / (homepage)
│   └── Marketing landing page
│
├── /legal (hub page)
│   ├── /terms                      → Terms of Use
│   ├── /privacy-policy             → Privacy Policy
│   ├── /cookies                    → Cookie Policy  
│   ├── /ccpa                       → CCPA/CPRA Rights
│   ├── /data-deletion              → Data Deletion Form
│   └── /dpa                        → Data Processing Agreement (B2B)
│
├── /support (hub page)
│   ├── /faq                        → Frequently Asked Questions
│   ├── /account-deletion           → How to Delete Account
│   ├── /troubleshooting            → Common Technical Issues
│   └── /subscription-help          → Billing & Premium Questions
│
├── /about                          → About SoleDip/3qinnova
├── /contact                        → Contact Form
├── /careers                        → Careers/Jobs
│
├── /trust (hub page)
│   ├── /security                   → Security Practices & Encryption
│   ├── /compliance                 → Compliance Certifications  
│   └── /responsible-disclosure     → Bug Bounty Policy
│
└── /api/                           → API Endpoints
    ├── contact                     → POST contact form
    ├── data-deletion               → POST deletion request
    ├── sitemap.xml                 → Dynamic sitemap
    └── robots.txt                  → Dynamic robots.txt
```

### DNS Configuration

```
Type   Name               Value
────────────────────────────────────────────
CNAME  www.soledip        cname.vercel.co
CNAME  staging.soledip    cname.vercel.co
TXT    soledip            Vercel verification code
```

---

## 5. Complete Site Map by Phase

### Phase 1: Launch (Days 3-5) — App Store Requirements ⚠️ CRITICAL

| Page | URL | Status | Purpose |
|------|-----|--------|---------|
| Homepage | `/` | Create | App landing, download CTA |
| Privacy Policy | `/legal/privacy-policy` | Convert existing | App Store requirement |
| Terms of Use | `/legal/terms` | Write + review | Subscription requirement |
| Contact Form | `/contact` | Build form | Support contact channel |
| Account Deletion | `/support/account-deletion` | Write instructions | GDPR/CCPA requirement |

**Blockers:** Terms of Use needs legal review before go-live

### Phase 2: Compliance (Days 6-8)

| Page | URL | Type | Priority |
|------|-----|------|----------|
| Legal Hub | `/legal` | Hub page | Medium |
| Cookie Policy | `/legal/cookies` | Legal doc | Medium |
| CCPA/CPRA | `/legal/ccpa` | Legal doc | Medium |
| Data Deletion Form | `/legal/data-deletion` | Form | Medium |
| Support Hub | `/support` | Hub page | Medium |
| FAQ | `/support/faq` | Help content | Medium |
| Troubleshooting | `/support/troubleshooting` | Help content | Medium |

### Phase 3: Trust & Company (Days 9-11)

| Page | URL | Type | Priority |
|------|-----|------|----------|
| Trust Hub | `/trust` | Hub page | Low |
| Security | `/trust/security` | Legal doc | Low |
| Compliance | `/trust/compliance` | Info page | Low |
| Responsible Disclosure | `/trust/responsible-disclosure` | Legal doc | Low |
| About | `/about` | Marketing | Low |
| Careers | `/careers` | Marketing | Low |

### Phase 4: Polish & Launch (Days 12-14)

- SEO optimization (metadata, sitemap, robots.txt)
- Mobile responsiveness testing (<320px to 4k)
- Accessibility audit (WCAG 2.1 AA)
- Performance optimization (Lighthouse ≥90)
- Analytics setup (PostHog)
- Security review (SSL, CSP headers)
- Production deployment

---

## 6. Content Requirements Breakdown

### Legal Documents

#### Privacy Policy (`/legal/privacy-policy`)
**Status:** 80% complete (convert from existing)  
**Estimated Effort:** 8 hours (format + integrate)

**Required Sections:**
- Effective date & version number
- Information We Collect
  - Account information
  - Watchlists & URLs
  - AI Assist queries
  - Alerts & notifications
  - Ads & identifiers
  - Purchases & subscriptions
  - Support communications
- How We Use Information
- What We Share
  - Supabase
  - Apple ID
  - Google Sign-In
  - Third-party services
- Your Privacy Choices
  - App Tracking Transparency (ATT)
  - Google UMP integration
  - Regional variations
- Data Deletion & Retention
- Children's Privacy
- Security Practices
- International Data Processing
- Regional Compliance
  - EEA/UK/Switzerland (GDPR)
  - California (CCPA/CPRA)
  - Australia (Australian Privacy Act)
  - Canada (PIPEDA)
- Changes to Policy
- Contact Information

#### Terms of Use (`/legal/terms`)
**Status:** Needs creation + legal review  
**Estimated Effort:** 12 hours (write + review + revise)

**Required Sections:**
- Use License
  - Age of majority requirement (13+)
  - Permitted uses (personal, non-commercial)
  - Prohibited uses (scraping, resale, automation)
- Affiliate Disclosures
  - "SoleDip may earn commission from retailer links"
  - Amazon Associates disclosure
  - User pricing not affected
  - FTC compliance
- Retailer Liability Disclaimer
  - SoleDip does not control retailer prices
  - Not responsible for retailer availability, shipping, returns
  - Not responsible for retailer website content
- Intellectual Property
  - Copyright notice
  - Limited license to use SoleDip content
  - User-generated content ownership
- Limitations of Liability
  - Service provided "as-is"
  - No warranty for price accuracy
  - Indemnification clause
- Termination
  - SoleDip may terminate for ToU violation
  - User can delete account anytime
- Governing Law
  - Delaware or California (specify)
- Entire Agreement
- Contact for Disputes

#### Cookie Policy (`/legal/cookies`)
**Status:** Needs creation  
**Estimated Effort:** 4 hours

**Required Sections:**
- What are cookies & storage technologies
- Types of cookies used
  - Session cookies (functionality)
  - Persistent cookies (preferences, login)
  - Third-party cookies (Google AdMob, analytics)
- Cookie purposes
  - Essential (authentication, security)
  - Analytics (PostHog)
  - Advertising (Google AdMob)
- Other tracking technologies
  - Web beacons
  - Pixels
  - Local storage
- User cookie management
  - Browser settings
  - iOS privacy settings
  - Opt-out options
- Google & AdMob disclosures
- Policy updates

#### CCPA/CPRA Rights (`/legal/ccpa`)
**Status:** Needs creation  
**Estimated Effort:** 4 hours

**Required Sections:**
- California Consumer Privacy Act overview
- Your Rights
  - Right to Know (what data is collected)
  - Right to Delete (removal of data)
  - Right to Opt-Out (sale/sharing of personal info)
  - Right to Correct (accuracy of data)
  - Right to Limit Use & Disclosure
  - Right to Non-Discrimination
- How to Exercise Your Rights
  - Web form
  - Email: support@3qinnova.com
  - Verification process (proof of residency)
  - Response timeline (45 days)
- Authorized Agent Instructions
- Metrics & Reports

#### Data Deletion Form (`/legal/data-deletion`)
**Status:** Needs creation (form component)  
**Estimated Effort:** 6 hours (form + backend)

**Form Fields:**
- Email address (required)
- Account ID (optional)
- Reason for deletion (optional)
- Verification checkbox
- Submit button

**What Gets Deleted:**
- Account profile & settings
- All watchlists
- Price history & alerts
- Search history
- Saved preferences

**Timeline:** Within 45 days (CCPA standard)

**Exceptions:**
- Legal obligations
- Fraud prevention
- Payment settlement

**Backend Integration:**
- POST to `/api/data-deletion`
- Store in `deletion_requests` table (Supabase)
- Send confirmation email to user
- Notify support@3qinnova.com for processing

#### DPA - Data Processing Agreement (`/legal/dpa`)
**Status:** Future (B2B customers)  
**Estimated Effort:** 8 hours (template + review)

**Purpose:** Required for enterprise/business customers under GDPR

**Sections:**
- Scope & Definitions
- Processing Instructions
- Data Subject Rights
- Security Measures
- Sub-processors List
- International Transfers (SCCs)
- Audit & Inspection Rights
- Appendices (Processing details, Security measures)

### Support & Help Documents

#### FAQ (`/support/faq`)
**Status:** Needs creation  
**Estimated Effort:** 8 hours (work with support team)

**Categories:**
- Getting Started
  - How do I download SoleDip?
  - What do I need to create an account?
  - Can I use multiple accounts?
  - Which devices are supported?

- Watchlists & Tracking
  - How do I add a product?
  - What retailers are supported?
  - How often does SoleDip check prices?
  - Can I track multiple colors/sizes?
  - What happens if a retailer changes?

- Alerts & Notifications
  - How do price alerts work?
  - Can I set multiple price targets?
  - How do I customize alert frequency?
  - Can I disable notifications?
  - Why didn't I get an alert?

- AI Assist & Premium
  - What is AI Assist Premium?
  - How much does it cost?
  - Can I cancel anytime?
  - What payment methods are accepted?
  - How do I manage my subscription?

- Privacy & Security
  - Is my data private? → Link to `/legal/privacy-policy`
  - Can I delete my account? → Link to `/support/account-deletion`
  - How is my data protected? → Link to `/trust/security`
  - Who can see my watchlists?

- Technical Issues
  - The app keeps crashing
  - Prices aren't updating
  - I can't log in
  - Watchlists disappeared
  - Notifications not working

#### Account Deletion (`/support/account-deletion`)
**Status:** Needs creation  
**Estimated Effort:** 2 hours

**Sections:**
- Why delete your account
- Step-by-step instructions
  1. Open app → Settings → Account
  2. Tap "Delete Account"
  3. Confirm and enter password
  4. Confirmation email sent
- What happens
  - All data removed
  - Timeline: up to 45 days for backups
  - Can re-create account anytime
- Troubleshooting
  - "Delete Account button not visible?"
  - "Didn't receive confirmation email?"
- Contact Support: support@3qinnova.com
- Link to Privacy Policy

#### Troubleshooting (`/support/troubleshooting`)
**Status:** Needs creation  
**Estimated Effort:** 4 hours

**Issue Categories:**
- App Crashes
  - Check iOS version (minimum required)
  - Force-quit and restart
  - Clear app cache
  - Reinstall app
  - Check available storage

- Prices Not Updating
  - Check internet connection
  - Check if retailer is supported
  - Force manual sync
  - Common retailer API downtime
  - Try again later

- Login Issues
  - Forgot password flow
  - Email not recognized
  - Apple ID issues
  - Keychain/credential problems
  - Two-factor authentication

- Watchlist Problems
  - URL not recognized
  - "Can't add duplicate" errors
  - Watchlist sync issues
  - Missing products

- Notification Issues
  - Check iOS notification settings
  - Re-enable in-app notifications
  - Check iPhone DND (Do Not Disturb) schedule
  - Check notification permissions

#### Subscription Help (`/support/subscription-help`)
**Status:** Needs creation  
**Estimated Effort:** 3 hours

**Sections:**
- What is AI Assist Premium?
  - Cost: $4.99/month (or current price)
  - Features included
  - Free trial (if applicable)
  - How to subscribe

- Billing & Charges
  - Charged through Apple
  - View charges in Settings → Apple ID → Subscriptions
  - Update payment method in App Store
  - Billing date explanation

- Managing Subscription
  - View active subscriptions
  - How to cancel (step-by-step)
  - Refund eligibility & process
  - Pause subscription (if available)

- Common Issues
  - "Charged but premium not active"
  - "Duplicate charges"
  - "Can't cancel"
  - "Charged after cancellation"

### Company Pages

#### About (`/about`)
**Estimated Effort:** 3 hours

**Sections:**
- SoleDip story & mission
- The problem we solve
- Why we built SoleDip
- Team info (optional)
- Contact/Support links

#### Contact (`/contact`)
**Estimated Effort:** 4 hours (form + backend)

**Form Fields:**
- Name (required)
- Email (required)
- Subject (dropdown)
  - Support
  - Feedback
  - Partnership
  - Bug Report
  - Other
- Message (required, textarea)
- Submit button

**Privacy Notice:** "We'll respond within 24-48 hours. See our Privacy Policy."

**Backend Integration:**
- POST to `/api/contact`
- Validate email format
- Store in `contact_submissions` table (Supabase)
- Send confirmation email to user
- Email notification to support@3qinnova.com

#### Careers (`/careers`)
**Estimated Effort:** 2 hours

**Sections:**
- Why join 3qinnova
- Open positions (if hiring)
- Company culture/values
- Or: "We're not currently hiring, but reach out at careers@3qinnova.com"

### Trust & Security Pages

#### Trust Hub (`/trust`)
**Estimated Effort:** 2 hours

**Sections:**
- Security & Privacy commitment statement
- Links to related pages
  - Security Practices
  - Compliance Certifications
  - Responsible Disclosure

#### Security (`/trust/security`)
**Estimated Effort:** 4 hours

**Sections:**
- Data Encryption
  - In-transit (HTTPS/TLS)
  - At-rest (database encryption)
- Authentication
  - Apple Sign-In
  - Google Sign-In
  - OAuth 2.0 standards
- Database Security
  - Supabase Row-Level Security (RLS)
  - Automated encrypted backups
  - Access controls
- Audit Logging
  - Sensitive operations logged
  - Retention policy
- Regular Security Reviews
  - Penetration testing
  - Dependency updates
  - Vulnerability scanning
- Third-party Security
  - Supabase SOC 2 compliance
  - Apple/Google security standards

#### Compliance (`/trust/compliance`)
**Estimated Effort:** 3 hours

**Sections:**
- GDPR Compliance
- CCPA/CPRA Compliance
- App Privacy Label
  - Data collected (from App Store)
  - Data usage practices
- SOC 2 Type II (future)
- ISO 27001 (future)
- Certifications & Standards

#### Responsible Disclosure (`/trust/responsible-disclosure`)
**Estimated Effort:** 2 hours

**Sections:**
- Security issue reporting
  - Email: security@3qinnova.com
  - DO NOT post publicly
- Coordinated Disclosure
  - 90-day disclosure window
  - 30 days to respond
  - 60 days to patch
  - 30 days buffer before public disclosure
- Hall of Fame (if applicable)
- Bug Bounty Program (if applicable)

---

## 7. Content Production Summary

| Document Type | Count | Est. Hours | Status |
|---|---|---|---|
| Legal Documents | 6 | 40 | 1 done, 5 need creation |
| Support Documents | 5 | 20 | Need creation |
| Company Pages | 3 | 8 | Need creation |
| Trust Pages | 4 | 9 | Need creation |
| **Total** | **18** | **77** | **1 done, 17 to create** |

**Content Work Allocation:**
- Legal writing/review: 40 hours
- Support documentation: 20 hours
- Marketing/company pages: 8 hours
- Trust/security pages: 9 hours
- **Total: ~50-70 hours** (accounting for revisions & QA)

---

## 8. Implementation Timeline

### Phase 0: Setup & Infrastructure (Days 1-2)
**Effort:** 8 hours (Frontend Dev)

**Deliverables:**
- [ ] Create `/website` directory in monorepo
- [ ] Initialize Next.js 14 with TypeScript
- [ ] Configure Tailwind CSS + Radix UI
- [ ] Setup environment variables (`.env.example`)
- [ ] Configure Vercel deployment pipeline
- [ ] Create base layout components (Header, Footer, Navigation)
- [ ] Setup git hooks (pre-commit linting)
- [ ] Create middleware for redirects

**Critical Files:**
- `website/package.json`
- `website/next.config.js`
- `website/tailwind.config.ts`
- `website/tsconfig.json`
- `website/middleware.ts`
- `website/app/layout.tsx`
- `website/components/layout/Header.tsx`
- `website/components/layout/Footer.tsx`

---

### Phase 1: Launch - App Store Critical (Days 3-5)
**Effort:** 36 hours (24h dev + 12h content)

**Must-Have Pages:**
- [ ] Homepage (`/`)
- [ ] Privacy Policy (`/legal/privacy-policy`)
- [ ] Terms of Use (`/legal/terms`)
- [ ] Contact Form (`/contact`)
- [ ] Account Deletion Instructions (`/support/account-deletion`)

**Backend Integration:**
- [ ] `/api/contact` endpoint
- [ ] Contact form → Supabase `contact_submissions` table
- [ ] Email notifications to support@3qinnova.com

**Content Work:**
- [ ] Convert Privacy Policy (8 hrs)
- [ ] Write & Review Terms of Use (12 hrs - ⚠️ BLOCKER)
- [ ] Write Account Deletion instructions (2 hrs)

**Launch Criteria:**
- All 5 pages live and tested
- Contact form functional
- Terms of Use legally reviewed
- URLs ready for App Store submission

**⚠️ Critical Path Blocker:** Terms of Use legal review must complete by EOD Day 5

---

### Phase 2: Compliance & Support (Days 6-8)
**Effort:** 20 hours

**Pages to Deploy:**
- [ ] Legal Hub (`/legal`)
- [ ] Cookie Policy (`/legal/cookies`)
- [ ] CCPA Rights (`/legal/ccpa`)
- [ ] Data Deletion Form (`/legal/data-deletion`)
- [ ] Support Hub (`/support`)
- [ ] FAQ (`/support/faq`)
- [ ] Troubleshooting (`/support/troubleshooting`)

**Content Work:**
- [ ] Write Cookie Policy (4 hrs)
- [ ] Write CCPA page (4 hrs)
- [ ] Build Data Deletion form (6 hrs)
- [ ] Create FAQ (8 hrs - coordinate with support team)
- [ ] Write Troubleshooting guide (4 hrs)

**Backend Integration:**
- [ ] `/api/data-deletion` endpoint
- [ ] Data deletion form → Supabase
- [ ] Email notifications for deletion requests

---

### Phase 3: Trust & Company (Days 9-11)
**Effort:** 16 hours

**Pages to Deploy:**
- [ ] Trust Hub (`/trust`)
- [ ] Security Practices (`/trust/security`)
- [ ] Compliance (`/trust/compliance`)
- [ ] Responsible Disclosure (`/trust/responsible-disclosure`)
- [ ] About (`/about`)
- [ ] Careers (`/careers`)

**Content Work:**
- [ ] Write Security page (4 hrs)
- [ ] Write Compliance page (3 hrs)
- [ ] Write Responsible Disclosure (2 hrs)
- [ ] Write About page (3 hrs)
- [ ] Write Careers page (2 hrs)
- [ ] Curate Trust Hub (2 hrs)

---

### Phase 4: Polish & Production Launch (Days 12-14)
**Effort:** 20 hours

**Quality Assurance:**
- [ ] SEO optimization
  - [ ] Meta tags on all pages
  - [ ] OG images configured
  - [ ] Sitemap.xml generated
  - [ ] robots.txt configured
  - [ ] Canonical URLs correct

- [ ] Responsive Design Testing
  - [ ] Mobile (<320px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1440px)
  - [ ] Large screens (2560px)

- [ ] Accessibility Audit
  - [ ] WCAG 2.1 AA compliance
  - [ ] Color contrast ratios
  - [ ] Keyboard navigation
  - [ ] Screen reader testing
  - [ ] Alt text on images

- [ ] Performance Optimization
  - [ ] Lighthouse score ≥90 all pages
  - [ ] Core Web Vitals optimized
  - [ ] Image optimization
  - [ ] CSS/JS minification

- [ ] Security Review
  - [ ] SSL certificate valid
  - [ ] Security headers configured (CSP, X-Frame-Options)
  - [ ] HTTPS redirects working
  - [ ] No console errors/warnings

- [ ] Testing
  - [ ] All internal links working (404 audit)
  - [ ] All forms tested (contact, deletion)
  - [ ] Forms submit to Supabase correctly
  - [ ] Emails sending properly
  - [ ] Mobile app links work

- [ ] Deployment
  - [ ] Staging environment tested
  - [ ] DNS propagated (24-48 hrs before go-live)
  - [ ] Vercel production deployment approved
  - [ ] Rollback plan documented

- [ ] App Store Integration
  - [ ] Privacy Policy URL updated
  - [ ] Terms of Use URL updated
  - [ ] Support contact URL updated
  - [ ] Re-submit for review if needed

- [ ] Analytics Setup
  - [ ] PostHog configured
  - [ ] Event tracking active
  - [ ] Dashboard created

- [ ] Monitoring
  - [ ] Uptime monitoring active
  - [ ] Error tracking enabled (Sentry)
  - [ ] Performance monitoring active
  - [ ] Alerts configured

**Launch Checklist:**
- [ ] All pages live on staging
- [ ] All tests passing
- [ ] Performance audit complete
- [ ] Accessibility audit complete
- [ ] Security audit complete
- [ ] Legal review final
- [ ] Support team trained
- [ ] Monitoring configured
- [ ] Rollback procedure documented
- [ ] Go-live approval obtained

---

## 9. Deployment Architecture

### Development
```
Local Machine
└── npm run dev → http://localhost:3000
    ├── .env.local (local Supabase credentials)
    ├── Hot module reloading
    └── MDX content hot-reloads
```

### Staging
```
GitHub Branch: staging
↓
Vercel Preview Deployment
↓
URL: https://staging.soledip.3qinnova.com
├── Same Supabase project (staging tables)
├── Preview URL on every PR
└── Manual testing before production
```

### Production
```
GitHub Branch: main
↓
Vercel Production Deployment (with approval)
↓
URL: https://www.soledip.3qinnova.com
├── Production Supabase instance
├── Cloudflare CDN caching
├── SSL/TLS encryption
├── Analytics tracking enabled
└── Monitoring alerts active
```

### Rollback Strategy
```
If production issue detected:
1. Identify problematic commit
2. Revert to previous working commit
3. Push to main
4. Vercel auto-deploys previous version (2-3 min)
5. Notify team
6. Fix root cause in feature branch
7. Test and re-deploy
```

---

## 10. Team & Skill Requirements

### Recommended Team (3-4 People)

| Role | Skills | Allocation | Phase |
|------|--------|------------|-------|
| **Frontend Lead Dev** | Next.js, TypeScript, Tailwind, React | 3 weeks | All |
| **Backend Dev** | Node.js, Supabase, API design | 1.5 weeks | 0-2 |
| **Content Writer** | Legal/compliance writing, SEO | 2 weeks | 1-3 |
| **Legal Reviewer** | Terms of Use, CCPA, Privacy | 1 week | 1 |

### Required Skills

**Must-Have:**
- Frontend: React/Next.js (TypeScript)
- Backend: Node.js + Supabase (PostgreSQL)
- DevOps: Vercel, Cloudflare, DNS configuration
- Legal: Can use templates + review (doesn't need full legal team)
- Content: Technical writing + SEO basics

**Nice-to-Have:**
- Accessibility (WCAG testing)
- Performance optimization
- Analytics setup
- Security (OWASP principles)
- App Store submission experience

### Timeline by Person

**Frontend Developer:**
- Phase 0-4: Full-time (14 days)
- Tasks: Component library, pages, forms, deployment

**Backend Developer:**
- Phase 0: Full-time (2 days)
- Phase 1-2: Part-time (4 days)
- Tasks: API routes, Supabase integration, email notifications

**Content Writer:**
- Phase 1-3: Full-time (9 days)
- Tasks: Legal docs, support pages, company pages

**Legal Reviewer:**
- Phase 1: Part-time (3-5 days)
- Tasks: Terms of Use, Privacy review, compliance check

---

## 11. Critical Dependencies & Blockers

### Phase 1 (Launch) Blockers
1. **Terms of Use Legal Review** ⚠️ **CRITICAL**
   - Must complete by EOD Day 5
   - Cannot launch without legal approval
   - Risk: Delays App Store submission

2. **Privacy Policy Conversion** 
   - Content exists (80% done)
   - Just needs formatting & integration
   - Lower risk: Can be updated post-launch if needed

3. **Supabase Contact Tables**
   - Need `contact_submissions` table
   - Need `deletion_requests` table
   - Schema defined but may need migration

### Phase 2+ Blockers
1. **App Store URL Updates**
   - Once Phase 1 live, update App Store privacy/terms URLs
   - Allow 24-48 hours for review

2. **DNS Propagation**
   - 24-48 hours typically needed
   - Plan go-live with this in mind

3. **SSL Certificate Validation**
   - Cloudflare/Vercel handle automatically
   - Just ensure DNS is correct before launch

---

## 12. Success Criteria & Go-Live Checklist

### Performance Metrics
- [ ] Lighthouse scores ≥90 (all pages)
- [ ] Core Web Vitals: Good (all three)
- [ ] Page load time <2 seconds (p95)
- [ ] Uptime ≥99.9%

### Functional Testing
- [ ] All pages render correctly
- [ ] All forms submit successfully
- [ ] All internal links work (no 404s)
- [ ] All external links correct
- [ ] Mobile responsive (<320px to 4k)
- [ ] Dark/light mode toggle works
- [ ] Print-friendly styles work

### Compliance & Security
- [ ] WCAG 2.1 AA accessibility
- [ ] SSL/TLS certificate valid
- [ ] Security headers configured
- [ ] Privacy Policy compliant (EU legal review)
- [ ] Terms of Use legally reviewed
- [ ] GDPR compliance confirmed
- [ ] CCPA compliance confirmed

### Content & SEO
- [ ] All meta tags correct
- [ ] OG images configured
- [ ] Sitemap.xml valid
- [ ] robots.txt correct
- [ ] Canonical URLs correct
- [ ] Analytics tracking working

### Team Readiness
- [ ] Support team trained on new URLs
- [ ] Monitoring alerts configured
- [ ] Runbook/incident procedure ready
- [ ] Rollback procedure documented

---

## 13. Post-Launch Maintenance

### Weekly Tasks
- [ ] Monitor uptime & performance
- [ ] Review error logs (Sentry)
- [ ] Check contact form submissions

### Monthly Tasks
- [ ] Update FAQ based on support tickets
- [ ] Review analytics dashboard
- [ ] Check for broken links
- [ ] Update "last modified" dates
- [ ] Monitor compliance requirements

### Quarterly Tasks
- [ ] Legal audit (new regulations)
- [ ] Performance review (Core Web Vitals trends)
- [ ] Security audit
- [ ] Content refresh (retailer lists, updates)

### Annual Tasks
- [ ] Full accessibility audit
- [ ] Privacy policy review
- [ ] Terms of Use review
- [ ] Security penetration test
- [ ] Update compliance certifications

---

## 14. Repository & Branching Strategy

### Branch Structure
```
main (protected branch)
├── soledipWebsite (feature branch - in progress)
│   └── Merge to main on launch approval
├── staging (auto-deploys to staging.soledip.3qinnova.com)
│   └── Promoted from soledipWebsite after QA
└── [past releases - tagged with version numbers]
```

### Commit Convention
```
feat: Add privacy policy page
fix: Correct CCPA section links
docs: Update implementation plan
style: Format legal document
test: Add form validation tests
chore: Update dependencies
```

### Pull Request Process
1. Create PR from feature branch
2. Peer review (if applicable)
3. Merge to staging
4. QA on staging.soledip.3qinnova.com
5. Merge to main (production deploy)

---

## 15. Budget & Resource Estimate

### Development Effort
- **Frontend Development:** 40 hours
- **Backend/API Development:** 15 hours
- **DevOps/Deployment:** 10 hours
- **QA/Testing:** 20 hours
- **Total Dev:** ~85 hours

### Content Creation
- **Legal Content:** 40 hours
- **Support Content:** 20 hours
- **Marketing Content:** 8 hours
- **Total Content:** ~68 hours

### Project Management
- **Planning & Coordination:** 10 hours
- **Review & Approval:** 10 hours
- **Total PM:** ~20 hours

### **Grand Total: ~173 hours**

### Team Cost (assuming $100-150/hour avg)
- **Low Estimate:** $17,300 (173 hrs × $100)
- **High Estimate:** $25,950 (173 hrs × $150)
- **Realistic Range:** $20,000-25,000

### Timeline
- **Ideal (3-4 person team):** 14 days
- **Solo execution:** 35-40 days
- **Part-time (1 dev + 1 content writer):** 20-25 days

---

## 16. Immediate Next Steps (This Week)

### Day 1 Actions
- [ ] Review and approve implementation plan
- [ ] Assign frontend lead developer
- [ ] Schedule legal review meeting for Terms of Use
- [ ] Create Privacy Policy review checklist
- [ ] Initialize Next.js project in `/website` directory

### Day 2-3 Actions
- [ ] Setup Vercel deployment pipeline
- [ ] Configure Tailwind CSS & Radix UI
- [ ] Create base layout components (Header, Footer)
- [ ] Setup git hooks and CI/CD

### Day 4-5 Actions
- [ ] Begin Privacy Policy conversion (8 hrs)
- [ ] Start Terms of Use draft (legal review)
- [ ] Build contact form component
- [ ] Create account deletion instructions page

### Day 6+ Actions
- [ ] Coordinate with support team on FAQ
- [ ] Begin Phase 2 content creation
- [ ] Setup Supabase tables
- [ ] Test contact form submissions

---

## Conclusion

This implementation plan provides a clear roadmap to build SoleDip's website following industry standards and best practices. The phased approach ensures App Store requirements are met first (Priority 1), followed by regulatory compliance (Priority 2), then trust/company pages (Priority 3).

**Critical Success Factors:**
1. ✅ Terms of Use legal review (blocker for Phase 1)
2. ✅ Privacy Policy conversion (mostly done)
3. ✅ Team alignment on timeline
4. ✅ Supabase integration readiness
5. ✅ App Store coordinate for Phase 1 launch

**Recommendation:** Assemble team of 3-4 people, start with Phase 0 setup immediately, aim for Phase 1 (critical) launch by Day 5.

---

**Document Version:** 1.0  
**Date Created:** August 23, 2026  
**Next Review:** Upon Phase 1 completion  
**Owner:** [Your Team]
