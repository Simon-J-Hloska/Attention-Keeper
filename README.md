# Webová aplikace - Smyčkové motivační video

Webová aplikace pro přehrávání motivačních videí ve smyčce a měření doby sledování.  
U každého videa je evidován rekord nejdelšího sledování uživatelem.

## Funkce

- výběr videa
- přehrávání videa ve smyčce
- měření času sledování
- ukládání rekordů
- leaderboard u videí
- jednoduché přihlášení jménem

## Architektura

Frontend <-> Backend <-> Databáze

## API endpointy

POST `/api/session/start` - začátek sledování  
POST `/api/session/end` - konec sledování  
GET `/api/videos` - seznam videí  
GET `/api/leaderboard` - rekordy  

## Struktura projektu

backend/laravel-backend
frontend
docs
vps

## Role v projektu

- Sysadmin - VPS, Nginx, nasazení
- Backend - Laravel API, databáze
- Frontend - UI a komunikace s API

## Nasazení

- VPS: Hetzner
- Web server: Nginx
- Backend: Laravel
- Databáze: SQL
