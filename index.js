const Vec3 = require('tera-vec3');

module.exports = function hw(mod) {
  const hwCourtLoc = new Vec3(21256, 3655, 6217);
  const msToSet = 1000;
  let myLoc = {},
    checkTimer = null,
    isFpsModeThree = false;

  mod.hook('C_PLAYER_LOCATION', 5, event => { myLoc = event.loc; });
  mod.hook('C_PLAYER_FLYING_LOCATION', 4, event => { myLoc = event.loc; });

  const isHW = () => {
    if (hwCourtLoc.dist2D(myLoc) <= 4000) {
      if (!isFpsModeThree) {
        mod.setTimeout(() => { mod.command.exec('fps mode 3'); }, msToSet);
      }
      isFpsModeThree = true;
    } else {
      if (isFpsModeThree) {
        mod.setTimeout(() => { mod.command.exec('fps mode 0'); }, msToSet);
      }
      isFpsModeThree = false;
    }
  };

  mod.hook('S_LOAD_TOPO', 3, event => {
    myLoc = event.loc;
    if (event.zone === 7031) {
      checkTimer = mod.setInterval(isHW, msToSet);
    } else {
      mod.clearAllIntervals();
	  //TODO config.json with modes 0,1,2,3 (IF fps-utils?) - idk
      if (!mod.manager.isInstalled('fps-manager')) { 
        if (mod.game.me.inOpenWorld) {
          mod.setTimeout(() => { mod.command.exec('fps mode 0'); }, msToSet);
        }
      }
    }
  });
};
