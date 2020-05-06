//NAVBAR
function dropDownFunction() {
    var x = document.getElementById("dropdown");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
}