var SpinningWheel = {
    cellHeight: 44,
    friction: 0.003,
    slotData: [],
    
    handleEvent: function (e) {
        //console.log(e.type);
        if (e.type == "touchstart") {
            this.lockScreen(e);
            if(DEVICE_TYPE != DEVICE_IPAD) {
                if (e.currentTarget.id == "sw-cancel" || e.currentTarget.id == "sw-done") {
                    this.tapDown(e)
                } else {
                    if (e.currentTarget.id == "sw-frame") {
                        this.scrollStart(e)
                    }
                }
            } else {
                if (e.currentTarget.id == "sw-wrapper-overlay") {
                        this.tapUp(e)
                } else {
                    if (e.currentTarget.id == "sw-frame") {
                        this.scrollStart(e)
                    }
                }   
            }
        } else {
            if (e.type == "touchmove") {
                this.lockScreen(e);
                if (e.currentTarget.id == "sw-cancel" || e.currentTarget.id == "sw-done") {
                    this.tapCancel(e)
                } else {
                    if (e.currentTarget.id == "sw-frame") {
                        this.scrollMove(e)
                    }
                }
            } else {
                if (e.type == "touchend") {
                    
                    if(DEVICE_TYPE == DEVICE_IPAD) {
                          
                        if (e.currentTarget.id == "sw-wrapper-overlay") {
                            this.tapUp(e)
                        } else {
                            if (e.currentTarget.id == "sw-frame") {
                                this.scrollEnd(e)
                            }
                        }
                    } else {
                        if (e.currentTarget.id == "sw-cancel" || e.currentTarget.id == "sw-done") {
                            this.tapUp(e)
                        } else {
                            if (e.currentTarget.id == "sw-frame") {
                                this.scrollEnd(e)
                            }
                        }
                    }
                    
                } else {
                    if (e.type == "webkitTransitionEnd") {
                        if (e.target.id == "sw-wrapper") {
                            this.destroy()
                        } else {
                            this.backWithinBoundaries(e)
                        }
                    } else {
                        if (e.type == "orientationchange") {
                            this.onOrientationChange(e)
                        } else {
                            if (e.type == "scroll") {
                                this.onScroll(e)
                            }
                        }
                    }
                }
            }
        }
    },
    onOrientationChange: function (e) {
        window.scrollTo(0, 0);
        if(DEVICE_TYPE == DEVICE_IPAD) {
            this.swWrapper.style.top = "50%";
        } else {
            this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px";
        }
        this.calculateSlotsWidth()
    },
    onScroll: function (e) {
        if(DEVICE_TYPE == DEVICE_IPAD) {
            this.swWrapper.style.top = "50%";
        } else {
            this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px";
        }
    },
    lockScreen: function (e) {
        e.preventDefault();
        e.stopPropagation();
    },
    reset: function () {
        this.slotEl = [];
        this.activeSlot = null;
        this.swWrapper = undefined;
        this.swSlotWrapper = undefined;
        this.swSlots = undefined;
        this.swFrame = undefined
    },
    calculateSlotsWidth: function () {
        var div = this.swSlots.getElementsByTagName("div");
        for (var i = 0; i < div.length; i += 1) {
            this.slotEl[i].slotWidth = div[i].offsetWidth
        }
    },
    create: function () {
        var i, l, out, ul, div;
        this.reset();
        
        
        if(DEVICE_TYPE == DEVICE_IPAD) {
            div = document.createElement("div");
            div.id = "sw-wrapper-overlay";
            div.innerHTML = '<div id="sw-wrapper"><div id="sw-header"><span></span></div><div id="sw-slots-wrapper"><div id="sw-slots"></div></div><div id="sw-frame"></div></div>';
            document.body.appendChild(div);
            this.swWrapperOverlay = div;
            this.swWrapper = document.getElementById("sw-wrapper");
            this.swSlotWrapper = document.getElementById("sw-slots-wrapper");
            this.swSlots = document.getElementById("sw-slots");
            this.swFrame = document.getElementById("sw-frame");
            this.swHeader = document.getElementById("sw-header");
            
            this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px";
            this.swWrapper.style.webkitTransitionProperty = "-webkit-transform";
        } else {
            div = document.createElement("div");
            div.id = "sw-wrapper";
            div.style.top = window.innerHeight + window.pageYOffset + "px";
            div.style.webkitTransitionProperty = "-webkit-transform";
            div.innerHTML = '<div id="sw-header"><div id="sw-cancel">Cancel</div><div id="sw-done">Done</div></div><div id="sw-slots-wrapper"><div id="sw-slots"></div></div><div id="sw-frame"></div>';
            document.body.appendChild(div);
            this.swWrapper = div;
            this.swSlotWrapper = document.getElementById("sw-slots-wrapper");
            this.swSlots = document.getElementById("sw-slots");
            this.swFrame = document.getElementById("sw-frame");
        }
        
        for (l = 0; l < this.slotData.length; l += 1) {
            
            ul = document.createElement("ul");
            out = "";
            for (i in this.slotData[l].values) {
                out += "<li>" + this.slotData[l].values[i] + "</li>"
            }
            ul.innerHTML = out;
            div = document.createElement("div");
            div.className = this.slotData[l].style;
            div.appendChild(ul);
            this.swSlots.appendChild(div);
            ul.slotPosition = l;
            ul.slotYPosition = 0;
            ul.slotWidth = 0;
            ul.slotMaxScroll = this.swSlotWrapper.clientHeight - ul.clientHeight - 86;
            ul.style.webkitTransitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
            this.slotEl.push(ul);
            if (this.slotData[l].defaultValue) {
                this.scrollToValue(l, this.slotData[l].defaultValue)
            }
        }
        this.calculateSlotsWidth();
        
        if(DEVICE_TYPE == DEVICE_IPAD) {
            document.getElementById("sw-wrapper-overlay").addEventListener("touchstart", this, false);
            this.swFrame.addEventListener("touchstart", this, false)
        } else {
            document.addEventListener("touchstart", this, false);
            document.addEventListener("touchmove", this, false);
            window.addEventListener("orientationchange", this, true);
            window.addEventListener("scroll", this, true);
            document.getElementById("sw-cancel").addEventListener("touchstart", this, false);
            document.getElementById("sw-done").addEventListener("touchstart", this, false);
            this.swFrame.addEventListener("touchstart", this, false)
        }
    },
    
    open: function (options) {
        this.create();
        if(options!= undefined && options != null) {
            if(DEVICE_TYPE == DEVICE_IPAD) {
                // calculate position of picker
                
                var position = 0;
                var leftPosition = 0;
                
                if(options.arrowPosition != undefined) {
                    leftPosition = options.arrowPosition;
                    document.styleSheets[1].removeRule('#sw-header:before { left }', 0);
                    document.styleSheets[1].insertRule('#sw-header:before { left: 25px !important; }', 0);
                    this.swWrapper.style.left = options.arrowPosition+"px";
                } else {
                    //console.log("reset size");
                    document.styleSheets[1].removeRule('#sw-header:before { left }', 0);
                    document.styleSheets[1].insertRule('#sw-header:before { left: 220px !important; }', 0);
                   // alert(options.e.pageY)
                    this.swWrapper.style.left = "20px";
                }
                imfinity_utils.log(options.e.pageY+", "+options.e.layerY);
                if(options.position == undefined) {
                    position = (options.e.pageY ? options.e.pageY : options.e.layerY);
                    
                } else {
                    position = options.position;
                }
		imfinity_utils.log("position : "+position);
		var elementHeight = options.e.target.clientHeight + options.e.target.offsetTop;
              //  var elementHeight = 32;
                //console.log(position +", "+ elementHeight +", "+ this.swWrapper.clientHeight);
                options.align = (options.align == "" || options.align == undefined || options.align == null) ? "bottom" : options.align;
                options.title = (options.title == "" || options.title == undefined || options.title == null) ? "Select" : options.title;
                
                this.swHeader.querySelector("span").innerHTML = options.title;
                
                switch(options.align){
                    case "bottom":
                        this.swWrapper.style.top = (position + 88)+"px";
                        break;
                    case "top":
                        this.swWrapper.style.top = (position - elementHeight)+"px";
                        break;
                }
                //console.log('TOP ----- ' + this.swWrapper.style.top);
            } else {
                this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px";
                this.swWrapper.style.webkitTransitionTimingFunction = "ease-out";
                this.swWrapper.style.webkitTransitionDuration = "400ms";
                this.swWrapper.style.webkitTransform = "translate3d(0, -260px, 0)";
            }    
        }
        
        
        
    },
    destroy: function () {
        if(DEVICE_TYPE == DEVICE_IPAD) {
            this.swWrapper.removeEventListener("webkitTransitionEnd", this, false);
            this.swWrapperOverlay.removeEventListener("touchstart", this, false);
            this.swFrame.removeEventListener("touchstart", this, false);
        } else {
            this.swWrapper.removeEventListener("webkitTransitionEnd", this, false);
            this.swFrame.removeEventListener("touchstart", this, false);
            document.getElementById("sw-cancel").removeEventListener("touchstart", this, false);
            document.getElementById("sw-done").removeEventListener("touchstart", this, false);
            document.removeEventListener("touchstart", this, false);
            document.removeEventListener("touchmove", this, false);
            window.removeEventListener("orientationchange", this, true);
            window.removeEventListener("scroll", this, true);
        }
        this.slotData = [];
        this.cancelAction = function () {
            return false
        };
        this.cancelDone = function () {
            return true
        };
        this.reset();
        if(DEVICE_TYPE == DEVICE_IPAD) {
            document.body.removeChild(document.getElementById("sw-wrapper-overlay"));
        } else {
            document.body.removeChild(document.getElementById("sw-wrapper"));
        }
    },
    close: function () {
        var timingFn = "ease-in";
    	if(DEVICE_TYPE == DEVICE_ANDROID_TAB) {
    		timingFn = "ease-out";
    	}
        this.swWrapper.style.webkitTransitionTimingFunction = timingFn;
        this.swWrapper.style.webkitTransitionDuration = "400ms";
        this.swWrapper.style.webkitTransform = "translate3d(0, 0, 0)";
        this.swWrapper.addEventListener("webkitTransitionEnd", this, false)
    },
    addSlot: function (values, style, defaultValue) {
        if (!style) {
            style = ""
        }
        style = style.split(" ");
        for (var i = 0; i < style.length; i += 1) {
            style[i] = "sw-" + style[i]
        }
        style = style.join(" ");
        var obj = {
            values: values,
            style: style,
            defaultValue: defaultValue
        };
        this.slotData.push(obj)
    },
    getSelectedValues: function () {
        var index, count, i, l, keys = [],
            values = [];
        for (i in this.slotEl) {
            this.slotEl[i].removeEventListener("webkitTransitionEnd", this, false);
            this.slotEl[i].style.webkitTransitionDuration = "0";
            if (this.slotEl[i].slotYPosition > 0) {
                this.setPosition(i, 0)
            } else {
                if (this.slotEl[i].slotYPosition < this.slotEl[i].slotMaxScroll) {
                    this.setPosition(i, this.slotEl[i].slotMaxScroll)
                }
            }
            index = -Math.round(this.slotEl[i].slotYPosition / this.cellHeight);
            count = 0;
            for (l in this.slotData[i].values) {
                if (count == index) {
                    keys.push(l);
                    values.push(this.slotData[i].values[l]);
                    break
                }
                count += 1
            }
        }
        return {
            keys: keys,
            values: values
        }
    },
    setPosition: function (slot, pos) {
        this.slotEl[slot].slotYPosition = pos;
        this.slotEl[slot].style.webkitTransform = "translate3d(0, " + pos + "px, 0)"
    },
    scrollStart: function (e) {
        var xPos = e.targetTouches[0].clientX - this.swSlots.offsetLeft;
        var slot = 0;
        for (var i = 0; i < this.slotEl.length; i += 1) {
            slot += this.slotEl[i].slotWidth;
            if (xPos < slot) {
                this.activeSlot = i;
                break
            }
        }
        if (this.slotData[this.activeSlot].style.match("readonly")) {
            this.swFrame.removeEventListener("touchmove", this, false);
            this.swFrame.removeEventListener("touchend", this, false);
            return false
        }
        this.slotEl[this.activeSlot].removeEventListener("webkitTransitionEnd", this, false);
        this.slotEl[this.activeSlot].style.webkitTransitionDuration = "0";
        var theTransform = window.getComputedStyle(this.slotEl[this.activeSlot]).webkitTransform;
        theTransform = new WebKitCSSMatrix(theTransform).m42;
        if (theTransform != this.slotEl[this.activeSlot].slotYPosition) {
            this.setPosition(this.activeSlot, theTransform)
        }
        this.startY = e.targetTouches[0].clientY;
        this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
        this.scrollStartTime = e.timeStamp;
        this.swFrame.addEventListener("touchmove", this, false);
        this.swFrame.addEventListener("touchend", this, false);
        return true
    },
    scrollMove: function (e) {
        var topDelta = e.targetTouches[0].clientY - this.startY;
        if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
            topDelta /= 2
        }
        this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + topDelta);
        this.startY = e.targetTouches[0].clientY;
        if (e.timeStamp - this.scrollStartTime > 80) {
            this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
            this.scrollStartTime = e.timeStamp
        }
    },
    scrollEnd: function (e) {
        this.swFrame.removeEventListener("touchmove", this, false);
        this.swFrame.removeEventListener("touchend", this, false);
        if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
            this.scrollTo(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition > 0 ? 0 : this.slotEl[this.activeSlot].slotMaxScroll);
            return false
        }
        var scrollDistance = this.slotEl[this.activeSlot].slotYPosition - this.scrollStartY;
        if (scrollDistance < this.cellHeight / 1.5 && scrollDistance > -this.cellHeight / 1.5) {
            if (this.slotEl[this.activeSlot].slotYPosition % this.cellHeight) {
                this.scrollTo(this.activeSlot, Math.round(this.slotEl[this.activeSlot].slotYPosition / this.cellHeight) * this.cellHeight, "100ms")
            }
            return false
        }
        var scrollDuration = e.timeStamp - this.scrollStartTime;
        var newDuration = (2 * scrollDistance / scrollDuration) / this.friction;
        var newScrollDistance = (this.friction / 2) * (newDuration * newDuration);
        if (newDuration < 0) {
            newDuration = -newDuration;
            newScrollDistance = -newScrollDistance
        }
        var newPosition = this.slotEl[this.activeSlot].slotYPosition + newScrollDistance;
        if (newPosition > 0) {
            newPosition /= 2;
            newDuration /= 3;
            if (newPosition > this.swSlotWrapper.clientHeight / 4) {
                newPosition = this.swSlotWrapper.clientHeight / 4
            }
        } else {
            if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
                newPosition = (newPosition - this.slotEl[this.activeSlot].slotMaxScroll) / 2 + this.slotEl[this.activeSlot].slotMaxScroll;
                newDuration /= 3;
                if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4) {
                    newPosition = this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4
                }
            } else {
                newPosition = Math.round(newPosition / this.cellHeight) * this.cellHeight
            }
        }
        this.scrollTo(this.activeSlot, Math.round(newPosition), Math.round(newDuration) + "ms");
        return true
    },
    scrollTo: function (slotNum, dest, runtime) {
        this.slotEl[slotNum].style.webkitTransitionDuration = runtime ? runtime : "100ms";
        this.setPosition(slotNum, dest ? dest : 0);
        if (this.slotEl[slotNum].slotYPosition > 0 || this.slotEl[slotNum].slotYPosition < this.slotEl[slotNum].slotMaxScroll) {
            this.slotEl[slotNum].addEventListener("webkitTransitionEnd", this, false)
        }
    },
    scrollToValue: function (slot, value) {
        var yPos, count, i;
        this.slotEl[slot].removeEventListener("webkitTransitionEnd", this, false);
        this.slotEl[slot].style.webkitTransitionDuration = "0";
        count = 0;
        for (i in this.slotData[slot].values) {
            if (i == value) {
                yPos = count * this.cellHeight;
                this.setPosition(slot, yPos);
                break
            }
            count -= 1
        }
    },
    backWithinBoundaries: function (e) {
        e.target.removeEventListener("webkitTransitionEnd", this, false);
        this.scrollTo(e.target.slotPosition, e.target.slotYPosition > 0 ? 0 : e.target.slotMaxScroll, "150ms");
        return false
    },
    tapDown: function (e) {
        e.currentTarget.addEventListener("touchmove", this, false);
        e.currentTarget.addEventListener("touchend", this, false);
        e.currentTarget.className = "sw-pressed"
    },
    tapCancel: function (e) {
        e.currentTarget.removeEventListener("touchmove", this, false);
        e.currentTarget.removeEventListener("touchend", this, false);
        e.currentTarget.className = ""
    },
    tapUp: function (e) {
        this.tapCancel(e);
        
        if(DEVICE_TYPE == DEVICE_IPAD) {
            if (e.currentTarget.id == "sw-wrapper-overlay") {
                this.doneAction();
            }
        } else {
            if (e.currentTarget.id == "sw-cancel") {
                this.cancelAction()
            } else {
                this.doneAction()
            }
        }
        this.close()
    },
    setCancelAction: function (action) {
        this.cancelAction = action
    },
    setDoneAction: function (action) {
        this.doneAction = action
    },
    cancelAction: function () {
        return false
    },
    cancelDone: function () {
        return true
    }
};
