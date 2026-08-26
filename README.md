# EventWave

A React Native + Expo (Expo Router, TypeScript) implementation of the **Evenro** Figma
Event Ticket Management UI kit. This is a **frontend-only** build — all data is mocked
locally in `data/`, and every piece of app state (auth, bookings, wishlist, checkout,
notifications, follows/invites) lives in lightweight in-memory stores under `state/`.

## Running the app

Nothing new was installed — this drops straight into your existing project.

```bash
npm install        # only if you haven't already
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

## Project structure

```
app/
  index.tsx                    Splash (redirects based on auth-store state)
  onboarding/                  3-slide onboarding carousel
  country-select.tsx           Country picker (modal)
  (auth)/
    sign-in.tsx / sign-up.tsx
    verify.tsx                 Shared OTP screen (sign-up AND password reset, via ?flow=)
    forgot-password.tsx -> verify.tsx -> new-password.tsx -> reset-success.tsx
    select-interest.tsx / select-location.tsx   Post-signup onboarding
  (tabs)/                      Bottom tab bar: Home, Calendar, Map, Profile
  event/[id].tsx                Event Details
  event/[id]/booked.tsx         Event Booked Details (Call / Directions / My Ticket)
  events/index.tsx              See All Events (Upcoming/Past tabs, empty state)
  wishlist.tsx                  Wishlist / Bookmarks (single unified feature)
  search.tsx  filter.tsx        Search + Filter bottom sheet
  notifications.tsx             Notifications (Accept/Reject invites)
  invite-friends.tsx
  add-event.tsx  edit-event/[id].tsx   (share the EventForm component)
  profile/edit.tsx  profile/[organizerId].tsx
  settings.tsx  help-faqs.tsx  contact-us.tsx     Frontend placeholders (see below)
  booking/[id]/
    tickets.tsx    Buy Ticket (tier + seat count)
    covid.tsx      Covid-19 declaration
    payment.tsx    Payment method + voucher
    add-card.tsx   Add card (modal)
    scan-card.tsx  Card scan placeholder
    ticket.tsx     Final digital ticket -- QR code, not the barcode shown in Figma
  review/[eventId].tsx          Post-event rating modal

components/    Reusable UI: AppButton, AppText, AppTextInput, EventHeroCard,
               EventListItem, ScreenHeader, EmptyState, SegmentedTabs, SearchBar,
               BottomSheet, Checkbox, Stepper, OTPInput, QRCodePlaceholder,
               SideMenu, CalendarGrid, MapPlaceholder, EventForm, PriceSlider, ...

constants/theme.ts     Colors, spacing, radius, and the full typography scale,
                        ported directly from the Figma Color Palette / Typography sheets.
constants/images.ts    Central image manifest -- see "Images" below.

