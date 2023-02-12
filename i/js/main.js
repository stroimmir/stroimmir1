function number_format( number, decimals, dec_point, thousands_sep ) {  // Format a number with grouped thousands
	var i, j, kw, kd, km;
	
	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ) {
		decimals = 2;
	}
	if( dec_point == undefined ) {
		dec_point = ",";
	}
	if( thousands_sep == undefined ) {
		thousands_sep = ".";
	}
	
	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
	
	if( (j = i.length) > 3 ) {
		j = j % 3;
	} else {
		j = 0;
	}
	
	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
	
	
	return km + kw + kd;
}
//Функция которая перегружает страницу
function reloadPage() {
    window.location.reload();

}

//Функция которая показывает модальное окно по центру экрана
var popup;
function showPopup(url, width, height) {
	if(popup != undefined && !popup.closed) {
		popup.close();
	}
	
	if(width == undefined) width = 605;
	if(height == undefined) height = 260;
	
	var top  = Math.round((screen.availHeight / 2) - (height / 2)) - 18;
	var left = Math.round((screen.availWidth  / 2) - (width / 2)) - 9;
	
	popup = window.open(url,'','top='+top+',left='+left+',directories=0,location=0,menubar=0,status=0,toolbar=0,scrollbars=2,resizable=0,width='+width+',height='+height+'');
}


var openedModule='';
var moduleEventsCommited = false;
function moduleToCenter(id) {
	if (id!=openedModule) {
        moduleClose(openedModule);
	}
	openedModule=id;
    var module=$("#"+id);
	module.prependTo(document.body);

	//$(module).css("margin-left", "-" + left + "px");

    $('#opaco').unbind("click").click(function() {closeModule(id);});

    $("#"+id).css({
        opacity: 0
    });

    setCentered(module);
    setTimeout(function() {
        $("#" + id).css('transform', 'perspective(800px);')
    }, 10);
	$('#opaco').height($(document).height()).removeClass('hidden').fadeTo('fast', 0.3);

    if(!moduleEventsCommited) {
        $(document).keydown(function (e){
            var height=$('#opaco').height();
            if(e.keyCode == 27 && height != 0) {
                closeModule(openedModule);
            }
        });

        $(window).resize(function() {
            setCentered("#"+openedModule, true);
        });
        $(window).scroll(function() {
            setCentered("#"+openedModule, true);
        });
        moduleEventsCommited = true;
    }

    //Set focus on j-focus element
    $(".j-focus", "#"+openedModule).focus();

}

/**
 *
 * @param obj
 * @param isScroll
 */
function setCentered(obj, isScroll) {
    var module = $(obj);

    var wHeight = $(window).height();
    var mHeight = module.outerHeight();
    var scrollTop = $(window).scrollTop();
    var top = scrollTop + (wHeight / 2) - (mHeight / 2);

    if(wHeight < mHeight) {
        if(!isScroll) {
            top = scrollTop + 20;
        } else {
            top = module.css("top");
        }
    }
    if(top < 20) top = 20;

    var left = ($(window).width() / 2) - (module.width() / 2);
    if(left < 20) left = 20;

    module.css({
        top: top,
        left: left,
        opacity: 1,
        'transform': 'rotateX(0deg) scale(1, 1) translate(0px, 0px) perspective(800px)',
        '-webkit-transform': 'rotateX(0deg) scale(1, 1) translate(0px, 0px) perspective(800px)',
        '-moz-transform': 'rotateX(0deg) scale(1, 1) translate(0px, 0px) perspective(800px)',
        '-o-transform': 'rotateX(0deg) scale(1, 1) translate(0px, 0px) perspective(800px)',
        '-ms-transform':'rotateX(0deg) scale(1, 1) translate(0px, 0px) perspective(800px)'

    });

    //module.css("top", top);
    //module.css("left", left);
}

function moduleClose(id) {
    $("#"+id).stop(true, true).animate({opacity: 0}, "fast").css({
        'transform': '',
        '-webkit-transform': '',
        '-moz-transform': '',
        '-o-transform': '',
        '-ms-transform':''

    });
}

