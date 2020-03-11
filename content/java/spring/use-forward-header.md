---
title: "Use Forward Header"
metaTitle: "Use Forward Header"
metaDescription: "Use Forward Header"
---

## 개요

앞 단에서 proxy server가 셋팅 되어 있고, redirection을 spring에서 지정하게 될 경우 제대로 된 redirection url이 내려가지 않는 경우가 있습니다.
(redirect url이 http로 내려갑니다.)

이 때 ```server.use-forward-headers: true```로 설정하게 될 경우

```X-Forwarded-For```,```X-Forwarded-Proto```를 파싱하여 제대로 된 응답을 내려줍니다.

## 참고자료

[spring docs](https://docs.spring.io/spring-boot/docs/1.5.21.RELEASE/reference/html/howto-embedded-servlet-containers.html#howto-use-tomcat-behind-a-proxy-server)