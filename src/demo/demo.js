function do_m (a) {
  document.write('<p>'+a + ' passed!'+'</p>');
}
const x = parseInt('29') + 1;
const y = 30;

if (x <= 40) {
  do_m('x <= 40');
}
if (x < 50) {
  do_m('x < 50');
}
if (50 > x) {
  do_m('50 > x');
}

if (x >= 20) {
  do_m('x >= 20');
}

if (x > 10) {
  do_m('x > 10');
}

if (x === 30) {
  do_m('x === 30');
}
if (x + 1 - 1 === 30) {
  do_m('x + 1 - 1 === 30');
}
if (30 === x) {
  do_m('30 === x');
}
if (30 === x + 1 - 1) {
  do_m('30 === x + 1 - 1');
}
if (x === y) {
  do_m('x === y');
}
if (y === x) {
  do_m('y === x');
}
if (x + 1 - 1 === y) {
  do_m('x + 1 - 1 === y');
}
if (y === x + 1 - 1) {
  do_m('y === x + 1 - 1');
}

// if (test_func() === 1) {
//   do_m('test_func() === 1');
// }
// if (2 === test_func()) {
//   do_m('2 === test_func()');
// }
