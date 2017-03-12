// Initialize Firebase
var config = {
apiKey: "AIzaSyApB7bVSxeZUaC43IwcAeiGIvdUWEifjV4",
authDomain: "pink-panther-359a8.firebaseapp.com",
databaseURL: "https://pink-panther-359a8.firebaseio.com",
storageBucket: "pink-panther-359a8.appspot.com",
messagingSenderId: "173378761552"
};
firebase.initializeApp(config);

var database = firebase.database();



database.ref().on("child_added", function(snapshot) {
	if ((snapshot.child("name").exists()) && (snapshot.child("desination").exists())) {
		var tName = snapshot.val().name;
		var tFreq = snapshot.val().frequency;
		var fTrain = snapshot.val().fTrain;
		var desination = snapshot.val().desination;

		var now = moment();
		var totalTime = now.diff(moment(fTrain, "minutes"));
		console.log("totalTime: " + totalTime);
		var timeTaken = totalTime % tFreq;
		console.log("timeTaken: " + timeTaken);
		var timeLeft = totalTime - timeTaken;
		console.log("timeLeft: " + timeLeft);
		var nTrain = moment().add(timeLeft);
		console.log("nTrain: " + nTrain);


		var newRow = $("<tr>");
		var newName = $("<td>");
		var newFreq = $("<td>");
		var newTrain = $("<td>");
		var newDest = $("<td>");
		var tLeft = $("<td>");
		var nextTrain = $("<td>");

		newName.text(tName);
		newFreq.text(tFreq);
		newTrain.text(fTrain);
		newDest.text(desination);
		tLeft.text(timeLeft);
		nextTrain.text(nTrain);

		newRow.append(newName, newDest, newFreq, nextTrain, tLeft, newTrain);
		$("#train-table").append(newRow);
	}
}, function(err) {
	console.log("The read failed: " + err.code);
});

$("#submit-btn").on("click", function(e){
	e.preventDefault();
	var trainName = $("#name-input").val().trim();
	var trainFreq = $("#trainFreq-input").val().trim();
	var trainFirst = $("#fTrain-input").val().trim();
	var trainDest = $("#destination-input").val().trim();

	database.ref().push({
		name: trainName,
		frequency: trainFreq,
		fTrain: trainFirst,
		desination: trainDest
	})
});