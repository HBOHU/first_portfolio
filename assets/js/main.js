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


    /* Skill bars */
    fetch("assets/js/data.json")
    .then(response => response.json()
    .then(data => {
        data["skillbars"].forEach(skillTab => {
            $(".nav-pills").append(`<li class="btn"><a href="#${skillTab.title}" data-toggle="tab"> ${skillTab.title} </a></li >`);
            $(".tab-content").append(`<div role="tabpanel" class="tab-pane" id="${skillTab.title}"></div>`);
            $(`#${skillTab.title}`).append(`<div id="${skillTab.title}"class="row skills-row"></div>`);
            skillTab.bars.forEach(bar => {
                $(`#${skillTab.title}`).append(`<div class="col-md-4"> <div class="skill"> <h4>${bar.name}</h4> <div class="progress"> <div class="progress-bar" role="progressbar" data-transitiongoal=${bar.value}> </div> </div> </div> </div>`);
            })
        })
    }))

    // Since json file holding information these funcitons arent working properly???
    
    $(".btn:not(.active)").click(function () {
        $(".progress-bar").addClass("notransition");
        $('.progress-bar').attr('style', "width: 0%");
    });

    $(".btn").click(function () {
        $('.progress-bar').progressbar({
            transition_delay: 40
        });
    });



});