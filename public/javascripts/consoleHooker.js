/*
  This was mainly made for debuging purpuse
*/

// Logs
console.defaultLog = console.log.bind(console);
console.logs = [];
console.log = function(){

  // default &  console.log()
  console.defaultLog.apply(console, arguments);

  // new & array data
  console.logs.push(Array.from(arguments));

  // create the custom events
  let logEvent = new CustomEvent("onConsoleLog", {
    detail: {
      args: arguments
    }
  });

  let allLogEvenvt = new CustomEvent("onConsoleEny", {
      detail: {
        args: arguments
      }
  });

  // dispach (send) the events to document
  document.dispatchEvent(logEvent);
  document.dispatchEvent(allLogEvenvt);
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
    detail: {
      args: arguments
    }
  });

  let allLogEvenvt = new CustomEvent("onConsoleEny", {
      detail: {
        args: arguments
      }
  });

  // dispach (send) the event to document
  document.dispatchEvent(errorEvent);
  document.dispatchEvent(allLogEvenvt);
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
    detail: {
      args: arguments
    }
  });

  let allLogEvenvt = new CustomEvent("onConsoleEny", {
      detail: {
        args: arguments
      }
  });
  
  // dispach (send) the event to document
  document.dispatchEvent(warnEvent);
  document.dispatchEvent(allLogEvenvt);
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
    detail: {
      args: arguments
    }
  });

  let allLogEvenvt = new CustomEvent("onConsoleEny", {
      detail: {
        args: arguments
      }
  });

  // dispach (send) the event to document
  document.dispatchEvent(debugEvent);
  document.dispatchEvent(allLogEvenvt);
}



window.onerror = (msg, src, line, col, err) => {
  alert(`${msg}, ${src} [${line}:${col}]`);
  alert('=========STACKTRACE=========\n' + err.stack.toString());
}

window.addEventListener('onConsoleEny', e => {
  alert(e.detail.args.join(", "));
});