// Animasi awan dan gelombang besar bertumpuk
window.addEventListener('DOMContentLoaded', function() {
    // Buat waveContainer dulu
    let waveContainer = document.getElementById('wave-container');
    if (!waveContainer) {
        waveContainer = document.createElement('div');
        document.body.appendChild(waveContainer);
    }
    waveContainer.style.position = 'fixed';
    waveContainer.style.left = '0';
    waveContainer.style.width = '100vw';
    waveContainer.style.pointerEvents = 'none';
    waveContainer.style.overflow = 'hidden';


    // Tambahkan animasi gelombang di bawah
    waveContainer.style.bottom = '0';
    waveContainer.style.height = '260px';
    waveContainer.style.zIndex = '0';

    let canvas1 = document.createElement('canvas');
    let canvas2 = document.createElement('canvas');
    canvas1.style.position = 'absolute';
    canvas2.style.position = 'absolute';
    canvas1.style.left = canvas2.style.left = '0';
    canvas1.style.top = canvas2.style.top = '0';
    canvas1.style.width = canvas2.style.width = '100vw';
    canvas1.style.height = canvas2.style.height = '260px';
    waveContainer.appendChild(canvas1);
    waveContainer.appendChild(canvas2);

    function resize() {
        canvas1.width = canvas2.width = window.innerWidth;
        canvas1.height = canvas2.height = 260;
    }
    window.addEventListener('resize', resize);
    resize();

    // Gelombang utama (besar)
    function drawWave(ctx, t, color, opacity, amp, freq, offsetY) {
        ctx.clearRect(0,0,canvas1.width,canvas1.height);
        ctx.beginPath();
        for(let x=0;x<=canvas1.width;x++){
            let y = offsetY + amp*Math.sin((x/freq)*2*Math.PI + t) + 40*Math.sin((x/300)*2*Math.PI + t*0.7);
            if(x===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        ctx.lineTo(canvas1.width,canvas1.height);
        ctx.lineTo(0,canvas1.height);
        ctx.closePath();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    // Gelombang kedua (tumpuk)
    function drawWave2(ctx, t, color, opacity, amp, freq, offsetY) {
        ctx.clearRect(0,0,canvas2.width,canvas2.height);
        ctx.beginPath();
        for(let x=0;x<=canvas2.width;x++){
            let y = offsetY + amp*Math.sin((x/freq)*2*Math.PI + t*1.2) + 30*Math.sin((x/200)*2*Math.PI + t*0.5);
            if(x===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        ctx.lineTo(canvas2.width,canvas2.height);
        ctx.lineTo(0,canvas2.height);
        ctx.closePath();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    let t = 0;
    function animate() {
        drawWave(canvas1.getContext('2d'), t, '#7bdcb5', 0.8, 60, 600, 180);
        drawWave2(canvas2.getContext('2d'), t, '#8ed1fc', 0.6, 40, 400, 210);
        t += 0.02;
        requestAnimationFrame(animate);
    }
    animate();


    animateCloud();
    animate();

    // Cloud animation untuk #cloud-container
    function createCloud(parent, left, top, scale, opacity) {
        var cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.position = 'absolute';
        cloud.style.left = left + 'px';
        cloud.style.top = top + 'px';
        cloud.style.transform = 'scale(' + scale + ')';
        cloud.style.opacity = opacity;
        parent.appendChild(cloud);
    }

    function renderClouds() {
        var container = document.getElementById('cloud-container');
        if (!container) return;
        container.style.position = 'relative';
        container.style.width = '100vw';
        container.style.height = '80px'; // pastikan tinggi cukup
        container.style.zIndex = '1';
        container.innerHTML = '';
        // Tambahkan beberapa cloud dengan posisi dan ukuran berbeda
        createCloud(container, 20, 10, 1, 0.8);
        createCloud(container, 120, 30, 0.7, 0.6);
        createCloud(container, 220, 15, 1.2, 0.7);
        createCloud(container, 320, 40, 0.9, 0.5);
    }

    // CSS untuk cloud
    var style = document.createElement('style');
    style.innerHTML = `
    .cloud {
      width: 80px;
      height: 50px;
      background: #fff;
      border-radius: 50px;
      box-shadow: 30px 10px 0 0 #fff, 60px 10px 0 0 #fff, 45px 25px 0 0 #fff;
      transition: box-shadow 0.3s;
    }
    #cloud-container {
      width: 100vw;
      height: 80px;
      position: relative;
      z-index: 1;
    }
    `;
    document.head.appendChild(style);

    // Render cloud saat halaman siap
    function tryRenderClouds() {
        if (document.getElementById('cloud-container')) {
            renderClouds();
        } else {
            setTimeout(tryRenderClouds, 100);
        }
    }
    tryRenderClouds();
});