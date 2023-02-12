$(document).ready(function(){
	calc.result = $("#calculator span.calc-res").eq(0);
	calc.resultIns = $("#calculator span.calc-res").eq(1);
	calc.content = $('#calculator');
	calc.trigger = $('.calc');
	calc.close = $('.btn_prof_close');
	calc.action = $("#calculator form");
	calc.content.hide();
	calc.init();
});
window.calc = {};
calc.init = function(){
	calc.trigger.click(function(){
		calc.content.show();
	});
	calc.close.click(function(){
		calc.content.hide();
		$("#calculator .ulright li input").eq(0).val('');
		$("#calculator .ulright li input").eq(1).val('');
		$("#calculator .ulright li input").eq(2).val('');
		calc.result.text('');
		calc.resultIns.text('');
	});
	calc.action.submit(function(){
		calc.mainSumm = $("#calculator .ulright li input").eq(0).val();
		calc.insertSumm = $("#calculator .ulright li input").eq(1).val();
		calc.period = $("#calculator .ulright li input").eq(2).val(); 
		var month, 
		monthIns,
		period = 12*calc.period;
		for(var i=1, monthRate = +calc.mainSumm, monthRateIns = +calc.mainSumm; i<=period; i++,monthRate = +month.toFixed(1), monthRateIns = +monthIns.toFixed(1))
		{
			month = monthRate + (monthRate/100*20/12);
			monthIns = monthRateIns + (monthRateIns/100*20/12) + (+calc.insertSumm);
		}
		calc.result.text(Math.floor(month));
		calc.resultIns.text(Math.floor(monthIns));
		return false;	
	});
}



