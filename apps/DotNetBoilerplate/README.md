### .NET Backend

IDE: https://visualstudio.microsoft.com/vs/community/

```
https://localhost:7217/swagger/index.html
/
localhost:7217   api/
localhost:7217   swagger Auth/
localhost:7217   |   swagger POST    login               (Login)
localhost:7217   |   swagger POST    register            (Register)
localhost:7217
localhost:7217   swagger Feed/
localhost:7217   |   swagger GET     /                   (Get news feed)
localhost:7217
localhost:7217   swagger Microposts/
localhost:7217   |   swagger GET     /                   (Get all microposts)
localhost:7217   |   swagger POST    /                   (Create a new micropost)
localhost:7217   |   swagger GET     /{id}               (Get micropost by ID)
localhost:7217   |   swagger DELETE  /{id}               (Delete micropost by ID)
localhost:7217
localhost:7217   swagger Relationships/
localhost:7217   |   swagger POST    /                   (Follow a user)
localhost:7217   |   swagger DELETE  /{id}               (Unfollow a user)
localhost:7217
localhost:7217   swagger Users/
localhost:7217   |   swagger GET     /                   (Get all users)
localhost:7217   |   swagger GET     /{id}               (Get user by ID)
localhost:7217   |   swagger GET     /{id}/edit          (Get user by ID for edit)
localhost:7217   |   swagger POST    /microposts         (Create microposts by current user)
localhost:7217   |   swagger GET     /{id}/microposts    (Get microposts by user)
localhost:7217   |   swagger GET     /{id}/following     (Get users this user is following)
localhost:7217   |   swagger GET     /{id}/followers     (Get this user's followers)
localhost:7217   |   swagger GET     /me                 (??Get current authenticated user) ?

```