data/          Mock domain data + TypeScript types shaped like a future Firestore schema.
state/         In-memory stores (useSyncExternalStore-based, no new dependency).
```

## Decisions confirmed with you

- **Messaging**: skipped entirely. No message icons/rows are wired to navigate anywhere
  (the couple of chat-bubble icons still visible in Event Details / Organizer Profile are
  static, non-interactive design chrome matching the Figma layout -- they aren't wrapped
  in a `Pressable`). The "Messages" button on Organizer Profile is present but explicitly
  `disabled` rather than silently doing nothing.
- **Settings / Help & FAQs / Contact Us**: built as reasonable, on-brand placeholder
  screens (toggle preferences, an accordion FAQ list, a contact form) -- not in the
  original Figma frames, but linked from the side menu.
- **Bookmark vs. Wishlist**: unified into one route (`/wishlist`), one menu item ("Bookmark").
- **Reset Password**: fully implemented -- Forgot Password -> OTP Verify (reuses the
  sign-up OTP screen via a `flow` param) -> New Password -> Success.
- **Ticket**: uses a **QR code**, not the barcode shown in Figma (see below).

## Images

No image was linked to an external URL. Every image is a **locally generated placeholder
PNG** already sitting in `assets/images/`, named sequentially (`image1.png` ... `image25.png`)
and required exactly once, centrally, in `constants/images.ts`. To swap in the real
Figma exports: **keep the same filename and overwrite the file** -- no code changes
needed anywhere.

| File | Used for |
|---|---|
| image1.png | App logo mark (splash) |
| image2-4.png | Onboarding illustrations 1-3 |
| image5-6.png | Event hero images (Int'l Band Concert, Shere Bangla Concert) |
| image7-13.png | Event thumbnails (Designers Meetup, Dribbblers Meetup, Food Competition, Basketball Final, ARB Stunt Riders, Int'l Music Co., Football Final) |
| image14.png | Current user avatar (MD Rafi Islam) |
| image15-23.png | Other mock user avatars (Alex Lee, Micheal Ullasi, David Silbia, Ashfak Sayem, Rocks Velkeinjen, Roman Kutepov, Cristofer Nolan, Jhon Wick, Zenifero Bolex) |
| image24.png | Organizer avatar (Tamim Ikram) |
| image25.png | Stylized map background (`MapPlaceholder`) |

### Fonts

The Figma kit specifies **Inter** throughout. No font files were provided, so
`constants/theme.ts`'s `Type` scale currently falls back to the system font (same sizes,
line-heights, and weights -- just not the exact typeface). To match exactly: add
`@expo-google-fonts/inter` (or drop `.ttf` files into `assets/fonts/`) and load it in
`app/_layout.tsx` via `expo-font`'s `useFonts`, then set `fontFamily: 'Inter'` in
`AppText`. This is the one place a new dependency would be needed, so it was intentionally
left out -- call it out if/when you want this added.

## Known simplifications (frontend-only scope)

- **QR code**: no QR-generation library is in `package.json`. `QRCodePlaceholder`
  draws a QR-*styled* deterministic grid (finder squares + pseudo-random modules seeded
  from the booking ID) -- it looks right but doesn't encode scannable data yet. Swap its
  internals for a real generator (e.g. `react-native-qrcode-svg`) once that's approved;
  every call site passes the same `value` prop, so nothing else changes.
- **Map**: no map SDK (e.g. `react-native-maps`) is installed. `MapPlaceholder` renders a
  static stylized map image with absolutely-positioned pins. Same swap pattern applies.
- **Price range slider**: built with core `PanResponder`, no gesture library dependency.
- **"Directions" action** (Event Booked Details) and **card scanning** (Scan Card) are
  inert placeholders -- no real geolocation/camera integration yet.
- **Add Event entry point**: there's a "+" button on the Profile tab header that opens
  Add Event. There isn't yet a "my events" list to reach Edit Event from (the mock
  organizer, Tamim Ikram, is a separate mock user from the logged-in mock user) -- wire
  this once a real account can own events.
- Every `onSubmit`/checkout/send action that would hit a backend is clearly commented
  with `// No backend yet --` so they're easy to grep for when Firebase goes in.

## Wiring up Firebase later

- `data/types.ts` types are shaped to mirror a Firestore schema -- swap the arrays in
  `data/events.ts`, `data/users.ts`, etc. for `getDocs()`/`onSnapshot()` calls; screens
  already consume `getEventById`, `getUserById`, etc. as if they were async-agnostic
  selectors, so wrapping them in real fetches (or React Query/SWR) is a contained change.
- `state/auth-store.ts`'s `signIn`/`signUp`/`signOut` are the three functions to replace
  with real Firebase Auth calls -- no screen calls Firebase directly today.
- `state/checkout-store.ts` and `state/bookings-store.ts` are where a real payment
  provider and Firestore writes would hook in (see the `// No backend yet` comments in
  `booking/[id]/payment.tsx`, `add-event.tsx`, `edit-event/[id].tsx`, `contact-us.tsx`,
  and `review/[eventId].tsx`).

## Verification performed

- `npx tsc --noEmit` -- clean, zero errors.
- Full `expo export` for **both iOS and Android** -- clean, zero errors (this is the
  strongest available check: it proves every route, import, and asset actually resolves
  and bundles).
- Every `router.push` / `router.replace` target manually cross-referenced against the
  actual route files in `app/`.
- `package-lock.json` confirmed byte-identical to what was provided -- nothing was added,
  removed, or upgraded.
