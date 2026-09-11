# Jooker – Fejlesztési napló

## 1. A dokumentum célja

Ez a dokumentum a Jooker diplomamunka fejlesztési folyamatának rövid összefoglalása.

Célja, hogy elkülöníthető legyen:

- milyen rendszerből indult a fejlesztés;
- milyen funkciók készültek el a diplomamunka során;
- milyen technikai megoldásokat alkalmaz a jelenlegi rendszer;
- milyen további fejlesztési lehetőségek merültek fel.

A továbbfejlesztési javaslatok nem a jelenlegi rendszer elkészült funkciói, hanem a projekt későbbi bővítésének lehetséges irányai.

---

## 2. Kiindulási állapot

A diplomamunka fejlesztése egy korábban elkészített Jooker weboldalból indult ki.

A cél nem egy teljesen új rendszer létrehozása volt, hanem a meglévő alkalmazás továbbfejlesztése és korszerűsítése.

A fejlesztés során törekedtünk arra, hogy a meglévő projekt használható részei megmaradjanak, miközben az alkalmazás adatkezelése és szerkezete fokozatosan átalakul.

A fő fejlesztési célok a következők voltak:

- az adatok MySQL adatbázisba szervezése;
- a szolgáltatások és referenciák dinamikus kezelése;
- adminisztrációs funkciók kialakítása;
- hitelesített admin hozzáférés létrehozása;
- szerveroldali validáció;
- soft delete használata;
- az alkalmazás REST API végpontokkal történő kibővítése.

---

## 3. Adatbázis kialakítása

Az alkalmazás MySQL adatbázist használ.

A rendszer főbb adattáblái:

- `users`
- `services`
- `references`
- `contacts`

A `users` tábla az adminisztrátori hozzáféréshez szükséges adatokat tárolja.

A `services` tábla a szolgáltatások adatait tartalmazza.

A `references` tábla a referenciamunkákat tárolja. A referenciák a `service_id` idegen kulcson keresztül kapcsolódnak a szolgáltatásokhoz.

A `contacts` tábla a weboldal kapcsolatfelvételi űrlapján beküldött üzenetek tárolására szolgál.

Az adatbázis exportja a projekt `database/jooker.sql` fájljában található.

---

## 4. Soft delete

A szolgáltatások és referenciák kezelésénél fizikai törlés helyett soft delete megoldás készült.

A rekordok az adatbázisból nem törlődnek, hanem az `active` mező segítségével inaktív állapotba kerülnek.

Ennek előnye, hogy a korábban létrehozott adatok megmaradnak az adatbázisban, és szükség esetén visszaállíthatók.

A szolgáltatások és referenciák kapcsolata miatt további kezelés készült arra az esetre is, amikor egy szolgáltatás deaktiválása miatt a hozzá tartozó referenciák is inaktívvá válnak.

A `deactivated_by_service` mező segítségével megkülönböztethető a közvetlenül deaktivált referencia attól, amely a hozzá tartozó szolgáltatás deaktiválása miatt vált inaktívvá.

---

## 5. Adminisztrációs felület

A projektben védett adminisztrációs felület készült.

Az adminisztrátor a felületen:

- megtekintheti a szolgáltatásokat;
- új szolgáltatást hozhat létre;
- módosíthatja a szolgáltatásokat;
- deaktiválhatja és visszaállíthatja a szolgáltatásokat;
- megtekintheti a referenciákat;
- új referenciát hozhat létre;
- módosíthatja a referenciákat;
- deaktiválhatja és visszaállíthatja a referenciákat;
- megtekintheti a beérkezett kapcsolatfelvételeket.

A rendszerben nincsenek hagyományos regisztrált felhasználók és különböző felhasználói szerepkörök. A `users` tábla az adminisztrátori hozzáférés kezelésére szolgál, ezért külön `role` mező nem került kialakításra.

---

## 6. Hitelesítés

Az adminisztrációs felület JWT alapú hitelesítést használ.

Sikeres bejelentkezés után a rendszer JWT tokent hoz létre.

