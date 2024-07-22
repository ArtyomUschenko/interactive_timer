

//Выполняем действия после загрузки структуры страницы (DOMContentLoaded)
window.addEventListener("DOMContentLoaded", function () {
    'use strict';

    //----------------------------------
    //Реализация табов.
    //----------------------------------

    let tab = document.querySelectorAll(".info-header-tab"), // Получаем все табы-кнопки
        info = document.querySelector(".info-header"), //Получаем родителя с табами-кнопками
        tabContent = document.querySelectorAll(".info-tabcontent"); //Получаем весь таб-контент



// Цикл, который проходит по табам с индексом от 1 до 4 и меняет классы.
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1); // Передаем 1, чтоб таб с индексом 0 отображался на странице

    // Передаем индекс таба, чтоб сменить класс
    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function (event) {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); // Скрываем 0 таб, который отображается по умолчанию
                    showTabContent(i); //Отображаем таб
                    break;
                }
            }
        }
    });

    //----------------------------------
    // Реализация таймера
    //----------------------------------
    let deadline = "2024-07-23";

    // Получаем оставшееся время и записываем данные в функцию
    function  getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),  //Дата дедлайна - текущая дата
            seconds = Math.floor((t/1000) % 60),  //Math.floor - округление, t/1000 % 60 - получение секунд
            minutes = Math.floor((t/1000/60) % 60), // - Получение минут
            hours = Math.floor((t/(1000*60*60)) % 60), //  - Получение часов
            days = Math.floor(((t/1000/60/60) % 24)); // - получение дней

            return {
              "total" : t,
              "hours" : hours,
              "minutes" : minutes,
              "seconds" : seconds
            };
    }

    //Получаем элементы на странице и запускаем функцию каждые 1000мс
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000)

        //Получаем данные из функции и обновляем информация на сайте
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock("timer", deadline)
});

