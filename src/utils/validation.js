const isEmpty = value => value === undefined || value === null || value === '' || value.length === 0;
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Email inválido';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Requerido';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Deve possuir pelo menos ${min} caracteres`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Não pode possuir mais que ${max} caracteres`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Deve ser um número inteiro';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Deve ser um desses valores: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Diferentes';
      }
    }
  };
}

// TODO: Melhorar o deep validation
export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const splitedKeys = key.split('.');
      if (splitedKeys.length === 1) {
        const error = rule(data[key], data);
        if (error) {
          errors[key] = error;
        }
      } else if (splitedKeys.length === 2) {
        const error = rule(data[splitedKeys[0]][splitedKeys[1]], data);
        if (error) {
          errors[splitedKeys[0]] = [];
          errors[splitedKeys[0]][splitedKeys[1]] = error;
        }
      }
    });
    return errors;
  };
}
