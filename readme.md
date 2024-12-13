# jobbies

## Prereqs

1. node

## Getting Started

1. Clone repo.
2. To install depenencies, run `npm i`.
3. For local dev, run `npm run dev`.

## Goals

### Primary Goals

Gather and summarize key features of a job listing. This includes data on the company, the job role, and levels within the role. This can help to stay organized but can also reveal how attractive each job is.

What might factor into a job's attractiveness formula?

1. compensation
2. work life balance
   1. 4-day-week will have obvious advantage
3. engagingness
   1. good projects
      1. good level of challenge
      2. can recognize the value of the project
   2. good tech
   3. good coworkers
   4. good effect on society
4. ego - does "i work for $foocorp" impress people?
5. location - remote is ideal, but in person opportunity at some point would be nice

How might we score this? One approach would be a separate score for each aspect.

1. compensation - score is literally the total comp
2. work life balance - score is estimated days off, not including federal holidays
3. engagingness - this one's tough. can factor in company's mission and industry, reputation scores from glassdoor, tech stacks if listed.
4. ego - score could be isHouseholdName: yes or no, or maybe a 1-5 scale...no-name-startup, small-co, mid-co, huge-co, faang
5. location - remote > nyc/philly > the rest


these could be displayed in columns, and color-coded by how good they are.

We could try to fold it down to fewer scores but that'll involve figuring out how to weight features against each other.

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