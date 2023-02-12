/**
 * letJS library 0.5
 *
 * @version 0.5
 * @author Copyright 2012-2013, <a href="mailto:spb.piksel@gmail.com">Dmitrii Pakhtinov</a>
 * Created 03/30/2012
 */
(function(n,l,p){function r(a,c){var b=this.target,e=0===arguments.length,c=1<arguments.length?c:a;if(t)e?(a=b.selectionStart,c=b.selectionEnd):b.setSelectionRange(a,c);else if(u){var d=q.selection.createRange();d.parentElement()===b&&(b[h]=d.getBookmark());try{d=b.createTextRange()}catch(g){}e?b[h]&&(d.moveToBookmark(b[h]),c=d.text.length,d.collapse(!0),d.moveStart("character",-b.value.length),a=d.text.length,c+=a):(d.collapse(!0),d.moveEnd("character",c),d.moveStart("character",a),d.select(),b[h]=
d.getBookmark())}return[a,c]}var q=n.document,v=q.documentElement,s=q.createElement("input"),t="selectionStart"in s,u="createTextRange"in s,g=n.letJS=n.letJS||{_attrs:{}},w=["data-let-input","data-let-template","data-let-length"],h="__rangeBookmark";g.setHandler||(g.setHandler=function(a,c){for(var a="string"===typeof a?[a]:a,b=0;b<a.length;b++)(g._attrs[a[b]]=c)===p&&delete g._attrs[a[b]]},function(a,c,b){g.setHandler(w,function(a){return"data-let-input"===a.attr?""===a.insertValue||(a.regExp||RegExp("^["+
a.rule+"]+$","g")).test(a.insertValue):"data-let-template"===a.attr?(a.regExp||RegExp("("+a.rule+")","g")).test(a.expectedValue):!+a.rule||a.expectedValue.length<=+a.rule});for(var e=0;e<c.length;e++)a.addEventListener?a.addEventListener(c[e],b,!0):a.attachEvent&&a.attachEvent("on"+({focus:"focusin",blur:"focusout"}[c[e]]||c[e]),function(){b.call(a,n.event)})}(v,"keypress keydown paste cut mousedown mouseup dragstart dragenter dragover drop focus blur".split(" "),function(a){var c=a.type,b=a.target||
a.srcElement,e="",d,m;if(b&&b.nodeName in{INPUT:1,TEXTAREA:1}&&!(b.type in{radio:1,checkbox:1})){var f=a.which==p?a.charCode!=p?a.charCode:a.keyCode:a.which,k=r.call({target:b}),h=k[0],k=k[1],i=h,j=k,o="value"in b?b.value:"";switch(c){case "paste":e=(e=a.clipboardData||n.clipboardData||l)&&e.getData("Text");case "cut":break;case "focusin":case "focusout":c=c==="focusin"?"focus":"blur";case "focus":case "blur":case "mousedown":case "mouseup":f=33;case "keydown":f=f===46?-1:f===8?8:f>32&&f<41?-2:0;
case "keypress":if(f===0||a.ctrlKey&&f>0||a.altKey)return;f===8?i=i-(i==j&&i>0?1:0):f===-1?j=j+(i==j&&j<o.length?1:0):f>0&&(e=String.fromCharCode(f));break;case "dragstart":case "dragenter":case "dragover":case "drop":e=l;break;default:return}for(m in g._attrs)if(e===l||Object.prototype.hasOwnProperty.call(g._attrs,m)&&(f===-2&&g._attrs[m].length>1||f!==-2)&&(d=b.getAttribute(m))!==p&&g._attrs[m].call(b,{originalEvent:a,type:c,attr:m,rule:d,target:b,selection:r,value:o,insertValue:e,cropValue:o.substring(i,
j)||"",expectedValue:o.substr(0,i<h?i:h)+e+o.substring(j>k?j:k),regExp:(d=/^\/(.*)\/(?:([igm]+))?$/.exec(d))&&RegExp(d[1],d[2]),insertStart:h,insertEnd:k,cropStart:i,cropEnd:j},f===-2)===l){a.preventDefault?a.preventDefault():a.returnValue=l;return l}}}))})(window,!1,null);