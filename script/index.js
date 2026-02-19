"use strict";

console.log(`1. Слайдер изображений в секции destinations (50/50)
- на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20

- три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20

- анимации плавного перемещения для слайдера +10

2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап (50/50)

- логин попап соответствует верстке его закрытие происходит при клике вне попапа +25

- логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25

3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). (25/25)`);

const hamburgerItems = document.querySelectorAll('.hamburger_item')
const menuBurger = document.querySelector('.hamburger_list');
const openButton = document.querySelector('.menu_button');
const closeButton = document.querySelector('.hamburger_button');
const loginButton = document.querySelector('.login_button');
const accountButton = document.querySelector('.account_button');
const loginPopup = document.querySelector('.login_popup');
const signInForm = document.getElementById('signInForm');
const firstSliderImage = document.querySelector('.firstSlider_image');
const secondSliderImage = document.querySelector('.secondSlider_image');
const thirdSliderImage = document.querySelector('.thirdSlider_image');
const registrationProposalLink = document.querySelector('.registrationproposal_link');
const bigScreen = window.matchMedia('(min-width: 830px)');
const smallScreen = window.matchMedia('(max-width: 829px)');
let checkChanges = 0;

function toggleActive(element) {
  element.classList.toggle('active');
}

openButton.addEventListener("click", function () {
  toggleActive(menuBurger);
}, false);

closeButton.addEventListener("click", function () {
  toggleActive(menuBurger);
}, false);

if (hamburgerItems.length > 0) {
  hamburgerItems.forEach(item => {
    item.addEventListener("click", function () {
      toggleActive(menuBurger);
    })
  });
}

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(menuBurger);
  const withinButtonBoundaries = e.composedPath().includes(openButton);

  if (!withinBoundaries && !withinButtonBoundaries) {
    menuBurger.classList.remove('active');
  }
})

function togglePopupActive(element) {
  element.classList.toggle('active');
  popupReset();
}

loginButton.addEventListener("click", function () {
  togglePopupActive(loginPopup);
}, false);

accountButton.addEventListener("click", function () {
  togglePopupActive(loginPopup);
}, false);

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(loginPopup);
  const withinLoginButtonBoundaries = e.composedPath().includes(loginButton);
  const withinAccountButtonBoundaries = e.composedPath().includes(accountButton);

  if (!withinBoundaries && !withinLoginButtonBoundaries && !withinAccountButtonBoundaries) {
    loginPopup.classList.remove('active');
  }
})

function showRegisterInformation() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  alert(`Your email is "${email}"\nYour password is "${password}" (don't tell anyone)`);
}

function popupSwap() {
  if (checkChanges % 2 === 0) {
    document.querySelector('.login_popup_header').innerText = 'Create account';
    document.querySelector('.signInButton').innerText = 'Sign Up';
    document.querySelector('.swappingTextLeft').innerText = 'Already have an account?';
    document.querySelector('.swappingTextRight').innerText = 'Log in';
    document.querySelector('.login_popup_header').style.margin = '0 0 22px 0';

    hidePopupElements();
  } else {
    document.querySelector('.login_popup_header').innerText = 'Log in to your account'
    document.querySelector('.signInButton').innerText = 'Sign In';
    document.querySelector('.swappingTextLeft').innerText = "Don't have an account?";
    document.querySelector('.swappingTextRight').innerText = 'Register';
    document.querySelector('.login_popup_header').style.margin = '0 0 30px 0';

    showPopupElements();
  }

  checkChanges++;
}

function hidePopupElements() {
  document.querySelector('.login_facebook_button').classList.add('hide');
  document.querySelector('.login_google_button').classList.add('hide');
  document.querySelector('.orElement').classList.add('hide');
  document.querySelector('.passwordReminder').classList.add('hide');
}

function showPopupElements() {
  document.querySelector('.login_facebook_button').classList.remove('hide');
  document.querySelector('.login_google_button').classList.remove('hide');
  document.querySelector('.orElement').classList.remove('hide');
  document.querySelector('.passwordReminder').classList.remove('hide');
}

