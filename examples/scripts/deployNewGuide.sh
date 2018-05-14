scp -r project-guide/app root@188.226.223.252:/var/www/html/bbva-clemente
ssh root@188.226.223.252 'cd /var/www/html/bbva-clemente; rm -rf proyecto; mv app proyecto;'
