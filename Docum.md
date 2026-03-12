# Dokumentace aplikace - Webová aplikace pro smyčkové motivační video

# Účel aplikace

## Cíl

Aplikace je určena pro studenty a uživatele, kteří potřebují udržet pozornost při studiu nebo práci.  
Poskytuje smyčkově přehrávaná motivační videa a měří dobu jejich sledování.  
U každého videa je evidován uživatel s nejdelší dobou sledování.

## Hlavní funkce

- výběr videa z nabídky  
- přehrávání videa ve smyčce  
- měření času sledování pomocí backendu  
- ukládání rekordů uživatelů do databáze  
- zobrazení leaderboardu u videí  
- jednoduché přihlášení jménem 

# Architektura systému

Aplikace je rozdělena do tří vrstev:

- **Frontend** - uživatelské rozhraní webu  
- **Backend** - REST API a logika měření času  
- **Databáze** - ukládání session a statistik  
- **Server** - nasazení aplikace a webový server  

Komunikace:

Frontend <-> Backend <-> MySQL  

Princip fungování:

1. Frontend spustí video  
2. Backend vytvoří session a vrátí ID  
3. Frontend při ukončení pošle ID  
4. Backend spočítá čas a uloží ho  

# Popis funkcionality

| Funkce | Popis |
|--------|------|
| Výběr videa | Uživatel klikne na tlačítko videa |
| Přehrávání videa | Video se přehrává ve smyčce |
| Zahájení měření | Frontend zavolá start endpoint |
| Ukončení měření | Frontend zavolá end endpoint |
| Uložení času | Backend spočítá a uloží duration |
| Leaderboard | Nejdelší čas u videa |
| Přihlášení | Uživatel zadá jméno |

# UI / UX návrh

## Hlavní stránka

Obsahuje seznam videí ve formě tlačítek.

Každé tlačítko obsahuje:

- název videa  
- rekordního uživatele  
- rekordní čas  

## Přehrávač videa

- video přehrávané ve smyčce  
- zobrazení aktuálního času sledování  
- tlačítko návratu do menu  

# Backend – Laravel

## Architektura backendu

Browser -> Laravel REST API -> MySQL  

Backend zajišťuje měření času a ukládání dat o sledování videí.

## Datový model

Tabulka: **watch_sessions**

| Sloupec | Popis |
|--------|------|
| id | ID session |
| user_name | jméno uživatele |
| service_name | název videa |
| start_time | začátek sledování |
| end_time | konec sledování |
| duration_seconds | délka sledování |

## API endpointy

**POST /api/session/start**  
Zahájí sledování videa a vytvoří session.  
Vrací ID session.

**POST /api/session/end**  
Ukončí session podle ID a uloží dobu sledování.

**GET /api/videos**  
Vrátí seznam dostupných videí.

**GET /api/leaderboard**  
Vrátí uživatele s nejdelší dobou sledování pro videa.

## Logika měření času

1. Frontend po spuštění videa zavolá `/api/session/start`  
2. Backend vytvoří záznam a vrátí `session_id`  
3. Frontend při ukončení zavolá `/api/session/end`  
4. Backend doplní `end_time`  
5. Backend spočítá `duration_seconds`  
6. Data uloží do databáze  

## Výpočet leaderboardu

```sql
SELECT user_name, SUM(duration_seconds) AS total_time
FROM watch_sessions
GROUP BY user_name
ORDER BY total_time DESC
LIMIT 10;
```

# Workflow uživatele

1. Uživatel otevře webovou aplikaci  
2. Zadá své jméno  
3. Vybere video  
4. Video se začne přehrávat  
5. Frontend zavolá `/api/session/start`  
6. Backend začne měřit čas  
7. Uživatel ukončí sledování  
8. Frontend zavolá `/api/session/end`  
9. Backend uloží čas  
10. Aktualizuje se leaderboard  

# Postup vývoje

## Sysadmin

1. Založení účtu u Hetzner  
2. Vytvoření VPS serveru  
3. Volba lokace, úložiště a OS  
4. Spuštění serveru  
5. Aktualizace systému  
6. Nastavení root přístupu  
7. Instalace Nginx  
8. Nasazení testovací webové stránky  

## Frontend

1. Výběr a příprava videí  
2. Návrh struktury webu  
3. Implementace UI  
4. Integrace přehrávače videa  
5. Volání `/api/session/start`  
6. Volání `/api/session/end`  
7. Načítání `/api/leaderboard`  

## Backend

1. Instalace Laravel  
2. Návrh datového modelu  
3. Vytvoření modelu WatchSession  
4. Připojení k MySQL  
5. Implementace SessionController  
6. Implementace endpointů  
7. Testování API 

# Požadavky

## Funkční požadavky

| ID | Popis |
|----|------|
| R1 | Přehrávání videa ve smyčce |
| R2 | Měření doby sledování |
| R3 | Uložení času uživatele |
| R4 | Zobrazení leaderboardu |
| R5 | Výběr videa |
| R6 | Přihlášení jménem |

## Nefunkční požadavky

| ID | Popis |
|----|------|
| R7 | Responsivní uživatelské rozhraní |
| R8 | Jednoduché a intuitivní ovládání |
| R9 | Přesnost měření času +/-1 s |
| R10 | Podpora více videí |
| R11 | Ukládání dat v databázi MySQL |
| R12 | Podpora více současných uživatelů |
