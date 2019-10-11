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


    if ($(window).width() > 900 && !($('productSection.earlyMob').length)) {
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

    if ($('.productSection .table').hasClass('table_big')) {
        $('.productSection').addClass('earlyMob');

        $('.dropdown .arrow.mob').click(function (e) {
            $(this).next().toggleClass('active');
        });
        $(document).click(function(e) {
            var area = $(e.target).parents().addBack();
            if (!(area.is('.dropdown'))) {
                $('.dropdown .arrow').next().removeClass('active');
            }
        });
    }

    // скрипт отвечающие за карту
    if ($('#map_content').length) {
        ymaps.ready(function (e) {
            var myCenter = [64.57949855728545,39.86698050000002];
            if ($(window).width() < 730) {
                var myCenter = [64.57989855728545,39.86698050000002]
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

                myPlacemark = new ymaps.Placemark([64.57949855728545,39.86698050000002], {
                    hintContent: 'STROY-ZAKAZ',
                    balloonContent: 'Архангельская область, г. Северодвинск, Архангельское шоссе 29'
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
                    iconImageOffset: [-40, -118]
                }),

                myPlacemarkWithContent = new ymaps.Placemark([64.57721363065828,39.85982436634828],[64.58178329172841,39.87413663365174], {
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


