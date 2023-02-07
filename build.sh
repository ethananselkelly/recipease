#!/bin/bash

yarn install
yarn workspace recipease-client build
pip3 install -r requirements.txt