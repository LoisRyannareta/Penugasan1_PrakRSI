# 🍽️ RestoByte - Sistem Kasir Restoran (Kelompok 2)

Repositori ini dibuat untuk memenuhi tugas praktikum mata kuliah **Rekayasa Sistem Informasi**. Proyek ini merupakan tampilan sistem manajemen kasir digital bernama **RestoByte**, yang memisahkan arsitektur *Frontend* dan *Backend* .

---

### Tech Stack yang Digunakan:
* **Backend:** Python + Poetry (Package Manager) + FastAPI (Web Framework)
* **Frontend:** React + Next.js (Tailwind CSS untuk styling)
* **Version Control:** Git & GitHub

---

## 👥 Kontributor Kelompok 2

Semua anggota kelompok berkontribusi aktif dalam repositori ini melalui pembagian branch kerja, pembuatan fitur, sinkronisasi repositori (pull/push), hingga dokumentasi.

| Nama Mahasiswa | NIM | Kontribusi Spesifik di Proyek |
| :--- | :---: | :--- |
| **Lois Ryannareta** | L0224006 | Repository setup (inisialisasi) |
| **Rambat Ungu Aryati** | L0224010 | Backend setup, Integrasi Repository |
| **Yoeke Sekti Pertiwi** | L0224027 | Frontend setup |
| **Adeliya Putri Hapsari** | L0224029 | Frontend Integration |
| **Rafah Taqy Arrahman** | L0224047 | Backend CRUD |

---

## 🛠️ Langkah-Langkah Pengerjaan Praktikum

Berikut rangkuman aktivitas teknis yang dikerjakan oleh Kelompok 2:

### 1. Inisialisasi Git dan Branching
* Menginisialisasi repositori utama di GitHub.
* Membuat branch bernama feat/* sesuai dengan tugas yang diperoleh
* Membuat struktur branch utama: `backend` dan `frontend` untuk mengisolasi lingkungan kerja.

### 2. Pengembangan Backend (`/backend`)
* Menggunakan **Poetry** untuk inisialisasi manajemen dependensi Python.
* Menggunakan **FastAPI** dengan server (`http://127.0.0.1:8000/docs`).
* Membuat API Berbasis RESTful (GET, POST, PUT, DELETE) untuk manajemen item menu:
  * Nasi Goreng (Food) - Rp 15.000
  * Mie Ayam (Food) - Rp 12.000
  * Es Teh (Drink) - Rp 3.000

### 3. Pengembangan Frontend (`/frontend`)
* Inisialisasi aplikasi menggunakan **React + Next.js** (`localhost:3000`).
* Membuat Homepage interaktif "RestoByte" dengan fitur kartu menu makanan dan keranjang belanja otomatis.

### 4. Aktivitas Git & GitHub
Aktivitas penggabungan fitur-fitur anggota kelompok terdokumentasi dengan runtutan perintah Command Prompt berikut:
* **Sinkronisasi Kode (`git pull` & `git fetch`):**
  Mengambil pembaruan terbaru di server GitHub kelompok (`dev` dan branch fitur) ke komputer lokal secara berkala.
* **Penggabungan Branch Fitur (`git merge`):**
  Menggabungkan branch mandiri ke branch integrasi (`dev`) untuk menyelaraskan pekerjaan backend-crud, frontend-setup, dan frontend-integration.
* **Resolusi Konflik Kode (*Resolving Conflicts*):**
  Saat terjadi bentrokan kode di file `page.tsx` (frontend) dan `main.py` (backend), penyelesaian dilakukan menggunakan `git checkout --ours .`, menandai hasil penyelesaian via `git add .`, dan melakukan komit pesan resolusi konflik: `git commit -m "resolve conflict: keep frontend-integration changes"`.
* **Push Hasil Integrasi Akhir ke Produksi (`git push`):**
  Setelah seluruh fitur tim di branch `dev` stabil, dilakukan pengalihan ke branch utama (`git checkout main`), digabungkan secara penuh (`git merge dev`), dan diunggah ke GitHub lewat perintah `git push origin main`.

---

## 📄 Pengumpulan Berkas Praktikum

Berikut adalah tautan pengumpulan akhir pengerjaan praktikum:

* **Link Repositori GitHub:** [https://github.com/LoisRyannareta/Penugasan1_PrakRSI]

---
*Praktikum Rekayasa Sistem Informasi - Program Studi Sains Data*