function closeModule(id) {

    if(id == "cart"){
        $("p.added-products").html(" ");
    }
    openedModule = "";
    if(id !== "") {
        $('#opaco').stop(true, true).fadeOut("fast");
        moduleClose(id);
    }
}


function getKeyCode(event) {
	return event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
}

/**
 *
 * @param count
 * @param str_1 товар
 * @param str_2 товара
 * @param str_3 товаров
 * @returns {string}
 */
function getCountText(count, str_1, str_2, str_3) {
    var str = "";
    str_1 = str_1 || "товар";
    str_2 = str_2 || "товара";
    str_3 = str_3 || "товаров";
    if (count > 10 && count < 20) {
        str = str_3 || "товаров";
    } else {
        switch(count.toString().substr(-1)) {
            case "1": str = str_1; break;
            case "2": case "3": case "4": str = str_2; break;
            case "5": case "6": case "7": case "8": case "9": case "0":default: str = str_3; break;
        }
    }
    return str;
}
/**
 * Отправка Ajax запроса.
 *
 * @param url Ссылка на скрипт-обработчик
 * @param params Параметры запроса
 * @param callback Функция ответа
 */
function sendAjax(url, params, callback) {
    $.ajax({
        type: "POST",
        url: url,
        async: true,
        data: params,

        error: function(){
            if(typeof callback == "function") {
                callback("ERROR", { });
            }
        },

        success: function(data, textStatus) {
            var status = "NOT_LOADED";
            var response = { };
            try {
                eval(data);
            } catch(e) {
                status = "ERROR";
            }

            if(typeof callback == "function") {
                callback(status, response);
            }
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


(function($) {
    $.fn.errorBox = function(message) {
        return this.each(function() {
            var me = $(this),
                parent = me.parent();

            if(typeof message === "undefined") {
                me.removeClass("error");
                me.parent().find("label.error").remove();
            } else {
                var hasBox = parent.children("label.error").length !== 0;
                me.addClass("error");
                if(hasBox) {
                    parent.children("label.error").text(message);
                } else {
                    parent.
                        append("<label class='error' style='display: block;'>" + message + "</label>");
                }

                var label = parent.children("label.error");

                var left = me.outerWidth() - label.width();
                label.css('left', left);

            }
        });
    };
})(jQuery);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function zteel_set_message(what, type, parent, clearBeforeInsert) {

    if(typeof type === "undefined" || type == '') { //Green code
        type = "success";
    }
    var class_name = "session-message s-ok";
    switch(type) {
        case "warning": class_name = "session-message s-warn";  break;
        case "error": class_name = "session-message s-error";  break;
    }

    var data = '<div class="' + class_name + '">'+what+'<a href="#" onclick="$(this).parent().remove(); return false;"></a></div>';
    var selector = (typeof parent === "undefined" || parent === "") ? ".session-messages:first" : parent;

    if(clearBeforeInsert === true) {
        $(selector).empty();
    }
    $(selector).append(data);

}

function setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function rand(min, max) {
    // http://kevin.vanzonneveld.net
    // +   original by: Leslie Hoare
    // +   bugfixed by: Onno Marsman
    // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
    // *     example 1: rand(1, 1);
    // *     returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function priceFormat(price) {
    return number_format(price, 0, '.', ',');
}

function str_replace(search, replace, subject, count) {
    var j = 0,
        temp = '',
        repl = '',
        sl = 0,        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}


function incrementInvetments() {

    var invested = $('.j-invested-funds');

    var _process = function() {
        invested.each(function() {

            var me = $(this),
                id = me.attr('id').substr('j-invested-'.length);

            sendAjax("/js/lookup.php", {load: 'updateInvest', id: id}, function(status, response) {
                if(status === "OK") {
                    me.html(number_format(response, 0, '', ','));
                }
            });

        });
    };

    _process();

    setInterval(_process, 2000);
}

$(function() {
////////////////////////////////////////////////////////////////////////
/////////////////////////Инкремент инвестиций///////////////////////////
////////////////////////////////////////////////////////////////////////

//    var invested = $('.j-invested-funds');
//
//    var _process = function() {
//        invested.each(function() {
//
//            var me = $(this),
//                cur_value = str_replace(',', '', me.text()) * 1,
//                inc = rand(0, 2),
//                id = me.attr('id').substr("j-invested-".length);
//
//            me.text(priceFormat(inc + cur_value));
//            setCookie("invest_funds_" + id, inc + cur_value);
//
//        });
//    };
//
//    _process();
//
//    setInterval(_process, 4000);


/////////////////////////   LOAD FULL NEWS AJAX    ///////////////////////////////////

$(document).on('click', '.get_new_ajax', function(){

    var article_id = $(this).data('id');

    sendAjax("/js/lookup.php", {load: 'getarticle_full', articleid: article_id}, function(status, response) {

            if(status === "OK") {
                $('.news-body[data-id='+ article_id +']').html($(response.html));
            }

        });

    return false;

});

/////////////////////////   LOAD FULL NEWS AJAX    ///////////////////////////////////



    var container = $("#anket-container");

    container.find("input[type=checkbox]").each(function() {
        var check = document.createElement("span");
        check.className = "checkbox";
        $(this).css({visibility: "hidden", position: "absolute"});

        var isLabel;

        var checkboxChange = function() {
            container.find("input[type=checkbox]").parent("span.checkbox").removeClass("checked");
            container.find("input[type=checkbox]:checked").parent("span.checkbox").addClass("checked");
        };
        $(this).change(checkboxChange);
        if($(this).parent("label").length == 0) {
            var obj = this;
            $(check).click(function() {
                obj.change();
                return false;
            });
        } else {
            var obj = this;
            $(this).parents("label:eq(0)").click(function() {
                var ch = obj.checked;
                obj.checked = !ch;
                checkboxChange();
                return false;
            });
        }
        $(check).insertAfter(this);
        $(this).appendTo(check);
    });
    container.find("input[type=checkbox]:checked").parent("span.checkbox").addClass("checked");

    //ааНаИбаИаАаЛаИаЗаАбаИб аКаАббаОаМаНбб radio
    container.find("input[type=radio]:not(.auto-submit-star)").each(function() {
        var radio = document.createElement("span");
        radio.className = "checkbox";
        $(this).hide();
        var radioChange = function() {
            container.find("input[type=radio]").parent("span.checkbox").removeClass("checked");
            container.find("input[type=radio]:checked").parent("span.checkbox").addClass("checked");
        };
        $(this).change(radioChange);
        if($(this).parents("label").length == 0) {
            var obj = this;
            $(radio).click(function() {
                obj.change();
            });
        } else {
            var obj = this;
            $(this).parents("label").click(function(event) {
                try {
                    obj.change()
                } catch(e) {
                    obj.click();
                }
            });
        }
        $(radio).insertAfter(this);
        $(this).appendTo(radio);
    });
    container.find("input[type=radio]:checked").parent("span.checkbox").addClass("checked");


});

var NewsLazyLoad = {
    /**
     *
     * @param container
     * @param load_block
     * @param perpage
     * @param count
     */
    init: function(container, load_block, perpage, count, parent) {
        this.container = $(container);
        this.load_block = $(load_block);
        this.count = count;
        this.perpage = perpage;
        this.current = perpage;
        this.parent = parent;
        this.load = true;
        this.loading = false;
        if(this.count <= this.perpage) {
            this.load = false;
            this.load_block.hide();
        }

        var me = this;

        var check_scroll = function() {
            var top = $(window).scrollTop() + $(window).height(),
                load_block_top = me.load_block.offset().top + me.load_block.height();
            if(top >= load_block_top) {
                if(!me.loading) {
                    me.loadNext();
                }
            }
        };

        $(window).on('scroll.lazy', function() {
            check_scroll();
        });
        check_scroll();
    },
    loadNext: function() {
        if(!this.load) { return; }
        this.loading = true;

        this.current += this.perpage;
        var me = this;
        me.load_block.css('visibility', 'visible');
        sendAjax("/js/lookup.php", {load: 'news_lazy', start: this.current, limit: this.perpage, parent: this.parent}, function(status, response) {

            if(status === "OK") {
                me.container.append($(response.html));
                me.load_block.css('visibility', 'hidden');
                if(response.completed) {
                    me.load_block.hide();
                }
            }
            me.loading = false;

        });
    }

};