$(function () {
    alert();
    //This method will invoke when the edit.hmtl is ready.
    //This method will load both staging and user data.
    ns.getEditModeReady = function () {
        var opt = localStorage.getItem('editMode');
        localStorage.setItem('edit', true);

        ns.ishome = false;
        if (opt) {
            opt = jQuery.parseJSON(opt);
            internal.setActiveTab(opt);
        }
        else
            opt = { isStaging: true };

        ns.isStaging = opt.isStaging;
        ns.getReady();

        var EditvideoArgs = internal.setEditArgs();
        ViTag.initEditing(EditvideoArgs);
        ViTag.addMessageHandler(internal.ShowMessage);

        ViTag.InitCanvas({});
        ns.validateTagTime();
    };
    ns.changeMode = function (opt) {
        if ($(opt.active).hasClass("not-selected")) {
            localStorage.setItem('editMode', JSON.stringify(opt));
            $(vidSearch).val("");
            ns.reload();
        }
    };
});
   
