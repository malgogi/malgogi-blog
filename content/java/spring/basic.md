---
title: "Basic"
metaTitle: "Spring basic"
metaDescription: "Spring basic"
---

Spring 잘짠걸 보고 공부해보려고 합니다요. 
아래 코드는 Spring쪽의 코드를 참조한 내용입니다.

## 기본 구조

![mvc-context-hierarchy.png](./img/mvc-context-hierarchy.png)

출처: [Spring docs](https://docs.spring.io/spring/docs/5.1.9.RELEASE/spring-framework-reference/web.html#mvc)

## Running process

우선 로그를 살펴보자.

```txt
2020-02-09 17:24:18.093  INFO 10267 --- [           main] c.m.t.springtest.SpringtestApplication   : Starting SpringtestApplication on malgogiui-MacBook-Pro.local with PID 10267 (/Users/malgogi/Desktop/project/java-spring-tutorial-multi/springtest/build/classes/java/main started by malgogi in /Users/malgogi/Desktop/project/java-spring-tutorial-multi)
2020-02-09 17:24:18.097  INFO 10267 --- [           main] c.m.t.springtest.SpringtestApplication   : No active profile set, falling back to default profiles: default
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.codehaus.groovy.reflection.CachedClass (file:/Users/malgogi/.gradle/caches/modules-2/files-2.1/org.codehaus.groovy/groovy-all/2.4.15/423a17aeb2f64bc6f76e8e44265a548bec80fd42/groovy-all-2.4.15.jar) to method java.lang.Object.finalize()
WARNING: Please consider reporting this to the maintainers of org.codehaus.groovy.reflection.CachedClass
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
2020-02-09 17:24:18.485  INFO 10267 --- [           main] ConfigServletWebServerApplicationContext : Refreshing org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@12d2ce03: startup date [Sun Feb 09 17:24:18 KST 2020]; root of context hierarchy
2020-02-09 17:24:25.000  INFO 10267 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2020-02-09 17:24:25.092  INFO 10267 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2020-02-09 17:24:25.093  INFO 10267 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet Engine: Apache Tomcat/8.5.29
2020-02-09 17:24:25.098  INFO 10267 --- [ost-startStop-1] o.a.catalina.core.AprLifecycleListener   : The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: [/Users/malgogi/Library/Java/Extensions:/Library/Java/Extensions:/Network/Library/Java/Extensions:/System/Library/Java/Extensions:/usr/lib/java:.]
2020-02-09 17:24:25.223  INFO 10267 --- [ost-startStop-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2020-02-09 17:24:25.224  INFO 10267 --- [ost-startStop-1] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 6738 ms
2020-02-09 17:24:26.245  INFO 10267 --- [ost-startStop-1] o.s.b.w.servlet.ServletRegistrationBean  : Servlet dispatcherServlet mapped to [/]
2020-02-09 17:24:26.249  INFO 10267 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'characterEncodingFilter' to: [/*]
2020-02-09 17:24:26.249  INFO 10267 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'hiddenHttpMethodFilter' to: [/*]
2020-02-09 17:24:26.250  INFO 10267 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'httpPutFormContentFilter' to: [/*]
2020-02-09 17:24:26.250  INFO 10267 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'requestContextFilter' to: [/*]
2020-02-09 17:24:26.393  INFO 10267 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/**/favicon.ico] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
2020-02-09 17:24:26.640  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerAdapter : Looking for @ControllerAdvice: org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@12d2ce03: startup date [Sun Feb 09 17:24:18 KST 2020]; root of context hierarchy
2020-02-09 17:24:26.700  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/random],methods=[POST]}" onto public java.util.List<com.malgogi.tutorial.springtest.domain.action.Action> com.malgogi.tutorial.springtest.controller.ActionController.send()
2020-02-09 17:24:26.703  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/future/{appId}/{appSecret}],methods=[GET]}" onto public java.lang.String com.malgogi.tutorial.springtest.controller.FutureTestController.returnDataAndWork(java.lang.String,java.lang.String) throws java.lang.InterruptedException
2020-02-09 17:24:26.704  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/future/withCallable/{appId}/{appSecret}],methods=[GET]}" onto public java.util.concurrent.Callable<java.lang.String> com.malgogi.tutorial.springtest.controller.FutureTestController.returnCallableAndWork(java.lang.String,java.lang.String) throws java.lang.InterruptedException
2020-02-09 17:24:26.704  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/enum/parse],methods=[POST]}" onto public com.malgogi.tutorial.springtest.domain.JacksonTest com.malgogi.tutorial.springtest.controller.JacksonTestController.getData(com.malgogi.tutorial.springtest.domain.JacksonTest)
2020-02-09 17:24:26.705  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/enum/parse],methods=[GET]}" onto public com.malgogi.tutorial.springtest.domain.JacksonTest com.malgogi.tutorial.springtest.controller.JacksonTestController.getParsedData()
2020-02-09 17:24:26.707  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/model/extend],methods=[GET]}" onto public com.malgogi.tutorial.springtest.domain.modelTest.BuilderChild com.malgogi.tutorial.springtest.controller.ModelTestController.getExtendsTest()
2020-02-09 17:24:26.707  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/aspect/performance],methods=[GET]}" onto public void com.malgogi.tutorial.springtest.controller.ModelTestController.performanceTest()
2020-02-09 17:24:26.710  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/error]}" onto public org.springframework.http.ResponseEntity<java.util.Map<java.lang.String, java.lang.Object>> org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController.error(javax.servlet.http.HttpServletRequest)
2020-02-09 17:24:26.711  INFO 10267 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/error],produces=[text/html]}" onto public org.springframework.web.servlet.ModelAndView org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController.errorHtml(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse)
2020-02-09 17:24:26.743  INFO 10267 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/webjars/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
2020-02-09 17:24:26.743  INFO 10267 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
2020-02-09 17:24:27.103  INFO 10267 --- [           main] o.s.j.e.a.AnnotationMBeanExporter        : Registering beans for JMX exposure on startup
2020-02-09 17:24:27.161  INFO 10267 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2020-02-09 17:24:30.196  INFO 10267 --- [           main] c.m.t.springtest.SpringtestApplication   : Started SpringtestApplication in 16.902 seconds (JVM running for 20.199)
Disconnected from the target VM, address: '127.0.0.1:50809', transport: 'socket'
```

1. ConfigServletWebServerApplicationContext => application context를 생성하는것을 알 수 있다
2. TomcatWebServer => tomcat ( ws )를 실행하는 것을 알 수 있다. ( default ws 사용 )
3. Starting Servlet Engine: Apache Tomcat/8.5.29
4. ContextLoader => Web context를 load한다.
5. FilterRegistrationBean => Servlet bean들을 등록하는데, Filter쪽을 등록하는 것으로 보인다. (해당 부분은 추후에 설명해야 할 듯)
6. RequestMappingHandlerMapping => Request Mapping을 등록

## Codes

개략적인 부분들을 로그를 통해서 확인했고, 코드쪽은 어떻게 굴러가는지 간략하게 보자

### 1. Run Spring boot

```java
SpringApplication.run(SpringtestApplication.class, args);


```

### 2. Running process

```java
/**
 * Run the Spring application, creating and refreshing a new
 * {@link ApplicationContext}.
 * @param args the application arguments (usually passed from a Java main method)
 * @return a running {@link ApplicationContext}
 */
public ConfigurableApplicationContext run(String... args) {
  StopWatch stopWatch = new StopWatch();
  stopWatch.start();
  ConfigurableApplicationContext context = null;
  Collection<SpringBootExceptionReporter> exceptionReporters = new ArrayList<>();
  configureHeadlessProperty();
  SpringApplicationRunListeners listeners = getRunListeners(args);
  listeners.starting();
  try {
    ApplicationArguments applicationArguments = new DefaultApplicationArguments(
        args);
    ConfigurableEnvironment environment = prepareEnvironment(listeners,
        applicationArguments);
    configureIgnoreBeanInfo(environment);
    Banner printedBanner = printBanner(environment);
    context = createApplicationContext();
    exceptionReporters = getSpringFactoriesInstances(
        SpringBootExceptionReporter.class,
        new Class[] { ConfigurableApplicationContext.class }, context);
    prepareContext(context, environment, listeners, applicationArguments,
        printedBanner);
    refreshContext(context);
    afterRefresh(context, applicationArguments);
    stopWatch.stop();
    if (this.logStartupInfo) {
      new StartupInfoLogger(this.mainApplicationClass)
          .logStarted(getApplicationLog(), stopWatch);
    }
    listeners.started(context);
    callRunners(context, applicationArguments);
  }
  catch (Throwable ex) {
    handleRunFailure(context, ex, exceptionReporters, listeners);
    throw new IllegalStateException(ex);
  }

  try {
    listeners.running(context);
  }
  catch (Throwable ex) {
    handleRunFailure(context, ex, exceptionReporters, null);
    throw new IllegalStateException(ex);
  }
  return context;
}
```

### 2.1 createApplicationContext()

```java
/**
 * The class name of application context that will be used by default for non-web
 * environments.
 */
public static final String DEFAULT_CONTEXT_CLASS = "org.springframework.context."
    + "annotation.AnnotationConfigApplicationContext";

/**
 * The class name of application context that will be used by default for web
 * environments.
 */
public static final String DEFAULT_WEB_CONTEXT_CLASS = "org.springframework.boot."
    + "web.servlet.context.AnnotationConfigServletWebServerApplicationContext";

private static final String[] WEB_ENVIRONMENT_CLASSES = { "javax.servlet.Servlet",
    "org.springframework.web.context.ConfigurableWebApplicationContext" };

/**
 * The class name of application context that will be used by default for reactive web
 * environments.
 */
public static final String DEFAULT_REACTIVE_WEB_CONTEXT_CLASS = "org.springframework."
    + "boot.web.reactive.context.AnnotationConfigReactiveWebServerApplicationContext";

private static final String REACTIVE_WEB_ENVIRONMENT_CLASS = "org.springframework."
    + "web.reactive.DispatcherHandler";

private static final String MVC_WEB_ENVIRONMENT_CLASS = "org.springframework."
    + "web.servlet.DispatcherServlet";

/**
 * Strategy method used to create the {@link ApplicationContext}. By default this
 * method will respect any explicitly set application context or application context
 * class before falling back to a suitable default.
 * @return the application context (not yet refreshed)
 * @see #setApplicationContextClass(Class)
 */
protected ConfigurableApplicationContext createApplicationContext() {
  Class<?> contextClass = this.applicationContextClass;
  if (contextClass == null) {
    try {
      switch (this.webApplicationType) {
      case SERVLET:
        contextClass = Class.forName(DEFAULT_WEB_CONTEXT_CLASS);
        break;
      case REACTIVE:
        contextClass = Class.forName(DEFAULT_REACTIVE_WEB_CONTEXT_CLASS);
        break;
      default:
        contextClass = Class.forName(DEFAULT_CONTEXT_CLASS);
      }
    }
    catch (ClassNotFoundException ex) {
      throw new IllegalStateException(
          "Unable create a default ApplicationContext, "
              + "please specify an ApplicationContextClass",
          ex);
    }
  }
  return (ConfigurableApplicationContext) BeanUtils.instantiateClass(contextClass);
}
```

### 2.2 Inside listensers

```java
/**
 * A collection of {@link SpringApplicationRunListener}.
 *
 * @author Phillip Webb
 */
class SpringApplicationRunListeners {

private final Log log;

private final List<SpringApplicationRunListener> listeners;

SpringApplicationRunListeners(Log log,
    Collection<? extends SpringApplicationRunListener> listeners) {
  this.log = log;
  this.listeners = new ArrayList<>(listeners);
}

public void starting() {
  for (SpringApplicationRunListener listener : this.listeners) {
    listener.starting();
  }
}

public void environmentPrepared(ConfigurableEnvironment environment) {
  for (SpringApplicationRunListener listener : this.listeners) {
    listener.environmentPrepared(environment);
  }
}

public void contextPrepared(ConfigurableApplicationContext context) {
  for (SpringApplicationRunListener listener : this.listeners) {
    listener.contextPrepared(context);
  }
}

public void contextLoaded(ConfigurableApplicationContext context) {
  for (SpringApplicationRunListener listener : this.listeners) {
    listener.contextLoaded(context);
  }
}

public void started(ConfigurableApplicationContext context) {
  for (SpringApplicationRunListener listener : this.listeners) {
    listener.started(context);
  }
}

public void running(ConfigurableApplicationContext context) {
  for (SpringApplicationRunListener listener : this.listeners) {
    listener.running(context);
  }
}

public void failed(ConfigurableApplicationContext context, Throwable exception) {
  for (SpringApplicationRunListener listener : this.listeners) {
    callFailedListener(listener, context, exception);
  }
}

private void callFailedListener(SpringApplicationRunListener listener,
    ConfigurableApplicationContext context, Throwable exception) {
  try {
    listener.failed(context, exception);
  }
  catch (Throwable ex) {
    if (exception == null) {
      ReflectionUtils.rethrowRuntimeException(ex);
    }
    if (this.log.isDebugEnabled()) {
      this.log.error("Error handling failed", ex);
    }
    else {
      String message = ex.getMessage();
      message = (message == null ? "no error message" : message);
      this.log.warn("Error handling failed (" + message + ")");
    }
  }
}
}
```


```java
/**
 * ServletContainerInitializers (SCIs) are registered via an entry in the
 * file META-INF/services/javax.servlet.ServletContainerInitializer that must be
 * included in the JAR file that contains the SCI implementation.
 * <p>
 * SCI processing is performed regardless of the setting of metadata-complete.
 * SCI processing can be controlled per JAR file via fragment ordering. If an
 * absolute ordering is defined, the only those JARs included in the ordering
 * will be processed for SCIs. To disable SCI processing completely, an empty
 * absolute ordering may be defined.
 * <p>
 * SCIs register an interest in annotations (class, method or field) and/or
 * types via the {@link javax.servlet.annotation.HandlesTypes} annotation which
 * is added to the class.
 *
 * @since Servlet 3.0
 */
public interface ServletContainerInitializer {

    /**
     * Receives notification during startup of a web application of the classes
     * within the web application that matched the criteria defined via the
     * {@link javax.servlet.annotation.HandlesTypes} annotation.
     *
     * @param c     The (possibly null) set of classes that met the specified
     *              criteria
     * @param ctx   The ServletContext of the web application in which the
     *              classes were discovered
     *
     * @throws ServletException If an error occurs
     */
    void onStartup(Set<Class<?>> c, ServletContext ctx) throws ServletException;
}
```


```java
/**
 * {@link SpringApplicationRunListener} to publish {@link SpringApplicationEvent}s.
 * <p>
 * Uses an internal {@link ApplicationEventMulticaster} for the events that are fired
 * before the context is actually refreshed.
 *
 * @author Phillip Webb
 * @author Stephane Nicoll
 * @author Andy Wilkinson
 */
public class EventPublishingRunListener implements SpringApplicationRunListener, Ordered {
}
```

```java
/**
 * {@link Environment} implementation to be used by {@code Servlet}-based web
 * applications. All web-related (servlet-based) {@code ApplicationContext} classes
 * initialize an instance by default.
 *
 * <p>Contributes {@code ServletConfig}, {@code ServletContext}, and JNDI-based
 * {@link PropertySource} instances. See {@link #customizePropertySources} method
 * documentation for details.
 *
 * @author Chris Beams
 * @since 3.1
 * @see StandardEnvironment
 */
public class StandardServletEnvironment extends StandardEnvironment implements ConfigurableWebEnvironment {
}
```

```java
/**
 * An opinionated {@link WebApplicationInitializer} to run a {@link SpringApplication}
 * from a traditional WAR deployment. Binds {@link Servlet}, {@link Filter} and
 * {@link ServletContextInitializer} beans from the application context to the server.
 * <p>
 * To configure the application either override the
 * {@link #configure(SpringApplicationBuilder)} method (calling
 * {@link SpringApplicationBuilder#sources(Class...)}) or make the initializer itself a
 * {@code @Configuration}. If you are using {@link SpringBootServletInitializer} in
 * combination with other {@link WebApplicationInitializer WebApplicationInitializers} you
 * might also want to add an {@code @Ordered} annotation to configure a specific startup
 * order.
 * <p>
 * Note that a WebApplicationInitializer is only needed if you are building a war file and
 * deploying it. If you prefer to run an embedded web server then you won't need this at
 * all.
 *
 * @author Dave Syer
 * @author Phillip Webb
 * @author Andy Wilkinson
 * @since 2.0.0
 * @see #configure(SpringApplicationBuilder)
 */
public abstract class SpringBootServletInitializer implements WebApplicationInitializer {
}
```

## Conclustions

- 몇 가지 code를 따라가봤지만 구체적인 내용을 아직 정확히 파악하지는 못했다.
- Reactive쪽도 살펴보는 것이 좋아 보인다.