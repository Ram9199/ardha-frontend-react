# PowerShell script to run the React frontend app
Write-Host "Starting the ARDHA Vedic Astrology Toolkit React App..." -ForegroundColor Cyan

# First make sure we're in the correct directory
Set-Location -Path $PSScriptRoot

# Run the dev server
Write-Host "Running npm dev server..." -ForegroundColor Green
npm run dev 