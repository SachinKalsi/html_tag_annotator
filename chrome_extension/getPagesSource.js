chrome.runtime.sendMessage({
    action: "get_page_source",
    page_source: {
        'html': document.documentElement.outerHTML,
        'url': window.location.href
    } 
});