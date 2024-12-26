export default function (len) {
    if ((len === undefined) || (len <= 0)) { len = 1; }
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let iffirst = 0;
    for (var i = 0; i < len; i++) {
        if (i === 0) { iffirst = 10; } else { iffirst = 0; }
        result += characters[Math.round(Math.random() * (characters.length - iffirst - 1))];
    }
    return result;
}