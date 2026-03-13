# Local Setup (Windows, No Docker)

This guide installs the required packages and runs the website locally with Jekyll.

## 1) Install Ruby (required)

Open **PowerShell as Administrator** and run:

```powershell
winget install --id RubyInstallerTeam.RubyWithDevKit.3.3 -e --source winget --accept-source-agreements --accept-package-agreements
```

If Windows shows a popup/UAC dialog, click **Yes**.

Then close PowerShell and open a **new** PowerShell window.

Verify Ruby:

```powershell
ruby -v
gem -v
```

If you see "already installed" from `winget` but `ruby` is still not recognized, add Ruby to PATH.

Temporary for current terminal only:

```powershell
$env:Path = "C:\Ruby33-x64\bin;$env:Path"
ruby -v
```

Permanent for your user account:

```powershell
setx Path "$([Environment]::GetEnvironmentVariable('Path','User'));C:\Ruby33-x64\bin"
```

Then close terminal and open a new one.

## 2) Install Bundler and project gems

In the repository folder:

```powershell
cd d:\HKU\personal_website\www_personal
gem install bundler
bundle config set --local path "vendor/bundle"
bundle install
```

## 3) Run local site on 127.0.0.1

From the same folder:

```powershell
.\serve-local.ps1
powershell -ExecutionPolicy Bypass -File .\serve-local.ps1
```

Open in browser:

```text
http://127.0.0.1:4000
```

This setup enables live reload, so file changes should appear after save/refresh.

## 4) Optional: view from another device on same LAN

Run:

```powershell
.\serve-lan.ps1
```

Find your LAN IP:

```powershell
ipconfig
```

Then open from phone/tablet/computer on same network:

```text
http://YOUR_LAN_IP:4000
```

## 5) Stop the server

In the terminal running Jekyll, press:

```text
Ctrl + C
```

## 6) Common fixes

- If `bundle` is not recognized, close terminal and open a new one.
- If `jekyll` errors mention missing gems, run `bundle install` again.
- If port `4000` is occupied, use:

```powershell
bundle exec jekyll serve --host 127.0.0.1 --port 4001 --config "_config.yml,_config_local.yml"
```
