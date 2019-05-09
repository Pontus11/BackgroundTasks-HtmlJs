/**
 * Created by pontu on 2018-12-21.
 */
/*
Javascript file for the functionality of the worker.
first retrieves the start value, stop value and worker nr from the data string sent to the worker.
it then calls the addNumbers function to start the calculations.
 */
onmessage = function(event) {
  var startVal = event.data.startVal;
  var stopVal = event.data.stopVal;
  var workerNr = event.data.nr;
  addNumbers(startVal, stopVal, workerNr);
}

/*
systematically increases the value being tested to find the next biggest prime. If a new
prime value is found it is posted to the main javascript file.
usesthe isPrime function to determine if value is a prime
 */
function addNumbers(start, stop, workerNr) {
  var startVal = Number(start);
  var stopVal = Number(stop);
  if(startVal%2 == 0) {
    startVal++;
  }
  var lastPrime = startVal;
  while(true) {
    if (isPrime(lastPrime)) {
      postMessage(lastPrime + "_" + workerNr);
    }
    lastPrime += 2;
    if(lastPrime > stopVal) {
      postMessage("Done." + "_" + workerNr);
      break;
    }
  }
}
/*
 checks if value is a prime value or not
 */
function isPrime(val) {
  sqrt = Math.sqrt(val);
  for(var i = 3; i <= sqrt; i += 2)
  if(val % i == 0) return false;
  return true;
}
