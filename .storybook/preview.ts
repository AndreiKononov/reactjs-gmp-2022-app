import { RouterContext } from 'next/dist/shared/lib/router-context';
import '!style-loader!css-loader!sass-loader!../src/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
