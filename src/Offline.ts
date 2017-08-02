import { install, applyUpdate } from 'offline-plugin/runtime';

install({
  onUpdating: () => {
    // tslint:disable-next-line no-console
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: () => {
    // tslint:disable-next-line no-console
    console.log('SW Event:', 'onUpdateReady');
    // Tells to new SW to take control immediately
    applyUpdate();
  },
  onUpdated: () => {
    // tslint:disable-next-line no-console
    console.log('SW Event:', 'onUpdated');
    // Reload the webpage to load into the new version
    window.location.reload();
  },

  onUpdateFailed: () => {
    // tslint:disable-next-line no-console
    console.log('SW Event:', 'onUpdateFailed');
  },
});
