selected_contents = []
start_tracking = false
selected_contents_text = []

selected = " custom_selected"; // a space has been given intentionally
onhover = " custom_onhover";

// Utils start
// function getPreviousSiblingCount(elem) {
//   var count = 0;
//   while (elem = elem.previousSibling) {
//       if (elem.nodeType === 3) continue; // ignore text nodes
//       count += 1
//   }
//   return count;
// }
// 
// function getElementDistanceFromBody(element){
//     results = []
//     while(element.tagName != "BODY"){
//         results.push(getPreviousSiblingCount(element))
//         element = element.parentNode
//     }
//     return results
// }

function pushContents(element){
    element.className += selected
    element.className = element.className.replace(onhover,'')
    selected_contents.push(element.outerHTML)
    selected_contents_text.push(element.innerText)
}

function popContents(element){
    element.className = element.className.replace(onhover,'')
    index = selected_contents.indexOf(element.outerHTML);
    selected_contents.splice(index, 1);
    selected_contents_text.splice(index, 1)
    element.className = element.className.replace(selected,'')
}
// Utils end

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "get_contents")
      sendResponse({
          'selected_contents': selected_contents,
          'selected_contents_text': selected_contents_text
      });
  });

document.onkeypress = function(e){
    var x = event.which || event.keyCode;
    if(x == 83){ // capital `S`
        start_tracking = !start_tracking
        msg = "annotation stopped"
        if(start_tracking){
          msg = "annotation started"
        }
        alert(msg)
    }
}

document.onmouseover = function(e){
    if(start_tracking){
        e.target.className += onhover
    }
}
document.onmouseout = function(e){
    if(e.target.className){
        e.target.className = e.target.className.replace(onhover,'')
    }
}

document.onclick = function(e){
    if(start_tracking){
        if(e.target.className){
            if(e.target.className.includes(selected)){
                popContents(e.target)
                // selected_contents.pop(e.target.outerHTML)
                // e.target.className = e.target.className.replace(selected,'')
            }else{
                pushContents(e.target)
                // selected_contents.push(e.target.outerHTML)
                // e.target.className += selected
            }
        }else{
            pushContents(e.target)
            // selected_contents.push(e.target.outerHTML)
            // e.target.className += selected
        }
    }
}
