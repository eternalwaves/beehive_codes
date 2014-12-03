this.Author = (function(_super) {
    __extends(Author, _super);

    function Author() {
        return Author.__super__.constructor.apply(this, arguments);
    }

    Author._collection = Meteor.users;

    Author.has_many = [
        {
            name: "posts",
            foreign_key: "userId"
        }
    ];

    Author.current = function() {
        if (Meteor.userId()) {
            return Author.init(Meteor.user());
        }
    };

    return Author;

})(Minimongoid);