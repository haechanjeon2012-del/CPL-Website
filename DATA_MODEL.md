# CPL 2.0 data model draft

## Collections
- `teams/{teamId}`: name, shortName, active
- `players/{playerId}`: displayName, teamId, active, roles
- `games/{gameId}`: seasonId, type, date, homeTeamId, awayTeamId, homeScore, awayScore, status, notes, approvedAt, updatedAt
- `battingStats/{statId}`: gameId, playerId, teamId, plateAppearances, atBats, hits, homeRuns, rbi, walks, strikeouts, reachedBaseEvents
- `pitchingStats/{statId}`: gameId, playerId, teamId, outsRecorded, hitsAllowed, walksAllowed, strikeouts, runsAllowed, earnedRuns, saves, holds, startLabel
- `seasons/{seasonId}`: name, status, rulesVersion
- `playoffSeries/{seriesId}`: seasonId, round, higherSeedTeamId, lowerSeedTeamId, wins, draws, status
- `awards/{awardId}`: seasonId, playerId/teamId, awardType, notes
- `auditLogs/{logId}`: adminUid, action, targetType, targetId, timestamp, reason

## Aggregation rules
- Treat game-by-game stats as source-of-truth.
- Count only games with `status == completed` and approved state in official standings.
- Keep practice, All-Star, BTM, regular season, and playoffs separate.
- Store pitching innings as outs recorded to avoid decimal-inning arithmetic errors.
- Recalculate standings and player totals from source records after edits; do not increment totals blindly.
- Add an idempotency guard so one game/stat row cannot be applied twice.
- Confirm CPL-specific tie-breakers, reached-base definitions, saves/holds, special start labels, and postseason rules before production.
