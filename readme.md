# jobbies

## Prereqs

1. node

## Getting Started

1. Clone repo.
2. To install depenencies, run `npm i`.
3. For local dev, run `npm run dev`.

## goals

1. 'at a glance' basic company/job/compensation info
2. basic tracking of progress
   1. to help stay organized
   2. drag to different columns

add 'events'?

So far the focus has been on representing the jobs. This is mainly choosing which info to show and how to arrange it. What more user-centric data do we need to keep?

1. the 'stage' of the application: new, in progress, completed. This is very basic stuff and can be represented by which column the job is in.
2. free-form notes. Easy to add, most flexible, possibly unwieldy.
3. a list of events could hold things like:
   * recruiter reach out on $date
   * i replied on $date
   * on $date1 an interview was schedule for $date2

This is basically a list of notes with timestamps.






potential uses for this whole thing:
1. track applications
2. attempt to quantify the attractiveness of any job
2. order jobs from most to least attractive



what could an attractiveness formula for a job look like?

Well, we care about the following:
1. comp
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

how do we score this? One approach would be a separate score for each aspect.

1. comp - score is literally the comp
2. work life balance - score is days off? will be unknown for some jobs
3. engagingness - very qualitative. tech stack and sample projects are sometimes mentioned.
4. ego - score could be isHouseholdName: yes or no
5. location - remote > nyc/philly > the rest


these could be displayed in columns, and color-coded by how good they are