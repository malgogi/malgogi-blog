---
title: "HandlerMethodArgumentResolver"
metaTitle: "HandlerMethodArgumentResolver"
metaDescription: "HandlerMethodArgumentResolver"
---

## Description

## Step

### 1. Create annotation

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface Checked {
}
```

### 2. Create domain

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String userName;
}
```

### 3. Create HandlerMethodArgumentResolver

```java
@Component
@Slf4j
public class CheckedUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Checked.class)
                && parameter.getParameterType().equals(User.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String userName = webRequest.getHeader("X-Ma-UserName");
        return User.builder().userName(userName).build();
    }
}
```

### 4. Register resolver

```java
@Configuration
public class MalgogiConfiguration implements WebMvcConfigurer {
    @Autowired
    private CheckedUserArgumentResolver checkedUserArgumentResolver;

    ...

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(checkedUserArgumentResolver);
    }
}
```

### 5. Implement Controller

```java
@RestController
@RequestMapping("/v1/user")
@Slf4j
public class UserController {

    @GetMapping
    public Callable<User> getUser(@Checked User user) {
        return () -> user;
    }
}
```