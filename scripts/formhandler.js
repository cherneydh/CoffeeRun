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

  function myModal(f) {
    var form = f,
      modal = $("<div/>", {
        "id": "alert",
        "html": "<iframe src=\"url\"></iframe>"
      })
        .dialog({
          "title": "Iframe in a modal window",
          "modal": true,
          "width": 350,
          "height": "auto",
          "buttons": {
            "OK": function() {
              $(this).dialog("close");
            // do something, maybe call form.submit();
            }
          }
        });
    return false;
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      //window.location.replace("payment-form.html");
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
