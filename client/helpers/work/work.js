Template.work.helpers({
    workPage: function() {
        return Pages.findOne({route: "work"});
    },
    content: function() {
        return htmlSmartQuotes(this.content);
    },
    currentCat: function () {
        if (this.currentCat) {
            return this.currentCat.charAt(0).toUpperCase() + this.currentCat.slice(1);
        }
    },
    items: function () {
        var items = [];
        if (this.items.count() === 0) {
            return;
        }
        this.items.forEach(function(item) {
            item.title = smartQuotes(item.title);
            item.excerpt = smartQuotes(item.excerpt);
            items.push(item);
        });
        return items;
    }
});

Template.work.rendered = function () {
    var items = $("#portfolio li").hide();
    function fadeInRecursive (elements) {
        if (elements) {
            $(elements.shift()).fadeIn(100, function() {
                fadeInRecursive(elements);
            });
        }
    }
    fadeInRecursive($.makeArray(items));
};