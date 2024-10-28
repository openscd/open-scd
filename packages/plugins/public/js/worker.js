importScripts('xmlvalidate.js');

onmessage = function(e) {
  Module.ready.then(function(mod) {
    if (e.data.name.toLowerCase().endsWith('.xsd'))
      mod.init(e.data.content, e.data.name);
    else mod.validate(e.data.content, e.data.name);
  });
};
