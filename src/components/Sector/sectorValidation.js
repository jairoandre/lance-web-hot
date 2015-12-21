import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const sectorValidation = createValidator({
  'name': [required, maxLength(250)],
  'details': [required],
  'area': [required]
});
export default memoize(10)(sectorValidation);
