Template.invitationTemplate.helpers({ 
		user : function () { 
			return Meteor.users.find( {_id : {$ne:Meteor.userId() } },{registered_emails:1}) ;
		}
	});
	
	Template.invitationTemplate.events({
		"click .invite": function(){
			var user=Meteor.users.find( {	_id :this._id } ,{}).fetch(); 
			var invitationTo_displayName=null;
			if(user[0].profile)
				invitationTo_displayName=user[0].profile.name;
			else if(user[0].emails)
				invitationTo_displayName=user[0].emails[0].address; 
			var ce= CalEvent.findOne({_id: Session.get('editing_event')});
			ce.color='#5CB85C';
			ce.title =ce.title + " ("+ce.user+")";
			Meteor.call("invite", this._id,Session.get('editing_event'),Meteor.userId(),invitationTo_displayName,ce);
		} 
	});