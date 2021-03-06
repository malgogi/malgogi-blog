---
title: "Inter-process communication"
metaTitle: "Inter-process communication"
metaDescription: "Inter-process communication"
---

## IPC

### Methods

1. Rest
2. gRPC
3. AMQP, STOMP
4. formating
   1. avro
   2. protocol buffer

### 방식

1. 일대일 vs 일대다
2. 동기 vs 비동기

| sync/async | task | 협동자 |
|------------|------|----|
| sync | 요청/응답     | - |
| async | 비동기 요청/응답, 단방향 알림 | pub/sub, pub/비동기 응답 ( callback )|

## API 정의

1. IDL(Interface Definition Language) 정의
2. 시멘틱 버저닝
   1. ${MAJOR}.${MINOR}.${PATCH} 와 같은 상태로 버저닝
      1. MAJOR : 하위 호환성이 보장되지 않음
      2. MINOR : 하위 호환성이 보장됨
      3. PATCH : 버그 수정
   2. 표기는 path에다가도 할 수 있고, 또는 content negotiation에 끼워 넣을 수도 있습니다.
      1. Accept: application/json; version=1
3. 메세지 포멧 정의
   1. 텍스트( JSON, XML )
   2. 바이너리 (AVRO, Protocol Buffer)

## 패턴

### 동기 RPI(Remote Procedure Invocation) 패턴

- 클라이언트 <=> RPI Proxy( Client) <=> RPI Server <=> Service

#### Rest 성숙도 모델

- Level 0: HTTP Post를 통한 요청, 단일 end point
- Level 1: Resource 개념을 지원
- Level 2: HTTP verb 활용
- Level 3: HATEOAS, 액션에 필요한 링크도 같이 포함

## 참고자료

- [마이크로 서비스 패턴](https://ridibooks.com/books/754028054?_s=instant&_q=%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C+%EC%84%9C%EB%B9%84%EC%8A%A4+%ED%8C%A8%ED%84%B4)