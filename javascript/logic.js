
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA23pSOqjQfpqM81CS1x6-w5yGG2_iL1W0",
    authDomain: "train-schedule-b71b3.firebaseapp.com",
    databaseURL: "https://train-schedule-b71b3.firebaseio.com",
    projectId: "train-schedule-b71b3",
    storageBucket: "train-schedule-b71b3.appspot.com",
    messagingSenderId: "656495627966"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


//on click function to grab information from the form
$("#add-train").on("click", function(event) {
    //prevent default on click 
    event.preventDefault(); 
    //grab train name 
    var trainName = $("#trainName").val().trim(); 
    //grab train destination 
    var trainDestination = $("#trainDestination").val().trim(); 
    //grab first train time 
    var firstTrainTime = $("#startTime").val().trim(); 
    //grab train frequency 
    var trainFrequency = $("#trainFrequency").val().trim(); 
    //push  variables into the firebase database
    database.ref().push({
        trainName: trainName, 
        trainDestination: trainDestination, 
        firstTrainTime: firstTrainTime, 
        trainFrequency: trainFrequency
    });
    
    $(".form-control").val("");

})

database.ref().on("child_added", function(snapshot) {
  //create a variable for the snapshot 
   var sv = snapshot.val(); 
   //create a new row variable with the class "new train"
   var newRow = $("<tr>").addClass("train"); 
   //add var for beginning train name 
   var name = sv.trainName; 
   //add var for destination input 
   var destination = sv.trainDestination; 
   //add var to grab frequency
   var frequency = sv.trainFrequency;
   //convert train start time to formatted time 
   var startTimeConverted = moment(sv.firstTrainTime, "hh:mm").subtract(1, "years"); 
   //grab current time 
    var currentTime = moment();  
    //Difference between the times 
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes"); 
    // time apart (modulo) 
    var tRemainder = timeDiff % frequency; 
   //add variable for how mamy minutes away train is
   var minutesAway = frequency - tRemainder; 
     //add variable for next train arrival time 
   var nextArrivalTime = moment().add(minutesAway, "minutes").format("hh:mm A"); 
   //create cell for each piece of info for the table
   var nameCell = $("<td>").text(name); 
   var destinationCell = $("<td>").text(destination); 
   var frequencyCell = $("<td>").text(frequency); 
   var nextArrivalCell = $("<td>").text(nextArrivalTime); 
   var minutesAwayCell = $("<td>").text(minutesAway); 
   //append a new row to the table 
   $(".table").append(newRow);

   //append cells into the row for the new train 
   $(".train").last().append(nameCell, destinationCell, frequencyCell,
          nextArrivalCell, minutesAwayCell);
});

database.ref().on("value", function(snapshot) {
  
}