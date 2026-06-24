# Start Stop — Prototype Context

This folder contains everything needed to continue prototyping the **Work Order Start/Stop** functionality with Claude Code.

## Files in this folder
- `work-order-control-panel-v1.html` — existing prototype built by Josh (OEE/Work Order Management owner). This is a working HTML mockup with real state logic: contextual action buttons per state, ISA-88 state tags, waterfall category selection, and demo scenario simulation (jump to states like RUNNING_NEAR, HELD, etc). **This is the starting point — evolve it, don't replace it.**
- `CONTEXT.md` — this file.

## What this functionality is

Start Stop lets operators manage a Work Order's lifecycle on the shop floor: assigning it to a line/equipment, then starting, pausing, resuming, and completing it. It also feeds OEE with accurate timing data.

Two distinct workflows:
1. **Assignment** — picking which Work Order goes to which line/process/equipment. **Not yet built in the existing HTML — this is the main gap to prototype next.**
2. **Control** — start/pause/hold/resume/stop/complete/reopen/reassign on an already-assigned Work Order. **This is what `work-order-control-panel-v1.html` already covers.**

## Where the data comes from
- SAP is the source of truth for Work Orders. A separate Production Planning system (Brenda's team) creates orders upstream, but Start/Stop only integrates with SAP, not that system directly.
- Work Center is the connecting concept between a Work Order and eligible equipment — one work center can have multiple machines that could run a given order.

## Assignment screen — requirements to prototype
- Split-screen: Work Orders on one side, available Resources (lines/equipment) on the other.
- Clicking a Work Order filters the Resource list to what's eligible for it (same work center / resource group), and vice versa.
- Assignment is mostly manual; auto-assignment only applies when there's exactly one valid option, and is not essential for this release.
- No need to build a "next 2-3 Work Orders" queue view — out of scope for now.
- Work Order list should support filtering (status, equipment, material, batch, workstation) and show batch numbers — assumed/expected, not deeply specified.
- Assignment status should be visible: Auto Assigned / Created / Assigned.
- Once a Work Order has started on a piece of equipment, that equipment can't be unassigned (but new equipment can still be added after start).

## Control screen — what's already covered vs. what needs refinement
Already well modeled in the existing HTML:
- Contextual action buttons (only valid actions shown per state, not greyed out)
- ISA-88 state tagging
- Waterfall category + reason selection on pause
- Real-time state simulation

Needs refinement / is genuinely open:
- **Light standby** behavior is not clearly defined yet — known to keep already-triggered QC tasks available (unlike full standby, which blocks everything), but exact behavior needs validation with the team. Don't over-specify this; flag it as a TBD area in the UI if relevant.
- **Downtime threshold** for auto-pause — not yet defined how it gets configured. Treat as a placeholder/config stub, not a finished feature.
- **Auto-resume exception**: orders tagged as engineering studies / validation (MWO-type custom work orders) should never auto-resume — this logic may need to be reflected if auto-resume is shown.
- Whether action buttons should be hidden vs. shown-disabled is still being decided depending on use case — the existing HTML already leans toward "hidden/contextual," which matches Josh's stated preference, so keep that pattern.

## User identification
- Operators use scannable badges. Different user types/roles exist. Whenever a controlled action is attempted, the system should prompt for a badge scan to confirm identity — relevant because shared/service-account logins are common on the shop floor, so the system doesn't know who's acting until the badge is scanned.
- A "rejected transaction" state should exist for when the scanned badge doesn't have permission for the attempted action.

## Out of scope / already settled elsewhere (don't build these)
- Plant model / ISA-95 structure
- Global vs. local role/access design
- SAP inventory transaction sync (goods issue, receipt, scrap, waste) — handled by another team
- RS232 equipment parsing — unclear what this even refers to, flagged as an open gap, not actionable yet
- Formal Scheduler enforcement for Work Order sequencing — can be cut from this release

## Custom Work Orders
Already understood: used when there's no SAP integration available (e.g., engineering studies, non-saleable material). Worth representing as a Work Order type/tag if relevant, but doesn't need deep new logic.

## Suggested next steps for the prototype
1. Review the existing `work-order-control-panel-v1.html` to understand its current state model and visual language (keep consistent — colors, fonts, ISA tags, action button style).
2. Build the **Assignment screen** as a new view/page, following the split-screen Work Orders/Resources pattern described above, matching the visual style of the existing file.
3. Link the two screens together (e.g., assigning a Work Order leads into the Control screen for it).
4. Leave clearly marked placeholders/TBD treatment for light standby and the downtime threshold config, rather than guessing at finished behavior.
5. Add the badge-scan/identity-confirmation interaction as a lightweight modal triggered before any controlled action, reusing the existing modal/scrim style already in the HTML.
