# Pages & User Flows (Diagrams)

This document visualizes the primary page-to-page journeys and interactions using Mermaid flow diagrams. Each diagram has a short caption explaining the logic and decision points.

## 1 — High-level User Navigation

```mermaid
flowchart TD
  subgraph Public
    L[Landing]
    S[Search]
    C[City Search]
    R[Results]
    D[Activity Detail]
  end

  subgraph Authenticated
    B[Trip Builder]
    I[Itinerary]
    M[My Trips]
    P[Profile]
  end

  L --> S
  L --> C
  S --> R
  C --> R
  R --> D
  D -->|"Add to trip"| CheckAuth{Authenticated?}
  CheckAuth -- yes --> B
  CheckAuth -- no --> Login[Login / Signup]
  Login --> B
  B --> I
  I --> M
  M --> P

  %% quick access
  Navbar[Navbar] -.-> S
  Navbar -.-> M
  Navbar -.-> P
```

Caption: A user begins at marketing pages, discovers activities, views details, and either adds items to a trip (auth required) or is prompted to sign in and returned to the builder.

## 2 — Add-to-Trip Modal Flow (Activity Detail)

```mermaid
flowchart TD
  D[Activity Detail] --> OpenModal[Open "Add to Trip" Modal]
  OpenModal --> ChooseDay[Choose existing day or create new day]
  ChooseDay --> ChooseTime[Choose time / slot]
  ChooseTime --> Confirm[Confirm add]
  Confirm -->|optimistic| Builder[Update Trip Builder UI]
  Builder --> Persist[Persist in background]
  Persist -- success --> SuccessToast[Show success]
  Persist -- fail --> UndoOption[Show undo / retry]
```

Caption: Adding an activity uses optimistic UI: show immediate change, persist in background, and handle failures with undo or retry.

## 3 — Trip Builder Editing Flow

```mermaid
flowchart LR
  Builder[Trip Builder] --> AddItem[Add Activity]
  Builder --> Reorder[Drag / Reorder]
  Builder --> EditDetails[Edit activity details]
  Builder --> SaveDraft[Save Draft (local or server)]
  SaveDraft --> AutoSave[Auto-save every X seconds]
  Builder --> Publish[Publish / Share]
  Publish --> ShareLink[Generate share link / export PDF]
```

Caption: The Trip Builder is the main composition surface — users can add, reorder, edit, save drafts, and publish/share itineraries.

## 4 — Auth Redirect Pattern (Protected Actions)

```mermaid
flowchart TD
  Action[Protected Action] --> IsAuth{Is authenticated?}
  IsAuth -- yes --> Proceed[Proceed with action]
  IsAuth -- no --> SaveState[Save attempted action state]
  SaveState --> Auth[Show Login / Signup]
  Auth --> Callback[On success: restore saved state]
  Callback --> Proceed
```

Caption: When a protected action is attempted by an unauthenticated user, save the action context, perform auth, then resume the original action.

## 5 — Save & Share / Export Flow

```mermaid
flowchart TD
  Itin[Itinerary Page] --> Export[Choose export method]
  Export --> PDF[Export PDF]
  Export --> Link[Create shareable link]
  Export --> Email[Send via email]
  Link --> Shorten[Optional: shorten link]
  Link --> Track[Track share clicks]
```

Caption: Offers multiple export paths; share links may be shortened and tracked for analytics.

---

If you'd like, I can:

- Add per-page swimlanes showing which component owns which actions, or
- Generate an ER/data-contract diagram for backend resources referenced by each page.
