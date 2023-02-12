	function GetCookie(sName)
	{
		var aCookie = document.cookie.split("; ");
		for (var i=0; i < aCookie.length; i++)
		{
			var aCrumb = aCookie[i].split("=");
			if (sName == aCrumb[0])
				return unescape(aCrumb[1]);
		}
		return null;
	}
	
	function SetCookie(cN, cV, cE, cP)
	{
		cV = escape(cV);
		
		if (cE == "")
		{
			var nowDate = new Date();
			nowDate.setHours(nowDate.getHours() + 12);
			cE = nowDate.toGMTString();
		}
		
		(cP != "") ? cP = ";Path=" + cP : cP = '/';
		
		document.cookie = cN + "=" + cV + ";expires=" + cE + cP;
	}

	function DeleteCookie(sName, path, domain)
	{
		if (GetCookie(sName)) 
		{
				document.cookie = sName + "=" + 
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				"; expires=Thu, 01-Jan-70 00:00:01 GMT"
		}
	}