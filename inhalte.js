/* INHALTE PFLEGEN
   1. Einen Tagesblock kopieren (Vorlage unten).
   2. tag: auf eine eindeutige Zahl von 1 bis 24 setzen.
   3. Titel, Dauer, Material und den Text zwischen den Backticks anpassen.
   4. Datei speichern und den Kalender im Browser neu laden.
   Die Reihenfolge hier ist egal. Jeder Tag darf nur einmal vorkommen.
   HTML erlaubt: <p>Absatz</p>, <h3>Überschrift</h3>,
   <ol><li>Übung</li></ol>, <strong>Fett</strong>, <blockquote>Tipp</blockquote>.
   Zwischen Tagesblöcken steht ein Komma. Backticks (`) im Inhalt vermeiden.
   Bilder zwischen Textabsätzen: siehe vorlage-bilder.html.
   Bilddateien neben index.html ablegen und ebenfalls auf GitHub hochladen.
*/

window.KALENDER = {
  jahr: 2026, // Für einen neuen Advent hier das Jahr ändern.
  bild: 'kalenderbild.png', // Alternativ z. B. 'mein-bild.jpg'.
};

window.TAGESINHALTE = [
  {
    tag: 1,
    kategorie: 'Trainingszeit',
    titel: 'Gemeinsam in den Advent',
    dauer: 'Dauer hier eintragen',
    material: 'Material hier eintragen',
    inhalt: `
      <p>Hier beginnt dein erster Trainingstag. Ersetze diesen Beispieltext durch deine eigenen Übungen.</p>
      <h3>1. Aufwärmen</h3>
      <p>Beschreibe hier, wie ihr euch auf das Training vorbereitet.</p>
      <h3>2. Deine Übungen</h3>
      <ol>
        <li><strong>Übung eins:</strong> Ablauf, Wiederholungen und Pausen eintragen.</li>
        <figure class="uebungsbild">
          <img src="liegestuetz-start.png" alt="Startposition">
          <figcaption>1. Startposition</figcaption>
        </figure>
        <figure class="uebungsbild">
          <img src="liegestuetz-ende.png" alt="Endposition">
          <figcaption>2. Endposition</figcaption>
        </figure>
        <li><strong>Übung zwei:</strong> Hier ist Platz für eine ausführliche Erklärung.</li>
        <li><strong>Übung drei:</strong> Ergänze bei Bedarf eine leichtere oder schwierigere Variante.</li>
      </ol>
      <h3>3. Abschluss</h3>
      <p>Trage hier den gemeinsamen Abschluss ein.</p>
      <blockquote>Dein Tipp oder eine kleine Motivation für das Team.</blockquote>
    `,
  },

  // Weitere Tage hier einfügen. Fehlende Tage zeigen einen Platzhalter.
];

/* KOPIERVORLAGE — diesen Block innerhalb der Liste oben einfügen:

  {
    tag: 2,
    kategorie: 'Training',
    titel: 'Titel deines Tages',
    dauer: '15 Minuten',
    material: 'Ohne Material',
    inhalt: `
      <p>Deine Einleitung.</p>
      <h3>Die Übungen</h3>
      <ol>
        <li><strong>Übung 1:</strong> Deine Beschreibung.</li>
        <li><strong>Übung 2:</strong> Deine Beschreibung.</li>
      </ol>
      <blockquote>Dein Tipp für heute.</blockquote>
    `,
  },

*/
