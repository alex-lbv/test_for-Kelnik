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
}
document.querySelector('#sortAmount').onclick = function () {
  this.classList.toggle('active');
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
        console.log(1);
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
        console.log(1);
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

    xhr.responseType = "json";

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

sendRequest('GET', requestURL)
  .then(data => console.log(data))
  .catch(err => console.log(err))
