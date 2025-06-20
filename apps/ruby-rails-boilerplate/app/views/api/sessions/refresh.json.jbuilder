json.tokens do
  json.access do
    json.token @user.token
    json.expires @user.token_expiration_at # UNIX to ISO string
  end
end
json.refresh do
  json.access do
    json.token @user.refresh_token
    json.expires @user.refresh_token_expiration_at # UNIX to ISO string
  end
end
