#!/bin/sh

ps -ef|grep 'node index'| awk -F' ' '{print $2}'|xargs kill -5