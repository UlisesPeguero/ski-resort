var navigation = {
    'Home': './',
    'About': './about.html',
    'Amenities': './amenities.html',
    'Safety': './safety.html',
    'Contact': './contact.html'
};

$(function() {
    var navbar = $('#navbarResponsive > ul.navbar-nav');
    // loop thru navigation object
    for(var name in navigation) {
        var li = $('<li>');
        li.addClass('nav-item');
        li.append('<a class="nav-link" href="' + (typeof IS_SUB !== 'undefined' ? '.' : '') + navigation[name] + '">' + name + '</a>');
        navbar.append(li);
    }
});
