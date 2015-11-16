	Template.calendarTemplate.helpers({
		editing_event: function(){
			return Session.get('editing_event');
		}
	});
	
	Template.calendarTemplate.rendered=function(){
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			eventLimit: true, // allow "more" link when too many events
			dayClick: function(date, jsEvent, view) {
				var calendarEvent={};
				calendarEvent.start=date.format();
				calendarEvent.end=date.format();
				calendarEvent.title="New Event";
				calendarEvent.owner=Meteor.userId();
				calendarEvent.color= '#3A87AD';
				var user=Meteor.users.find( {	_id :Meteor.userId() } ,{}).fetch();
				var displayName=null;
				if(user[0].profile)
					displayName=user[0].profile.name;
				else
					displayName=user[0].emails[0].address;
				calendarEvent.user=displayName;
				Meteor.call('saveCalendarEvent',calendarEvent);
			},
			eventClick: function(calEvent, jsEvent, view) {
				if(calEvent.owner==Meteor.userId()){
					Session.set('editing_event',calEvent._id);
					$('#title').val(calEvent.title);
					$('#myModal').modal('show');
				}else{
					alert('This is an Invited Event for you , cannot be edited.');
				}
			},
			events:function(start,end,timezone,callback){
				var calEvents=CalEvent.find({owner:Meteor.userId()},{reactive:false}).fetch();
				var inviteEvents=Invitations.find({invitation_to:Meteor.userId(), status:'accepted'},{ reactive:false}).fetch() ; 
				var allCalEvents=[]; 
				for (var j = 0; j < calEvents.length; j++){
					allCalEvents.push(calEvents[j] );
				}
				for (var j = 0; j < inviteEvents.length; j++){  
					allCalEvents.push(inviteEvents[j].ce);
				} 
				callback(allCalEvents );
			}
		}).data().fullcalendar;
		
		Deps.autorun(function(){
			CalEvent.find().fetch(); 
			if($('#calendar')){
				$('#calendar').fullCalendar('refetchEvents');
			}
		});		 
	};