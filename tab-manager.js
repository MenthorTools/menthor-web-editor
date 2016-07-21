function selecttab(idBody){
    $('.nav-tabs a[href="#'+idBody+']').tab('show');
}

function newtab(name, idTab, idBody){
	var newTabTemplate = tabManagerDoc.querySelector('#new-tab');	 		
	if($('#'+idTab).length) { selecttab(idBody); return; }
	var newTab = document.importNode(newTabTemplate, true);
	newTab.id = idTab;
	newTab.querySelector('a').href = "#"+idBody;
	document.querySelector('.nav-tabs').appendChild(newTab);
	
	var newBodyTemplate = tabManagerDoc.querySelector('#new-body');	
	if($('#'+idBody).length) return;
	var newBody = document.importNode(newBodyTemplate, true);	
	newBody.id = idBody;
	document.querySelector('.tab-content').appendChild(newBody);
	
	newTab.querySelector('a').innerHTML = name;		
}	
