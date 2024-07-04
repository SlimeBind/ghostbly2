/*
@title: Ghostbly 2
@author: SlimeBind
@tags: [rpg]
@addedOn: 2024-00-00
*/

const player = "z"
const floor1 = "q"
const floor2 = "w"
const floor3 = "e"
const wall1 = "a"
const bar1 = "p"
const bar2 = "o"
let battle = false
let inputEnabled = true;
let previouslevel

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

onInput("w", () => {
  if (inputEnabled == true) {
    getFirst(player).y -= 1;
  }
})

onInput("s", () => {
  if (inputEnabled == true) {
    getFirst(player).y += 1;
  }
})

onInput("a", () => {
  if (inputEnabled == true) {
    getFirst(player).x -= 1;
  }
})

onInput("d", () => {
  if (inputEnabled == true) {
    getFirst(player).x += 1;
  }
})

onInput("j", () => {


})


let level = 1
const levels = [
  map`
aaaaaaaaaaa
a.........a
ap.z.w...oa
a.........a
ap.......oa
a.........a
ap.......oa
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
        inputEnabled = true;
        setMap(levels[level]);
      } else {
        level = previouslevel;
        setMap(levels[level]);
        battle = false
      }
    }
  }

  if (playerTile.some(sprite => sprite.type === floor3)) {
      if (battle == false) {
        let level = 2;
        setMap(levels[level]);
      } 
  }
  
})