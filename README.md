<h1>GGYM</h1>

언제 어디서나 간편하게 웹 사이트에서​
헬스장 회원권이나 수업 횟수권을 찜(GGYM) 할 수 있다는 뜻입니다.

<br>
<h2>사용 스택</h2>

<h3>Front-end</h3>

react.js / bootstrap / styled-component / redux / axios / quill / firebase 

<h3>Back-end</h3>

java / springboot / oracle / mybatis / tomcat / kakaopay

<br>
<h2>핵심 기술</h2>

1. 리액트 라우터 돔

    싱글 웹 페이지 구현으로 빠른 페이지 이동과 좋은 사용자 경험을 만들 수 있었습니다.

2. Kakao Pay API
  
    사람들이 많이 이용하는 Kakao Pay 사용으로 결제에 대한 접근성을 높였습니다.

3. Fire base API

    계정에 대한 인증을 구글에 이관함으로써 회원관리가 쉬워지며 보안성이 높아졌습니다.

4. 자유로운 게시판
  
    공지사항/FAQ/QnA/리뷰/양도 게시판으로 세분화하여 원하는 정보를 찾기 쉽게 하였습니다.

5. 이용권 구매 및 양도

    헬스장에 가서 직접 구입하는 것이 아닌 웹사이트에서 쉽게 수입하고 양도 과정을 간편하게 구현함으로써 금액적 부담감을 줄이며 신규 회원의 유입을 늘릴 수 있습니다.

<br>
<h2>DB 구조</h2>

<br>

![db 구조](https://github.com/user-attachments/assets/ee73afeb-73f6-4291-87eb-6c56f9e6bf16)
<br>

테이블간 적절한 관계를 맺어 추후 성능을 최적화할 수 있도록 설계하였습니다.

<br>
<h2>화면 설명</h2>

<h3>SPA</h3>

<br>

![0 spa 설명](https://github.com/user-attachments/assets/edceef10-c0c3-420c-b466-ec86c702e4f3)
<br>

리액트 라우터 돔을 이용하여 SPA(Single Page Application)를 구현했고 페이지 이동시 새로고침 없이 자연스럽게 이어지며 좋은 사용자 경험을 이끌었습니다.
<br>
다만 리액트 CSR(Client Side Rendering)의 한계상 처음 html은 빈 화면이었기 때문에 seo 에 큰 감점이 된다는 것을 알았고 
<br>
해당 문제로 SSR(Server Side Rendering)의 필요성을 알게되는 좋은 계기가 되었습니다.

<br>
<h3>회원가입</h3>

<br>

![1 회원가입 설명](https://github.com/user-attachments/assets/1b014bb1-e847-4e22-87ef-147d63e823ef)
<br>

<hr/>
회원가입같은경우 잘못된 값이 들어가지않도록 프론트와 서버단에서 검증이 들어갔습니다.
<br>
다음의 postcode api를 이용하여 간단하게 주소 입력을 할 수 있도록 하였습니다.
<br>
로그인의 경우는 믿을 수 있는 firebase에 이관하여 db에는 유저의 민감한 정보를 제외한 최소한에 정보만을 저장할 수 있었습니다.

<br>

![2 이메일 인증](https://github.com/user-attachments/assets/26c2fb06-491f-4dcf-bbab-7820acbe6588)
<br>

이메일 인증을 통해 무분별한 회원가입을 막고 사이트는 인증된 유저만 사용할 수 있도록 하였습니다.

<br>
<h3>커뮤니티</h3>

<br>

![3 qna 설명](https://github.com/user-attachments/assets/450030f9-c577-4c4a-95f5-4550fd548202)
<br>

커뮤니티의 경우 리뷰게시판, QnA게시판, 양도게시판이 있으며 각 게시판의 성격을 고려하여 DB 테이블을 분리했습니다.
<br>
웹에디터의 경우 Quill을 이용하여 자유로운 글작성 및 사진첨부가 가능하도록 구현되었습니다.
<br>

![4 qna2](https://github.com/user-attachments/assets/d9cbde4e-2132-4376-b8d4-bb7896a9c18f)
<br>

QnA게시판은 일반적인 게시판과는 다르게 비밀글 및 태그를 지정할 수 있고 관리자의 답변을 받을 수 있습니다.

<br>
<h3>이용권 결제</h3>

<br>

![5 결제 설명](https://github.com/user-attachments/assets/df645a43-0c9a-4fab-bb6e-1732e8506e8f)
<br>

날짜를 지정해 회원이 원하는 날짜에 맞춰 여러 이용권을 구매할 수 있습니다.
<br>
카카오페이 TEST API를 이용하여 결제 프로세스를 구현했으며 간단하게 사이트내에서 구매가 가능해졌습니다.

<br>
<h3>이용권 양도</h3>

<br>

![6 양도설명](https://github.com/user-attachments/assets/ce8a1be1-484f-4781-a356-3499e9a27486)
<br>

회원은 구매한 이용권을 이용하여 양도 게시판에서 글을 작성할 수 있습니다.
<br>
댓글을 단 회원 중 한명을 선택해 결제가 진행되면 양도가 이루어지고 해당 게시글은 잠기게 됩니다.

<br>
<h2>후기</h2>

혼자서 프로젝트를 진행하게 되어 확실히 어려운 부분이 많았습니다.
<br>
시간을 단축하기 위해 코드를 가져와서 적용을 해도 생각대로 되는 것은
극히 드물었고 수많은 시행착오를 격어야만 쓸 수 있었습니다. 
<br>
그럼에도 일련의 과정을 거치고 기술이 작동할 때의 성취감 덕분에 
프로젝트를 계속 할 수 있었던 것 같습니다. 
<br><br>
나름대로 재활용할 것을 생각하며 코드를 작성했지만 프로젝트가 커지면서 
시간에 쫓겨 스파게티성 코드를 작성하여 다듬지 못하거나 시간상 문제로
포기한 기술들이 있는 것은 아쉬운 부분입니다. 
<br>
그래도 할 수 있는 부분을 차근차근 해결해가며 최선을 다했고 
보여드릴 수 있는 결과물을 냈기 때문에 후회는 없습니다. 

