# 🏓 Flappy Pong Game

Game arcade sederhana berbasis web yang menggabungkan mekanik pantulan bola dan rintangan. Dibuat menggunakan **JavaScript** dan library **p5.js**.

🔗 **[Mainkan Game Disini (Demo)](https://flappypongfanny.vercel.app/p)**
*(Ganti link di atas dengan link Vercel kamu yang asli)*

## 🎮 Cara Bermain

1.  **Kontrol Raket:** Gerakkan **Mouse** kamu untuk mengendalikan posisi raket.
2.  **Pantulkan Bola:** Jaga agar bola tetap memantul dan arahkan ke celah dinding.
3.  **Hindari Tabrakan:** Jangan sampai bola menabrak dinding (atas/bawah).
4.  **Health Bar:** Setiap kali menabrak, **HP (Health Point)** di atas bola akan berkurang. Jika habis, Game Over!
5.  **Cetak Skor:** Lewati celah dinding sebanyak mungkin untuk mendapatkan skor tertinggi.

## ✨ Fitur Utama

* **🌈 Colorful Walls:** Setiap dinding yang muncul memiliki warna acak yang berbeda-beda.
* **🎨 Aesthetic Design:** Dinding memiliki ujung yang tumpul (*rounded corners*) agar terlihat lebih halus dan modern.
* **❤️ Health System:** Sistem nyawa menggunakan Health Bar dinamis yang mengikuti bola.
* **Physics Movement:** Pergerakan bola dipengaruhi oleh gravitasi, gesekan (*friction*), dan momentum pantulan.
* **🏆 Score Tracking:** Menampilkan skor akhir saat Game Over.

## 🛠️ Teknologi yang Digunakan

* **HTML5 & CSS3:** Struktur dan tampilan dasar web.
* **JavaScript (p5.js):** Logika game, rendering grafis, dan fisika.

## 🚀 Cara Menjalankan di Komputer (Lokal)

Jika kamu ingin mencoba kode ini di komputermu sendiri:

1.  **Clone** repositori ini:
    ```bash
    git clone [https://github.com/username-kamu/Flappypong.git](https://github.com/username-kamu/Flappypong.git)
    ```
2.  Buka folder proyek.
3.  Klik dua kali file **`index.html`**.
4.  Game akan berjalan di browser kesayanganmu!

## 📂 Struktur File

* `index.html`: File utama yang memuat library p5.js dan canvas game.
* `sketch.js`: Seluruh logika permainan (Gameplay, Draw Loop, Class).

---

Dibuat dengan ❤️ untuk tugas Grafika komputer.
