/**
* Custom Matchers for QUnit
* 
* @author Sebastian Christ -- sebastian.christ@namics.com
* @version 0.1
*/
(function (global) {
  
  /**
  * Custome test matcher
  * @constructor
  * @param {Object} the object under test (OUT)
  */
  var Matcher = function (out) {
    if (arguments.length === 0) {
      throw "an object is required"
    }
    
    
    this.out = out;
  };    
  
  Matcher.prototype = {
    
    /**
    * Checks if OUT responds to a method
    * @param {String} method - the method name
    */
    respondTo: function(method){
      ok(typeof this.out[method] !== "undefined", "responds to " + method.toString());
    },
    
    /**
    * Checks if a jQuery#text() contains a specific test
    * @param {String} text - the text to match
    * @throws {TypeError} if OUT is not a jQuery object 
    */
    contains: function(text){
      var matchable = new RegExp(text);
      try {
        ok(this.out.text().match(matchable), this.out.selector + " should contain text " + text);
      }
      catch (e) {
        throw e.name + ": Did you provide a jQuery object to assertThat()?";
      }
    },
    
    /**
    * Checks if a DOM Element contains no text
    * @returns {Boolean}
    * @throws {TypeError} if OUT is not a jQuery object
    */
    isEmpty: function(){
      try {
        ok(this.out.text().length === 0, this.out.selector + " contains no text");
      }
      catch (e) {
        throw e.name + ": Did you provide a jQuery object to assertThat()?";
      }
    }
  };
  
  global.assertThat = function (out) {
    return new Matcher(out);
  };
  
})(window);