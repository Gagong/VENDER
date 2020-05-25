window.GlobalSettings = new GlobalSettings();
let api;

$(document).ready(function () {
    window.api = new Api();
    api = window.api;

    let preloader = $("#preloader").attr("wmode", "opaque");
    $("#preloader").remove();
    preloader.appendTo($("#container"));
    window.settings = new Settings();
    window.initialized = false;
    window.debug = false;
    window.tickTime = window.GlobalSettings.timerTick;

    window.fightPresetsManager = new FightPresetsManager(new MixerFightPreset());

    let hm = new HandlersManager(api);
    hm.registerCommand(AssetCreatedHandler.ID, new AssetCreatedHandler());
    hm.registerCommand(GateInitHandler.ID, new GateInitHandler());
    hm.registerCommand(HeroDiedHandler.ID, new HeroDiedHandler());
    hm.registerCommand(HeroInitHandler.ID, new HeroInitHandler(init));
    hm.registerCommand(HeroUpdateHitpointsHandler.ID, new HeroUpdateHitpointsHandler());
    hm.registerCommand(ShipAttackHandler.ID, new ShipAttackHandler());
    hm.registerCommand(ShipCreateHandler.ID, new ShipCreateHandler());
    hm.registerCommand(ShipDestroyedHandler.ID, new ShipDestroyedHandler());
    hm.registerCommand(ShipMoveHandler.ID, new ShipMoveHandler());
    hm.registerCommand(ShipRemovedHandler.ID, new ShipRemovedHandler());
    hm.registerCommand(ShipSelectedHandler.ID, new ShipSelectedHandler());
    hm.registerEvent("updateHeroPos", new HeroPositionUpdateEventHandler());
    hm.registerEvent("ammoUpdate", new AmmoUpdateEventHandler());
    hm.listen();

    window.keyManager = new KeyEventsManager();
    window.keyManager.registerAction(EnemyAutoLockAction.NAME, new EnemyAutoLockAction());
    window.keyManager.registerAction(NpcAutoLockAction.NAME, new NpcAutoLockAction());

    hm.registerEvent("keydown", new KeyDownEventHandler());
});

function init() {
    Injector.injectScriptFromResource("JavaScripts/Injectables/HeroPositionUpdater.js");
    createUI();
    window.setInterval(logic, window.tickTime);
}

function logic() {
    minimap.draw();
}

function createUI(){
    window.minimap = new Minimap(api);
    window.minimap.createWindow();

    window.attackWindow = new AttackWindow();
    window.attackWindow.createWindow();

    window.autolockWindow = new AutolockWindow();
    window.autolockWindow.createWindow();
}