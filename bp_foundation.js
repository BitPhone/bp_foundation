// bp_foundation.js

/*
	todo:
	bpSendMessage()
	bpGetMessages()
	bpGetNewMessages()
	bpGetBalance()
*/

function bpGetBalance(callback){

	// connect to namecoin websocket
	var bpws = new WebSocket('ws://127.0.0.1:1313');

	// call getinfo
	bpws.onopen = function(){

		bpws.send('getinfo');

		console.log('message sent');
	};

	bpws.onmessage = function(evt){

		var received_message = evt.data;

		console.log('message received: ' + received_message);

		if(callback){
			callback(received_message);
		}
	};

	bpws.onclose = function(){
		console.log('connection closed');
	};
}