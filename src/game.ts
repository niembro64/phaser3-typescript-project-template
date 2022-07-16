import "phaser";
import {
    udpateJumpFlipFlop,
    updateLeftRightFlipFlop,
    updateSpeedWASD,
    updateStanding,
    updateTurbo,
    updateVelocity,
} from "./movement";
import { setUpPage } from "./page";

export interface player {
    player_internal: any;
    TURBO_MULTIPLIER: number;
    HORIZONTAL_SPEED: number;
    VERTICAL_SPEED: number;
    GRAVITY: number;
    FULL_SPEED: number;
    SIDE_DECAY: number;
    DOWN_DECAY: number;
    JUMP_POWER: number;
    LENGTH_OF_TAIL: number;
    SPEED_OF_TAIL: number;
    standingPlatform: boolean;
    cursorsWASD: any;
    velocity: { x: number; y: number };
    flipFlop: { r: boolean; l: boolean; u: boolean; d: boolean };
    turboFlipFlop: boolean;
    turboMultiply: number;
    particles: any;
    emitter: any;
    emitterManager: any;
    keyboard: {
        up: any;
        down: any;
        left: any;
        right: any;
        fast: any;
        jump: any;
    };
}

var platforms;
export default class Demo extends Phaser.Scene {
    players: player[] = [
        {
            player_internal: null,
            TURBO_MULTIPLIER: 3,
            HORIZONTAL_SPEED: 40,
            VERTICAL_SPEED: 12,
            GRAVITY: 50,
            FULL_SPEED: 200,
            SIDE_DECAY: 1.2,
            DOWN_DECAY: 1.06,
            JUMP_POWER: 1600,
            LENGTH_OF_TAIL: 1000,
            SPEED_OF_TAIL: 30,
            standingPlatform: false,
            cursorsWASD: null,
            velocity: { x: 0, y: 0 },
            flipFlop: { r: false, l: false, u: false, d: false },
            turboFlipFlop: false,
            turboMultiply: 0,
            particles: null,
            emitter: null,
            emitterManager: null,
            keyboard: {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                fast: Phaser.Input.Keyboard.KeyCodes.Z,
                jump: Phaser.Input.Keyboard.KeyCodes.X,
            },
        },
        {
            player_internal: null,
            TURBO_MULTIPLIER: 3,
            HORIZONTAL_SPEED: 40,
            VERTICAL_SPEED: 12,
            GRAVITY: 50,
            FULL_SPEED: 200,
            SIDE_DECAY: 1.2,
            DOWN_DECAY: 1.06,
            JUMP_POWER: 1600,
            LENGTH_OF_TAIL: 1000,
            standingPlatform: false,
            SPEED_OF_TAIL: 30,
            cursorsWASD: null,
            velocity: { x: 0, y: 0 },
            flipFlop: { r: false, l: false, u: false, d: false },
            turboFlipFlop: false,
            turboMultiply: 0,
            particles: null,
            emitter: null,
            emitterManager: null,
            keyboard: {
                up: Phaser.Input.Keyboard.KeyCodes.T,
                down: Phaser.Input.Keyboard.KeyCodes.G,
                left: Phaser.Input.Keyboard.KeyCodes.F,
                right: Phaser.Input.Keyboard.KeyCodes.H,
                fast: Phaser.Input.Keyboard.KeyCodes.V,
                jump: Phaser.Input.Keyboard.KeyCodes.B,
            },
        },
        {
            player_internal: null,
            TURBO_MULTIPLIER: 3,
            HORIZONTAL_SPEED: 40,
            VERTICAL_SPEED: 12,
            GRAVITY: 50,
            FULL_SPEED: 200,
            SIDE_DECAY: 1.2,
            DOWN_DECAY: 1.06,
            JUMP_POWER: 1600,
            LENGTH_OF_TAIL: 1000,
            SPEED_OF_TAIL: 30,
            standingPlatform: false,
            cursorsWASD: null,
            velocity: { x: 0, y: 0 },
            flipFlop: { r: false, l: false, u: false, d: false },
            turboFlipFlop: false,
            turboMultiply: 0,
            particles: null,
            emitter: null,
            emitterManager: null,
            keyboard: {
                up: Phaser.Input.Keyboard.KeyCodes.I,
                down: Phaser.Input.Keyboard.KeyCodes.K,
                left: Phaser.Input.Keyboard.KeyCodes.J,
                right: Phaser.Input.Keyboard.KeyCodes.L,
                fast: Phaser.Input.Keyboard.KeyCodes.O,
                jump: Phaser.Input.Keyboard.KeyCodes.P,
            },
        },
        {
            player_internal: null,
            TURBO_MULTIPLIER: 3,
            HORIZONTAL_SPEED: 40,
            VERTICAL_SPEED: 12,
            GRAVITY: 50,
            FULL_SPEED: 200,
            SIDE_DECAY: 1.2,
            DOWN_DECAY: 1.06,
            JUMP_POWER: 1600,
            LENGTH_OF_TAIL: 1000,
            SPEED_OF_TAIL: 30,
            standingPlatform: false,
            cursorsWASD: null,
            velocity: { x: 0, y: 0 },
            flipFlop: { r: false, l: false, u: false, d: false },
            turboFlipFlop: false,
            turboMultiply: 0,
            particles: null,
            emitter: null,
            emitterManager: null,
            keyboard: {
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                fast: Phaser.Input.Keyboard.KeyCodes.END,
                jump: Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN,
            },
        },
    ];

