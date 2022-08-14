FROM php:8.0-fpm

ENV TZ Asia/Tokyo

# Laravelのインストール時に必要なツールをインストールする
RUN apt-get update \
  && apt-get install -y zlib1g-dev libzip-dev unzip \
  && docker-php-ext-install zip

# composerをインストールする
RUN curl -sS https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer \
  && composer self-update

# php.iniをコピー(書き換え)する。
COPY ./docker/app/php.ini /usr/local/etc/php/php.ini

COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer


WORKDIR /app