# jobbies

## Prereqs

1. node

## Getting Started

1. Clone repo.
2. To install depenencies, run `npm i`.
3. For local dev, run `npm run dev`.

## Goals

### Primary Goals

Gather and summarize key features of a job listing.

### Secondary Goals

Include some very simple features to track where in the application process you are.

1. Jobs can start out as 'new'.
   1. Can be flagged to show a recruiter reached out to you
2. Jobs can be moved to 'in-progress'.
   1. Could potentially hold events here but that's low priority.
3. Jobs can be moved to 'concluded'. A result should be added:
   1. Ghosted or Denied
   2. Offer w/ offer details
   3. Previous jobs or offers could sit here (or we can add another stage for 'previous')