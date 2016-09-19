window.onload = function(){
    var button = document.getElementById("buttonGetJoke");
    var buttonUrl = document.getElementById("buttonGetUrl");
    var configObject = {method:"GET",url:"", asyn: true};
    var mainHidden = document.getElementById("main_hidden");
    var subMainHidden = document.getElementById("subMain_hidden");
    var textUrl = document.getElementById("urlText");
    mainHidden.className = "main main_show";   
    subMainHidden.className = "main main_show";

    button.onclick = function () {
        getJoke();
    }

    function getJoke(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                mainHidden.innerHTML = truncateResponse(xhttp.responseText);
            }
        };
    xhttp.open("GET", "http://api.icndb.com/jokes/random", true);
    xhttp.send(); 
    }

    buttonUrl.onclick = function () {
        configObject.url = textUrl.value;
        getUrl(configObject)
        .then(function(response){
            subMainHidden.style.color = "black";
            subMainHidden.innerHTML = response;
        },
        function (error){
            subMainHidden.style.color = "red";
        });
    }


    function getUrl(objectRecieved){
        return new Promise(function(resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open(objectRecieved.method,objectRecieved.url,objectRecieved.asyn);
            xhttp.onload = function(){
                if (xhttp.status == 200) {
                    resolve(xhttp.response);
                }
                else {
                    reject(Error("error"));
                }
            };
            xhttp.onerror = function() {
            reject(Error("error"));
            };
            xhttp.send();
        });
    }
}
        
function truncateResponse (stringToTrunc){
    return stringToTrunc.substring(stringToTrunc.lastIndexOf("joke")+8,stringToTrunc.lastIndexOf("categories")-4);
}





    







