var i,a;for(i of document.getElementsByClassName("dropdown-btn"))i.addEventListener("click",function(){a=this.nextElementSibling.style;a.display=a.display=="block"?"none":"block"});for(i of document.getElementsByClassName("player"))i.innerHTML='<ellipse cx="8"cy="13"rx="6"ry="3"stroke="#eee"fill="gray"/><circle cx="8"cy="6"r="5.5"stroke="#eee"fill="gray"/>';for(i of document.getElementsByClassName("dropdown-container"))for(a of i.children)if(a.classList.contains("active"))i.style.display="block";if(document.getElementById("wrapfabtest").offsetHeight<1)alert("Hey, you're using an adblocker! Whitelist my site, please! I promise I won't overload you with ads.")
