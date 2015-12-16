import memoize from 'lru-memoize';
import {createValidator, required, deepRequired, maxLength} from 'utils/validation';

const serviceValidation = createValidator({
  title: [required, maxLength(20)],
  defaultHistory: [required],
  documentType: [required],
  ledgerAccount: [required],
  resultAccount: [required],
  costAccount: [required],
  serviceType: [deepRequired('id')]
});
export default memoize(10)(serviceValidation);
