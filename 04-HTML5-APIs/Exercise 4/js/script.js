window.onload = function() {
    const buttonConnect = document.getElementById("connect-button");
    const buttonDisconnect = document.getElementById("disconnect-button");
    const buttonSend = document.getElementById("send-button");
    const textMessage = document.getElementById("text-message");

    buttonConnect.onclick = function() {
        doConnectionTo("ws://echo.websocket.org/");
    }

    buttonDisconnect.onclick = function() {
        websocket.close();
    }

    buttonSend.onclick = function() {
        console.log(textMessage.value);
        websocket.send(textMessage.value);
    }

    function doConnectionTo(url) {
        websocket = new WebSocket(url);

        websocket.onopen = function(eventListen) {
            onOpen(eventListen)
        };
        websocket.onclose = function(eventListen) {
            onClose(eventListen)
        };
        websocket.onmessage = function(eventListen) {
            onMessage(eventListen)
        };
        websocket.onerror = function(eventListen) {
            onError(eventListen)
        };
    }

    function onOpen(event) {
        console.log("Connected");
        buttonSend.disabled = false; 
        textMessage.disabled = false;
    }

    function onClose(event) {
        console.log("Disconnected");
        buttonSend.disabled = true; 
        textMessage.disabled = true;
    }

    function onMessage(event) {
        console.log(`Message received: ${event.data}`);
    }
    
    function onError(event) {
        console.log(`Error: ${event.data}`);
    }
}


