/*
Last Modified: 16/05/07 16:31:11

AJS drag and drop
    A very small drag and drop library
AUTHOR
    4mir Salihefendic (http://amix.dk) - amix@amix.dk
LICENSE
    Copyright (c) 2006 Amir Salihefendic. All rights reserved.
VERSION
    4.05
SITE
    http://orangoo.com/AmiNation/AJS
**/
AJS.Drag = AJS.Class({

    current_handler: null, //The element that acts as handler
    current_root: null, //The element that acts as root

    last_mouse_x: 0,
    last_mouse_y: 0,

    init: function() {
    
        AJS.bindMethods(this);
    },

    dragAble: function(root, kws) {
        kws = kws || {};
        var handler = kws.handler || root;
        handler = AJS._$(handler);

        handler._kws = kws;
        handler._root = AJS._$(root);
        handler._start_fn = function(ev) {
            AJS.dnd._start(handler, ev);
            AJS.preventDefault(ev);
            return false;
        }

        AJS.AEV(handler, 'touchstart', handler._start_fn);
    },

    removeDragAble: function(elm) {
        if(elm._start_fn)
            AJS.REV(elm, 'touchstart', elm._start_fn);
    },

    //--- Private functions ----------------------------------------------
    _start: function(handler, ev) {
        this.current_handler = handler;
        var root = this.current_root = handler._root;

        this.last_mouse_pos = AJS.getMousePos(ev);

        this.old_z_index = root.style.zIndex;
        root.style.zIndex = 1000;

        if(handler._kws.on_start)
            handler._kws.on_start();

        AJS.AEV(document, 'touchmove', this._move);
        AJS.AEV(document, 'touchend', this._end);
    },

    _move: function(ev) {
        
        var touch = ev;
        
        if(ev.targetTouches) {
            touch = ev.targetTouches[0];
        }
        
        var handler = this.current_handler;
        if(!handler)
            return false;

        var root = this.current_root;
        var kws = handler._kws;

        var cur_mouse_pos = AJS.getMousePos(ev);
        var last_mouse_pos = this.last_mouse_pos;

        var new_x = (cur_mouse_pos.x - last_mouse_pos.x);
        var new_y = (cur_mouse_pos.y - last_mouse_pos.y);
        /*
        new_y += root.offsetTop;
        new_x += root.offsetLeft;
        */
        imfinity_utils.log("position : "+touch.pageX+":"+touch.pageY);
        new_y = touch.pageY-150;
        new_x = touch.pageX-50;
        imfinity_utils.log("position : "+new_x+":"+new_y);
        if(kws.move_filter) {
            var vals = kws.move_filter(new_x, new_y);
            new_x = vals[0];
            new_y = vals[1];
        }

        if(kws.move_x != false)
            AJS.setLeft(root, new_x);
        if(kws.move_y != false)
            AJS.setTop(root, new_y);

        if(kws.on_drag)
            kws.on_drag(new_x, new_y);

        this.last_mouse_pos = cur_mouse_pos;

        //Moving scroll to the top, should move the scroll up
        if(kws.scroll_on_overflow != false) {
            var sc_top = AJS.getScrollTop();
            var sc_bottom = sc_top + AJS.getWindowSize().h;
            var d_e_top = AJS.absolutePosition(root).y;
            var d_e_bottom = root.offsetTop + root.offsetHeight;

            if(d_e_top <= sc_top + 30)
                window.scrollBy(0, -20);
            else if(d_e_bottom >= sc_bottom - 30)
                window.scrollBy(0, 20);
        }

        AJS.preventDefault(ev);
        return false;
    },

    _end: function(ev) {
        var root = this.current_root;
        var handler = this.current_handler;

        AJS.REV(document, 'touchmove', this._move);
        AJS.REV(document, 'touchend', this._end);

        if(handler._kws.on_end)
            handler._kws.on_end();

        this.current_handler = null;
        this.current_root = null;

        root.style.zIndex = this.old_z_index;

        AJS.preventDefault(ev);
        return false;
    }
});

AJS.dnd = new AJS.Drag();

script_loaded = true;
