if (process.argv.length != 3) {
	console.info('Debe ingresar como parametro el numero de servidor que quiere utilizar. Ej: node rp-desa 1');
	return;
}

var serverNumber = Number.parseInt(process.argv[2]);

if (Number.isNaN(serverNumber)) {
	console.info('Debe ingresar como parametro el numero de servidor que quiere utilizar. Ej: node rp-desa 1');
	return;
}

var serverName = 'https://desa' + serverNumber + '-qa.bbvafrances.com.ar';

// var serverName = 'https://desa' + serverNumber + '.fnetcore.arg.igrupobbva';

console.info('http://localhost:8080 --> '+ serverName);


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var httpProxy = require('http-proxy');
httpProxy.createProxyServer({changeOrigin: true, secure: false, target: serverName}).listen(8080);

