# Projekt - Aplikacje backendowe

### Temat

Projekt będzie polegał na wykonaniu aplikacji rankingowej filmów (podobnej do filmweb.pl). Użytkownicy zostaną podzieleni na trzy role - administrator, moderator oraz zwykły użytkownik. Moderator może nadawać innym użytkownikom rolę administratora. Zarówno administrator jak i moderator będzie mieć możliwość dodawania, usuwania, edytowania filmów. Tylko **zalogowani** użytkownicy będą mogli mieć możliwość oceny dostępnych na stronie filmów. Autoryzacja zostanie oparta o JWT token, komunikacja między serwisami przez gRPC. Frontend będzie wydzielony osobno, napisany w Reactcie.

### Technologie

- NestJS & TypeScript
- gRPC
- PostgreSQL
- TypeORM
- Docker
- React

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
