---
title: "Decomposition Strategy"
metaTitle: "Decomposition Strategy"
metaDescription: "Decomposition Strategy"
---

## 4 + 1 view model

- 어플리케이션을 바라보는 여러가지 관점을 정의한 내용입니다.
- 각 뷰는 아래와 같습니다.
  - Logical view: 상속, 연관, 의존 등 클래스와 패키지 사이의 관계를 말합니다.
  - Implementation view: 빌드 시스템의 결과물, 코드, 컴포넌트 및 이 컴포넌트 모듈 간의 조합 관계를 의미합ㄴ디ㅏ.
  - Process view : 런타임 컴포넌트, 즉, 개별 프로세스와 IPC를 통해 프로세스간 관계를 나타냅니다.
  - Deployment view: 프로세스가 머신에 매핑되는 방법을 보여줍니다. 머신 및 프로세스 간의 관계를 네트워킹으로 표현 합니다.
  - 시나리오 (+1) : 특정 뷰 내에서 아키텍쳐 요소가 협동하여 요청을 처리하는지 보여줍니다.

## 어플리케이션의 요건

- 기능 요건: 기능적으로 구현하는 것을 의미
- 서비스 품질 요건: 응답시간, 확장성, 신뢰성 등등

## 아키텍쳐 스타일

- 계층화 아키텍쳐
  - 구조: 아래와 같이 3개의 계층으로 구별됩니다.
    - Presentation layer: Controller
    - Business logic layer: Service
    - Persistence layer: Repository
- 육각형 아키텍쳐 스타일
  - 구조
    - 인바운드 어댑터
    - 아웃바운드 어댑터
    - Port
  - 예시
    - 다음의 [링크](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)에서 잘 정리되어 있습니다.

## Service란 무엇인가?

- 어떤 기능이 구현되어 단독 배포가 가능한 컴포넌트를 의미합니다.
- Command와 Query로 구별 됩니다.

## Microservice Architecture란?

다음 3단계 프로세스를 통해 정의합니다.

1. 어플리케이션의 요건을 핵심 요청으로 추상화합니다.
2. 해당 요청을 서비스로 나누어 분해 할지를 결정합니다.
   - 고려사항: 네트워크 지연, consistency
3. 서비스별로 API를 정의합니다.

### Application architecture definition process

1. 도메인 모델 정의
   1. Scenario 정의
   2. Doamin 정의
   3. Depenedency 정의
2. System 작업 정의
   1. Command, Query 두 단계로 나누어서 정의
3. 서비스 정의
   1. 비즈니스 능력 패턴별 분해
   2. 하위 도메인 패턴별 분해
      1. bounded context로 분해

Tips

1. Constraints를 항상 고려해야 합니다. (Network latency, Availability, Consistency)
2. Consistency의 경우 기존에는 2PC를 많이 사용했으나, Microservice에서는 Saga pattern이 유명합니다.
3. 만능 클래스는 회피합니다. : 모든 코드 전반에 쓰이는 만능 클래스는 지양하며 분해를 통해서 적합한 단위로 분해할 수 있게 합니다.

- [마이크로 서비스 패턴](https://ridibooks.com/books/754028054?_s=instant&_q=%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C+%EC%84%9C%EB%B9%84%EC%8A%A4+%ED%8C%A8%ED%84%B4)