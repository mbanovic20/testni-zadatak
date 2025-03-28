# Testni Zadatak - React Native (Expo)

## Opis projekta

Ovaj projekt je testni zadatak za implementaciju funkcionalnosti koristeći **React Native** i **Expo** framework. Projekt uključuje osnovne funkcionalnosti kao što su registracija, login korisnika, Bottom Tab navigacija, te pokušaj integracije Google Login-a pomoću **expo-auth-session**.

## Što je napravljeno

### 1. Postavljanje projekta

- Projekt je postavljen koristeći **Expo** za razvoj aplikacije.
- Implementirao sam **NativeWind** za osnovno stiliziranje komponenata poput inputa, gumba i naslova.
- Za API pozive koristi se **Axios** kako bi se olakšala interakcija s backendom.

### 2. Navigacija

- Implementirana je **Bottom Tab navigacija** s dvije osnovne stavke:
  - **Home**: Prazna stranica.
  - **Profile**: Stranica koja sadrži forme za login i registraciju.

### 3. Autentifikacija

- Implementirana je funkcionalnost **registracije** i **logina** korisnika.
  - Korisnici mogu unijeti **email** i **lozinku** za prijavu.
  - Nakon uspješne prijave prikazuje se pozdrav s korisničkim imenom.
  - Omogućeno je prebacivanje između forme za **login** i **registraciju**.
  - Korisnicima se omogućuje odjava pomoću **Logout** gumba, koji briše podatke o prijavi.

### 4. API za registraciju i login

- Koristi se backend API za **registraciju** i **login** korisnika:
  - **POST /api/app/auth/register** za registraciju korisnika.
  - **POST /api/app/auth/login** za prijavu korisnika.
- API odgovori vraćaju podatke o korisniku i JWT token koji se koristi za autentifikaciju.

### 5. Struktura projekta

Projekt je organiziran prema preporučenoj strukturi kako bi se olakšala skalabilnost i održavanje:

```
/src
  /screens
    HomeScreen.tsx
    ProfileScreen.tsx
  /components
    AuthForm.tsx
  /services
    api.ts        // Axios instance
    authService.ts // Login/Registration funkcije
  /navigation
    BottomTabs.tsx
App.tsx
```

### 6. Problem s implementacijom Google Login-a (BONUS)

- Na grani `GoogleLogin` pokušao sam implementirati **Google Login** koristeći **expo-auth-session** i **expo-auth-session/providers/Google**.
- Implementacija koristi **useIdCredentialsToken** za odabir Google računa.
- Iako odabrani Google računi prolaze, aplikacija prikazuje pogrešku `400 invalid_request` prilikom pokušaja autentifikacije.
- **redirectURI** i **clientId** su ispravno postavljeni, a problem se vjerojatno odnosi na konfiguraciju **expo-auth-session**.
- Firebase projekt je ispravno postavljen, no integracija s **expo-auth-session** nije u potpunosti funkcionalna.
- Dodana **validacija inputa** (provjera formata emaila, minimalna duljina lozinke) za **login** i **registraciju** korisnika.

## Što još treba napraviti

### 1. Dovršiti Google Login implementaciju

- Trenutno pokušavam implementirati **Google Login** pomoću **expo-auth-session**. Iako odabir Google računa radi, autentifikacija nije uspješna zbog pogreške `400 invalid_request`. Ovaj problem treba istražiti i riješiti.

## Zaključak

Projekt je postavljen prema zahtjevima i implementirane su osnovne funkcionalnosti prijave i registracije. Trenutni izazov je dovršiti implementaciju **Google Login** koji ne radi kako se očekivalo zbog pogreške u konfiguraciji **expo-auth-session**. Nakon što se ovaj problem riješi, aplikacija će biti u potpunosti funkcionalna.
