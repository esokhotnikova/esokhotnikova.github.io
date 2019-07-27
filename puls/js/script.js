// $(document).ready(function(){
//     $('.carousel__inner').slick(        {
//         // dots: true,
//         infinite: true,
//         speed: 1200,
//         slidesToShow: 1,
//         // adaptiveHeight: true,
//         // autoplay: true,
//         // autoplaySpeed: 2000
//         prevArrow: '<button type="button" class="slick-prev"><img src="../icons/bl4/chevron-left-solid.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../icons/bl4/chevron-right-solid.png"></button>',
//         responsive:[
//             {
//                 breakpoint: 768,
//                 settings: {
//                     dots: true,
//                     arrows:false
//                 }
//             }
//         ]
        
//     });
//   });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.prev').onclick = function () {
    slider.goTo('prev');
};
// более правильный/продвинутый вариант
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next') 
});

    // controlsText:[
    //     '<img src="../icons/bl4/chevron-left-solid.png">',
    //     '<img src="../icons/bl4/chevron-right-solid.png">'

    // ]
$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    // $('.catalog-item__link').each(function(i){
    //     $(this).on('click', function(e) {
    //         e.preventDefault();                      
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); 
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');               

    //     });
    // });

    // $('.catalog-item__back').each(function(i){
    //     $(this).on('click', function(e) {
    //         e.preventDefault();                      
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); 
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');               

    //     });
    // });

        function myToggleClassFunction(myToggleClass){
            $(myToggleClass).each(function(i){
                $(this).on('click', function(e) {
                    e.preventDefault();                      
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); 
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');               

                });
            });
        }

        myToggleClassFunction('.catalog-item__link');
        myToggleClassFunction('.catalog-item__back');

        //modal $ - обращаемся к компоненту страницы,  . - означает обращение к классу
        $('[data-modal=consultation]').on('click',function(){
            // $('.overlay').fadeIn(); //http://jquery.page2page.ru/index.php5/%D0%AD%D1%84%D1%84%D0%B5%D0%BA%D1%82%D1%8B
            // $('#consultation').fadeIn();
            // или
            $('.overlay, #consultation').fadeIn('slow');
        });

        $('.modal__close').on('click', function(){
            $('.overlay, #consultation, #thanks, #order').fadeOut('fast');

        });

        // $('.mybutton_mini').on('click', function(){
        //     $('.overlay, #order').fadeIn('slow');
        // });

        $('.mybutton_mini').each(function(i){ //обращаемся к определенному элементу класса .mybutton_mini
            $(this).on('click',function(){
                let str1=$('.catalog-item__subtitle').eq(i).text();   //обращаемся к каждому элементу класса catalog-item__subtitle по номеру i, берем из него текст           
                $('#order .modal__descr').text(str1);
                //или
                //$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
                $('.overlay, #order').fadeIn('slow');
            });
            
            //$('.overlay, #order').fadeIn('slow');
        });

        // $('#main-form').validate();
        // $('#consultation form').validate(
        //     {
        //         rules:{
        //             username: {
        //                 required: true,
        //                 minlength: 2
        //               },
        //             userphone: "required",
        //             useremail: {
        //                 required:true,
        //                 email:true
        //             }
        //         },
        //         messages: {
        //             username:{
        //                 required: "Пожалуйста, введите имя",
        //                 minlength: jQuery.validator.format("Имя должно быть больше {0} символов !")
        //               },
        //             userphone: "Пожалуйста, введите номер телефона",
        //             useremail: {
        //               required: "Пожалуйста, введите email",
        //               email: "Ваш email должен соответствовать формату: name@domain.com"
        //             }
        //           }
        //     }
        // );
        // $('#order form').validate();

        function valideForms(form){
            $(form).validate(
                {
                    rules:{
                        username: {
                            required: true,
                            minlength: 2
                          },
                        userphone: "required",
                        useremail: {
                            required:true,
                            email:true
                        }
                    },
                    messages: {
                        username:{
                            required: "Пожалуйста, введите имя",
                            minlength: jQuery.validator.format("Имя должно быть больше {0} символов !")
                          },
                        userphone: "Пожалуйста, введите номер телефона",
                        useremail: {
                          required: "Пожалуйста, введите email",
                          email: "Ваш email должен соответствовать формату: name@domain.com"
                        }
                      }
                }
            );
        }

        valideForms('#main-form');
        valideForms('#consultation form');
        valideForms('#order form');
        $('input[name=userphone]').mask("+7 (999) 999-99-99"); //не работает с типом компонентов input = number

        $('form').submit(function(e){
            e.preventDefault(); //отключили стандартное поведение браузера - отменили перезагрузку страницы при отправке данных
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function(){
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');

                $('form').trigger('reset');
            });
            return false;

        });

        $(function(){
            $("a[href^='#']").click(function(){
                    var _href = $(this).attr("href");
                    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                    return false;
            });
    });



});