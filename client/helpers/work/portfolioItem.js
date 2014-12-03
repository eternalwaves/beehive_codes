function setImageContainerHeight(images) {
    var imagesHeight = 0;
    $.each(images, function (index, image) {
        imagesHeight = ($(image).height() > imagesHeight) ? $(image).height() : imagesHeight;
    });
    $(".images").css("min-height", imagesHeight);
}
function resolutionPath() {
    if ($(window).width() < 1200) {
        return "small/";
    }
    return "med/";
}
function prevImage() {
    var figures = $(".images figure"),
        images = $(".images").find("img");
    // only if not currently in a zoom view
    if ($("figure.zoom").length === 0) {
        $(figures).filter(":first").fadeOut(300, function () {
            $(figures).filter(":last").fadeIn(300);
            $(figures).filter(":first").before($(figures).filter(":last"));
        });
        setImageContainerHeight(images);
    }
}
function nextImage() {
    var figures = $(".images figure"),
        images = $(".images").find("img");
    // only if not currently in a zoom view
    if ($("figure.zoom").length === 0) {
        $(figures).filter(":first").fadeOut(300, function () {
            $(figures).filter(":first").next().fadeIn(300);
            $(figures).filter(":last").after($(figures).filter(":first"));
        });
        setImageContainerHeight(images);
    }
}
function closeZoom() {
    var zoom = $("figure.zoom");

    if (zoom.length > 0) {
        $(zoom).fadeOut(function () {
            $("body").css({overflow: ""});
            $(zoom).remove();
        });
    }
}

Template.portfolioItem.helpers({
    resolutionPath: function () {
        return resolutionPath();
    },
    title: function () {
        return htmlSmartQuotes(this.title);
    },
    description: function () {
        return htmlSmartQuotes(this.description);
    }
});

Template.portfolioItem.rendered = function () {
    var figures = $(".images figure"),
        slideControls,
        images = $(".images").find("img");

    if (figures.length > 1) {
        slideControls = "<p><a href=\"#\" id=\"prev\">Previous</a> | <a href=\"#\" id=\"next\">Next</a></p>";
        $(figures[0]).before(slideControls);
    }

    setImageContainerHeight(images);
    $(document).resize(function () {
        setImageContainerHeight(images);
        this.data.resolutionPath = resolutionPath();
    });

    $(document).keyup(function (event) {
        if (event.which === 27) {
            closeZoom();
        }
        if (event.which === 37) {
            prevImage();
        }
        if (event.which === 39) {
            nextImage();
        }
    });
};

Template.portfolioItem.events({
    "click #prev": function (event) {
        prevImage();
    },
    "click #next": function (event) {
        nextImage();
    },
    "click figure": function (event) {
        var figure = event.currentTarget,
            zoom,
            img;

        if (!$(figure).hasClass("zoom")) {
            zoom = $(figure).clone();
            img = $(zoom).children("img");

            // to identify and style
            $(zoom).addClass("zoom");
            // show large image
            $(img).attr("src", function (index, value) {
                value = value.replace(/(small|med)\//, "");
                return value;
            });
            // hide body scrollbars
            $("body").css({overflow: "hidden"});
            // insert zoom after figure
            $(figure).after($(zoom));
            // center image
            if ($(img).height() < $(window).height()) {
                $(img).css({
                    top: "50%",
                    transform: "translateY(-50%)",
                    "-webkit-transform": "translateY(-50%)",
                    "-ms-transform": "translateY(-50%)"
                });
            }
        }
    },
    "click figure.zoom": function (event) {
        closeZoom();
    }
});