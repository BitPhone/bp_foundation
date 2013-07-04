// bp_foundation.js

/*
	todo:
	bpSendMessage()
	bpGetMessages()
	bpGetNewMessages()
	bpGetBalance()
*/

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

		//console.log('message sent');
	};

	bpws.onmessage = function(evt){

		var received_message = JSON.parse(evt.data);

		//console.log('message received: ' + received_message);
		//console.log(received_message);

		if(callback){
			callback(received_message.balance);
		}
	};

	bpws.onclose = function(){
		//console.log('connection closed');
	};
}