(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  function showDiv() {
    document.getElementById("payment").style.display = "block";
  }

  function hideDiv() {
    document.getElementById("info").style.display = "none";
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
      });
      fn(data);
      //window.location.replace("payment-form.html");
      hideDiv();
      showDiv();
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
