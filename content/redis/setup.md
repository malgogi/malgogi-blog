---
title: "setup"
metaTitle: "setup"
metaDescription: "setup"
---


## Setup

### 1. Redis-cli setup

```bash
brew install
```

### 2. Docker 환경 셋업

docker-compose.yml

```yml
redis:
  container_name: redis-local
  image: redis:5.0.7-alpine
  ports:
    - "6379:6379"
  volumes:
    - redis:/data/redis
  restart: always
```

## Test command

```bash

# ping. It should returns "PONG"
ping

```