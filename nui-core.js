function getResponseHeaderMap(xhr) {
    const headers = {};
    xhr.getAllResponseHeaders()
        .trim()
        .split(/[\r\n]+/)
        .map(value => value.split(/: /))
        .forEach(keyValue => {
            headers[keyValue[0].trim()] = keyValue[1].trim();
        });
    return headers;
}

window.addEventListener("message", function (event) {
    let action = event.data.action;
    let data = event.data.data;

    if (action == "performHttpRequest") {
        var requestHandler = $.ajax({
            type: "POST",
            url: data.url,
            headers: data.headers,
            data: data.data,
            success: data.success,
            dataType: data.dataType
        });

        requestHandler.always(function (responseJSON, statusText, responseData) {
            $.ajax({
                type: "POST",
                url: `https://${GetParentResourceName()}/InvokeFunctionReference`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: JSON.stringify({
                    cb: data.cb,
                    headers: getResponseHeaderMap(responseData),
                    data: responseData,
                })
            });
        });
    }
});
