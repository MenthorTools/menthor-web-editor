$(function(){
	install();
});

function install(){
	newtab("Details", 'details-tab','details-body');
	var classDetailsTemplate = detailsDoc.querySelector("#elem-details");
	var details = document.importNode(classDetailsTemplate, true);
	$("#details-body").append(details);
}

function opendetails(title, elemId){
	$("#details-body").children().remove();
	var classDetailsTemplate = detailsDoc.querySelector("#elem-details");
	var details = document.importNode(classDetailsTemplate, true);
	details.querySelector('#elem-title').innerHTML = title;	
	$("#details-body").append(details);
}