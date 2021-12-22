let twoEmbUrl = localStorage.getItem('twoEmbUrl');
let vidSrcUrl = localStorage.getItem('vidSrcUrl');
let dbgoUrl = localStorage.getItem('dbgoUrl');
let firesonicUrl = localStorage.getItem('firesonicUrl');
let trailersToUrl = localStorage.getItem('trailersToUrl');

let vidTitle = localStorage.getItem('vidTitle');
let titleVideo = document.getElementById("titleVideo");
console.log(trailersToUrl);

titleVideo.removeAttribute('sandbox');
titleVideo.contentWindow.location.href = twoEmbUrl;
document.title = vidTitle;

let vidSrcButt = document.getElementById("vidSrcButton");
let dbgoButt = document.getElementById("dbgoButton");
let twoEmbButt = document.getElementById("twoEmbButton");
let firesonicButton = document.getElementById("firesonicButton");
let trailersToButton = document.getElementById("trailersToButton");
let serverButt = document.getElementById("serversButton");

/*let serverOptions = document.getElementById("serverOptions");
serverButt.addEventListener('click', () => {
    if (serverOptions.style.display == "none") {
        serverOptions.style.display = "block";
    } else {
        serverOptions.style.display = "none";
    }
});
*/
vidSrcButt.addEventListener('click', () => {
    titleVideo.style.display = "none";
    titleVideo.removeAttribute('sandbox');
    titleVideo.src = vidSrcUrl;
    titleVideo.contentWindow.location.href = vidSrcUrl;
    serverButt.innerHTML = `
        VIDSRC
    `;

    titleVideo.style.left = "0px";
    titleVideo.style.top = "-50px";
    titleVideo.style.height = "105%";

    titleVideo.style.display = "unset";


    // serverOptions.style.display = "none";
});

dbgoButt.addEventListener('click', () => {
    //titleVideo.removeAttribute('sandbox');
    titleVideo.setAttribute('sandbox', "allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation");
    titleVideo.style.top = "4px";
    titleVideo.style.left = "0px";


    titleVideo.src = dbgoUrl;
    titleVideo.contentWindow.location.href = dbgoUrl;
    serverButt.innerHTML = `
        DBOGO
    `;

    //serverOptions.style.display = "none";
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
    titleVideo.style.top = "33px";
    titleVideo.style.left = "0px";
    titleVideo.contentWindow.location.href = trailersToUrl; //"https://Trailers.to/video/test-user/imdb/tt7126948";
    //serverButt.innerHTML = `<button class="pill-servers" id="serversButton" style="position: fixed;z-index: 1;">DBGO &nbsp;&nbsp;&#x25BE;</button>`;
    //serverButt.innerText = "TRAILERS.TO";
    serverButt.innerHTML = `
        TRAILERS.TO
    `;
    //serverButt.style.width = "175px";
    //serverOptions.style.display = "none";
});

twoEmbButt.addEventListener('click', () => {
    titleVideo.removeAttribute('sandbox');
    titleVideo.style.top = "0px";
    titleVideo.style.left = "0px";
    titleVideo.src = twoEmbUrl;
    titleVideo.contentWindow.location.href = twoEmbUrl;

    serverButt.innerHTML = `
        2EMBED
    `;
    //serverOptions.style.display = "none";
});

firesonicButton.addEventListener('click', () => {
    titleVideo.src = firesonicUrl;
    titleVideo.contentWindow.location.href = firesonicUrl;
    serverButt.innerHTML = `
        FIRESONIC
    `;
    titleVideo.style.top = "0px";

    titleVideo.style.left = "0px";
    titleVideo.style.height = "-webkit-fill-available";
    // serverOptions.style.display = "none";
});