document.addEventListener('DOMContentLoaded', documentEvents  , false);

function myAction(input) { 
    console.log("input value is : " + input.value);
    alert("The entered data is : " + input.value);
    // do processing with data
    // you need to right click the extension icon and choose "inspect popup"
    // to view the messages appearing on the console.
}

function documentEvents() {    
  document.getElementById('search_button').addEventListener('click', 
    function() { myAction(document.getElementById('title_textbox'));
  });

  // you can add listeners for other objects ( like other buttons ) here 
}