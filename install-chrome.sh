#!/bin/bash
echo "🚀 Instalando Google Chrome en Render..."
apt-get update
apt-get install -y wget curl unzip
wget -q -O chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y ./chrome.deb
rm chrome.deb
echo "✅ Google Chrome instalado correctamente."