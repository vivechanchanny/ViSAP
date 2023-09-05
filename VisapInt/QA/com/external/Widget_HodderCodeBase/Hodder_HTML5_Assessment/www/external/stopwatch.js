/**
 * @author neeraj.sejwal
 */
/** ******************************************************************** */
function Stopwatch(obj) {
	this.callback = obj.updateHandler || function(str) {
		console.log(str)
	}
	this.reset(obj);
};
/** ******************************************************************** */
Stopwatch.prototype.start = function(resume) {
	if (!resume) {
		this.startTime = 0;
		this.curTime = 0;
	}

	if (this.timer) {
		this.stop();
	}
	this.timer = setInterval(this._updateTime, 1000, this);
}
/** ******************************************************************** */
Stopwatch.prototype.resume = function() {
	this.start(true)
}
/** ******************************************************************** */
Stopwatch.prototype.stop = function() {
	clearInterval(this.timer);
}
/** ******************************************************************** */
Stopwatch.prototype.reset = function(obj) {
	this.stop();

	this.startTime = 0;
	this.endTime = 0;
	this.timer = 0;
	this.startTime = 0;

	if (obj.startTime) {
		this.curTime = obj.startTime;
		this.start(true);
	} else {
		this.curTime = 0;
		this.start();
	}
}
/** ******************************************************************** */
Stopwatch.prototype._updateTime = function(obj) {
	obj.curTime++;
	obj.callback(obj.getTime());
}
/** ******************************************************************** */
Stopwatch.prototype.getHours = function() {
	var timeSpent = this.curTime - this.startTime;
	var hours = Math.floor(timeSpent / 3600);
	return hours;
}
/** ******************************************************************** */
Stopwatch.prototype.getMins = function() {
	var timeSpent = this.curTime - this.startTime;
	var mins = Math.floor(timeSpent % 3600 / 60);
	return mins;
}
/** ******************************************************************** */
Stopwatch.prototype.getSecs = function() {
	var timeSpent = this.curTime - this.startTime;
	var secs = Math.floor(timeSpent % 60);
	return secs;
}
/** ******************************************************************** */
Stopwatch.prototype.getRawTime = function() {
	var rawtime = this.curTime - this.startTime;
	return rawtime;
}
/** ******************************************************************** */
Stopwatch.prototype.getTime = function() {
	var hours = this.getHours();
	var mins = this.getMins();
	var secs = this.getSecs();

	hours = (mins <= 9) ? "0" + hours : hours;
	mins = (mins <= 9) ? "0" + mins : mins;
	secs = (secs <= 9) ? "0" + secs : secs;

	var timeString = hours + ":" + mins + ":" + secs;

	return timeString;
}
/** ******************************************************************** */
Stopwatch.prototype.destroy = function() {
	this.stop();
	delete this;
}