$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });
    // ==============================================================
    // This is for the top header part and sidebar part
    // ==============================================================
    var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 70;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                $(".sidebartoggler i").addClass("fa fa-bars");
            }
            else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
                $(".sidebartoggler i").removeClass("fa-bars");
                $(".sidebartoggler i").addClass("fa fa-arrow-circle-o-left");
            }

            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }

    };
    $(window).ready(set);
    $(window).on("resize", set);
    // ==============================================================
    // Theme options
    // ==============================================================
    $(document).on('click','.sidebartoggler', function () {
        if ($("body").hasClass("mini-sidebar")) {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
            $(".sidebartoggler i").addClass("fa fa-bars");
        }
        else {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();
            $(".sidebartoggler i").removeClass("fa-bars");
        }
    });
    // topbar stickey on scroll
    $(".fix-header .topbar").stick_in_parent();


    // this is for close icon when navigation open in mobile view
    $(document).on('click',".nav-toggler",function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("fa fa-bars");
        $(".nav-toggler i").addClass("fa fa-times");
    });
    $(".sidebartoggler").on('click', function () {
        $(".sidebartoggler i").toggleClass("fa fa-times");
    });

    // ==============================================================
    // Auto select left navbar
    // ==============================================================
    $(function () {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function () {
            return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent().addClass('active');
            }
            else {
                break;
            }
        }

    });
    // ==============================================================
    //tooltip
    // ==============================================================
    $('.tooltips').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    })
        // ==============================================================
        //Popover
        // ==============================================================
    $(function () {
            $('[data-toggle="popover"]').popover()
        })
        // ==============================================================
        // Sidebarmenu
        // ==============================================================
    $(function () {
        $('#sidebarnav').metisMenu();
    });
    // ==============================================================
    // Slimscrollbars
    // ==============================================================

    // ==============================================================
    // Resize all elements
    // ==============================================================
    $("body").trigger("resize");
    // ==============================================================
    // To do list
    // ==============================================================
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });

     // ==============================================================
    // Collapsable cards
    // ==============================================================
    $(document).on("click", ".card-actions a", function(e) {
    if (e.preventDefault(), $(this).hasClass("btn-close")) $(this).parent().parent().parent().fadeOut();
    });

    (function ($, window, document) {
        var panelSelector = '[data-perform="card-collapse"]';
        $(panelSelector).each(function () {
            var $this = $(this)
                , parent = $this.closest('.card')
                , wrapper = parent.find('.card-body')
                , collapseOpts = {
                    toggle: false
                };
            if (!wrapper.length) {
                wrapper = parent.children('.card-heading').nextAll().wrapAll('<div/>').parent().addClass('card-body');
                collapseOpts = {};
            }
            wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
                $this.children('i').removeClass('fa fa-times').addClass('fa fa-plus');
            }).on('show.bs.collapse', function () {
                $this.children('i').removeClass('fa fa-plus').addClass('fa fa-times');
            });
        });
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.card');
            var wrapper = parent.find('.card-body');
            wrapper.collapse('toggle');
        });
    }(jQuery, window, document));
});

