this.Post = (function(_super) {
    __extends(Post, _super);

    function Post() {
        return Post.__super__.constructor.apply(this, arguments);
    }

    Post._collection = new Meteor.Collection("blog_posts");

    Post.belongs_to = [
        {
            name: "author",
            identifier: "userId"
        }
    ];

    Post.after_save = function(post) {
        post.tags = Post.splitTags(post.tags);
        if (post.body) {
            post.excerpt = Post.excerpt(post.body);
        }
        return this._collection.update({
            _id: post.id
        }, {
            $set: {
                tags: post.tags,
                excerpt: post.excerpt
            }
        });
    };

    Post.slugify = function(str) {
        return str.toLowerCase().replace(/[^\w ]+/g, "").replace(RegExp(" +", "g"), "-");
    };

    Post.splitTags = function(str) {
        if (str && typeof str === "string") {
            return str.split(/,\s*/);
        }
        return str;
    };

    Post.prototype.validate = function() {
        if (!this.title) {
            this.error("title", "Blog title is required");
        }
        if (!this.slug) {
            return this.error("slug", "Blog slug is required");
        }
    };

    Post.prototype.html = function() {
        return this.body;
    };

    Post.prototype.thumbnail = function() {
        var match, regex;
        regex = new RegExp(/img src=[\'"]([^\'"]+)/ig);
        while (match = regex.exec(this.body)) {
            return match[1];
        }
    };

    Post.excerpt = function(html) {
        var i, matches, ret;
        if (Blog.settings.excerptFunction != null) {
            return Blog.settings.excerptFunction(html);
        } else {
            matches = html.split(/<\/div>|<\/p>|<\/blockquote>|<br><br>|\\n\\n|\\r\\n\\r\\n/m);
            i = 0;
            ret = "";
            while (!ret && matches[i]) {
                ret += matches[i++].replace(/(<([^>]+)>)/ig, " ").replace("&nbsp;", " ").trim();
            }
            return ret;
        }
    };

    Post.prototype.authorName = function() {
        var author;
        author = this.author();
        if (author) {
            if (author.profile && author.profile.name) {
                return author.profile.name;
            } else if (author.profile && author.profile.firstName && author.profile.lastName) {
                return "" + author.profile.firstName + " " + author.profile.lastName;
            } else if (author.profile && author.profile.twitter) {
                return "<a href=\"http://twitter.com/" + author.profile.twitter + "\">" + author.profile.twitter + "</a>";
            } else if (author.username) {
                return author.username;
            } else if (author.emails && author.emails[0]) {
                return author.emails[0].address;
            }
        }
        return "Mystery blogger";
    };

    return Post;
})(Minimongoid);

if (Meteor.isServer) {
    Meteor.methods({
        doesBlogExist: function(slug) {
            check(slug, String);
            return !!Post.first({
                slug: slug
            });
        },
        isBlogAuthorized: function() {
            var post;
            if (!Meteor.user()) {
                return false;
            }
            if (!Blog.settings.adminRole && !Blog.settings.authorRole) {
                return true;
            }
            if (Blog.settings.adminRole) {
                if (Blog.settings.adminGroup) {
                    if (Roles.userIsInRole(this.userId, Blog.settings.adminRole, Blog.settings.adminGroup)) {
                        return true;
                    }
                } else if (Roles.userIsInRole(this.userId, Blog.settings.adminRole)) {
                    return true;
                }
            }
            if (Blog.settings.authorRole) {
                check(arguments[0], Match.OneOf(Object, Number, String, null));
                if (_.isObject(arguments[0])) {
                    post = arguments[0];
                } else if (_.isNumber(arguments[0]) || _.isString(arguments[0])) {
                    post = Post.first(arguments[0]);
                } else {
                    post = null;
                }
                if (Blog.settings.authorGroup) {
                    if (Roles.userIsInRole(this.userId, Blog.settings.authorRole, Blog.settings.authorGroup)) {
                        if (post) {
                            if (Meteor.userId() === post.userId) {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    }
                } else if (Roles.userIsInRole(this.userId, Blog.settings.authorRole)) {
                    if (post) {
                        if (Meteor.userId() === post.userId) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }
            return false;
        }
    });
}

Post._collection.allow({
    insert: function(userId, item) {
        return Meteor.call("isBlogAuthorized", item);
    },
    update: function(userId, item, fields) {
        return Meteor.call("isBlogAuthorized", item);
    },
    remove: function(userId, item) {
        return Meteor.call("isBlogAuthorized", item);
    }
});