A webes adminfelület esetén a token HTTP-only cookie-ban tárolható és a védett admin útvonalak middleware segítségével ellenőrzik annak érvényességét.

A jelszavak nem egyszerű szövegként kerülnek tárolásra. A rendszer bcrypt használatával ellenőrzi az adatbázisban tárolt jelszóhasheket.

Az API számára külön hitelesítési middleware készült, amely hibás vagy hiányzó token esetén nem weboldalra irányít át, hanem megfelelő JSON választ és HTTP státuszkódot küld.

---

## 7. Validáció

A rendszer szerveroldali validációt használ.

Külön validáció készült többek között:

- szolgáltatásokhoz;
- referenciákhoz;
- kapcsolatfelvételekhez.

A validátorok ellenőrzik a szükséges mezők meglétét és a meghatározott mezőhosszúsági korlátokat.

A kapcsolatfelvételnél az e-mail-cím formátuma is ellenőrzésre kerül.

A validáció célja, hogy hibás vagy hiányos adatok ne kerüljenek feldolgozásra.

---

## 8. REST API kialakítása

A meglévő alkalmazás REST API végpontokkal került kibővítésre.

### 8.1. Services API

A szolgáltatásokhoz a következő végpontok készültek:

```text
GET     /api/services
GET     /api/services/:id
POST    /api/services
PUT     /api/services/:id
DELETE  /api/services/:id
```

A GET végpontok publikusak.

A POST, PUT és DELETE műveletek JWT hitelesítést igényelnek.

A DELETE művelet nem fizikai törlést, hanem soft delete műveletet hajt végre.

### 8.2. References API

A referenciákhoz a következő végpontok készültek:

```text
GET     /api/references
GET     /api/references/:id
POST    /api/references
PUT     /api/references/:id
DELETE  /api/references/:id
```

A GET végpontok publikusak.

A POST, PUT és DELETE műveletek JWT hitelesítést igényelnek.

A DELETE ebben az esetben is soft delete művelet.

### 8.3. Contacts API

A kapcsolatfelvételekhez a következő végpontok készültek:

```text
GET     /api/contacts
GET     /api/contacts/:id
```

A kapcsolatfelvételek API-n keresztül csak megtekinthetők.

Mivel ezek személyes adatokat és a látogatók által küldött üzeneteket tartalmazhatnak, mindkét végpont JWT hitelesítést igényel.

---

## 9. HTTP válaszok

Az API a műveletek eredményét HTTP státuszkódokkal is jelzi.

A jelenlegi rendszerben használt fontosabb státuszkódok:

- `200 OK` – sikeres lekérés vagy módosítás;
- `201 Created` – sikeres létrehozás;
- `400 Bad Request` – hibás vagy hiányos bemeneti adatok;
- `401 Unauthorized` – hiányzó vagy érvénytelen hitelesítés;
- `404 Not Found` – a keresett erőforrás nem található.

Az API JSON formátumban ad választ.

---

## 10. API hitelesítés

A módosítást végző API műveletek védelme JWT segítségével történik.

A JWT token Bearer tokenként is átadható:

```text
Authorization: Bearer <token>
```

Token nélkül a védett végpontok `401 Unauthorized` választ adnak.

A szolgáltatások és referenciák publikus GET végpontjai hitelesítés nélkül használhatók, míg az adatok módosításához hitelesítés szükséges.

A kapcsolatfelvételek megtekintése teljes egészében védett.

---

## 11. A fejlesztés során alkalmazott főbb technológiák

A projektben többek között az alábbi technológiák kerültek alkalmazásra:

- Node.js
- Express
- MySQL
- mysql2
- EJS
- JSON Web Token
- bcrypt
- cookie-parser
- dotenv
- Git
- GitHub
- Postman
- phpMyAdmin

A projekt fejlesztése a meglévő Git repository folytatásával történt.

---

## 12. Elkészült fejlesztések összefoglalása

A diplomamunka fejlesztése során a korábbi alkalmazáshoz képest elkészült többek között:

