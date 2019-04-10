(function() {
    var newRem = function() {
        var html = document.documentElement;
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    };
    window.addEventListener('resize', newRem, false);
    newRem();
})();