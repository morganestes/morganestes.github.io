(function () {
    const checkbox = document.querySelector('input[name=mode]');
    const moon = document.getElementById('moon');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            moon.innerHTML = feather.icons['sun'].toSvg({ 'fill': 'var(--fg-color-light)' });
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            moon.innerHTML = feather.icons['moon'].toSvg({ 'fill': 'var(--fg-color-dark)' });
        }
    });
})();