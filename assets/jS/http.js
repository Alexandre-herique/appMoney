var http = function (url, type, data, callback) {

    var xhttp = new XMLHttpRequest();

    xhttp.open(type, url, true);
    
    xhttp.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
            return callback(this.responseText);
        }

    };
    
    xhttp.send(data);

}