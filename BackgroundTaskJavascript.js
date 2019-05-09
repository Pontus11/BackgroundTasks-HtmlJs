/**
 * Created by pontu on 2018-12-21.
 */
/*
Javascript file that takes care of functionality for when the user presses the start
calculation buttons. When a user clicks one of the start calculation button workers are
initiated using the backgroundWorker.js file, the values in the input fields
corresponding to the button are then given as input to the startBackgroundTask function
as well as the worker and "1" or "0" (determines where to print result of worker).
The startBackgroundTask function then posts a message to the worker which allows it to start working.
 */
var calculating;
var worker;
$(document).ready(function( ) {
  $("#searchButton1").click(function() {
    if(!calculating) {
      $("#result1").empty();
      $("#status1").empty();
      $("#status1").append("Worker1 status: Prime values are being calculated");

      var valueOne = Number($("#valueOne").val());
      var valueTwo = Number($("#valueTwo").val());
      worker = new Worker("backgroundWorker.js");
      startBackgroundTask(worker, valueOne, valueTwo, "0");

      $("#searchButton1").html("Stop calculations");
      calculating = true;
    } else {
      $("#status1").empty();
      $("#status1").append("Worker1 status: Calculations stopped by user");
      worker.terminate();
      calculating = false;
      $("#searchButton1").html("Start calculations");
    }
  });

  var calculating2;
  var worker2;
  $("#searchButton2").click(function() {
    if(!calculating2) {
      $("#result2").empty();
      $("#status2").empty();
      $("#status2").append("Worker2 status: Prime values are being calculated");

      var valueThree = Number($("#valueThree").val());
      var valueFour = Number($("#valueFour").val());
      worker2 = new Worker("backgroundWorker.js");
      startBackgroundTask(worker2, valueThree, valueFour, "1");

      $("#searchButton2").html("Stop calculations");
      calculating2 = true;
    } else {
      $("#status2").empty();
      $("#status2").append("Worker2 status: Calculations stopped by user");
      worker2.terminate();
      calculating2 = false;
      $("#searchButton2").html("Start calculations");
    }
  });
});

function startBackgroundTask(worker, startValue, stopValue, taskNr) {
  worker.onmessage = receivedWorkerMessage;

  worker.postMessage({ nr: taskNr, startVal: startValue, stopVal: stopValue});
}

/*
When a message from a worker is received the data string is first split into an array.
The second value in the array determines if the data should be displayed in result field 1
or 2. The data value found by the worker is then printed to the result field with | added after
it as to differentiate it from previous and later found data values.
If the data sent by the worker is "done." the worker is terminated and the status field is
updated to display the fact that the worker have finished.
 */
function receivedWorkerMessage(event) {
  var value = event.data;
  var valueArray = value.split("_");
  if(valueArray[1] == "0") {
    $("#result1").append(valueArray[0] + " | ");
    if (valueArray[0] == "Done.") {
      $("#status1").empty();
      $("#status1").append("Worker1 status: Calculations have finished!");
      worker.terminate();
    }
  }else {
    $("#result2").append(valueArray[0] + " | ");
    if (valueArray[0] == "Done.") {
      $("#status2").empty();
      $("#status2").append("Worker2 status: Calculations have finished!");
      worker.terminate();
    }
  }
}
