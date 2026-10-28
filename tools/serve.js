const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((q,r)=>{let p=path.join(__dirname,'..',q.url.split('?')[0]);if(p.endsWith(path.sep))p+='index.html';
fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':T[path.extname(p)]||'application/octet-stream'});r.end(d)})}).listen(5180);

