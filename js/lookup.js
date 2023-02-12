function _process_validation_errors(form, errors) {
    form = $(form);
    var i = 0;
    for(var selector in errors) {
        var message = errors[selector];
        form.find(selector).errorBox(message);
        if(i++ === 0) {
            var top = form.find(selector).focus().offset().top - $('.zone-header-wrapper').height() - 10,
                scroll_min = $(window).scrollTop(),
                scroll_max = scroll_min + $(window).height();

            if(top < scroll_min || top > scroll_max) {
                $(window).scrollTop(top);
            }

        }
    }
}

function form_send(selector, callback) {
    var form = $(selector),
        params = form.serializeArray();



    $.ajax({
        type: "POST",
        url: form.attr('action'),
        async: true,
        data: params,

        error: function(){
            if(typeof callback == "function") {
                callback("ERROR", { });
            }
        },

        success: function(data, st) {
            var status = "NOT_LOADED",
                response = { };
            try {
                eval(data);
            } catch(e) {
                status = "ERROR";
            }

            form.find(":input").errorBox();

            if(status === "VALIDATION_ERROR" && response.errors) {
                _process_validation_errors(form, response.errors);
            }
            typeof callback == "function" && callback(status, response);
        }
    });
}

function form_anket_send() {
    var form = $(this);

    form_send(form, function(status, response) {
        if(status === "OK") {
            $("#anket-container").html(response);
        }
    });

    return false;
}

function form_signin_send() {
    var form = $(this);

    form_send(form, function(status, response) {
        if(status === "OK") {
            //reloadPage();
            window.location.replace("http://fison.org/account/");
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message('Логин или пароль введены неверно', 'error', '#sign-in-error', true);
        }
    });

    return false;
}

function form_signup_send() {
    var form = $(this);

    form_send(form, function(status, response) {
        if(status === "OK") {
            reloadPage();
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message(response, 'error', '#sign-up-error', true);
        }
    });

    return false;
}

function form_check_send() {
    var form = $(this);

    form_send(form, function(status) {
        if(status === "OK") {
            moduleToCenter('check-reg');
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message("Пользователя с указанным Email не существует", 'error', '#forgot-password-error', true);
        }
    });

    return false;
}

function form_forgot_password_send() {
    var form = $(this);

    form_send(form, function(status) {
        if(status === "OK") {
            moduleToCenter('check-reg');
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message("Пользователя с указанным Email не существует", 'error', '#forgot-password-error', true);
        }
    });

    return false;
}

function form_profile_send() {
    var form = $(this);

    form_send(form, function(status) {
        if(status === "OK" || status === "ERROR" ) {//изза смены апи запроса, возвращается ошибка
            zteel_set_message("Данные профиля сохранены", '', '#profile-error', true);
            location.reload();
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message("Указанный Email уже используется другим пользователем", 'error', '#profile-error', true);
        }
    });

    return false;

}

function form_legacy_send(){
    var form = $(this);

    form_send(form, function(status) {
        if(status === "OK" || status === "ERROR" ) {
            zteel_set_message("Доверенность сохранена", '', '#profile-error', true);
            location.reload();
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message("Произошла ошибка при сохранении формы", 'error', '#profile-error', true);
        }
    });

    return false;

}

$(function() {
    $('.j-mailing-form').off('submit').on('submit', function() {
        var form = $(this);

        form_send(form, function(status, response) {
            if(status === "OK") {
                form.hide();
                form.parent().append("<div class='message_success'>"+response.html+"</div>");
            }
        });

        return false;
    });

    $('.contacts-form').off('submit').on('submit', function() {
        var form = $(this);

        form_send(form, function(status) {
            if(status === "OK") {
                zteel_set_message('Спасибо за Ваш вопрос. Мы ответим Вам на него в ближайшее время', '', '.j-contacts-msg', true);
                form.hide();
            }
        });

        return false;
    });
});

