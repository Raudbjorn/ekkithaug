var code = '(' + function() {

    var corrections = {
      "þaug" : "þau",
      "eitthver" : "einhver",
      "talva" : "tölva",
      "hlægja" : "hlæja",
      "augabrýr" : "augabrúnir",
      "fjastering" : "fjarstýring",
      "af gefnu tilefni" : "að gefnu tilefni",
      "frosna" : "frjósa",
      "nóg og" : "nógu"
      };

    String.prototype.capitalizeFirstLetter = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };

    function textNodesUnder(el){
      var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
      while(n=walk.nextNode()) a.push(n);
      return a;
    };

    function correctTree(){
        var nodes = textNodesUnder(document);
        for(var i = 0; i <= nodes.length - 1; i++){
          if( nodes[i].nodeType == 3){
              for(var key in corrections){
                nodes[i].data = nodes[i].data.replace(key, corrections[key]);
                nodes[i].data = nodes[i].data.replace(key.capitalizeFirstLetter(), corrections[key].capitalizeFirstLetter());
              }
              nodes[i].data = nodes[i].data.replace(/\!+/g, "!");
              nodes[i].data = nodes[i].data.replace(/\?+/g, "?");
          }
       }
    }

    document.body.addEventListener("DOMNodeInserted", function(ev){
      correctTree();
    });

    correctTree();

  } + ')();';


var script = document.createElement('script');
script.textContent = code;
document.body.appendChild(script);
script.parentNode.removeChild(script);
