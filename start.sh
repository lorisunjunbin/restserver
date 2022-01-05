#!/bin/sh

nohup node index >/dev/null 2>&1 &

ps -ef | grep 'node index'