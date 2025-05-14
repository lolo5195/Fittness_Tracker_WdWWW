# Fitness Tracker

Fitness Tracker to responsywna aplikacja webowa do śledzenia aktywności fizycznych, umożliwiająca użytkownikom dodawanie, przeglądanie i filtrowanie treningów. Aplikacja oferuje intuicyjny interfejs z trybem ciemnym, animowanym menu nawigacyjnym, powiadomieniami o dodaniu treningu i poradami fitness.

## Funkcjonalności

- **Dodawanie treningów**: Rejestruj typ, czas trwania i spalone kalorie za pomocą formularza z potwierdzeniem dodania (powiadomienie toast).
- **Przeglądanie i filtrowanie**: Wyświetlaj treningi w tabeli z opcjami filtrowania po typie i sortowania po dacie lub czasie trwania.
- **Tryb ciemny/jasny**: Przełączanie między trybami z zapisem preferencji w `localStorage`.
- **Responsywne menu**: Animowane menu nawigacyjne (wysuwane z lewej strony), zamykane po kliknięciu linku, z poziomym układem linków.
- **Porady fitness**: Karuzela z poradami i losowe cytaty motywacyjne.
- **Dostępność**: Zgodność z WCAG (etykiety ARIA, odpowiedni kontrast).

## Wymagania

- **Node.js** (v14 lub nowszy) do uruchomienia `json-server`.
- Nowoczesna przeglądarka (Chrome, Firefox, Safari, Edge).
- Opcjonalnie: VS Code z rozszerzeniem Live Server do wygodnego testowania.

## Instalacja

1. **Sklonuj repozytorium**:
   ```bash
   git clone https://github.com/<twoj-username>/fitness-tracker.git
   cd fitness-tracker
   ```

2. **Zainstaluj zależności**:
   Zainstaluj `json-server` globalnie lub lokalnie:
   ```bash
   npm install -g json-server
   ```
   lub
   ```bash
   npm install json-server
   ```

3. **Utwórz plik `db.json`**:
   W folderze projektu utwórz plik `db.json` z początkową strukturą:
   ```json
   {
     "workouts": []
   }
   ```

4. **Uruchom json-server**:
   ```bash
   json-server --watch db.json
   ```
   Serwer będzie dostępny na `http://localhost:3000/workouts`. Upewnij się, że serwer działa przed testowaniem aplikacji, aby uniknąć błędów zapisu danych.

5. **Otwórz aplikację**:
   - Otwórz plik `index.html` w przeglądarce (np. przez podwójne kliknięcie) lub użyj lokalnego serwera:
     ```bash
     npm install -g http-server
     http-server
     ```
     Strona będzie dostępna na `http://localhost:8080`.
   - Alternatywnie, użyj rozszerzenia Live Server w VS Code.
   - Jeśli strona odświeża się po dodaniu treningu, wyczyść pamięć podręczną przeglądarki (Ctrl + Shift + R).

## Struktura projektu

```
fitness-tracker/
├── index.html       # Główny plik HTML
├── styles.css       # Style CSS (responsywność, tryb ciemny, animacje, powiadomienia)
├── script.js        # Logika JavaScript (formularz, API, menu, karuzela)
├── db.json          # Baza danych dla json-server
└── README.md        # Dokumentacja projektu
```

## Użytkowanie

1. **Nawigacja**:
   - Kliknij przycisk hamburgera (☰) w prawym górnym rogu, aby wysunąć menu.
   - Wybierz sekcję (Strona główna, Dodaj trening, Treningi, Porady) – menu zamknie się automatycznie.
   - Kliknij logo „Fitness Tracker” w nagłówku, aby wrócić do strony głównej.

2. **Dodawanie treningu**:
   - W sekcji „Dodaj nowy trening” wybierz typ, podaj czas trwania i kalorie, a następnie kliknij „Dodaj”.
   - Po dodaniu pojawi się powiadomienie „Trening dodany!” w prawym dolnym rogu przez 3 sekundy.
   - Trening zapisuje się w `db.json` i `localStorage`, a strona nie odświeża się.
   - Jeśli pojawi się błąd (np. „Błąd podczas zapisywania treningu!”), sprawdź, czy `json-server` działa na `http://localhost:3000`.

