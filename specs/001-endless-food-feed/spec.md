# Feature Specification: Endless Food Feed — Scroll and Act

**Feature Branch**: `claude/pm-sync-6ffc2w`

**Created**: 2026-09-21

**Status**: Draft

**Input**: Phase 1 of the project (phases 1 and 2 merged per decision 0006). An endless, scrollable social-media-style food feed the player can act on, proving that "scroll and choose" is a verb that pulls the player forward rather than a list to read.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The feed never ends (Priority: P1)

A player opens the game and is dropped straight into a feed of food posts. They scroll. More posts arrive. They scroll further. More posts arrive. There is no menu, no start button, no level, no end — the feed simply continues for as long as they keep going, exactly like the thing it is satirising.

**Why this priority**: This is the substrate everything else sits on, and it is the half of the core verb that can be built and judged on its own. A feed that stutters, runs dry, or presents a boundary breaks the illusion the entire premise depends on. If this does not feel effortless, nothing layered on top rescues it.

**Independent Test**: Open the game and scroll continuously for several minutes without touching anything else. Fully testable alone, and already delivers the thing the project is about — the pull of an endless feed.

**Acceptance Scenarios**:

1. **Given** the game has just been opened, **When** the player performs no action at all, **Then** a feed of food posts is already visible and scrollable with no intervening screen, menu, or prompt.
2. **Given** the player is scrolling, **When** they reach what would be the bottom of the currently loaded posts, **Then** further posts are already present and the scroll does not stop, jump, or show a loading boundary.
3. **Given** the player has scrolled through a long session, **When** they continue scrolling, **Then** scrolling remains as smooth as it was at the start.
4. **Given** the player scrolls back upward, **When** they pass posts they have already seen, **Then** those posts appear as they did before rather than being replaced with different content.

---

### User Story 2 - Acting on a post (Priority: P2)

A post catches the player's attention and they respond to it — the small, near-reflexive engagement gesture the format trains. The game notices. The gesture costs nothing and asks nothing; it is the second half of the core verb.

**Why this priority**: Scrolling alone makes a reader, not a player. This is what turns the feed into something acted upon, and it is the smallest possible version of that. It depends on Story 1 existing but is independently judgeable: does the affordance invite the gesture without instruction?

**Independent Test**: Hand the game to someone who has never seen it and say nothing. Watch whether they act on a post unprompted, and how long it takes.

**Acceptance Scenarios**:

1. **Given** a post is visible, **When** the player looks at it, **Then** an engagement affordance is visible on the post without needing to be discovered, opened, or explained.
2. **Given** a post the player has not acted on, **When** they act on it, **Then** the post immediately and visibly reflects that it has been acted on.
3. **Given** a post the player has already acted on, **When** they act on it again, **Then** the outcome is unambiguous and consistent rather than silently double-counted.
4. **Given** the player has acted on several posts, **When** they scroll back to those posts, **Then** each still shows it was acted on.

---

### User Story 3 - The feed answers back (Priority: P3)

The player acts on a post, keeps scrolling, and the feed responds — what arrives next is shaped by what they just did. This is the moment the loop closes and the pull becomes real rather than theoretical.

**Why this priority**: This is the phase's thesis under test. "Addicted by utter nonsense" is a claim that the feed reacts to you in a way that keeps you going; until something visibly changes in response to an action, the game is a list with buttons on it. Lowest priority of the three only because it depends on both stories above being in place.

**Independent Test**: Act on a post, then scroll on and observe whether anything in the following posts is recognisably a response. A second player who acts on nothing should see a recognisably different feed.

**Acceptance Scenarios**:

1. **Given** the player has acted on a post, **When** they continue scrolling, **Then** a change attributable to that action becomes visible within a small number of subsequent posts.
2. **Given** the player has acted on nothing at all, **When** they scroll the same distance, **Then** the feed is recognisably different from the feed of a player who acted.
3. **Given** the player acts on nothing further, **When** they keep scrolling well past the response, **Then** the feed does not escalate on its own — the response is tied to the action, not to elapsed time.

---

### User Story 4 - A post that looks like it belongs (Priority: P4)

