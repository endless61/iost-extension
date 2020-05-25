
import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import Notification from 'rc-notification'
import classnames from 'classnames'
import './index.scss'

const prefixCls = 'toast'

let messageInstance

function getMessageInstance(cb) {
  Notification.newInstance({
    prefixCls,
    style: { top: 0 },
    transitionName: 'fade',
  }, (n) => {
    messageInstance = n;
    cb(messageInstance)
  });
}

function notice(content, type, duration = 1, onClose) {
  // const iconType = ({
  //   // info: '',
  //   success: require('./assets/success.png'),
  //   fail: require('./assets/fail.svg'),
  //   offline: require('./assets/dislike.svg'),
  //   loading: 'loading',
  // })[type]
  if (typeof duration === 'function') {
    onClose = duration;
    duration = 3
  }
  getMessageInstance((instance) => {
    instance.notice({
      duration,
      style: {
        top: /toast/.test(type) ? 200 : 100,
      },
      content: (
        <div className={classnames('toast-text', type)}>
          {/* {type === 'fail' ? <i className="icon-setting" onClick={onSetting} /> : ''} */}
          {/* <div className={`icon-${type}`} /> */}
          <div className="icon-fail-toast" />
          {/toast/.test(type) ? <div>{content}</div> : <div>{I18n.t(`${content}`)}</div>}
        </div>
      ),
      closable: !/toast/.test(type),
      onClose: () => {
        if (onClose) {
          onClose();
        }
        instance.destroy();
        instance = null;
        messageInstance = null;
      },
    });
  });
}

export default{
  SHORT: 3,
  LONG: 8,
  show(content, duration) {
    return notice(content, 'info', duration, () => {});
  },
  info(content, duration, onClose) {
    return notice(content, 'info', duration, onClose);
  },
  success(content, duration, onClose) {
    return notice(content, 'success', duration, onClose);
  },
  fail(content, duration, onClose) {
    return notice(content, 'fail', duration, onClose);
  },
  offline(content, duration, onClose) {
    return notice(content, 'offline', duration, onClose);
  },
  loading(content, duration, onClose) {
    return notice(content, 'loading', duration, onClose);
  },
  html(content, duration, onClose) {
    return notice(content, 'html', duration, onClose);
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
  failIcon(content, duration, onClose) {
    return notice(content, 'fail-toast', duration, onClose);
  },
}
