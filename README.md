# LivelyWallpaper_NetworkMonitoring
LivelyWallPaper를 활용한 네트워크 모니터링 HTML
<img width="1317" height="893" alt="image" src="https://github.com/user-attachments/assets/3aae4765-302e-47f8-9329-9d2b5f4693ab" />


이미지 속의 사이버펑크틱한 **X-PacketRay Scanner** 대시보드를 GitHub에 멋지게 공유할 수 있도록, 시각적으로 매력적이고 기술적인 디테일이 살아있는 `README.md` 템플릿을 작성해 드립니다.

이 프로젝트의 세련된 UI와 "실시간 트래픽 분석"이라는 컨셉을 강조하는 데 초점을 맞췄습니다.

---

# 📟 X-PacketRay Scanner // Professional Edition

> **"Visibility is the first line of defense."** > **X-PacketRay**는 미래지향적인 사이버 보안 인터페이스를 테마로 한 **Lively Wallpaper** 전용 인터랙티브 라이브 배경화면입니다. 실시간 하드웨어 리소스 모니터링과 딥 패킷 분석(DPI) 스트림 시뮬레이션을 통해 데스크탑에 하이엔드 보안 관제 센터의 감성을 더합니다.

---

## ✨ Key Features (주요 기능)

* **⚡ Real-time DPI Stream:** TCP, UDP, TLS 1.3, HTTP/3 등 다양한 프로토콜의 패킷 흐름을 실시간 시뮬레이션합니다.
* **📊 Hardware Load Monitor:** 시스템의 CPU 사용량과 RAM 할당 상태를 Lively API를 통해 실제 데이터와 연동하여 시각화합니다.
* **🛡️ Threat Detection System:** 비정상적인 접근(SQL Injection, Brute Force 등) 탐지 시 즉각적인 시각적 경고(Flash Red)를 발생시킵니다.
* **🖥️ Multi-View Dashboard:** * `Dashboard`: 종합 관제 화면
* `Analysis`: 트래픽 통계 및 레이턴시 분석
* `Threats`: 탐지된 위협 로그 확인
* `System`: K3s 클러스터 및 스토리지 진단 상태


* **🖱️ HUD Interactive Cursor:** 화면을 따라다니는 커스터마이징된 전용 HUD 커서 효과.
* **🚀 Cinematic Boot Sequence:** 시스템 구동 시 하드웨어 무결성을 검사하는 몰입감 넘치는 부팅 시퀀스 제공.

---

## 🛠 Tech Stack (기술 스택)

