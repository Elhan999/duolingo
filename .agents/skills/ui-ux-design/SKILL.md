---
name: ui-ux-design
description: Design and improve website or app interfaces, including interaction patterns, responsive layouts, accessibility, and visual consistency. Use when shaping or implementing a UI/UX experience; not for brand identity or standalone graphic design.
---

# UI/UX design

Create interfaces that make the user's task clear and easy to complete while fitting the product's existing visual language.

## Before changing the interface

- Identify the user, their goal, the screen or flow, and the important states: loading, empty, success, error, and constrained or offline states when relevant.
- Inspect the existing app, route, components, styles, design tokens, and project guidance before proposing a new visual system. Reuse established patterns when they serve the task; avoid introducing a parallel component or token system.
- Check the supported viewports, themes, locales, and input methods in the project. Preserve existing behavior and content unless the request calls for a change.
- If the request is underspecified, make a small, reversible design decision based on the product context. Ask only when a choice would materially change the structure or user outcome.

## Shape the experience

- Establish a clear hierarchy around the primary user goal. Keep the main action easy to find and explain choices with concise, concrete labels.
- Make interaction states visible and predictable. Provide feedback after actions, prevent accidental loss of user input, and make disabled, selected, focused, and invalid states understandable.
- Design responsive behavior intentionally: preserve content priority and usable controls at narrow widths; do not merely shrink desktop layouts.
- Include keyboard operation, visible focus, semantic structure, accessible names, and sufficient text and control contrast. Do not rely on color alone to convey meaning.
- Use motion only when it clarifies a state change or supports orientation; respect reduced-motion preferences when the app supports them.
- Keep copy, translation, and content density in view. Avoid hardcoded text when the project uses localization, and allow realistic content lengths to wrap without breaking the layout.

## Implement in the project

- Follow the project's framework, component conventions, styling approach, and design tokens. Prefer the smallest cohesive change that completes the experience.
- Keep data, authorization, navigation, and backend contracts intact unless the task explicitly changes them. Do not substitute mock content for real product data without a clear reason.
- Use existing assets and icon libraries where available. Do not add dependencies or generate new assets unless they materially improve the requested result.
- If the repository has a design-system check or documented UI rules, use them as project-specific constraints and update them only when the task requires it.

## Review the result

- Inspect the changed screen at the relevant viewport sizes and themes when the available tools support it. Check hierarchy, overflow, alignment, focus, interaction feedback, and empty or error states relevant to the change.
- Run only the checks appropriate to the task and repository instructions; report what was and was not verified.
- Summarize the user-facing design decisions and any remaining uncertainty without claiming unverified behavior.
