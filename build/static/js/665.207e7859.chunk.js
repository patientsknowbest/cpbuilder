"use strict";(self.webpackChunkformbuilder=self.webpackChunkformbuilder||[]).push([[665],{665:function(e,n,t){t.r(n),t.d(n,{coffeeScript:function(){return b}});var r="error";function o(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var c=/^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/,i=/^(?:[()\[\]{},:`=;]|\.\.?\.?)/,f=/^[_A-Za-z$][_A-Za-z$0-9]*/,a=/^@[_A-Za-z$][_A-Za-z$0-9]*/,p=o(["and","or","not","is","isnt","in","instanceof","typeof"]),u=["for","while","loop","if","unless","else","switch","try","catch","finally","class"],s=o(u.concat(["break","by","continue","debugger","delete","do","in","of","new","return","then","this","@","throw","when","until","extends"]));u=o(u);var l=/^('{3}|\"{3}|['\"])/,d=/^(\/{3}|\/)/,h=o(["Infinity","NaN","undefined","null","true","false","on","off","yes","no"]);function m(e,n){if(e.sol()){null===n.scope.align&&(n.scope.align=!1);var t=n.scope.offset;if(e.eatSpace()){var o=e.indentation();return o>t&&"coffee"==n.scope.type?"indent":o<t?"dedent":null}t>0&&y(e,n)}if(e.eatSpace())return null;var u=e.peek();if(e.match("####"))return e.skipToEnd(),"comment";if(e.match("###"))return n.tokenize=k,n.tokenize(e,n);if("#"===u)return e.skipToEnd(),"comment";if(e.match(/^-?[0-9\.]/,!1)){var m=!1;if(e.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)&&(m=!0),e.match(/^-?\d+\.\d*/)&&(m=!0),e.match(/^-?\.\d+/)&&(m=!0),m)return"."==e.peek()&&e.backUp(1),"number";var g=!1;if(e.match(/^-?0x[0-9a-f]+/i)&&(g=!0),e.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)&&(g=!0),e.match(/^-?0(?![\dx])/i)&&(g=!0),g)return"number"}if(e.match(l))return n.tokenize=v(e.current(),!1,"string"),n.tokenize(e,n);if(e.match(d)){if("/"!=e.current()||e.match(/^.*\//,!1))return n.tokenize=v(e.current(),!0,"string.special"),n.tokenize(e,n);e.backUp(1)}return e.match(c)||e.match(p)?"operator":e.match(i)?"punctuation":e.match(h)?"atom":e.match(a)||n.prop&&e.match(f)?"property":e.match(s)?"keyword":e.match(f)?"variable":(e.next(),r)}function v(e,n,t){return function(r,o){for(;!r.eol();)if(r.eatWhile(/[^'"\/\\]/),r.eat("\\")){if(r.next(),n&&r.eol())return t}else{if(r.match(e))return o.tokenize=m,t;r.eat(/['"\/]/)}return n&&(o.tokenize=m),t}}function k(e,n){for(;!e.eol();){if(e.eatWhile(/[^#]/),e.match("###")){n.tokenize=m;break}e.eatWhile("#")}return"comment"}function g(e,n){for(var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"coffee",r=0,o=!1,c=null,i=n.scope;i;i=i.prev)if("coffee"===i.type||"}"==i.type){r=i.offset+e.indentUnit;break}"coffee"!==t?(o=null,c=e.column()+e.current().length):n.scope.align&&(n.scope.align=!1),n.scope={offset:r,type:t,prev:n.scope,align:o,alignOffset:c}}function y(e,n){if(n.scope.prev){if("coffee"===n.scope.type){for(var t=e.indentation(),r=!1,o=n.scope;o;o=o.prev)if(t===o.offset){r=!0;break}if(!r)return!0;for(;n.scope.prev&&n.scope.offset!==t;)n.scope=n.scope.prev;return!1}return n.scope=n.scope.prev,!1}}var b={startState:function(){return{tokenize:m,scope:{offset:0,type:"coffee",prev:null,align:!1},prop:!1,dedent:0}},token:function(e,n){var t=null===n.scope.align&&n.scope;t&&e.sol()&&(t.align=!1);var o=function(e,n){var t=n.tokenize(e,n),o=e.current();"return"===o&&(n.dedent=!0),(("->"===o||"=>"===o)&&e.eol()||"indent"===t)&&g(e,n);var c="[({".indexOf(o);if(-1!==c&&g(e,n,"])}".slice(c,c+1)),u.exec(o)&&g(e,n),"then"==o&&y(e,n),"dedent"===t&&y(e,n))return r;if(-1!==(c="])}".indexOf(o))){for(;"coffee"==n.scope.type&&n.scope.prev;)n.scope=n.scope.prev;n.scope.type==o&&(n.scope=n.scope.prev)}return n.dedent&&e.eol()&&("coffee"==n.scope.type&&n.scope.prev&&(n.scope=n.scope.prev),n.dedent=!1),"indent"==t||"dedent"==t?null:t}(e,n);return o&&"comment"!=o&&(t&&(t.align=!0),n.prop="punctuation"==o&&"."==e.current()),o},indent:function(e,n){if(e.tokenize!=m)return 0;var t=e.scope,r=n&&"])}".indexOf(n.charAt(0))>-1;if(r)for(;"coffee"==t.type&&t.prev;)t=t.prev;var o=r&&t.type===n.charAt(0);return t.align?t.alignOffset-(o?1:0):(o?t.prev:t).offset},languageData:{commentTokens:{line:"#"}}}}}]);
//# sourceMappingURL=665.207e7859.chunk.js.map