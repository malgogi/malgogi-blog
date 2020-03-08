---
title: "Redis Key Event Notification"
metaTitle: "Redis Key Event Notification"
metaDescription: "Redis Key Event Notification"
---


## Definition

- 2.8.0 이후에 추가된 기능입니다.
- Redis의 key 이벤트에 대한 notification을 받을 수 있습니다.
- 이 기능을 이용하면 인증에서 access token의 만료, 또는 access token의 등록 시점 등등에 대해서 알 수 있습니다.
- 현재는 redis pub/sub layer에서 수행되기 때문에 client conenction이 끊겨서 reconnecting 될 경우에는 해당 시점 사이에 일어난 event들에 대해서는 loss가 발생하게 됩니다.

## Some terminology

### 1. Event Types

K     Keyspace events, published with ```__keyspace@<db>__```prefix.
E     Keyevent events, published with ```__keyevent@<db>__``` prefix.
g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...
$     String commands
l     List commands
s     Set commands
h     Hash commands
z     Sorted set commands
x     Expired events (events generated every time a key expires)
e     Evicted events (events generated when a key is evicted for maxmemory)
A     Alias for g$lshzxe, so that the "AKE" string means all the events.

## Getting Started

### 1. Redis setting

```bash
redis-cli

CONFIG set notify-keyspace-events KElgx
```

### 2. Prepare client

```gradle
compile 'io.lettuce:lettuce-core:5.2.2.RELEASE'
```

### 3. Prepare Producer

```java
@Slf4j
public class EventProducer implements Runnable {
    final RedisClient redisClient;
    StatefulRedisConnection<String, String> connection;
    AtomicBoolean stopped;

    public EventProducer() {
        stopped = new AtomicBoolean(false);
        redisClient = RedisClient.create("redis://localhost:6379/0");
        connection = redisClient.connect();
    }

    public void stop() {
        stopped.set(true);
    }

    private void stopInternal() {
        redisClient.shutdown();
    }

    @Override
    public void run() {
        log.info("Start Producer");

        while(!stopped.get()) {
            try {
                Thread.currentThread().sleep(1000);

                Event event = Event.builder()
                        .timestamp(System.currentTimeMillis())
                        .id(UUID.randomUUID().toString())
                        .build();

                if(!connection.isOpen()) {
                    log.warn("Connection closed. Retry once.");
                    connection = redisClient.connect();
                }

                log.info("Generate event={}", event);
                connection
                        .async()
                        .setex(event.getId(), 2, Long.toString(event.getTimestamp()));

                log.info("Connecton task done.");
            } catch (InterruptedException e) {
                log.error("interrupted", e );
                stop();
            }
        }

        log.info("Stopped event producer");
        stopInternal();
    }
}

```

### 4. Prepare Consumer

```java
@Slf4j
@Component
public class EventConsumer  {

    final RedisClient redisClient;
    StatefulRedisPubSubConnection<String, String> connection;

    @Autowired
    public EventConsumer() {
        redisClient = RedisClient.create("redis://localhost:6379/0");
        connection = redisClient.connectPubSub();
    }

    @PostConstruct
    public void run() {
        log.info("Add listener");
        connection.addListener(new RedisPubSubListener<String,String>(){
            @Override
            public void message(String channel, String message) {
                log.info("Message from channel={}, message={}", channel, message);
            }

            @Override
            public void message(String pattern, String channel, String message) {
                log.info("Message from channel={}, message={}", channel, message);
            }

            @Override
            public void subscribed(String channel, long count) {
                log.info("Message from channel={}, count={}", channel, count);
            }

            @Override
            public void psubscribed(String pattern, long count) {
                log.info("Message from pattern={}, count={}", pattern, count);
            }

            @Override
            public void unsubscribed(String channel, long count) {
                log.info("Message from channel={}, count={}", channel, count);
            }

            @Override
            public void punsubscribed(String pattern, long count) {
                log.info("Message from pattern={}, count={}", pattern, count);
            }
        });

        RedisPubSubCommands<String, String> sync = connection.sync();
        sync.psubscribe("__key*__:*");
    }

    @PreDestroy
    void stopInternal() {
        redisClient.shutdown();
    }
}
```