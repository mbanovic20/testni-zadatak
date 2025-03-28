# Testni Zadatak - React Native (Expo)

## Priprema za zadatak

Prije nego što započnete code review i testiranje zadatka, slijedite ove korake za pripremu radnog okruženja:

1. **Klonirajte GitHub repozitorij**  
   Prvo, klonirajte repozitorij sa sljedećim naredbom:

   ```bash
   git clone https://github.com/vaš-korisnički-nalog/testni-zadatak.git
   ```

   Ova naredba će preuzeti cijeli repozitorij na vaš lokalni stroj.

2. **Uđite u direktorij projekta**  
   Nakon kloniranja repozitorija, prebacite se u direktorij projekta:

   ```bash
   cd testni-zadatak
   ```

3. **Pokrenite skriptu za instalaciju ovisnosti**  
   U direktoriju projekta, pokrenite sljedeću skriptu kako biste preuzeli sve potrebne `node_modules` ovisnosti:

   ```bash
   npm run pripremi
   ```

   Ova naredba će instalirati sve potrebne pakete koji su definirani u datoteci `package.json`, osiguravajući da aplikacija može ispravno funkcionirati.

4. **Pokrenite aplikaciju**  
   Nakon što su svi paketi instalirani, možete pokrenuti aplikaciju s:

   ```bash
   npm run android
   ```

   Ova naredba će pokrenuti aplikaciju na vašem lokalnom okruženju ili emulatoru.

Nakon ovih koraka, vaša aplikacija bit će spremna za rad i možete započeti s code review-om i testiranjem funkcionalnosti.

## Opis projekta

Ovaj projekt je testni zadatak za implementaciju funkcionalnosti koristeći **React Native** i **Expo** framework. Projekt uključuje osnovne funkcionalnosti kao što su registracija, login korisnika, Bottom Tab navigacija, te pokušaj integracije Google Login-a pomoću **expo-auth-session**.

✅ - u potpunosti dovršeno

🔶 - djelomično dovršeno / treba dovršiti ili doraditi

❌ - nije dovršeno

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

### 6. Problem s implementacijom Google Login-a (Bonus) 🔶

- 🔶 Na grani `master` imam implementiran **expo-auth-session** koristeći **useAuthRequest**, ali pri pokušaju autentifikacije aplikacija baca pogrešku:  
  **"Pogreška 400: invalid_request  
  Pojedinosti o zahtjevu:  
  flowName = GeneralOAuthFlow"**  
  Problem se čini vezanim uz konfiguraciju **expo-auth-session**.

- 🔶 Na grani `GoogleLogin` pokušao sam implementirati **Google Login** koristeći **expo-auth-session/providers/Google** i **useIdTokenAuthRequest**. Ovdje mi se uspješno otvara stranica za odabir Gmail računa, ali nakon odabira računa, aplikacija javlja:  
  **"Something went wrong trying to finish signing in. Please close this screen to go back to the app."**

- Zbog ovog problema smatram da je greška u **expo-auth-session**.  
- ✅ **redirectURI** i **clientID** su ispravni, a svi parametri su ispravno konfigurirani u **Google Console** i **Firebase-u**.

### 7. Validacija inputa (Bonus)

- ✅ U potpunosti napravljena validaciju inputa (email format, minimalna duljina lozinke).


### 8. Sekcija "Na što posebno paziti"

- ✅ Jasna i logična struktura projekta.
- ✅ Kod razdvojen po odgovornostima (zasebne komponente, servisi).
- ✅ Axios pravilno postavljen (baza URL, interceptori ako znaš).
- ✅ Postavljeni interceptori.
- ✅ Korektna provjera je li korisnik prijavljen (token u local storage / async storage).
- ✅ Korišten async storage.
- ✅ Prijava i registracija rade kako treba (provjeri greške, validacije itd.).
- ✅ NativeWind koristi se barem za osnovno stiliziranje.
- ✅ Logout briše podatke i resetira stanje.

## Što još treba napraviti ❌

### 1. Dovršiti Google Login implementaciju 🔶

- 🔶 Trenutno pokušavam implementirati **Google Login** pomoću **expo-auth-session**. Iako odabir Google računa radi, autentifikacija nije uspješna zbog pogreške `400 invalid_request`. Ovaj problem treba istražiti i riješiti.

## Zaključak

Projekt je postavljen prema zahtjevima i implementirane su osnovne funkcionalnosti prijave i registracije. Trenutni izazov je dovršiti implementaciju **Google Login** koji ne radi kako se očekivalo zbog pogreške u konfiguraciji **expo-auth-session**. Nakon što se ovaj problem riješi, aplikacija će biti u potpunosti funkcionalna. Potrebno vrijeme za proučavanje materijala, implementaciju programskog rješenja i izradu procjenjujem na oko **20 sati**. Najveći dio vremena utrošen je na implementaciju **Google Login-a**, zbog izazova u konfiguraciji **expo-auth-session**, koji je trenutno glavni problem koji treba riješiti.
