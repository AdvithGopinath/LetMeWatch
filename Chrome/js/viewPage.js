let twoEmbUrl = localStorage.getItem('twoEmbUrl');
//let vidSrcUrl = localStorage.getItem('vidSrcUrl');
//let vidCloudUrl = localStorage.getItem('vidCloudUrl');
let dbgoUrl = localStorage.getItem('dbgoUrl');
let movies123Url = localStorage.getItem('movies123Url');
let firesonicUrl = localStorage.getItem('firesonicUrl');
let oneMoviesUrl = localStorage.getItem('oneMoviesUrl');
let trailersToUrl = localStorage.getItem('trailersToUrl');
let vidTitle = localStorage.getItem('vidTitle');
let titleVideo = document.getElementById("titleVideo");
console.log(trailersToUrl);
//titleVideo.src = trailersToUrl;
//titleVideo.setAttribute('sandbox', " ");

//titleVideo.contentWindow.location.replace(trailersToUrl);
/*if ('app' !== $('body').attr('id')) {
    window.setTimeout(function() {
        console.log(window.top.location.href);

        //titleVideo.contentWindow.location.href = trailersToUrl;
        //titleVideo.src = titleVideo.contentWindow.location.href;
    }, 1000);
}
console.log(window.top.location.href);*/
//console.log(window.location.href);

//window.open("../viewPage.html");
//titleVideo.src = "https://Trailers.to/video/test-user/imdb/tt7126948";
/*titleVideo.src = trailersToUrl;
if ('app' !== $('body').attr('id')) {
    window.setTimeout(function() {
        //window.top.location.href = 'https://Trailers.to/video/test-user/imdb/tt7126948';

        //titleVideo.contentWindow.location.href = trailersToUrl;
        //titleVideo.src = titleVideo.contentWindow.location.href;
    }, 3000);
}
var innerDoc = titleVideo.contentWindow;
console.log(innerDoc.body.innerHTML);*/

//window.frames["titleVideo"].location = trailersToUrl;
titleVideo.removeAttribute('sandbox');
titleVideo.contentWindow.location.href = twoEmbUrl; //"https://Trailers.to/video/test-user/imdb/tt7126948"
//titleVideo.src = titleVideo.contentWindow.location.href;

//titleVideo.allowFullScreen = true;
document.title = vidTitle;

//let vcButt = document.getElementById("vidCloudButton");
//let vsButt = document.getElementById("vidSrcButton");
let dbgoButt = document.getElementById("dbgoButton");
let movies123Butt = document.getElementById("movies123Button");
let twoEmbButt = document.getElementById("twoEmbButton");
let firesonicButton = document.getElementById("firesonicButton");
let oneMovieButton = document.getElementById("oneMovieButton");
let trailersToButton = document.getElementById("trailersToButton");
let serverButt = document.getElementById("serversButton");
//serverButt.style.width = "175px";

let serverOptions = document.getElementById("serverOptions");
serverButt.addEventListener('click', () => {
    if (serverOptions.style.display == "none") {
        serverOptions.style.display = "block";
    } else {
        serverOptions.style.display = "none";
    }
});

/*vcButt.addEventListener('click', () => {
    titleVideo.src = vidCloudUrl;
    serverButt.innerText = "VIDCLOUD";
    serverOptions.style.display = "none";
});

vsButt.addEventListener('click', () => {
    titleVideo.src = vidSrcUrl;
    serverButt.innerText = "VIDSRC";
    serverOptions.style.display = "none";

});*/

dbgoButt.addEventListener('click', () => {
    //titleVideo.removeAttribute('sandbox');
    titleVideo.setAttribute('sandbox', "allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation");
    //


    titleVideo.src = dbgoUrl;
    titleVideo.contentWindow.location.href = dbgoUrl;
    //serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">DBGO &nbsp;&nbsp;&#x25BE;</button>`;
    serverButt.innerHTML = `
        DBOGO
        <div id="dropdownarrow" style="position: absolute;top: 6px;left: 135px;">&#x25BE;</div>
    `;
    //titleVideo.removeAttribute('sandbox');
    //serverButt.style.width = "175px";
    titleVideo.style.top = "0px";
    titleVideo.style.left = "2px";
    serverButt.style.top = "12px";
    serverOptions.style.display = "none";
});

