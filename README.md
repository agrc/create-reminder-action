# Create a Reminder Action

[![Push Events](https://github.com/agrc/create-reminder-action/actions/workflows/push.yml/badge.svg)](https://github.com/agrc/create-reminder-action/actions/workflows/push.yml)

## About

Based on the [probot reminder bot](https://github.com/probot/reminders/) that no longer works. Now in a 2 part github action form! One action to create the reminder metadata and label. And another to run on a schedule to let you know when your reminder is due.

_This action requires the use of [agrc/reminder-action](https://github.com/agrc/reminder-action) as well._

Use the `/remind` slash command to set a reminder on any comment box on GitHub and you'll get a ping about it again when the reminder is due.

Use any form of `/remind [who] [what] [when]`, such as:

- `/remind me to deploy on Oct 10`
- `/remind me next Monday to review the requirements`
- `/remind me that the specs on the rotary girder need checked in 6 months`
- `/remind @<username> to fix this issue tomorrow`

## Sample Usage

```yml
name: 'create reminder'

permissions:
  issues: write
  pull-requests: write

on:
  issue_comment:
    types: [created, edited]

jobs:
  reminder:
    runs-on: ubuntu-latest

    steps:
      - name: 👀 check for reminder
        uses: agrc/create-reminder-action@v1
```
