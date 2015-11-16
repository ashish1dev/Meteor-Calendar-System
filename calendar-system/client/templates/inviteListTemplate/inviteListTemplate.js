Template.inviteListTemplate.helpers({ 
		inviteReceived : function () { 
			return Invitations.find(	{invitation_to:	Meteor.userId() , status:"pending"},	{});
		},
		inviteSend : function () { 
			return Invitations.find(	{invitation_from:	Meteor.userId()  },	{});
		}
	});
	 
	Template.inviteListTemplate.events({
		"click .accept": function(){
			Meteor.call("acceptInvite", this._id ); 
		},
		"click .reject": function(){
			Meteor.call("rejectInvite", this._id );
			
		} 
	});