function popupReset() {
  if (checkChanges % 2 !== 0) {
    showPopupElements();
  }
  checkChanges = 1;
  popupSwap();
}

registrationProposalLink.addEventListener("click", popupSwap);

let sliderOrder = 2;

function cantTouch(item) {
  item.style.transition = 'all 0.3s ease';
  item.style.top = '-2px'

  setTimeout(function () {
    item.style.top = '2px'
  }, 100);

  setTimeout(function () {
    item.style.top = '0'
  }, 200);

  item.style.transition = 'none';
}

function controlPainterAdder(item) {
  document.querySelector('.control_first').classList.remove('control_painter');
  document.querySelector('.control_second').classList.remove('control_painter');
  document.querySelector('.control_third').classList.remove('control_painter');
  document.querySelector(item).classList.add('control_painter');
}

function AddImagesOpacity() {
  firstSliderImage.style.opacity = '0.95';
  secondSliderImage.style.opacity = '0.95';
  thirdSliderImage.style.opacity = '0.95';
}

function removeImagesOpacity() {
  firstSliderImage.style.opacity = '1';
  secondSliderImage.style.opacity = '1';
  thirdSliderImage.style.opacity = '1';
}

function changeImagesOrders(item) {
  if (item === firstSliderImage) {
    firstSliderImage.style.order = '2';
    secondSliderImage.style.order = '3';
    thirdSliderImage.style.order = '1';
  } else if (item === secondSliderImage) {
    firstSliderImage.style.order = '1';
    secondSliderImage.style.order = '2';
    thirdSliderImage.style.order = '3';
  } else if (item === thirdSliderImage) {
    firstSliderImage.style.order = '3';
    secondSliderImage.style.order = '1';
    thirdSliderImage.style.order = '2';
  }
}

function showSliderImage(item) {
  if (item === firstSliderImage) {
    firstSliderImage.classList.remove('img_hide');
    secondSliderImage.classList.add('img_hide');
    thirdSliderImage.classList.add('img_hide');
  } else if (item === secondSliderImage) {
    firstSliderImage.classList.add('img_hide');
    secondSliderImage.classList.remove('img_hide');
    thirdSliderImage.classList.add('img_hide');
  } else if (item === thirdSliderImage) {
    firstSliderImage.classList.add('img_hide');
    secondSliderImage.classList.add('img_hide');
    thirdSliderImage.classList.remove('img_hide');
  }
}

function addSliderImagesTransition() {
  firstSliderImage.style.transition = 'all 0.6s ease';
  secondSliderImage.style.transition = 'all 0.6s ease';
  thirdSliderImage.style.transition = 'all 0.6s ease';
}

function removeSliderImagesTransition() {
  firstSliderImage.style.transition = 'none';
  secondSliderImage.style.transition = 'none';
  thirdSliderImage.style.transition = 'none';
}

function resetSliderImagesLeftPosition() {
  firstSliderImage.style.left = '0';
  secondSliderImage.style.left = '0';
  thirdSliderImage.style.left = '0';
}

function addLowZindex(item) {
  item.classList.add('lowZIndex');
}

function removeSliderImagesZindex() {
  firstSliderImage.classList.remove('lowZIndex');
  secondSliderImage.classList.remove('lowZIndex');
  thirdSliderImage.classList.remove('lowZIndex');
}

