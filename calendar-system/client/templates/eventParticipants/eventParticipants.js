
	Template.eventParticipants.helpers({ 
		participantsList : function () { 
			return Invitations.find(	{invitation_from:	Meteor.userId() , invitation_eventId :Session.get('editing_event') },	{})
		}
	});