json.user do
  json.extract! @user, :id, :email, :name, :admin
end
json.tokens do
  json.access do
    json.token @user.token
    json.expires @user.token_expiration_at # UNIX to ISO string
  end
  json.refresh do
    json.token @user.token
    json.expires @user.token_expiration_at # UNIX to ISO string
  end
end
