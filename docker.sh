#!/bin/sh

docker run -v "${PWD}":/var/www/html -p 8080:80 --rm --name php php:7-apache
