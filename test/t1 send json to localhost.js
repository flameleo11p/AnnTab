
function send_localhost(data) {
  var req = {
    url: 'http://localhost:41069/log/',
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    data: JSON.stringify(data)
  };

  var data = {'bob':'foo','paul':'dog'};
  $.ajax({
    url: url,
    type: 'POST',
    contentType:'application/json',
    data: JSON.stringify(data),
    dataType:'json'
  });  \


  var xhr = new XMLHttpRequest();
  var url = "url";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          console.log(json.email + ", " + json.password);
      }
  };
  var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
  xhr.send(data);  

  const dataToSend = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
let dataReceived = ""; 
fetch("", {
    credentials: "same-origin",
    mode: "same-origin",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: dataToSend
})
    .then(resp => {
        if (resp.status === 200) {
            return resp.json()
        } else {
            console.log("Status: " + resp.status)
            return Promise.reject("server")
        }
    })
    .then(dataJson => {
        dataReceived = JSON.parse(dataJson)
    })
    .catch(err => {
        if (err === "server") return
        console.log(err)
    })

console.log(`Received: ${dataReceived}`)  

}