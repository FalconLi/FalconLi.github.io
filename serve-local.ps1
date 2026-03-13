$ErrorActionPreference = "Stop"

# Ensure Ruby bin is available even if global PATH was not updated yet.
$rubyBin = "C:\Ruby33-x64\bin"
if (Test-Path $rubyBin) {
  $env:PATH = "$rubyBin;$env:PATH"
}

if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) {
  throw "bundle not found. Open a new terminal or add C:\Ruby33-x64\bin to PATH."
}

Write-Host "Starting local Jekyll server at http://127.0.0.1:4000 ..."
bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000 --config "_config.yml,_config_local.yml"
