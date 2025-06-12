local http = require("resty.http")

local uri = ngx.var.request_uri
local method = ngx.req.get_method()
local body_data = ngx.req.get_body_data()

local function proxy_pass(target_url)
  local httpc = http.new()
  local res, err = httpc:request_uri(target_url, {
    method = method,
    body = body_data,
    headers = {
      ["Content-Type"] = ngx.var.content_type or "application/json",
    }
  })

  if not res then
    ngx.status = 500
    ngx.say("Gateway error: ", err)
    return
  end

  ngx.status = res.status
  ngx.say(res.body)
end

if uri:find("^/api/orders") then
  proxy_pass("http://localhost:8080" .. uri:gsub("^/api", ""))

elseif uri:find("^/api/payments") then
  proxy_pass("http://localhost:3003" .. uri:gsub("^/api", ""))

else
  ngx.status = 404
  ngx.say("Route not found: ", uri)
end
