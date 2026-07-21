# REROLL — 라이브 오버레이 - 개발 중

방송 화면 위에 얹는 **채팅 · 후원 알림 · 목표 게이지** 오버레이와, 이를 실시간으로 제어하는 대시보드입니다.
OBS의 브라우저 소스로 바로 사용할 수 있고, 후원이 몰려도 알림이 겹치지 않도록 순서대로 재생합니다.

## 주요 기능

- **다중 레이어 오버레이** — 채팅, 후원 알림, 목표 게이지를 각각의 레이어로 쌓아 하나의 화면으로 합성합니다.
- **후원 알림 큐** — 후원이 동시에 들어와도 한 번에 하나씩 순서대로 재생합니다. 알림이 재생 중이면 나머지는 대기했다가 이어서 나옵니다.
- **파생 상태 게이지** — 후원 이벤트가 쌓일 때마다 목표 진행률을 다시 계산해 게이지에 반영합니다.
- **실시간 동기화** — 대시보드에서 보낸 이벤트가 미리보기와 오버레이에 곧바로 반영됩니다.
- **미리보기** — OBS에 넣기 전에, 방송 화면을 가정한 배경 위에서 오버레이가 어떻게 보이는지 확인합니다.

## 화면 구성

세 개의 화면(경로)으로 나뉩니다.

| 경로       | 역할                                                            |
| ---------- | --------------------------------------------------------------- |
| `/`        | 후원·채팅 이벤트를 보내고 목표를 설정하는 제어 대시보드         |
| `/preview` | 방송 화면을 가정한 배경 위에 오버레이를 얹어 미리 확인하는 화면 |
| `/overlay` | 배경이 투명한 실전 오버레이. OBS 브라우저 소스에 넣는 화면      |

`preview`와 `overlay`는 같은 오버레이를 공유하고, 배경이 있느냐 없느냐만 다릅니다.
대시보드에는 **미리보기 새 창** 열기와 **오버레이 URL 복사**(OBS에 넣을 주소) 버튼이 있습니다.

## 아키텍처

이벤트가 흐르는 방향은 단순합니다.

```
[대시보드]  --send()-->  useChannel (BroadcastChannel)  --onEvent-->  dispatch  -->  reducer
                                                                                     |
                                     { chatList, alertQueue, currentAlert, goalTotal, goalTarget }
                                                                                     |
                                                          +--------------------------+--------------------------+
                                                       [preview]                                          [overlay]
```

- 탭 사이의 전달은 **`useChannel` 훅 하나에 격리**했습니다. 대시보드는 `send`로 이벤트를 보내고, 미리보기·오버레이는 같은 훅으로 이벤트를 받아 `dispatch`합니다. **BroadcastChannel을 직접 다루는 곳은 이 훅뿐**이라, 나중에 전송 수단을 바꿔도 이 파일 하나만 교체하면 됩니다.
- 받은 이벤트는 **reducer** 하나가 처리합니다. 후원이 오면 큐에 넣고, 현재 재생 중인 알림이 없으면 큐에서 하나 꺼내고, 목표 합계를 더합니다.
- 상태를 **useReducer + Context**(`OverlayProvider`) 로 관리합니다. 이 규모에서는 별도 상태관리 라이브러리 없이 React 기본기로 충분하고, 실시간 상태 전이를 reducer에 모아두면 흐름이 한눈에 들어옵니다.

### 상태 모델

```ts
type OverlayEvent =
    | { type: "chat"; message: ChatMessage }
    | { type: "donation"; donation: Donation }
    | { type: "goal-target"; target: number }
    | { type: "reset" };

type OverlayState = {
    chatList: ChatMessage[];
    alertQueue: Donation[];
    currentAlert: Donation | null;
    goalTotal: number;
    goalTarget: number;
};
```

대시보드에서 온 `OverlayEvent`가 reducer를 거쳐 `OverlayState`가 됩니다. `currentAlert`가 비면 `alertQueue`에서 다음 항목을 꺼내 일정 시간 재생한 뒤(`alert-end`) 다시 비웁니다. 이 반복이 알림 큐의 핵심입니다.

## 기술 스택

- **Next.js + TypeScript** — 화면 세 개를 경로로 나누고 Vercel에 그대로 배포
- **Tailwind CSS** — 레이어 배치와 애니메이션 스타일
- **BroadcastChannel Web API** — 탭 간 실시간 전달 (네트워크 없이 동작). `useChannel` 훅 하나로 감싸 전송 수단을 갈아끼우기 쉽게 격리

## OBS 연동 (배포 이후에 가능)

1. 대시보드의 **오버레이 URL 복사** 버튼으로 주소를 복사 (예: `https://<배포주소>/overlay`)
2. OBS에서 소스 추가 → **브라우저**
3. **URL** 에 복사한 주소를 붙여넣기
4. 너비·높이를 방송 해상도에 맞춤 (예: 1920 × 1080)
5. 대시보드에서 이벤트를 보내면 방송 화면 위 오버레이가 실시간으로 반응
