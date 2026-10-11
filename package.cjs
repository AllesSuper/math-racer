const fs=require('node:fs');
let html=fs.readFileSync('dist/index.html','utf8');
html=html.replace(/<link rel="stylesheet" href="([\w-]+\.css)(?:\?[^"<>]*)?">/g,(_,name)=>'<style>'+fs.readFileSync('dist/'+name,'utf8')+'</style>');
html=html.replace(/<script src="([\w-]+\.js)(?:\?[^"<>]*)?"><\/script>/g,(_,name)=>'<script>'+fs.readFileSync('dist/'+name,'utf8')+'</script>');
fs.writeFileSync('Einmaleins-Rally.html',html.trimEnd()+'\n');
console.log('Eigenständige HTML-Datei erstellt.');