trailersToButton.addEventListener('click', () => {

    //titleVideo.removeAttribute('sandbox');
    //titleVideo.setAttribute('sandbox', "allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation");
    titleVideo.setAttribute('sandbox', "allow-same-origin allow-scripts");

    //titleVideo.src = trailersToUrl;

    /*if ('app' !== $('body').attr('id')) {
        window.setTimeout(function() {
            window.top.location.href = 'https://Trailers.to/video/test-user/imdb/tt7126948';
        }, 5000);
    }*/
    titleVideo.style.top = "1px";
    titleVideo.style.left = "0px";
    titleVideo.contentWindow.location.href = trailersToUrl; //"https://Trailers.to/video/test-user/imdb/tt7126948";
    //serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">DBGO &nbsp;&nbsp;&#x25BE;</button>`;
    //serverButt.innerText = "TRAILERS.TO";
    serverButt.innerHTML = `
        TRAILERS.TO
        <div id="dropdownarrow" style="position: absolute;top: 6px;left: 135px;">&#x25BE;</div>
    `;
    //serverButt.style.width = "175px";
    serverOptions.style.display = "none";
});

twoEmbButt.addEventListener('click', () => {
    titleVideo.removeAttribute('sandbox');
    titleVideo.style.top = "2px";
    titleVideo.style.left = "2px";

    titleVideo.src = twoEmbUrl;
    titleVideo.contentWindow.location.href = twoEmbUrl;



    //serverButt.innerText = "2EMBED &nbsp;&nbsp;&#x25BE;";
    //serverButt.innerText = "2EMBED";
    serverButt.innerHTML = `
        2EMBED
        <div id="dropdownarrow" style="position: absolute;top: 6px;left: 135px;">&#x25BE;</div>
    `;
    //serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">2EMBED &nbsp;&nbsp;&#x25BE;</button>`;
    //serverButt.style.width = "175px";

    serverOptions.style.display = "none";
});

movies123Butt.addEventListener('click', () => {
    titleVideo.setAttribute('sandbox', "allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation");

    titleVideo.src = movies123Url;
    //serverButt.innerText = "123MOVIES &nbsp;&nbsp;&#x25BE;";
    serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">123MOVIES &nbsp;&nbsp;&#x25BE;</button>`;
    // serverButt.style.width = "175px";

    serverOptions.style.display = "none";
});

firesonicButton.addEventListener('click', () => {
    titleVideo.src = firesonicUrl;
    //serverButt.innerText = "FIRESONIC &nbsp;&nbsp;&#x25BE;";
    serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">FIRESONICE &nbsp;&nbsp;&#x25BE;</button>`;
    serverButt.style.width = "175px";

    serverOptions.style.display = "none";

});

oneMovieButton.addEventListener('click', () => {
    titleVideo.src = oneMoviesUrl;
    // serverButt.innerText = "1MOVIETV &nbsp;&nbsp;&#x25BE;";
    serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">1MOVIETV &nbsp;&nbsp;&#x25BE;</button>`;
    serverButt.style.width = "175px";

    serverOptions.style.display = "none";

});