function changeFirstImageOrder() {

  if (sliderOrder === 1 && bigScreen.matches) {
    cantTouch(firstSliderImage);
  }

  if (sliderOrder === 1 && smallScreen.matches) {
    changeSecondImageOrder();
    return;
  }

  if (sliderOrder !== 1) {
    controlPainterAdder('.control_first');
  }

  if (sliderOrder !== 1 && bigScreen.matches) {
    AddImagesOpacity();
    changeImagesOrders(firstSliderImage);
    showSliderImage(firstSliderImage);

    if (sliderOrder == 2 && bigScreen.matches) {
      addLowZindex(thirdSliderImage);

      firstSliderImage.style.left = '-860px';
      secondSliderImage.style.left = '-860px';
      thirdSliderImage.style.left = '1720px';
    }

    if (sliderOrder == 3 && bigScreen.matches) {
      addLowZindex(secondSliderImage);

      firstSliderImage.style.left = '860px';
      secondSliderImage.style.left = '-1720px';
      thirdSliderImage.style.left = '860px';
    }

    sliderOrder = 1;

    setTimeout(function () {
      addSliderImagesTransition();
      resetSliderImagesLeftPosition();
    }, 100);

    removeSliderImagesTransition();

    setTimeout(function () {
      removeSliderImagesZindex();
      removeImagesOpacity();
    }, 800);
  }

  if (sliderOrder !== 1 && smallScreen.matches) {

    addSliderImagesTransition();

    if (sliderOrder == 2) {
      firstSliderImage.style.left = -document.documentElement.clientWidth + 'px';
      secondSliderImage.style.left = '0'

      setTimeout(function () {
        secondSliderImage.style.left = document.documentElement.clientWidth + 'px';
      }, 0);

      setTimeout(function () {
        showSliderImage(firstSliderImage);

        setTimeout(function () {
          firstSliderImage.style.left = -document.documentElement.clientWidth + 'px';
        }, 10);

        setTimeout(function () {
          resetSliderImagesLeftPosition();
        }, 20);
      }, 600);

      changeImagesOrders(firstSliderImage);

      sliderOrder = 1;
    }

    if (sliderOrder == 3) {
      firstSliderImage.style.left = document.documentElement.clientWidth + 'px';
      thirdSliderImage.style.left = '0'

      setTimeout(function () {
        thirdSliderImage.style.left = -document.documentElement.clientWidth + 'px';
      }, 0);

      setTimeout(function () {
        showSliderImage(firstSliderImage);

        setTimeout(function () {
          resetSliderImagesLeftPosition();
        }, 20);
      }, 600);

      changeImagesOrders(firstSliderImage);

      sliderOrder = 1;
    }
  }

}

function changeSecondImageOrder() {

  if (sliderOrder === 2 && bigScreen.matches) {
    cantTouch(secondSliderImage);
  }

  if (sliderOrder === 2 && smallScreen.matches) {
    changeThirdImageOrder();
    return;
  }

  if (sliderOrder !== 2) {
    controlPainterAdder('.control_second');
  }

  if (sliderOrder !== 2 && bigScreen.matches) {
    AddImagesOpacity();
    changeImagesOrders(secondSliderImage);
    showSliderImage(secondSliderImage);


    if (sliderOrder == 1) {
      addLowZindex(thirdSliderImage);

      firstSliderImage.style.left = '860px';
      secondSliderImage.style.left = '860px';
      thirdSliderImage.style.left = '-1720px';
    }

    if (sliderOrder == 3) {
      addLowZindex(firstSliderImage);

      firstSliderImage.style.left = '1720px';
      secondSliderImage.style.left = '-860px';
      thirdSliderImage.style.left = '-860px';
    }

    sliderOrder = 2;

    setTimeout(function () {
      addSliderImagesTransition();

      resetSliderImagesLeftPosition();
    }, 100);


    removeSliderImagesTransition();

    setTimeout(function () {
      removeSliderImagesZindex();
      removeImagesOpacity();
    }, 800);
  }

  if (sliderOrder !== 2 && smallScreen.matches) {

    addSliderImagesTransition();

    if (sliderOrder == 1) {
      secondSliderImage.style.left = document.documentElement.clientWidth + 'px';
      firstSliderImage.style.left = '0'

      setTimeout(function () {
        firstSliderImage.style.left = -document.documentElement.clientWidth + 'px';
      }, 0);

      setTimeout(function () {
        showSliderImage(secondSliderImage);
        setTimeout(function () {
          resetSliderImagesLeftPosition();
        }, 20);
      }, 600);

      changeImagesOrders(secondSliderImage);
      sliderOrder = 2;
    }

    if (sliderOrder == 3) {
      secondSliderImage.style.left = -document.documentElement.clientWidth + 'px';
      thirdSliderImage.style.left = '0'

      setTimeout(function () {
        thirdSliderImage.style.left = document.documentElement.clientWidth + 'px';
      }, 0);

      setTimeout(function () {
        showSliderImage(secondSliderImage);

        setTimeout(function () {
          resetSliderImagesLeftPosition();
        }, 20);
      }, 600);

      changeImagesOrders(secondSliderImage);
      sliderOrder = 2;
    }
  }

}

