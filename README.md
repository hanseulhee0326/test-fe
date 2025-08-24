<br/><br/><br/><br/><br/>

<div align=center>

# <b>TaskFlow</b>

<a href="#Introduction">요구사항 분석 결과</a> •
<a href="#Pages">구현 내용</a> •
<a href="#Ai">AI 도구 활용 내역</a>

</div>

<br/><br/><br/><br/><br/>

<div id="Introduction">

## 📋 요구사항 분석 결과

### 도출한 기능 요구사항 목록

1. **회원가입 / 로그인 / 로그아웃**

   - <span style="color: #0287C0; font-weight: bold">email, password</span>로 사용자 계정 생성 및 인증이 가능합니다.

   - 폼 유효성 검사 및 에러 메시지를 적용하였습니다.

   - 로그인 후 세션 관리와 로그아웃 기능을 적용하였습니다.

2. **할 일 작성**

   - <span style="color: #0287C0; font-weight: bold">제목, 설명, 카테고리 선택, 기한, 우선순위</span> 입력으로 할 일 작성이 가능합니다.

   - 바쁜 직장인으로서, <span style="color: #0287C0; font-weight: bold">음성 입력</span>을 지원하였습니다.

   - 빠른 생성을 위해 불필요한 항목들은 <span style="color: #0287C0; font-weight: bold">skip</span>이 가능합니다. 

3. **할 일 목록 관리**

   - 등록된 할 일 목록을 확인할 수 있습니다.

   - 순서 변경 버튼으로<span style="color: #0287C0; font-weight: bold"> 카테고리 순서 정렬</span> 을 사용자가 변경할 수 있습니다.

   - 할 일 <span style="color: #0287C0; font-weight: bold">수정</span>이 가능합니다.

   - 완료한 할 일은 미완료된 할 일의 아래로 정렬되며 한 눈에 파악할 수 있도록 ui를 달리하였습니다.


4. **할 일 목록 그래프 통계**

   - 시각적으로 표현하기 위한 카테고리별 <span style="color: #0287C0; font-weight: bold">퍼센트 진행률과 원형 그래프</span>를 볼 수 있습니다.

5. **할 일 상세보기**

   - 개별 할 일 내용을 확인할 수 있습니다.

   - <span style="color: #0287C0; font-weight: bold">완료, 삭제 기능</span>이 구성되어 있습니다.

6. **다크모드**

    - 토글을 통해 사용자가 <span style="color: #0287C0; font-weight: bold">라이트모드, 다크모드</span>를 설정할 수 있습니다.

7. **앱사용 패턴**

   - 출퇴근 시간과 점심시간에 사용하는 사용자를 위해 <span style="color: #0287C0; font-weight: bold">시간에 따른 관련 문구</span>가 보여집니다.

<br/><br/>

### 우선순위 및 구현 범위

- **1순위**: 회원가입/로그인/로그아웃, 할 일 CRUD

- **2순위**: 그래프, 음성 입력

- **3순위**: 알람, 검색, 통계 (일별, 주별, 월별), 반복되는 할일 설정 및 자동 생성, 설정페이지

**실제 구현 범위**: 1순위 + 2순위

요구사항을 보고 여러 아이디어가 떠올랐으나, 시간 상 1, 2순위 기능이 적용되어 있습니다.


<br/><br/>

## 기술스택

- react-native cli

- typescript

- zustand

: 전역 상태 관리를 간단하게 구현할 수 있다는 점에서 사용하였습니다.

- emotion

: 스타일을 컴포넌트 단위로 관리할 수 있으며 테마 적용과 동적 스타일링이 간편하다는 점에서 사용하였습니다. 

---

<br/><br/>

<div id="Pages">

# 🛠 구현 내용

## 구현한 기능 목록

### 1. **회원가입 / 로그인 / 로그아웃**

### **`회원가입`**

<img src="https://github.com/user-attachments/assets/fa252614-c8d1-4b05-973f-a598f8b1a857" width="40%" />

<br />

### **`로그인 / 로그아웃`**

<img src="https://github.com/user-attachments/assets/8661f799-5491-456f-93e1-5a4f5e992d37" width="40%"  />


<br />


### 2. **할 일 작성**

### **`텍스트 입력, 음성 입력`**

<div style="display: flex; gap: 10;">
<img src="https://github.com/user-attachments/assets/a162e264-b540-4a9c-8fa4-0b5d12b50959" width="40%" />

 <img src="https://github.com/user-attachments/assets/985c40a2-fa16-451a-8977-bebc659ce9e3" width="40%" />
</div>

<br />

### 3. **할 일 목록**

<img src="https://github.com/user-attachments/assets/7609612d-13bf-421f-912b-f30cdb5af971" width="40%" />


<br />

### 4. **할 일 상세보기**

<img width="40%" alt="Image" src="https://github.com/user-attachments/assets/902dc937-93cc-4f6a-ae5a-45205c277a5e" />


<br />

### 5. **할 일 수정 및 삭제**


### **`수정 및 삭제`**

<div style="display: flex; gap: 10;">
<img src="https://github.com/user-attachments/assets/a6dc64ef-94ea-4d1b-8e54-572a028452d5" width="40%" />

<img src="https://github.com/user-attachments/assets/b26e718d-aad8-4b97-bdf4-262ddc841f8a" width="40%" />
</div>

<br />

### 6. **할 일 목록 그래프 통계**


### **`할 일 완료 및 그래프, 시간에 따른 문구`**

<div style="display: flex; gap: 10;">
 <img src="https://github.com/user-attachments/assets/9ed7d7b9-e91b-4a2d-a62b-4c23f620b24a" width="40%" />

<img src="https://github.com/user-attachments/assets/be9434d4-a95a-4dc1-ba19-91a823dd4396" width="40%" />

</div>

<br />

### 7. **다크모드**

<img src="https://github.com/user-attachments/assets/370b71ae-d6ba-40a6-99b9-cd58e64838a0" width="40%" />


---

<br/><br/>

<div id="Ai">

## 🤖 AI 도구 활용 내역

### 사용한 AI 도구

- ChatGPT: 설계 검토 및 로직 개선에 사용하였습니다.

### 활용 프로세스

- UI/UX 아이디어에 활용

- 일부 반복되는 컴포넌트 작성에 활용

- 동작 테스트 및 오류 수정에 활용


## 기타

이번 구현은 iOS 환경을 우선 대상으로 개발 및 테스트하였습니다.

Android 환경은 추후 대응 예정이므로, 사용 시 참고 부탁드립니다.

<br/><br/>

<p align="center">
<img width="15%" alt="logo" src="https://github-production-user-asset-6210df.s3.amazonaws.com/227088648/481375043-6289e32f-163d-4b97-b916-6187f9e2cd8c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250824%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250824T122349Z&X-Amz-Expires=300&X-Amz-Signature=c54a601bbe079409e2bb5fa4ba50b1429ad51c72519607d431c94560c8634584&X-Amz-SignedHeaders=host">
</p>