if (firesonicUrl == "N/A") {
    firesonicButton.style.display = "none";
}
/*const clear = (() => {
    const defined = v => v !== null && v !== undefined;
    const timeout = setInterval(() => {
        const ad = [...document.querySelectorAll('.ad-showing')][0];
        if (defined(ad)) {
            const video = document.querySelector('video');
            if (defined(video)) {
                video.currentTime = video.duration;
            }
        }
    }, 500);
    return function() {
        clearTimeout(timeout);
    }
})();
clear();

(function() {

    var CuteSelect = CuteSelect || {};

    FIRSTLOAD = true;
    SOMETHINGOPEN = false;

    CuteSelect.tools = {
        canRun: function() {
            var myNav = navigator.userAgent.toLowerCase();
            var browser = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
            if (browser) {
                return (browser > 8) ? true : false;
            } else { return true; }
        },
        uniqid: function() {
            var n = Math.floor(Math.random() * 11);
            var k = Math.floor(Math.random() * 1000000);
            var m = String.fromCharCode(n) + k;
            return m;
        },
        hideEverything: function() {
            if (SOMETHINGOPEN) {
                SOMETHINGOPEN = false;
                targetThis = false;
                var cells = document.getElementsByTagName('div');
                for (var i = 0; i < cells.length; i++) {
                    if (cells[i].hasAttribute('data-cuteselect-options')) {
                        var parent = cells[i].parentNode;
                        cells[i].style.opacity = '0';
                        cells[i].style.display = 'none';
                    }
                }
            }
        },
        getStyle: function() {
            var css = '';
            var stylesheets = document.styleSheets;
            var css = '';
            for (s = 0; s < stylesheets.length; s++) {
                var classes = stylesheets[s].rules || stylesheets[s].cssRules;
                for (var x = 0; x < classes.length; x++) {
                    if (classes[x].selectorText != undefined) {
                        var selectPosition = classes[x].selectorText.indexOf('select');
                        var optionPosition = classes[x].selectorText.indexOf('option');
                        var selectChar = classes[x].selectorText.charAt(selectPosition - 1);
                        var optionChar = classes[x].selectorText.charAt(optionPosition - 1);
                        if (selectPosition >= 0 && optionPosition >= 0 && (selectChar == '' || selectChar == '}' || selectChar == ' ') && (optionChar == '' || optionChar == '}' || optionChar == ' ')) {
                            text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
                            css += text.replace(/\boption\b/g, '[data-cuteselect-value]').replace(/\bselect\b/g, '[data-cuteselect-item]');
                            continue;
                        }
                        if (selectPosition >= 0) {
                            var character = classes[x].selectorText.charAt(selectPosition - 1);
                            if (character == '' || character == '}' || character == ' ') {
                                text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
                                css += text.replace(/\bselect\b/g, '[data-cuteselect-item]');
                            }
                        }
                        if (optionPosition >= 0) {
                            var character = classes[x].selectorText.charAt(optionPosition - 1);
                            if (character == '' || character == '}' || character == ' ') {
                                text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
                                css += text.replace(/\boption\b/g, '[data-cuteselect-value]');
                            }
                        }
                    }
                }
            }

            return css;
        },
        createSelect: function(item) {

            // Create custom select
            var node = document.createElement("div");
            if (item.hasAttribute('id')) { // Catch ID
                node.setAttribute('id', item.getAttribute('id'));
                item.removeAttribute('id');
            }
            if (item.hasAttribute('class')) { // Catch Class
                node.setAttribute('class', item.getAttribute('class'));
                item.removeAttribute('class');
            }

            // Hide select
            item.style.display = 'none';

            // Get Default value (caption)
            var caption = null;
            var cells = item.getElementsByTagName('option');
            for (var i = 0; i < cells.length; i++) {
                caption = cells[0].innerHTML;
                if (cells[i].hasAttribute('selected')) {
                    caption = cells[i].innerHTML;
                    break;
                }
            }

            // Get select options
            var options = '<div data-cuteselect-title>' + caption + '</div><div data-cuteselect-options><div data-cuteselect-options-container>';
            var cells = item.getElementsByTagName('option');
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].hasAttribute('disabled')) { continue; }
                if (cells[i].hasAttribute('class')) { var optionStyle = ' class="' + cells[i].getAttribute('class') + '"'; } else { var optionStyle = ''; }
                if (cells[i].hasAttribute('id')) { var optionId = ' id="' + cells[i].getAttribute('id') + '"'; } else { var optionId = ''; }
                if (cells[i].hasAttribute('selected')) { options += '<div data-cuteselect-value="' + cells[i].value + '" data-cuteselect-selected="true"' + optionStyle + optionId + '>' + cells[i].innerHTML + '</div>'; } else { options += '<div data-cuteselect-value="' + cells[i].value + '"' + optionStyle + optionId + '>' + cells[i].innerHTML + '</div>'; }
            }
            options += '</div></div>';

            // New select customization
            node.innerHTML = caption;
            node.setAttribute('data-cuteselect-item', CuteSelect.tools.uniqid());
            node.innerHTML = options; // Display options
            item.setAttribute('data-cuteselect-target', node.getAttribute('data-cuteselect-item'));
            item.parentNode.insertBefore(node, item.nextSibling);

            // Hide all options
            CuteSelect.tools.hideEverything();
        },
        show: function(item) {
            if (item.parentNode.hasAttribute('data-cuteselect-item')) { var source = item.parentNode.getAttribute('data-cuteselect-item'); } else { var source = item.getAttribute('data-cuteselect-item'); }
            var cells = document.getElementsByTagName('select');
            if (item.hasAttribute('data-cuteselect-title')) {
                item = item.parentNode;
                var cells = item.getElementsByTagName('div');
            } else { var cells = item.getElementsByTagName('div'); }
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].hasAttribute('data-cuteselect-options')) {
                    targetItem = cells[i];
                    cells[i].style.display = 'block';
                    setTimeout(function() { targetItem.style.opacity = '1'; }, 10);
                    cells[i].style.position = 'absolute';
                    cells[i].style.left = item.offsetLeft + 'px';
                    cells[i].style.top = (item.offsetTop + item.offsetHeight) + 'px';
                }
            }

            item.focus();

            SOMETHINGOPEN = item.getAttribute('data-cuteselect-item');
        },
        selectOption: function(item) {
            var label = item.innerHTML;
            var value = item.getAttribute('data-cuteselect-value');
            var parent = item.parentNode.parentNode.parentNode;
            var target = parent.getAttribute('data-cuteselect-item');
            var cells = parent.getElementsByTagName('div');
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].hasAttribute('data-cuteselect-title')) { cells[i].innerHTML = label; }
            }

            // Real select
            var cells = document.getElementsByTagName('select');
            for (var i = 0; i < cells.length; i++) {
                var source = cells[i].getAttribute('data-cuteselect-target');
                if (source == target) { cells[i].value = value; }
            }
            CuteSelect.tools.hideEverything();
        },
        writeStyles: function() {
            toWrite = '<style type="text/css">' + CuteSelect.tools.getStyle() + ' [data-cuteselect-options] { opacity: 0; display: none; }</style>';
            document.write(toWrite);
        }
    };

    CuteSelect.event = {
        parse: function() {
            var cells = document.getElementsByTagName('select');
            for (var i = 0; i < cells.length; i++) { CuteSelect.tools.createSelect(cells[i]); }
        },
        listen: function() {
            document.onkeydown = function(evt) {
                evt = evt || window.event;
                if (evt.keyCode == 27) { CuteSelect.tools.hideEverything(); }
            };
            document.onclick = function(event) {
                FIRSTLOAD = false;
                if ((!event.target.getAttribute('data-cuteselect-item') && !event.target.getAttribute('data-cuteselect-value') && !event.target.hasAttribute('data-cuteselect-title')) || ((event.target.hasAttribute('data-cuteselect-item') || event.target.hasAttribute('data-cuteselect-title')) && SOMETHINGOPEN)) {
                    CuteSelect.tools.hideEverything();
                    return;
                }
                var action = event.target;
                if (event.target.getAttribute('data-cuteselect-value')) {
                    CuteSelect.tools.selectOption(action);
                    CuteSelect.tools.hideEverything();
                } else { CuteSelect.tools.show(action); }
                return false;
            }
        },
        manage: function() {
            if (CuteSelect.tools.canRun()) { // IE Compatibility
                CuteSelect.event.parse();
                CuteSelect.event.listen();
                CuteSelect.tools.writeStyles();
            }
        }
    };

    CuteSelect.event.manage();

})();*/

//let document.getElementsByClassName("dropdown-menu dropdown-menu-model");
/*chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['adstop.js'],
        },
        () => {
            console.log("ads blocked!")
        });
});*/

/*let serverDropdown = document.createElement("div");
let serverDropdown = document.getElementById("serverDropdown");
serverDropdown.innerHTML = `
    <button class="dropbtn">Servers</button>
    <div class="dropdown-server-content">
        <a href="#">Server 1</a>
        <a href="#">Server 2</a>
        <a href="#">Server 3</a>
    </div>
`;

let tryDiffButt1 = document.getElementById("tryDiff1");
tryDiffButt1.style.display = 'none';
tryDiffButt1.addEventListener('click', function() {
    tryDiffButt1.style.display = 'none';
    if (titleVideo.src === twoEmbUrl) {
        titleVideo.setAttribute('sandbox', "allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation");
        titleVideo.src = vidSrcUrl;

    } else if (titleVideo.src === vidSrcUrl) {
        titleVideo.src = twoEmbUrl;

    }

    titleVideo.allowFullScreen = true;
    document.title = vidTitle;
    tryDiffButt1.style.display = 'none';


});*/