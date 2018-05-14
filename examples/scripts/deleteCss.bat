@echo off
echo Borrar .sass-cache y app\assets\css
cd ..
RD /S /Q .sass-cache
RD /S /Q cd app\assets\css
pause
exit