* **Frontend:** HTML5, CSS3 (Flexbox/Grid, Keyframe Animations)
* **Scripting:** Vanilla JavaScript (ES6+)
* **Integration:** [Lively Wallpaper API](https://github.com/rocksdanister/lively) (System Information Handshake)
* **Design:** Futuristic Cyberpunk UI / Dark Mode Optimized

---

## ⚙️ Installation & Usage (설치 및 사용법)

1. **Lively Wallpaper 설치:** 먼저 [Lively Wallpaper](https://rocksdanister.github.io/lively/)가 시스템에 설치되어 있어야 합니다.
2. **파일 다운로드:** 이 저장소의 모든 파일을 다운로드하거나 클론합니다.
3. **적용하기:** * Lively Wallpaper를 실행합니다.
* `Library` 탭에서 `Add Wallpaper`(+) 버튼을 누릅니다.
* `index.html` 파일을 선택하거나 폴더 전체를 드래그 앤 드롭합니다.


4. **시스템 연동:** Lively 설정에서 '시스템 정보' 권한을 허용하면 실제 CPU/RAM 데이터가 대시보드에 반영됩니다.

---

## 📂 Project Structure (프로젝트 구조)

* `index.html`: UI 구조 및 레이아웃 정의
* `CSS (Internal)`: 네온 글로우 효과, 스캔라인 애니메이션, 하이엔드 모니터 스타일링
* `JavaScript (Internal)`:
* `runBoot()`: 부팅 시퀀스 엔진
* `createPacket()`: 가상 트래픽 생성 로직
* `updateSystemData()`: Lively API 수신 및 DOM 업데이트



---

## 📝 Configuration (사용자 설정)

`index.html` 소스 코드 상단의 `:root` 변수를 수정하여 테마 색상을 변경할 수 있습니다.

```css
:root {
    --cyan: #00f2ff;   /* 메인 테마 색상 */
    --amber: #ffcc00;  /* 경고 및 상태 색상 */
    --red: #ff3e3e;    /* 위협 감지 색상 */
}

```

---


## 1. 하드웨어 데이터 수정 (CPU & RAM)

이 부분은 `updateSystemData` 함수 내에서 관리됩니다. Lively Wallpaper API로부터 실제 데이터를 받지 못할 경우를 대비한 **시뮬레이션 데이터**와 **실제 데이터 처리** 로직이 공존합니다.

### 📍 수정 위치: `updateSystemData(data)` 함수

```javascript
function updateSystemData(data) {
    if (currentView !== 'dashboard') return;
    
    // [A] 시뮬레이션 데이터: Lively가 꺼져있을 때 작동하는 기본값
    const stats = data ? JSON.parse(data) : { 
        CurrentCpu: 20 + Math.random() * 40, // 20~60% 사이 랜덤 CPU 값
        CurrentRamAvail: 4500,               // 가용 RAM (MB)
        TotalRam: 16000,                     // 전체 RAM (MB)
        
        // [B] 상단 프로세스 목록: 여기서 프로세스 이름과 리소스를 수정 가능
        TopProcess: [
            {Name:"ntopng", Cpu:15.2, Ram:1.2}, 
            {Name:"k3s-server", Cpu:8.4, Ram:0.9},
            // ... 생략 ...
        ]
    };

    // [C] 데이터 계산 로직
    const cpu = stats.CurrentCpu;
    const ram = (1 - (stats.CurrentRamAvail / stats.TotalRam)) * 100;
    
    // ... 실제 UI 반영 코드 ...
}

```

* **수정 팁:**
* `CurrentCpu`의 랜덤 범위를 조정하여 기본 부하 상태를 바꿀 수 있습니다.
* `TopProcess` 배열의 객체들을 수정하면 대시보드 왼쪽 하단에 표시되는 프로그램 이름들을 내 입맛대로 바꿀 수 있습니다.



---

## 2. 패킷 분석 데이터 수정 (DPI Stream)

이 부분은 어떤 프로토콜이 있는지 정의하는 **배열**과, 이를 무작위로 생성하는 **함수**로 나뉩니다.

### 📍 수정 위치 1: `protocols` 배열

화면에 나타날 프로토콜 종류와 색상 클래스, 포트 번호를 정의합니다.

```javascript
const protocols = [
    {n:"TCP", c:"TCP", p:[80, 443, 8080]}, 
    {n:"UDP", c:"UDP", p:[53, 123]}, 
    {n:"TLS1.3", c:"TLS1\.3", p:[443]}, 
    {n:"DNS", c:"DNS", p:[53]}, 
    {n:"HTTP/3", c:"HTTP\/3", p:[443]}
];

```

* **수정 팁:** 새로운 프로토콜(예: `SSH`, `FTP`)을 추가하고 싶다면 이 배열에 객체를 추가하세요.

### 📍 수정 위치 2: `createPacket()` 함수

실제 패킷 로그 한 줄 한 줄을 생성하는 핵심 로직입니다.

```javascript
function createPacket() {
    // [A] 위협 탐지 확률 설정 (현재 4% 확률로 위협 발생)
    const isThreat = Math.random() > 0.96; 

    const data = {
        time: new Date().toLocaleTimeString().split(' ')[1],
        proto: p.n,
        // [B] 소스 IP 수정: 특정 대역폭으로 고정하거나 랜덤 범위를 조정 가능
        src: isThreat ? "185.12.4.2" : `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.142`,
        // [C] 목적지 IP 수정: 내 서버나 특정 장비 IP로 고정 가능
        dst: "10.0.0.42", 
        port: p.p[Math.floor(Math.random()*p.p.length)],
        len: size,
        threat: isThreat
    };
    // ... 생략 ...
}

```

---

## 3. 요약 가이드 (README용)

GitHub 사용자들이 한눈에 볼 수 있도록 아래 표를 `README.md`에 추가해 보세요.

| 구분 | 소스 코드 위치 | 수정 가능 항목 |
| --- | --- | --- |
| **시스템 정보** | `updateSystemData()` | CPU/RAM 기본값, 프로세스 이름 목록 |
| **네트워크 프로토콜** | `const protocols` | 표시할 프로토콜 명칭, 관련 포트 번호 |
| **패킷 트래픽** | `createPacket()` | 소스/목적지 IP 대역, 위협 탐지(Threat) 발생 확률 |
| **부팅 텍스트** | `const bootLines` | 시스템 시작 시 출력되는 터미널 메시지 내용 |

---

## 4. UI 색상 커스텀 (CSS 변수)

디자인 감각이 있는 사용자들을 위해 CSS 변수 위치도 언급해 주는 것이 좋습니다.

### 📍 수정 위치: `<style>` 내 `:root`

```css
:root {
    --bg: #01080b;       /* 전체 배경색 */
    --cyan: #00f2ff;     /* 메인 강조색 (포인트 컬러) */
    --amber: #ffcc00;    /* 주의/경고색 */
    --red: #ff3e3e;      /* 치명적 위협색 */
}

```



---

**추가로 수정하고 싶은 부분이나 더 강조하고 싶은 기능이 있으신가요?**
