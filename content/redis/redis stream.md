---
title: "Redis stream"
metaTitle: "Redis stream"
metaDescription: "Redis stream"
---

## 개요

- Redis 5.0부터 사용가능합니다.
- 기존 sorted set과 유사한 radix tree 기반의 구조를 가지고 있습니다.
- 다른 kafka, spark stream과 달리 쉽게 stream (channel)을 생성 및 삭제가 가능합니다.
- kafka와 유사하게 consumer group을 설정 가능합니다.
- stream에도 expire 설정이 가능하며, 이를 통해 시간이 지난 stream을 쉽게 삭제 가능합니다.

## Comparison

## Commands

### 1. XADD

stream에 element 추가합니다.

```bash
xadd stream-name id-pattern key1 value1 key2 value2
```

### 2. XRANGE

stream에서 범위 데이터를 읽어들입니다.
-는 min id 기준
+는 max id값을 의미합니다.

```bash
xread stream-name - +
```

### 3. XLEN

현재 stream의 item의 갯수를 반환합니다.

```bash
xlen stream-name
```

### Features

#### 1. Entry ID

```<millisecondsTime>-<sequenceNumber>```로 구성됨 time의 경우 redis server clock을 따르기 때문에 redis server간의 시간 동기화가 필요하다.

#### 2. 