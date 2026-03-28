$pairs = @(
  'about.html|Profil und Arbeitsweise von Knut: Motivation, Werkstattfokus und der Weg von der Idee zum fertigen Holzprojekt.',
  'bandsaegentisch.html|Bandsaegentisch mit Schrank, Saugerfach und Rollen: kompakt geplant, stabil gebaut und flexibel einsetzbar.',
  'baumbank.html|Halbe Baumbank aus Douglasie mit klarer Form und wetterfester Konstruktion fuer einen einladenden Platz im Garten.',
  'bohrmaschinentisch.html|Bohrmaschinentisch mit stabilem Unterbau und Schubladen fuer Bohrer und Zubehoer, mobil auf Rollen.',
  'datenschutz.html|Datenschutzhinweise zu Verarbeitung, Speicherung und deinen Rechten bei der Nutzung von Knuts Wooden Dreams.',
  'faltwerkbank.html|Faltwerkbank mit klappbarer Arbeitsflaeche: robust im Einsatz, schnell verstaut und ideal fuer flexible Ablaeufe.',
  'gartentisch.html|Massiver Gartentisch aus Douglasie mit praegnanten Bohlen, hoher Standfestigkeit und langlebiger Outdoor-Tauglichkeit.',
  'impressum.html|Impressum mit allen rechtlich erforderlichen Angaben und Kontaktinformationen fuer Knuts Wooden Dreams.',
  'kontakt.html|Kontaktseite fuer Fragen, Feedback und Projektanfragen rund um Knuts Wooden Dreams.',
  'kuechenschrank.html|Kuechenschrank fuer Recycling mit Schubladen, Massivholzplatte und alltagstauglicher Aufteilung.',
  'planfraestisch.html|Planfraestisch fuer praezises Abrichten mit stabiler Basis und sauber gefuehrtem Schlitten.',
  'schuhbank.html|Schuhbank in Eiche und MDF mit klarer Linienfuehrung, verstecktem Stauraum und praktischer Nutzung.',
  'schuhschrank.html|Schuhschrank passend zur Schuhbank mit warmen Holzfronten, Roll-Top-Detail und grosszuegigem Stauraum.',
  'shelf-workbench.html|Shelf-Workbench als klappbare Mehrzweck-Werkbank mit Ebenen fuer Maschinen und Einsaetze.',
  'standardtisch.html|Standardtisch als robuster Rollcontainer mit Schubladen fuer uebersichtliche Organisation in der Werkstatt.',
  'werkzeuge.html|Werkzeuguebersicht mit ausgewaehlten Maschinen und Handwerkzeugen fuer Planung, Zuschnitt, Montage und Finish.'
)

foreach ($p in $pairs) {
  $parts = $p.Split('|', 2)
  $name = $parts[0]
  $desc = $parts[1]
  $path = Join-Path (Join-Path $PSScriptRoot '') $name

  if (-not (Test-Path $path)) {
    continue
  }

  $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $content = [regex]::Replace($content, '(?m)^\s*<meta name="description" content=".*?"\s*/>', '  <meta name="description" content="' + $desc + '" />', 1)
  $content = [regex]::Replace($content, '(?m)^\s*<meta property="og:description" content=".*?"\s*/>', '  <meta property="og:description" content="' + $desc + '" />', 1)
  [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
}

Write-Output 'Applied unique descriptions to subpages.'
