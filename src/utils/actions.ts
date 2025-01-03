/* eslint-disable  @typescript-eslint/no-explicit-any */
import { isBoolean, isNumber, isObject, isString } from 'lodash';

export const formResetDefault = function <T>(data: T | any) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (isObject(data[key])) formResetDefault(data[key]);
      if (key == 'value') {
        if (isString(data[key])) data[key] = '';
        else if (isBoolean(data[key])) data[key] = false;
        else if (isNumber(data[key])) data[key] = 0;
      }
    }
  }
};
