function recupererRecettes(){
	let xhr = new XMLHttpRequest();
    xhr.open('get','recupererRecette',true);
    xhr.onload = analyseRecettes;
    xhr.send();
}
