this.Files = FileCollection({
    resumable: false,
    baseURL: "/fs",
    http: [
        {
            method: "get",
            path: "/:id",
            lookup: function(params, query) {
                return {
                    _id: new Meteor.Collection.ObjectID(params.id)
                };
            }
        }, {
            method: "post",
            path: "/:id",
            lookup: function(params, query) {
                return {
                    _id: new Meteor.Collection.ObjectID(params.id)
                };
            }
        }
    ]
});

if (Meteor.isServer) {
    Files.allow({
        insert: function(userId, file) {
            return userId;
        },
        remove: function(userId, file) {
            return file.metadata && file.metadata.userId && file.metadata.userId === userId;
        },
        write: function() {
            return true;
        },
        read: function(userId, file) {
            return true;
        }
    });
}