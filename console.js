$(function(){
	install();
});

function install(){
	newtab("Console", 'console-tab','console-body');
	$('#console-body').append("<textarea id=\"console-textarea\"></textarea>");
}

function console_append(text){
	$('#console-textarea').html($('#console-textarea').html()+text);
}
  
function console_clear(){
	$('#console-textarea').html("");
}
