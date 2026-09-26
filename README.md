# 🎮 RANZ GAMING — Mobile Legends TikTok Live Streaming Overlay

Overlay streaming Mobile Legends vertikal (9:16 - 1080×1920) dengan desain **Esports Cinematic Premium (Dark Black + Electric Blue + Gold)**, animasi mulus 60 FPS, arsitektur data reaktif, dan **bebas dari data dummy palsu**.

---

## 🏆 Spesifikasi Utama

- **Branding**: RANZ GAMING
- **TikTok**: `@rranggaz_`
- **Slogan**: `PLAY • IMPROVE • BE BETTER`
- **Resolusi Asli**: `1080 × 1920` (9:16 Portrait)
- **Tema Visual**: Dark Black (`#05070B`), Electric Blue (`#00e5ff`), Premium Gold (`#ffd700`), Clean White
- **Fitur Animasi (60 FPS GPU-Accelerated)**:
  - **Border Light Beam**: Cahaya biru-emas bergerak memutari frame gameplay (`TOP -> RIGHT -> BOTTOM -> LEFT -> TOP`).
  - **Hero Mobile Legends Animated**: Layer hero melayang perlahan (*floating parallax*), *energy aura breathing*, dan *particle lighting*.
  - **Stardust Particle System**: Partikel cahaya halus mengambang dengan optimasi performa tinggi.
  - **Real-time Data Adapter**: Tidak ada nama atau chat palsu hardcoded; siap dihubungkan ke TikFinity / TikTok Live Connector / WebSocket.
  - **OBS Transparent Mode**: Mendukung mode transparan penuh agar layar game dan kamera langsung menyatu tanpa batas.

---

## 📂 Struktur Project

```
ranz-gaming-overlay/
├── index.html                   # Entrypoint aplikasi utama
├── README.md                    # Dokumentasi lengkap
├── config/
│   └── streamConfig.js          # Konfigurasi nama, tema, hero, saweria
├── data/
│   └── state.js                 # State store reaktif (Zero dummy data)
├── adapters/
│   └── liveDataAdapter.js       # Abstraction layer API/WebSocket
├── components/
│   ├── header.js                # Header RANZ GAMING, jam, live pulse, viewer
│   ├── gameplayFrame.js         # Frame 16:9 gameplay + running light beam
│   ├── heroLayer.js             # Layer hero MLBB animasi floating
│   ├── tickerBar.js             # Running marquee ticker berjalan
│   ├── webcamFrame.js           # Frame webcam transparan "WEBCAM | RANZ"
│   ├── chatPanel.js             # Dynamic chat (empty state: "Menunggu chat...")
│   ├── infoCards.js             # Cards: Follower, Sub, Donation, Top Donor, QR
│   └── settingsPanel.js         # Settings drawer (tombol 'S' atau roda gigi)
├── animations/
│   └── animationManager.js      # Engine partikel & transisi angka 60 FPS
├── styles/
│   └── main.css                 # Styling esport, keyframe, responsive
└── assets/
    ├── heroes/                  # Asset artwork hero (hero_warrior.png)
    ├── bg/                      # Background arena esport (esports_arena.jpg)
    └── saweria_qr.png           # Gambar QR Saweria Anda
```

---

## 🚀 1. Cara Menjalankan di TikTok Live Studio / OBS Studio

### Opsi A: Mode Full Overlay (Dengan Background Arena Esport)
1. Buka **TikTok Live Studio** atau **OBS Studio**.
2. Klik tombol **Tambah Sumber (+)** ➔ Pilih **Browser / Sumber Browser**.
3. Centang **Custom Resolution / Resolusi Khusus**:
   - **Width (Lebar)**: `1080`
   - **Height (Tinggi)**: `1920`
4. Masukkan URL:
   ```text
   https://idranggapratama-eng.github.io/rranggaz-tiktok-overlay/?obs=true
   ```
   *Atau URL lokal jika dijalankan di PC sendiri:*
   ```text
   file:///C:/Users/idran/.gemini/antigravity/scratch/ranz-gaming-overlay/index.html?obs=true
   ```
