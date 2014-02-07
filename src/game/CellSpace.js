require.config({
   // baseUrl: 'js/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'libs/jquery	'
    }
});

require(["jquery", "Utils", "CellSpaceResources", "EvoCell"], 
	function($, utils, resources, EC) {
		var loader = new utils.ResLoader();
		loader.load("enemy", "rules/moore4_wave");
		loader.load("ship", "rules/moore4_wave");
		loader.load("vsTestPalette", "src/shaders/primitivePalette.shader", "text");
		loader.start(function (data) {
			// Setup core and rules and texture
			var enemyFile = new EC.ECFile(data.enemy);

			var context = document.getElementById('c');
			var reactor = new  EC.Reactor(context);
		
			var paintShader = reactor.compileShader(data.vsTestPalette);
			var enemyRule = reactor.compileRule(enemyFile);
			var enemyDish = reactor.compileDish(100, 100);
			enemyDish.randomize(enemyRule.nrStates, 0.2);
			reactor.paint(paintShader, dish);
		});
		
		
		//
	});

// RulesTexture and Dishes brauchen gemeinsames Basisobjekt das eine Textur zurueckgibt, RuleTexture ist auch ein shader

// public interface
/*
EvoCell.CellSpace = function(document)
{
	var context = document.getElementById('c');
	this.reactor = EvoCell.Reactor(context);


	// load rules
	var shipRule = 
	
	

}

EvoCell.CellSpace.prototype.step = function()
{
	
}
*/