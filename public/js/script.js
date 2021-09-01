let AllChars = [];
for (let i = 32; i < 127; i++)
    AllChars.push(String.fromCharCode(i));

console.log(AllChars);

async function loopFetch() {
    for (let i = 0; i < 10; i++) {
        let data = {
            log: $('#username').val(),
            pwd: i,
        };
        const response = await fetch('', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'http://localhost',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        console.log(response); // parses JSON response into native JavaScript objects
    }
}

async function loopRequest() {
    let myPromise, result;
    for (let i = 0; i < 10; i++) {
        myPromise = new Promise(resolve => {
            $.ajax({
                url: $('#url').val(),
                type: "POST",
                beforeSend: function (request) {
                    console.log(request);
                    // request.setRequestHeader('Content-Type', 'application/json');
                    // request.setRequestHeader('Accept', 'application/json');
                    request.setRequestHeader('Origin', '');
                },
                crossDomain: true,
                forceMethod: true,
                data: {
                    log: $('#username').val(),
                    pwd: i,
                },
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    console.log(e);
                }
            });
        });
        result = await myPromise;
        console.log(result);
    }
}

$('#start').click(() => {
    // loopRequest();
    // loopFetch();
    $.ajax({
        url: 'http://localhost:3000/test',
        type: "POST",
        // beforeSend: function (request) {
        //     // console.log(request);
        //     request.setRequestHeader('Content-Type', 'application/json');
        //     // request.setRequestHeader('Accept', 'application/json');
        //     // request.setRequestHeader('Origin', 'http://localhost:3000');
        // },
        data: {
            log: $('#username').val(),
            pwd: 'idlix',
        },
        success: (result) => {
            resolve(result);
        },
        error: (e) => {
            console.log(e);
        }
    });
});