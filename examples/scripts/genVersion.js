var fs = require('fs');

function genVersion() {

	var a = new Date();
	var b = a.getFullYear();
	var c = a.getMonth();
	(++c < 10)? c = "0" + c : c;
	var d = a.getDate();
	(d < 10)? d = "0" + d : d;

	var e = a.toTimeString().split(':');
	var f = e[0] + e[1];

	var final = b + "" + c + "" +  d + "." + f; 

	return final;

} 

function writeFile() {

	String.prototype.replaceAll = function(target, replacement) {
		return this.split(target).join(replacement);
	};

	var content = '';

	var version = genVersion();

	content  = "var versionFront = '" + version + "'; \n";

	var stream = fs.createWriteStream("app/js/app/versionFront.js");

	stream.once('open', function(fd) {
	  stream.write(content);
	  stream.end();
	});

	var stream1 = fs.createWriteStream("app/js/loginMafalda/versionFront.js");

	stream1.once('open', function(fd) {
	  stream1.write(content);
	  stream1.end();
	});

	var stream2 = fs.createWriteStream("app/version-front.html");

	stream2.once('open', function(fd) {
	  stream2.write(version);
	  stream2.end();
	});

	fs.readFile('app/index-src.html', function (err, data) {
		var stream3desa = fs.createWriteStream("app/index-desa.html");
		stream3desa.once('open', function(fd) {
			stream3desa.write( (data+'').replaceAll('ts=version','ts='+version) );
			stream3desa.end();
			fs.readFile('app/index-desa.html', function (err, data) {
				var stream3prod = fs.createWriteStream("app/index.html");
				stream3prod.once('open', function(fd) {
					stream3prod.write( (data+'').replaceAll('-staging.js','.js') );
					stream3prod.end();
				});
			});
		});
	});

	fs.readFile('app/loginClementeApp-src.html', function (err, data) {
		var stream4 = fs.createWriteStream("app/loginClementeApp.html");
		stream4.once('open', function(fd) {
		  stream4.write( (data+'').replaceAll('ts=version','ts='+version) );
		  stream4.end();
		});
	});

	fs.readFile('app/loginClementeApp2-src.html', function (err, data) {
		var stream6 = fs.createWriteStream("app/loginClementeApp2.html");
		stream6.once('open', function(fd) {
		  stream6.write( (data+'').replaceAll('ts=version','ts='+version) );
		  stream6.end();
		});
	});

	return version;

}


exports.version = writeFile;