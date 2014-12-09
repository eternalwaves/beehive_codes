Template.home.helpers({
    title: function() {
        var title = htmlSmartQuotes(this.title);
        return title;
    },
    content: function() {
        var content = htmlSmartQuotes(this.content);
        return content;
    }
});