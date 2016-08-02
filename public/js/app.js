var battle = battle || {};

// Self-executing wrapper
(function($) {
  "use strict";


  battle.app = {
    
    init: function() {
      console.log("Initializing battlekitten ...");
      battle.app.attachHandlers();
    },


    attachHandlers: function() {
      $('#addpagebtn').bind('click', battle.handlers.addPage);
     // alert();
     // $('#addpageform').submit(battle.handlers.addPage);
     // $('#addpageform').bind('submit', battle.handlers.addPage);
      
      $('#previewbtn').bind('click', battle.handlers.convertMarkdown);
      $('#encryptedtext').bind('input propertychange', battle.handlers.convertMarkdown);
      
      $('#decryptbtn').bind('click', battle.handlers.decryptPage);
    }

  }




})($);