```
maearon@maearon:~$ wget https://builds.dotnet.microsoft.com/dotnet/Sdk/9.0.300/dotnet-sdk-9.0.300-linux-x64.tar.gz
--2025-05-22 12:17:18--  https://builds.dotnet.microsoft.com/dotnet/Sdk/9.0.300/dotnet-sdk-9.0.300-linux-x64.tar.gz
Resolving builds.dotnet.microsoft.com (builds.dotnet.microsoft.com)... 2600:1417:4400:3::1731:68cb, 2600:1417:4400:3::1731:68d6, 23.200.143.11, ...
Connecting to builds.dotnet.microsoft.com (builds.dotnet.microsoft.com)|2600:1417:4400:3::1731:68cb|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 217847129 (208M) [application/octet-stream]
Saving to: ‘dotnet-sdk-9.0.300-linux-x64.tar.gz’

dotnet-sdk-9.0.300- 100%[===================>] 207.75M  1.51MB/s    in 1m 47s  

2025-05-22 12:19:05 (1.94 MB/s) - ‘dotnet-sdk-9.0.300-linux-x64.tar.gz’ saved [217847129/217847129]

maearon@maearon:~$ mkdir -p $HOME/dotnet
maearon@maearon:~$ tar -zxf dotnet-sdk-9.0.300-linux-x64.tar.gz -C $HOME/dotnet
maearon@maearon:~$ export DOTNET_ROOT=$HOME/dotnet
maearon@maearon:~$ export PATH=$PATH:$HOME/dotnet
maearon@maearon:~$ dotnet --version
9.0.300
✅ Permanent Fix
You need to add the configuration to the shell startup file. Assuming you are using Bash, follow these steps:
Step 1: Open the .bashrc file
nano ~/.bashrc
Step 2: Add the following line to the end of the file:
export DOTNET_ROOT=$HOME/dotnet
export PATH=$PATH:$HOME/dotnet
Step 3: Apply the changes
source ~/.bashrc
sudo /home/maearon/dotnet/dotnet dev-certs https --clean
sudo /home/maearon/dotnet/dotnet dev-certs https --trust



dotnet tool install --global dotnet-ef
✅ Permanent Fix
You need to add the configuration to the shell startup file. Assuming you are using Bash, follow these steps:
Step 1: Open the .bashrc file
nano ~/.bashrc
Step 2: Add the following line to the end of the file:
export PATH=$PATH:$HOME/.dotnet/tools
Step 3: Apply the changes
source ~/.bashrc
maearon@maearon:~/code/DotNetBoilerplate$ dotnet ef

                     _/\__       
               ---==/    \\      
         ___  ___   |.    \|\    
        | __|| __|  |  )   \\\   
        | _| | _|   \_/ |  //|\\ 
        |___||_|       /   \\\/\\

Entity Framework Core .NET Command-line Tools 9.0.5
If you don't have a Migration yet, create your first migration:
rm -rf Migrations
DOTNET_ROOT=$HOME/.dotnet $HOME/.dotnet/dotnet ef migrations add InitOrFixModel --verbose  --context ApplicationDbContext
DOTNET_ROOT=$HOME/.dotnet $HOME/.dotnet/dotnet ef database update --context ApplicationDbContext
System.PlatformNotSupportedException: LocalDB is not supported on this platform. (Ubuntu OS)
✅ Cause
You are using Linux (Ubuntu), but the connection string in the app is using LocalDB, and LocalDB only works on Windows.
✅ Solution
🔧 1. Edit the connection string in appsettings.Development.json or appsettings.json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=MyAppDb;User Id=sa;Password=Your_password123;Encrypt=true;TrustServerCertificate=true"
}
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Your_password123" \
   -p 1433:1433 --name sqlserver \
   -d mcr.microsoft.com/mssql/server:2022-latest
🎉 You have successfully started SQL Server in Docker on port 1433! Next, you need to connect your .NET application to this SQL Server.
"ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=MyAppDb;User Id=sa;Password=Your_password123;TrustServerCertificate=true"
},
dotnet ef database update

[[[[[[[[[dotnet watch run --launch-profile https]]]]]]]]]
[[[[[[[[[docker rm sqlserver]]]]]]]]] (run docker and ef again if need)
[[[[[[[[[Visual Studio - Clean Solution]]]]]]]]]
[[[[[[[[[Visual Studio - Rebuild Solution]]]]]]]]]
[[[[[[[[[Visual Studio - Build]]]]]]]]]
[[[[[[[[[Visual Studio - F5]]]]]]]]]
[[[[[[[[[cd vue-boilerplate - npm run dev]]]]]]]]]

dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
"ConnectionStrings": {
    "DefaultConnection": "Host=ep-bold-voice-a4yp8xc9-pooler.us-east-1.aws.neon.tech;Database=verceldb;Username=default;Password=z9GYTlrXa8Qx;Ssl Mode=Require;Trust Server Certificate=true"
},

PS C:\Users\manhn\code\DotNetBoilerplate> dotnet --list-sdks
9.0.300 [C:\Program Files\dotnet\sdk]
```
```
POST https://localhost:7217/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Abcd1234!",
  "confirmPassword": "Abcd1234!"
}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3MTBhMmI4LTFiZGMtNGZiNy1iY2FhLTIyNGJlMzM3ZTVmMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdEBleGFtcGxlLmNvbSIsImp0aSI6IjA0ODczYTI3LTA2NjktNDcyNi1hNzUwLTc1N2ZjYWVmZTFmMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3NDg0ODM2ODAsImlzcyI6IlNhbXBsZUFwcCIsImF1ZCI6IlNhbXBsZUFwcFVzZXJzIn0.Rf-P-X1v_BGSzB1PIZyftK2WUipiEQ6J1Cq5RfMdpkQ",
    "user": {
        "id": "2710a2b8-1bdc-4fb7-bcaa-224be337e5f2",
        "name": "Test User",
        "email": "test@example.com"
    }
}
POST https://localhost:7217/api/auth/login
{"email":"test@example.com","password":"Abcd1234!","remember_me":true}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3MTBhMmI4LTFiZGMtNGZiNy1iY2FhLTIyNGJlMzM3ZTVmMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdEBleGFtcGxlLmNvbSIsImp0aSI6IjIwY2M3ZjU3LWQxNDQtNDY4OS1hNjhhLTg5MWZmODVkMzhmOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3NDg0ODQwNzYsImlzcyI6IlNhbXBsZUFwcCIsImF1ZCI6IlNhbXBsZUFwcFVzZXJzIn0.YsPUR_d8UM4Nmkl8PWz-m29d5_03Wk0s0k7CqOqc7co",
    "user": {
        "id": "2710a2b8-1bdc-4fb7-bcaa-224be337e5f2",
        "name": "Test User",
        "email": "test@example.com"
    }
}
```
```
dotnet add package Swashbuckle.AspNetCore
https://localhost:7217/swagger/index.html
```
```
1999  echo "deb [arch=amd64] https://packages.microsoft.com/ubuntu/22.04/prod jammy main" | sudo tee /etc/apt/sources.list.d/mssql-tools.list
 2000  curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /usr/share/keyrings/microsoft-prod.gpg > /dev/null
 2001  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/ubuntu/22.04/prod jammy main" | sudo tee /etc/apt/sources.list.d/mssql-tools.list
 2002  sudo apt update
 2003  sudo apt install -y mssql-tools unixodbc-dev
 2004  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
 2005  source ~/.bashrc
 2006  sqlcmd -S localhost -U sa -P Your_password123
 -- Check database list
        SELECT Name FROM sys.Databases;
        GO
```
```
Name                                                                                                                            
--------------------------------------------------------------------------------------------------------------------------------
master                                                                                                                          
tempdb                                                                                                                          
model                                                                                                                           
msdb                                                                                                                            
MyAppDb                                                                                                                         

(5 rows affected)

```
```
        -- Choose specific DB and show tables
        USE MyAppDb;
        GO
```
```
Changed database context to 'MyAppDb'.
```
```
        SELECT * FROM INFORMATION_SCHEMA.TABLES;
        GO
```
```
TABLE_CATALOG                                                                                                                    TABLE_SCHEMA                                                                                                                     TABLE_NAME                                                                                                                       TABLE_TYPE
-------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- ----------
MyAppDb                                                                                                                          dbo                                                                                                                              __EFMigrationsHistory                                                                                                            BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetRoles                                                                                                                      BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetUsers                                                                                                                      BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetRoleClaims                                                                                                                 BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetUserClaims                                                                                                                 BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetUserLogins                                                                                                                 BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetUserRoles                                                                                                                  BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              AspNetUserTokens                                                                                                                 BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              Microposts                                                                                                                       BASE TABLE
MyAppDb                                                                                                                          dbo                                                                                                                              Relationships                                                                                                                    BASE TABLE

(10 rows affected)
```
```
        -- Show data table
        SELECT * FROM Relationships;
        GO
```
```
FollowerId                                                                                                                                                                                                                                                                                                                                                                                                                                                         FollowedId                                                                                                                                                                                                                                                                                                                                                                                                                                                         CreatedAt                              UpdatedAt                             
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -------------------------------------- --------------------------------------
0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4458861            2025-05-22 06:06:00.4459125
0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                               271cd7d0-da7e-492b-9849-624876b6ca7d                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4526979            2025-05-22 06:06:00.4526979
0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                               3c19c4c6-512a-4d67-98a5-5a1d6ebc6fb5                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4527542            2025-05-22 06:06:00.4527543
1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4527960            2025-05-22 06:06:00.4527960
271cd7d0-da7e-492b-9849-624876b6ca7d                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4528349            2025-05-22 06:06:00.4528349
3c19c4c6-512a-4d67-98a5-5a1d6ebc6fb5                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4528664            2025-05-22 06:06:00.4528664
3c19c4c6-512a-4d67-98a5-5a1d6ebc6fb5                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4529032            2025-05-22 06:06:00.4529033
41239bfd-0f44-4e1f-a0f2-7e6f2d8db413                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4529347            2025-05-22 06:06:00.4529347
41239bfd-0f44-4e1f-a0f2-7e6f2d8db413                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4529662            2025-05-22 06:06:00.4529662
41239bfd-0f44-4e1f-a0f2-7e6f2d8db413                                                                                                                                                                                                                                                                                                                                                                                                                               271cd7d0-da7e-492b-9849-624876b6ca7d                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4529937            2025-05-22 06:06:00.4529937
4ef0c00a-8e0b-4972-ab2a-25160be1f0d6                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4530270            2025-05-22 06:06:00.4530271
4ef0c00a-8e0b-4972-ab2a-25160be1f0d6                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4530561            2025-05-22 06:06:00.4530561
4ef0c00a-8e0b-4972-ab2a-25160be1f0d6                                                                                                                                                                                                                                                                                                                                                                                                                               271cd7d0-da7e-492b-9849-624876b6ca7d                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4530841            2025-05-22 06:06:00.4530841
a972ae38-0998-4918-80b5-437e79890315                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4531128            2025-05-22 06:06:00.4531128
a972ae38-0998-4918-80b5-437e79890315                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4531440            2025-05-22 06:06:00.4531441
cf06ec16-da8d-4b8e-816b-d6efd767e03a                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4531741            2025-05-22 06:06:00.4531741
cf06ec16-da8d-4b8e-816b-d6efd767e03a                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4532025            2025-05-22 06:06:00.4532025
de54ed05-df8d-469f-a6c2-a136bae1a3e2                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4532310            2025-05-22 06:06:00.4532310
de54ed05-df8d-469f-a6c2-a136bae1a3e2                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4532622            2025-05-22 06:06:00.4532623
de54ed05-df8d-469f-a6c2-a136bae1a3e2                                                                                                                                                                                                                                                                                                                                                                                                                               271cd7d0-da7e-492b-9849-624876b6ca7d                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4532903            2025-05-22 06:06:00.4532904
de54ed05-df8d-469f-a6c2-a136bae1a3e2                                                                                                                                                                                                                                                                                                                                                                                                                               3c19c4c6-512a-4d67-98a5-5a1d6ebc6fb5                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4533177            2025-05-22 06:06:00.4533177
e7332081-f8d9-4225-9465-6c6aa6f4fbbe                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4533469            2025-05-22 06:06:00.4533470
e7332081-f8d9-4225-9465-6c6aa6f4fbbe                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4533761            2025-05-22 06:06:00.4533761
e7332081-f8d9-4225-9465-6c6aa6f4fbbe                                                                                                                                                                                                                                                                                                                                                                                                                               271cd7d0-da7e-492b-9849-624876b6ca7d                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4534034            2025-05-22 06:06:00.4534034
f71606ba-0663-4530-8903-0cfe360d4b7c                                                                                                                                                                                                                                                                                                                                                                                                                               0ba18901-a676-4d51-890b-cb8e32574826                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4534325            2025-05-22 06:06:00.4534325
f71606ba-0663-4530-8903-0cfe360d4b7c                                                                                                                                                                                                                                                                                                                                                                                                                               1ff40dde-178e-4555-bf62-8ea2d27ab150                                                                                                                                                                                                                                                                                                                                                                                                                                          2025-05-22 06:06:00.4534615            2025-05-22 06:06:00.4534615

(26 rows affected)
```
```
👉 Install Azure Data Studio on Ubuntu:
sudo snap install azuredatastudio --classic
Or use .deb if you prefer:
wget https://go.microsoft.com/fwlink/?linkid=2198763 -O azuredatastudio.deb
sudo apt install ./azuredatastudio.deb
✅ 3. Configure to connect from GUI
Host: localhost
Port: 1433(not need)
Username: sa
Password: Your_password123
Database: MyAppDb (if created)
🔹 Method 2: Use DBeaver (multi-system GUI)
DBeaver is a multi-purpose GUI, supporting many DBs (PostgreSQL, MySQL, SQL Server...).
sudo snap install dbeaver-ce
```
