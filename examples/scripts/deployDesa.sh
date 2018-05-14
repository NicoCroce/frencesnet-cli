#!/bin/bash

function uso
{
	echo;
	echo "Invocacion: deployDesa.bat <USUARIO> <NUMERO_AMBIENTE> <PATH_WORKSPACE_FNETCORE> <FRONT_NO_OFUSCADO>";
	echo;
	echo "Variables obligatorias:";
	echo "   USUARIO: Legajo del usuario que esta realizando la accion (en mayusculas)." 
	echo "            El mismo deberá contar con password de acceso al servidor";
	echo "            was80desa1 y password de red.";
	echo;
	echo "   NUMERO_AMBIENTE: Numero del ambiente que se está actualizando.";
	echo "                    Las opciones son: 1, 2 , 3 o 4.";
	echo;
	echo "   PATH_WORKSPACE_FNETCORE: Ruta local del workspace que tiene el codigo fuente";
	echo "                            de FNETCORE.";
	echo "                            Ejemplo: c:/desarrollo/workspace-fnetcore-source";
	echo;
	echo;
	echo "Variables opcionales:";
	echo "   (OPCIONAL) FRONT_NO_OFUSCADO: Indica si no se desea ofuscar el código JS de FNETFRONT";
	echo "                                 Ejemplo: NOO";
	echo;
	echo;
}

if [ $# -lt 3 ];
then
	echo;
	echo "ERROR: Falta informar parametros.";
	uso;
	exit 1;
fi

USUARIO=$1
NUMERO_AMBIENTE=$2
PATH_TMP=/tmp
PATH_WORKSPACE_FNETCORE=$3

if [ ${NUMERO_AMBIENTE} == "1" ] || [ ${NUMERO_AMBIENTE} == "2" ] || [ ${NUMERO_AMBIENTE} == "3" ] || [ ${NUMERO_AMBIENTE} == "4" ] || [ ${NUMERO_AMBIENTE} == "5" ] || [ ${NUMERO_AMBIENTE} == "6" ] || [ ${NUMERO_AMBIENTE} == "7" ] || [ ${NUMERO_AMBIENTE} == "8" ] || [ ${NUMERO_AMBIENTE} == "9" ] || [ ${NUMERO_AMBIENTE} == "10" ] || [ ${NUMERO_AMBIENTE} == "11" ] || [ ${NUMERO_AMBIENTE} == "12" ] || [ ${NUMERO_AMBIENTE} == "13" ] || [ ${NUMERO_AMBIENTE} == "14" ] || [ ${NUMERO_AMBIENTE} == "15" ] || [ ${NUMERO_AMBIENTE} == "16" ];
then
	AMBIENTE_DESA=fnetcore${NUMERO_AMBIENTE};
else
	echo;
    echo "ERROR: Numero de ambiente incorrecto.";
    uso;
    exit 1;
fi

echo;
echo "Comenzando...";
cd ..

#echo "Actualizando codigo fuente de FNETFRONT (requiere password de acceso a github).";
#git stash &>/dev/null
#git pull &>/dev/null

echo;
echo "Compilando FNETFRONT.";
rm -rf fnetcore*

if [[ $4 == "NOO" ]];
then
	gulp compile-nomin > /dev/null
else
	gulp compile > /dev/null
fi

mkdir ${AMBIENTE_DESA}
mv html ./${AMBIENTE_DESA}

echo;
echo "Recopilando script de compilacion y deploy para enviar al servidor was80desa1.";
cp scripts/main-script-desa.sh ./${AMBIENTE_DESA}

echo;
echo "Recopilando codigo fuente de FNETCORE para enviar al servidor was80desa1.";
cp -rf ${PATH_WORKSPACE_FNETCORE}/FNETCORE/src ./${AMBIENTE_DESA}
cp -rf ${PATH_WORKSPACE_FNETCORE}/FNETCORE/pom.xml ./${AMBIENTE_DESA}
cp -rf ${PATH_WORKSPACE_FNETCORE}/FNETCORE/syscfg-test ./${AMBIENTE_DESA}
cp -rf ${PATH_WORKSPACE_FNETCORE}/FNETCORE/syscfg-prod ./${AMBIENTE_DESA}
cp -rf ${PATH_WORKSPACE_FNETCORE}/FNETCORE/META-INF ./${AMBIENTE_DESA}
find ./${AMBIENTE_DESA} -name CVS | xargs rm -rf

echo;
echo "Copiando HTML y codigo fuente de FNETCORE a was80dea1 con usuario $1 (requiere password de acceso a was80desa1).";
echo "Ubicacion: ${PATH_TMP}/${AMBIENTE_DESA}";

tar czf - ${AMBIENTE_DESA} | ssh ${USUARIO}@was80desa1 bash -c "'
	tar xvzfC - ${PATH_TMP} > /dev/null 2>&1
	sed 's/.$//' ${PATH_TMP}/${AMBIENTE_DESA}/main-script-desa.sh > ${PATH_TMP}/${AMBIENTE_DESA}/main-script-desa_.sh
	chmod 777 ${PATH_TMP}/${AMBIENTE_DESA}/main-script-desa_.sh
	${PATH_TMP}/${AMBIENTE_DESA}/main-script-desa_.sh ${NUMERO_AMBIENTE}
'"

#git stash pop &>/dev/null