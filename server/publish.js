Meteor.publish("pages", function () {
    return Pages.find(
        {},
        {sort: {order: 1}}
    );
});
Meteor.publish("social", function () {
    return Social.find(
        {},
        {sort: {_id: 1}}
    );
});
Meteor.publish("work", function () {
    return Work.find(
        {},
        {sort: {order: -1}}
    );
});
Meteor.publish("allUsers", function () {
    return Meteor.users.find();
});

// Public publications
/*Meteor.publish("commentsBySlug", function(slug) {
    check(slug, String);

    return Comment.find({
        slug: slug
    });
});

Meteor.publish("singlePostBySlug", function(slug) {
    check(slug, String);

    return Post.find({
        slug: slug
    });
});

Meteor.publish("posts", function(limit) {
    check(limit, Match.OneOf(Number, null));

    if (limit === null) {
        limit = 0;
    }

    return Post.find({
        published: true
    }, {
        fields: {
            body: 0
        },
        sort: {
            publishedAt: -1
        },
        limit: limit
    });
});

Meteor.publish("taggedPosts", function(tag) {
    check(tag, String);

    return Post.find({
        published: true,
        tags: tag
    }, {
        fields: {
            body: 0
        },
        sort: {
            publishedAt: -1
        }
    });
});

Meteor.publish("authors", function() {
    var ids;

    ids = _.uniq(_.pluck(Post.all({
        fields: {
            userId: 1
        }
    }), "userId"));

    return Author.find({
        _id: {
            $in: ids
        }
    }, {
        fields: {
            profile: 1,
            username: 1,
            emails: 1
        }
    });
});

Meteor.publish("singlePostById", function(id) {
    check(id, String);

    if (!this.userId) {
        return this.ready();
    }

    return Post.find({
        _id: id
    });
});

Meteor.publish("postTags", function() {
    var handle,
        initializing,
        tags;

    if (!this.userId) {
        return this.ready();
    }

    initializing = true;
    tags = Tag.first().tags;

    handle = Post.find({}, {
        fields: {
            tags: 1
        }
    }).observeChanges({
        added: (function(_this) {
            return function(id, fields) {
                var doc;
                if (fields.tags) {
                    doc = Tag.first();
                    tags = _.uniq(doc.tags.concat(Post.splitTags(fields.tags)));
                    doc.update({
                        tags: tags
                    });
                    if (!initializing) {
                        return _this.changed("blog_tags", 42, {
                            tags: tags
                        });
                    }
                }
            };
        })(this),
        changed: (function(_this) {
            return function(id, fields) {
                var doc;
                if (fields.tags) {
                    doc = Tag.first();
                    tags = _.uniq(doc.tags.concat(Post.splitTags(fields.tags)));
                    doc.update({
                        tags: tags
                    });
                    if (!initializing) {
                        return _this.changed("blog_tags", 42, {
                            tags: tags
                        });
                    }
                }
            };
        })(this)
    });

    initializing = false;
    this.added("blog_tags", 42, {
        tags: tags
    });
    this.ready();
    return this.onStop(function() {
        return handle.stop();
    });
});

Meteor.publish("postForAdmin", function() {
    var sel;
    if (!this.userId) {
        return this.ready();
    }
    sel = {};
    if (Blog.settings.authorRole && Roles.userIsInRole(this.userId, Blog.settings.authorRole)) {
        sel = {
            userId: this.userId
        };
    }
    return Post.find(sel, {
        fields: {
            body: 0
        },
        sort: {
            publishedAt: -1
        }
    });
});*/