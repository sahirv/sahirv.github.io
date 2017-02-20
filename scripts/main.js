window.onload = function(){
    $('header').fadeIn(500);
    $('.spinner').remove();
    $.get("templates/modals.html", function(data){
        $('#main-bod').html($('#main-bod').html() + data);
    });
    $('#main-bod').html()
    setTimeout(function(){
        $('.navbar').fadeIn(500, function(){
            setTimeout(function(){
                $('section').toggle(true);
                setTimeout(function(){
                    var $anchor = $(this);
                    $('header').slideUp(300);
                    //event.preventDefault();
                }, 100);
            }, 750);
        })
    }, 1000);
};

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
