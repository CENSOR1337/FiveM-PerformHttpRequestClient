RegisterNUICallback("InvokeFunctionReference", function(responseData, cb)
    Citizen.InvokeFunctionReference(responseData.cb, msgpack.pack({
        responseData.data.status,
        responseData.data.responseText,
        responseData.headers
    }))
    cb("OK")
end)

function PerformHttpRequestOnClient_internal(url, cb, method, data, headers)
    SendNUIMessage({
        action = "performHttpRequest",
        data = {
            url = url,
            method = method or "GET",
            data = data or "",
            headers = headers or {},
            cb = Citizen.GetFunctionReference(cb)
        }
    })
end

exports("PerformHttpRequest", PerformHttpRequestOnClient_internal)