function changeThirdImageOrder() {

  if (sliderOrder === 3 && bigScreen.matches) {
    cantTouch(thirdSliderImage);
  }

  if (sliderOrder === 3 && smallScreen.matches) {
    changeFirstImageOrder();
    return;
  }

  if (sliderOrder !== 3) {
    controlPainterAdder('.control_third');
  }

  if (sliderOrder !== 3 && bigScreen.matches) {
    AddImagesOpacity();
    changeImagesOrders(thirdSliderImage);
    showSliderImage(thirdSliderImage);

    if (sliderOrder == 1) {
      addLowZindex(secondSliderImage);
      firstSliderImage.style.left = '-860px';
      secondSliderImage.style.left = '1720px';
      thirdSliderImage.style.left = '-860px';
    }

    if (sliderOrder == 2) {
      addLowZindex(firstSliderImage);
      firstSliderImage.style.left = '-1720px';
      secondSliderImage.style.left = '860px';
      thirdSliderImage.style.left = '860px';
    }

    sliderOrder = 3;

    setTimeout(function () {
      addSliderImagesTransition();
      resetSliderImagesLeftPosition();
    }, 100);

    removeSliderImagesTransition();

    setTimeout(function () {
      removeSliderImagesZindex();
      removeImagesOpacity();
    }, 800);
  }

  if (sliderOrder !== 3 && smallScreen.matches) {
    addSliderImagesTransition();

    if (sliderOrder == 1) {
      thirdSliderImage.style.left = -document.documentElement.clientWidth + 'px';
      firstSliderImage.style.left = '0'

      setTimeout(function () {
        firstSliderImage.style.left = document.documentElement.clientWidth + 'px';
      }, 0);

      setTimeout(function () {
        showSliderImage(thirdSliderImage);

        setTimeout(function () {
          resetSliderImagesLeftPosition();
        }, 20);
      }, 600);

      changeImagesOrders(thirdSliderImage);
      sliderOrder = 3;
    }

    if (sliderOrder == 2) {
      secondSliderImage.style.left = '0'
      thirdSliderImage.style.left = document.documentElement.clientWidth + 'px';

      setTimeout(function () {
        secondSliderImage.style.left = -document.documentElement.clientWidth + 'px';
      }, 0);

      setTimeout(function () {
        showSliderImage(thirdSliderImage);

        setTimeout(function () {
          resetSliderImagesLeftPosition();
        }, 20);

      }, 600);

      changeImagesOrders(thirdSliderImage);

      sliderOrder = 3;
    }
  }

}

function toogleEventListenerBlock() {
  if (blockEventListener === 0) {
    blockEventListener = 1;
  } else {
    blockEventListener = 0;
  }
}

function arrowLeftAction() {
  if (sliderOrder == 1) {
    changeThirdImageOrder();
    return;
  }

  if (sliderOrder == 2) {
    changeFirstImageOrder();
    return;
  }

  if (sliderOrder == 3) {
    changeSecondImageOrder();
    return;
  }
}

function arrowRightAction() {
  if (sliderOrder == 1) {
    changeSecondImageOrder();
    return;
  }

  if (sliderOrder == 2) {
    changeThirdImageOrder();
    return;
  }

  if (sliderOrder == 3) {
    changeFirstImageOrder();
    return;
  }
}

document.querySelector('.firstSlider_image').addEventListener("click", changeFirstImageOrder);
secondSliderImage.addEventListener("click", changeSecondImageOrder);
thirdSliderImage.addEventListener("click", changeThirdImageOrder);

document.querySelector('.control_first').addEventListener("click", changeFirstImageOrder);
document.querySelector('.control_second').addEventListener("click", changeSecondImageOrder);
document.querySelector('.control_third').addEventListener("click", changeThirdImageOrder);

document.querySelector('.arrow_left').addEventListener("click", arrowLeftAction);
document.querySelector('.arrow_right').addEventListener("click", arrowRightAction);

