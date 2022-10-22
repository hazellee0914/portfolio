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
 