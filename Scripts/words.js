function words(input, output) {
  var                            // declare several things at once.
    active = input.split(''), // separate input string into array with one letter per index
    terminal = document.getElementById("term"); // declare terminal paragraph
  if (input === output) {
    terminal.innerHTML += '<br/>' + 'ERROR: The strings must be different' + '<br/>'
  } else {         // if input and output is different
    if (input.length === output.length) { // if input and output has same length
      terminal.innerHTML += '<br/>' + active.join('') + '<br/>'; //add initial active as string
      for (var i = 0; i < input.length; i++) { // for length of input
        active[i] = output[i];                 //current active letter is current output letter
        terminal.innerHTML += active.join('') + '<br/>'; //turn active into string and print it
      }
      terminal.innerHTML += "  ";      //add empty line after each turn
    } else {
      terminal.innerHTML += '<br/>' + 'ERROR: The strings must be of equal length' + '<br/>'
    }
  }
}

function custom() {
  // take forms and pass them to words()
  var
    input = document.forms[0][0].value,
    output = document.forms[0][1].value;
  words(input, output);
}
