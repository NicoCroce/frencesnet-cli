set path=%%path%%;C:\FNET\node\npm\
set path=%%path%%;C:\Ruby200-x64\bin\
call   npm config set proxy http://200.5.92.163:8080
call   npm install
call   gulp compile