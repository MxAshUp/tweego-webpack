import registerAlert from './macros/alert';
import registerTitleMatchProperties from './libs/title-match-properties';
import registerHeader from'./components/header';

((Config, State, Story, Engine, Dialog, $document) => {
	// Configure SugarCube settings
	Config.ui.stowBarInitially = true;
	Config.history.controls = false;
	Config.debug = false;
	config.passages.transitionOut = "opacity";

	// Register custom SugarCube macros
	registerAlert(Macro, Dialog);

	// Register plugin modules
	registerTitleMatchProperties(State, Story, $document);

	// Register components
	registerHeader($document);

})(Config, State, Story, Engine, Dialog, $(document));