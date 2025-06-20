if @current_user then
  json.user do
    json.id @current_user.id
    json.email @current_user.email
    json.name @current_user.name
    json.admin @current_user.admin
  end
end
