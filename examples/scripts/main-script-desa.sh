#!/bin/bash

NUMERO_AMBIENTE=$1
PATH_TMP=/tmp
ARCHIVO_LOGS=/tmp/deploy-fnetcore${NUMERO_AMBIENTE}.log

if [ ${NUMERO_AMBIENTE} == "1" ];
then
	AMBIENTE_DESA_EAR=fnetcore_d;
elif [ ${NUMERO_AMBIENTE} == "2" ] || [ ${NUMERO_AMBIENTE} == "3" ] || [ ${NUMERO_AMBIENTE} == "4" ] || [ ${NUMERO_AMBIENTE} == "5" ] || [ ${NUMERO_AMBIENTE} == "6" ] || [ ${NUMERO_AMBIENTE} == "7" ] || [ ${NUMERO_AMBIENTE} == "8" ] || [ ${NUMERO_AMBIENTE} == "9" ] || [ ${NUMERO_AMBIENTE} == "10" ] || [ ${NUMERO_AMBIENTE} == "11" ] || [ ${NUMERO_AMBIENTE} == "12" ] || [ ${NUMERO_AMBIENTE} == "13" ] || [ ${NUMERO_AMBIENTE} == "14" ] || [ ${NUMERO_AMBIENTE} == "15" ] || [ ${NUMERO_AMBIENTE} == "16" ] ;
then
	AMBIENTE_DESA_EAR=fnetcore${NUMERO_AMBIENTE}_d;
else
	echo;
    echo "ERROR: Numero de ambiente incorrecto.";
    exit 1;
fi

AMBIENTE_DESA=fnetcore${NUMERO_AMBIENTE}
cd ${PATH_TMP}/${AMBIENTE_DESA}

#clean-up-script
rm -rf fnetcore.war > /dev/null
if [ -f ${ARCHIVO_LOGS} ];
then
	rm ${ARCHIVO_LOGS} > /dev/null;
fi

#pre-script
echo "Cambiando permisos para ejecutar el script." > ${ARCHIVO_LOGS};
chmod -R 777 ${PATH_TMP}/${AMBIENTE_DESA} >> ${ARCHIVO_LOGS} 2>&1
chmod 777 ${ARCHIVO_LOGS} > /dev/null

echo >> ${ARCHIVO_LOGS};
echo "Cambiando permisos con presync en DESA${NUMERO_AMBIENTE}." >> ${ARCHIVO_LOGS};
sudo /prod/apps/scripts/${AMBIENTE_DESA_EAR}.sh presync >> ${ARCHIVO_LOGS} 2>&1

#main-script
echo;
echo "Compilando FNETCORE con Maven.";
echo >> ${ARCHIVO_LOGS};
echo "Compilando FNETCORE con Maven." >> ${ARCHIVO_LOGS};
/desa/apps/maven/bin/mvn -U -e -f pom.xml package >> ${ARCHIVO_LOGS} 2>&1

if [ ! -d "target" ] || [ ! -d "target/fnetcore-1.0.0" ];
then
	echo;
    echo "ERROR: No se compilo correctamente FNETCORE.";
    exit 1;
fi

mv target/fnetcore-1.0.0 . >> ${ARCHIVO_LOGS} 2>&1
mv fnetcore-1.0.0 fnetcore.war >> ${ARCHIVO_LOGS} 2>&1

cp -rf src/main/resources/libs/* fnetcore.war/WEB-INF/lib/ >> ${ARCHIVO_LOGS} 2>&1
cp -rf META-INF/* fnetcore.war/META-INF/ >> ${ARCHIVO_LOGS} 2>&1

for f in $(ls src/main/resources/) ; do 
  rm -rf fnetcore.war/WEB-INF/classes/"$f" >> ${ARCHIVO_LOGS} 2>&1
done
cp -rf src/main/resources/* fnetcore.war/WEB-INF/classes/

#agrego numero de version
sed -e 's/version=/version='$(date +'%Y%m%d')'\.'$(date +'%H%M')'/' fnetcore.war/WEB-INF/classes/cfg/app.properties > app.properties
cp app.properties fnetcore.war/WEB-INF/classes/cfg/ >> ${ARCHIVO_LOGS} 2>&1

#post-script

if [ ! -d "fnetcore.war" ];
then
	echo;
    echo "ERROR: No se compilo correctamente FNETCORE.";
    exit 1;
fi

echo;
echo "Realizando deploy en ambiente DESA${NUMERO_AMBIENTE}.";
echo >> ${ARCHIVO_LOGS};
echo "Realizando deploy en ambiente DESA${NUMERO_AMBIENTE}." >> ${ARCHIVO_LOGS};
rm -rf /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/html >> ${ARCHIVO_LOGS} 2>&1
cp -rf html /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/ >> ${ARCHIVO_LOGS} 2>&1

rm -rf /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/fnetcore.war >> ${ARCHIVO_LOGS} 2>&1
cp -rf fnetcore.war /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/ >> ${ARCHIVO_LOGS} 2>&1

rm -rf /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/META-INF >> ${ARCHIVO_LOGS} 2>&1
cp -rf META-INF /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/ >> ${ARCHIVO_LOGS} 2>&1

rm -rf /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/syscfg-test >> ${ARCHIVO_LOGS} 2>&1
cp -rf syscfg-test /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/ >> ${ARCHIVO_LOGS} 2>&1

rm -rf /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/syscfg-prod >> ${ARCHIVO_LOGS} 2>&1
cp -rf syscfg-prod /desa/apps/was/ears/${AMBIENTE_DESA_EAR}.ear/ >> ${ARCHIVO_LOGS} 2>&1

sudo /prod/apps/scripts/${AMBIENTE_DESA_EAR}.sh postsync >> ${ARCHIVO_LOGS} 2>&1

#restart-script
echo;
echo "Reiniciando ambiente DESA${NUMERO_AMBIENTE}.";
echo >> ${ARCHIVO_LOGS};
echo "Reiniciando ambiente DESA${NUMERO_AMBIENTE}." >> ${ARCHIVO_LOGS};
sudo /prod/apps/scripts/appserver.sh stop desa${NUMERO_AMBIENTE} >> ${ARCHIVO_LOGS} 2>&1
sudo /prod/apps/scripts/appserver.sh start desa${NUMERO_AMBIENTE} >> ${ARCHIVO_LOGS} 2>&1

if [ ${NUMERO_AMBIENTE} == "2" ];
then
	sudo /prod/apps/scripts/appserver.sh stop desa${NUMERO_AMBIENTE}_${NUMERO_AMBIENTE} >> ${ARCHIVO_LOGS}; 2>&1
	sudo /prod/apps/scripts/appserver.sh start desa${NUMERO_AMBIENTE}_${NUMERO_AMBIENTE} >> ${ARCHIVO_LOGS}; 2>&1
fi

echo;
echo "Deploy exitoso en ambiente DESA${NUMERO_AMBIENTE}.";
echo >> ${ARCHIVO_LOGS};
echo "Deploy exitoso en ambiente DESA${NUMERO_AMBIENTE}." >> ${ARCHIVO_LOGS};

#borrado
echo >> ${ARCHIVO_LOGS};
echo "Borrando carpeta ${PATH_TMP}/${AMBIENTE_DESA}." >> ${ARCHIVO_LOGS};
cd ${PATH_TMP}
rm -rf ${PATH_TMP}/${AMBIENTE_DESA} >> ${ARCHIVO_LOGS} 2>&1
