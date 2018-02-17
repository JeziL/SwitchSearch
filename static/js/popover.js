var contentBox = document.getElementById('engines');
var $global = safari.extension.globalPage.contentWindow;

contentBox.innerHTML = $global.engines[0].name;