/**
 *
 * @param pass
 * @param check
 * @param err_msg
 * @returns {boolean}
 */
function checPasswords(pass, check, err_msg) {
    err_msg = err_msg || "Пароли не совпадают";
    pass = $(pass);
    err_msg && pass.errorBox();
    check = $(check);
	if(pass.val() != check.val()) {
        err_msg && pass.errorBox(err_msg);

		return false;
	}

	return true;
}

/**
 *
 * @param elem
 * @param err_val
 * @param err_msg
 * @returns {boolean}
 */
function checkSelect(elem, err_val, err_msg) {
    elem = $(elem);
    err_msg && elem.errorBox();
	if(elem.val() == err_val) {
        err_msg && elem.errorBox(err_msg);
		return false;
	}
	
	return true;
}

/**
 *
 * @param elem
 * @param lng
 * @param err_msg
 * @returns {boolean}
 */
function checkInput(elem, lng, err_msg) {
    elem = $(elem);
    err_msg && elem.errorBox();
    lng = lng || 1;
	if($.trim(elem.val()).length < lng) {
        err_msg && elem.errorBox(err_msg);
		return false;
	}
	
	return true;
}

/**
 *
 * @param email
 * @param err_msg
 * @returns {boolean}
 */
function checkEmail(email, err_msg) {
    email = $(email);
    err_msg && email.errorBox();
    var check = (/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i).test(email.val());
	if(!check) {
        err_msg && email.errorBox(err_msg);
		return false;
	}

	return true;
}
