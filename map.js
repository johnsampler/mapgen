const mapSize = 30;
const mapElement = document.getElementById('map');

function generateMap() {
    let map = Array.from({ length: mapSize }, () => Array(mapSize).fill(0));

    // Randomly initialize the map
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            map[x][y] = Math.random() > 0.5 ? 1 : 0; // 1 = land, 0 = water
        }
    }

    // Cellular automata rules
    for (let i = 0; i < 5; i++) { // Number of iterations
        const newMap = map.map(row => row.slice());
        for (let x = 0; x < mapSize; x++) {
            for (let y = 0; y < mapSize; y++) {
                const landNeighbors = countLandNeighbors(map, x, y);
                if (map[x][y] === 1) {
                    newMap[x][y] = landNeighbors < 4 ? 0 : 1;
                } else {
                    newMap[x][y] = landNeighbors > 4 ? 1 : 0;
                }
            }
        }
        map = newMap;
    }

    drawMap(map);
}

function countLandNeighbors(map, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nx = x + i;
            const ny = y + j;
            if (nx >= 0 && ny >= 0 && nx < mapSize && ny < mapSize) {
                count += map[nx][ny];
            }
        }
    }
    return count;
}

function drawMap(map) {
    mapElement.innerHTML = '';
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            const tile = document.createElement('div');
            tile.className = 'tile ' + (map[x][y] === 1 ? 'grass' : 'water');
            mapElement.appendChild(tile);
        }
    }
}

// Generate initial map
generateMap();