function form_send_callback() {
    var form = $(this);

    form_send(form, function(status, html) {
        if(status === "OK") {
            form.html(html);
        }
    });

    return false;
}


 /* function form_presentation_send() {
  var form = $(this),
        loading_bar = $('.loading-bar');

    var timer = setTimeout(function() {
        loading_bar.show();
    }, 500);
    $(this).ajaxSubmit({
        success: function(a) {
            var status = "NOT_LOADED";
            var response = {};
            try {
                eval(a);
            } catch(e) {
                status = "ERROR";
            }

            clearTimeout(timer);
            form.find(":input").errorBox();

            if(status === "VALIDATION_ERROR" && response.errors) {
                _process_validation_errors(form, response.errors);
            } else if(status == "EXCEPTION" && response.message) {
                zteel_set_message(response.message, 'error', '#presentation_error', true);
            }

            loading_bar.hide().children().css({width: '100%'});
            if(status === "OK") {
                moduleToCenter('presentation-success');
                form[0].reset();
           }
        },
        error: function() {
            loading_bar.hide();
        },
        uploadProgress: function(event, position, total, percent) {
            loading_bar.children().css({width: ((percent > 98) ? 98 : percent) + '%'});
        }
    });
        var form = $(this);

    form_send(form, function(status) {
        if(status === "OK") {
            moduleToCenter('presentation-success');
        } else if(status === "INCORRECT_INPUT") {
            zteel_set_message("Какаята борода", 'error', '#forgot-password-error', true);
        }
    });

    return false;
}*/

