(() => {
  // txt:./es-build.txt
  var es_build_default = ["\u6D4B\u8BD5\u6587\u4EF6", "\u4F60\u597D", "\u63D2\u4EF6", "Hello"];

  // esbuild-test.js
  console.log(es_build_default);
  function hello() {
    console.log("hello esbuild");
  }
  hello();
  var esbuild_test_default = hello;
})();
