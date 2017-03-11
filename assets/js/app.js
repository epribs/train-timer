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

		var newRow = $("<tr>");
		var newName = $("<td>");
		var newFreq = $("<td>");
		var newTrain = $("<td>");
		var newDest = $("<td>");

		newName.text(tName);
		newFreq.text(tFreq);
		newTrain.text(fTrain);
		newDest.text(desination);

		newRow.append(newName, newFreq, newTrain, newDest);
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

	var now = moment(new Date());
	var end = moment();

	database.ref().push({

	})
});