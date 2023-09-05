
(function (ns) {

    //#region Private
    /// To check is all class level objects are set
    var isClassInitialized = false;

    //#endregion Private

    //#region Public

    /// Main unit test object
    ns.unitTest = {};
    /// To set default unit test values for video
    ns.unitTest.video = {};
    /// To set default test data for unit test
    // ns.unitTest.testData = {};
    /// Class level objects will set here
    ns.unitTest.initClass = null;
    /// Method level objects will set here
    ns.unitTest.initMethod = null;
    ns.unitTest.runTestSuits = null;
    /// Add a test to run, qunit "test" method will get call with given callback

    ns.unitTest.test = function (title, callback) {
        if ($.isFunction(callback)) {
            ns.unitTest.initTest();
            test(title, callback);
        }
    };

    /// Add an asynchronous test to run. The test must include a call to start(), qunit "test" method will get call with given callback
    ns.unitTest.asyncTest = function (title, callback) {
        if ($.isFunction(callback)) {
            ns.unitTest.initTest();
            asyncTest(title, callback);
        }
    };

    /// initTest will set all Class and Method level objects
    ns.unitTest.initTest = function () {
        if ($.isFunction(ns.unitTest.initMethod))
            ns.unitTest.initMethod();
    };

    /// qunit asserts methods
    ns.unitTest.assert = {

        /// Checks boolean condition, state should be true, defined
        ok: function (state, message) {
            ok(state, message);
        },
        /// The comparison assertion, equals(), expects its first parameter (which is the actual value) is equal to its second parameter
        equal: function (actual, expected, message) {
            equal(actual, expected, message);
        },
        /// Identical assertion, same(), expects the same parameters as equals(), but it's a deep recursive comparison assertion that works not only on primitive types, but also arrays and objects.
        same: function (actual, expected, message) {
            same(actual, expected, message);
        }

    }

    /// Start running tests again after the testrunner was stopped.
    ns.unitTest.start = function (decrement) {
        if (decrement)
            start(decrement);
        else start();
    }

    /// Increase the number of start() calls the testrunner should wait for before continuing.
    ns.unitTest.stop = function (increment) {
        if (increment)
            stop(increment);
        else stop();
    }

    // This will invokes when test page is get called to initialise test case
    ns.unitTest.initTestSuits = function () {
        if (!isClassInitialized && $.isFunction(ns.unitTest.runTestSuits)) {
            ns.unitTest.runTestSuits();
            isClassInitialized = true;
        }
    }
    //#endregion Public

})(window.ViTag ? window.ViTag : {});