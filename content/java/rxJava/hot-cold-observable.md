---
title: "Hot and Cold observable/flowable"
metaTitle: "Hot and Cold observable/flowable"
metaDescription: "Hot and cold observable/flowable"
---

## 개요

Hot 생성자의 경우에는 하나의 생성자에서 여러개의 구독자가 붙을 수 있습니다.
Cold의 경우 생성자는 구독할 때마다 각각의 타임라인에서 생성됩니다.

Hot의 경우 구독을 하더라도, 처리가 이루어지지 않을 수 있습니다.

기본적으로 Observable/Flowable은 Cold입니다.

따라서 Hot으로 변경하기 위해서는 ```Connectable Observable/Flowable```로의 변환이 필요합니다.

## Cold Observable vs Hot Observable

|비교| Hot  | Cold |
|---|------|------|
|데이터 배출 | 구독하지 않아도 계속 배출| 구독하지 않으면 배출하지 않음|
|example| 마우스 이벤트, 키보드 이벤트, 시스템 이벤트|웹 요청, 데이터 베이스 쿼리|
|conversion method| ```publish()```, ```replay()``` | ```share()```, ```autoConnect()```, ```refCount()```|

## Method detail

1. autoConnect() : ```Observable<T>```를 반환합니다. 구독자 수가 1명 이상일 경우부터 emit합니다.
2. refCount() : ```Observable<T>```를 반환 합니다.
3. share() : ```Observable<T>```를 반환합니다.
4. publish() : ```ConnectableObservable<T>```를 반환합니다.
5. replay() : ```ConnectableObservable<T>```를 반환합니다. emit이 먼저 시작된 경우 cache해 두었다가 첫 번째 subscribe 발생시 캐시된 데이터를 줍니다.

## Examples

### Cold Observable

```java
Observable<String> observable = Observable
        .intervalRange(0, 10, 0, 1, TimeUnit.SECONDS)
        .map((timestamp) -> {
            System.out.println(Thread.currentThread().getName() + " Mapper");
            return "Time Stamp:" + System.currentTimeMillis();
        });

observable.subscribe(value -> {
    System.out.println("1:" + value);
});

try {
    Thread.currentThread().sleep(1000);
} catch (InterruptedException e) {
    e.printStackTrace();
}

observable.subscribe(value -> {
    System.out.println("2:" + value);
});

try {
    Thread.currentThread().sleep(20000);
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

### Hot Observable

```java
Observable<String> observable = Observable
        .intervalRange(0, 10, 0, 1, TimeUnit.SECONDS)
        .map((timestamp) -> {
            System.out.println(Thread.currentThread().getName() + " Mapper");
            return "Time Stamp:" + System.currentTimeMillis();
        })
        .publish()
        .refCount();

observable.subscribe(value -> {
    System.out.println("1:" + value);
});

try {
    Thread.currentThread().sleep(1000);
} catch (InterruptedException e) {
    e.printStackTrace();
}

observable.subscribe(value -> {
    System.out.println("2:" + value);
});

try {
    Thread.currentThread().sleep(20000);
} catch (InterruptedException e) {
    e.printStackTrace();
}
```