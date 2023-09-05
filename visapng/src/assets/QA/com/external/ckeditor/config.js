/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'en';
	// config.uiColor = '#AADC6E';
	config.toolbar_Activity = [    
								['Bold','Italic','Underline','Subscript','Superscript'],['TextColor'],							
                                ['fib'],['fib_dd'],['add_img']//,['Styles']
							];
		
	//config.language 	= window.parent.app.lang;
	config.toolbar 		= 'Activity';
	
	//config.extraPlugins = 'fib';
	//config.removePlugins = 'resize'

	// Remove unnecessary plugins to make the editor simpler.Removing 'liststyle,tabletools,contextmenu' for disabling CKeditor context menu 
	config.removePlugins = 'find,flash,font,forms,iframe,image,newpage,removeformat,NumberedList,BulletedList,smiley,specialchar,templates,usercomments,teacherMarkup,liststyle,tabletools,contextmenu';
};