At least one post in the feed carries a real, produced illustration rather than a stand-in box — proof that an asset can travel from the art lane into the running game at the right size and shape, on a phone and on a desktop, without anyone hand-adjusting it.

**Why this priority**: This is a pipeline proof, not a content goal. One post is enough. Deliberately last: it is the story most likely to be blocked on direction that has not been settled yet, and the other three do not depend on it.

**Independent Test**: Scroll to the illustrated post on a narrow screen and a wide one. It should be sharp, correctly proportioned, and indistinguishable in framing from its neighbours.

**Acceptance Scenarios**:

1. **Given** the feed is open on a narrow screen, **When** the player reaches the illustrated post, **Then** the illustration fills its slot at the correct aspect without distortion, cropping surprises, or layout shift as it loads.
2. **Given** the same post on a wide screen, **When** the player reaches it, **Then** it remains sharp and correctly proportioned.
3. **Given** the illustration fails to load, **When** the player reaches that post, **Then** the post still renders and remains readable and actionable.

---

### Edge Cases

- **Fast scrolling.** What happens when the player flings the feed faster than posts can be produced? A visible gap or stall breaks Story 1's core promise.
- **Very long session.** What happens after hundreds of posts? Something must bound what the game holds onto, and whatever is released must not contradict Story 1's scenario 4 (scrolling back finds the same posts).
- **Repeat action.** The player acts on the same post twice, or rapidly many times. Covered by Story 2's scenario 3; the answer must be defined, not incidental.
- **Acting on a post already scrolled past.** The player acts on a post at the very edge of the viewport as it leaves. The action must land on the post the player meant.
- **Image never loads.** Covered by Story 4's scenario 3 — a post with no image is still a post.
- **Player who never acts.** Someone who only scrolls must still have a coherent experience; nothing may wait on an action that never comes.
- **Reduced-motion and text-size preferences.** A player who has asked their device for less motion or larger text must still be able to scroll and act.
- **Very short session.** The player acts once and leaves after thirty seconds. Nothing is persisted, and nothing about the next session should imply it remembers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The feed MUST present a continuous vertical sequence of food posts with no reachable end, no terminal state, and no win or lose condition.
- **FR-002**: The game MUST open directly into the scrollable feed with no menu, title screen, or start action preceding it.
- **FR-003**: Each post MUST carry text content and an image slot, and MUST remain a coherent post if the image is absent or fails.
- **FR-004**: Post text MUST be live, selectable text and MUST NOT be rendered into or baked onto an image.
- **FR-005**: Post copy in this phase MUST be visibly identifiable as placeholder to anyone reading it, so that unfinished writing is never mistaken for finished writing.
- **FR-006**: Players MUST be able to perform an engagement action on a post, visible on the post itself without discovery, explanation, or a secondary screen. [NEEDS CLARIFICATION: is this a single binary gesture (one tap, on/off), or a choice between two or more distinct responses? The two produce different state shapes and different feeds, and Story 3 reads differently under each.]
- **FR-007**: The game MUST record each engagement action, including which post it applied to, in state held for the current session only.
- **FR-008**: The game MUST NOT persist any state across sessions — no save, no resume, no memory of a previous visit.
- **FR-009**: A post that has been acted on MUST visibly show that, immediately on action and again whenever the player returns to it.
- **FR-010**: At least one engagement action MUST produce a change in the feed that is visible to the player within a small number of subsequent posts. [NEEDS CLARIFICATION: what changes? More posts of the kind acted on, an escalation in absurdity, an intrusion such as an advert or notification, or something else? This is the seed of the escalation curve and is the single most consequential unanswered question in this phase — tracked as issue #5.]
- **FR-011**: The feed MUST NOT escalate or change on elapsed time alone in this phase; change MUST be attributable to player action.
- **FR-012**: Posts the player has already seen MUST remain the same posts when scrolled back to, for as long as they are retained.
- **FR-013**: The game MUST bound what it retains during a long session so that scrolling performance does not degrade as the session lengthens.
- **FR-014**: At least one post MUST render a produced illustration asset at correct aspect and sharpness on both narrow and wide screens, without layout shift as it loads.
- **FR-015**: Scrolling and acting MUST both remain usable when the player's device requests reduced motion or enlarged text.

### Key Entities

- **Post**: One item in the feed. Carries an identity, text content, a reference to an image, and the engagement affordances offered on it. Identity matters because the game must be able to say *which* post was acted on and show that state again later.
- **Engagement action**: A record that a player responded to a particular post. Session-scoped, discarded when the session ends.
- **Session state**: The recent, local record of what the player has done in this visit — what the feed consults when deciding what to serve next. Deliberately shallow: an endless feed with no resolution needs no accumulating history.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A player can scroll continuously for 5 minutes without reaching an end, a stall, a loading boundary, or a visible seam.
- **SC-002**: Scrolling after 200 posts is as smooth as scrolling at the first post, judged by a player who is not told which is which.
- **SC-003**: A player who has never seen the game acts on a post within 10 seconds of first seeing one, without being told they can.
- **SC-004**: After acting on a post, the player sees an attributable change in the feed within 5 further posts.
- **SC-005**: Two playtesters — one who acts, one who only scrolls — can each tell which of two recorded feeds was theirs.
- **SC-006**: In an unprompted playtest, a majority of testers scroll past 50 posts before stopping of their own accord. This is the phase's real question: whether the pull exists at all.
- **SC-007**: Every reviewer shown the build identifies the post copy as placeholder without being told.
- **SC-008**: Post text can be selected, resized, and read aloud by assistive technology on every post in the feed.
- **SC-009**: The illustrated post is indistinguishable in framing and proportion from its neighbours on both a narrow and a wide screen.
- **SC-010**: Closing and reopening the game produces a feed that shows no knowledge of the previous session.

## Assumptions

- **The engagement affordance is a single, low-cost gesture.** Assumed to be one tap requiring no confirmation, no text entry, and no modal — the reflexive gesture the format trains. The binary-versus-choice question is flagged in FR-006 rather than assumed away, because it changes the state shape.
- **Placeholder copy is written by whoever builds the feed, not by a writing lane.** The writing lane is deliberately not in play this phase (issue #2); copy here exists to be scrolled past, not read. It is replaced wholesale later.
- **The escalation curve is out of scope.** This phase proves one action produces one visible consequence. How nonsense compounds over a long session is a separate question (issue #5) and this phase must not pre-empt its answer by hard-coding a curve.
- **Visual direction is unsettled.** The satire's boundaries (issue #1) and the art style guide (issue #3) are open. Story 4 needs only enough direction to produce one asset; the rest of the feed uses neutral stand-ins until those are answered.
- **One illustrated post is sufficient.** This is a pipeline proof. Producing a full set of illustrations before the pipeline is proven would be work done against an unvalidated path.
- **Touch and pointer input both matter.** The format is native to phones, and the game is judged on a phone, but it must be usable with a mouse and keyboard.
- **No network, no accounts, no other players.** The feed is generated locally and is single-player. Nothing is uploaded and nothing is fetched from a service.
- **The stack is already decided** (decision 0005) and is deliberately not restated here — this specification describes what the player experiences, not what builds it.

## Out of Scope

- The escalation curve and how absurdity compounds over time (issue #5).
- Real written copy, tone and register (issue #2).
- A filled-in art style guide and a full asset set (issues #1 and #3).
- Audio of any kind.
- Hosting, deployment, and anything that makes this reachable by someone else.
- Any ending, resolution, score, or run structure — ruled out permanently by decision 0006, not deferred.
- Cross-session persistence of any kind.

## Known Design Risk

Recorded in decision 0006 and repeated here because the specification is where it has to be answered eventually, not inherited: **satire of compulsion that successfully creates compulsion is indistinguishable from the thing it satirises, unless something makes the seam visible.**

SC-006 measures whether the pull exists. Nothing in this phase measures whether the player ever notices they are being pulled. That is deliberate — this phase establishes the pull first, because there is no seam to show in a game nobody is drawn into. It is flagged so that it is a known outstanding requirement on a later phase rather than a late discovery.