3. **Przeglądanie treningów**:
   - W sekcji „Twoje treningi” zobaczysz tabelę z treningami.
   - Użyj filtrów (typ) i sortowania (data, czas) do organizacji danych.
   - Kliknij „Szczegóły” w tabeli, aby zobaczyć szczegóły treningu w oknie dialogowym.

4. **Tryb ciemny**:
   - Kliknij przycisk ☀️/🌙 w pasku nawigacji, aby przełączyć między trybem jasnym a ciemnym.
   - Preferencja zapisuje się w `localStorage`.

5. **Porady i motywacja**:
   - Przeglądaj porady w karuzeli (przyciski ❮/❯).
   - Kliknij „Nowy cytat” w sekcji „Motywacja dnia”, aby zobaczyć losowy cytat.

## Testowanie

### Lokalne testowanie
- Otwórz `index.html` w przeglądarce i sprawdź wszystkie funkcje (formularz, menu, tryb ciemny, powiadomienia).
- Upewnij się, że strona nie odświeża się po dodaniu treningu – sprawdź powiadomienie toast.
- Wprowadź nieprawidłowe dane (np. ujemny czas) – powinien pojawić się komunikat błędu bez odświeżania.
- Jeśli `json-server` nie działa, sprawdź konsolę przeglądarki (F12) pod kątem błędów sieciowych.
- Użyj narzędzi deweloperskich (Ctrl + Shift + I w Chrome, tryb responsywny) do symulacji urządzeń mobilnych (np. iPhone 12, Galaxy S20).

### Testowanie na telefonie
1. Uruchom `json-server` z dostępem sieciowym:
   ```bash
   json-server --watch db.json --host 0.0.0.0
   ```
2. Zaktualizuj `API_URL` w `script.js` na adres IP komputera, np.:
   ```javascript
   const API_URL = 'http://192.168.1.100:3000/workouts';
   ```
3. Uruchom serwer HTTP:
   ```bash
   http-server
   ```
4. Na telefonie (w tej samej sieci Wi-Fi) otwórz przeglądarkę i wpisz adres, np. `http://192.168.1.100:8080`.
5. Przetestuj:
   - Płynność animacji menu (wysuwanie po kliknięciu hamburgera, zamykanie po kliknięciu linku).
   - Czytelność linków w poziomym układzie.
   - Funkcjonalność formularza, powiadomienia toast, karuzeli i przełącznika trybu ciemnego.
   - Brak odświeżania strony po dodaniu treningu.

### Dostępność
- Użyj narzędzia Lighthouse w Chrome (zakładka Audits) do sprawdzenia zgodności z WCAG.
- Przetestuj z czytnikiem ekranu (np. NVDA, VoiceOver).

## Technologie

- **HTML5**: Semantyczna struktura strony.
- **CSS3**: Responsywne style, animacje (menu, powiadomienia), tryb ciemny.
- **JavaScript (ES6)**: Logika aplikacji (Fetch API, `localStorage`).
- **json-server**: Symulacja backendu REST API.


### Jak przyczynić się?
1. Sforkuj repozytorium.
2. Utwórz branch dla nowej funkcji:
   ```bash
   git checkout -b feature/nazwa-funkcji
   ```
3. Wprowadź zmiany i zatwierdź:
   ```bash
   git commit -m "Dodano nazwa-funkcji"
   ```
4. Wypchnij zmiany i utwórz Pull Request:
   ```bash
   git push origin feature/nazwa-funkcji
   ```

## Licencja

© 2025 Fitness Tracker. Wszystkie prawa zastrzeżone.

---

*Projekt stworzony jako aplikacja edukacyjna. Jeśli masz pytania lub sugestie, otwórz issue na GitHubie!*
