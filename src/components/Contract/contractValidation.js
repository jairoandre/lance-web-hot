import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const contractValidator = createValidator({
  'title': [required, maxLength(250)],
  'beginDate': [required],
  'endDate': [required],
  'changeDate': [required],
  'supplier': [required],
  'services': [required]
});
export default memoize(10)(contractValidator);
