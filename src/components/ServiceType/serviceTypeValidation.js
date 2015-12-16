import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const surveyValidation = createValidator({
  title: [required, maxLength(20)]
});
export default memoize(10)(surveyValidation);
