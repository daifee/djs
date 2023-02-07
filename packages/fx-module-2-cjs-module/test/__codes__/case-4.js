// Component as a service

(() => {

  const LOAD_MODE = {
    // 自动加载
    auto: 1,
    // 用户触发加载
    tigger: 2,
    // 未知
    none: 0
  };

  // caas 接口响应的模块
  let caaSComps;

  window.FxCaaS = window.FxCaaS || {};
  // 根据组件名获取组件的依赖
  window.FxCaaS.get = (name, callback) => {
    return getCaaSComp(name, callback);
  };
  // 根据组件名加载组件
  window.FxCaaS.load = (name, callback) => {
    getCaaSComp(name, json => {
      if (json && json.js) {
        fxRequire.async(json.js, callback);
      }
    });
  };

  function getCaaSComp(name, callback) {
    if (caaSComps && caaSComps.comps) {
      return callback(caaSComps.comps[name]);
    }
    fetchService(json => {
      if (json && json.comps) {
        return callback(json.comps[name]);
      }
      callback();
    });
  }

  function fetchService(callback) {
    window.FxAjax({
      url: `${ServiceHost.backup1ServiceUrl}/gw/api/v1/c/n/caas/component/pc_web/room.json`,
      dataType: 'json',
      success: data => {
        if (data && data.code === 0) {
          callback(data.data);
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  /**
   * 获取用户酷狗ID
   *
   * @returns {string} kgId 酷狗ID
   */
  function getKgId() {
    return '0';
  }

  /**
   * 灰度规则
   *
   * @param {string} id 灰度样本
   * @param {array} scope 灰度范围
   * @param {number} type 1按尾号灰度，2按值灰度
   * @returns {boolean} hit true表示命中灰度，false表示未命中
   */
  function canaryBy(id, scope, type) {
    let hit = true;
    const sample = id.toString();
    // 按尾号灰度
    if (type === 1) {
      if (scope.length === 1) {
        scope.push(scope[0]);
      }
      const suffix = parseInt(sample.substr(sample.length - 2), 10);
      const min = parseInt(scope[0], 10);
      const max = parseInt(scope[1], 10);
      // 尾号未命中
      if (suffix < min || suffix > max) {
        hit = false;
      }

      return hit;
    }

    // 按数值灰度
    if (scope.indexOf(sample) === -1) {
      hit = false;
    }

    return hit;
  }

  /**
   * 按房间号（不支持靓号）灰度，支持按值/尾号灰度
   * 0-50 灰度房间号为 00 至 50 的房间
   * 1000000|22 灰度多个房间，不支持靓号
   *
   * @param {Object} item CaaS 实例
   * @returns {boolean} hit 是否命中灰度
   */
  function canaryByRoomId(item) {
    const roomId = window.liveInitData.roomId;
    if (!item.canary_room) {
      return true;
    }
    // 按尾号灰度
    if (item.canary_room.indexOf('-') !== -1) {
      return canaryBy(roomId, item.canary_room.split('-'), 1);
    }

    return canaryBy(roomId, item.canary_room.split('|'), 2);
  }

  /**
   * 按酷狗ID灰度，支持按值/尾号灰度
   * 0-50 灰度房间号为 00 至 50 的房间
   * 1234|12333 灰度多个房间
   *
   * @param {Object} item CaaS 实例
   * @returns {boolean} hit 是否命中灰度
   */
  function canaryByKgId(item) {
    return canaryBy(kgId, item.canary_kgid.split('|'), 2);
  }

  /**
   * 按用户角色灰度，0所有用户，1非主播，2主播
   *
   * @param {Object} item CaaS 实例
   */
  function canaryByRole(item) {
    let hit = true;

    return hit;
  }



  function init() {
    fetchService(json => {
      caaSComps = json;
      if (!json || !json.comps) {
        return;
      }

      let scripts = [];
      for (let comp in json.comps) {
        const item = json.comps[comp];
        if (item.load === LOAD_MODE.auto) {
          let hit = true;
          try {
            hit = canaryByRoomId(item) && canaryByKgId(item) && canaryByRole(item);
          } catch (e) { }

          if (hit) {
            scripts = scripts.concat(item.js);
          }
        }
      }

      fxRequire.async(json.base, () => {
        fxRequire.async(scripts);
      });
    });
  }

  init();
})();
