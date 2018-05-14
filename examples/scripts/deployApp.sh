scp -r dist root@188.226.223.252:/var/www/html/bbva-clemente
scp -r mockServer root@188.226.223.252:/var/www/mockServerNew
ssh root@188.226.223.252 'cd /var/www/html/bbva-clemente; rm -rf sprint25; mv dist sprint25; cd /var/www; rm -rf mockServer; mv mockServerNew mockServer; forever restartall; exit;'
rm -rf dist;
#nohup forever start -l /var/www/html/logs/forever.log -a  /usr/bin/dyson  /var/www/mockServer/
