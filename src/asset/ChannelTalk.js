class ChannelTalk {
  constructor() {
    this.loadScript();
  }

  // eslint-disable-next-line class-methods-use-this
  loadScript() {
    // eslint-disable-next-line func-names, consistent-return
    (function () {
      const w = window;
      if (w.ChannelIO) {
        return w.console.error('ChannelIO script included twice.');
      }
      const ch = function () {
        // eslint-disable-next-line prefer-rest-params
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        const x = document.getElementsByTagName('script')[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === 'complete') {
        l();
      } else {
        w.addEventListener('DOMContentLoaded', l);
        w.addEventListener('load', l);
      }
    })();
  }

  // eslint-disable-next-line class-methods-use-this
  boot(option, callback) {
    window.ChannelIO('boot', option, callback);
  }

  // eslint-disable-next-line class-methods-use-this
  shutdown() {
    window.ChannelIO('shutdown');
  }

  // eslint-disable-next-line class-methods-use-this
  showMessenger() {
    window.ChannelIO('showMessenger');
  }

  // eslint-disable-next-line class-methods-use-this
  hideMessenger() {
    window.ChannelIO('hideMessenger');
  }

  // eslint-disable-next-line class-methods-use-this
  openChat(chatId, message) {
    window.ChannelIO('openChat', chatId, message);
  }

  // eslint-disable-next-line class-methods-use-this
  track(eventName, eventProperty) {
    window.ChannelIO('track', eventName, eventProperty);
  }

  // eslint-disable-next-line class-methods-use-this
  onShowMessenger(callback) {
    window.ChannelIO('onShowMessenger', callback);
  }

  // eslint-disable-next-line class-methods-use-this
  onHideMessenger(callback) {
    window.ChannelIO('onHideMessenger', callback);
  }

  // eslint-disable-next-line class-methods-use-this
  onBadgeChanged(callback) {
    window.ChannelIO('onBadgeChanged', callback);
  }

  // eslint-disable-next-line class-methods-use-this
  onChatCreated(callback) {
    window.ChannelIO('onChatCreated', callback);
  }

  // eslint-disable-next-line class-methods-use-this
  onFollowUpChanged(callback) {
    window.ChannelIO('onFollowUpChanged', callback);
  }

  // eslint-disable-next-line class-methods-use-this
  onUrlClicked(callback) {
    window.ChannelIO('onUrlClicked', callback);
  }

  // eslint-disable-next-line class-methods-use-this
  clearCallbacks() {
    window.ChannelIO('clearCallbacks');
  }

  // eslint-disable-next-line class-methods-use-this
  updateUser(userInfo, callback) {
    window.ChannelIO('updateUser', userInfo, callback);
  }

  // eslint-disable-next-line class-methods-use-this
  addTags(tags, callback) {
    window.ChannelIO('addTags', tags, callback);
  }

  // eslint-disable-next-line class-methods-use-this
  removeTags(tags, callback) {
    window.ChannelIO('removeTags', tags, callback);
  }

  // eslint-disable-next-line class-methods-use-this
  setPage(page) {
    window.ChannelIO('setPage', page);
  }

  // eslint-disable-next-line class-methods-use-this
  resetPage() {
    window.ChannelIO('resetPage');
  }

  // eslint-disable-next-line class-methods-use-this
  showChannelButton() {
    window.ChannelIO('showChannelButton');
  }

  // eslint-disable-next-line class-methods-use-this
  hideChannelButton() {
    window.ChannelIO('hideChannelButton');
  }

  // eslint-disable-next-line class-methods-use-this
  setAppearance(appearance) {
    window.ChannelIO('setAppearance', appearance);
  }
}

export default new ChannelTalk();
