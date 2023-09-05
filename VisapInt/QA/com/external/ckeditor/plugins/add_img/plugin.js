(function() {
	//Section 2 : Create the button and add the functionality to it	

	CKEDITOR.plugins.add('add_img', {
		init: function(editor) {
			editor.addCommand('add_img', add_img);
			editor.ui.addButton('add_img', {
				label: 'Add image',
				icon: this.path + 'image.png',
				command: 'add_img'
			});

			if (editor.addMenuItems) {
				//add new menu group
				if (editor.addMenuGroup) {
					editor.addMenuGroup('add_img');
				}
				//add menu item
				editor.addMenuItems({
					addfib: {
						label: 'Add image',
						command: 'add_img',
						icon: this.path + 'image.png',
						group: 'add_img',
						order: 1
					}
				});
			}

			//add context menu event listener for comments button
			if (editor.contextMenu) {
				editor.contextMenu.addListener(function(element, selection) {


					var _txt = selection.getNative();
					if (_txt != '') {
						return {
							addfib: CKEDITOR.TRISTATE_ON
						};
					} else {
						return null;
					}
				});
			}

		}

	});



	//Section 1 : Code to execute when the toolbar button is pressed
	var add_img = {
		exec: function(editor) {
			var utilsObj;
			require(["com/es/utilities/utils"], function(utils) {
				utilsObj = utils;
			});
			for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) {
				$("#cke_editor" + i).css('display', 'none');
			}
			$(editor.container.$).blur();
			$(window).focus(function() {
			    if ($("#mediaAssetSelection").css('display')==='block')
			    {
				    for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) {
				    	//console.log($("#mediaAssetSelection").css('display'));
						$("#cke_editor" + i).css('opacity','0');
					}
				}
			});

			_.delay(function() {
				$(CKEDITOR).trigger(AppEvent.ADD_ASSET, [editor]);
				if ($(editor.container.$).closest(".matchingEditView").length > 0 || $(editor.container.$).closest(".groupingEditView").length > 0 || $(editor.container.$).closest(".mcqBinaryEditView").length > 0) {
					if ($(editor.container.$).text().length === 0 || ($(editor.container.$).text().length === 1 && ($(editor.container.$).text().indexOf("\u200B") > -1))) {
						$("#mediaAssetSelection").modal("show");
					} else {
						utilsObj.showConfirmPopUp(AppLang.ADD_IMG_CONFIRMATiON_MESSAGE, "Confirm", ["cancel"], function(status) {
							if (status.toLowerCase() === "yes") {
								$("#mediaAssetSelection").modal("show");
							} else {
								//return;
							}
						});
					}
				} else {
					// do nothing
					$("#mediaAssetSelection").modal("show");
				}

			}, 150);
		}
	};

})(); //end of function.