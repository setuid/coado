# Manuais de Moedores — Coado

Este diretório armazena os PDFs dos manuais oficiais dos moedores suportados pelo Coado.

## Como obter os PDFs

Baixe cada manual do URL oficial listado abaixo e salve com o nome indicado:

| Arquivo | URL de origem | Tamanho aprox. |
|---------|--------------|----------------|
| `timemore-c2-manual.pdf` | https://www.manualslib.com/manual/3910577/Timemore-Chestnut-C2.html | ~2 MB |
| `timemore-c3-manual.pdf` | https://www.manualslib.com/manual/3910579/Timemore-Chestnut-C3.html | ~2 MB |
| `timemore-c3s-manual.pdf` | https://manuals.plus/asin/B0C1TZN9T5 | ~2 MB |
| `comandante-c40-manual.pdf` | https://www.maxicoffee.com/images/pdf/C40-Manual.pdf | ~3 MB |
| `1zpresso-jx-manual.pdf` | https://1zpresso.coffee/manual-j-en/ | ~2 MB |
| `1zpresso-jx-pro-manual.pdf` | https://1zpresso.coffee/manual-jxpro-en/ | ~2 MB |
| `baratza-encore-manual.pdf` | https://assets.breville.com/ZCG485/manual-encore-en-v4-3-120122.pdf | ~4 MB |
| `hario-skerton-pro-manual.pdf` | https://global.hario.com/product/MMCS-2B.pdf | ~1 MB |

## Comportamento no app

- O app tenta abrir `/docs/grinders/{id}-manual.pdf` ao clicar no botão 📄
- Se o PDF não existir localmente (404), o app redireciona para o `manualUrl` do `grinders.json`
- Os dados dos moedores (settings, calibration notes) estão em `/data/grinders.json`

## Notas sobre licença

Os PDFs são documentos públicos disponibilizados pelos próprios fabricantes para suporte
ao cliente. Verifique os termos de cada fabricante antes de redistribuir comercialmente.
Os arquivos são incluídos aqui exclusivamente para conveniência offline dos usuários do Coado.
