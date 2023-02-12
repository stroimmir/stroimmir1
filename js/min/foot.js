/* /js/source6.js */
;(function($){$.flexslider=function(el,options){var slider=$(el);$.data(el,"flexslider",slider);slider.init=function(){slider.vars=$.extend({},$.flexslider.defaults,options);$.data(el,'flexsliderInit',true);slider.container=$('.slides',slider).first();slider.slides=$('.slides:first > li',slider);slider.count=slider.slides.length;slider.animating=false;slider.currentSlide=slider.vars.slideToStart;slider.animatingTo=slider.currentSlide;slider.atEnd=(slider.currentSlide==0)?true:false;slider.eventType=('ontouchstart'in document.documentElement)?'touchstart':'click';slider.cloneCount=0;slider.cloneOffset=0;slider.manualPause=false;slider.vertical=(slider.vars.slideDirection=="vertical");slider.prop=(slider.vertical)?"top":"marginLeft";slider.args={};slider.transitions="webkitTransition"in document.body.style;if(slider.transitions)slider.prop="-webkit-transform";if(slider.vars.controlsContainer!=""){slider.controlsContainer=$(slider.vars.controlsContainer).eq($('.slides').index(slider.container));slider.containerExists=slider.controlsContainer.length>0;}
if(slider.vars.manualControls!=""){slider.manualControls=$(slider.vars.manualControls,((slider.containerExists)?slider.controlsContainer:slider));slider.manualExists=slider.manualControls.length>0;}
if(slider.vars.randomize){slider.slides.sort(function(){return(Math.round(Math.random())-0.5);});slider.container.empty().append(slider.slides);}
if(slider.vars.animation.toLowerCase()=="slide"){if(slider.transitions){slider.setTransition(0);}
slider.css({"overflow":"hidden"});if(slider.vars.animationLoop){slider.cloneCount=2;slider.cloneOffset=1;slider.container.append(slider.slides.filter(':first').clone().addClass('clone')).prepend(slider.slides.filter(':last').clone().addClass('clone'));}
slider.newSlides=$('.slides:first > li',slider);var sliderOffset=(-1*(slider.currentSlide+slider.cloneOffset));if(slider.vertical){slider.newSlides.css({"display":"block","width":"100%","float":"left"});slider.container.height((slider.count+slider.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){slider.css({"position":"relative"}).height(slider.slides.filter(':first').height());slider.args[slider.prop]=(slider.transitions)?"translate3d(0,"+sliderOffset*slider.height()+"px,0)":sliderOffset*slider.height()+"px";slider.container.css(slider.args);},100);}else{slider.args[slider.prop]=(slider.transitions)?"translate3d("+sliderOffset*slider.width()+"px,0,0)":sliderOffset*slider.width()+"px";slider.container.width((slider.count+slider.cloneCount)*200+"%").css(slider.args);setTimeout(function(){slider.newSlides.width(slider.width()).css({"float":"left","display":"block"});},100);}}else{slider.transitions=false;slider.slides.css({"width":"100%","float":"left","marginRight":"-100%"}).eq(slider.currentSlide).fadeIn(slider.vars.animationDuration);}
if(slider.vars.controlNav){if(slider.manualExists){slider.controlNav=slider.manualControls;}else{var controlNavScaffold=$('<ol class="flex-control-nav"></ol>');var j=1;for(var i=0;i<slider.count;i++){controlNavScaffold.append('<li><a>'+j+'</a></li>');j++;}
if(slider.containerExists){$(slider.controlsContainer).append(controlNavScaffold);slider.controlNav=$('.flex-control-nav li a',slider.controlsContainer);}else{slider.append(controlNavScaffold);slider.controlNav=$('.flex-control-nav li a',slider);}}
slider.controlNav.eq(slider.currentSlide).addClass('active');slider.controlNav.bind(slider.eventType,function(event){event.preventDefault();if(!$(this).hasClass('active')){(slider.controlNav.index($(this))>slider.currentSlide)?slider.direction="next":slider.direction="prev";slider.flexAnimate(slider.controlNav.index($(this)),slider.vars.pauseOnAction);}});}
if(slider.vars.directionNav){var directionNavScaffold=$('<ul class="flex-direction-nav"><li><a class="prev">'+slider.vars.prevText+'</a><div class="circle-bg circle-bg-left"></div></li><li><a class="next">'+slider.vars.nextText+'</a><div class="circle-bg circle-bg-right"></div></li></ul>');if(slider.containerExists){$(slider.controlsContainer).append(directionNavScaffold);slider.directionNav=$('.flex-direction-nav li a',slider.controlsContainer);}else{slider.append(directionNavScaffold);slider.directionNav=$('.flex-direction-nav li a',slider);}
if(!slider.vars.animationLoop){if(slider.currentSlide==0){slider.directionNav.filter('.prev').addClass('disabled');}else if(slider.currentSlide==slider.count-1){slider.directionNav.filter('.next').addClass('disabled');}}
slider.directionNav.bind(slider.eventType,function(event){event.preventDefault();var target=($(this).hasClass('next'))?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)){slider.flexAnimate(target,slider.vars.pauseOnAction);}});}
if(slider.vars.keyboardNav&&$('ul.slides').length==1){function keyboardMove(event){if(slider.animating){return;}else if(event.keyCode!=39&&event.keyCode!=37){return;}else{if(event.keyCode==39){var target=slider.getTarget('next');}else if(event.keyCode==37){var target=slider.getTarget('prev');}
if(slider.canAdvance(target)){slider.flexAnimate(target,slider.vars.pauseOnAction);}}}
$(document).bind('keyup',keyboardMove);}
if(slider.vars.mousewheel){slider.mousewheelEvent=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";slider.bind(slider.mousewheelEvent,function(e){e.preventDefault();e=e?e:window.event;var wheelData=e.detail?e.detail*-1:e.originalEvent.wheelDelta/40,target=(wheelData<0)?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)){slider.flexAnimate(target,slider.vars.pauseOnAction);}});}
if(slider.vars.slideshow){if(slider.vars.pauseOnHover&&slider.vars.slideshow){slider.hover(function(){slider.pause();},function(){if(!slider.manualPause){slider.resume();}});}
slider.animatedSlides=setInterval(slider.animateSlides,slider.vars.slideshowSpeed);}
if(slider.vars.pausePlay){var pausePlayScaffold=$('<div class="flex-pauseplay"><span></span></div>');if(slider.containerExists){slider.controlsContainer.append(pausePlayScaffold);slider.pausePlay=$('.flex-pauseplay span',slider.controlsContainer);}else{slider.append(pausePlayScaffold);slider.pausePlay=$('.flex-pauseplay span',slider);}
var pausePlayState=(slider.vars.slideshow)?'pause':'play';slider.pausePlay.addClass(pausePlayState).text((pausePlayState=='pause')?slider.vars.pauseText:slider.vars.playText);slider.pausePlay.bind(slider.eventType,function(event){event.preventDefault();if($(this).hasClass('pause')){slider.pause();slider.manualPause=true;}else{slider.resume();slider.manualPause=false;}});}
if('ontouchstart'in document.documentElement){var startX,startY,offset,cwidth,dx,startT,scrolling=false;slider.each(function(){if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false);}});function onTouchStart(e){if(slider.animating){e.preventDefault();}else if(e.touches.length==1){slider.pause();cwidth=(slider.vertical)?slider.height():slider.width();startT=Number(new Date());offset=(slider.vertical)?(slider.currentSlide+slider.cloneOffset)*slider.height():(slider.currentSlide+slider.cloneOffset)*slider.width();startX=(slider.vertical)?e.touches[0].pageY:e.touches[0].pageX;startY=(slider.vertical)?e.touches[0].pageX:e.touches[0].pageY;slider.setTransition(0);this.addEventListener('touchmove',onTouchMove,false);this.addEventListener('touchend',onTouchEnd,false);}}
function onTouchMove(e){dx=(slider.vertical)?startX-e.touches[0].pageY:startX-e.touches[0].pageX;scrolling=(slider.vertical)?(Math.abs(dx)<Math.abs(e.touches[0].pageX-startY)):(Math.abs(dx)<Math.abs(e.touches[0].pageY-startY));if(!scrolling){e.preventDefault();if(slider.vars.animation=="slide"&&slider.transitions){if(!slider.vars.animationLoop){dx=dx/((slider.currentSlide==0&&dx<0||slider.currentSlide==slider.count-1&&dx>0)?(Math.abs(dx)/cwidth+2):1);}
slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+(-offset-dx)+"px,0)":"translate3d("+(-offset-dx)+"px,0,0)";slider.container.css(slider.args);}}}
function onTouchEnd(e){slider.animating=false;if(slider.animatingTo==slider.currentSlide&&!scrolling&&!(dx==null)){var target=(dx>0)?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)&&Number(new Date())-startT<550&&Math.abs(dx)>20||Math.abs(dx)>cwidth/2){slider.flexAnimate(target,slider.vars.pauseOnAction);}else{slider.flexAnimate(slider.currentSlide,slider.vars.pauseOnAction);}}
this.removeEventListener('touchmove',onTouchMove,false);this.removeEventListener('touchend',onTouchEnd,false);startX=null;startY=null;dx=null;offset=null;}}
if(slider.vars.animation.toLowerCase()=="slide"){$(window).resize(function(){if(!slider.animating&&slider.is(":visible")){if(slider.vertical){slider.height(slider.slides.filter(':first').height());slider.args[slider.prop]=(-1*(slider.currentSlide+slider.cloneOffset))*slider.slides.filter(':first').height()+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}else{slider.newSlides.width(slider.width());slider.args[slider.prop]=(-1*(slider.currentSlide+slider.cloneOffset))*slider.width()+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}}});}
slider.vars.start(slider);}
slider.flexAnimate=function(target,pause){if(!slider.animating&&slider.is(":visible")){slider.animating=true;slider.animatingTo=target;slider.vars.before(slider);if(pause){slider.pause();}
if(slider.vars.controlNav){slider.controlNav.removeClass('active').eq(target).addClass('active');}
slider.atEnd=(target==0||target==slider.count-1)?true:false;if(!slider.vars.animationLoop&&slider.vars.directionNav){if(target==0){slider.directionNav.removeClass('disabled').filter('.prev').addClass('disabled');}else if(target==slider.count-1){slider.directionNav.removeClass('disabled').filter('.next').addClass('disabled');}else{slider.directionNav.removeClass('disabled');}}
if(!slider.vars.animationLoop&&target==slider.count-1){slider.pause();slider.vars.end(slider);}
if(slider.vars.animation.toLowerCase()=="slide"){var dimension=(slider.vertical)?slider.slides.filter(':first').height():slider.slides.filter(':first').width();if(slider.currentSlide==0&&target==slider.count-1&&slider.vars.animationLoop&&slider.direction!="next"){slider.slideString="0px";}else if(slider.currentSlide==slider.count-1&&target==0&&slider.vars.animationLoop&&slider.direction!="prev"){slider.slideString=(-1*(slider.count+1))*dimension+"px";}else{slider.slideString=(-1*(target+slider.cloneOffset))*dimension+"px";}
slider.args[slider.prop]=slider.slideString;if(slider.transitions){slider.setTransition(slider.vars.animationDuration);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.slideString+",0)":"translate3d("+slider.slideString+",0,0)";slider.container.css(slider.args).one("webkitTransitionEnd transitionend",function(){slider.wrapup(dimension);});}else{slider.container.animate(slider.args,slider.vars.animationDuration,function(){slider.wrapup(dimension);});}}else{slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationDuration);slider.slides.eq(target).fadeIn(slider.vars.animationDuration,function(){slider.wrapup();});}}}
slider.wrapup=function(dimension){if(slider.vars.animation=="slide"){if(slider.currentSlide==0&&slider.animatingTo==slider.count-1&&slider.vars.animationLoop){slider.args[slider.prop]=(-1*slider.count)*dimension+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}else if(slider.currentSlide==slider.count-1&&slider.animatingTo==0&&slider.vars.animationLoop){slider.args[slider.prop]=-1*dimension+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}}
slider.animating=false;slider.currentSlide=slider.animatingTo;slider.vars.after(slider);}
slider.animateSlides=function(){if(!slider.animating){slider.flexAnimate(slider.getTarget("next"));}}
slider.pause=function(){clearInterval(slider.animatedSlides);if(slider.vars.pausePlay){slider.pausePlay.removeClass('pause').addClass('play').text(slider.vars.playText);}}
slider.resume=function(){slider.animatedSlides=setInterval(slider.animateSlides,slider.vars.slideshowSpeed);if(slider.vars.pausePlay){slider.pausePlay.removeClass('play').addClass('pause').text(slider.vars.pauseText);}}
slider.canAdvance=function(target){if(!slider.vars.animationLoop&&slider.atEnd){if(slider.currentSlide==0&&target==slider.count-1&&slider.direction!="next"){return false;}else if(slider.currentSlide==slider.count-1&&target==0&&slider.direction=="next"){return false;}else{return true;}}else{return true;}}
slider.getTarget=function(dir){slider.direction=dir;if(dir=="next"){return(slider.currentSlide==slider.count-1)?0:slider.currentSlide+1;}else{return(slider.currentSlide==0)?slider.count-1:slider.currentSlide-1;}}
slider.setTransition=function(dur){slider.container.css({'-webkit-transition-duration':(dur/1000)+"s"});}
slider.init();}
$.flexslider.defaults={animation:"fade",slideDirection:"horizontal",slideshow:true,slideshowSpeed:7000,animationDuration:600,directionNav:true,controlNav:true,keyboardNav:true,mousewheel:false,prevText:"Previous",nextText:"Next",pausePlay:false,pauseText:'Pause',playText:'Play',randomize:false,slideToStart:0,animationLoop:true,pauseOnAction:true,pauseOnHover:false,controlsContainer:"",manualControls:"",start:function(){},before:function(){},after:function(){},end:function(){}}
$.fn.flexslider=function(options){return this.each(function(){if($(this).find('.slides li').length==1){$(this).find('.slides li').fadeIn(400);}
else if($(this).data('flexsliderInit')!=true){new $.flexslider(this,options);}});}})(jQuery);;
/* /js/jquery.easing.1.3.js */

jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});
/* /js/face.js */

(function($){var tabs=$('div.page-tabs'),tabsNav=tabs.find('nav.tabs-nav a'),tabsText=tabs.find('.tabs-content .text').hide();tabsNav.parent().first().addClass('active');tabsText.first().show();tabsNav.click(function(){var $this=$(this);tabsNav.parent().removeClass('active');$this.parent().addClass('active');tabsText.hide();tabsText.eq($this.parent().index()).show();})
jQuery('.blockSlideshow-processed').flexslider({animation:"fade",slideshow:false,controlNav:true,before:function(slider){if(($.browser.msie&&parseInt($.browser.version,10))!=8){formId='div.news-subscribe';$('.slide-2.text',slider.slides[slider.animatingTo]).css({"top":"-62px"}).animate({"top":'75px'},500,'easeInOutCubic');$('.slide-2.text-ul',slider.slides[slider.animatingTo]).css({"top":"-62px"}).animate({"top":'310px'},700,'easeInOutCubic');$('.slide-3.text',slider.slides[slider.animatingTo]).css({"left":"100%"}).animate({"left":'67%',"margin-left":'-272px'},500,'easeInOutCubic');$('.slide-3.text-ul',slider.slides[slider.animatingTo]).css({"left":"100%"}).animate({"left":'67%',"margin-left":'-272px'},700,'easeInOutCubic');$('.slide-4.text',slider.slides[slider.animatingTo]).css({"left":"100%"}).animate({"left":'15%'},500,'easeInOutCubic');$('.slide-4.text-ul',slider.slides[slider.animatingTo]).css({"left":"100%"}).animate({"left":'15%',"width":"auto"},700,'easeInOutCubic');$('.slide-1.text',slider.slides[slider.animatingTo]).css({"left":"270px"})
if(slider.animatingTo==1||slider.animatingTo==2){$(formId).css({"display":'none'});}
if(slider.animatingTo==0){$(formId).css({"left":"100%","display":'block',"opacity":0}).animate({"left":'70%',"opacity":1},800,'easeInOutCubic');}}}});$('.projects-slider .slides').slideCarousel({resizable:false,visibleItems:1,bullets:true,arrows:false,autoScroll:true});$(window).scroll(function(){var st=$(window).scrollTop();var fullHeight=$('.block-ardas-slideshow-block').height();var imagePosition=50-(st*25/fullHeight);$('.zone-branding').find('div.back').css({backgroundPosition:'50% '+imagePosition+'%'});if($(window).width()>1200){$('#region-branding').find('div.slide-4.back').css({backgroundPosition:'50% '+(imagePosition-13)+'%'});}
var navIndex=$(".flex-direction-nav a");var scrollOffset=$(window).scrollTop();if(scrollOffset>500){navIndex.css('z-index',0);}
else{navIndex.css('z-index',2);}});})(jQuery);;(function($,window,document,undefined){$.fn.extend({scrollspy:function(options){var defaults={min:0,max:0,mode:'vertical',buffer:0,container:window,onEnter:options.onEnter?options.onEnter:[],onLeave:options.onLeave?options.onLeave:[],onTick:options.onTick?options.onTick:[]}
var options=$.extend({},defaults,options);return this.each(function(i){var element=this;var o=options;var $container=$(o.container);var mode=o.mode;var buffer=o.buffer;var enters=leaves=0;var inside=false;$container.bind('scroll',function(e){var position={top:$(this).scrollTop(),left:$(this).scrollLeft()};var xy=(mode=='vertical')?position.top+buffer:position.left+buffer;var max=o.max;var min=o.min;if($.isFunction(o.max)){max=o.max();}
if($.isFunction(o.min)){min=o.min();}
if(max==0){max=(mode=='vertical')?$container.height():$container.outerWidth()+$(element).outerWidth();}
if(xy>=min&&xy<=max){if(!inside){inside=true;enters++;$(element).trigger('scrollEnter',{position:position})
if($.isFunction(o.onEnter)){o.onEnter(element,position);}}
$(element).trigger('scrollTick',{position:position,inside:inside,enters:enters,leaves:leaves})
if($.isFunction(o.onTick)){o.onTick(element,position,inside,enters,leaves);}}else{if(inside){inside=false;leaves++;$(element).trigger('scrollLeave',{position:position,leaves:leaves})
if($.isFunction(o.onLeave)){o.onLeave(element,position);}}}});});}})})(jQuery,window);(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);(function($){var menu=$('.front-page-scroll');var headerHeight=$('.section-header').height();var menuHeight=menu.height();var isiPad=navigator.userAgent.toLowerCase().indexOf("ipad");menu.scrollspy({min:menu.offset().top-headerHeight-5,max:$(document).height(),onEnter:function(element,position){$(element).addClass('front-page-scroll-fixed');},onLeave:function(element,position){$(element).removeClass('front-page-scroll-fixed');}});var esForm=$('.block-subscription');esForm.scrollspy({min:esForm.offset().top-(headerHeight+menuHeight),max:$(document).height()-10,onEnter:function(element,position){$('.front-page-scroll').find('li').removeClass('active');menu.removeClass('front-page-scroll-fixed');},onLeave:function(element,position){$(element).removeClass('front-page-scroll-fixed-block');menu.addClass('front-page-scroll-fixed');}});menu.find('a').each(function(){var link=$(this);var linkParent=$(this).parent();var block=$(link.attr('href')+'-block');if(block.length){link.click(function(event){event.stopPropagation();event.preventDefault();isiPad=1;if(isiPad!=-1){$(window).scrollTop($(block).offset().top-headerHeight-menuHeight);window.location.hash=link.attr('href');$('body').append($('<div></div>').addClass('iosfix'));setTimeout(function(){$('.iosfix').remove();},500);return false;}
else{$.scrollTo.window().queue([]).stop();$.scrollTo(block,{duration:1000,easing:'easeInOutQuart',offset:{left:0,top:-menuHeight-headerHeight},onAfter:function(){window.location.hash=link.attr('href');return false;}});}});block.scrollspy({min:block.offset().top-headerHeight-menuHeight-5,max:block.offset().top+block.innerHeight()-headerHeight-menuHeight-5,onEnter:function(element,position){linkParent.closest('.front-page-scroll').find('li').removeClass('active');linkParent.addClass('active');}});}});if(window.location.hash){$('a[href="'+window.location.hash+'"]').click();}
$(window).bind('hashchange',function(event){if(window.location.hash){$('a[href="'+window.location.hash+'"]').click();}});var exist=jQuery('#back-top').length;if(exist==0){$("body").append("<p id='back-top'><a href='#top'><span id='button'></span><span id='link'></span></a></p>");}
$("#back-top").hide();$(window).scroll(function(){if($(this).scrollTop()>100){$('#back-top').fadeIn();}else{$('#back-top').fadeOut();}});$('#back-top a').click(function(){$('body,html').animate({scrollTop:0},800);return false;});$('.tooltip-container').each(function(){var tp=$(this),tool_out,ready=false;tp.find('.qa-button').mouseenter(function(){if(!ready){ready=true;var tooltip=$(this).next('.tooltip'),top=parseFloat(tooltip.css('top'));tooltip.css('top',top-12);tooltip.stop(true,true).animate({'top':top,'opacity':1},300).show();}});tp.mouseleave(function(){var $this=$(this);tool_out=setTimeout(function(){$this.find('.tooltip').fadeOut(200);ready=false;},100)});tp.mouseenter(function(){clearTimeout(tool_out);});})})(jQuery);