/**
 * @license LoaderJS Copyright Vaughan Kitchen
 * RegEx taken from RequireJS
 * Released under MIT license, https://github.com/vkitchen/loader/blob/master/LICENSE
 */
 
 
var require, define;
(function () {
  var props = {
    baseUrl: '',
    jsSuffixRegEx: /\.js$/,
    requireRegEx: /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    commentRegEx: /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg
  };
  
  var state = {
    defined: {}, // begin loading
    loaded: {},  // loading finished
    defQueue: [] // callbacks
  };
  
  function each(a, fn) {
    if (!a)
      return;
      
    for (var i = 0; i < a.length; i++)
      if (a[i] && fn(a[i], i, a))
        break;
  }
  
  
  function eachReverse(a, fn) {
    if (!a)
      return;
    
    for (var i = a.length - 1; i > -1; i--)
      if (a[i] && fn(a[i], i, a))
        break;
  }
  
  
  function commentReplace(match, singlePrefix) {
    return singlePrefix || '';
  }
  
  
  function onScriptLoad(event) {
    var node = event.currentTarget || event.srcElement;
    var name = node.getAttribute('data-requiremodule');
    
    node.removeEventListener('load', onScriptLoad, false);
    node.removeEventListener('error', onScriptError, false);
    
    // give the last requested item its name
    state.defQueue[state.defQueue.length - 1][0] = name;
    
    var fns = {};
    function exports() {
      for (var i = 0; i < arguments.length; i++)
        fns[arguments[i].name] = arguments[i];
        
      state.loaded[name] = fns;
    }
    
    var i = state.defQueue.length;
    while (i--) {
      name = state.defQueue[i][0];
      var deps = state.defQueue[i][1];
      var callback = state.defQueue[i][2];
      
      var isReady = true;
      for (var j = 0; j < deps.length; j++)
        if (!state.loaded[deps[j]])
          isReady = false;
      
      if (isReady) {
        fns = {};
        
        state.loaded[name] = true;
        callback(require, exports);
        
        state.defQueue.splice(i, 1);
      }
    }
  }
  
  
  function onScriptError(event) {
    throw new Error("Critical error");
  }
  
  
  function load(name) {
     if (state.defined[name])
       return;
     
     var node = document.createElement('script');
     node.src = props.baseUrl + name + '.js';
     node.type = 'text/javascript';
     node.async = true;
     
     node.addEventListener('load', onScriptLoad, false);
     node.addEventListener('error', onScriptError, false);
     
     node.setAttribute('data-requiremodule', name);
     
     document.getElementsByTagName('head')[0].appendChild(node);
  }
  
  
  require = function(name) {
    if (state.loaded[name])
      return state.loaded[name];
    else
      throw new Error("Module '" + name + "' failed to load");
  };
  
  
  define = function(callback) {
    var deps = [];
    
    callback
      .toString()
      .replace(props.commentRegEx, commentReplace)
      .replace(props.requireRegEx, function (_, dep) {
        deps.push(dep);
      });
    
    for (var i = 0; i < deps.length; i++)
      load(deps[i]);
    
    // onScriptLoad will be called after us (and know our name)
    // wait for then to run the callback
    state.defQueue.push(['', deps, callback]);
  };
  
  
  function init() {
    var scripts = document.getElementsByTagName('script');
    eachReverse(scripts, function(script) {
      var main = script.getAttribute('data-main');
      if (!main)
        return;
      
      var src = main.split('/');
      main = src.pop();
      props.baseUrl = src.length ? src.join('/') + '/' : './';
      
      main = main.replace(props.jsSuffixRegEx, '');
      load(main);
      
      return true;
    });
  }
  init();
  
  
}());
