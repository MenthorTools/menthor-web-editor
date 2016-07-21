
$("#rules-menuitem").on('click', function() {
	var template = settingsRulesDoc.querySelector("#syntactical-rules")
	var htmlContent = document.importNode(template, true)
	var checkOptionTemplate = settingsRulesDoc.querySelector('#rule-checkbox')
	$.get(ADDR+"api/syntactical-rules", function(data) {
		jQuery.each(data, function(tabname, values){		  		 		
			var tableSelector = "#"+tabname+"-body";
			var div = create_rules_div()
			for(var i=0; i<values.length; i++){
				var jsonObj = values[i];
				var htmlOpt = get_rule_option(jsonObj, checkOptionTemplate)
				div.appendChild(htmlOpt);
			}
			htmlContent.querySelector(tableSelector).appendChild(div);			
		});	 
		open_rules_dialog("<b>Active rules</b>", htmlContent);
	}, "json");
});

function create_rules_div(){
	var div = document.createElement("div")
	div.style.overflow = "auto";
	div.style.height = "300px";
	return div
}

function get_rule_option(jsonObj, checkTemplate){
	var htmlOpt = document.importNode(checkTemplate, true)						
	var isChecked = false; var name = ""; var description = "";
	for (var key in jsonObj){		
		var attrValue = jsonObj[key];				
		if(key==="name") name = attrValue;		
		if(key==="description") description = attrValue;			
		if(key==="ruleActived") isChecked = attrValue;				
	}
	htmlOpt.querySelector('label').innerHTML = "<input id=\""+name.toLowerCase().replace(" ","-")+"\"type=\"checkbox\">"+description;					
	if(isChecked) htmlOpt.querySelector('input').checked = "checked";
	return htmlOpt;
}

function open_rules_dialog(dialogName, htmlContent){
	var dialog = new BootstrapDialog({
		type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		title: dialogName,
		animate:false,
		autospin: true,
		message: htmlContent,
		hotkey:13, //enter
		buttons: [{label: 'Close', autospin: true, cssClass: 'btn-primary', 
			action: function(dialog){ dialog.close(); }
		}]
	});
	dialog.open();
	dialog.getModal().css('background-color','rgba(255,255,255,0.3)');
}