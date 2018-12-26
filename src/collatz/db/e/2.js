if (1) {
  let x_input_1 = __input_var;
  // let __input_val = __input_val; // 常量直接传入
  let x_local_1 = x_input_1 + 2000;
  while (x_local_1 > 1) {
    if (x_local_1 % 2 === 1) {
      x_local_1 = 3 * x_local_1 + 1;
    } else {
      x_local_1 = x_local_1 / 2;
    }
    if ((x_input_1 - x_local_1 > (__input_val - 2)) && x_input_1 + x_local_1 < (__input_val + 2)) {
      __do_action();
    }
  }
}