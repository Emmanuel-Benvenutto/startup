window.onload = function(){
    var buttonGet = document.getElementById("buttonGetRepository");
    var mainHidden = document.getElementById("main_hidden");
    var textRepo = document.getElementById("repoText");
    mainHidden.className = "main main_show";   

    buttonGet.onclick = function () {
        getListRepository();
    }
    
    function getListRepository(){
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var json = JSON.parse(xhttp.responseText);
                showList(json);  
            }
        };
    xhttp.open("GET", "https://api.github.com/search/repositories?q=" + textRepo.value  , true);
    xhttp.send(); 
    }
}

function showList(jsonObj){
    var out = "";
    var i;
    for (i = 0; i < jsonObj.items.length; i++) {
        out += "<li>" + jsonObj.items[i].full_name + "</li>"
    }
    document.getElementById("listRepository").innerHTML = out;
}





    







