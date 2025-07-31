# Multimedia Studio

Multimedia Studio adalah aplikasi desktop modern yang dirancang untuk alur kerja kreatif, memungkinkan pengguna untuk mengedit video, audio, dan lainnya dalam satu lingkungan yang terintegrasi. Dibangun dengan Electron dan React, aplikasi ini menawarkan antarmuka yang responsif, modular, dan ramah pengguna.

## ✨ Fitur Utama

- **Editor Berbasis Timeline:** Tambahkan aset ke trek video dan audio melalui seret dan lepas (*drag-and-drop*).
- **Manajemen Aset:** Impor dan kelola file video, audio, dan gambar Anda dengan mudah di Pustaka Aset.
- **Antarmuka Kontekstual:** Panel Inspektur secara dinamis menampilkan properti untuk item yang dipilih.
- **Command Palette:** Akses cepat ke semua fungsi aplikasi dengan palet perintah seperti pada editor kode modern (`Ctrl+Shift+P`).
- **Tema Terang & Gelap:** Sesuaikan antarmuka sesuai preferensi visual Anda untuk kenyamanan kerja.
- **Sadar Jaringan:** Aplikasi mendeteksi status koneksi online/offline dan menonaktifkan fitur berbasis cloud jika diperlukan.
- **Modular & Dapat Diperluas:** Arsitektur yang bersih memungkinkan penambahan fitur baru seperti editor gambar, studio animasi, atau modul kustom lainnya.

*(Placeholder untuk tangkapan layar aplikasi)*
![App Screenshot](https://via.placeholder.com/800x450.png?text=Multimedia+Studio+Interface)

---

## 🏗️ Arsitektur & Teknologi

Aplikasi ini dirancang dengan pendekatan modular untuk memastikan skalabilitas dan kemudahan pemeliharaan.

### Arsitektur Modular

Setiap fungsionalitas utama diisolasi dalam modulnya sendiri, yang terletak di bawah `src/modules`. State global dikelola menggunakan React Context untuk memisahkan logika bisnis dari UI.

- **`AssetContext`**: Mengelola semua aset media yang diimpor.
- **`TimelineContext`**: Mengelola state trek dan klip di timeline.
- **`SelectionContext`**: Melacak item (klip, aset) yang sedang dipilih pengguna.
- **`ThemeContext`**: Mengelola tema UI (terang/gelap).
- **`NetworkContext`**: Memantau status koneksi jaringan.

### Tumpukan Teknologi (Tech Stack)

- **Framework Aplikasi:** [Electron](https://www.electronjs.org/) - Untuk membangun aplikasi desktop lintas platform dengan JavaScript, HTML, dan CSS.
- **Library UI:** [React.js](https://reactjs.org/) - Untuk membangun antarmuka pengguna yang interaktif dan berbasis komponen.
- **Manajemen Paket:** [npm](https://www.npmjs.com/)
- **Styling:** CSS-in-JS & Variabel CSS untuk tema.
- **Core Engine (Direncanakan):**
  - **Video:** FFmpeg.js / WASM
  - **Audio:** Web Audio API

---

## 🚀 Panduan Memulai

Ikuti langkah-langkah ini untuk menjalankan aplikasi di lingkungan pengembangan Anda.

### Prasyarat

- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru direkomendasikan)
- [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)

### Instalasi

1.  **Kloning repositori ini:**
    ```bash
    git clone https://github.com/your-username/multimedia-studio.git
    cd multimedia-studio
    ```

2.  **Instal semua dependensi:**
    ```bash
    npm install
    ```

### Menjalankan Aplikasi

Untuk memulai aplikasi dalam mode pengembangan, jalankan perintah berikut:

```bash
npm start
```

Ini akan memulai aplikasi Electron dan membuka jendela utama.

---

## 📁 Struktur Proyek

```
/
├── bin/                  # Untuk binary eksternal (ffmpeg, dll.)
│   ├── ffmpeg/
│   ├── virtual-audio/
│   └── virtual-camera/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/       # Komponen UI Generik
│   │   ├── audio-mixer/
│   │   ├── command-palette/
│   │   ├── inspector-panel/
│   │   ├── layout/
│   │   ├── network-status/
│   │   ├── program-preview/
│   │   ├── recording/
│   │   ├── source-selector/
│   │   └── text-editor/
│   ├── context/          # State management global
│   │   ├── AssetContext.js
│   │   ├── InputContext.js
│   │   ├── NetworkContext.js
│   │   ├── SelectionContext.js
│   │   ├── SwitcherContext.js
│   │   └── TimelineContext.js
│   ├── core-engine/      # (Direncanakan) Logika inti pemrosesan media
│   ├── hooks/            # Custom React Hooks
│   │   └── useSettings.js
│   ├── modules/          # Komponen fungsional utama (fitur)
│   │   ├── asset-library/
│   │   ├── input-manager/
│   │   └── settings/
│   ├── services/         # Logika bisnis terpisah (OOP Model)
│   │   ├── RecordingService.js
│   │   └── SettingsService.js
│   ├── App.js            # Komponen root aplikasi
│   ├── index.js          # Titik masuk untuk proses renderer React
│   └── theme.css         # Variabel CSS untuk tema
├── .babelrc              # Konfigurasi Babel
├── .gitignore
├── jest.config.js        # Konfigurasi Jest
├── jest.setup.js         # Setup untuk tes Jest
├── main.js               # Titik masuk untuk proses utama Electron
├── package.json
├── preload.js            # Skrip jembatan antara proses utama dan renderer
└── webpack.config.js     # Konfigurasi Webpack
```
