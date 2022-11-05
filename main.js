'use strict';


// Make navbar tranparent when it is on  top

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

  navbarMenu.classList.remove('open');
  // console.log(event.target.dataset.link);
  // 우리가 가려고 하는 scrollto는  쿼리 셀렉터를 이용해서 link 를 받아와서
  //스크롤투에  scrollIntoView() 호출
  
  // 중복이 되어 삭제
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: 'smooth' });

  // 간편하게
  scrollIntoView(link);
  // console.log(scrollTo);
  selectNavItem(target);
});


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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


// Projects (filter)
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  // dataset filter 가 없다면 => false 가 undefined 과 비슷
  // 혹은 (||) e.target 에 있는 parentNode.dataset.filter 값에 있는 쓰겠다. (개발자 도구에서 디버깅해서 확인!)
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  // filter 가 널이면 아무것도 해주지 않을 거고
  if(filter == null) {
    return;
  }



  // Remove selection from the previous item and select the new one.
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  // 그냥 타겟에 셀렉을 하는게 아니라 
  // span 에다가 셀렉이 되어 에러
  // const 타겟에 e.target에 클릭된 노드네임이 버튼이면 e.target 을 쓰고
  // 만약에 버튼이 아니며 (span 인 경우) e.targer에 있는 parentNode; 타겟을 지정
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');





  // 버튼이 클릭이 되면 프로젝트 컨테이너 자체에 클래스 추가 -> anim-out 등록이 되면 붐 하고 나갈 수 있기 
  projectContainer.classList.add('anim-out');

  // 일정시간이 지나면  클래스 애니메이션 아웃을 없애주기 -> 0.3초가 지나면 -> 우리가 등록한 ->애니매에션 아웃 없애기
  setTimeout(()=>{  // 브라우저야 0.3 초뒤에 실행해줘 전달만 해놓고 블록을 끝내는것을 의미!
    // console.log(filter);
  // project 안보이게 하기 -> 각각 하나당 번걸아서 (forEach) 하나씩 프로젝트를 받아온다
  // forEach = for(let project of projects) = for(let i=0; i < projects.length; i++) {}
  projects.forEach((project) => {
    console.log(project.dataset.type);
    // 프로젝트 마다 돌면서 
    // 필터가 전부다 보여줘야되는 all(*)이거나 아니면 필터가 프로젝트에 있는 데이터셋 값이 타입이 같으면
    // 프로젝트 클래스에 추가해 줄거다!! 
    if (filter === '*' || filter === project.dataset.type) {
      // 매칭이 되면 보여줘야되니깐 안보여주는 클래스를 빼고
      project.classList.remove('invisible');
      // 타입이 필터에 해당이 안되면 안보여져야 하니깐 안보여쟈되는 클래스를 등록해준다!!
    } else {
      project.classList.add('invisible');
    } 
  }); 
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// console.log(`----------------------------`);
  // for(let project of projects) {
  //   console.log(project);

  // }

  // console.log(`----------------------------`);
  // let project;
  // for(let i = 0; i < projects.length; i++) {
  //   project = projects[i];
  //   console.log(project);

  // }



// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver 를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다. 



// 배열에 빙글빙글 돌면서 각각의 아이디를 섹션 돔요소로 변환하는 새로운 배열을 만드는 거 => map
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];


// 새로운 변수인 sections 만들어서 섹션아이디를 빙글빙글 돌면서 각각의 아이디 문자열을 해당하는 요소를 받아옴
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
  document.querySelector(`[data-link="${id}"]`)
);
console.log(sections);
console.log(navItems);


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');     // 액티브를 먼저 지우고
  selectedNavItem = selected;      // 할당해주고
  selectedNavItem.classList.add('active');        // 액티브 다시해주기
}



// 가장 쉬운 메소드로 추출
// selector 만 추가하면 이동할 수 있도록 만들거다
// selector 를 주면 selector 에 맞는 요소를 찾아서 스무스하게 이동하는 함수 하나 만든것임
// 호출만 하면 될 수 있도록
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionId.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};


const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // console.log(entry.target);
    // 진입하지 않을 때 (즉, 빠져나갈 때) -> entry가 빠져나갈 때 타겟은 빠져나가는 섹션  && intersectionRatio가 무조건 0 이상 처리
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // console.log(entry);
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // console.log(index, entry.target.id);
      // 엔트리에 바운딩크라이언트렉에 y좌표가 마이너스라면 => 스크롤링이 아래로 되어서 페지가 올라옴
      if(entry.boundingClientRect.y < 0) {
        // 페이지가 올라오는 경우라면 하나 증가하는 바로 그 다음 것이 
        selectedNavIndex = index + 1;
      } else {
         // 내려가는 경우라면 y가 플러스인 경우에는
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));


window.addEventListener('wheel', () => {
  // 만약에 스크롤된 포지션 y가 0이라면 (즉, 제일 위에 있다면)
  if(window.scrollY === 0) {
    selectedNavIndex = 0;    // 0으로 설정!
    // scrollY + innerHeight  body.clientHeight 가 동일 하다면 (즉, 제일 밑으로 도달했다면)
  } else if (
    Math.round (window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    // selectedNavIndex 를 navItems에 배열에 있는 제일 마지막 인덱스를 가르키면 된다.
    selectedNavIndex = navItems.length- 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

