var fs = require('fs');



function doCheck(file, done) {

	String.prototype.replaceAll = function(target, replacement) {
		return this.split(target).join(replacement);
	};

	var fileTmp = file + '.tmp';
	
	fs.readFile(file, function (err, data) {
		var streamTmp = fs.createWriteStream(fileTmp);
		streamTmp.once('open', function(fd) {
			streamTmp.write( (data+'').replaceAll('const ', 'const --> No usar ES6;')
									  .replaceAll('const=', 'const --> No usar ES6;')
			 );
			streamTmp.end();
			fs.createReadStream(fileTmp).pipe(fs.createWriteStream(file));
			fs.unlink(fileTmp);
			return done();
		});
	});
}


exports.doCheck = doCheck;

