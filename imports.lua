local export_httprequest = exports["httprequest-client"]


function PerformHttpRequest(url, cb, method, data, headers)
    export_httprequest:PerformHttpRequest(url, cb, method, data, headers)
end