function getProfileData(){
	$("#first_step").show();
	$("#second_step, #third_step, input.inputphoto").hide();
	$("#first").click(function(){
		$("#second_step, #third_step, input.inputphoto").hide();
		$("#first_step").show();
	});
	$("#second").click(function(){
		$("#first_step, #third_step").hide();
		$("#second_step, input.inputphoto").show();
	});
	$("#third").click(function(){
		$("#second_step, #first_step, input.inputphoto").hide();
		$("#third_step").show();
	});
}
function viewCity(city){
	$(document).ready(function () {
        $('#country').change(function () {
			var country_id = $(this).val();
			if (country_id == '0') {
				$('#city').html('<option>- выберите город -</option>');
				$('#city').attr('disabled', true);
				return(false);
			}
			$('#city').attr('disabled', true);
			$('#city').html('<option>загрузка...</option>');
			
			var url = 'http://fison.org/view/js/get_adress.php';
			$.get(
				url,
				"item=" + country_id,
				function (result) {
					if (result.type == 'error') {
						alert('error');
						return(false);
					}
					else {
						var options = '';

						$(result.citys).each(function() {
							options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('city_name_ru') + '</option>';
						});

						$('#city').html('<option value="0">- выберите город -</option>'+options);
						$('#city').attr('disabled', false);
					}
				},
				"json"
			);
		});
	});
}
function sendPaymant(key){
    $("#paymant_popup").hide();
    $("#pay_start").click(function(){
        if(key=="Y"){
            $("#paymant_popup").show();
        }else{
            alert('Для совершения платежа, заполните пожалуйста личные данные в разделе "Профиль"');
        }
        return false;
    });
    $('.btn_prof_close').click(function(){
        $('#paymant_popup').hide();
    });
    $("#submitP24").click(function(){
        $('#input_pay_summ').attr('form', 'fison-payment-emoney');
        $( "#fison-payment-emoney" ).submit();
    });
    $("#submitPlaton").click(function(){
        var _payment = $('#input_pay_summ').val();
        $.post(
            "http://fison.org/view/js/platon_data.php",
            "paysumm=" + _payment,
            function (result) {
                if (result.type == 'error') {
                    alert('error');
                    return (false);
                } else {
                    $('#platon_data').val(result.data);
                    $('#platon_sign').val(result.sign);
                    $( "#fison-payment-platon" ).submit();
                }
            },
            "json"
        );

    });
}
function scrollProjects(width){
    var _block = $('#pr_inner'),
        _right = $('#right_scroll'),
        _left = $('#left_scroll');
        _block.width(width);
        _scrollAmount = _block.width() - _block.parent().width();
    _right.click(function(){
        var currentPos = Math.abs(parseInt(_block.css('left'))),
            remainingScroll = _scrollAmount - currentPos;
        console.log(currentPos);
        console.log(remainingScroll);
        // Scroll half-a-screen by default
        var nextScroll = Math.floor(_block.parent().width());
        console.log(nextScroll);
        // But if there isn’t a FULL scroll left, do only the remaining amount.
        if (remainingScroll < nextScroll) {
      nextScroll = remainingScroll;
        }
   
        if (currentPos < _scrollAmount) {
        // Scroll left
            _block.animate({'left':'-=' + nextScroll}, 'slow');
        }
        //else {
        // Scroll right
        //    _block.css('left','0');
        //}
    });
    _left.click(function(){
        var currentPos = Math.abs(parseInt(_block.css('left'))),
            remainingScroll = currentPos;
            console.log(currentPos);
            console.log(remainingScroll);
        // Scroll half-a-screen by default
        var nextScroll = Math.floor(_block.parent().width());
            console.log(nextScroll);
        // But if there isn’t a FULL scroll left, do only the remaining amount.
        if (remainingScroll < nextScroll) {
            nextScroll = remainingScroll;
        }

        if (currentPos > 0) {
            // Scroll left
            _block.animate({'left':'+=' + nextScroll}, 'slow');
        }
    });
}
function profile_navigation(){
    $('#docs, #crop-container').hide();
    $('#docs_copy').click(function(){
        $('#docs').show();
    });
    $('.btn_prof_close').click(function(){
        $('#docs, #sign, #legacy').hide();
    });
    $('#close-crop').click(function(){
        $('#crop-container').hide();
        $("div.jcrop-holder").remove();
        window.location.reload(true);
    });
    $('#sign').hide();
    $('#sign_link').click(function(){
        $('#sign').show();
    });
	$('#legacy').hide();
    $('#legacy_link').click(function(){
        $('#legacy').show();
    });
    $("[name = 'form[birthday]']").mask("9999-99-99");

}
    // рендеринг изображения
    function renderImage(file) {
        // генерация нового объекта FileReader
        var reader = new FileReader();
        // подстановка изображения в атрибут src
        reader.onload = function(event) {
            the_url = event.target.result;
            $('#mofat').attr("src", the_url);
        }
        // при считке файла, вызывается метод, описанный выше
    reader.readAsDataURL(file);
		
    $("#file-input").change(function(e) {
        // выбор первого изображения из FileList и передача в функцию
        renderImage(e.target.files[0]);
        // выводим объект FileList
        window.file = e.target.files[0];
    });
    $('#photo').click(function(e){
        e.preventDefault();
        savePhoto();
        cropImage();
    });
}
function savePhoto(){
    $('#crop-container').show();

}
function sendPhoto(file, x, y, w, h){

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("x", x);
    formData.append("y", y);
    formData.append("w", w);
    formData.append("h", h);
    formData.append("load", "profile-save");
    formData.append("number", "photo");
    formData.append("email", $("#user_email").val());

    $.ajax(
        {
            url: "http://fison.org/view/js/lookup.php",
            type: "POST",
            data: formData,
            processData: false,
            cache: false,
            dataType: 'json',
            contentType: false,
            complete: function(){
                window.location.reload(true);
            }
        }
    );
}
function count_navigation(){
    $('#btns, #addcount, #changecount').hide();
    $('#actyvity').click(function(){
        $('#btns').show();
        $('#count_menu').hide();
    });
    $('.cnt_submit').click(function(){
        $('#btns').hide();
        $('#count_menu').show();
    });
    $('#change_cnt_link').click(function(){
        $('#changecount').show();
    });
    $('#add_cnt_link').click(function(){
        $('#addcount').show();
    });
    $('#add_cnt_close').click(function(){
        $('#addcount').hide();
    });
    $('#change_cnt_close').click(function(){
        $('#changecount').hide();
    });
    $('.btn_prof_close').click(function(){
        $('#changecount, #addcount').hide();
    });
    /*$('#form-addcount').submit( function(e) {
            e.preventDefault();
            var form = $(this),
                formParams = form.serialize();
            $.ajax(
                {
                    url: "http://fison.org/view/js/lookup.php",
                    type: "POST",
                    data: formParams,
                    dataType: 'json',
                    complete: function(data){
                        console.log(data);
                    }
                }
            );
    });*/
}
function mainAccauntNavigation(){
    $('#calculator').hide();
    $('#main-calc-btm').click(function(){
        $('#calculator').show();
    });
}