@echo off
REM Preview launcher for the Claude Code Browser pane.
REM
REM Two environment quirks make this shim necessary:
REM   1. The preview launcher does not quote executable paths, and node/npm
REM      live under "C:\Program Files\", so pointing it at npm directly fails
REM      with 'C:\Program' is not recognized.
REM   2. Turbopack panics when the project is addressed by its 8.3 short path
REM      ("leaves the filesystem root"), so the launcher must be given a
REM      space-free path to THIS FILE while the file itself cd's to the real
REM      long path.
REM
REM Serves the production build; `next dev` has OOM'd in this sandbox.
cd /d "%~dp0"
call "C:\Program Files\nodejs\npm.cmd" run start -- --port %1
