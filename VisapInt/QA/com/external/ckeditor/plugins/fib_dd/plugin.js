(function(){
	//Section 2 : Create the button and add the functionality to it	
	CKEDITOR.plugins.add('fib_dd',{
		init:function(editor){
			editor.addCommand('fib_dd', fib_dd);
			editor.ui.addButton('fib_dd',{
				label: 'Add dropdown',
				icon: this.path + 'image.png',
				command:'fib_dd'
				}); 
			
			if (editor.addMenuItems)
			{
			    //add new menu group
			    if (editor.addMenuGroup) {
			        editor.addMenuGroup('fib_dd');
			    }
			    //add menu item
			    editor.addMenuItems({
			        addfib_dd:
			                {
			                    label: 'Add dropdown',
			                    command: 'fib_dd',
			                    icon: this.path + 'image.png',
			                    group: 'fib_dd',
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
	var fib_dd= {
	exec:function(editor){                                               
                       selectedText ="";  //Getting the selected Text
                       // if(selectedText != ''){
                        	var textbox = '<div data-name="fillup" class="data-values-activity-fill FIB_dropdown" contenteditable="false" style="display: inline-block;border: 1px solid #C3C3C3;padding: 4px 8px;width: auto!important;background: #fff;color: #333333;position: relative;"><span class="FIBtext spantext" contenteditable="false" style="min-width: 50px; display: inline-block;color: #333333 !important;">'+selectedText+'</span></div>';
	                    
	                        var element = CKEDITOR.dom.element.createFromHtml(textbox);
	                        
	                        editor.insertElement(element);
                       // }
                    }
		};
        
})(); //end of function.


          
