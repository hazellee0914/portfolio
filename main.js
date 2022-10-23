'use strict';


// Make navbar tranparent when it is on the top

// 변수 navbar 선언 => 쿼리 셀렉터를 이용해서 우리의 element 요소를 받아올건데 => navbar는 id로 되어있었음 
const navbar = document.querySelector('#navbar');
//navbar height 하려면 높이를 변수를 이용해서 할당!!
// mdn => navbar. getBoundingClientRect 호출하면 여기 height 받아오면
const navbarHeight = navbar.getBoundingClientRect().height;

// 이벤트를 등록 => 스크롤이 될 때마다 우리가 등록한 이 함수 호출해줘! 아무런 인자 받지 않고
document.addEventListener('scroll', () => {
  // console.log(window.scrollY);
  // console.log(`navbarHeight: ${navbarHeight}`);
  // 윈도우에 스크롤 Y가 navbar 보다 크면 
  // 즉, 스크롤잉이 navbar height 이상으로 스크롤이 발생하면 
  //navbar 에 있는 클래스 리스트를 추가해줄건데 => navbar--dark 즉 navbar 가 어두워지게
  // 어느정도 내려가 진하게 해줄거야 의미
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});



// Handle scrolling when tapping on the navbar menu

// 쿼리셀렉터를 이용해서 navbar__menu 요소를 navbarMenu 할당한다.
const navbarMenu = document.querySelector(`.navbar__menu`);
// navbarMenu에 이벤트를 추가 -> 클릭이 되면 => 등록한 함수 호출
// 보통은 클릭이 되면 클릭한 이벤트가 들어오게 된다.
navbarMenu.addEventListener('click', (event) => {
  // console.log(event.target.dataset.link);
  // 타겟이라는 변수를 할당하고
  const target = event.target;
  // 링크라는 타겟의 데이터 셋에 있는 링크
  const link = target.dataset.link;
  // 링크가 없다면 즉 널이거나 undefined 이면 아무것도 하지않고
  // 널이 아닌 경우에만 출력
  if(link == null) {
    return;
  }
  // console.log(event.target.dataset.link);
  // 우리가 가려고 하는 scrollto는  쿼리 셀렉터를 이용해서 link 를 받아와서
  //스크롤투에  scrollIntoView() 호출
  
  // 중복이 되어 삭제
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: 'smooth' });

  // 간편하게
  scrollIntoView(link);
  // console.log(scrollTo);
});




// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', (event) => {
  // 호출만 하면 될 수 있도록
  // selector 는 아이디에 컨택
  scrollIntoView('#contact');
});



// Make home slowly fade to tranparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1-window.scrollY/ homeHeight;

  // homeHeight 이 800 이면,  스크롤잉이 0이고, 즉, 0 / 800 = 0, 1-0 = 1 ,  => 투명도 : 1
  // 스크롤이 점점 되서 400이면, homeHeight 800 이니깐 즉, 400/800 = 0.5 , 1 - 0.5 = 0.5  => 반정도 투명해짐
  // 스크롤이 800 이 되면, homeHeight 800 이니깐 죽 , 800 / 800 = 1, 1-1 = 0, => 완전 투명해짐
  // 점점 커져서 1600 이면 , 1600 / 800 = 2, 1- 2 = -1 => 완전 불투명
  // console.log(1-window.scrollY/ homeHeight);
}); 




// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {
  // home에서 반정도 올라가면 보이게 할거다
 if(window.scrollY > homeHeight / 2) {
  arrowUp.classList.add('visible');
  // 스크롤이 위에 있는 경우라면 remove
 } else {
  arrowUp.classList.remove('visible');
 }
});


// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// 가장 쉬운 메소드로 추출
// selector 만 추가하면 이동할 수 있도록 만들거다
// selector 를 주면 selector 에 맞는 요소를 찾아서 스무스하게 이동하는 함수 하나 만든것임
// 호출만 하면 될 수 있도록
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}