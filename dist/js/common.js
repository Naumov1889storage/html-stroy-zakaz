$( function() {

    $('.slider_wide').slick({
        arrows: false,
        dots: true,
    });

    $('.slider_regular').slick({
        arrows: true,
        dots: true,
    });


    // скрипт отвечающие за карту
    if ($('#map_content').length) {
        ymaps.ready(function (e) {
            var myCenter = [55.737403, 37.645245];
            if ($(window).width() < 950) {
                var myCenter = [55.737003, 37.648245]
            }
            var myMap = new ymaps.Map('map_content', {
                    center: myCenter,
                    zoom: 17,
                    controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
                }, {}),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark([55.737403, 37.649245], {
                    hintContent: 'STROY-ZAKAZ',
                    balloonContent: 'Москва, Проектируемый проезд 134'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/icon-placemark.png',
                    // Размеры метки.
                    iconImageSize: [81, 111],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-40, -111]
                }),

                myPlacemarkWithContent = new ymaps.Placemark([55.737403, 37.649245], {
                    hintContent: '',
                    balloonContent: '',
                    iconContent: ''
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: '',
                    // Размеры метки.
                    iconImageSize: [48, 48],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-24, -24],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [15, 15],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
                });

            myMap.geoObjects
                .add(myPlacemark)
                .add(myPlacemarkWithContent);

            //myMap.behaviors.disable('scrollZoom');
        });
    }

});


