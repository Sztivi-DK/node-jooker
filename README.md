# Jooker API

A projekt a diplomamunkám keretében készült webalkalmazás, amely a Jooker rendezvénytechnikai szolgáltatásainak és referenciáinak kezelésére szolgál.

## A projekt kiindulási alapja

A fejlesztés egy korábban elkészített Jooker weboldalból indult ki.

A diplomamunka célja a meglévő rendszer továbbfejlesztése és korszerűsítése volt. A fejlesztés során a korábbi weboldal Node.js és Express alapú alkalmazássá alakult, az adatok kezelése MySQL adatbázisba került, elkészült egy védett adminisztrációs felület, majd az alkalmazás REST API végpontokkal egészült ki.

## Főbb fejlesztések

A projekt továbbfejlesztése során az alábbi főbb funkciók készültek el:

- MySQL adatbázis használata
- szolgáltatások adatbázisból történő kezelése
- referenciák adatbázisból történő kezelése
- szolgáltatások és referenciák összekapcsolása
- kapcsolatfelvételi űrlap és az üzenetek adatbázisban történő tárolása
- adminisztrációs felület
- admin bejelentkezés
- JWT alapú hitelesítés
- bcrypt alapú jelszókezelés
- szolgáltatások létrehozása, módosítása és deaktiválása
- referenciák létrehozása, módosítása és deaktiválása
- soft delete használata fizikai törlés helyett
- kapcsolatfelvételek megtekintése az admin felületen
- REST API kialakítása
- API végpontok JWT alapú védelme
- szerveroldali adatvalidáció

## Felhasznált technológiák

- Node.js
- Express
- MySQL
- mysql2
- EJS
- JSON Web Token (JWT)
- bcrypt
- cookie-parser
- dotenv
- Git
- GitHub
- Postman
- phpMyAdmin

## Adatbázis

Az alkalmazás MySQL adatbázist használ.

A főbb táblák:

- `users` – adminisztrátorok
- `services` – szolgáltatások
- `references` – referenciák
- `contacts` – kapcsolatfelvételek

A `references` tábla a `service_id` idegen kulcson keresztül kapcsolódik a `services` táblához.

A projekt soft delete megoldást használ. A szolgáltatások és referenciák törlésekor az adat fizikailag nem törlődik az adatbázisból, hanem az `active` mező értéke változik.

Az adatbázis SQL exportja a projekt `database` könyvtárában található.

## Telepítés és indítás

A repository letöltése vagy klónozása után telepíteni kell a szükséges Node.js csomagokat:

```bash
npm install
```

Ezután létre kell hozni a MySQL adatbázist, és importálni kell a `database` könyvtárban található SQL fájlt.

Az alkalmazás működéséhez `.env` fájl szükséges. Ez tartalmazza az adatbázis-kapcsolathoz és a JWT hitelesítéshez szükséges konfigurációt.

Példa:

```env
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=jooker

JWT_SECRET=
JWT_EXPIRE=
```

A tényleges `.env` fájl biztonsági okokból nem része a Git repositorynak.

Az alkalmazás indítása:

```bash
npm start
```

## REST API

### Szolgáltatások

```text
GET     /api/services
GET     /api/services/:id
POST    /api/services
PUT     /api/services/:id
DELETE  /api/services/:id
```

A GET végpontok publikusak. A POST, PUT és DELETE műveletek JWT hitelesítést igényelnek.

A DELETE kérés soft delete műveletet hajt végre.

### Referenciák

```text
GET     /api/references
GET     /api/references/:id
POST    /api/references
PUT     /api/references/:id
DELETE  /api/references/:id
```

A GET végpontok publikusak. A POST, PUT és DELETE műveletek JWT hitelesítést igényelnek.

A DELETE itt is soft delete műveletet jelent.

### Kapcsolatfelvételek

```text
GET     /api/contacts
GET     /api/contacts/:id
```

A kapcsolatfelvételek API-n keresztül csak megtekinthetők. Mindkét végpont JWT hitelesítést igényel.

## API hitelesítés

A védett API végpontok JWT tokent használnak.

A token Bearer tokenként küldhető az `Authorization` fejlécben:

```text
Authorization: Bearer <token>
```

Érvényes token nélkül a védett API végpontok `401 Unauthorized` választ adnak.

## HTTP státuszkódok

Az API a művelet eredményének megfelelő HTTP státuszkódokat használja:

- `200 OK` – sikeres lekérés vagy módosítás
- `201 Created` – sikeres létrehozás
- `400 Bad Request` – hibás vagy hiányos adatok
- `401 Unauthorized` – hiányzó vagy érvénytelen hitelesítés
- `404 Not Found` – a keresett erőforrás nem található

## Validáció

A szolgáltatások, referenciák és kapcsolatfelvételek adatai szerveroldali validáción mennek keresztül.

A validáció ellenőrzi többek között a kötelező mezőket, a mezők maximális hosszát és a kapcsolatfelvételnél az email cím formátumát.

## Adminisztráció

Az adminisztrációs felület csak sikeres bejelentkezés után érhető el.

Az adminisztrátor:

- kezelheti a szolgáltatásokat
- kezelheti a referenciákat
- megtekintheti a kapcsolatfelvételeket

A rendszer nem használ külön `role` mezőt, mivel a felhasználói adatbázis kizárólag adminisztrátorok kezelésére szolgál.

## A projekt célja

A fejlesztés célja egy korábbi weboldal továbbfejlesztése egy strukturált, adatbázis-alapú és API-n keresztül is használható alkalmazássá.

A projekt bemutatja a Node.js/Express backend fejlesztést, a MySQL adatkezelést, az MVC jellegű alkalmazásszervezést, a REST API kialakítását, a szerveroldali validációt, a JWT alapú hitelesítést és a soft delete működését.