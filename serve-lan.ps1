$ErrorActionPreference = "Stop"

# Ensure Ruby bin is available even if global PATH was not updated yet.
$rubyBin = "C:\Ruby33-x64\bin"
if (Test-Path $rubyBin) {
  $env:PATH = "$rubyBin;$env:PATH"
}

if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) {
  throw "bundle not found. Open a new terminal or add C:\Ruby33-x64\bin to PATH."
}

Write-Host "Starting Jekyll for LAN access on port 4000 ..."
Write-Host "Use http://<your-LAN-IP>:4000 from another device on the same network."
bundle exec jekyll serve --livereload --host 0.0.0.0 --port 4000 --config "_config.yml,_config_local.yml"
