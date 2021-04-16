var extract_url = "http://127.0.0.1:5000";

contents = []

function getSelectedContents(cb){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "get_contents"}, function(response){
            if(typeof cb == "function"){
                cb(response)
            }else{
                alert(response.selected_contents.join(', '))
            }
        });
    });
}

function annotateData(){
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      if (chrome.runtime.lastError) {
          alert('There was an error injecting script : \n');
      }
    });
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "get_page_source") {
      data = request['page_source'] //html ,url
      getSelectedContents(function(response){
          data['selected_contents'] =   response['selected_contents'];
          data['selected_contents_text'] = response['selected_contents_text'];
          postData(data)
    });
  }
});

function postData(data){
    var request = new XMLHttpRequest();
    request.open("POST", extract_url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = onComplete;
    document.getElementById('message').innerHTML = "sending request ... Please wait!!";
    request.send(JSON.stringify(data));
}

function onComplete(event) {
  var customMessage = document.getElementById('message');
  const response = JSON.parse(event.currentTarget.response);
  color = "#9C27B0"
  if(!response.success) {
    color = 'red';
  }
  customMessage.style.color = color;
  customMessage.innerHTML = response.message;
}


document.addEventListener('DOMContentLoaded', function() {
    view_contents = document.getElementById('view_contents')
    view_contents.addEventListener('click', getSelectedContents);
    
    document.getElementById('extract').addEventListener('click', annotateData);
});



// 
// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if (request.action == "getSource") {
//     extractData(request.source)
//   }
// });
// 
// function extractData(html_) {
//   var request = new XMLHttpRequest();
//   request.open("POST", extract_url, true);
//   request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   request.onload = onComplete;
//   document.getElementById('message').innerHTML = "sending request ... Please wait!!";
//   request.send(JSON.stringify({ "html_": html_}));
// }
// 
// function onComplete(event) {
//   var customMessage = document.getElementById('message');
//   const response = JSON.parse(event.currentTarget.response);
//   color = "#9C27B0"
//   if(!response.success) {
//     color = 'red';
//   }
//   customMessage.style.color = color;
//   customMessage.innerHTML = response.message;
// }
