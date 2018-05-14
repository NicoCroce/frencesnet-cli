var portReverseProxy = 80;
var portFront = 8000;
var portCore = 8080;
var portFnetOld = 8082;

if (process.argv.length > 2 ) {

  portReverseProxy = process.argv[2];
  portFront        = process.argv[3];
  portCore         = process.argv[4];

} 

var http = require('http'),
    httpProxy = require('http-proxy'),
    HttpProxyRules = require('http-proxy-rules');

var proxyRules = new HttpProxyRules({
  rules: {
    '/fnetcore/servicios/':  'http://localhost:'+portCore+'/fnetcore/servicios',
	// '/fnetcore/servicios/':  'http://PC045822:'+portCore+'/fnetcore/servicios',
    '/fnetcore/' :           'http://localhost:'+portFront,
    '/fnet/'      :          'http://localhost:'+portFnetOld+'/fnet',
    '/fbin/mult/' :          'http://localhost:'+portFront+'/fbin/mult'
  }
});

console.info('http://localhost/fnetcore/servicios --> http://localhost:'+portCore+'/fnetcore/servicios');
console.info('http://localhost/fnetcore           --> http://localhost:'+portFront+'/');
console.info('http://localhost/fnet/              --> http://localhost:'+portFnetOld+'/fnet'); 
console.info('http://fbin/mult                    --> http://localhost:'+portFront+'/fbin/mult'); 
console.info(''); 
console.info('Su url local es      : http://localhost:'+portReverseProxy+'/fnetcore/init.html'); 
console.info(''); 
console.info('Su url via citrix es : http://REC-CTX-XAPP099:'+portReverseProxy+'/fnetcore/init.html');
console.info(''); 

var proxy = httpProxy.createProxy();

http.createServer(function(req, res) {

  var target = proxyRules.match(req);
  if (target) {
    return proxy.web(req, res, {
      target: target
    });
  }

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('The request url and path did not match any of the listed rules!');
  
}).listen(portReverseProxy);