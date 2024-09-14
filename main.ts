namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    you.sayText("I need to get out of here. now!")
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (you.vy == 0) {
        you.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile3`, function (sprite, location) {
    game.over(false, effects.melt)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile5`, function (sprite, location) {
    you.sayText("aaah! scary!")
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    current_level += 1
    startLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    otherSprite.destroy()
    bee = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    bee,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . 1 . . 1 . . . . . 1 . . 1 . . 
        . 1 2 . 1 . . . . . 1 . 2 1 . . 
        . 1 1 2 . . . . . . . 2 1 1 . . 
        . . 1 1 2 2 2 2 2 2 2 1 1 . . . 
        . . 1 1 2 1 2 1 2 1 2 1 1 . . . 
        . . . 1 2 1 2 1 2 2 2 2 . . . . 
        . . . . 2 2 2 2 2 2 1 2 . . . . 
        . . . . . 2 1 2 1 2 1 . . . . . 
        . . . . . . 1 2 1 2 . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . 1 . 1 . . . . . 1 . . . . . 
        . . 1 . 1 . . . . . 1 . . . . . 
        . . 1 2 . . . . . . . . . . 1 . 
        . . . 2 2 . . . . . . . 1 1 1 . 
        . . . . 2 2 2 1 . . 2 2 2 1 1 . 
        . . . . . 1 2 2 2 2 2 2 2 1 . . 
        . . . . . . . . 2 2 2 1 . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
    bee.setPosition(you.x + 80, you.y - 80)
    bee.follow(you, 50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
})
function startLevel () {
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (current_level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (current_level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(you, assets.tile`tile6`)
    for (let value of tiles.getTilesByType(assets.tile`tile6`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    scene.cameraFollowSprite(you)
    info.setLife(5)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flower)) {
        value4.destroy()
    }
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        flower = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 4 4 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . . f 5 5 4 4 5 5 5 5 5 f . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        flower,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 4 4 4 4 4 5 5 5 f . . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 4 4 4 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 4 4 4 4 5 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 5 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(flower, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`tile5`)) {
        flower = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 3 a . . a 3 . . . . . . 
            . . . . a 3 2 2 3 a . . . . . . 
            . . 7 7 . a 3 3 a . . . . . . . 
            . . 7 7 7 . c c . 7 7 . . . . . 
            . . . 8 7 7 7 . 7 7 7 . . . . . 
            . . . 8 8 7 7 7 7 8 . . . . . . 
            . . . . . 8 7 7 8 . . . . . . . 
            . . . . . . 7 8 . . . . . . . . 
            `, SpriteKind.Flower)
        tiles.placeOnTile(flower, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`tile11`)) {
        fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . 5 5 2 5 5 4 5 5 . . . . 
            . . . . . 4 4 4 4 2 4 . . . . . 
            . . . 5 4 4 2 2 2 2 4 5 . . . . 
            . . . 5 4 . 2 8 2 8 4 2 . . . . 
            . . . 5 5 . 2 8 8 2 4 5 . . . . 
            . . . 2 5 2 2 8 2 4 4 5 . . . . 
            . . . . 5 4 2 2 2 4 5 . . . . . 
            . . . . . . 4 . 4 4 5 . . . . . 
            . . . 5 . 5 5 5 4 5 5 . . . . . 
            . . . . . . . 2 5 5 . . . . . . 
            . . . . . . . . . . . . . 5 . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Fireball)
        tiles.placeOnTile(fireball, value7)
        tiles.setTileAt(value7, assets.tile`tile0`)
        animation.runMovementAnimation(
        fireball,
        "c 0 -100 0 100 0 0",
        2000,
        true
        )
        fireball.startEffect(effects.fire)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (you.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let fireball: Sprite = null
let flower: Sprite = null
let bee: Sprite = null
let you: Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff11111ffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff11111ffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff11111ffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff111111fffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff111111fffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff111111fffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffff
    ffff1111111ffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffff
    fffff111111ffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffff
    fffff1111111fffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffff
    fffff1111111fffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffff111111ffffffffffffffffffffffffffffff
    fffff1111111fffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffff111111ffffffffffffffffffffffffffffff
    fffff1111111fffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffff1111111ffffffffffffffffffffffffffffff
    fffff11111111ffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffff1111111ffffffffffffffffffffffffffffff
    ffffff1111111ffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffff11111111ffffffffffffffffffffffffffffff
    ffffff1111111ffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffff111111111ffffffffffffffffffffffffffffff
    fffffff1111111fffffffffffffffffffff111111ffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffff1111111111ffffffffffffffffffffffffffffff
    ffffffff111111fffffffffffffffffffff111111ffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffff11111111111ffffffffffffffffffffffffffffff
    ffffffff111111fffffffffffffffffffff111111fffffffffffffffffffffffffffffffffffffffffffff111111ffffffffffffffffffffffffff111111111111ffffffffffffffffffffffffffffff
    ffffffff1111111ffffffffffffffffffff111111fffffffffffffffffffffffffffffffffffffffffffff111111fffffffffffffffffffffffff1111111111111ffffffffffffffffffffffffffffff
    ffffffff1111111fffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffff111111fffffffffffffffffffffffff111111111111fffffffffffffffffffffffffffffff
    ffffffff11111111ffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffff111111ffffffffffffffffffffffff1111111111111fffffffffffffffffffffffffffffff
    ffffffff11111111ffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffffff111111fffffffffffffffffffff2222211111111111fffffffffffffffffffffffffffffff
    fffffffff11111111fffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffff11111fffffffffffffffffffff2222221111111111fffffffffffffffffffffffffffffff
    fffffffff11111111fffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffff11111ffffffffffffffffffff12222221111111111fffffffffffffffffffffffffffffff
    fffffffff111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1112222221111111111fffffffffffffffffffffffffffffff
    fffffffff1111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11112222221f1111111ffffffffffffffffffffffffffffffff
    ffffffffff1111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111112222211111111fffffffffffffffffffffffffffffffff
    ffffffffff111111122222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111112222211111111fffffffffffffffffffffffffffffffff
    ffffffffff1111111222222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111111222221111111ffffffffffffffffffffffffffffffffff
    ffffffffff1111111222222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111112222221111111ffffffffffffffffffffffffffffffffff
    fffffffffff111111222222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111222222111111fffffffffffffffffffffffffffffffffff
    fffffffffff111112222222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111222222111111fffffffffffffffffffffffffffffffffff
    fffffffffff1111122222221ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111111111111222222211111ffffffffffffffffffffffffffffffffffff
    ffffffffffff111122222211ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11122222111111111122222211111fffffffffffffffffffffffffffffffffffff
    ffffffffffff1111222222111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111112222211111111112222221111ffffffffffffffffffffffffffffffffffffff
    fffffffffffff1112222221111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111112222211111111112222221111ffffffffffffffffffffffffffffffffffffff
    fffffffffffff11122222221111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111222221111111111222221111fffffffffffffffffffffffffffffffffffffff
    fffffffffffff1112222222111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111111222221111111111222221111fffffffffffffffffffffffffffffffffffffff
    fffffffffffff11112222221111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111122222111111111122222111ffffffffffffffffffffffffffffffffffffffff
    fffffffffffff1111222222211111111fffffffffffffffffffffffffffffffffffffffffffffffffff111111111111112222211111111112222211fffffffffffffffffffffffffffffffffffffffff
    fffffffffffff1111122222211111122222ffffffffffffffffffffffffffffffffffffffffffffff11111111111111112222211111111112222111fffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff111122222211111122222ffffffffffffffffffffffffffffffffffffffffffff111111111111111111222221111111111222211ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff111122222211111122222221fffffffffffffffffffffffffffffffffffffff11222221111111111111222221111111111122211ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff111122222211111122222221111fffffffffffffffffffffffffffffffff1111222222111111111111122222111111111112221fffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff1111222222111111222222211111111111111111fffffffffffff11111111111222222111111111111122222111111111112221fffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff11122222111111112222221111111111111111122222111111111111111111122222211111111111112222211111111111121ffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1111222211111111222222111111111111111222222211111111111111111112222221111111111111222221111111111121fffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1111222211111111122222111111111111111222222211111111111111111112222221111111111111222221111111111121fffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff11122221111111122222211111111111111122222221111111111111111111122222111111111111122222111111111112ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff11122221111111122222211111111111111122222221111111111111111111122222111111111111122222111111111112ffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffff11222211111111222222111111111111111222222211111111111111111111222221111111111111222221111111111f2ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffff1222211111111222222111111111111111222222111111111111111111111222221111111111111222221111111111f2ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffff122211111111122222211111111111111122222211111111111111111111122222111111111111122221111111111ff2ffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff1221111111111222211111111111111112222221111111111111111111112222211111111111112222111111111ffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff121111111111222211111111111111112222221111111111111111111112222211111111111112222111111111ffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff2111111111122221111111111111111222221111111111111111111111222221111111111111222211111111fffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff11111111112222111111111111111122222111111111111111111111122222111111111111122221111111ffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff11111111112222111111111111111122221111111111111111111111122222111111111111112221111111ffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff1111111112221111111111111111222211111111111111111111111222221111111111111122221111ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff1111111221111111111111111122221111111111111111111111122222111111111111112222111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff11111122111111111111111111222111111111111111111111112222211111111111111222111ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff111111211111111111111111122211111111111111111111111122221111111111111122211fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff1111111111111111111111112221111111111111111111111112222111111111111112221ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff11111111111111111111111222111111111111111111111111222111111111111111222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff11111111111111111111122211111111111111111111111122211111111111111122ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff11111111111111111111122111111111111111111111111222111111111111111f2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff1111111111111111111111111111111111111111111111221111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111111111111211111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff11111111111111111111111111111111111111111111211111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffff1111111111111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff11111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff1111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
current_level = 0
you = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f e e e e f f . . . 
    . f e e e e e 4 e e f . . 
    f e e e e e 4 4 e e e f . 
    f e e 4 e e e e e e e f . 
    f 4 4 e f f f f e e 4 f . 
    f e e f 4 4 4 4 f 4 4 f . 
    f f f b f 4 4 f b f f f . 
    . f d 1 f d d f 1 d f . . 
    . f 4 d d d d d d 4 f . . 
    . f f f 4 4 4 4 f f f . . 
    e 4 f 6 6 6 6 6 6 f 4 e . 
    4 d f 6 6 6 6 f 6 f d 4 . 
    4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . f f f f f f . . . . 
    . . . f 5 . . 5 f . . . . 
    `, SpriteKind.Player)
controller.moveSprite(you, 80, 0)
startLevel()
game.onUpdate(function () {
    if (you.vy < 0) {
        you.setImage(img`
            . . . . f f f f . . . . . 
            . . f f e e e e f f . . . 
            . f e e e e e 4 e e f . . 
            f e e e e e 4 4 e e e f . 
            f e e 4 e e e e e e e f . 
            f 4 4 e f f f f e e 4 f . 
            f e e f 4 4 4 4 f 4 4 f . 
            f f f b f 4 4 f b f f f . 
            . f d 1 f d d f 1 d f . . 
            . f 4 d d d d d d 4 f . . 
            . f f f 4 4 4 4 f f f . . 
            e 4 f f f f f f f f 4 e . 
            4 d f 1 1 1 1 1 1 f d 4 . 
            4 4 f f f f f f f f 4 4 . 
            . . . 8 8 8 8 8 8 . . . . 
            . . . 8 8 . . 8 8 . . . . 
            `)
    } else if (you.vy > 0) {
        you.setImage(img`
            . . . . f f f f . . . . . 
            . . f f e e e e f f . . . 
            . f e e e e e 4 e e f . . 
            f e e e e e 4 4 e e e f . 
            f e e 4 e e e e e e e f . 
            f 4 4 e f f f f e e 4 f . 
            f e e f 4 4 4 4 f 4 4 f . 
            f f f b f 4 4 f b f f f . 
            . f d 1 f d d f 1 d f . . 
            . f 4 d d d d d d 4 f . . 
            . f f f 4 4 4 4 f f f . . 
            e 4 f f f f f f f f 4 e . 
            4 d f 1 1 1 1 1 1 f d 4 . 
            4 4 f f f f f f f f 4 4 . 
            . . . 8 8 8 8 8 8 . . . . 
            . . . 8 8 . . 8 8 . . . . 
            `)
    } else if (you.x % 2 == 0) {
        you.setImage(img`
            . . . . f f f f . . . . . 
            . . f f e e e e f f . . . 
            . f e e e e e 4 e e f . . 
            f e e e e e 4 4 e e e f . 
            f e e 4 e e e e e e e f . 
            f 4 4 e f f f f e e 4 f . 
            f e e f 4 4 4 4 f 4 4 f . 
            f f f b f 4 4 f b f f f . 
            . f d 1 f d d f 1 d f . . 
            . f 4 d d d d d d 4 f . . 
            . f f f 4 4 4 4 f f f . . 
            e 4 f f f f f f f f 4 e . 
            4 d f 1 1 1 1 1 1 f d 4 . 
            4 4 f f f f f f f f 4 4 . 
            . . . 8 8 8 8 8 8 . . . . 
            . . . 8 8 . . 8 8 . . . . 
            `)
    } else {
        you.setImage(img`
            . . . . f f f f . . . . . 
            . . f f e e e e f f . . . 
            . f e e e e e 4 e e f . . 
            f e e e e e 4 4 e e e f . 
            f e e 4 e e e e e e e f . 
            f 4 4 e f f f f e e 4 f . 
            f e e f 4 4 4 4 f 4 4 f . 
            f f f b f 4 4 f b f f f . 
            . f d 1 f d d f 1 d f . . 
            . f 4 d d d d d d 4 f . . 
            . f f f 4 4 4 4 f f f . . 
            e 4 f f f f f f f f 4 e . 
            4 d f 1 1 1 1 1 1 f d 4 . 
            4 4 f f f f f f f f 4 4 . 
            . . . 8 8 8 8 8 8 . . . . 
            . . . 8 8 . . 8 8 . . . . 
            `)
    }
    if ((you.isHittingTile(CollisionDirection.Left) || you.isHittingTile(CollisionDirection.Right)) && you.vy >= 0) {
        you.vy = 0
        you.ay = 0
        you.setImage(img`
            . . . . f f f f . . . . . 
            . . f f e e e e f f . . . 
            . f e e e e e 4 e e f . . 
            f e e e e e 4 4 e e e f . 
            f e e 4 e e e e e e e f . 
            f 4 4 e f f f f e e 4 f . 
            f e e f 4 4 4 4 f 4 4 f . 
            f f f b f 4 4 f b f f f . 
            . f d 1 f d d f 1 d f . . 
            . f 4 d d d d d d 4 f . . 
            . f f f 4 4 4 4 f f f . . 
            e 4 f f f f f f f f 4 e . 
            4 d f 1 1 1 1 1 1 f d 4 . 
            4 4 f f f f f f f f 4 4 . 
            . . . 8 8 8 8 8 8 . . . . 
            . . . 8 8 . . 8 8 . . . . 
            `)
    } else {
        you.ay = 350
    }
    if (you.vx < 0 || you.isHittingTile(CollisionDirection.Left)) {
        you.image.flipX()
        you.setImage(you.image)
    }
})
