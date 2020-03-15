---
title: "Basic"
metaTitle: "RXJava Basic"
metaDescription: "본 문서는 RxJava의 git을 구조로 설명합니다."
---

## RxJava란?

공식 git 기준으로 다음과 같이 설명 되어 있습니다.
Reactive programming의 java extension.
Observable sequence들을 통해서 async, event-based를 구성합니다.

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

다음과 같이 source에, 0~N개의 operator를 붙이는 형태로 동작합니다.
이 때의 opertator 기준으로는 source쪽이 upstream, consumer쪽을 downstream으로 동작합니다.

```java
source.operator1().operator2().operator3().subscribe(consumer);
source.flatMap(value -> source.operator1().operator2().operator3());
```

### Backpressure

DataFlow가 동작할 때는 각각의 asynchronous step에서는 각자 다른 속도로 태스크를 수행하기 때문에, 문제가 생길 수 있습니다. 이를 지원하기 위해서
메모리에 buffering을 두거나, 또는 skip, drop하는 backpressure기능을 제공합니다.

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

### Assembly Time

데이터가 실질적으로 반영되지 않고, flow을 조합하는 작업을 assembly time이라고 합니다.

```java
Flowable<Integer> flow = Flowable.range(1, 1000)
                .map(v -> v * v)
                .filter(v -> v % 3 == 0);

        System.out.println("Before execute");
        flow.subscribe(System.out::println);
        System.out.println("After execute");
```

### Subscription Time

실질적으로 processing step이 연결되는 내부의 임시 상태입니다.
```doOnSubscribe()``` 가 호출되며, source에서 바로 데이터가 emit할 수도 있고, block된 상태일 수도 있습니다.

### Runtime
실질적으로 flow가 활발하게 흐르는 상태입니다.

```java
Observable.create(emitter -> {
     while (!emitter.isDisposed()) {
         long time = System.currentTimeMillis();
         emitter.onNext(time);
         if (time % 2 != 0) {
             emitter.onError(new IllegalStateException("Odd millisecond!"));
             break;
         }
     }
})
.subscribe(System.out::println, Throwable::printStackTrace);
```

### Background Computation

RXJava는 Scheduler 기능을 제공하며 Schedule thread에서 background task를 수행할 수 있습니다. 다음과 같이 thread를 따로 지정해서 넣을 수도 있습니다. 다만 Thread를 바로 호출하는 것이 아닌, Scheduler에 injection을 해주는 형태로써 사용해야 합니다.

```java
Executor subscriber = Executors.newSingleThreadExecutor(new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r);
                t.setName("subscriber thread");

                return t;
            }
        });

        Executor observer = Executors.newSingleThreadExecutor(new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r);
                t.setName("observer thread");

                return t;
            }
        });


        Flowable.fromCallable(() -> {
            System.out.println("subscriber side");
            System.out.println(Thread.currentThread().getName());
            Thread.sleep(3000 );

            return "Done Rx";
        }).subscribeOn(Schedulers.from(subscriber))
                .observeOn(Schedulers.from(observer))
                .subscribe((item) -> {
                    System.out.println("observer side");
                    System.out.println(Thread.currentThread().getName());

                }, Throwable::printStackTrace);


        System.out.println(Thread.currentThread().getName());
        Thread.sleep(4000);
        System.out.println("Done main");
```

### Schedulers

RXJava에서는 Thread를 사용할 때, Schedule을 통해 지원을 하며 몇가지 utility를 지원합니다.

- Schedulers.computation(): 고정된 thread 에서 Computation intensive work를 backgorund에서 돌릴 때 사용합니다.
- Schedulers.io(): I/O나 blocking operation을 동적인 thread set에서 수행할 때 사용합니다.
- Schedulers.single(): single thread에서 동작하며 FIFO 방식입니다.
- Schedulers.trampoline(): testing 목적으로 사용하며, single 방식의 thread들에서 동작합니다.

대부분은 사용가능하지만 특수한 환경에서는 자체적인 scheduler를 가질 수 있습니다.
ex) Android : AndroidSchedulers.mainThread(), SwingScheduler.instance() or JavaFXSchedulers.gui()
또한 기존의 Executor를 생성한 경우 wrapping에서 사용하는 방식 또한 가능합니다. ```Schedulers.from(Executor)```
RxJava에서는 기본적으로 daemonThread를 활용합니다.

### Concurrency within a flow

기본적으로 RxJava에서는 processing stage가 동시에 동작할 수 있습니다.
아래의 예제는 1 ~ 10의 flow을 생성하지만,
lambda에서는 같은 computation thread에서 consume하기 때문에 Paralle하게 동작하지 않습니다.

```java
Flowable.range(1, 10)
  .observeOn(Schedulers.computation())
  .map(v -> v * v)
  .blockingSubscribe(System.out::println);
```

하지만 아래의 예제에서는 독립적인 Flow를 생성하여 각각의 Thread에서 computation이 동작합니다.
하지만 flatMap은 연산의 순서를 보장하지 않으며 다음과 같은 대체 연산이 존재합니다.

- ```concatMap``` : Map 연산을 하나의 inner flow에서 실행합니다.
- ```concatMapEager```: 각각의 flow에서 실행하지만 inner flow의 생성된 순서대로 output flow가 생성됩니다.

```java
Flowable.range(1, 10)
  .flatMap(v ->
      Flowable.just(v)
        .subscribeOn(Schedulers.computation())
        .map(w -> w * w)
  )
  .blockingSubscribe(System.out::println);
```

또한 다른 방법으로 ```Flowable.parallel()```  다음과 같은 method를 통해서도 가능합니다.

```java
Flowable.range(1, 10)
  .parallel()
  .runOn(Schedulers.computation())
  .map(v -> v * v)
  .sequential()
  .blockingSubscribe(System.out::println);
```

### Dependent sub-flows

```flatMap```은 강력한 연산자이며 많은 상황에서 도움이됩니다. 
예를 들어, Flowable을 반환하는 서비스가 제공되면 첫 번째 서비스에서 생성 한 값으로 다른 서비스를 호출하려고 합니다.

```java

//inventory service
public class InventoryService {
    public Flowable<Integer> getInventoryIds () {
        return Flowable.range(0, 10);
    }
}

//echo service
public class EchoService {

    public Flowable<String> getItems(int id) {
        return Flowable.range(0,10).map((key) -> id + "-" + key);
    }
}

//main
public class SubFlowTestApplication {
    public static void main(String[] args) {
        InventoryService inventoryService = new InventoryService();
        EchoService echoService = new EchoService();

        inventoryService
                .getInventoryIds()
                .flatMap((inventory) -> echoService.getItems(inventory)
                        .map((item) -> "inventory" + inventory + "item!!!" + item))
                .subscribe(System.out::println);
    }
}

```



## 출처

[Reactive X Operators](http://reactivex.io/documentation/operators.html)
[ReactiveX](http://reactivex.io/)
[RxJava git](https://github.com/ReactiveX/RxJava)