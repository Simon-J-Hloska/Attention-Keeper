# Dokumentace aplikace - Webová aplikace pro smyčkové motivační video

# Účel aplikace

## Cíl

Aplikace je určena pro studenty a uživatele, kteří potřebují udržet pozornost při studiu nebo práci.  
Poskytuje smyčkově přehrávaná videa a měří dobu jejich sledování.  
U každého videa je evidován rekord nejdelšího sledování.

## Hlavní funkce

- výběr videa z nabídky
- přehrávání videa ve smyčce
- měření času sledování
- ukládání rekordů uživatelů
- zobrazení leaderboardu u videí
- jednoduché přihlášení jménem

# Architektura systému

Aplikace je rozdělena na tři části:

- Frontend - uživatelské rozhraní
- Backend - REST API a logika
- Server - nasazení

Komunikace:

Frontend <-> Backend <-> Databáze

# Popis funkcionality

| Funkce | Popis |
|--------|------|
| Výběr videa | Uživatel klikne na tlačítko |
| Přehrávání videa | Video běží ve smyčce |
| Měření času | Backend měří sledování |
| Uložení času | Po ukončení se uloží |
| Leaderboard | Rekord u videa |
| Přihlášení | Zadání jména |

# UI / UX návrh

## Hlavní stránka

- tlačítka s videi
- název videa
- rekordní uživatel
- rekordní čas

## Přehrávač

- video ve smyčce
- aktuální čas
- návrat do menu

# Backend - Laravel

## Funkce backendu

- start sledování
- ukončení sledování
- seznam videí
- leaderboard
- ukládání do DB

## Ukládaná data

- uživatel
- video
- čas
- datum

## Endpointy

POST /api/session/start  
POST /api/session/end  
GET /api/videos  
GET /api/leaderboard  

# Workflow uživatele

1. Otevře aplikaci
2. Zadá jméno
3. Vybere video
4. Video se přehrává
5. Backend měří čas
6. Uživatel ukončí
7. Čas se uloží
8. Leaderboard se aktualizuje

# Postup vývoje

## Sysadmin

1. Založení účtu Hetzner
2. Vytvoření VPS
3. Výběr lokace a OS
4. Spuštění serveru
5. Update systému
6. Nastavení root
7. Instalace Nginx
8. Test webu

## Frontend

1. Návrh struktury webu
2. Vytvoření projektu
3. UI implementace
4. Napojení API
5. Volání start/end
6. Zobrazení leaderboardu

## Backend

1. Laravel projekt
2. DB připojení
3. Tabulka časů
4. Ukládání dat
5. API endpointy
6. Test API

# Požadavky

## Funkční

| ID | Popis |
|----|------|
| R1 | Smyčkové video |
| R2 | Měření času |
| R3 | Uložení času |
| R4 | Leaderboard |
| R5 | Výběr videa |
| R6 | Přihlášení |

## Nefunkční

| ID | Popis |
|----|------|
| R7 | Responsivní UI |
| R8 | Jednoduché ovládání |
| R9 | Přesnost ±1 s |
| R10 | Více videí |
| R11 | DB |
| R12 | Více uživatelů |