5. Letakkan layer Browser ini di **atas layer gameplay** Anda.

---

### Opsi B: Mode Transparent Overlay (Hanya Bingkai, Animasi & HUD)
Jika Anda ingin latar belakang transparan murni dan hanya menampilkan border gameplay neon, kartu webcam, chat, hero, dan info panels:
1. Tambahkan parameter `?mode=transparent&obs=true` pada URL:
   ```text
   https://idranggapratama-eng.github.io/rranggaz-tiktok-overlay/?mode=transparent&obs=true
   ```
2. Seluruh background panggung akan menjadi transparan 100%, sehingga hanya elemen HUD esports yang tampil melayang di atas live stream Anda.

---

## 🦸‍♂️ 2. Cara Mengganti Asset Hero Mobile Legends

1. Siapkan gambar hero Mobile Legends berformat **PNG transparan** (misal: Chou, Gusion, Fanny, Alucard, Ling).
2. Simpan gambar tersebut ke dalam folder:
   `ranz-gaming-overlay/assets/heroes/nama_hero_anda.png`
3. Buka file `config/streamConfig.js` dan ubah path-nya:
   ```javascript
   hero: {
     enabled: true,
     name: "Gusion",
     src: "assets/heroes/nama_hero_anda.png",
     ...
   }
   ```
4. Atau tekan tombol **'S'** saat membuka overlay di browser untuk mengganti/mematikan hero langsung dari Settings Drawer.

---

## 📱 3. Cara Mengubah Username TikTok & Streamer Name

Buka file `config/streamConfig.js` dan sesuaikan data Anda:
```javascript
export const streamConfig = {
  streamerName: "RANZ GAMING",
  gameTitle: "MOBILE LEGENDS: BANG BANG",
  tiktokUsername: "@rranggaz_",
  tagline: "PLAY • IMPROVE • BE BETTER",
  ...
};
```
Perubahan juga dapat dilakukan secara *live* tanpa reload melalui panel **Settings** (Tekan huruf **`S`** pada keyboard).

---

## 🔌 4. Cara Menghubungkan API / WebSocket (TikFinity / TikTokLiveConnector)

Overlay ini menggunakan arsitektur **`LiveDataAdapter`** yang memisahkan tampilan UI dari sumber data.

### Contoh Menghubungkan WebSocket (TikFinity / Node.js Connector):
Buka file `adapters/liveDataAdapter.js` atau panggil dari script luar:
```javascript
import { liveDataAdapter } from './adapters/liveDataAdapter.js';

// Hubungkan ke server WebSocket lokal TikTok Live Connector
liveDataAdapter.connectWebSocket('ws://localhost:21213/');
```

### Format Payload yang Didukung Otomatis:
- **Chat Pesan**: `{ type: "chat", user: "BangJago", text: "GG Alucardnya!" }`
- **Follower Baru**: `{ type: "follow", user: "RanggaFans" }`
- **Donasi / Gift**: `{ type: "gift", user: "Sultan", diamondCount: 100, giftName: "Mawar" }`
- **Viewer Count**: `{ type: "viewers", count: 1250 }`

Jika data belum masuk, UI akan **secara aman dan bersih menampilkan tanda `-` atau `"Menunggu chat..."`** tanpa pernah memunculkan data bot/dummy palsu!

---

## 🎨 5. Mengatur & Mematikan Animasi untuk Menghemat Performa

Di dalam file `config/streamConfig.js`:
```javascript
animations: {
  borderSweep: true,        // Animasi cahaya memutari frame gameplay
  heroFloating: true,       // Animasi hero melayang perlahan
  particleSystem: true,     // Partikel stardust di background
  equalizer: true,          // Visualizer equalizer di bawah game
  particleCount: 32         // Jumlah partikel (dibatasi agar tetap 60 FPS)
}
```

Semua animasi menggunakan akselerasi GPU hardware (`transform: translate3d`, `opacity`, dan `will-change`) sehingga sangat ringan dan ramah untuk PC streaming.
