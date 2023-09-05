(function(){
	//Section 2 : Create the button and add the functionality to it
	var utils  = require("com/es/utilities/utils");
	CKEDITOR.plugins.add('fib',{
		init:function(editor){
			editor.addCommand('fib', fib);
			editor.ui.addButton('fib',{
				label: 'Fill In The Blanks',
				icon: this.path + 'image.png',
				command:'fib'
				}); 
			
			if (editor.addMenuItems)
			{
			    //add new menu group
			    if (editor.addMenuGroup) {
			        editor.addMenuGroup('fib');
			    }
			    //add menu item
			    editor.addMenuItems({
			        addfib:
			                {
			                    label: 'Fill in the blanks',
			                    command: 'fib',
			                    icon: this.path + 'image.png',
			                    group: 'fib',
			                    order: 1
			                }
			    });
			}
			
			//add context menu event listener for comments button
	        if (editor.contextMenu)
	        {
	            editor.contextMenu.addListener(function(element, selection) {


	                var _txt = selection.getNative();
	                if (_txt != '') {
	                        return {
	                        	addfib: CKEDITOR.TRISTATE_ON
	                        };
	                }else{
	                	return null;
	                }
	        });
	        }

            }

	});
	        
        
        //Section 1 : Code to execute when the toolbar button is pressed
	var fib= {
	exec:function(editor){    
			var range = window.getSelection().getRangeAt(0);
			var content = range.cloneContents(); // getting current selected content by user
			selectedText = editor.getSelection().getSelectedText();  //Getting the selected Text
			selectedText = selectedText.replace(/\u200B/g," ").replace(/&nbsp;/g, " ").trim();
			for (i=0;i<content.childNodes.length;i++) 
			{
				if (content.childNodes[i].tagName==="IMG") // searching for embedded images
				{
					editor.focusManager.blur(100);
					utils.showToasterMessage(AppLang.FIB_IMAGE_NOT_ALLOWED); // error message
	        		setTimeout(function(){editor.focusManager.focus(editor.editable());},1000); // re-focus inline toolbar
	        		return;
				}
			}
			
			if(selectedText != ''){
				var textbox = '<div data-name="fillup" class="data-values-activity-fill" contenteditable="false"><span class="spantext" contenteditable="false">'+selectedText+'</span><div class="close-pop remove-option"></div></div>';
				var element = CKEDITOR.dom.element.createFromHtml(textbox);
		        editor.insertElement(element);
				$(CKEDITOR).trigger(AppEvent.FIB_ANSWER_ADDED, [$(element.$), selectedText]);
				$(editor.document.$.activeElement).append(" &nbsp;");
			}
	    }
	};
        
})(); //end of function.


          
