module.exports = function hw(mod) {
	const msToSet = 1000;
	
	mod.game.me.on('change_zone', event => {
		if (event === 7031) {
			mod.setTimeout(() => {
				mod.command.exec('fps mode 3');
			}, msToSet);
		}
	});
}