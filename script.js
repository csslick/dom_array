const main = document.getElementById('main')
const addUserBtn = document.getElementById('add_user')
const doubleBtn = document.getElementById('double')
const showMillionsBtn = document.getElementById('show_millions')
const sortBtn = document.getElementById('sort')
const calculateBtn = document.getElementById('calculate')

let userData = [];

//fetch random user and add money
function getRandomUser() {
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];
      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000),
      }

      userData.push(newUser)
      updateDOM()
    })
}

function updateDOM(recieveData = userData) {
  //
  main.innerHTML = `
    <h2><span>고객</span> 재산</h2> 
  `
  userData.forEach(function(item) {
    const el = document.createElement('div');
    el.classList.add('person');
    el.innerHTML = `
      <strong>${item.name}</strong> $${item.money.toLocaleString()}
    `;
    main.appendChild(el);

  })

}

function doubleMoney() {
  userData = userData.map(function(user) {
    user.money = user.money * 2;
    return user;
    // return { ...user, money: user.money * 2}
  })
  console.log(userData)
}

function sortByRich() {
  userData.sort(function(a, b) {
    return  b.money - a.money;
  })
  updateDOM();
}

function showMillions() {
  userData = userData.filter(function(user) {
    return user.money > 1000000;
  })
  updateDOM();
}

function calculateTotal() {
  // reduce(fnc, 초기값)
  const total = userData.reduce(function(prev, cur) {
    return prev + cur.money;
  }, 0)
  console.log(total)
  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3>합산금액: <strong>${total.toLocaleString()}</strong></h3>`;
  main.appendChild(totalEl);
}

// 이벤트 리스너
addUserBtn.addEventListener('click', function() {
  getRandomUser();
})

doubleBtn.addEventListener('click', function() {
  doubleMoney();
  updateDOM();
})

// 재산순으로 '정렬'
sortBtn.addEventListener('click', function() {
  sortByRich();
})

// 백만장자 filtering
showMillionsBtn.addEventListener('click', function() {
  showMillions();
})

// 합산
calculateBtn.addEventListener('click', function() {
  calculateTotal();
})