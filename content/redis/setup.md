---
title: "setup"
metaTitle: "setup"
metaDescription: "setup"
---

```docker-compose.yml
redis:
  container_name: redis-local
  image: redis:4.0.8-alpine
  ports:
    - "6379:6379"
  volumes:
    - redis:/data/redis
  restart: always
```

## 출처

[redis-gateway](http://redisgate.kr/redis/education/docker-compose.php)