---
title: "Basic"
metaTitle: "RXJava Basic"
metaDescription: "본 문서는 RxJava의 git을 구조로 설명합니다."
---

## RxJava란?

공식 git 기준으로 다음과 같이 설명 되어있다.
Reactive programming의 java extension.
Observable sequence들을 통해서 async, event-based를 구성한다.

## Setting

```gradle
implementation "io.reactivex.rxjava3:rxjava:3.0.0"
```

## Test

```java
package com.malgogi.tutorial.test;

import io.reactivex.rxjava3.core.*;

public class TestApplication {
    public static void main(String[] args) {
        Flowable.just("Hello world").subscribe(System.out::println);
        Flowable.just("Hello","world").subscribe(System.out::println);

        //It will throw NPE.
        Flowable.just("Hello", null).subscribe(System.out::println);
    }
}
```

## Some Terminology

### Upstream, Downstream

다음과 같이 source에, 0~N개의 operator를 붙이는 형태로 동작한다.
이 때의 opertator 기준으로는 source쪽이 upstream, consumer쪽을 downstream으로 동작한다.

```java
source.operator1().operator2().operator3().subscribe(consumer);
source.flatMap(value -> source.operator1().operator2().operator3());
```

### Backpressure

DataFlow가 동작할 때는 각각의 asynchronous step에서는 각자 다른 속도로 태스크를 수행하기 때문에, 문제가 생길 수 있다. 이를 지원하기 위해서
메모리에 buffering을 두거나, 또는 skip, drop하는 backpressure기능을 제공한다. 

RxJava에서는 Flowable은 해당 내용을 지원하고, Observable은 지원하지 않습니다.
ingle, Maybe and Completable 또한 지원하지 않습니다.

```java
public abstract class Flowable<@NonNull T> implements Publisher<T> {
    /** The default buffer size. */
    static final int BUFFER_SIZE;
    static {
        BUFFER_SIZE = Math.max(1, Integer.getInteger("rx3.buffer-size", 128));
    }
    ....
}
```

아마 해당 BUFFER_SIZE가 buffering을 지원하는 것으로 보입니다. <br/>
또는 연산자에 buffer size를 지정할 수 있습니다.

## 출처

[ReactiveX](http://reactivex.io/)
[RxJava git](https://github.com/ReactiveX/RxJava)