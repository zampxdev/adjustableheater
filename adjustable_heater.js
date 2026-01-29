// Adjustable Heater Mod for Sandboxels
// Heats nearby pixels up to a user-specified target temperature (but not above)

elements.adjustable_heater = {
    name: "Adjustable Heater",
    desc: "Heats nearby elements up to a set temperature. Prompts for target temperature when placed.",
    color: "#cc3311",
    category: "machines",
    behavior: behaviors.WALL,
    state: "solid",
    insulate: true,
    hardness: 1,
    
    properties: {
        targetTemp: null
    },
    
    tick: function(pixel) {
        if (pixel.targetTemp === null) {
            var input = prompt("Enter target temperature (\u00B0C) for this heater:", "100");
            if (input === null || input === "") {
                pixel.targetTemp = 100;
            } else {
                pixel.targetTemp = parseFloat(input);
            }
        }
        
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            
            if (!isEmpty(x, y, true) && !outOfBounds(x, y)) {
                var neighbor = pixelMap[x][y];
                if (neighbor && neighbor.element !== "adjustable_heater") {
                    if (neighbor.temp < pixel.targetTemp) {
                        var heatAmount = Math.min(2, pixel.targetTemp - neighbor.temp);
                        neighbor.temp += heatAmount;
                    }
                }
            }
        }
    },
    
    hoverStat: function(pixel) {
        if (pixel.targetTemp === null) {
            return "Target: not set";
        }
        return "Target: " + pixel.targetTemp + "\u00B0C";
    }
};
