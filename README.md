# Avança Hospital Canindé Site

Site público e institucional do Programa Avança Hospital Canindé, programa técnico institucional voltado à reorganização, modernização e fortalecimento da assistência hospitalar municipal em Canindé de São Francisco - SE.

## Estrutura

```text
index.html
style.css
script.js
netlify.toml
assets/
  brasao_caninde.png
  favicon.svg
  og-avanca-hospital.svg
README.md
```

## Como testar localmente

Abra o arquivo `index.html` diretamente no navegador ou sirva a pasta com um servidor estático simples:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicação

O site é estático e compatível com publicação no Netlify. O arquivo `netlify.toml` publica a raiz do projeto.

## Identidade e compartilhamento

- `assets/favicon.svg` é o favicon provisório do site Avança Hospital Canindé.
- `assets/og-avanca-hospital.svg` é a imagem provisória de compartilhamento.
- O `index.html` possui SEO básico, Open Graph e Twitter Card.
- Futuramente esses arquivos podem ser substituídos por versões oficiais da marca.
- O site é estático e compatível com publicação no Netlify.
- O Avança Hospital Canindé é um programa técnico institucional, não um sistema com login.
- O sistema/plataforma com login pertence à arquitetura GSI ONE.
- A assinatura institucional/ecossistema é GSI HealthTech.
