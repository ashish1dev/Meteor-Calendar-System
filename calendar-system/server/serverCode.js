	Meteor.startup(function(){
		Meteor.methods({
			'saveCalendarEvent':function(ce){
				CalEvent.insert(ce);
			},
			'updateTitle':function(id,title){
				return CalEvent.update({_id:id},{$set:{title:title}});
			},			
			'invite':function(id,eventId,invited_by,invitationTo_displayName,ce){
				var invite={}; 
				invite.invitation_from=invited_by;
				invite.invitation_to=id;
				invite.invitation_eventId=eventId;
				invite.status="pending"; 
				invite.invitationTo_displayName=invitationTo_displayName;
				invite.ce=ce;
				return Invitations.insert(invite);
			},
			'acceptInvite':function(inviteId){
				return Invitations.update({_id:inviteId},{$set:{status:'accepted'}});
			},
			'rejectInvite':function(inviteId){
				return Invitations.update({_id:inviteId},{$set:{status:'rejected'}});
			}
		});
		
		
		
	});