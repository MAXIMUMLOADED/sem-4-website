var myDict = {
  P1: false,
  P2: false,
  P3: false,
  P4: false,
  P5: false,
  P6: false,
};

setInterval(GetData, 5000); //millisecond
function GetData() {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      for (var key in myDict) {
        if (this.responseText != undefined && this.responseText.includes(key)) {
          myDict[key] = true;
        } else {
          myDict[key] = false;
        }
      }
      UpdateDashboard(myDict);
    }
  });
  xhr.open("GET", "http://127.0.0.1:5000/getdata");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.send();
}

function UpdateDashboard(_myDict) {
  for (var key in myDict) {
    const button = document.getElementById("button" + key);
    if (!myDict[key]) {
      button.classList.add("red");
    } else {
      button.classList.remove("red");
    }
  }
}
