/**
 * 合唱
 */
fxDefine('chorus', () => {


  __inline('/static/room/modules/chorus/js/block.es6');

  const blockUtil = fxRequire('chorus/block');


  __inline('/static/room/modules/chorus/js/handler.es6');
  __inline('/static/room/modules/chorus/sort/pk.es6');
  const chorusPk = fxRequire('chorus/pk');

  __inline('/static/room/modules/chorus/sort/song.es6');
  const chorusSong = fxRequire('chorus/song');

  const {
    getChorusConfig
  } = fxRequire('chorus/service');
  const { showToast } = fxRequire('chorus/toast');

  let songName = null;

  const {
    EVENT_ID,
  } = fxRequire('chorus/const');

  const DEFAULT_CFG = {
    confirmTimeout: 20,
    endDelayTime: 20
  }

  const Api = {

  }
  return Api
})
