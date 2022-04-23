import { Spinner } from '../index';

import descriptionMd from './SpinnerDescription.md';
import bestPracticesMd from './SpinnerBestPractices.md';

export { Default } from './SpinnerDefault.stories';
export { Appearance } from './SpinnerAppearance.stories';
export { Labels } from './SpinnerLabel.stories';
export { Size } from './SpinnerSize.stories';

export default {
  title: 'Preview Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
