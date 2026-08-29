#!/usr/bin/env bash
set -euo pipefail

curl -sSL https://dot.net/v1/dotnet-install.sh | bash -s -- --channel 10.0 --install-dir "$HOME/.dotnet"
export DOTNET_ROOT="$HOME/.dotnet"
export PATH="$HOME/.dotnet:$PATH"

dotnet publish "Portfólio Brian/Portfólio Brian.Client/Portfólio Brian.Client.csproj" -c Release -o vercel-output
