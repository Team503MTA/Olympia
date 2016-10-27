#!/bin/bash
now=$(date +"%D %T")
clear
echo  "$now PULL CODE.."
git reset --hard
git pull

echo "$now   " >> ./BuildInfo.txt
#cu 15s build lai 1 lan
sleep "15"
sh build_bash.sh


