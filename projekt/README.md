# Projekt - Aplikacje backendowe

### Temat

Projekt będzie polegał na wykonaniu aplikacji rankingowej filmów (podobnej do filmweb.pl). Użytkownicy zostaną podzieleni na trzy role - administrator, moderator oraz zwykły użytkownik. Administrator to najwyższa rola w systemie, może on nadawać innym użytkownikom poszczególne role. Zarówno administrator jak i moderator będzie mieć możliwość dodawania, usuwania, edytowania filmów. Tylko **zalogowani** użytkownicy będą mogli mieć możliwość oceny dostępnych na stronie filmów. Autoryzacja zostanie oparta o JWT token, komunikacja między serwisami przez gRPC. Frontend będzie wydzielony osobno, napisany w Reactcie.

### Technologie

- NestJS & TypeScript
- gRPC
- PostgreSQL
- TypeORM
- Docker
- React

### Instalacja

Utworzenie i start wszystkich kontenerów

```
docker-compose -p movieranker up
```

Pierwsze przypisanie roli administratora wybranemu użytkownikowi - trzeba to zrobić manualnie z poziomu CLI bazy danych.

```
docker ps -f "name=postgres"
docker exec -it <CONTAINER_ID> /bin/bash

psql -U postgres movieranker_auth;

UPDATE auth SET role='0' WHERE id=1 RETURNING *;
```

API Gateway powinien być aktywny na porcie `8080` (http://localhost:8080), a aplikacja frontowa na porcie `3000` (http://localhost:3000)

### Harmonogram prac

1. Przygotowanie struktury projektu
2. Stworzenie baz danych
3. Repozytorium proto do współdzielenia typów danych w mikroserwisach
4. API Gateway - setup
5. Mikroserwis uwierzytelniania - setup
6. Mikroserwis obsługi filmów - setup
7. Mikroserwis uwierzytelniania - kontrolery, error handling, DTO itp.
8. Mikroserwis obsługi filmów - kontrolery, error handling, DTO itp.
9. Komunikacja pomiędzy mikroserwisami, integracja z API Gateway
10. Zmienne środowiskowe
11. Frontend - setup
12. Frontend - integracja z API
13. Testowanie & bugfixing
14. Docker - zbudowanie wersji produkcyjnej
15. Przetestowanie aplikacji w środowisku produkcyjnym
16. Przygotowanie dokumentacji
