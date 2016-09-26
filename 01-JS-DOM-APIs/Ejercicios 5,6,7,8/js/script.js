window.onload = function() {
    const button = document.getElementById("buttonGetJoke");
    const buttonUrl = document.getElementById("buttonGetUrl");
    const mainHidden = document.getElementById("main_hidden");
    const subMainHidden = document.getElementById("subMain_hidden");
    const textUrl = document.getElementById("urlText");
    let configObject = {method:"GET",url:"", async: true};

    mainHidden.className = "main main_show";   
    subMainHidden.className = "main main_show";

    button.onclick = function () {
        getJoke();
    }

    function getJoke() {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                mainHidden.textContent = JSON.parse(xhttp.responseText).value.joke;
            }
        };
        xhttp.open("GET", "http://api.icndb.com/jokes/random", true);
        xhttp.send(); 
    }

    buttonUrl.onclick = function () {
        configObject.url = textUrl.value;
        getUrl(configObject)
        .then(function(response) {
            subMainHidden.className = "main main_show";
            subMainHidden.textContent = response;
        },
        function (error) {
            subMainHidden.className = "main main_show_error";
        });
    }

    function getUrl(settingsObject) {
        return new Promise(function(resolve, reject) {
            let xhttp = new XMLHttpRequest();

            xhttp.open(settingsObject.method, settingsObject.url, settingsObject.asyn);
            xhttp.onload = function() {
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