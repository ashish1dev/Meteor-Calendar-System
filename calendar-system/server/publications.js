Meteor.publish('users', function(){
			if(this.userId)
			  return Meteor.users.find();
			else
			  return null;
		});