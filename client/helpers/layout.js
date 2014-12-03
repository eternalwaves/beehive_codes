Template.layout.rendered = function () {
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
};

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