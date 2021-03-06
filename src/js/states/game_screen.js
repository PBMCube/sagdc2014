//main game screen that the various scenes will inherit

var Player = require('../entities/player');
var ClickableMaker = require('../entities/clickable_maker');
var CursorText = require('../entities/cursor_text');

var GameScreen = function() {
    this.player = null;
};

GameScreen.prototype = {
    initScreen: function() {
        this.points = this.extractPointsFromTileMapLayer(this.map.objects.points);
        this.clickables = this.extractClickablesFromTileMapLayer(this.map.objects.clickables);

        this.cursorText = new CursorText(this.game);

        if(playerState.spawnPoint && this.points[playerState.spawnPoint]) {
            var point = this.points[playerState.spawnPoint];
            var x = point.x;
            var y = point.y;
        } else {
            var x = (this.game.width / 2);
            var y = (this.game.height / 2) + 150;
        }
        this.player = new Player(this.game, x, y);

        this.input.onDown.add(this.clickClickables, this);
    },

    update: function () {
    },

    clickClickables: function(cursor) {
        for(i in this.clickables) {
            var clickable = this.clickables[i];
            if(clickable.includesPoint(cursor.x, cursor.y)) {
                clickable.click(cursor, this);
            }
        }
    },

    extractPointsFromTileMapLayer: function(layer) {
        var points = {};
        for(i in layer) {
            point = layer[i];
            points[point.name] = point;
        }
        return points;
    },

    extractClickablesFromTileMapLayer: function(layer) {
        var clickables = {};
        for(i in layer) {
            var clickable = ClickableMaker.create(this.game, layer[i]);
            if(clickable) { clickables[clickable.name] = clickable; }
        }
        return clickables;
    },

    update: function() {
        for(i in this.clickables) {
            var clickable = this.clickables[i];
            
            checkClickableHover(clickable, this.game.input.mousePointer, this.cursorText);
        }
    }
};

var checkClickableHover = function(clickable, cursor, cursorText) {
    if(clickable.hoverText && clickable.includesPoint(cursor.x, cursor.y)) {
        cursorText.startMessage(clickable.hoverText); 
    }
};

module.exports = GameScreen;
