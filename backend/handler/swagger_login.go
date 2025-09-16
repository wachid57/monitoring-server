package handler

import (
    "github.com/gofiber/fiber/v2"
)

func SwaggerLoginPage(c *fiber.Ctx) error {
    return c.Type("html").SendString(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Swagger Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    min-height: 100vh;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                }
                .wave {
                    position: absolute;
                    left: 0; right: 0; bottom: 0;
                    width: 100%; height: 200px;
                }
                .login-card {
                    background: rgba(255,255,255,0.95);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(25, 118, 210, 0.2);
                }
                .login-title {
                    color: #1976d2;
                    font-weight: 700;
                }
                .btn-primary {
                    background: linear-gradient(90deg, #20bc9dff 0%, #1abc9c 100%);
                    border: none;
                }
                .btn-primary:hover, .btn-primary:focus {
                    background: linear-gradient(90deg, #20c6a5ff 0%, #1bc6a4ff 100%);
                }
            </style>
        </head>
        <body>
            <div class="container d-flex justify-content-center align-items-center" style="height: 100vh; position: relative; z-index: 2;">
                <div class="login-card shadow p-4" style="min-width:350px;">
                    <h3 class="login-title text-center mb-4">Swagger Login</h3>
                    <form method="POST" action="/docs/v1.0/login">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input name="username" type="text" class="form-control" id="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input name="password" type="password" class="form-control" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            <script>
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
                    style.innerHTML =
                        '.cloud {' +
                        'width: 80px;' +
                        'height: 50px;' +
                        'background: #fff;' +
                        'border-radius: 50px;' +
                        'box-shadow: 30px 10px 0 0 #fff, 60px 10px 0 0 #fff, 45px 25px 0 0 #fff;' +
                        'transition: box-shadow 0.3s;' +
                        '}' +
                        '#cloud-container {' +
                        'width: 100vw;' +
                        'height: 80px;' +
                        'position: relative;' +
                        'z-index: 1;' +
                        '}';
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
            </script>
        </body>
        </html>
    `)
}
