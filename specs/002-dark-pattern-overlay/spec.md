# Feature Specification: The Dark-Pattern Teaching Overlay

**Feature Branch**: `002-dark-pattern-overlay`

**Created**: 2026-09-22

**Status**: Draft

**Input**: Phase 2 of the project (#7). The overlay is the answer to the design risk recorded in decision 0006 and carried by spec 001: *satire of compulsion that successfully creates compulsion is indistinguishable from the thing it satirises, unless something makes the seam visible.* The overlay is the seam. Decision 0010 fixes its shape — **a catalogue, not a screen**: a manipulative mechanic cannot exist in the game without declaring what it is, what it is called, how it works, and where the player meets it. Input inventory: [`pattern-inventory.md`](pattern-inventory.md).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Seeing the seam (Priority: P1)

A player is scrolling, and something on screen is working on them — the count that is absurdly high, the heart that fills, the feed that never offers a place to stop. They reach for the overlay, point at the thing, and the game tells them plainly what it is and how it is doing what it does. The feed that was pulling them forward now also shows them the pull.

**Why this priority**: This is the phase. Everything else in this specification exists to make this moment complete, accurate, or durable. Even a single mechanic labelled and explained delivers the thesis — the game becomes satire the player can see through, rather than the thing it satirises.

**Independent Test**: Give a player the build and let them scroll. Have them use the overlay on one thing on screen of their choosing. Ask them afterwards what that thing was doing. Testable with one catalogued mechanic.

**Acceptance Scenarios**:

1. **Given** the player is looking at a post, **When** they use the overlay on a mechanic they can see, **Then** they are shown that mechanic's label and explanation, and it is unambiguous which thing on screen the explanation refers to.
2. **Given** the player has read an explanation, **When** they dismiss the overlay, **Then** it closes in a single action, with no guilt-worded prompt, no confirmation, and no later reappearance they did not ask for.
3. **Given** the player has used the overlay, **When** they return to scrolling, **Then** the feed serves exactly what it would have served had they never opened it.
4. **Given** one thing on screen carries two mechanics, **When** the player uses the overlay on it, **Then** both are shown, each explained separately.
5. **Given** the player has scrolled past the 50th post without opening the overlay, **When** they reach the fixed point in the feed, **Then** the game offers the overlay once, as a post among the others.
6. **Given** the offer is on screen, **When** the player simply keeps scrolling, **Then** nothing else happens — no prompt, no block, and the offer is never served again.

---

### User Story 2 - Nothing manipulates without declaring itself (Priority: P2)

Every manipulative mechanic in the game has an entry in one catalogue, and every entry points at something the player actually encounters. When a later change removes or renames the thing an entry points at, the change is stopped before it reaches a player — the catalogue fails loudly instead of quietly un-labelling part of the game.

**Why this priority**: This is what decision 0010 chose over a one-off screen. Without it, the course material falls behind the game — and that already happened once: phase 1 shipped thirteen manipulative mechanics while its own tracking named four. It is second rather than first only because it is invisible until Story 1 gives the player a way to see it.

**Independent Test**: Take the inventory. For each of its thirteen mechanics, find the catalogue entry and confirm all its fields are present. Then deliberately break one anchor and confirm the break is caught. No player required.

**Acceptance Scenarios**:

1. **Given** the phase 1 inventory, **When** each mechanic in it is looked up, **Then** every one has a catalogue entry with an identity, label, explanation and anchor.
2. **Given** a catalogue entry, **When** the thing it points at is removed or renamed, **Then** the change is rejected before it reaches a player, and the rejection names the entry that broke.
3. **Given** the sponsored-post label, **When** the catalogue is inspected, **Then** it does not appear — it is honest disclosure, not manipulation.

---

### User Story 3 - Explaining what is not a thing on screen (Priority: P3)

Three of the mechanics cannot be pointed at. The feed learning from a tap and answering several posts later is a *sequence*, not an element. And two mechanics are defined by what is **missing**: there is no timestamp anywhere, so the player has no sense of elapsed time; and the feed steers itself by what the player engaged with, and never shows them that it does. The overlay explains all three anyway.

**Why this priority**: These are the mechanics a player is least likely to notice unaided — which makes them the most worth teaching and the hardest to point at. A catalogue that quietly left them out because they were awkward would be excusing itself from its own rule. They sit third because they depend on Stories 1 and 2 existing.

**Independent Test**: Use the overlay to find the explanations of the three non-element mechanics. Confirm each one is reachable, and that the absence mechanics are explained in terms of what is not there.

**Acceptance Scenarios**:

1. **Given** the player has tapped the like on a post, **When** they use the overlay, **Then** they can find an explanation of how the feed answers that tap over the posts that follow.
2. **Given** the player is using the overlay, **When** they look for why they cannot tell how long they have been scrolling, **Then** they find an explanation of the missing timestamp that locates it where one would ordinarily be.
3. **Given** the player is using the overlay, **When** they look for why the feed has changed, **Then** they find an explanation that the feed is steering itself by their engagement without telling them.

---

### User Story 4 - Your tap changed the number (Priority: P4)

The player taps the like. The count — still absurdly inflated, in the hundreds of thousands or the millions — visibly moves by one, right where they tapped. Their gesture registered. They joined something. That is a real part of why the gesture is compulsive, and until now the game had the mechanism and showed none of it (#10, decided as option B).

**Why this priority**: Small and independently shippable. It also gives Story 1 its clearest single case: one element, two mechanics, two separate lessons — the inflated number, and the reinforcement of moving it.

**Independent Test**: Tap the like on several posts across the corpus. Confirm the displayed count changes visibly every time, including with reduced motion requested. Without the overlay at all, this is testable.

**Acceptance Scenarios**:

1. **Given** any post in the corpus, **When** the player taps the like, **Then** a change in its displayed count is visible on that post.
2. **Given** the player's device requests reduced motion, **When** they tap the like, **Then** the change is still perceivable, without relying on animation.
3. **Given** a post's count, **When** it is displayed, **Then** it keeps its inflated magnitude — the absurd number is the joke, and it stays.

---

### User Story 5 - The feed speaks in its own voice (Priority: P5)

Phase 1's post copy was deliberately placeholder and marked as such (spec 001, FR-005). It is replaced wholesale with finished satire — the utter nonsense the thesis calls for, in a register built to be scrolled past compulsively.

**Why this priority**: Independent of the overlay and the least coupled work in the phase. It is here because `writer` joined this phase with two dispatches (decision 0010), and because the overlay's teaching copy and the satire copy are in opposite registers — one plainly explains the nonsense the other performs.

**Independent Test**: Scroll twenty posts. None carries a placeholder marker. Reviewers who have not been told identify it as satire of food content.

**Acceptance Scenarios**:

1. **Given** any post in the feed, **When** it is read, **Then** it carries no placeholder marker and no placeholder text.
2. **Given** the replaced copy, **When** it is checked against the satire boundary, **Then** no real person, business, brand or platform appears in it.

---

### Edge Cases

- **Overlay used mid-fling.** The player opens the overlay while the feed is still moving. The explanation must attach to the thing they meant, not to whatever the feed has scrolled to.
- **The anchored thing leaves the screen.** The overlay is open on an element of a post, and that post scrolls away. What is shown must never refer to something the player can no longer see as though it were present.
- **One element, two mechanics.** The like count carries both inflated social proof and tap reinforcement (Story 4). Neither may hide the other.
- **Mechanics hidden from assistive technology.** Several mechanics live on elements deliberately hidden from assistive technology — the inert comment, save and share actions, the decorative follow button, the spinning disc. A screen-reader user never encounters them as elements. Their explanations must still be reachable, and must make sense to someone who cannot perceive the thing described.
- **Mechanics switched off for this player.** When the device requests reduced motion, the ambient drift, the like pop and the disc spin are disabled. The overlay may still explain them, but must not present them as currently happening.
- **The narrowest viewports.** Phase 1's caption contrast read 1.00:1 at five of six viewports and passed every check, because every check measured the one viewport where it passed (decision 0013). Overlay text is text over the feed and inherits exactly this risk.
- **Scrolling back to the offer.** The offer is a post, so it stays in scroll-back history like any other (spec 001, FR-012). Seeing it again that way is history, not a second offer.
- **Two players, different behaviour.** A player who taps everything and one who taps nothing meet the offer at the same point. If they did not, the offer would be measuring them.
- **A player who never opens the overlay.** They must get phase 1's game, unchanged. Nothing may wait on the overlay being used.
- **Honest disclosure.** The sponsored label is honest. Cataloguing it as manipulation would discredit the entries that are real.
- **Enlarged text.** Explanations are the longest text in the game. They must reflow rather than clip.

## Requirements *(mandatory)*

### Functional Requirements

**The catalogue**

- **FR-001**: The game MUST maintain a single catalogue of every manipulative mechanic it contains. Each entry MUST carry an identity, a short label, an explanation, and at least one anchor saying where the player encounters it (decision 0010).
- **FR-002**: Every mechanic in the phase 1 inventory MUST be catalogued in this phase — **all thirteen**, not the four #7 originally named. Cataloguing fewer would break the catalogue's own rule on the day it ships; the principle 0010 adopted is *if it manipulates, it is labelled*, not *if it is convenient, it is labelled*.
- **FR-003**: An anchor MUST be able to express three kinds of encounter: a thing on screen; a trigger followed by a consequence across later posts; and a deliberate absence, located where the missing thing would ordinarily be.
- **FR-004**: A single thing on screen MUST be able to carry more than one catalogued mechanic, each separately labelled and explained.
- **FR-005**: A change that leaves any catalogue entry pointing at nothing MUST be detected and rejected before it reaches a player, naming the entry that broke.
- **FR-006**: Honest behaviour MUST NOT be catalogued as manipulation. The sponsored-post label is disclosure and MUST NOT appear.

**The overlay**

- **FR-007**: The player MUST be able to reach the explanation of any catalogued mechanic from where they encounter it, through a control that is always available and never draws attention to itself. In addition, the game MUST offer the overlay **exactly once per session, as a post in the feed**, at a fixed point in the feed's sequence after the 50th post (decision 0015). The offer MUST arrive at the same point for every player: nothing about how the player behaves may decide whether or when it arrives. Scrolling past it is the whole of dismissing it, and it MUST NOT be served again. Its exact position is `game-design`'s.
- **FR-008**: The overlay MUST NOT itself use any manipulative mechanic: dismissal is one action, with no guilt-worded prompt, no confirmation, no repeated prompting after dismissal, and nothing obstructing closure. A teaching layer built from what it teaches would be the satire consuming itself.
- **FR-009**: Using the overlay MUST NOT count as engagement, MUST NOT alter what the feed serves, and MUST NOT affect any state the feed consults.
- **FR-010**: The overlay MUST NOT measure the player (decision 0015, #24): nothing about the player's behaviour may be counted, timed or recorded for the overlay's use, and nothing about it may be reflected back to them. The overlay may explain that the feed personalises itself; it MUST NOT show the player what the feed has learned about them. The like's own feedback — the heart, and FR-014's delta — belongs to the like rather than the overlay and is unaffected. Nothing the overlay holds may be persisted or transmitted.
- **FR-011**: Every explanation MUST describe the mechanism as it is actually implemented, and MUST be checked against the running game by someone other than its author.
- **FR-012**: Explanations MUST NOT name or identifiably allude to any real platform, company, product, or person (Principle I, decision 0008). The overlay teaches the mechanism, never whose product uses it.
- **FR-013**: When a catalogued mechanic is not currently active for this player, the overlay MUST NOT present it as though it were.

**The count that moves (#10, option B)**

- **FR-014**: Acting on a post MUST produce a visible change in its displayed count, on every post in the corpus, while the count keeps its inflated magnitude. The change MUST remain perceivable when the device requests reduced motion.
- **FR-015**: That change MUST be catalogued as its own mechanic — tap reinforcement — distinct from inflated social proof, on the same element (FR-004).

**Access and performance**

- **FR-016**: Every explanation MUST be reachable by keyboard alone and by assistive technology, including explanations of mechanics whose element is hidden from assistive technology. The overlay MUST NOT create a keyboard trap, nor make the feed's tab order unbounded — the trap phase 1 designed out.
- **FR-017**: Overlay text MUST meet the project's accessibility floor — live text, 4.5:1 contrast, usable with enlarged text — **at every viewport in the tested set**, not only the reference viewport.
- **FR-018**: The overlay MUST NOT add work to the moment a post boundary is crossed unless that work has been measured with real input under a mid-range-phone processing budget — the conditions that exposed the phase 1 stutter, not the unthrottled ones that hid it (#12, #13).
- **FR-019**: With the overlay unused, every acceptance scenario in spec 001 MUST still pass.

**Visual identity**

- **FR-020**: The overlay MUST be visually distinguishable from the game it annotates — it is the seam and must read as one. It MUST NOT use the colour reserved for engagement, and MUST NOT share a colour with any mechanic it labels. The verification colour is also the unearned Verified tick's, which is catalogued. Distinguishable means a reviewer shown the game with the overlay open can say, for every piece of text on screen, whether it belongs to the game or the overlay. Every colour in the current palette carries a reserved meaning, so this is expected to need an amendment to the art style guide.

**The documents** (decision 0009: an answer is not applied until the document it answers is edited)

- **FR-021**: The progression spec MUST stop describing the loop as a "variable reward" and MUST name what is implemented: a variable-ratio *arrival schedule*. The tap's own payout is deterministic every time (#22).
- **FR-022**: Any state the overlay introduces MUST be added to the progression spec's state vocabulary, which is exhaustive — state not listed there does not exist.
- **FR-023**: The progression spec's seam-problem risk MUST record that this phase answers it, and how.

**The satire copy**

- **FR-024**: All placeholder post copy MUST be replaced with finished satire copy, retiring spec 001's FR-005. The replacement MUST preserve the corpus constraints recorded in decision 0009 and MUST stay within the satire boundary of decision 0008 and Principle I.

**Gates**

- **FR-025**: This phase MUST NOT be accepted as complete until spec 001's SC-006 has been tested as written — unprompted, with several testers who have not seen the build — and the result recorded, whichever way it goes (#23, decision 0014). Building is not gated on it; acceptance is.
- **FR-026**: The rule that every manipulative mechanic is catalogued MUST be recorded in the project's standing rules for accepting work — the checks every later phase is held to — so that phase 3's escalation curve arrives already owing its entries.

### Key Entities

- **Catalogued mechanic**: One manipulative mechanic the game contains. Carries an identity, a short label, a plain-language explanation of how it works, and one or more anchors. The unit the player learns from.
- **Anchor**: Where the player encounters a mechanic. One of three kinds — an on-screen element, a trigger with a consequence across later posts, or a deliberate absence. Several mechanics may share one element.
- **Catalogue**: The single, complete declaration of every catalogued mechanic. Its completeness is the property the phase is built around.
- **Overlay state**: Whether the overlay is open, and which entry is in view. Nothing about the player (FR-010). Session-only, never persisted, invisible to the feed, and listed in the progression spec's state vocabulary (FR-022).
- **The offer**: A post, served at a fixed point in the feed's sequence. It is content the feed places the same way it places every post, not a piece of state that tracks the player.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the mechanics in the phase 1 inventory are catalogued, each with every field complete.
- **SC-002**: In an unprompted playtest with at least five testers who have not seen the build, a majority of those who used the overlay can correctly describe, in their own words, at least three mechanics they encountered — judged against what the game actually does, not against the explanation's wording. **This is the phase's real question: whether the seam becomes visible.**
- **SC-003**: No catalogued explanation misdescribes the mechanism it explains, as judged by a reviewer other than its author checking each against the running game.
- **SC-004**: Every deliberate attempt to remove or rename something a catalogue entry points at is caught before it could reach a player.
- **SC-005**: Tapping the like produces a visible change in the displayed count on 100% of posts in the corpus, with and without reduced motion requested.
- **SC-006**: Every explanation can be reached and read using keyboard alone, and using a screen reader, without focus ever becoming trapped.
- **SC-007**: Overlay text meets 4.5:1 contrast and remains fully readable with enlarged text at every viewport in the tested set, including the narrowest.
- **SC-008**: Crossing a post boundary costs no more dropped frames with the overlay available than without it, measured with real input under a mid-range-phone processing budget.
- **SC-009**: A reviewer auditing the overlay against the catalogue's own definitions finds no manipulative mechanic in it.
- **SC-010**: No post in the feed carries placeholder copy, and a majority of at least five reviewers identify the copy as satire of food content without being told.
- **SC-011**: The offer appears exactly once per session, at the same point in the feed for every player, whatever they did before reaching it.

## Assumptions

- **All thirteen, in this phase.** FR-002 is not scope creep under Principle III: 0010 adopted a rule, and a catalogue shipping with nine known mechanics undeclared would violate that rule on its first day. What *is* bounded is depth — a label and an explanation per mechanic, not a lesson plan.
- **`writer` owns every word the player reads in this phase**, in two separately-briefed dispatches: the catalogue's teaching copy, and the satire copy (decision 0010). `docs/tone-and-voice-guide.md` is copied at `writer`'s first dispatch and not before, per the constitution.
- **`art-director` owns the overlay's visual identity**, including whatever palette amendment FR-020 turns out to need. This specification states what the overlay must not look like; it does not pick its colour.
- **"Several testers" means at least five.** Spec 001's SC-006 and decision 0014 say "several" without a number, which is not measurable. Five is the conventional floor for a qualitative usability read; this reading is stated here so it can be argued with rather than silently applied.
- **One playtest session can serve two criteria.** Spec 001's SC-006 (FR-025) and this spec's SC-002 both need unprompted testers who have not seen the build. They may be run as one session with two measurements, provided the SC-006 measurement is taken on a feed with neither the overlay control nor the offer. Otherwise it measures a different game from the one spec 001 describes.
- **Playtest observation is not telemetry.** Watching a tester in a session and recording the result is not what FR-010 forbids. FR-010 is about what the *game* counts.
- **The escalation curve is phase 3.** Nothing here may pre-empt it (decision 0010 moved it).
- **The stack is already decided** (decisions 0005, 0012) and is deliberately not restated here — this specification describes what the player experiences, not what builds it.

## Dependencies

| | Blocks | Why |
|---|---|---|
| ~~#24~~ | — | **Resolved in decision 0015**: the overlay measures nothing. |
| #22 | the teaching copy for one mechanic | The explanation cannot be written against a name that is wrong at source. |
| #23 | acceptance of this phase (FR-025) | Not building. The overlay can be built against an unverified pull; it cannot be accepted against one. |
| #13 | nothing directly | Postponed by the owner until infra exists. FR-018 is the guard that keeps this phase from making it worse. |
| art style guide amendment | FR-020 | Every palette colour is already reserved. |

## Out of Scope

- The escalation curve and any other new manipulative mechanic (phase 3). New mechanics arrive owing entries (FR-026); none are added here.
- The shared platform, sign-in, saves and telemetry (#18, parked by the owner).
- Persisting anything about overlay use across sessions — ruled out by the constitution, not deferred.
- Audio of any kind.
- Removing or weakening any of the thirteen mechanics. The overlay explains the game; it does not make the game less of what it is.
- Resolving #13's remaining dropped frame. Postponed by the owner.

## Known Design Risk

**1. The catalogue cannot enforce its own central promise by itself.** Decision 0010 says a manipulative mechanic *cannot be added to the game without declaring itself*. The catalogue can guarantee that every entry it holds is complete and still points at something real (FR-005). It **cannot** notice a new manipulative mechanic that nobody declared, because deciding whether something manipulates is judgement, not a check. Stated plainly rather than implied: *cannot be added without declaring itself* is enforced by review, not by construction. FR-026 puts the rule where that review happens. The evidence that review is the weak point is already on record — phase 1 shipped nine undeclared mechanics, and each was built, reviewed and merged without anyone declaring it.

**2. The overlay may defuse what it explains.** If understanding a mechanic weakens its pull, a player who uses the overlay may stop scrolling sooner. That is arguably the thesis working — *showcase the stupidity of social media* — but it means SC-002 (the seam is visible) and spec 001's SC-006 (the pull exists) can trade against each other. Decision 0015 sets where the game sits on that trade: the overlay is always reachable but offered only once, and only after the pull has caught the player. That was the owner's call and not an implementation detail, because it decides which of the two criteria the game favours.

**3. The overlay may be labelling a loop that does not compel.** Spec 001 was accepted on one playtest by someone who had watched it being built (decision 0014). If strangers do not pass 50 posts, this phase explains a compulsion that is not happening — and a teaching overlay over a boring feed still *looks* like it works. FR-025 makes that the acceptance gate rather than an afterthought.
