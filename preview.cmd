@echo off
REM Preview launcher for the Claude Code Browser pane.
REM
REM Serves the static export in out/ — the site is built with
REM `output: 'export'` for GitHub Pages, so `next start` refuses to run and
REM a plain static file server is what production actually looks like.
REM
REM Run `npm run build` first; this serves whatever is currently in out/.
REM
REM Two environment quirks make this shim necessary:
REM   1. The preview launcher does not quote executable paths, and node/npm
REM      live under "C:\Program Files\", so pointing it at npm directly fails
REM      with 'C:\Program' is not recognized.
REM   2. Next tooling misbehaves when the project is addressed by its 8.3
REM      short path, so the launcher is given a space-free path to THIS FILE
REM      while the file itself cd's to the real long path.
cd /d "%~dp0"
call "C:\Program Files\nodejs\npm.cmd" run serve
