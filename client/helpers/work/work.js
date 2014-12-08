Template.work.helpers({
    workPage: function() {
        return Pages.findOne({route: "work"});
    },
    content: function() {
        return htmlSmartQuotes(this.content);
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