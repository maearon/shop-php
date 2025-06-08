local jwt = require "resty.jwt"

-- Get JWT secret from environment
local jwt_secret = os.getenv("JWT_SECRET")
if not jwt_secret then
    ngx.status = 500
    ngx.say('{"error": "JWT_SECRET not configured"}')
    ngx.exit(500)
end

-- Get Authorization header
local auth_header = ngx.var.http_authorization
if not auth_header then
    ngx.status = 401
    ngx.say('{"error": "Authorization header missing"}')
    ngx.exit(401)
end

-- Extract token from "Bearer <token>"
local token = auth_header:match("^Bearer%s+(.+)$")
if not token then
    ngx.status = 401
    ngx.say('{"error": "Invalid authorization format"}')
    ngx.exit(401)
end

-- Verify JWT token
local jwt_obj = jwt:verify(jwt_secret, token)
if not jwt_obj.valid then
    ngx.log(ngx.ERR, "JWT validation failed: ", jwt_obj.reason or "unknown reason")
    ngx.status = 401
    ngx.say('{"error": "Invalid or expired token"}')
    ngx.exit(401)
end

-- Ensure payload has required fields
if not jwt_obj.payload or not jwt_obj.payload.sub then
    ngx.status = 401
    ngx.say('{"error": "Malformed token payload"}')
    ngx.exit(401)
end

-- Add user info to headers for downstream services
ngx.req.set_header("X-User-ID", jwt_obj.payload.sub)
ngx.req.set_header("X-User-Email", jwt_obj.payload.email or "")
ngx.req.set_header("X-User-Role", jwt_obj.payload.role or "")
