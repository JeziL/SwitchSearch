# Switch Search

Switch search engines directly from the results page without retyping the keyword.

This is a simple Safari alternative for the Chrome/Firefox extension [搜索拐杖 (SearchCrutch)](https://github.com/xhhjin/SearchCrutch).

![Demo](assets/demo.gif)

## Supported search engines

- Google
- Baidu
- Bing
- DuckDuckGo

## Add extra sites

A user-friendly config feature **may** (or may not) be added in the future. Currently you can edit the config file located at [`config/engines.json`](https://github.com/JeziL/SwitchSearch/blob/master/config/engines.json).

There is an `engines` array in the config file, and each element is a JSON object representing a search engine.

- `name` \- This is the visible name of the search engine that is displayed on the popover window.
- `hostnameKeyword` \- This is a string used by Switch Search to determine current search engine. It must be contained in the search engine's hostname.
- `keywordParam` \- This is the query (keyword)'s parameter name in the search URL.
- `searchUrl` \- This is the search URL of the search engine.

*All fields are required.*

## Usage

You can install it with Safari’s Extension Builder. Enable the Safari developer tools by clicking "Show Develop menu in menu bar" in the Advanced pane of Safari preferences, then choose Show Extension Builder from the Develop menu.

Unfortunately, the extension will be uninstalled automatically once you restart Safari, unless you have joined the Apple Developer Program (which means you need to pay $99 to Apple every year) and sign it with a developer certificate. Apple sucks.