import Demo from "./game";

// test
// test

export function setUpPage(t: Demo) {
    const c = document.getElementById("controls");
    let htmlString = "";

    t.players.forEach((p, i) => {
        if (i === 3) {
            htmlString += `
            <ul class="created">
            <li>P${i + 1}<li>
            <li>&nbsp;&nbsp;&nbsp;UP: UP</li>
            <li>&nbsp;DOWN: DOWN</li>
            <li>&nbsp;LEFT: LEFT</li>
            <li>RIGHT: RIGHT</li>
            <li>&nbsp;FAST: END</li>
            <li>&nbsp;JUMP: PAGEDOWN</li>
        </ul>`;
        } else {
            htmlString += `
        <ul class="created">
        <li>P${i + 1}<li>
        <li>&nbsp;&nbsp;&nbsp;UP: ${String.fromCharCode(p.keyboard.up)}</li>
        <li>&nbsp;DOWN: ${String.fromCharCode(p.keyboard.down)}</li>
        <li>&nbsp;LEFT: ${String.fromCharCode(p.keyboard.left)}</li>
        <li>RIGHT: ${String.fromCharCode(p.keyboard.right)}</li>
        <li>&nbsp;FAST: ${String.fromCharCode(p.keyboard.fast)}</li>
        <li>&nbsp;JUMP: ${String.fromCharCode(p.keyboard.jump)}</li>
        </ul>
        `;
        }
    });

    c.innerHTML = htmlString;
}

// const onClickHandler = (players: player[]) => {
//     console.log("CLICK");

//     players.forEach((p, i) => {
//         console.log("CLICK HANDLER", p.player_internal.body.transform.rotation);

//         p.emitter.on = false;
//         console.log("LOGGING", p.player_internal.body.transform);


//     });
// };