- adatbázis-alapú adatkezelés;
- szolgáltatások kezelése;
- referenciák kezelése;
- szolgáltatások és referenciák adatbázis-kapcsolata;
- kapcsolatfelvételek adatbázisban történő tárolása;
- adminisztrációs felület;
- admin hitelesítés;
- bcrypt alapú jelszókezelés;
- JWT alapú jogosultság-ellenőrzés;
- szerveroldali validáció;
- soft delete;
- szolgáltatás deaktiválásához kapcsolódó referenciakezelés;
- REST API a szolgáltatásokhoz;
- REST API a referenciákhoz;
- védett API a kapcsolatfelvételek megtekintéséhez;
- API-specifikus JWT middleware;
- HTTP státuszkódokra és JSON válaszokra épülő API kommunikáció;
- projekt README és telepítési dokumentáció;
- `.env.example` konfigurációs minta.

---

# 13. Továbbfejlesztési lehetőségek

Az alábbi funkciók nem részei a jelenleg elkészült rendszernek. Ezek a projekt későbbi továbbfejlesztésének lehetséges irányai.

## 13.1. Admin értesítése új kapcsolatfelvételről

Jelenleg a kapcsolatfelvételi űrlapon elküldött üzenet bekerül az adatbázisba, és az adminisztrátor a védett adminisztrációs felületen tekintheti meg.

Ennek továbbfejlesztéseként a rendszer az új kapcsolatfelvétel sikeres mentése után e-mailben értesíthetné az adminisztrátort.

A folyamat például:

```text
Kapcsolatfelvételi űrlap
        ↓
Backend
        ↓
Adatbázisba mentés
        ↓
E-mail értesítés az adminnak
        ↓
Admin belép
        ↓
Üzenet megtekintése
```

Az e-mailnek nem feltétlenül kellene tartalmaznia a teljes üzenetet. Biztonságosabb megoldás lehet, ha csak az új kapcsolatfelvétel tényéről értesít, az admin pedig a védett adminisztrációs felületen olvassa el annak tartalmát.

Node.js környezetben az e-mail értesítés például Nodemailer és egy SMTP szolgáltatás segítségével valósítható meg.

### Olvasott/olvasatlan üzenetek

Ehhez kapcsolódó további fejlesztés lehet a kapcsolatfelvételek olvasott állapotának tárolása.

Például egy:

```text
is_read
```

mező segítségével megkülönböztethetők lennének az új és már megtekintett kapcsolatfelvételek.

Az adminfelület ez alapján jelezhetné például:

```text
Üzenetek (3 új)
```


## 13.2. Automatizált tesztelés Jasmine segítségével

A jelenlegi alkalmazás működésének ellenőrzése során manuális tesztelés és API-tesztelés is történt.

A rendszer továbbfejlesztésének egyik lehetséges iránya automatizált tesztek bevezetése.

Ehhez használható lenne a Jasmine JavaScript tesztelési keretrendszer.

Unit tesztekkel ellenőrizhetők lennének például:

- a szolgáltatás-validáció;
- a referencia-validáció;
- a kapcsolatfelvételi adatok validációja;
- helyes bemeneti adatok kezelése;
- hiányzó adatok kezelése;
- mezőhosszúsági korlátok.

Az API integrációs teszteléséhez a Jasmine mellett például Supertest is alkalmazható lenne.

Automatikusan ellenőrizhetők lennének többek között az alábbi esetek:

GET /api/services            → 200
GET nem létező erőforrás     → 404
hibás POST                   → 400
védett API token nélkül      → 401
érvényes POST                → 201

További tesztek készülhetnének:

- JWT hitelesítésre;
- CRUD műveletekre;
- soft delete működésére;
- szolgáltatás és referencia kapcsolatára;
- hibás azonosítók kezelésére.

Az automatizált tesztek egyik fő előnye, hogy a projekt későbbi módosítása után gyorsan ellenőrizhető lenne, hogy egy új fejlesztés nem rontotta-e el a korábban működő funkciókat.
