# [Nazwa projektu] - Project Config

> Wklej do: Lovable Project Knowledge, CLAUDE.md (Claude Code),
> .cursorrules (Cursor), lub commituj jako AGENTS.md (działa wszędzie).
> Budżet: 40-80 linijek / 300 słów max (~1,800 znaków).
> Test: "Czy gdybym usunął tę linijkę, AI popełniłoby błąd?" Jeśli nie - usuń.

PROJECT: [Nazwa]
ROLE: [Co robi ten asystent AI - jedno zdanie]

## Cel aplikacji
[Co robi apka, dla kogo, jaki problem rozwiązuje. 2-3 zdania.]

## Wytyczne designu
[Styl wizualny, biblioteka komponentów, wzorce layoutu. 2-3 linie.]

## Styl kodu
[3-5 konkretnych reguł. Każda z krótkim przykładem good/bad.]

Przykład:
- Używaj named exports, nie default exports
  Good: `export function Badge() {}`
  Bad: `export default function() {}`

## Reguły domenowe
[Logika biznesowa, formaty danych, lokalizacja. 2-3 linie.]

## Model danych
[Kluczowe encje i relacje. Nie pełny schemat - tylko to, co AI musi wiedzieć.]

## Granice

ALWAYS:
- [Rzecz którą AI musi zawsze robić - max 3]

ASK FIRST:
- [Rzecz którą AI powinno sprawdzić z tobą przed zrobieniem - max 3]

NEVER:
- [Rzecz której AI nigdy nie może zrobić - max 3. To zapobiega najgorszym błędom.]

---

> **Użytkownicy Claude Code / Cursor:** Zamień "Cel aplikacji" i "Wytyczne designu"
> na "Stack i narzędzia" (język, framework, hosting) i "Komendy" (build, test, deploy
> z dokładnymi flagami). Dodaj sekcje "Testowanie" i "Git workflow". Ten sam budżet.
