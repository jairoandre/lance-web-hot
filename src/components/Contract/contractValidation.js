import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const contractValidator = createValidator({
  'title': [required, maxLength(250)],
  'beginDate': [required],
  'finalDate': [required],
  'changeDate': [required],
  'supplier.id': [required],
  'services': [required]
});
export default memoize(10)(contractValidator);
