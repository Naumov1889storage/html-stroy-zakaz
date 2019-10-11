$(function () {

    $('.slider_wide').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    $('.slider_regular').slick({
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
    });

    var linkSpy = $('.link-spy');
    linkSpy.click(function (e) {
        e.preventDefault();

        if ($(e.target).parents().addBack().is('.subHeader.mob_show')) {
            $('body').toggleClass('active');
            $('.burger').toggleClass('burger_active');
            $('.subHeader').toggleClass('mob_show');
        }

        var currentLink = $(this);
        var href = currentLink.attr('href');
        var scrollTo = $(href);
        var offsetTop = scrollTo.offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop - 50
        }, 300);
        linkSpy.not(currentLink).removeClass('active');


        setTimeout(function () {
            currentLink.addClass('active');
        }, 300);

    });



    if ($(window).width() < 900) {
        $(document).click(function(e) {
            var area = $(e.target).parents().addBack();
            if (!(area.is('.dropdown'))) {
                $('.dropdown .arrow').next().removeClass('active');
            }
        });

        $('.dropdown .arrow.mob').click(function (e) {
            $(this).next().toggleClass('active');
        });

        $('.burger').click(function () {
            $('.burger').toggleClass('burger_active');
            $('.subHeader').toggleClass('mob_show');
            $('body').toggleClass('active');
        });
    }



    if ($(window).width() > 900) {
        var productMenu = $('.productSection__menu');
        if (productMenu.length) {
            var productMenuOffsetTopInitial = productMenu.offset().top;
            $(window).scroll(() => {
                topOfFooter = $('.footer').position().top;
                scrollDistanceFromTopOfDoc = $(document).scrollTop() + productMenu.height() + 95;
                scrollDistanceFromTopOfFooter = scrollDistanceFromTopOfDoc - topOfFooter;

                var windowOffset = window.pageYOffset;
                if (windowOffset + 20 >= productMenuOffsetTopInitial) {// && dropdownOffsetBottom > 400) {
                    productMenu.addClass("sticky");
                    if (scrollDistanceFromTopOfDoc > topOfFooter) {
                        productMenu.css('margin-top', 0 - scrollDistanceFromTopOfFooter);
                    } else {
                        productMenu.css('margin-top', 0);
                    }
                } else {
                    productMenu.removeClass("sticky");
                }

            });
        }
    }




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


