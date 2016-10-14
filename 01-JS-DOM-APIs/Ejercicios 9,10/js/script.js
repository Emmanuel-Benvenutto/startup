window.onload = function() {
    const buttonGet = document.getElementById("buttonGetRepository");
    const mainHidden = document.getElementById("main_hidden");
    const textRepo = document.getElementById("repoText");

    mainHidden.className = "main main_show";   

    buttonGet.onclick = function () {
        getListRepository();
    }
    
    function getListRepository() {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let json = JSON.parse(xhttp.responseText);
                showList(json);  
            }
        };
        xhttp.open("GET", "https://api.github.com/search/repositories?q=" + textRepo.value  , true);
        xhttp.send(); 
    }
}

function showList(jsonObj) {
    let out = "";
    let i;
    for (i = 0; i < jsonObj.items.length; i++) {
        out += "<li>" + jsonObj.items[i].full_name + "</li>"
    }
    document.getElementById("listRepository").innerHTML = out;
}





    







