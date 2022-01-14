function tokenExists() {
    if (document.cookie.indexOf("token") == -1) {
        window.location.href = "/admin/login";
        return false;
    }
    return true;
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    });
    return cookie[name];
}