#!/bin/bash
# LabMenu — Script de build e deploy para o repo público
# Uso: ./build.sh

set -e

REPO_PUBLICO="../labmenu"  # caminho para o repo público (GitHub Pages)
PASTAS=("vitorelli" "moraesgrill" "mctonny")

echo "🔨 LabMenu Build Script"
echo "========================"

# Verifica se minify está disponível, senão copia direto
if command -v npx &> /dev/null; then
  MINIFY=true
  echo "✅ npx encontrado — minificando arquivos"
else
  MINIFY=false
  echo "⚠️  npx não encontrado — copiando sem minificar"
fi

for PASTA in "${PASTAS[@]}"; do
  echo ""
  echo "📦 Processando: $PASTA"

  mkdir -p "$REPO_PUBLICO/$PASTA"

  # HTML — copia direto (minificação de HTML é opcional)
  cp "$PASTA/index.html" "$REPO_PUBLICO/$PASTA/index.html"
  echo "  ✓ index.html"

  # CSS
  if [ "$MINIFY" = true ] && npx --yes csso-cli --version &>/dev/null; then
    npx csso-cli "$PASTA/style.css" --output "$REPO_PUBLICO/$PASTA/style.css"
  else
    cp "$PASTA/style.css" "$REPO_PUBLICO/$PASTA/style.css"
  fi
  echo "  ✓ style.css"

  # JS — substitui apiBase pela URL real do Worker antes de copiar
  sed "s|https://api.labriolag.shop|https://labmenu-api.SEU_USUARIO.workers.dev|g" \
    "$PASTA/app.js" > "$REPO_PUBLICO/$PASTA/app.js"
  echo "  ✓ app.js"
done

echo ""
echo "✅ Build completo! Arquivos em: $REPO_PUBLICO"
echo ""
echo "Para publicar no GitHub Pages:"
echo "  cd $REPO_PUBLICO"
echo "  git add ."
echo "  git commit -m 'deploy: labmenu $(date +%Y-%m-%d)'"
echo "  git push"
