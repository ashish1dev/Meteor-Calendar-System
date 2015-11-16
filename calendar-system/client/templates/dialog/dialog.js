	Template.dialog.events({
		"click .closeDialog": function(event, template){
			 Session.set('editing_event',null); 
		},
		"click .saveEvent": function (event, template){
			var title=template.find('#title').value;
			Meteor.call('updateTitle',Session.get('editing_event'),title);
			Session.set('editing_event',null);
		}
	});
	
	Template.dialog.helpers({
		title : function(){
			var ce= CalEvent.findOne({_id: Session.get('editing_event')});
			if(ce)
				return ce.title;
		}
	});
	
	
	
	Template.dialog.rendered=function(){
		if(Session.get('editDialog')){
			var calevent=CalEvent.findOne({_id:Session.get('editDialog')}); 
			if(calevent){
				$('#title').val(calevent.title);
			}
		}
	};
	
