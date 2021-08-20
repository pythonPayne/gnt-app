#!/bin/sh
cd ../gnt/Tyndale/code
python prep_pickles.py
cd ../../../scripts
bash clean.sh && bash newDb.sh && bash dev.sh