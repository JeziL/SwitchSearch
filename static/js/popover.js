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
    contentBox.innerHTML = 'Unsupported website.';
} else {
    var query = $global.getQuery(currentEngine);
    for (var i = 0; i < engines.length; i++) {
        var e = engines[i];
        var p = document.createElement('p');
        var a = document.createElement('a');
        a.innerHTML = e.name;
        if (e.name != currentEngine.name) {
            a.class = 'enabled';
            a.href = $global.formatSearchURL(query, e).toString();
        } else {
            a.class = 'disabled';
        }
        p.appendChild(a);
        contentBox.appendChild(p);
    } 
}