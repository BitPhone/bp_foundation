// bp_foundation.js

/*
	todo:
	bpSendMessage()
	bpGetMessages()
	bpGetNewMessages()
	bpGetBalance()
*/

function bpSendMessage(recipient, subject, body, callback){

	// connect to namecoin websocket
	var bpws = new WebSocket('ws://127.0.0.1:1313');

	// sending a message is a bit involved
	// first a name must be claimed,
	// then it must be "registered"
	// then finally the message can be sent
	// by transferring the name to the recipient

	/*
		name_new
		getinfo
		(wait 12 blocks)
		name_firstupdate
		name_update
	*/

	// step 1: claim the name
	bpws.onopen = function(){

		bpws.send('name_new m/' + subject);

	};

	bpws.onmessage = function(evt){

		var received_message = JSON.parse(evt.data);

		// switch based on the type of message received:
		// name_new
		// getinfo
		// name_firstupdate
		// name_udpate

		console.log('name_new result:');
		console.log(received_message);

		// if this was sucessful, we have to wait awhile
		// before we can take the next step

	};


	/*
	// call name_list
	bpws.onopen = function(){

		bpws.send('name_list');
	};

	bpws.onmessage = function(evt){

		var received_message = JSON.parse(evt.data);

		// convert namecoin objects into a BitPhone messages
		var bp_messages = [];

		for(i=0;i<received_message.length;i++){

			var bp_message = {};

			bp_message.from = received_message[i].address;
			bp_message.subject = received_message[i].name;
			bp_message.body = received_message[i].value;

			bp_messages.push(bp_message);
		}
		
		if(callback){
			callback(bp_messages);
		}
	};
	*/

	bpws.onclose = function(){
		console.log('connection closed');
	};
}

function bpGetMessages(callback){

	// connect to namecoin websocket
	var bpws = new WebSocket('ws://127.0.0.1:1313');

	// call name_list
	bpws.onopen = function(){

		bpws.send('name_list');

	};

	bpws.onmessage = function(evt){

		var received_message = JSON.parse(evt.data);

		// convert namecoin objects into a BitPhone messages
		var bp_messages = [];

		for(i=0;i<received_message.name_list.length;i++){

			var bp_message = {};

			bp_message.from = received_message.name_list[i].address;
			bp_message.subject = received_message.name_list[i].name;
			bp_message.body = received_message.name_list[i].value;

			bp_messages.push(bp_message);
		}
		
		if(callback){
			callback(bp_messages);
		}
	};

	bpws.onclose = function(){
		console.log('connection closed');
	};
}

function bpGetBalance(callback){

	// connect to namecoin websocket
	var bpws = new WebSocket('ws://127.0.0.1:1313');

	// call getinfo
	bpws.onopen = function(){

		bpws.send('getinfo');
	};

	bpws.onmessage = function(evt){

		var received_message = JSON.parse(evt.data);

		if(callback){
			callback(received_message.getinfo.balance);
		}
	};

	bpws.onclose = function(){
		//console.log('connection closed');
	};
}