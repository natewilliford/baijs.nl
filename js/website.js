//Fake html5 in ie
document.createElement('header');
document.createElement('footer');
document.createElement('nav');
document.createElement('section');
document.createElement('article');
document.createElement('aside');

//Initialize
window.onload = function () {
	var oCon = document.getElementById( "mcon" );
	
	if (oCon) {
		var oLink  = document.createElement('a')
		,   oText  = document.createTextNode("address") 
		,   sParts = [ 'ma', 'ilto:wie', 'ringen', '@gm', 'ail.com' ]
		;

		oLink.href = sParts[0] + sParts[1] + sParts[2] + sParts[3] + sParts[4];
		oCon.appendChild(oLink);
		oLink.appendChild(oText);
	}
};