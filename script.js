function rdm(max){
    return Math.floor(Math.random()*(max +1));
};
function random( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function around(x){
    return Math.random()* x * 2 - x
}
function write(...input){
    console.log(...input);
    return void 0;
};
function error(input){
    console.log('%c' + input, 'color: #F54;');
    return void 0;
};
function $(id){
    return document.getElementById(id);
};

let container = $('container')
let width = container.clientWidth
let height = container.clientHeight
let canvas = $('canvas')
let c = canvas.getContext('2d')


let playing = false;
let fps = 30

canvas.width = width
canvas.height = height

c.fillStyle = '#BBB'
c.strokeStyle = '#BBB'

let border = 1
let res = 15

let arr = []
for ( let i = 0 ; i < width/res ; i++){
    arr.push([])
    for ( let a = 0 ; a < height/res ; a++){
        arr[i].push(!rdm(2))
    }
}

write(width)


function update(arr){
    if ( playing ){
        let next = []
        for ( let x = 0 ; x < arr.length ; x++){
            next.push([])
            for ( let y = 0 ; y < arr[x].length ; y++){
                next[x].push(arr[x][y])
            }
        }

        for ( let x = 0 ; x < arr.length ; x++){
            for ( let y = 0 ; y < arr[x].length ; y++){
                let neighbours = 0
                for ( let i = -1 ; i <= 1 ; i++){
                    for ( let a = -1 ; a <= 1 ; a++){
                        if ( i === 0 & a === 0 ) continue
                        if ( arr[x+i] == undefined) continue
                        if ( arr[x+i][y+a] == undefined) continue
                        if ( arr[x+i][y+a] ) neighbours += 1
                    }
                }
                if (arr[x][y]){
                    if( neighbours != 2 & neighbours != 3 ){
                        next[x][y] = false
                    }
                } else {
                    if( neighbours == 3){
                        next[x][y] = true
                    }
                }
            }
        }
        return next
    } else {
        return arr
    }
}

function render(){
    c.clearRect( 0, 0, width, height)    
    for ( let i in arr ){
        for ( let a in arr[i]){
            if(arr[i][a]){
                c.fillStyle = `#${Math.floor(i/width*res*4 + 5)}aa`
            } else{
                c.fillStyle = '#222'
            }
            c.fillRect( i*res, a*res, res-border, res-border)
        }
    }
}

function loop(){
    setTimeout(() => {
        requestAnimationFrame(loop)        
    }, 1000/fps);
    render()
    arr = update(arr)
}

loop()

let mouseX = 10000
let mouseY = 10000

canvas.addEventListener('mousemove', ( event)=>{
    mouseX = Math.floor(event.x/res)
    mouseY = Math.floor(event.y/res)
})

canvas.addEventListener('click', ()=>{
    arr[mouseX][mouseY] = !arr[mouseX][mouseY]
})

$('clear').addEventListener('click', ()=>{
    arr = arr.map((a)=>{
        return a.map((i)=>{
            return false
        })
    })
    playing = false
})

$('play').addEventListener('click', ()=>{
    playing = true
})

$('pause').addEventListener('click', ()=>{
    playing = false
})

$('randomize').addEventListener('click', ()=>{
    location.reload();
})
$('save').addEventListener('click', ()=>{
    localStorage.setItem( 'save', JSON.stringify(arr))
})
$('load').addEventListener('click', ()=>{
    arr = eval(localStorage.getItem( 'save'))
    write('arr')
})

















