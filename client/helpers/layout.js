var seasonalClass = "";

Template.layout.rendered = function () {
    var startChristmas = moment("Nov 30", "MMM DD"),
        endChristmas = moment("Jan 8", "MMM DD");

    if (moment().isBefore(endChristmas)) {
        startChristmas = moment("Nov 30", "MMM DD").subtract(1, "years");
    }
    if (moment().isAfter(startChristmas)) {
        endChristmas = moment("Jan 8", "MMM DD").add(1, "years");
    }

    $(document).scroll(function () {
        var headerTop = $("header .logo").offset().top;
        if ($(document).scrollTop() >= headerTop) {
            if (!$("header h1").hasClass("slideRight")) {
                $("header h1").addClass("slideRight");
            }
        } else {
            $("header h1").removeClass("slideRight");
        }
    });

    // snow if in Christmas season
    if (moment().isAfter(startChristmas) && moment().isBefore(endChristmas)) {
        seasonalClass = "snow";
        $("#animation-controls").css("display", "block");
        $("#animation-controls .message").text("Merry Christmas!");
        $("#seasonal").css("display", "block").addClass(seasonalClass);
    }
};

Template.layout.events({
    "click #menu-button": function (event) {
        event.preventDefault();
        $("#menu-button ~ ul").toggle();
    },
    "click .animation-button": function (event) {
        var button = $(".animation-button");
        event.preventDefault();
        if ($(button).text() === "On") {
            $(button).text("Off");
        } else {
            $(button).text("On");
        }
        $("#seasonal").toggleClass(seasonalClass);
    }
});

Template.nav.helpers({
    links: function () {
        return Pages.find();
    },
    isCurrent: function (template) {
        // No need to highlight the index page
        if (template && template !== "home") {
            // get the name of the current route
            var currentRoute = Router.current().route.getName();
            // if route matches item, or it is a blog entry (subitem)
            if ((currentRoute && (template === currentRoute)) ||
                (template === "blogIndex" && currentRoute === "blogShow") ||
                (template === "work" && currentRoute === "portfolioItem")) {
                return "current";
            }
        }
    }
});

Template.social.helpers({
    links: function () {
        return Social.find();
    }
});