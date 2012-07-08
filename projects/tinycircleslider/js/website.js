var Website = {
	run: function(){
		var oCircleslider1 = $('#rotatescroll1');
		if(oCircleslider1.length > 0){
			oCircleslider1.tinycircleslider();
		}
		var oCircleslider2 = $('#rotatescroll2');
		if(oCircleslider2.length > 0){
			oCircleslider2.tinycircleslider({
			    interval: true
			 ,  snaptodots: true
			});
		}

		var oCircleslider3 = $('#rotatescroll3');
		if(oCircleslider3.length > 0){
			oCircleslider3.tinycircleslider({ lightbox: true, snaptodots: true, radius: 184, hidedots: false});
			$('a', oCircleslider3).fancybox();
		}

        var oCircleslider4 = $('#rotatescroll4');
        if(oCircleslider4.length > 0){
            oCircleslider4.tinycircleslider({  snaptodots: true, radius: 215, hidedots: false, interval: true });
        }

		var oCon = document.getElementById('mcon');
		var oLink = document.createElement('a');
		var oText = document.createTextNode("me");
		var sPart0 = 'ma';
		var sPart1 = 'ilto:wie';
		var sPart2 = 'ringen';
		var sPart3 = '@gm';
		var sPart4 = 'ail.com';
		oLink.href = sPart0+sPart1+sPart2+sPart3+sPart4;
		oCon.appendChild(oLink);
		oLink.appendChild(oText);

	}
};


//Initialize
$(document).ready(function(){
	Website.run();
});