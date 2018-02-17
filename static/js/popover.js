var contentBox = document.getElementById('engines');
var $global = safari.extension.globalPage.contentWindow;

var engines = $global.engines;
var hostname = $global.currentHostname();
var currentEngine = null;
for (var i = 0; i < engines.length; i++) {
    var e = engines[i];
    if (hostname.indexOf(e.hostnameKeyword) >= 0) {
        currentEngine = e;
    }
}

if (currentEngine == null) {
    contentBox.innerHTML = "Unsupported website.";
} else {
    contentBox.innerHTML = currentEngine.name;
}