# Receptbok - Fullstack App

Detta är en fullstack webbapp för att hantera recept. Projektet består av en Java (Spring Boot) backend och en React (Vite) frontend, med styling baserad på Sass och Bootstrap.

## Funktioner

* Visa en lista över alla tillgängliga recept.
* Detaljerad sida för varje enskilt recept.
* Möjlighet att lägga till nya recept.
* Möjlighet att redigera befintliga recept.
* Möjlighet att ta bort recept.
* Responsiv design för olika skärmstorlekar.
* Anpassad visuell design med Sass-teman.

## Tekniska Specifikationer

### Frontend (React med Vite)

* **Ramverk:** React.js
* **Byggverktyg:** Vite
* **Styling:** Sass (SCSS) med ett anpassat tema, Bootstrap (för layout och components).
* **Språk:** JavaScript (ES6+), JSX
* **Pakethanterare:** npm

### Backend (Java med Spring Boot)

* **Ramverk:** Spring Boot
* **Databashantering:** MongoDB
* **Byggverktyg:** Apache Maven
* **Språk:** Java
* **RESTful API:** För hantering av recept (CRUD).

## Förutsättningar

Innan du kan köra projektet lokalt behöver du följande installerat på din dator:

* **Java Development Kit (JDK):** Version 17 eller senare (för Spring Boot backend).
* **Apache Maven:** Version 3.x eller senare.
* **Node.js och npm:** Node.js version 18 eller senare (npm inkluderas med Node.js).
* **MongoDB:** En lokalt installerad och körande MongoDB-instans.
* **Git:** För att klona repositoryt.

## Komma Igång

Följ dessa steg för att sätta upp och köra projektet på din lokala dator.

### 1. Klona repositoryt

Öppna din terminal eller Git Bash och kör:

```bash 
git clone [https://github.com/henkelgabriel/receptbok.git](https://github.com/henkelgabriel/receptbok.git)
cd receptbok
```

### 2. Starta MongoDB-databasen
Se till att din lokala MongoDB-instans körs.

### 3. Installera beroenden för Frontend och Backend
Från roten av projektet (Recept/ mappen):
# Installera Node.js-beroenden för frontend-projektet
cd my-recipe-book-frontend
npm install
cd .. # Gå tillbaka till roten

# Bygg och installera Maven-beroenden för backend-projektet
cd my-recipe-book-backend
mvn clean install
cd .. # Gå tillbaka till roten

# Installera concurrently i huvudprojektets rotmapp (om den inte redan är installerad)
npm install concurrently

### 4. Starta Frontend och Backend
För att starta både frontend-utvecklingsservern och Spring Boot-backend parallellt, kör följande kommando från roten av projektet (Recept/ mappen):
npm run dev

Nu ska din receptbok-app vara igång i din webbläsare!
