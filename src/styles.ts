import { cssRule } from 'typestyle';
import { setupPage } from 'csstips';

setupPage('#app');

cssRule('#app', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
