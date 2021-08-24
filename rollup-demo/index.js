import { A, B } from 'a'
import pkg from './package.json'
import React from 'react'
import { say } from './test'
import url from './logo.png'
console.log(pkg, __TEST__, url);

say();

A();
B();
console.log("Hello Rollup", React.useEffect());

export const x = 100;