# Push Tonnes — 12-Week Launch Plan

**Prepared:** March 2026
**Version:** 1.0
**Week 1 Start:** Whenever Max greenlights — all dates are relative to "Week 1, Day 1"

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Phase 1: Pre-Launch (Weeks 1–4)](#phase-1-pre-launch-weeks-14)
3. [Phase 2: Closed Beta (Weeks 5–8)](#phase-2-closed-beta-weeks-58)
4. [Phase 3: Public Launch (Weeks 9–12)](#phase-3-public-launch-weeks-912)
5. [Landing Page Copy](#landing-page-copy)
6. [Social Media Content Pack](#social-media-content-pack)
7. [Email Sequences](#email-sequences)
8. [Influencer Outreach Templates](#influencer-outreach-templates)
9. [Paid Ads Budget Breakdown](#paid-ads-budget-breakdown)
10. [KPIs & Metrics Dashboard](#kpis--metrics-dashboard)
11. [Target Market Strategy](#target-market-strategy)

---

## Executive Summary

**Goal:** 1,000 users in 12 weeks on ≤$500 paid spend.

**Strategy:** Build hype through authentic community engagement (Reddit, gym culture), recruit 50–100 beta testers with lifetime Pro, seed 20+ gym leaderboards via ambassadors, then launch publicly on Product Hunt + Reddit + social simultaneously.

**Solo founder reality check:** Max has ~10–15 hours/week for marketing alongside product development. This plan prioritizes high-leverage, low-effort activities. Batching is key — dedicate 2 focused sessions per week to marketing, not scattered daily tasks.

---

## Phase 1: Pre-Launch (Weeks 1–4)

### Week 1: Foundation

#### Day 1–2: Domain & Landing Page
- **Register domain:** pushtonnes.app (clean, modern — .app signals tech credibility; .com likely taken)
- **Build landing page** using the existing Next.js stack (or a quick Framer/Carrd page if speed matters more):
  - Above-the-fold hero with headline, subheadline, and email capture
  - 3 feature sections with mockup screenshots
  - Social proof placeholder ("Join 0 lifters" → update dynamically)
  - FAQ section (3–4 questions)
  - Footer with social links
- **Email capture:** Use Buttondown (free up to 100 subs) or Loops.so (free up to 1,000 — better for sequences)
- **Analytics:** Plausible Analytics (privacy-friendly, €9/mo) or free Umami self-hosted on Vercel

#### Day 3–4: Social Media Setup
Create accounts — all with handle **@pushtonnes**, consistent bio and profile image.

| Platform | Handle | Bio | Priority |
|----------|--------|-----|----------|
| **Instagram** | @pushtonnes | "Track your tonnage. Get AI coaching. Dominate your gym. 🏋️ Coming soon → link in bio" | HIGH |
| **TikTok** | @pushtonnes | Same as above | HIGH |
| **Twitter/X** | @pushtonnes | "Building the workout tracker for lifters who count in tonnes, not sets. AI coaching + gym leaderboards. Founder: @maxhandle" | MEDIUM |
| **Reddit** | u/pushtonnes_app | Don't use a branded account for posts — use Max's personal Reddit account. Branded account for replies only. | HIGH |
| **Discord** | Push Tonnes server | Create server with channels: #general, #feature-requests, #bug-reports, #leaderboard-brags, #introductions | MEDIUM (set up now, activate Week 5) |

**Profile image:** A bold, minimal logo — a barbell plate silhouette with "PT" or a stylized tonnage counter. Use Midjourney or commission on Fiverr ($20–50).

#### Day 5–7: Content Bank Creation
Batch-create the first 2 weeks of content (see [Social Media Content Pack](#social-media-content-pack) below). Use Canva (free) for static posts. Record 2–3 raw TikTok clips in the gym showing the app in use.

---

### Week 2: Content Seeding & Community Infiltration

#### Reddit Strategy (CRITICAL — this is the #1 organic channel)

**Rules of engagement:**
- Use Max's personal Reddit account, NOT a branded one
- Be a community member first, promoter never
- Contribute genuinely for at least 5–7 days before any mention of Push Tonnes
- When mentioning the app, frame it as "I'm building something" not "check out my product"

**Target Subreddits:**

| Subreddit | Members | Vibe | Strategy |
|-----------|---------|------|----------|
| r/fitness | 11M+ | General fitness, beginner-friendly | Volume/tonnage discussion posts |
| r/weightroom | 300K+ | Serious lifters, evidence-based | Training volume analysis posts |
| r/powerlifting | 400K+ | Competitive, metric-obsessed | Tonnage as a training metric |
| r/bodybuilding | 1.5M+ | Physique-focused, volume matters | Volume tracking for hypertrophy |
| r/GymMotivation | 200K+ | Casual, motivational | Shareable tonnage achievements |
| r/StartupIdeas | 100K+ | Founders, validation | "I'm building this — thoughts?" |
| r/SideProject | 80K+ | Builders, tech-savvy | Progress updates |
| r/naturalbodybuilding | 200K+ | Evidence-based training | Volume periodization discussions |

#### 5 Specific Reddit Posts to Write

**Post 1 — Week 2, Day 1**
- **Subreddit:** r/weightroom
- **Title:** "Has anyone else started tracking total tonnage (weight × reps × sets) instead of just PR numbers? Changed how I program."
- **Angle:** Share a genuine experience of tracking tonnage for 4 weeks. Include a simple spreadsheet screenshot. No app mention. Pure value. Build karma and engagement. Replies mention you're building something to make this easier → only if asked.
- **Goal:** Establish credibility + plant the "tonnage tracking" concept

**Post 2 — Week 2, Day 3**
- **Subreddit:** r/fitness
- **Title:** "I tracked my total training volume in tonnes for 3 months. Here's what the data told me about my progress."
- **Angle:** Data-driven post with charts/graphs (make them in the app, screenshot). Share insights: "I was doing way more push volume than pull," "My leg days averaged 8 tonnes vs 5 for upper body." End with: "I actually started building a simple tracker for this — happy to share if anyone's interested."
- **Goal:** Soft launch of the concept to the biggest audience

**Post 3 — Week 3, Day 1**
- **Subreddit:** r/powerlifting
- **Title:** "Volume tracking in tonnes: a better way to quantify training load than counting sets?"
- **Angle:** More technical post. Reference actual training science (Schoenfeld's volume research, Mike Israetel's volume landmarks). Discuss how tonnage captures both intensity and volume in one number. Mention you're building a free tool for this.
- **Goal:** Reach the most metric-obsessed audience

**Post 4 — Week 3, Day 5**
- **Subreddit:** r/SideProject
- **Title:** "I'm building a gym workout tracker focused on total tonnage and AI coaching — 4 weeks in, here's what I've learned"
- **Angle:** Builder diary. Share tech stack (Next.js, Firebase, Claude API). Show screenshots. Talk about the gym leaderboard concept. Ask for beta testers.
- **Goal:** Recruit technically-savvy beta testers + build in public credibility

**Post 5 — Week 4, Day 2**
- **Subreddit:** r/bodybuilding
- **Title:** "I built a free tool that calculates your session tonnage and gives you AI coaching feedback — looking for beta testers"
- **Angle:** Direct beta recruitment. Show the AI coaching output (screenshot a real analysis). Offer free lifetime Pro to the first 50 signups via the landing page link.
- **Goal:** Convert interest into waitlist signups

---

### Week 3: Blog Content & SEO Foundation

#### Blog Setup
- Add a `/blog` route to the Next.js app (use MDX or a headless CMS like Hashnode/Ghost)
- Or start on Hashnode (free, good SEO, custom domain support)

#### 5 SEO-Focused Blog Post Ideas

| # | Title | Target Keyword | Word Count | Priority |
|---|-------|---------------|------------|----------|
| 1 | "What Is Training Tonnage? The One Metric Every Lifter Should Track" | training tonnage, workout tonnage | 1,500 | Week 3 — publish first |
| 2 | "Tonnage vs. Volume: Why Total Weight Moved Matters More Than Set Counts" | tonnage vs volume, training volume | 1,800 | Week 4 |
| 3 | "How to Calculate Your Gym Tonnage (And Why It Predicts Progress Better Than PRs)" | calculate gym tonnage, tonnage calculator | 1,200 | Week 5 |
| 4 | "AI Coaching for Weightlifting: How Artificial Intelligence Can Analyze Your Workouts" | AI coaching weightlifting, AI workout analysis | 2,000 | Week 6 |
| 5 | "The Best Workout Tracker Apps for Serious Lifters in 2026 (Honest Comparison)" | best workout tracker app 2026, gym tracker app | 2,500 | Week 7 |

**SEO tip:** Blog post #5 is a comparison article where Push Tonnes is positioned honestly among competitors. These rank well and convert because the searcher is already in buying mode.

---

### Week 4: Beta Recruitment Push

#### Email Waitlist Strategy

**Target:** 200–500 email signups by end of Week 4.

**Tactics:**
1. Landing page CTA: "Get early access + lifetime Pro (free forever)" — urgency + value
2. Reddit posts (Posts 4 & 5 above) drive traffic to landing page
3. Cross-post landing page link on Twitter/X with a thread about building the app
4. Instagram Story countdown: "Beta opens in 2 weeks"

**Waitlist incentive tiers:**
- First 50 signups → **Lifetime Pro (free forever)** + "Founding Member" badge
- Signups 51–200 → **6 months Pro free** + "Early Adopter" badge
- Signups 201+ → **1 month Pro free**

**Referral boost:** Use Loops.so or Viral Loops to add "Move up the waitlist — share with friends" mechanic. Each referral bumps you up 5 spots. Top referrer gets a "Push Tonnes" branded gym stringer (cost: ~$15).

#### Beta Tester Recruitment Sources

| Source | How | Target # |
|--------|-----|----------|
| Reddit posts (above) | Direct from posts 4 & 5 | 30–50 |
| Instagram DMs to small fitness accounts | Personal outreach (see templates below) | 10–20 |
| University gym clubs (Facebook groups, notice boards) | Post in 5–10 university fitness society groups | 10–20 |
| Fitness Discord servers (Lifting Vault, Barbell Medicine community, Jeff Nippard's) | Be a member first, then mention beta | 10–15 |
| Twitter/X build-in-public audience | Thread about the build process | 5–10 |
| **Total target** | | **65–115** |

---

## Phase 2: Closed Beta (Weeks 5–8)

### Week 5: Beta Launch & Onboarding

#### Beta Tester Onboarding Process

**Day 1 of beta:**
1. Send email to all waitlist signups in the beta cohort (use tiers above)
2. Email includes: direct link to app, quick-start guide (PDF or Notion doc), Discord invite
3. Quick-start guide covers:
   - How to create account (30 seconds)
   - How to log your first session (2 minutes)
   - How to check your tonnage score
   - How to see the leaderboard
   - How to trigger AI coaching analysis

**Onboarding email subject line:** "You're in. Here's your Push Tonnes beta access 🏋️"

**In-app onboarding:**
- 3-screen tutorial overlay on first login (skip-able):
  1. "Log your exercises, sets, reps, and weight"
  2. "See your total tonnage — aim to beat it next session"
  3. "Check the leaderboard — who's pushing the most at your gym?"

#### Discord Community Activation
- Pin a welcome message with rules and how-to
- Create a #daily-tonnage channel where testers post their session tonnage
- Max personally welcomes each beta tester by name (takes 2 min/person, builds insane loyalty)
- Weekly "Tonnage King/Queen" shoutout for highest weekly total

---

### Week 6: Feedback Collection & Iteration

#### Feedback System

**In-app:** Add a persistent "Feedback" button (bottom-right corner) → opens a simple form:
- "What do you love?" (text)
- "What's frustrating?" (text)
- "Rate your experience" (1–5 stars)

**Weekly micro-survey** (via email or Discord poll — 3 questions max):
- Week 6: "What feature would make you use Push Tonnes every session?"
- Week 7: "Would you recommend Push Tonnes to a gym buddy? Why/why not?"
- Week 8: "If Push Tonnes cost $5.99/month, would you pay? What would you need to see first?"

**Bug tracking:** GitHub Issues (if public repo) or a #bug-reports Discord channel with a simple template.

#### Iteration Priorities Based on Market Research Weaknesses

From the market research, these are the critical gaps to address during beta:

| Priority | Feature Gap | Why It Matters | Effort | Beta Sprint |
|----------|------------|----------------|--------|-------------|
| **P0** | Workout templates/routines | Users log the same workout repeatedly — re-entering from scratch is a dealbreaker | Medium | Week 5–6 |
| **P0** | Rest timer | Every competitor has this; missing it signals "unfinished product" | Low | Week 5 |
| **P1** | Basic offline support (PWA service worker) | Gyms have bad signal; losing a session mid-workout = rage quit | Medium | Week 6–7 |
| **P1** | Shareable tonnage card (image) | The #1 viral mechanic — post-session share to Instagram Stories | Medium | Week 6 |
| **P2** | Progressive overload suggestions | AI tells you when to increase weight — strong Pro conversion lever | Medium | Week 7–8 |
| **P2** | 1RM calculator | Expected feature; builds credibility | Low | Week 7 |

---

### Week 7: Gym Ambassador Program

#### Ambassador Recruitment

**Who to recruit:**
- Regulars at their gym (go 4+ times/week)
- Active on social media (even just Instagram Stories — doesn't need big following)
- Enthusiastic about tracking and numbers
- Ideally at different gyms in different cities to seed leaderboards broadly

**How to recruit:**
1. Ask beta testers: "Know anyone at a different gym who'd love this?"
2. DM gym-goers on Instagram who post workout content (see template below)
3. Post in university fitness society groups
4. Approach people in fitness Discords

**Target:** 20 ambassadors across 15+ different gyms in 5+ cities (focus on US, UK, Australia)

#### Ambassador Program Details

| Element | Detail |
|---------|--------|
| **Title** | Push Tonnes Founding Ambassador |
| **What they get** | Lifetime Pro (free forever), exclusive "Ambassador" badge in-app, branded stickers (shipped free), personal referral link, direct line to Max on Discord |
| **What they do** | Use the app consistently (3+ sessions/week), post 2 Instagram Stories per month showing their tonnage, recruit 3+ gym mates to join, provide monthly feedback (5-min survey) |
| **Commitment** | 3-month initial term, then ongoing if both parties happy |
| **Cost to Max** | Stickers: ~$100 for 200 stickers via StickerMule. Free Pro: $0 marginal cost. Total: ~$100–150 |

#### Sticker Design
- 3" circular vinyl sticker
- "I PUSH TONNES 🏋️" or "ASK ME ABOUT MY TONNAGE"
- QR code on back linking to pushtonnes.app
- Waterproof (gym bags, water bottles, laptops)

---

### Week 8: Social Proof & Content Ramp-Up

#### Content Schedule During Beta

| Day | Platform | Content Type | Example |
|-----|----------|-------------|---------|
| Mon | Instagram | Tonnage stat graphic | "Our beta testers pushed a combined 847 tonnes last week" |
| Tue | TikTok | App walkthrough clip | 30-sec screen recording: log workout → see tonnage → AI analysis |
| Wed | Twitter/X | Build-in-public update | "Week 8 of building Push Tonnes. 87 beta testers. 2,400 sessions logged. Most requested feature: [X]" |
| Thu | Instagram Stories | Beta tester spotlight | Repost a tester's tonnage card with their permission |
| Fri | Reddit | Engage in fitness subs | Reply to relevant threads, never spam |
| Sat | TikTok | "POV: you just hit a tonnage PR" | Fun, relatable gym content with the app visible |
| Sun | Rest | — | — |

**Key principle:** During beta, 70% of content should be social proof (real users, real numbers, real feedback). 30% can be feature highlights and education.

#### Testimonial Collection
- Ask top beta testers for a 1–2 sentence quote + permission to use their first name
- Screenshot compelling Discord messages (with permission)
- Record 15–30 second video testimonials from 3–5 willing testers (phone selfie is fine)
- **Target:** 10 written testimonials, 3 video testimonials by end of Week 8

---

## Phase 3: Public Launch (Weeks 9–12)

### Week 9: Pre-Launch Hype

#### Product Hunt Preparation (Launch Day = Week 10, Tuesday)

**Why Tuesday:** Product Hunt launches perform best Tuesday–Thursday. Tuesday gives you the full week for momentum.

**Pre-launch checklist (Week 9):**
- [ ] Create Product Hunt maker profile (if not already)
- [ ] Draft the listing:
  - **Tagline:** "Track your gym tonnage, get AI coaching, compete at your gym"
  - **Description:** (see below)
  - **Images:** 4–5 polished screenshots (hero, tonnage dashboard, AI analysis, leaderboard, voice input)
  - **Video:** 60-second demo (screen recording with voiceover, use Loom)
  - **First comment:** Pre-write the maker comment (see below)
- [ ] Line up 20–30 people to upvote and comment on launch day (beta testers, Discord community, friends)
- [ ] Schedule social media posts for launch day
- [ ] Prepare a "Launch Day" email for the full waitlist

**Product Hunt Description Draft:**

> Push Tonnes tracks the one number that actually matters for gym progress: your total tonnage — the cumulative weight you move every session.
>
> 🏋️ **Log workouts** with voice input (no sweaty typing)
> 🤖 **Get AI coaching** after every session (powered by Claude)
> 📍 **Compete at your gym** with hyperlocal leaderboards
> 📊 **Track trends** with tonnage analytics over time
> 🏆 **Fair competition** with weight category leaderboards
>
> Built by a solo founder who was tired of tracking volume in spreadsheets. Free to use, with Pro for unlimited AI coaching.
>
> Try it at pushtonnes.app — would love your feedback! 💪

**Maker First Comment Draft:**

> Hey Product Hunt! 👋 I'm Max, the solo dev behind Push Tonnes.
>
> I started tracking my "total tonnage" in a spreadsheet after every gym session — total weight × reps for everything I did. Turns out that single number was a way better progress indicator than chasing arbitrary PR numbers.
>
> So I built Push Tonnes to automate it, added AI coaching (Claude analyzes your session and gives real feedback), and threw in a gym leaderboard because... who doesn't want to know who pushes the most at their gym? 😄
>
> We've been in beta for 4 weeks with ~100 testers, and the feedback has been incredible. The AI coaching is the feature people love most — it actually catches things like volume imbalances and suggests fixes.
>
> Would love your feedback, and happy to answer any questions!

---

### Week 10: LAUNCH WEEK 🚀

#### Launch Day (Tuesday) — Hour-by-Hour Playbook

**The night before (Monday):**
- 22:00 — Final check: landing page live, app stable, PH listing ready
- 22:30 — Schedule launch-day tweets (3 tweets: morning, midday, evening)
- 23:00 — Send "launching tomorrow!" teaser email to waitlist
- 23:30 — Sleep. Seriously.

**Launch Day (Tuesday):**

| Time (UTC) | Action |
|------------|--------|
| **00:01** | Product Hunt listing goes live (PH resets at midnight PT / 08:00 UTC) |
| **06:00** | Wake up. Check PH ranking. |
| **06:15** | Post launch announcement on Twitter/X with PH link |
| **06:30** | Post on Instagram (feed post + Stories with swipe-up/link sticker to PH) |
| **06:45** | Send **launch email** to full waitlist: "We're live! Support us on Product Hunt" |
| **07:00** | Post in Discord: "LAUNCH DAY! Here's the PH link — an upvote + comment means the world" |
| **07:30** | DM your 20–30 pre-committed supporters: "We're live — here's the link 🙏" |
| **08:00** | Post TikTok: "I just launched my app on Product Hunt" (face-to-camera, genuine, excited) |
| **08:00–12:00** | **Respond to every PH comment within 15 minutes.** This is critical for ranking. |
| **09:00** | Post Reddit launch post in r/SideProject (see below) |
| **10:00** | Post Reddit launch post in r/fitness (see below) |
| **12:00** | Check PH ranking. If top 10, post a midday update tweet: "We're #X on Product Hunt!" |
| **12:30** | Instagram Story update: screenshot of PH ranking |
| **14:00** | Post in 2–3 relevant Slack/Discord communities (Indie Hackers, WIP, fitness Discords) |
| **16:00** | Twitter/X update: share an interesting stat ("50 people signed up in the first 6 hours!") |
| **18:00** | Post on Hacker News: "Show HN: Push Tonnes — Track gym tonnage with AI coaching" |
| **20:00** | Final social push: "Last few hours to support us on Product Hunt today!" |
| **23:59** | PH voting closes. Celebrate regardless of outcome. |

**Day 2 (Wednesday):**
- Write a "thank you" post on Twitter/X with results
- Send thank-you email to waitlist with signup link
- Post PH results on Instagram
- Begin responding to all feedback received

**Days 3–7:**
- Continue engaging with PH comments
- Publish blog post: "What I Learned Launching Push Tonnes on Product Hunt"
- Ride the traffic wave — keep social active daily

#### Reddit Launch Strategy (Week 10)

**Post 1 — Launch Day, r/SideProject or r/indiehackers**
- **Title:** "I launched Push Tonnes — a tonnage-based workout tracker with AI coaching and gym leaderboards"
- **Body:** Short story of why you built it, link, ask for feedback
- **Tone:** Builder/founder, authentic

**Post 2 — Launch Day +1, r/fitness (if rules allow)**
- **Title:** "Free workout tracker that calculates your session tonnage and gives AI coaching — just launched"
- **Body:** Focus on user value, not the product. "I built this because..." Include screenshots.
- **Note:** r/fitness has strict self-promo rules. Read them carefully. If not allowed, use the weekly self-promotion thread.

**Post 3 — Launch Day +2, r/weightroom**
- **Title:** "Built a free tool for tracking training tonnage with AI-powered volume analysis — would love feedback from serious lifters"
- **Body:** Technical angle. Mention the research behind tonnage as a metric.

---

### Week 11: Influencer Outreach & Press

#### Fitness Tech Media Outreach List

| Outlet | Type | Contact Method | Angle |
|--------|------|---------------|-------|
| **BarBend** | Fitness news site | editorial@barbend.com / pitch form | "New app gamifies gym training with tonnage leaderboards" |
| **Breaking Muscle** | Training-focused blog | Contact form | "AI coaching meets strength training tracking" |
| **T3.com** | Tech/fitness reviews | Fitness editor | "Best new workout tracker 2026" inclusion |
| **Coach Magazine** (coachmag.co.uk) | UK fitness mag | Contact form | UK angle, gym leaderboard feature |
| **Men's Health** (digital) | Mainstream fitness | Fitness tech editor | Only pitch if PH goes well (need credibility) |
| **Wareable** | Wearable/fitness tech | News tips | Fitness app angle |
| **Product Hunt Newsletter** | Tech/startup | Automatic if top 5 | — |

#### Fitness Podcasts to Pitch

| Podcast | Host(s) | Audience | Pitch Angle |
|---------|---------|----------|-------------|
| **Mind Pump** | Sal Di Stefano, Adam Schafer, Justin Andrews | Mainstream fitness, huge audience (1M+/ep) | "Gamifying gym training with AI" — long shot but worth trying |
| **Stronger By Science / SBS Podcast** | Greg Nuckols, Eric Trexler | Evidence-based lifters | Tonnage as a training metric, data/science angle |
| **Iron Culture** | Eric Helms, Omar Isuf | Natural bodybuilding | Volume tracking for hypertrophy |
| **The Fitness Founders Podcast** | Jack Thomas (Keepme) | Fitness business/tech | Founder story, indie app in crowded market |
| **Barbell Logic** | Matt Reynolds, Scott Hambrick | Starting Strength community | Strength training technology |
| **Revive Stronger Podcast** | Steve Hall | Evidence-based bodybuilding | Training volume optimization |

**Podcast pitch email template:**

> Subject: Tonnage Tracking + AI Coaching — a new take on gym apps (Push Tonnes)
>
> Hi [Name],
>
> I'm Max, solo founder of Push Tonnes — a workout tracker that measures your total tonnage (weight × reps) per session and gives AI-powered coaching feedback.
>
> We just launched [on Product Hunt / in beta] and I think your audience would find the concept interesting — especially the idea that one aggregate number (tonnes moved) can be a better progress metric than tracking individual PRs.
>
> Would you be open to a quick chat? Happy to do a 15–20 minute segment or a full episode — whatever works.
>
> The app: pushtonnes.app
> Quick demo: [Loom link]
>
> Cheers,
> Max

#### Micro-Influencer Outreach

**Target profiles (Instagram/TikTok, 5K–100K followers):**

Look for accounts that match these criteria:
- Post regular gym/lifting content
- Track their workouts visibly (whiteboard, app screenshots, notes)
- Engaged community (comments, not just likes)
- Not already sponsored by Hevy, Strong, or Fitbod

**Types of accounts to target:**
- Natural bodybuilders who track volume
- Powerlifters documenting meet prep
- "Gym bro" content creators (humor + lifting)
- Fitness data/analytics accounts
- Female lifters in the strength space (underrepresented, strong communities)

**Example target profiles (representative types — search these categories on Instagram/TikTok):**

| Type | Example Search Terms | Follower Range |
|------|---------------------|---------------|
| Natural bodybuilding | #nattylifting, #naturalbodybuilding | 5K–50K |
| Powerlifting | #powerliftingmotivation, #rawpowerlifting | 5K–50K |
| Gym humor/culture | #gymhumor, #gymmemes + actual lifting content | 10K–100K |
| Data-driven fitness | #fitnesstracking, #workoutdata | 2K–20K |
| Female strength | #strongwomen, #girlswholift, #femalefitness | 5K–50K |

**Outreach volume:** DM 50 accounts over Week 11–12. Expect 10–15% response rate = 5–8 partnerships.

(See [Influencer Outreach Templates](#influencer-outreach-templates) below for DM scripts.)

---

### Week 12: Paid Ads & Scaling

#### Gym Leaderboard Seeding Strategy

**The problem:** Empty leaderboards = dead feature. You need 3–5 users per gym for the leaderboard to feel alive.

**The plan:**

1. **20 ambassadors × 3 recruits each = 60 users across 20 gyms** (minimum viable leaderboard density)
2. **Concentrate geographically:** Don't spread thin. Pick 3–5 cities and seed multiple gyms per city.

**Target cities (high gym density, English-speaking, tech-savvy demographics):**

| City | Why | Target # of Gyms |
|------|-----|------------------|
| London, UK | Huge gym culture, tech-savvy, Max's timezone proximity | 5 gyms |
| Austin, TX | Fitness-obsessed, tech hub, Reddit-heavy demographic | 3 gyms |
| Sydney, Australia | Massive gym culture, English-speaking, different timezone (global coverage) | 3 gyms |
| Los Angeles, CA | Fitness capital, influencer density | 3 gyms |
| New York, NY | Density, competitive culture | 3 gyms |
| Manchester, UK | Strong gym culture outside London | 2 gyms |
| Melbourne, Australia | Secondary AU market | 1 gym |

**Seeding tactics per gym:**
- Ambassador uses the app publicly (phone on bench, between sets)
- Sticker on water bottle and gym bag
- Casual conversations: "Have you seen who's top of the leaderboard here?"
- Ambassador shares their tonnage card on Instagram Stories tagging the gym location
- Print a simple A5 flyer: "Push Tonnes Leaderboard — Who's the strongest at [Gym Name]? Scan to join" (cost: $0.10/flyer at library printer)

---

## Landing Page Copy

### Hero Section

**Headline:**
> Every rep counts. Now you can prove it.

**Subheadline:**
> Push Tonnes tracks your total tonnage — the weight you move every session — gives you AI coaching, and lets you compete with everyone at your gym.

**Feature Bullets:**
1. 🏋️ **Tonnage tracking** — One number captures your entire workout: total weight × reps moved. "I pushed 14 tonnes today" beats "I did 4 sets of 10."
2. 🤖 **AI coaching after every session** — Get real feedback on your volume, intensity, exercise selection, and what to improve next time. Not generic tips — analysis of YOUR workout.
3. 📍 **Gym leaderboards** — See who's pushing the most at your gym. Fair competition with weight categories. No friends list needed — just show up and lift.

**CTA Button:**
> **Get Early Access — Free** (with email input field)

**Below CTA (small text):**
> "First 50 signups get lifetime Pro — free forever"

### Social Proof Section (post-beta)
> "I've used Hevy, Strong, and JEFIT. Push Tonnes is the first one that actually makes me want to beat my own numbers." — Chris, beta tester
>
> "The AI coaching caught that I was doing 3x more push than pull volume. No other app told me that." — Anna, beta tester

### FAQ Section
- **Is it free?** Yes. Free tier includes unlimited tracking, basic leaderboards, and 3 AI analyses per month. Pro unlocks unlimited AI, advanced analytics, and all leaderboards.
- **Do I need to download an app?** Nope. Push Tonnes is a web app — works on any phone browser. Just go to pushtonnes.app and sign in. (Native apps coming soon.)
- **How does the gym leaderboard work?** We use your phone's location (with your permission) to find other Push Tonnes users within 1km. You'll see a leaderboard of everyone training at your gym — no friend codes needed.
- **What's "tonnage"?** Total weight moved in a session. If you bench 80kg for 3 sets of 10, that's 80 × 30 = 2,400kg = 2.4 tonnes. Push Tonnes calculates it automatically for your entire workout.

---

## Social Media Content Pack

### 5 Instagram Post Ideas with Captions

**Post 1: "The Concept" (Week 1)**
- **Visual:** Clean graphic showing a tonnage number "14.7 TONNES" in bold, with a subtle barbell background
- **Caption:** "Forget counting sets. Count tonnes. 🏋️ Every rep. Every set. Every kg. One number that tells you exactly how hard you worked. Push Tonnes — coming soon. Link in bio to get early access. #pushtonnes #tonnagetracking #gymtracker #workouttracker #liftingmotivation"

**Post 2: "AI Coaching Preview" (Week 3)**
- **Visual:** Screenshot of an AI analysis output (blurred slightly for mystery), with overlay text: "What if your phone could coach you after every session?"
- **Caption:** "We built an AI coach that reviews your workout and tells you what you nailed and what to fix. Not generic tips. Actual analysis of YOUR session — your volume, your exercise selection, your intensity. 🤖🏋️ Beta coming soon. First 50 testers get lifetime Pro free. Link in bio. #AIcoaching #workoutanalysis #fittech #gymlife"

**Post 3: "Gym Leaderboard Tease" (Week 4)**
- **Visual:** Mockup of a leaderboard screen showing usernames, tonnage scores, and gym name. Overlay: "Who's the strongest at YOUR gym?"
- **Caption:** "New feature drop: Gym Leaderboards 📍 Push Tonnes uses your location to create a leaderboard of everyone training at your gym. No friend codes. No invites. Just show up, lift, and see where you rank. Fair play with weight categories too. Want in? Beta starts next week → link in bio. #gymleaderboard #gymcompetition #pushtonnes #strengthtraining"

**Post 4: "Tonnage Card" (Week 6 — social proof)**
- **Visual:** A shareable tonnage card from a real beta tester: "SESSION COMPLETE — 16.2 TONNES — Chest & Triceps — Push Tonnes"
- **Caption:** "16.2 tonnes pushed today. That's 16,200 kg moved in one session. 💪 Our beta testers are crushing it. Every session, Push Tonnes calculates your total tonnage and gives you a shareable card. How many tonnes did YOU push today? #pushtonnes #tonnage #chestday #workoutdone #gymmotivation"

**Post 5: "Launch Announcement" (Week 10)**
- **Visual:** Bold graphic: "WE'RE LIVE 🚀" with the Push Tonnes logo and "pushtonnes.app"
- **Caption:** "It's official. Push Tonnes is live for everyone. 🚀 Track your tonnage. Get AI coaching. Compete at your gym. Free to use. Pro for the obsessed. 4 weeks of beta. 100 testers. 12,000+ tonnes tracked. Now it's your turn. Link in bio → pushtonnes.app 💪 #pushtonnes #applaunch #workouttracker #fittech #gymapp"

### 3 TikTok Video Concepts

**TikTok 1: "The Problem" (Week 2) — 30 seconds**
- **Hook (text on screen):** "POV: you've been going to the gym for 6 months and have no idea if you're actually progressing"
- **Scene:** Max (or anyone) scrolling through a notes app with messy workout logs, looking frustrated
- **Transition:** Cut to Push Tonnes app showing clean tonnage chart going up
- **Text overlay:** "Track your tonnage. One number. Real progress."
- **Audio:** Trending sound (something dramatic → satisfying)
- **CTA:** "Link in bio — free beta"

**TikTok 2: "AI Coach Reaction" (Week 6) — 45 seconds**
- **Hook:** "I let an AI analyze my workout and it called me out 😳"
- **Scene:** Film yourself doing a gym session (quick clips). Then show the phone screen with the AI coaching output. React genuinely to the feedback.
- **Key moment:** AI says something specific like "Your push volume was 3x your pull volume — add more rows"
- **Text overlay:** "When the AI knows more about your training than your gym bro"
- **CTA:** "Push Tonnes — AI coaching for every session. Free on pushtonnes.app"

**TikTok 3: "Gym Leaderboard Drama" (Week 8) — 30 seconds**
- **Hook:** "When you check the leaderboard and someone at your gym just passed you 😤"
- **Scene:** Check phone, see leaderboard, look shocked, then cut to aggressive workout montage
- **Text overlay:** "Must. Push. More. Tonnes."
- **Audio:** Competitive/hype audio
- **End screen:** Push Tonnes logo + "Who's the strongest at your gym?"

---

## Email Sequences

### Email 1: Welcome (Sent immediately on signup)

**Subject:** You're on the list, [FirstName] 🏋️
**From:** Max @ Push Tonnes

> Hey [FirstName],
>
> Welcome to Push Tonnes. You're in.
>
> Here's what's coming: a workout tracker that measures the one thing that actually matters — **your total tonnage**. Every rep, every set, every kg — rolled into one number that shows exactly how hard you worked.
>
> Plus: **AI coaching** that analyzes your session and tells you what to improve. And **gym leaderboards** so you can see who's really the strongest at your gym.
>
> **Your spot:** You're #[WaitlistPosition] on the list. [If top 50: "That means you're locked in for **lifetime Pro — free forever**."]
>
> I'll email you when beta opens. Until then, feel free to reply to this email — I read every one.
>
> Push heavy,
> Max
>
> P.S. Want to jump the line? Share your referral link and move up 5 spots for every friend who joins: [ReferralLink]

### Email 2: Feature Preview (Sent 1 week after signup)

**Subject:** Here's what Push Tonnes actually looks like 👀

> Hey [FirstName],
>
> Thought you'd want a sneak peek at what we're building.
>
> **📊 Your tonnage dashboard**
> [Screenshot of tonnage chart — clean, impressive]
> One glance tells you if this week was better than last. No digging through logs.
>
> **🤖 AI coaching output**
> [Screenshot of AI analysis]
> After every session, our AI (powered by Claude) reviews your workout. Not "great job!" fluff — actual analysis. "Your pull volume is lagging behind push." "Consider adding a hamstring exercise — your quad-to-ham ratio is unbalanced."
>
> **📍 Gym leaderboard**
> [Screenshot of leaderboard]
> Everyone at your gym, ranked by tonnage. Weight categories keep it fair. No friend codes — it just works.
>
> Beta access rolls out in [X days]. You'll be among the first to try it.
>
> — Max
>
> P.S. Questions? Just reply. I'm literally the only person who works here. 😄

### Email 3: Launch Invite (Sent on launch day, Week 10)

**Subject:** Push Tonnes is LIVE. Get in. 🚀

> [FirstName],
>
> It's here. Push Tonnes is open to everyone.
>
> 👉 **pushtonnes.app** — sign up in 30 seconds.
>
> What you get for free:
> - Unlimited session logging
> - Tonnage tracking and analytics
> - Monthly leaderboard
> - Voice input (hands-free logging)
> - 3 AI coaching analyses per month
>
> [If early signups: "And because you were early, your **[Lifetime Pro / 6 months Pro / 1 month Pro]** is already activated. Just sign up with this email."]
>
> **One favor:** We just launched on Product Hunt. If you have 10 seconds, an upvote would mean the world: [ProductHuntLink]
>
> Let's push some tonnes. 💪
>
> — Max

---

## Influencer Outreach Templates

### Instagram DM Script (Micro-influencer, 5K–50K followers)

> Hey [Name]! 👋
>
> Love your content — especially [specific recent post, e.g., "your squat PR video from last week"]. Genuine fan.
>
> I'm building a workout tracker called Push Tonnes that measures total tonnage per session and gives AI coaching feedback. Think of it as a coach that reviews every workout and tells you what to tweak.
>
> Looking for a few lifters to try it out and share honest feedback. No strings attached — you'd get lifetime Pro access (unlimited AI coaching, all leaderboard features) for free.
>
> Want me to send you a link? Would love to hear what you think 🙏

### TikTok DM Script (Short — TikTok DMs are more casual)

> Hey! Love your gym content 💪 I built a workout tracker that tracks your total tonnage per session + gives AI coaching. Looking for a few lifters to try it. Free lifetime Pro. Want in?

### Follow-up DM (if no response after 5 days)

> Hey [Name]! Just bumping this in case it got buried — totally understand if you're not interested. No pressure at all! Just thought it might be up your alley based on your training content. 🙏

### Ambassador Recruitment DM

> Hey [Name]! Quick question — you train at [Gym Name], right?
>
> I'm building Push Tonnes (workout tracker with gym leaderboards + AI coaching) and I'm looking for ambassadors at gyms in [City]. The idea is simple: you use the app, get a few gym mates to join, and help seed the leaderboard at your gym.
>
> What you'd get:
> - Lifetime Pro (free forever)
> - Ambassador badge in-app
> - Branded stickers
> - Direct line to me for feature requests
>
> Takes about 5 min/week beyond just tracking your normal workouts. Interested?

---

## Paid Ads Budget Breakdown

**Total budget: $500 over Weeks 10–12 (3 weeks)**

| Channel | Budget | Timing | Format | Targeting | Expected Results |
|---------|--------|--------|--------|-----------|-----------------|
| **Instagram/Facebook Ads** | $250 | Weeks 10–12 | Story ads + Feed posts | Age 18–35, interests: weightlifting, gym, fitness tracking, follow gym pages | 2,500–5,000 impressions/day, 100–200 clicks, 50–80 signups |
| **Reddit Ads** | $150 | Weeks 11–12 | Promoted posts in r/fitness, r/gym | Interest targeting: fitness, weightlifting | 1,000–2,000 clicks, 30–50 signups |
| **Google Ads (Search)** | $100 | Week 12 (test) | Search ads | Keywords: "workout tracker app," "gym tonnage tracker," "AI workout coach" | 200–400 clicks, 20–40 signups |
| **Total** | **$500** | | | | **100–170 paid signups** |

**Ad creative (Instagram/Facebook):**
- **Version A (Static):** Tonnage card graphic → "How many tonnes did you push today? Track it free → pushtonnes.app"
- **Version B (Video):** 15-second clip: log workout → tonnage score appears → AI coaching pops up → leaderboard
- **Version C (Testimonial):** Beta tester quote + screenshot → "Try it free"

Run A/B/C for first $50, then allocate remaining budget to the winner.

**Reddit ad creative:**
- Conversational tone: "I built a free workout tracker that measures your total tonnage and gives AI coaching. Looking for feedback from r/fitness."
- Looks organic. No corporate branding. Just a person sharing a tool.

---

## KPIs & Metrics Dashboard

### What to Track Weekly

| Metric | Tool | Target (Week 12) |
|--------|------|-------------------|
| **Landing page visitors** | Plausible/Umami | 5,000 total |
| **Waitlist signups** | Loops.so/Buttondown | 500 |
| **App signups (total)** | Firebase Auth dashboard | 1,000 |
| **Weekly Active Users (WAU)** | Firebase Analytics / custom | 400 |
| **Sessions logged (total)** | Firestore query | 3,000 |
| **AI analyses triggered** | API call counter | 500 |
| **Leaderboard opt-ins** | Firestore query | 300 |
| **Pro conversions** | Stripe dashboard | 20–30 |
| **D7 retention** | Firebase Analytics | 40%+ |
| **D30 retention** | Firebase Analytics | 25%+ |
| **Referral signups** | Referral system tracking | 50 |
| **Social followers (Insta)** | Instagram insights | 500 |
| **Social followers (TikTok)** | TikTok analytics | 300 |
| **Reddit post engagement** | Reddit (manual check) | 50+ upvotes per launch post |
| **Product Hunt upvotes** | Product Hunt | 200+ |
| **NPS score (beta)** | Survey | 50+ |
| **Cost per acquisition (paid)** | Ad platforms | <$3.00 |

### Weekly Review Routine (15 min every Monday)

1. Pull numbers into a simple spreadsheet (Google Sheets)
2. Compare to previous week: ✅ growing, ⚠️ flat, 🔴 declining
3. Identify #1 lever to focus on this week
4. Adjust content/ad strategy based on what's working

### Week-by-Week Targets

| Week | Signups (Cumulative) | WAU | Key Focus |
|------|---------------------|-----|-----------|
| 1 | 20 | — | Landing page live, socials set up |
| 2 | 50 | — | Reddit posts seeded, content flowing |
| 3 | 100 | — | Blog #1 live, SEO started |
| 4 | 200 | — | Beta recruitment push |
| 5 | 250 (50 beta active) | 40 | Beta launched, onboarding |
| 6 | 300 | 60 | Feedback collected, iterating |
| 7 | 350 | 80 | Ambassadors recruited |
| 8 | 400 | 100 | Social proof content ramp |
| 9 | 450 | 120 | PH prep, launch hype |
| 10 | 700 | 250 | 🚀 LAUNCH WEEK |
| 11 | 850 | 300 | Influencer outreach, press |
| 12 | 1,000 | 400 | Paid ads, optimize retention |

---

## Target Market Strategy

### Primary Markets (Weeks 1–12): USA, UK, Australia

These three markets share:
- English language (one content set)
- Strong gym culture
- High smartphone penetration
- Willingness to pay for fitness apps
- Active Reddit and social media populations

**Geographic focus within each market:**
- **USA:** Austin, LA, NYC, Miami, Denver (high gym density, tech-forward cities)
- **UK:** London, Manchester, Birmingham, Leeds
- **Australia:** Sydney, Melbourne, Brisbane

### Secondary Markets (Month 4–6): Germany, France

#### France (Max's advantage)
- Max speaks French → can create localized content
- Suksee (Max's consultancy) has French market connections
- French fitness app market is underserved compared to US/UK
- **Approach:** Translate landing page + key UI strings to French. Create French Instagram account (@pushtonnes.fr). Post in French fitness communities (Reddit r/musculationfr is small but dedicated; Facebook groups are more active in France)
- **Localization effort:** ~1 week of work to translate core app strings + landing page

#### Germany
- Large fitness market (Europe's #1 gym market by membership)
- Requires German translation (hire a freelancer, ~$200–300 for app strings + landing page)
- Target via German fitness subreddits and Facebook groups
- **Approach:** Localize, then seed via German fitness influencers

### Language Leverage
- **English:** Max (native-level) — USA, UK, Australia, global
- **French:** Max (fluent) — France, Belgium, Switzerland, Quebec
- **Norwegian:** Max (native) — Norway (small market but zero competition; easy win for later)

---

## Appendix: Content Calendar Summary (12 Weeks)

| Week | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
|------|--------|---------|-----------|----------|--------|----------|
| 1 | Setup | Setup | IG Post #1 | TikTok #1 | Twitter thread | — |
| 2 | Reddit Post #1 | IG Story | Reddit Post #2 | TikTok | Twitter | — |
| 3 | Blog #1 | IG Post #2 | Reddit engage | TikTok | Twitter | Reddit Post #3 |
| 4 | Blog #2 | IG Post #3 | Reddit Post #4 | TikTok | Reddit Post #5 | IG Story |
| 5 | Beta email | IG beta tease | Discord launch | TikTok #2 | Twitter update | — |
| 6 | IG tonnage stat | TikTok #2 (AI) | Twitter build log | IG tester spotlight | Reddit engage | — |
| 7 | Blog #3 | IG ambassador intro | Twitter update | TikTok | Reddit engage | IG Story |
| 8 | IG social proof | TikTok #3 (LB) | Twitter build log | IG testimonial | Blog #4 | PH prep |
| 9 | PH listing final | IG countdown | Pre-launch email | TikTok hype | Twitter thread | Final checks |
| 10 | Teaser email | 🚀 LAUNCH DAY | Thank you posts | Reddit launches | Blog #5 (PH recap) | IG recap |
| 11 | Influencer DMs | IG post | Press outreach | TikTok | Twitter | Reddit engage |
| 12 | Paid ads start | IG ad creative | Optimize ads | TikTok | Weekly review | Plan Month 4 |

---

## Quick Reference: Tool Stack

| Purpose | Tool | Cost |
|---------|------|------|
| Landing page | Next.js (existing) or Carrd | $0–$19/yr |
| Email capture & sequences | Loops.so | $0 (free to 1,000 contacts) |
| Analytics | Plausible or Umami (self-hosted) | $0–9/mo |
| Social scheduling | Buffer (free tier) | $0 |
| Design | Canva (free) | $0 |
| Blog | Hashnode or MDX in Next.js | $0 |
| Referral tracking | Viral Loops | $0 (free to 1,000 participants) |
| Community | Discord | $0 |
| Stickers | StickerMule | ~$100 |
| Ads | Meta Ads Manager + Reddit Ads + Google Ads | $500 |
| **Total fixed costs** | | **~$100–130 + $500 ads** |

---

*Plan prepared by Push Tonnes Business Development & Marketing Agent. Ready for Max's review and greenlight.*
