# Telegram ChatGPT Concierge Bot Design Guide

## Overview

This project runs inside Telegram. Telegram controls the visible application
shell and most interaction patterns. This guide covers bot messages, response
order, the repository README, and the demo image. It does not redefine the
Telegram interface.

## Colors

No first-party color palette is defined. Inherit the active Telegram client
theme. The blue controls, dark surfaces, and lavender demo avatar belong to the
captured client or demo instance. Do not turn them into product color tokens.

## Typography

Telegram controls message fonts, sizes, weights, and line wrapping. Write plain
text that remains clear in every client theme. Use short paragraphs and simple
labels. Do not rely on custom fonts, image text, or decorative characters.

## Layout

Keep each exchange chronological. For voice input, send the transcription,
then the answer, then the optional voice reply. For text input, send the answer
directly. Keep recovery instructions in their own message when they need user
action.

The README uses one title, a short capability list, setup steps, and one demo
image. Keep platform badges and attribution secondary to the setup flow.

## Elevation & Depth

Telegram owns message surfaces, overlays, and depth. The bot defines no cards,
shadows, blur, or stacking levels. Do not simulate elevation with emoji, ASCII
frames, or image backgrounds.

## Shapes

Telegram owns bubbles, avatars, icons, controls, and corner radii. The circular
avatar in the demo is an instance asset, not a source-defined logo. Do not
derive a first-party mark or shape system from it.

## Components

The bot experience uses these conversational components:

- Welcome and help messages.
- Typing status while work is active.
- Text answers.
- Voice transcription labels.
- Synthesized voice replies.
- Validation, access, and service-error messages.

Reuse Telegram’s native message and voice controls. Do not recreate them in
images or custom web UI without a separate product requirement.

## Do's and Don'ts

- Do keep messages brief, actionable, and friendly.
- Do preserve the order of transcription, answer, and voice reply.
- Do make errors useful without exposing service details or user data.
- Do test copy in light and dark Telegram themes.
- Don't claim ownership of Telegram or provider visuals.
- Don't treat the demo avatar as a canonical logo.
- Don't expose prompts, tokens, identifiers, messages, or logs in examples.
- Don't add public routes without an owned custom production domain.
