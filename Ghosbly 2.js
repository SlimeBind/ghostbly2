/*
@title: Ghostbly 2
@author: SlimeBind
@tags: [rpg]
@addedOn: 2024-00-00
*/

const player = "z"
const enemy = "x"
const attackr = "1"
const floor1 = "q"
const floor2 = "w"
const floor3 = "e"
const wall1 = "a"
const bar1 = "p"
const bar2 = "o"
let battle = false
let MovementEnabled = true;
let FightEnabled = false;
let previouslevel
let option = 0

let playerstats = [
  5, //health
  1  //damage
]; 

let enemystats = [
  5, //health
  1  //damage
]

setLegend(
  [player, bitmap`
................
................
................
.......000......
......02220.....
.....0222220....
....002222200...
...0022020220...
..0C022020220...
..0C022222220...
..0C022222220...
..00020202020...
.....0.0.0.0....
.....0.....0....
....00.....00...
................`],
  [enemy, bitmap`
................
................
................
................
................
................
.....000000.....
....03333330....
...0999933330...
..099999993330..
..099999999930..
.09999999999330.
.09999999999930.
.09999999999930.
..000000000000..
................`],
  [attackr, bitmap`
................
................
.......33.......
.......933......
.........93.....
..........3.....
..........3.....
..........3.....
..........3.....
.........93.....
.........93.....
.........93.....
........933.....
.......33.......
.......3........
................`],
  [floor1, bitmap`
4444444444444444
4444444444444444
44444444444DD444
4444DD4444D4D444
444D4D444DD44D44
44D44DDDD4444D44
4444444444444444
4444444444444444
4444444444444444
4444444444444444
444444444D444444
4444D444D4D44444
444DDD4D4D444D44
4DD44DD444DDD4D4
4444444444444444
4444444444444444`],
  [floor2, bitmap`
6666666666666666
6666666666666666
66666666666FF666
6666FF6666F6F666
666F6F666FF66F66
66F66FFFF6666F66
6666666666666666
6666666666666666
6666666666666666
6666666666666666
666666666F666666
6666F666F6F66666
666FFF6F6F666F66
6FF66FF666FFF6F6
6666666666666666
6666666666666666`],
  [floor3, bitmap`
8888888888888888
8888888888888888
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
88HHHHHHHHHHHH88
8888888888888888
8888888888888888`],
  [wall1, bitmap`
CCC1CCCCCCCC1CCC
CCC1CCCCCCCC1CCC
CCC1CCCCCCCC1CCC
1111111111111111
CCCCCCC1CCCCCCCC
CCCCCCC1CCCCCCCC
CCCCCCC1CCCCCCCC
1111111111111111
CCC1CCCCCCCC1CCC
CCC1CCCCCCCC1CCC
CCC1CCCCCCCC1CCC
1111111111111111
CCCCCCCC1CCCCCCC
CCCCCCCC1CCCCCCC
CCCCCCCC1CCCCCCC
1111111111111111`],
  [bar1, bitmap`
0000000000000000
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
0000000000000000`],
  [bar2, bitmap`
0000000000000000
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000`]
)

setSolids([player, wall1])

function optionup() {
  option -= 1
  if (option <= 0) {
    option = 0
  }
}

function optiondw() {
  option += 1
  if (option >= 2) {
    option = 2
  }
}

function option1() {
  clearText()
  if (option == 0){
  addText(`Move: Attack`, { x: 5, y: 5, color: color`0` });
  } else if (option == 1) {
  addText(`Move: Magic`, { x: 5, y: 5, color: color`0` });
  } else if (option == 2) {
  addText(`Move: Dodge`, { x: 5, y: 5, color: color`0` });
  }
}

function moveAttackr() {
  const attackrSprite = getFirst(attackr);
   if (attackrSprite) {
    attackrSprite.x += 1;
    checkAttackrCollision();
    setTimeout(moveAttackr, 350);
  }
}

function checkAttackrCollision() {
  const attackrSprite = getFirst(attackr);
  const collisionSprites = getTile(attackrSprite.x, attackrSprite.y);

  collisionSprites.forEach(sprite => {
    if (sprite.type !== attackr) {
      attackrSprite.remove();
      getFirst(player).x -= 1;
      FightEnabled = 1
    }
  });
}


function attack1() {
  getFirst(player).x += 1;
  const playerSprite = getFirst(player);
  const newX = playerSprite.x;
  const newY = playerSprite.y;

  addSprite(newX, newY, attackr);
 
  FightEnabled = false
  moveAttackr();
}

onInput("w", () => {
  if (MovementEnabled == true) {
    getFirst(player).y -= 1;
  } else if (FightEnabled == true) {
    optionup()
    option1()
  }
})

onInput("s", () => {
  if (MovementEnabled == true) {
    getFirst(player).y += 1;
  } else if (FightEnabled == true) {
    optiondw()
    option1()
  }
})

onInput("a", () => {
  if (MovementEnabled == true) {
    getFirst(player).x -= 1;
  }
})

onInput("d", () => {
  if (MovementEnabled == true) {
    getFirst(player).x += 1;
  }
})

onInput("j", () => {
  if (FightEnabled == true) {
    if (option == 0) {
    attack1()
    clearText()
    }
  }
})


let level = 1
const levels = [
  map`
aaaaaaaaaaa
a.........a
pp.z...x.oo
a.........a
pp.......oo
a.........a
pp.......oo
a.........a
aaaaaaaaaaa`,
  map`
........
a......a
awwwwwwa
a......e
a......a
a..z...a
........`,
  map`
a..w
ez.w
a..w`
]

setBackground(floor1)

setMap(levels[level])

setPushables({
  [player]: []
})

afterInput(() => {

  const playerSprite = getFirst(player);
  const playerTile = getTile(playerSprite.x, playerSprite.y);

  if (playerTile.some(sprite => sprite.type === floor2)) {
    if (Math.random() < 1) {
      if (battle == false) {
        previouslevel = level;
        level = 0;
        battle = true
        MovementEnabled = false;
        FightEnabled = true;
        setMap(levels[level]);
      } else {
        setMap(levels[previouslevel]);
        battle = false
        MovementEnabled = true;
        FightEnabled = false;
      }
    }
  }

  if (playerTile.some(sprite => sprite.type === floor3)) {
      if (battle == false) {
        level = 2;
        setMap(levels[level]);
      } 
  }
  
})