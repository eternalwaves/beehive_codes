Template.home.helpers({
    content: function() {
        var content = htmlSmartQuotes(this.content);
        return content;
    }
});