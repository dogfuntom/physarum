let WebMidi = require('webmidi')
let midi = Array(64).fill(0)

WebMidi.enable(function (err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    }
    var input = WebMidi.inputs[0];
  
    input.addListener('noteon', "all",
      function (e) {
        console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      }
    );
  
    input.addListener('controlchange', "all",
      function (e) {
        console.log("Received 'controlchange' message.", e);
        let [code, number, value] = Array.from(e.data);
        value = value / 127
        console.log(code, number, value);
        if(code == 176)
        midi[number] = value, console.log(midi)
      }
    );
    
    // Listen to NRPN message on all channels
    input.addListener('nrpn', "all",
      function (e) {
        if(e.controller.type === 'entry') {
          console.log("Received 'nrpn' 'entry' message.", e);
        }
        if(e.controller.type === 'decrement') {
          console.log("Received 'nrpn' 'decrement' message.", e);
        }
        if(e.controller.type === 'increment') {
          console.log("Received 'nrpn' 'increment' message.", e);
        }
        console.log("message value: " + e.controller.value + ".", e);
      }
    );  
  });



