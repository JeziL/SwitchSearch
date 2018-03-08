// ==UserScript==
// @name         Switch Search
// @namespace    0x783A
// @version      0.9
// @description  Switch search engines quickly.
// @author       Wang Jinli
// @include      *://*.baidu.com/*
// @include      *://*.google.co*
// @include      *://*.bing.com/*
// @include      *://*.duckduckgo.com/*
// @grant        GM_addStyle
// ==/UserScript==

let engines = [
    {
        "name": "Google",
        "hostnameKeyword": "google",
        "keywordParam": "q",
        "searchUrl": "https://www.google.com/search"
    },
    {
        "name": "Baidu",
        "hostnameKeyword": "baidu",
        "keywordParam": "wd",
        "searchUrl": "https://www.baidu.com/s"
    },
    {
        "name": "Bing",
        "hostnameKeyword": "bing",
        "keywordParam": "q",
        "searchUrl": "http://cn.bing.com/search?ensearch=1"
    },
    {
        "name": "DuckDuckGo",
        "hostnameKeyword": "duckduckgo",
        "keywordParam": "q",
        "searchUrl": "https://duckduckgo.com/"
    }
];

function insertParam(url, key, value) {
    key = encodeURI(key); value = encodeURI(value);
    var kvp = url.search.substr(1).split('&');
    var i = kvp.length; var x;
    while (i--) {
        x = kvp[i].split('=');
        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }
    url.search = kvp.join('&');
    return url;
}

function getEngineByName(name) {
    for (var i = 0; i < engines.length; i++) {
        var e = engines[i];
        if (e.name == name) {
            return e;
        }
    }
    return null;
}

function getQuery(engine) {
    var url = new URL(window.location.href);
    return url.searchParams.get(engine.keywordParam);
}

function showList(query, currentEngine) {
    var ssArea = document.createElement("div");
    ssArea.classList.add("select");
    document.body.appendChild(ssArea);
    var select = document.createElement("select");
    select.id = "ssOptions";
    for (var i = 0; i < engines.length; i++) {
        var e = engines[i];
        var option = document.createElement("option");
        option.value = e.name;
        option.text = e.name;
        if (e.name == currentEngine.name) {
            option.selected = true;
        }
        select.appendChild(option);
    }
    select.onchange = function () {
        engineSwitched(select, query);
    };
    ssArea.appendChild(select);
}

function engineSwitched(selectObj, query) {
    var name = selectObj.options[selectObj.selectedIndex].value;
    var engine = getEngineByName(name);
    var url = new URL(engine.searchUrl);
    if (query == null) {
        return url.origin;
    }
    window.open(insertParam(url, engine.keywordParam, query), "_self");
}

(function () {
    'use strict';

    GM_addStyle((<><![CDATA[
        @charset "UTF-8";
        /* Reset Select */
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            outline: 0;
            box-shadow: none;
            border: 0 !important;
            background: #2c3e50;
            background-image: none;
        }
        /* Custom Select */
        .select {
            bottom: 100px;
            right: 80px;
            width: 9em;
            height: 2.5em;
            position: fixed;
            z-index: 16777271;
            border-radius: .25em;
            line-height: 2.4;
        }
        select {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0 0 0 .5em;
            color: #fff;
            cursor: pointer;
        }
        select::-ms-expand {
            display: none;
        }
        /* Arrow */
        .select::after {
            content: '\25BC';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            padding: 0 0.8em;
            background: #34495e;
            pointer-events: none;
            border-radius: .25em;
        }
        /* Transition */
        .select:hover::after {
            color: #fff;
        }
        .select::after {
            -webkit-transition: .25s all ease;
            -o-transition: .25s all ease;
            transition: .25s all ease;
        }
    ]]></>).toString());
    var hostname = window.location.hostname;
    var currentEngine = null;
    for (var i = 0; i < engines.length; i++) {
        var e = engines[i];
        if (hostname.indexOf(e.hostnameKeyword) >= 0) {
            currentEngine = e;
            var query = getQuery(currentEngine);
            if (query != null) {
                showList(query, currentEngine);
            }
        }
    }
})();