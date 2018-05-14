#!/bin/bash

function uso
{
	echo;
	echo "Invocacion: vpnApp.sh <Ambiente>"
	echo;
}


if [ $# -lt 1 ];
then
	echo;
	echo "ERROR: Falta informar parametros.";
	uso;
	exit 1;
fi

if [ $1 == "a" ];     then  gulp vpn --8002; fi
if [ $1 == "b" ];     then  gulp vpn --8003; fi
if [ $1 == "c" ];     then  gulp vpn --8004; fi
if [ $1 == "d" ];     then  gulp vpn --8005; fi
if [ $1 == "e" ];     then  gulp vpn --8006; fi	
if [ $1 == "f" ];     then  gulp vpn --8007; fi
if [ $1 == "g" ];     then  gulp vpn --8008; fi
if [ $1 == "h" ];     then  gulp vpn --8009; fi
if [ $1 == "i" ];     then  gulp vpn --8010; fi
if [ $1 == "j" ];     then  gulp vpn --8011; fi
if [ $1 == "k" ];     then  gulp vpn --8012; fi
if [ $1 == "l" ];     then  gulp vpn --8013; fi
if [ $1 == "m" ];     then  gulp vpn --8014; fi
if [ $1 == "n" ];     then  gulp vpn --8015; fi
if [ $1 == "o" ];     then  gulp vpn --8016; fi


