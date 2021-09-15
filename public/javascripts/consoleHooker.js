/*
  This was mainly made for debuging purpuse
*/

//const CustomEvent = document.defaultView.CustomEvent

// Logs
console.defaultLog = console.log.bind(console);
console.logs = [];
console.log = function(){

  // default &  console.log()
  console.defaultLog.apply(console, arguments);

  // new & array data
  console.logs.push(Array.from(arguments));

  // create the custom event
  let logEvent = new CustomEvent("onConsoleLog", {
    args: arguments, 
    logs: console.logs
  });

  // dispach (send) the event to document
  document.dispatchEvent(logEvent);
}

//Errors
console.defaultError = console.error.bind(console);
console.errors = [];
console.error = function(){

  // default &  console.error()
  console.defaultError.apply(console, arguments);

  // new & array data
  console.errors.push(Array.from(arguments));

  // create the custom event
  let errorEvent = new CustomEvent("onConsoleError", {
    args: arguments, 
    logs: console.errors
  });

  // dispach (send) the event to document
  document.dispatchEvent(errorEvent);
}

//Warn
console.defaultWarn = console.warn.bind(console);
console.warns = [];
console.warn = function(){

  // default &  console.warn()
  console.defaultWarn.apply(console, arguments);

  // new & array data
  console.warns.push(Array.from(arguments));

  // create the custom event
  let warnEvent = new CustomEvent("onConsoleWarn", {
    args: arguments, 
    logs: console.warns
  });

  // dispach (send) the event to document
  document.dispatchEvent(warnEvent);
}

//Debug
console.defaultDebug = console.debug.bind(console);
console.debugs = [];
console.debug = function(){
  // default &  console.debug()
  console.defaultDebug.apply(console, arguments);

  // new & array data
  console.debugs.push(Array.from(arguments));

  // create the custom event
  let debugEvent = new CustomEvent("onConsoleDebug", {
    args: arguments, 
    logs: console.debugs
  });

  // dispach (send) the event to document
  document.dispatchEvent(debugEvent);
}