    constructor() {
        super("demo");
    }

    preload() {
        this.players.forEach((p, i) => {
            this.load.image("character_" + i, "character_" + i + ".png");
            this.load.image("tail_" + i, "tail_" + i + ".png");
            this.load.image("platform", "platform.png");
        });
    }

    create() {
        setUpPage(this);

        var _this = this;
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, "platform").setScale(0.5).refreshBody();
        platforms
            .create(500, 200, "platform")
            .setScale(0.25, 0.5)
            .refreshBody();
        this.players.forEach(function (p, i) {
            p.cursorsWASD = _this.input.keyboard.addKeys(p.keyboard);
            // p.cursorsARROWS = this.input.keyboard.createCursorKeys();
            p.particles = _this.add.particles("tail_" + i);
            p.emitter = p.particles.createEmitter({
                speed: p.SPEED_OF_TAIL / 0.5,
                // speed: { min: 0, max: p.SPEED_OF_TAIL / 1 },
                scale: { start: 0.06, end: 0 },
                alpha: { start: 1, end: 0.5 },
                lifespan: p.LENGTH_OF_TAIL,
                blendMode: "ADD",
                // maxVelocityX: 70,
                // maxVelocityY: 70,
                // on: false,
                // maxParticles: 300,
            });

            p.player_internal = _this.physics.add.sprite(
                10,
                10,
                "character_" + i
            );
            p.player_internal.setPosition(100 * i + 250, 50);
            p.velocity.x = 1000 * i - 1500;
            p.player_internal.setCollideWorldBounds(true);
            p.emitter.startFollow(p.player_internal);
            _this.physics.add.collider(p.player_internal, platforms);
        });

        _this.input.on("pointerdown", function (pointer) {
            console.log("pointer.x", pointer.x, "pointer.y", pointer.y);
            this.players.forEach((p, i) => {
                console.log("LOGGING", p.player_internal.body.transform);
                // var shoot = this.shootVector(
                //     p.player_internal.body.transform.x,
                //     p.player_internal.body.transform.y
                // );
                // p.velocity.x -= shoot.x;
                // p.velocity.y -= shoot.y;
                p.velocity.x = -p.velocity.x;
                p.velocity.y -= 1500;
                p.emitter.on = p.emitter.on ? false : true;
            });
        });
    }
    center = { x: config.scale.width / 2, y: config.scale.height / 2 };
    shootMultipler = 50000;
    shootVector(x: any, y: any) {
        var s = { x: 0, y: 0 };
        var dx = x - this.center.x;
        var dy = y - this.center.y;

        var rad = Math.sqrt(dx * dx * +dy * dy);
        s.x = ((x - this.center.x) / rad) * this.shootMultipler;
        s.y = 1500;

        return { x: s.x, y: s.y };
    }

    update() {
        updateVelocity(this);
        updateSpeedWASD(this);
        updateLeftRightFlipFlop(this);
        udpateJumpFlipFlop(this);
        updateTurbo(this);
        updateStanding(this);
    }
}

const config = {
    scale: {
        width: 800,
        height: 400,
    },
    pixelArt: false,
    type: Phaser.AUTO,
    parent: "yourgamediv",
    backgroundColor: "#0072bc",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: Demo,
};

const game = new Phaser.Game(config);
