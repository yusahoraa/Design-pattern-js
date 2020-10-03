#!/usr/bin/env node

const fileArray = [];
let fileSeen = 0;
let index = 0;

function getFileSeen()
{
    fileSeen = 0;
    fileArray.forEach(get);
    function get(item)
    {
        if(item.seen === true) fileSeen++;
    }

    return fileSeen;
}

function PhotoFile(filename, size, type, pixelNumber)
{
    this.fileType = "photo";
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.pixelNumber = pixelNumber;
    this.createdAt = Date();
    this.seen = false;
}

function VideoFile(filename, size, type, hd)
{
    this.fileType = "video";
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.hd = hd;
    this.createdAt = Date();
    this.seen = false;
}

function SongFile(filename, size, type, converted)
{
    this.fileType = "song";
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.converted = converted;
    this.createdAt = Date();
    this.seen = false;
}

function TextFile(filename, size, type, encrypted)
{
    this.fileType = "text";
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.encrypted = encrypted;
    this.createdAt = Date();
    this.seen = false;
}

const photoParam = function(params)
{
    const {filename, size, type, pixelNumber} = params;

    fileArray.push(new PhotoFile(filename, size, type, pixelNumber));

}

const videoParam = function(params)
{
    const {filename, size, type, hd} = params;

    fileArray.push(new VideoFile(filename, size, type, hd));
}

const songParam = function(params)
{
    const {filename, size, type, converted} = params;

    fileArray.push(new SongFile(filename, size, type, converted));
}

const textParam = function(params)
{
    const {filename, size, type, encrypted} = params;

    fileArray.push(new TextFile(filename, size, type, encrypted));
}
const keypress = require('keypress');


keypress(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', function (ch, key) {
    if (key.name === 'c') {
        cPressed();
    }
    if (key.name === 'e') {
        ePressed();
    }
    if(key.name === 'right')
    {
        rightPressed();
    }
    if(key.name === 'left')
    {
        leftPressed();
    }
});

function ePressed()
{
    console.log(getFileSeen());
}

function cPressed()
{
    console.log(fileArray.length);
}

function rightPressed()
{
    if (index < fileArray.length -1) index++;
    else index = 0;
    setSeenTrue(fileArray[index]);
    if(fileArray[index].fileType === "photo") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].pixelNumber, fileArray[index].createdAt, fileArray[index].seen);
    else if(fileArray[index].fileType === "song") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].converted, fileArray[index].createdAt, fileArray[index].seen);
    else if(fileArray[index].fileType === "text") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].encrypted, fileArray[index].createdAt, fileArray[index].seen);
    else if(fileArray[index].fileType === "video") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].hd, fileArray[index].createdAt, fileArray[index].seen);
}

function leftPressed()
{
    if (index > 0) index--;
    else index = fileArray.length -1;
    setSeenTrue(fileArray[index]);
    if(fileArray[index].fileType === "photo") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].pixelNumber, fileArray[index].createdAt, fileArray[index].seen);
    else if(fileArray[index].fileType === "song") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].converted, fileArray[index].createdAt, fileArray[index].seen);
    else if(fileArray[index].fileType === "text") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].encrypted, fileArray[index].createdAt, fileArray[index].seen);
    else if(fileArray[index].fileType === "video") console.log(fileArray[index].filename, fileArray[index].size, fileArray[index].type, fileArray[index].hd, fileArray[index].createdAt, fileArray[index].seen);
}

function setSeenTrue(file)
{
    file.seen = true;
}

const fileFactory = function(){};

fileFactory.prototype.className = photoParam;

fileFactory.prototype.createProduct = function(type, params = {})
{

    switch (type)
    {
        case photoParam.name:
            this.className = photoParam;
            break;

        case videoParam.name:
            this.className = videoParam;
            break;

        case songParam.name:
            this.className = songParam;
            break;

        case textParam.name:
            this.className = textParam;
            break;
    }
    return new this.className(params);
};

const factory = new fileFactory();

factory.createProduct('photoParam',{
    filename: 'surf_at_lacanau.jpg',
    size: 1024,
    type: 'jpg',
    pixelNumber: 1000,
});
factory.createProduct('textParam',{
    filename: 'documentation_react.docx',
    size: 2024,
    type: 'docx',
    encrypted: true,
});
factory.createProduct('songParam',{
    filename: 'love_yourself.mp3',
    size: 6024,
    type: 'mp3',
    converted: true,
});
factory.createProduct('videoParam',{
    filename: 'got.avi',
    size: 10024,
    type: 'avi',
    hd: true,
});
factory.createProduct('photoParam',{
    filename: 'party_at_cancun.jpg',
    size: 1424,
    type: 'jpg',
    pixelNumber: 3000,
});
factory.createProduct('textParam',{
    filename: 'my_best_book.pdf',
    size: 3024,
    type: 'pdf',
    encrypted: false,
});
factory.createProduct('songParam',{
    filename: 'my_song.mp3',
    size: 8024,
    type: 'mp3',
    converted: false,
});
factory.createProduct('videoParam',{
    filename: 'breaking_bad.mp4',
    size: 8024,
    type: 'mp4',
    hd: false,
});
factory.createProduct('photoParam',{
    filename: 'family.png',
    size: 2024,
    type: 'png',
    pixelNumber: 2000,
});
factory.createProduct('textParam',{
    filename: 'documentation_react.docx',
    size: 2024,
    type: 'docx',
    encrypted: true,
});
factory.createProduct('songParam',{
    filename: 'band.mp3',
    size: 2024,
    type: 'mp3',
    converted: true,
});
factory.createProduct('videoParam',{
    filename: 'youtube.mp4',
    size: 12024,
    type: 'mp4',
    hd: true,
});

setTimeout(function () {
    factory.createProduct('photoParam',{
        filename: 'last_ski_session.jpg',
        size: 4424,
        type: 'jpg',
        pixelNumber: 4000,
    });

    factory.createProduct('songParam',{
        filename: 'dems.mp3',
        size: 7024,
        type: 'mp3',
        converted: false,
    });
}, 30000);
