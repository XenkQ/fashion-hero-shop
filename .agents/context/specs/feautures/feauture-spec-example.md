# Feature: Jak to noszą inni - Galeria UGC

OPPORTUNITY: "Zdjęcia produktowe wyglądają za dobrze - nie wiem jak to będzie wyglądać na normalnej osobie" - kupujący nie ufają profesjonalnym zdjęciom produktowym bo nie oddają tego jak ubrania wyglądają na prawdziwych ludziach. Ta luka oczekiwań napędza zwroty.  
OUTCOME: Obniżyć wskaźnik zwrotów na produktach z 3+ zdjęciami UGC o 5 pp (z 38% do 33%) w ciągu 60 dni.

## Co budujemy

Sekcja ze zdjęciami od kupujących na stronach produktów. Kupujący którzy kupili dany produkt mogą uploadować zdjęcia siebie w tym produkcie. Inni kupujący widzą prawdziwych ludzi w produkcie przed zakupem. Prosta galeria z uploadem zdjęć i wyświetlaniem.

## User flow

1. Kupujący kupuje produkt i go otrzymuje
2. Na stronie produktu widzi przycisk "Pokaż jak to nosisz"
3. Uploaduje zdjęcie (max 5MB, JPEG/PNG)
4. Zdjęcie pojawia się w sekcji "Jak to noszą inni" na stronie produktu
5. Przeglądający kupujący widzą galerię pod zdjęciami produktowymi

## Kryteria akceptacji

- Upload dostępny tylko dla zweryfikowanych kupujących danego produktu
- Galeria pokazuje się na stronie produktu tylko gdy jest 1+ zdjęcie
- Zdjęcia wyświetlają się z imieniem kupującego i zakupionym rozmiarem
- Upload przyjmuje JPEG/PNG, max 5MB, auto-resize do 800px szerokości
- Cały UI po polsku, mobile-first

## Czego NIE budujemy

- Przymierzalnia wirtualna "Jak to będzie wyglądać na mnie" (przyszła faza - osobny spec)
- Edycja zdjęć ani filtry
- Funkcje społecznościowe (lajki, komentarze do zdjęć UGC)
- System zachęt czy gamifikacja za uploadowanie zdjęć
- Panel moderacji (v1 - wszystkie zdjęcia od zweryfikowanych kupujących idą automatycznie)

## Przykłady

Input: Kupująca "Ania" kupiła "Sukienka Maxi Boho" w rozmiarze M, uploaduje selfie z lustra (3.2MB JPEG)  
Oczekiwany rezultat: Zdjęcie pojawia się w galerii jako "Ania - rozmiar M" pod zdjęciami produktowymi.

Input: "Kasia" która nie kupiła produktu odwiedza stronę i próbuje uploadować zdjęcie  
Oczekiwany rezultat: Przycisk uploadu pokazuje "Kup ten produkt, żeby dodać swoje zdjęcie" - formularz uploadu nie jest renderowany.
