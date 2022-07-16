import Demo from "./game";

export function updateSpeedWASD(t: Demo) {
    t.players.forEach((p, i) => {
        if (p.cursorsWASD.up.isDown) {
            p.velocity.y -= p.VERTICAL_SPEED * p.turboMultiply;
        }
        if (p.cursorsWASD.down.isDown) {
            p.velocity.y += p.VERTICAL_SPEED * p.turboMultiply;
        }
        if (p.cursorsWASD.left.isDown) {
            p.velocity.x -= p.HORIZONTAL_SPEED * p.turboMultiply;
        }
        if (p.cursorsWASD.right.isDown) {
            p.velocity.x += p.HORIZONTAL_SPEED * p.turboMultiply;
        }
    });
}


export function updateStanding(t: Demo) {
    t.players.forEach((p, i) => {
        if (p.player_internal.body.touching.down) {
            p.standingPlatform = true;
        } else {
            p.standingPlatform = false;
        }
    });
}
export function updateVelocity(t: Demo) {
    t.players.forEach(function (p, i) {
        p.player_internal.setVelocityX(p.velocity.x);
        p.player_internal.setVelocityY(p.velocity.y);
        p.velocity.x = p.velocity.x / p.SIDE_DECAY;
        p.velocity.y = p.velocity.y / p.DOWN_DECAY + p.GRAVITY;
    });
}
export function updateTurbo(t: Demo) {
    t.players.forEach(function (p, i) {
        if (p.cursorsWASD.fast.isDown) {
            p.turboFlipFlop = true;
        } else {
            p.turboFlipFlop = false;
        }
        p.turboMultiply = p.turboFlipFlop ? p.TURBO_MULTIPLIER : 1;
    });
}
export function udpateJumpFlipFlop(t: Demo) {
    t.players.forEach((p, i) => {
        if (p.cursorsWASD.jump.isDown) {
            if (p.flipFlop.u) {
                p.velocity.y = -p.JUMP_POWER;
                p.flipFlop.u = false;
            }
        }
        if (p.cursorsWASD.jump.isUp) {
            p.flipFlop.u = true;
        }
    });
}

export function updateLeftRightFlipFlop(t: Demo) {
    t.players.forEach((p, i) => {
        if (p.cursorsWASD.left.isDown) {
            if (p.flipFlop.l) {
                p.velocity.x = -p.FULL_SPEED;
                p.flipFlop.l = false;
            }
        } else {
            p.flipFlop.l = true;
        }
        if (p.cursorsWASD.right.isDown) {
            if (p.flipFlop.r) {
                p.velocity.x = p.FULL_SPEED;
                p.flipFlop.r = false;
            }
        } else {
            p.flipFlop.r = true;
        }
    });
}
