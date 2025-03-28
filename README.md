# Testni Zadatak - React Native (Expo)

## Priprema zadatka

Prije nego što započnete s radom na zadatku, u direktoriju `../testni-zadatak` pokrenite sljedeću skriptu kako biste instalirali sve potrebne `node_modules` za ispravno funkcioniranje aplikacije:

```bash
npm run pripremi
```

Ova naredba će preuzeti i instalirati sve ovisnosti potrebne za pokretanje aplikacije.

## Opis projekta

Ovaj projekt je testni zadatak za implementaciju funkcionalnosti koristeći **React Native** i **Expo** framework. Projekt uključuje osnovne funkcionalnosti kao što su registracija, login korisnika, Bottom Tab navigacija, te pokušaj integracije Google Login-a pomoću **expo-auth-session**.

## Što je napravljeno ✅

### 1. Postavljanje projekta

- ✅ Projekt je postavljen koristeći **Expo** za razvoj aplikacije. 
- ✅ Implementirao sam **NativeWind** za osnovno stiliziranje komponenata poput inputa, gumba i naslova.
- ✅ Za API pozive koristi se **Axios** kako bi se olakšala interakcija s backendom.

### 2. Navigacija

- ✅ Implementirana je **Bottom Tab navigacija** s dvije osnovne stavke:
  - ✅ **Home**: Prazna stranica.
  - ✅ **Profile**: Stranica koja sadrži forme za login i registraciju.

### 3. Autentifikacija

- ✅ Implementirana je funkcionalnost **registracije** i **logina** korisnika.
  - ✅ Korisnici mogu unijeti **email** i **lozinku** za prijavu.
  - ✅ Nakon uspješne prijave prikazuje se pozdrav s korisničkim imenom.
  - ✅ Omogućeno je prebacivanje između forme za **login** i **registraciju**.
  - ✅ Korisnicima se omogućuje odjava pomoću **Logout** gumba, koji briše podatke o prijavi.

### 4. API za registraciju i login

- ✅ Koristi se backend API za **registraciju** i **login** korisnika:
  - ✅ **POST /api/app/auth/register** za registraciju korisnika.
  - ✅ **POST /api/app/auth/login** za prijavu korisnika.
- ✅ API odgovori vraćaju podatke o korisniku i JWT token koji se koristi za autentifikaciju.

### 5. Struktura projekta

✅ Projekt je organiziran prema preporučenoj strukturi kako bi se olakšala skalabilnost i održavanje:

```
/src
  /screens
    HomeScreen.tsx
    ProfileScreen.tsx
  /components
    AuthForm.tsx
    GoogleLogin.tsx  // Dodana komponenta za Google login
  /services
    api.ts        // Axios instance
    authService.ts // Login/Registration funkcije
    firebase.ts    // Servis za spajanje na firebase
  /navigation
    BottomTabs.tsx
App.tsx
```

### 6. Problem s implementacijom Google Login-a (BONUS)

- Na grani `master` imam implementiran **expo-auth-session** koristeći **useAuthRequest**, ali pri pokušaju autentifikacije aplikacija baca pogrešku:  
  **"Pogreška 400: invalid_request  
  Pojedinosti o zahtjevu:  
  flowName = GeneralOAuthFlow"**  
  Problem se čini vezanim uz konfiguraciju **expo-auth-session**.

- Na grani `LoginGrana` pokušao sam implementirati **Google Login** koristeći **expo-auth-session/providers/Google** i **useIdTokenAuthRequest**. Ovdje mi se uspješno otvara stranica za odabir Gmail računa, ali nakon odabira računa, aplikacija javlja:  
  **"Something went wrong trying to finish signing in. Please close this screen to go back to the app."**

- Zbog ovog problema smatram da je greška u **expo-auth-session**.  
- **redirectURI** i **clientID** su ispravni, a svi parametri su ispravno konfigurirani u **Google Console** i **Firebase-u**.


## Što još treba napraviti

### 1. Dovršiti Google Login implementaciju

- Trenutno pokušavam implementirati **Google Login** pomoću **expo-auth-session**. Iako odabir Google računa radi, autentifikacija nije uspješna zbog pogreške `400 invalid_request`. Ovaj problem treba istražiti i riješiti.

## Zaključak

Projekt je postavljen prema zahtjevima i implementirane su osnovne funkcionalnosti prijave i registracije. Trenutni izazov je dovršiti implementaciju **Google Login** koji ne radi kako se očekivalo zbog pogreške u konfiguraciji **expo-auth-session**. Nakon što se ovaj problem riješi, aplikacija će biti u potpunosti funkcionalna.
