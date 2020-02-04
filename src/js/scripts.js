'use strict';

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    goTopBtn.classList.add('to-top--show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('to-top--show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}

let goTopBtn = document.querySelector('.to-top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
//  scroll Top

document.querySelector('#sortPrice').onclick = function () {
  this.classList.toggle('active');
  this.classList.add('focus');
  document.querySelector('#sortAmount').classList.remove('focus');
}
document.querySelector('#sortAmount').onclick = function () {
  this.classList.toggle('active');
  this.classList.add('focus');
  document.querySelector('#sortPrice').classList.remove('focus');
}
document.querySelector('.catalog__sort-btn--asc').onclick = function () {
  sortList('data-price');
}
document.querySelector('.catalog__sort-btn--desc').onclick = function () {
  sortListDesc('data-price');
}
document.querySelector('.catalog__sort-btn--amount-asc').onclick = function () {
  sortListDesc('data-amount');
}
document.querySelector('.catalog__sort-btn--amount-desc').onclick = function () {
  sortList('data-amount');
}

function sortList(sortType) {
  let items = document.querySelector('.catalog__list');
  for (let i = 0; i < items.children.length - 1; i++) {
    for (let j = i; j < items.children.length; j++) {
      if (+items.children[i].getAttribute(sortType) > +items.children[j].getAttribute(sortType)) {
        let replacedNode = items.replaceChild(items.children[j], items.children[i]);
        insertAfter(replacedNode, items.children[i]);
      }
    }
  }
}

function sortListDesc(sortType) {
  let items = document.querySelector('.catalog__list');
  for (let i = 0; i < items.children.length - 1; i++) {
    for (let j = i; j < items.children.length; j++) {
      if (+items.children[i].getAttribute(sortType) < +items.children[j].getAttribute(sortType)) {
        let replacedNode = items.replaceChild(items.children[j], items.children[i]);
        insertAfter(replacedNode, items.children[i]);
      }
    }
  }
}

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
//  Sort

function validate(subscribe, email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let address = document.forms[subscribe].elements[email].value;
  if (reg.test(address) == false) {
    alert('Введите корректный e-mail');
    return false;
  } else {
    alert('Вы успешно подписались');
    validate.preventDefault();
  }
}
//  Validation

let requestURL = '../json/card.json';

function sendRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function () {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    }

    xhr.onerror = function () {
      reject(xhr.response);
    }

    xhr.send();
  })
}

let base;
let baseElements;

sendRequest('GET', requestURL).then(function (info) {
  base = info;
  return Promise;
}).catch(function (err) {
  console.log(err)
})



document.querySelector('#showMore').onclick = function () {
  window.setTimeout(function () {

    baseElements = Object.keys(base).length;
    let html = '';
    let amount;
    let image;
    let number;
    let types;
    let idCard;
    let modifier = [{
      name: "booked",
      value: "Забронировано"
    }, {
      name: "free",
      value: "Свободно"
    }, {
      name: "sales",
      value: "Продано"
    }];

    Array.prototype.slice.call(base).forEach(function (item) {
      html += '<li class="catalog__item" data-price="' + item.price1 + item.price2 + item.price3 + '" data-amount="' +
        Object.keys(item.amount).length + '">';
      html += '<div class="card card--' + item.modifier + '">';
      html += '<div class="card__image"><img src=' + item.image + ' alt=""></div>';
      html += '<h3 class="card__title">' + item.amount + ' №' + item.number + '</h3>';
      html += '<ul><li class="card__type"><pre>' + item.types + '</pre></li>';
      html += '<li class="card__area"><span>' + item.area + '</span>&nbsp;м&#178;<br><span>площадь</span></li>';
      html += '<li class="card__floor"><span>' + item.floor + '</span><br/><span>этаж</span></li></ul>';
      html += '<span class="card__price">' + item.price1 + ' ' + item.price2 + ' ' + item.price3 + '<span>&nbsp;руб.</span></span>';
      html += '<div class="card__choose"><input type="checkbox" id="' + item.idCard + '">' + '<label for="' + item.idCard + '"></label></div>';
      html += '<span class="card__footer">' + item.modifierValue + '</span>';
      if (item.sale) {
        html += '<div class="card__sale"><span>' + item.saleValue + '%</span></div>';
      }
      if (item.bigSale)
        html += '<div class="card__sale"><span>' + item.saleValue + '%</span><span>шок цена!</span></div>';
      html += '</div>'
      html += '</li>';
    })
    document.querySelector('#showMore').style.display = 'none';
    document.querySelector('.catalog__list').insertAdjacentHTML('beforeend', html);
  }, 500);
}
// adds cards
