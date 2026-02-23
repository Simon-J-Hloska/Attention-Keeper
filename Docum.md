## Dokumentace aplikace - Webová aplikace pro smyčkové motivační video


# Účel aplikace

## Cíl

Aplikace je určena pro studenty a uživatele, kteří potřebují udržet pozornost při studiu nebo práci. Poskytuje smyčkově přehrávaná videa a měří dobu jejich sledování. U každého videa je evidován rekord nejdelšího sledování.

## Hlavní funkce

* výběr videa z nabídky
* přehrávání videa ve smyčce
* měření času sledování
* ukládání rekordů uživatelů
* zobrazení leaderboardu u videí
* jednoduché přihlášení jménem


# Popis funkcionality

| Funkce           | Popis                                |
| ---------------- | ------------------------------------ |
| Výběr videa      | Uživatel klikne na tlačítko s videem |
| Přehrávání videa | Video se spustí a přehrává ve smyčce |
| Měření času      | Backend měří dobu sledování          |
| Uložení času     | Po ukončení sledování se čas uloží   |
| Leaderboard      | U každého videa je zobrazen rekord   |
| Přihlášení       | Uživatel zadá jméno                  |


# UI / UX návrh

## Hlavní stránka

* tlačítka s videi
* u každého tlačítka:

  * název videa
  * rekordní uživatel
  * rekordní čas

## Přehrávač videa

* video přehrávané ve smyčce
* zobrazení aktuálního času sledování
* tlačítko návratu do menu

# Backend – Laravel

## Funkce backendu

* REST API pro:

  * start sledování
  * ukončení sledování
  * získání videí
  * získání leaderboardu
* ukládání rekordů do databáze

## Ukládaná data

* uživatel
* video
* čas sledování
* datum

## Endpointy

**POST /api/session/start**
Zaznamená začátek sledování videa

**POST /api/session/end**
Zaznamená konec sledování a čas

**GET /api/videos**
Vrátí seznam videí

**GET /api/leaderboard**
Vrátí rekordy pro videa

# Workflow uživatele

1. Uživatel otevře webovou aplikaci
2. Zadá své jméno
3. Vybere video
4. Video se začne přehrávat
5. Backend měří čas sledování
6. Uživatel ukončí sledování
7. Čas se uloží
8. Aktualizuje se leaderboard

# Požadavky

## Funkční požadavky

| ID | Typ | Popis                   |
| -- | --- | ----------------------- |
| R1 | F   | Spustit video ve smyčce |
| R2 | F   | Měřit čas sledování     |
| R3 | F   | Uložit čas uživatele    |
| R4 | F   | Zobrazit rekord u videa |
| R5 | F   | Výběr videa             |
| R6 | F   | Přihlášení jménem       |

## Nefunkční požadavky

| ID  | Typ | Popis                |
| --- | --- | -------------------- |
| R7  | Q   | Responsivní UI       |
| R8  | Q   | Jednoduché ovládání  |
| R9  | Q   | Přesnost měření +/-1 s |
| R10 | Q   | Podpora více videí   |
| R11 | Q   | Uložení dat v DB     |
| R12 | Q   | Současní uživatelé   |
