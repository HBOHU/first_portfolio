$(function () {
    $('.navbar-toggle').click(function () {
        $(this).toggleClass('act');
        if ($(this).hasClass('act')) {
            $('.main-menu').addClass('act');
        } else {
            $('.main-menu').removeClass('act');
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1400, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 5
    });


    /* Counters  */
    if ($(".section-counters .start").length > 0) {
        $(".section-counters .start").each(function () {
            var stat_item = $(this),
                offset = stat_item.offset().top;
            $(window).scroll(function () {
                if ($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

    // another custom callback for counting to infinity
    $('#infinity').data('countToOptions', {
        onComplete: function (value) {
            count.call(this, {
                from: value,
                to: value + 1
            });
        }
    });

    $('#infinity').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }


    /* Insert HTML from JSON file */
    fetch("assets/js/data.json")
        .then(response => response.json()
            .then(data => {
                // Skill bars
                // Since json file holding information progressbar functions arent working properly??
                data["skillbars"].forEach(skillData => {
                    $(".nav-pills").append(`<li class="btn"><a href="#${skillData.tab}" data-toggle="tab"> ${skillData.tab} </a></li >`);
                    $(".tab-content").append(`<div role="tabpanel" class="tab-pane" id="${skillData.tab}"></div>`);
                   skillData.bars.forEach(bar => {
                        $(`#${skillData.tab}`).append(`<div class="col-md-4"><div class="skill"> <h4>${bar.name}</h4><div class="meter"><span style="width: ${bar.value}%"></span></div></div></div> </div>`);
                    })
                })
                // Portofolio carousel
                // For some reason there has to be hardcoded one active class in order to work
                let index = 0
                data["projects"].forEach(project => {
                    $(".carousel-indicators").append(`<li data-target="#carousel-portofolio" data-slide-to="${index}"></li>`);
                    $(".carousel-inner").append(`<div class="item"><img src="${project.img}" herf="${project.link}"><div class="carousel-caption"><h3>${project.title}</h3><p>${project.subTitle}</p></div></div>`);
                    index++;

                })
            }))


});