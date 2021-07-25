var shajs = require('sha.js');
var crypto = require('crypto');
const wordList = require('./english.json');

function zeroFill(str = '', targetLen = 0) {
    while (str.length < targetLen) {
        str = '0' + str;
    }
    return str;
}

const ENTROPY_BITS_MAP = {
    '24': 256,
    '21': 224,
    '18': 192,
    '15': 160,
    '12': 128,
};

const LENGTH_OPTIONS = [24, 21, 18, 15, 12];

function generateRandomMnemonic(length = 24, wordList = []) {
    if (wordList.length === 0) {
        throw new Error('Array of 2048 words is required');
    }
    const entropyLength = ENTROPY_BITS_MAP[length];
    const checksumLength = length * 11 - entropyLength;
    // js random number limited to 32 bits, so need to concat for larger number
    const randomNumbersRequired = entropyLength / 32;

    const randomNumbers = crypto.randomFillSync(
        new Uint32Array(randomNumbersRequired)
    );
    
    let entropy = '';
    let hexEncoded = '';

    randomNumbers.forEach(rand => {
        
        // convert to binary and hex strings
        let binary = rand.toString(2);
        let hex = rand.toString(16);
        // left pad 0's
        binary = zeroFill(binary, 32);
        hex = zeroFill(hex, 8);
        entropy += binary;
        hexEncoded += hex;
    });

    // get checksum (first n bits of sha256 hash to complete 11 bit word indexes)
    const hash = shajs('sha256')
        .update(hexEncoded, 'hex')
        .digest('hex');
    const checksum = zeroFill(
        parseInt(hash.substr(0, 2), 16).toString(2),
        8
    ).substr(0, checksumLength);
    const result = entropy + checksum;
    // map to words
    const words = [];
    for (let i = 0; i < length; i++) {
        let binaryIndex = result.substr(i * 11, 11);
        let decimalIndex = parseInt(binaryIndex, 2);
        words.push(wordList[decimalIndex]);
    }
    return words;
}

module.exports = {
    generateRandomMnemonic,
    wordList
}