#!/bin/bash

function uso
{
	echo;
	echo "Invocacion: vpnRP.sh <Ambiente>"
	echo;
	echo "       USUARIO"
	echo;
	echo "       ramos"
	echo "       ravelo"
	echo "       martinez"
	echo "       serrano"
	echo "       celis"
	echo "       montenegro"
	echo "       tecno1"
	echo "       tecno2"
	echo "       tecno3"
	echo "       tecno4"
	echo "       cda1"
	echo "       cda2"
	echo "       backup1"
	echo "       backup2"
	echo "       backup3"
}


if [ $# -lt 1 ];
then
	echo;
	echo "ERROR: Falta informar parametros.";
	uso;
	exit 1;
fi

cd ..

if [ $1 == "a" ];    then  node rp 8102 8002 9091; fi
if [ $1 == "b" ];    then  node rp 8103 8003 9092; fi
if [ $1 == "c" ];    then  node rp 8104 8004 9093; fi
if [ $1 == "d" ];    then  node rp 8105 8005 9094; fi
if [ $1 == "e" ];    then  node rp 8106 8006 9095; fi	
if [ $1 == "f" ];    then  node rp 8107 8007 9096; fi
if [ $1 == "g" ];    then  node rp 8108 8008 9097; fi
if [ $1 == "h" ];    then  node rp 8109 8009 9098; fi
if [ $1 == "i" ];    then  node rp 8110 8010 9099; fi
if [ $1 == "j" ];    then  node rp 8111 8011 9100; fi
if [ $1 == "k" ];    then  node rp 8112 8012 9101; fi
if [ $1 == "l" ];    then  node rp 8113 8013 9102; fi
if [ $1 == "m" ];    then  node rp 8114 8014 9103; fi
if [ $1 == "n" ];    then  node rp 8115 8015 9104; fi
if [ $1 == "o" ];    then  node rp 8116 8016 9105; fi


