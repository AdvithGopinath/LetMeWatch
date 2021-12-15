(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', './js/third-party/analytics.js', 'ga');

ga('create', 'UA-208644341-1', 'auto');

// Modifications: 
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/thankYou'); // Set page, avoiding rejection due to chrome-extension protocol