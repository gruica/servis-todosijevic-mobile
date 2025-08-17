# 📱 Servis Todosijević - Mobile APK Distribution

> **Profesionalna mobilna aplikacija za upravljanje servisom belih dobara - automatsko kreiranje Android APK-ja kroz GitHub Actions**

## 🏢 O Aplikaciji

**Servis Todosijević** je napredna platforma za upravljanje servisom belih dobara (frižideri, veš mašine, sudijeri, špuretovi) sa kompletnom digitalizacijom procesa. Aplikacija omogućava:

- 👥 **Klijentski portal** - praćenje statusa servisa
- 🔧 **Serviseri panel** - mobilna aplikacija za tehnčare
- 🏢 **Admin panel** - kompletno upravljanje
- 📧 **Email/SMS notifikacije** - automatsko obaveštavanje
- 📊 **Izveštaji i analitika** - business intelligence

## 🚀 Automatsko APK Kreiranje

Ova GitHub repository omogućava **automatsko kreiranje Android APK-a** svaki put kada se kod ažurira.

### ⚙️ GitHub Actions Workflow

Da bi se aktivirao automatski build, kreirajte datoteku `.github/workflows/build-apk.yml`.

### 📦 Build Proces

- **Trigger**: Svaki push na `main` granu  
- **Trajanje**: 10-15 minuta
- **Rezultat**: APK datoteka dostupna za download

### 📱 APK Download

Posle uspešnog build-a, APK možete preuzeti iz **GitHub Releases** sekcije.

## 🔧 Tehničke Specifikacije

- **Frontend**: React.js + TypeScript
- **Backend**: Node.js + Express  
- **Database**: PostgreSQL + Drizzle ORM
- **Mobile**: Capacitor Android
- **Build**: GitHub Actions

© 2025 Frigo Sistem Todosijević. Sva prava zadržana.
