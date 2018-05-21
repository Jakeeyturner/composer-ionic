#!/bin/bash

# Exit on first error, print all commands.
set -ev

# Grab the current directory.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

# Required for chrome test
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start

npm test
