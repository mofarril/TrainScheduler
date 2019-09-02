console.log("linked")

///STEPPERS:
// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve train info from the train database.
// 4. Create a way to calculate next arrival. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes and show that in minutes away.
// 5. Calculate minutes

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1. Initialize Firebase
const config = {
    apiKey: "AIzaSyAYprSDrtK6xHH9On0zTPnTpsbvRTZA3JM",
    authDomain: "madisonpro-ac49d.firebaseapp.com",
    databaseURL: "https://madisonpro-ac49d.firebaseio.com",
    projectId: "madisonpro-ac49d",
    storageBucket: "",
    messagingSenderId: "946291544102",
    appId: "1:946291544102:web:e840905a2095b954"
};

firebase.initializeApp(config);

const database = firebase.database();

//1-complete

// 2. Button for adding Trains:

$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

//////get user input////

    let tName = $("#train-name-input").val().trim();
    let tDestination = $("#destination-input").val().trim(); 
    let firstT = $("#firstT-input").val().trim(); //time stuff for format?
    let freq = $("#frequency-input").val().trim(); 

//////TEMP OBJ to hold train data///////////

    let newTrain = {

        tName: tName,
        tDestination: tDestination, 
        firstT: firstT, 
        freq: freq
    };

//uploads train data to database /// 

    database.ref().push(newTrain); 

//logs everything to console

console.log(tName.tName);
console.log(tDestination.tDestination); 
console.log(firstT.firstT);
console.log(freq.freq);

/////CLEARS TXT BOXES////////

$("#train-name-input").val("");
$("#destination-input").val("");
$("#firstT-input").val("");
$("#frequency-input").val("");

}); //closes on click for add-train-btn

//2-complete
//3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

// store info in variables:

let tName = childSnapshot.val().tName;
let tDestination = childSnapshot.val().tDestination;
let firstT = childSnapshot.val().firstT;
let freq = childSnapshot.val().freq;

///log train variables
console.log(tName);
console.log(tDestination);
console.log(firstT);
console.log(freq);

// step 3 completish
//4. MISSHING SHITTTT

//first train time 

let fTrainTimeConvert = moment(firstT, "HH:mm").subtract(1, "years");
//console.log(fTrainTimeConvert);

//current time

let currentTime = moment();
//console.log("Current Time: " + moment(currentTime).format("HH:mm A"))

//difference between start time and now

let tDiff = moment().diff(moment(fTrainTimeConvert), "minutes");
//console.log("Time Difference: " + tDiff);

// time apart (remainder)

let remainT = tDiff % freq; 
//console.log(remainT); 

//until next train 

let mAway = freq - remainT; 
//console.log("Min till Train: " + mAway);

//NXT Train

let nextT = moment().add(mAway, "minutes").format("HH:mm");
//console.log("Arriving: " + moment(nextT).format("HH:mm A"));

//creating new row for data to show in HTML (end of step 3)

let newTrainRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(freq),
    $("<td>").text(nextT),
    $("<td>").text(mAway)
);

//append row to table

$("#train-table").append(newTrainRow); 

}); // closes database ref .on