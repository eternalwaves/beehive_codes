Template.loginForm.events({
	"submit #login-form": function (event, t) {
		event.preventDefault();
		// retrieve the input field values
		var username = t.find("#login-username").value.trim(),
			password = t.find("#login-password").value;

        if (username && password) {
			Meteor.loginWithPassword(username, password);
        }
		return false; 
	}
});