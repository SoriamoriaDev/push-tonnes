# Push Tonnes — Market Research & Business Development Report

**Prepared:** March 2026  
**Version:** 1.0

---

## Table of Contents

1. [Product Analysis](#1-product-analysis)
2. [Market Overview](#2-market-overview)
3. [Competitor Analysis](#3-competitor-analysis)
4. [Target Audience](#4-target-audience)
5. [Differentiation Strategy](#5-differentiation-strategy)
6. [Monetization Options](#6-monetization-options)
7. [Go-to-Market Plan](#7-go-to-market-plan)
8. [Growth Strategy](#8-growth-strategy)
9. [Key Risks & Mitigation](#9-key-risks--mitigation)
10. [Recommended Roadmap](#10-recommended-roadmap)

---

## 1. Product Analysis

### What Push Tonnes Does

Push Tonnes is a web-based gym workout tracker built with Next.js 16, React 19, and Firebase. It measures training performance through **total tonnage** — the cumulative weight × reps moved per session. Users log exercises, sets, reps, and weights, then get an aggregate tonnage score for every workout.

### Core Features

| Feature | Description |
|---------|-------------|
| **Session Tracking** | Log exercises with sets, reps, weights. Auto-calculates volume per exercise and total session tonnage |
| **AI Workout Analysis** | Anthropic Claude-powered post-workout coaching: strengths, areas to improve, actionable recommendations |
| **Analytics Dashboard** | Recharts-powered charts showing tonnage over time, per-exercise progress, monthly trends |
| **Leaderboard** | 4 tabs: Monthly, All-Time, My Gym (geolocation-based, 1km radius), Weight Category |
| **Voice Input** | Web Speech API for hands-free exercise logging during workouts |
| **Exercise Catalog** | Personal exercise library categorized by muscle group (chest, back, shoulders, legs, arms, core) |
| **User Settings** | Age, weight, gender — used for weight category leaderboards |
| **Session History** | Full workout history with date, exercises, and tonnage |

### Unique Value Proposition

**"The only workout tracker that turns every rep into a measurable tonnage score, gives you AI coaching after every session, and lets you compete with people at your gym."**

Push Tonnes combines three things no single competitor currently does together:
1. **Tonnage as the primary metric** — not just sets/reps, but total weight moved
2. **AI-powered workout analysis** — real coaching feedback, not just charts
3. **Hyperlocal gym leaderboard** — compete with people training at the same location

### Strengths

- **Simple, focused concept:** Tonnage is an intuitive, motivating metric — "I moved 12 tonnes today"
- **AI coaching:** Real personalized feedback after each session, analyzing volume, intensity, exercise selection
- **Gym leaderboard:** Unique social/competitive feature that creates community without requiring friends
- **Voice input:** Solves a real gym UX problem — logging with sweaty hands
- **Modern tech stack:** Next.js 16, React 19, Tailwind — fast, responsive, maintainable
- **Progressive Web App potential:** Web-first means cross-platform from day one
- **Low operational cost:** Firebase scales pay-as-you-go, no server management
- **Weight categories:** Fair competition — a 65kg lifter isn't compared to a 100kg lifter

### Weaknesses

- **Web-only (no native app):** Users expect native iOS/Android apps for gym use; web apps have limitations (offline, notifications, widget support)
- **No offline mode:** Firebase requires connectivity; gyms often have poor signal
- **No workout templates/routines:** Users must log from scratch each session
- **No progressive overload tracking:** No automatic suggestions to increase weight
- **No rest timer:** A basic feature competitors all have
- **No exercise demonstration videos/images:** New users may not know proper form
- **No Apple Watch / WearOS support:** Wearable logging is increasingly expected
- **No social feed:** Leaderboard exists but no ability to follow, comment, or share workouts
- **Limited exercise data:** No 1RM calculator, no strength standards, no muscle group heatmap
- **Early stage:** No established user base, brand, or app store presence

---

## 2. Market Overview

### Market Size

The global fitness app market is substantial and growing rapidly:

| Metric | Value | Source |
|--------|-------|--------|
| **2025 Market Size** | $12.12 billion | Grand View Research |
| **2025 App Revenue** | $3.4 billion (+24.5% YoY) | Business of Apps |
| **2033 Projected Size** | $33.58 billion | Grand View Research |
| **CAGR (2026-2033)** | 13.4% | Grand View Research |
| **Active Users (2025)** | 540 million | Business of Apps |
| **Downloads (2025)** | 888 million | Business of Apps |

### Market Segments

- **Exercise & Weight Loss:** 53.69% of revenue (largest segment)
- **iOS:** 51.99% of revenue (iOS users spend more)
- **Smartphones:** 66.70% of device usage
- **North America:** 39.82% of global revenue (largest region)
- **Asia Pacific:** Fastest-growing region

### Key Industry Trends (2025-2026)

1. **AI-Powered Personalization:** Apps like Runna (raised €8M) use AI for personalized plans. AI coaching is no longer a differentiator — it's becoming table stakes.

2. **Wearable Integration:** Apple Watch, Garmin, WearOS — the fitness ecosystem increasingly centers on wrist-based tracking. Apps without wearable support lose ground.

3. **Social Fitness:** Strava proved that social features drive retention. Hevy's social feed (11M+ users) shows gym-goers want community too.

4. **Freemium Dominance:** Most successful apps (Hevy, Nike Training Club) offer generous free tiers. Conversion to paid happens through advanced analytics and features.

5. **Voice & Hands-Free:** Voice input and wearable-first logging reduce friction. Push Tonnes is ahead here with Web Speech API.

6. **Gamification:** Badges, streaks, challenges, leaderboards — retention mechanics are critical. Push Tonnes' leaderboard plays into this.

7. **Consolidation:** Hevy's rapid growth (11M+ users) is squeezing smaller trackers. Standing out requires a clear niche.

### Relevant Sub-Market: Strength Training Trackers

The strength/weight training tracker niche is a subset of the broader fitness app market. Key characteristics:
- Users are highly engaged (4-6 gym sessions/week)
- Willingness to pay is higher than casual fitness users
- Data matters — these users track everything
- Community and competition drive retention
- The niche is crowded but no single app dominates completely

---

## 3. Competitor Analysis

### Direct Competitors (Strength/Gym Workout Trackers)

#### 🏆 Hevy — The Category Leader

| Attribute | Detail |
|-----------|--------|
| **What it does** | Workout tracker with social feed, routine planner, exercise history |
| **Users** | 11+ million athletes |
| **Rating** | 4.9 App Store, 4.9 Google Play (395,000+ ratings) |
| **Pricing** | Free (generous); Hevy Pro ~$9.99/month or $69.99/year |
| **Platforms** | iOS, Android, Web, Apple Watch, WearOS |
| **Key Features** | Social feed (follow/like/comment), routine planner, exercise videos, rest timers, 1RM calculator, warmup/drop/failure sets, Apple Watch & WearOS |
| **Strengths** | Massive user base, best-in-class social features, cross-platform, strong brand, desktop web app |
| **Weaknesses** | Becoming bloated, AI features still limited, generic analytics, no tonnage-first approach, no geo-based gym competition |

**Threat Level: HIGH** — Hevy is the incumbent. Any gym tracker must contend with its network effects.

#### 💪 Strong

| Attribute | Detail |
|-----------|--------|
| **What it does** | Minimalist workout tracker focused on data and simplicity |
| **Users** | Estimated 3-5M+ (one of the oldest gym trackers) |
| **Rating** | ~4.8 App Store |
| **Pricing** | Free (limited to 3 routines); Strong Pro $4.99/month or $29.99/year; Lifetime $99.99 |
| **Platforms** | iOS, Android, Apple Watch |
| **Key Features** | Supersets, CSV export, Apple Health integration, RPE tracking, advanced charts, body measurements, Siri shortcuts, 3rd-party integrations |
| **Strengths** | Clean UI, fast logging, power-user features (RPE, CSV), good Apple ecosystem integration, lifetime purchase option |
| **Weaknesses** | Limited social features, no AI, dated design compared to Hevy, free tier is restrictive, no web app |

**Threat Level: MEDIUM** — Strong users are loyal but the app isn't innovating quickly.

#### 📊 JEFIT

| Attribute | Detail |
|-----------|--------|
| **What it does** | Workout planner and tracker with large exercise database |
| **Users** | 10M+ downloads (Google Play) |
| **Rating** | ~4.3 App Store |
| **Pricing** | Free with ads; Elite $12.99/month or $69.99/year |
| **Platforms** | iOS, Android, Web |
| **Key Features** | Huge exercise database with animations, workout plans, body stats tracking, social features, gym finder |
| **Strengths** | Massive exercise library, established brand, workout plan marketplace |
| **Weaknesses** | Cluttered UI, aggressive ads in free tier, feels dated, poor UX compared to Hevy/Strong |

**Threat Level: LOW-MEDIUM** — Large install base but losing mindshare to Hevy.

#### 🤖 Fitbod

| Attribute | Detail |
|-----------|--------|
| **What it does** | AI-generated workout plans based on recovery, muscle groups, equipment |
| **Users** | Estimated 2-3M+ |
| **Rating** | ~4.8 App Store |
| **Pricing** | Free trial (3 workouts); then $12.99/month or $79.99/year |
| **Platforms** | iOS, Android, Apple Watch |
| **Key Features** | AI workout generation, recovery tracking, muscle group heatmap, Apple Watch, exercise videos |
| **Strengths** | Best AI workout generation, smart programming, good for beginners who don't know what to do |
| **Weaknesses** | Expensive, no free tier, limited manual control, no social features, AI plans can feel generic |

**Threat Level: MEDIUM** — Different positioning (AI plans vs. tracking) but overlapping user base.

#### 📈 RepCount / GymBook / Other Indie Trackers

Dozens of smaller indie workout trackers exist. Most have <100K users, limited features, and struggle with retention. They validate the market but aren't significant competitive threats.

### Indirect Competitors

| App | Category | Users | Relevance to Push Tonnes |
|-----|----------|-------|--------------------------|
| **Strava** | Endurance tracking | 100M+ | Social fitness model to emulate; proves geo-based competition works |
| **MyFitnessPal** | Nutrition tracking | 200M+ | Users often pair with a workout tracker; potential integration |
| **Apple Fitness** | Ecosystem fitness | Largest market share | Platform default; hard to beat on integration |
| **Nike Training Club** | Guided workouts | 50M+ downloads | Free content; targets beginners |
| **Peloton** | Connected fitness | $1.6B subscription revenue | Premium segment; different audience |

### Competitive Landscape Summary

```
                    HIGH SOCIAL
                        │
               Hevy ●   │
                        │
    SIMPLE ─────────────┼─────────────── COMPLEX
                        │
         Strong ●       │      ● JEFIT
                        │
      Push Tonnes ●     │   ● Fitbod
        (target)        │
                        │
                   LOW SOCIAL
```

**The gap Push Tonnes can fill:** A focused, tonnage-first tracker with AI coaching and hyperlocal gym competition — more social than Strong, simpler than Hevy, smarter than JEFIT.

---

## 4. Target Audience

### Primary Demographics

| Attribute | Detail |
|-----------|--------|
| **Age** | 18-35 (core), 35-45 (secondary) |
| **Gender** | 65% male, 35% female (gym tracking skews male) |
| **Location** | Urban/suburban — gym access required |
| **Income** | Middle class+ ($30K-100K+) — gym membership implies disposable income |
| **Tech Savviness** | Moderate to high — comfortable with apps, data, analytics |
| **Fitness Level** | Intermediate to advanced — beginners don't track tonnage |

### Psychographics

- **Data-driven:** Love numbers, metrics, progress charts
- **Competitive:** Want to compare, rank, and outperform
- **Consistent:** Train 3-6x per week, care about progressive overload
- **Community-oriented:** Enjoy gym culture, follow fitness influencers
- **Results-focused:** Care about measurable progress, not just "showing up"

### User Personas

#### 🏋️ "Competitive Chris" (Primary)
- **Age:** 24, Male
- **Profile:** Trains 5x/week, loves powerlifting and strength training
- **Motivation:** Wants to see tonnage go up every week; loves competing with gym buddies
- **Current tools:** Hevy (free tier) + notes app for tonnage calculations
- **Pain points:** No app makes tonnage THE metric; leaderboards don't account for his gym or weight class
- **Why Push Tonnes:** Tonnage-first tracking, gym leaderboard, weight categories

#### 📊 "Analytics Anna" (Secondary)
- **Age:** 29, Female
- **Profile:** Trains 4x/week, methodical about programming
- **Motivation:** Wants AI feedback on volume, exercise selection, and recovery
- **Current tools:** Strong Pro + manual spreadsheet analysis
- **Pain points:** No app gives her intelligent coaching after sessions; existing analytics are just charts without insights
- **Why Push Tonnes:** AI analysis that actually tells her what to improve

#### 🏆 "Gym Bro Greg" (Tertiary)
- **Age:** 21, Male
- **Profile:** Trains 6x/week, very social at the gym
- **Motivation:** Wants to prove he's the strongest at his gym
- **Current tools:** Just memory and ego
- **Pain points:** No way to formally compete with people at his gym
- **Why Push Tonnes:** The "My Gym" leaderboard is exactly what he wants

---

## 5. Differentiation Strategy

### Core Positioning

> **"Push Tonnes is the workout tracker for lifters who want to move more weight, get AI coaching, and compete at their gym."**

### Three Pillars of Differentiation

#### 1. Tonnage-First Philosophy 🎯

No other app makes total tonnage the primary metric. While competitors track sets/reps/weight, Push Tonnes elevates the aggregate — "You moved 14.2 tonnes today." This is:
- **Simple** — one number captures workout intensity
- **Motivating** — always trying to beat your previous tonnage
- **Comparable** — tonnage normalizes across different exercises

**Marketing angle:** "Forget counting sets. Count tonnes."

#### 2. AI Coaching, Not Just Charts 🤖

Fitbod uses AI to *generate* workouts. Push Tonnes uses AI to *analyze* your actual workout and give coaching feedback. This is more valuable for experienced lifters who program their own training but want expert analysis.

**Marketing angle:** "Your AI coach reviews every session."

#### 3. Hyperlocal Gym Competition 📍

Strava has segments. Push Tonnes has gyms. The geolocation-based leaderboard (within 1km) creates instant community without needing to add friends. Combined with weight categories, it's the fairest competitive system in any gym tracker.

**Marketing angle:** "Who's the strongest at your gym? Now you'll know."

### Positioning Matrix

| vs. Hevy | Push Tonnes wins on... |
|----------|----------------------|
| Tonnage focus | Hevy tracks volume but doesn't make it THE metric |
| AI coaching | Hevy has no AI analysis |
| Gym leaderboard | Hevy's social requires following specific people |

| vs. Strong | Push Tonnes wins on... |
|-----------|----------------------|
| AI coaching | Strong has zero AI |
| Social/competitive | Strong is purely solo |
| Web accessibility | Strong has no web app |

| vs. Fitbod | Push Tonnes wins on... |
|-----------|----------------------|
| Freedom | Fitbod prescribes; Push Tonnes tracks what YOU do |
| Social | Fitbod has no competition features |
| Price | Fitbod charges $13/month with no free tier |

---

## 6. Monetization Options

### Recommended Model: Freemium with Pro Subscription

#### Free Tier (Generous — maximize adoption)
- Unlimited session logging
- Basic tonnage tracking and history
- Monthly leaderboard
- Exercise catalog
- Voice input
- 3 AI analyses per month

#### Pro Tier — $5.99/month or $49.99/year
- **Unlimited AI coaching** (the key conversion driver)
- **Advanced analytics** (per-exercise trends, tonnage heatmaps, weekly/monthly breakdowns, muscle group balance)
- **All leaderboards** (Gym, Weight Category, All-Time)
- **Export data** (CSV, PDF reports)
- **Progressive overload suggestions** (AI recommends weight increases)
- **Custom exercise categories**
- **Priority support**

#### Lifetime Option — $149.99
- Appeals to power users who hate subscriptions
- One-time revenue, but builds loyalty and word-of-mouth
- Strong offers this at $99.99 — $149.99 is justified by AI features

### Why This Model Works

1. **Low barrier to entry:** Free tier is genuinely useful → drives adoption
2. **Clear upgrade path:** AI coaching is addictive → users want more after 3 free analyses
3. **Competitive pricing:** Undercuts Hevy Pro ($9.99/mo) and Fitbod ($12.99/mo)
4. **Annual discount:** 30% off encourages commitment and reduces churn

### Revenue Projections (Conservative)

| Metric | Month 6 | Month 12 | Month 24 |
|--------|---------|----------|----------|
| **Total Users** | 2,000 | 10,000 | 50,000 |
| **Conversion Rate** | 3% | 5% | 7% |
| **Paying Users** | 60 | 500 | 3,500 |
| **MRR** | $360 | $3,000 | $21,000 |
| **ARR** | $4,320 | $36,000 | $252,000 |

*Assumes blended monthly revenue of $6/paying user, improving conversion as features mature.*

---

## 7. Go-to-Market Plan — First 1,000 Users

### Phase 1: Pre-Launch (Weeks 1-4)

#### Build the Landing Page
- Domain: pushtonnes.com (or pushtonnes.app)
- Clear value prop, demo video, email waitlist
- "Join the beta" CTA
- Feature comparison table vs. competitors

#### Content Seeding
- Create 3-5 Reddit posts in r/fitness, r/weightroom, r/powerlifting about "tonnage tracking"
- Write a blog post: "Why Total Tonnage is the Best Metric for Strength Progress"
- Post in fitness Discord servers and Facebook groups

#### Social Media Setup
- Instagram: @pushtonnes — workout stats screenshots, tonnage records
- TikTok: Short clips showing the app in action at the gym
- Twitter/X: Fitness tech discussion, engage with lifting community

### Phase 2: Closed Beta (Weeks 5-8)

#### Recruit 50-100 Beta Testers
- Target: Fitness influencers (micro, 1K-50K followers) on Instagram/TikTok
- Offer: Free lifetime Pro access in exchange for honest feedback + 1 social post
- Source from: Reddit fitness communities, university gym clubs, CrossFit boxes

#### Beta Feedback Loop
- In-app feedback widget
- Weekly survey (3 questions max)
- Discord community for beta testers
- Iterate rapidly on top feedback themes

### Phase 3: Public Launch (Weeks 9-12)

#### Launch Channels
1. **Product Hunt launch** — aim for top 5 of the day
2. **Reddit launch posts** — r/fitness, r/gym, r/bodybuilding, r/weightlifting (follow community rules, don't spam)
3. **Hacker News** — "Show HN: Push Tonnes" (the tech crowd lifts too)
4. **Instagram/TikTok:** Beta testers post their "I moved X tonnes this week" stories

#### Gym Ambassador Program
- Recruit 20 ambassadors at different gyms across 5-10 cities
- Each ambassador gets: free Pro, referral link (1 month free Pro per signup), branded stickers
- Goal: Seed the leaderboard at enough gyms to create network effects

#### PR / Press
- Pitch to fitness tech blogs: Wired Fitness, T3, Coach Mag, BarBend
- Angle: "The app that turns your gym into a competition"
- Provide exclusive access for review

### Launch Target: 1,000 users in 12 weeks

| Channel | Expected Users | Cost |
|---------|---------------|------|
| Reddit/Forums | 200-300 | $0 (organic) |
| Product Hunt | 150-250 | $0 (organic) |
| Beta tester referrals | 100-200 | Free Pro accounts |
| Instagram/TikTok | 100-150 | $0-500 (boosted posts) |
| Gym ambassadors | 100-150 | $0 (free Pro + stickers ~$200) |
| PR/Press | 50-100 | $0 (organic outreach) |
| **Total** | **700-1,150** | **$200-700** |

---

## 8. Growth Strategy — 1K to 100K Users

### Viral Mechanics (Built into the Product)

1. **Shareable Tonnage Cards:** After each session, generate a branded card: "I pushed 15.4 tonnes today 💪" — optimized for Instagram Stories, easy share button
2. **Gym Leaderboard Challenges:** Monthly gym challenges ("Most tonnes in March") — participants share to recruit gym mates
3. **Referral Program:** "Invite a friend → both get 1 week Pro free." Simple, effective.
4. **Weight Category Challenges:** Cross-gym national/global challenges by weight class

### Content Marketing (Months 3-12)

- **SEO blog:** Target keywords like "workout tonnage tracker," "gym volume tracking app," "progressive overload app"
- **YouTube:** "What I Learned Tracking My Tonnage for 30 Days" — partner with fitness YouTubers (10K-500K subs)
- **TikTok/Reels:** Quick clips showing tonnage cards, leaderboard rivalries, AI analysis reactions
- **Newsletter:** Weekly "Tonnage Report" — training tips, user spotlights, feature updates

### Community Building

- **Discord server:** Active community of lifters sharing tips, challenging each other
- **Gym partnerships:** Partner with independent gyms to have Push Tonnes as their "official tracker"
- **University programs:** Target university gym clubs and athletic programs — students are viral distributors
- **Fitness events:** Sponsor local powerlifting meets, CrossFit comps — booth presence with QR codes

### Paid Acquisition (After Product-Market Fit, ~Month 6+)

- **Instagram/Facebook Ads:** Target gym-goers 18-35, interest in weightlifting, follow fitness accounts
- **Budget:** Start at $500-1,000/month, optimize for install → first session completion
- **Expected CPA:** $1.50-3.00 per acquired user (fitness app benchmarks)
- **Google Ads:** Target "workout tracker app," "gym log app," "tonnage calculator"

### Growth Milestones

| Users | Timeline | Key Driver |
|-------|----------|------------|
| 1,000 | Month 3 | Organic launch, beta testers, Reddit |
| 5,000 | Month 6 | Content marketing, referral program, ambassadors |
| 15,000 | Month 9 | Paid ads begin, influencer partnerships, viral tonnage cards |
| 50,000 | Month 15 | Native app launch (iOS), gym partnerships scale |
| 100,000 | Month 18-24 | Network effects, brand recognition, international expansion |

---

## 9. Key Risks & Mitigation

### 1. Hevy's Dominance
**Risk:** Hevy (11M+ users) adds tonnage tracking and AI features, making Push Tonnes redundant.  
**Mitigation:** Move fast. Hevy is a generalist — Push Tonnes wins by being the specialist. Build deep tonnage features Hevy won't prioritize. Cultivate a die-hard niche community before Hevy notices.  
**Severity:** HIGH

### 2. Web-Only Limitations
**Risk:** Users expect native apps. Web apps can't do push notifications, offline mode, or widgets reliably. App Store/Play Store discovery is lost.  
**Mitigation:** Prioritize PWA features (install prompt, service worker for basic offline). Plan native iOS app by Month 6-9. Use Capacitor or React Native to wrap existing web code.  
**Severity:** HIGH

### 3. AI API Costs
**Risk:** Anthropic Claude API costs scale linearly with users. At 50K users with 3 free analyses/month = 150K API calls/month.  
**Mitigation:** Cache common feedback patterns. Use Claude Haiku for free tier (cheaper). Rate limit aggressively. AI is the Pro conversion lever — costs should be offset by subscriptions.  
**Severity:** MEDIUM

### 4. Low Gym Density Problem
**Risk:** The gym leaderboard only works if multiple Push Tonnes users train at the same gym. With few users, leaderboards are empty → feature feels broken.  
**Mitigation:** Focus launch on 5-10 target gyms per city. Seed with ambassadors. Allow users to see "nearby" leaderboard (2-5km) if <5 users at their exact gym. Show global leaderboard as fallback.  
**Severity:** MEDIUM-HIGH

### 5. User Retention
**Risk:** Workout trackers have notoriously high churn — 75%+ within 30 days.  
**Mitigation:** AI coaching creates a "review loop" that brings users back. Leaderboard competition drives daily engagement. Implement streaks, weekly tonnage goals, and push notifications (once native).  
**Severity:** MEDIUM

### 6. Technical Scalability
**Risk:** Firebase Firestore costs and read/write limits at scale.  
**Mitigation:** Optimize queries, use Firestore caching, implement pagination. Firebase scales well for this use case. Consider migrating hot paths to a cheaper backend at 100K+ users.  
**Severity:** LOW

### 7. Privacy & Location Data
**Risk:** Geo-location for gym leaderboard raises privacy concerns (GDPR, user trust).  
**Mitigation:** Already handling opt-in ("Visible" toggle on leaderboard). Ensure location is only used for proximity matching, never stored long-term or shared with third parties. Add clear privacy policy. Consider hashing/rounding coordinates.  
**Severity:** LOW-MEDIUM

---

## 10. Recommended Roadmap — Next 6-12 Months

### Month 1-2: Foundation & Pre-Launch ⚡

**Product:**
- [ ] Add rest timer between sets
- [ ] Add workout templates/routines (save & reuse)
- [ ] Implement PWA install prompt + basic offline support (service worker for cached sessions)
- [ ] Add shareable tonnage card generation (post-session image for social sharing)
- [ ] Implement referral system (invite link → tracked signups)
- [ ] Add streak tracking (consecutive days/weeks with sessions)

**Marketing:**
- [ ] Register domain, set up landing page with waitlist
- [ ] Create social media profiles (Instagram, TikTok, Twitter/X)
- [ ] Write 3 SEO blog posts (tonnage training, volume tracking, progressive overload)
- [ ] Begin Reddit/community engagement (authentic, not spammy)

### Month 3-4: Beta & Soft Launch 🚀

**Product:**
- [ ] Launch closed beta with 50-100 testers
- [ ] Add 1RM calculator and strength standards comparison
- [ ] Implement exercise demonstration images/GIFs
- [ ] Add progressive overload suggestions (AI-powered)
- [ ] Implement data export (CSV)
- [ ] Optimize mobile UX — swipe gestures, larger touch targets

**Marketing:**
- [ ] Product Hunt launch
- [ ] Reddit launch posts
- [ ] Recruit 20 gym ambassadors
- [ ] Begin micro-influencer outreach (10-20 fitness creators)
- [ ] Launch Discord community

**Target:** 500-1,000 users

### Month 5-6: Growth & Monetization 💰

**Product:**
- [ ] Launch Pro subscription (Stripe integration)
- [ ] Unlimited AI analyses for Pro
- [ ] Advanced analytics dashboard (Pro feature)
- [ ] Gym leaderboard challenges (monthly events)
- [ ] API for third-party integrations (Apple Health, Google Fit)

**Marketing:**
- [ ] Begin paid ads ($500-1,000/month)
- [ ] Weekly newsletter launch
- [ ] YouTube influencer partnerships (2-3 creators)
- [ ] Gym partnership pilot (5 independent gyms)

**Target:** 3,000-5,000 users, first paying customers

### Month 7-9: Native App & Scale 📱

**Product:**
- [ ] **iOS app launch** (Capacitor wrapper or React Native rebuild)
- [ ] Push notifications (workout reminders, leaderboard updates, AI insights)
- [ ] Apple Watch basic support (log sets from wrist)
- [ ] Offline mode (sync when back online)
- [ ] Social features: follow users, like sessions, workout comments
- [ ] Muscle group heatmap visualization

**Marketing:**
- [ ] App Store Optimization (ASO) — keywords, screenshots, description
- [ ] Scale paid ads to $2,000-3,000/month
- [ ] PR push around iOS launch
- [ ] University gym club partnerships
- [ ] Scale ambassador program to 50+ gyms

**Target:** 10,000-20,000 users, $2,000-3,000 MRR

### Month 10-12: Retention & Expansion 🌍

**Product:**
- [ ] Android app launch
- [ ] AI workout plan suggestions (based on history and goals)
- [ ] Gym challenges with prizes (branded merch, free Pro months)
- [ ] Body weight tracking with progress photos
- [ ] Workout sharing / social feed
- [ ] Localization (French, Spanish, German — start with markets where you have traction)

**Marketing:**
- [ ] International expansion focus (start with France — Max's home market via Suksee)
- [ ] Content marketing at scale (2-3 blog posts/week, daily social)
- [ ] Affiliate program for fitness bloggers/YouTubers
- [ ] Consider seed funding pitch if metrics justify

**Target:** 30,000-50,000 users, $8,000-15,000 MRR

---

## Summary & Key Takeaways

### The Opportunity Is Real
The fitness app market is $12B+ and growing 13%+ annually. Strength training trackers are a proven sub-category (Hevy's 11M+ users proves the demand). But no app has nailed tonnage-first tracking + AI coaching + hyperlocal competition.

### The Window Is Now
AI in fitness apps is early. Building deep AI coaching now — while competitors bolt on shallow features — creates a moat. The gym leaderboard is a unique social mechanic that gets stronger with network effects.

### Critical Success Factors
1. **Ship the native iOS app by Month 7-9** — web-only is a ceiling
2. **Nail the AI coaching quality** — this is the conversion lever and the moat
3. **Seed gym leaderboards aggressively** — empty leaderboards kill the feature
4. **Keep the core simple** — tonnage is the metric, don't dilute it
5. **Build community first, charge later** — generous free tier → loyal users → sustainable subscriptions

### Bottom Line
Push Tonnes has a clear, differentiated position in a crowded market. The tonnage-first approach is novel, the AI coaching is genuinely useful, and the gym leaderboard solves a real social need. The biggest risks are web-only limitations and the cold-start problem for gym leaderboards. Address those in the first 6 months and this has legitimate potential to capture a meaningful niche in the strength training tracker space.

---

*Report prepared by Push Tonnes Business Development & Marketing Agent. Data sourced from Grand View Research, Business of Apps, competitor websites, and product analysis as of March 2026.*
